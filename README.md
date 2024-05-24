## cdk-managed-objects-bucket

### Experimental Notice

This package is brand new and highly experimental so breaking changes may be made without notice.

### About

ManagedObjectsBucket is a CDK construct representing a bucket and the objects within it. It extends the Bucket construct.

Objects can be defined by:
1. An Asset, by calling addObjectsFromAsset.
2. CDK code, by calling addObject.

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