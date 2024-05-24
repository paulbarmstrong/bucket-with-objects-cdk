## cdk-managed-objects-bucket

### Experimental Notice

This package is brand new and highly experimental so breaking changes may be made without notice.

### About

ManagedObjectsBucket is a CDK construct extending the Bucket construct to provide object
management. An "object manager" custom CFN resource internal to the ManagedObjectsBucket
construct mutates objects in the bucket to align the bucket with the objects defined in
the CDK definition. The objects in the bucket are otherwise read-only.

Objects can be defined by:
1. An Asset, by calling addObjectsFromAsset.
2. CDK code, by calling addObject.

Benefits over [DeploymentBucket](
https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3_deployment.BucketDeployment.html
) include:

1. ManagedObjectsBucket has much stronger ownership of its objects in the bucket since it
provides a layer of encapsulation around the bucket itself and does not let any other
identities mutate objects within the bucket. That eliminates the possibility of the bucket's
objects being mistaken as anything other than objects defined and managed by mechanisms within
the CDK.
2. ManagedObjectsBucket allows adding objects based on an [Asset](
https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3_assets-readme.html). That allows
gives consumers more configurability than only allowing a local path to be specified. Asset
allows consumers to, for example, run some code to bundle their local files as a part of the CDK
synthesis process.
3. ManagedObjectsBucket updates are multiple times faster than BucketDeployment updates. That's
because BucketDeployment's default python runtime lambda function loads
the entire AWS CLI in order to do `aws s3 sync`, while ManagedObjectsBucket's lambda
function uses [the s3-sync-client NPM package](https://www.npmjs.com/package/s3-sync-client) for it.
4. ManagedObjectsBucket allows creating CloudFront invalidations after object updates without
waiting for the invalidation to complete. That allows stack updates to be much faster for
consumers who need to have an invalidation created when objects have been updated, but don't
actually need to wait for it to complete.

### Limitations

1. The total size of objects in the bucket must not exceed 5 gigabytes.

### Usage

This is an example of how it may be used in a CDK app:

```typescript
import * as cdk from "aws-cdk-lib"
import * as logs from "aws-cdk-lib/aws-logs"
import * as s3_assets from "aws-cdk-lib/aws-s3-assets"
import { ManagedObjectsBucket } from "cdk-managed-objects-bucket"
import { Construct } from "constructs"

export class ManagedObjectsBucketTestStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props)
		const bucket = new ManagedObjectsBucket(this, "Bucket", {
			bucketName: "managed-objects-bucket-test-bucket"
		})
		bucket.addObjectsFromAsset({
			asset: new s3_assets.Asset(this, "TestAsset", { path: "./test-asset" })
		})
		bucket.addObject({
			key: "config.json",
			content: JSON.stringify({ "bucketArn": bucket.bucketArn })
		})
	}
}
```

### Documentation

Please see [the low level documentation](https://github.com/paulbarmstrong/cdk-managed-objects-bucket/blob/main/docs/index.md) for more details.
