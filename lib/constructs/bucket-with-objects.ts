import { execSync } from "child_process"
import path from "path"
import { Construct } from "constructs"
import { readdirSync } from "fs"
import * as cdk from "aws-cdk-lib"
import * as s3 from "aws-cdk-lib/aws-s3"
import * as cloudfront from "aws-cdk-lib/aws-cloudfront"
import * as lambda from "aws-cdk-lib/aws-lambda"
import * as iam from "aws-cdk-lib/aws-iam"
import * as logs from "aws-cdk-lib/aws-logs"
import * as s3_assets from "aws-cdk-lib/aws-s3-assets"

export type BucketWithObjectsProps = Partial<Omit<Omit<s3.BucketProps, "removalPolicy">, "autoDeleteObjects">> & {
	deploymentLogGroup?: logs.ILogGroup
}

export type BucketObject = {
	key: string
	content: string
}

export class DeploymentAction {
	static cloudFrontDistributionInvalidation(distribution: cloudfront.Distribution) {
		return new CloudFrontDistributionInvalidationDeploymentAction(distribution)
	}
}

class CloudFrontDistributionInvalidationDeploymentAction extends DeploymentAction {
	distribution: cloudfront.Distribution
	constructor(distribution: cloudfront.Distribution) {
		super()
		this.distribution = distribution
	}
}

export class BucketWithObjects extends s3.Bucket {
	#inlineBucketObjects: Array<BucketObject>
	#assets: Array<s3_assets.Asset>
	#deploymentActions: Array<DeploymentAction>
	#handlerRole: iam.Role
	constructor(scope: Construct, id: string, props: BucketWithObjectsProps) {
		super(scope, id, {
			removalPolicy: cdk.RemovalPolicy.DESTROY,
			...props
		})
		this.#inlineBucketObjects = []
		this.#assets = []
		this.#deploymentActions = []

		const codePackagePath = path.join(__dirname, "..", "..", "..", "handler")
		if (!readdirSync(codePackagePath).includes("node_modules")) {
			execSync("npm install", { cwd: codePackagePath })
		}

		this.#handlerRole = new iam.Role(this, "ObjectsHandlerRole", {
			managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole")],
			assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com")
		})
		this.#handlerRole.addToPolicy(new iam.PolicyStatement({
			actions: [
				"s3:ListBucket",
				"s3:PutObject",
				"s3:PutObjectAcl",
				"s3:DeleteObject"
			],
			resources: [this.bucketArn, `${this.bucketArn}/*`]
		}))

		const handler = new lambda.Function(this, "ObjectsHandler", {
			runtime: lambda.Runtime.NODEJS_20_X,
			role: this.#handlerRole,
			code: lambda.Code.fromAsset(codePackagePath),
			handler: "index.handler",
			timeout: cdk.Duration.seconds(60),
			logGroup: props.deploymentLogGroup
		})

		new cdk.CustomResource(this, "Objects", {
			resourceType: "Custom::BucketObjects",
			serviceToken: handler.functionArn,
			properties: {
				props: cdk.Lazy.any({
					produce: () => ({
						bucketUrl: `s3://${this.bucketName}`,
						assets: this.#assets.map(asset => ({
							hash: asset.assetHash,
							s3ObjectUrl: asset.s3ObjectUrl,
							s3ObjectKey: asset.s3ObjectKey
						})),
						objects: this.#inlineBucketObjects,
						distributionIds: this.#deploymentActions
							.filter(action => action instanceof CloudFrontDistributionInvalidationDeploymentAction)
							.map(action => (action as CloudFrontDistributionInvalidationDeploymentAction).distribution.distributionId)
					})
				})
			}
		})
	}

	addObject(object: BucketObject) {
		if (this.#inlineBucketObjects.find(x => x.key === object.key)) {
			throw new Error(`Cannot add object with duplicate key ${object.key} to ${this.node.id}.`)
		}
		this.#inlineBucketObjects.push(object)
	}

	addObjectsFromAsset(asset: s3_assets.Asset) {
		if (this.#assets.find(x => x.assetHash === asset.assetHash)) {
			throw new Error(`Cannot add objects from asset ${asset.assetHash} to ${this.node.id} twice.`)
		}
		this.#assets.push(asset)
		this.#handlerRole.addToPolicy(new iam.PolicyStatement({
			actions: [
				"s3:ListBucket",
				"s3:GetObject",
				"s3:GetObjectAcl",
			],
			resources: [asset.bucket.bucketArn, `${asset.bucket.bucketArn}/*`]
		}))
	}

	addDeploymentAction(action: DeploymentAction) {
		this.#deploymentActions.push(action)
		if (action instanceof CloudFrontDistributionInvalidationDeploymentAction) {
			this.#handlerRole.addToPolicy(new iam.PolicyStatement({
				actions: ["cloudfront:CreateInvalidation"],
				resources: [getDistributionArn(action.distribution)]
			}))
		}
	}
}

function getDistributionArn(distribution: cloudfront.IDistribution): string {
	return `arn:aws:cloudfront::${distribution.stack.account}:distribution/${distribution.distributionId}`
}
