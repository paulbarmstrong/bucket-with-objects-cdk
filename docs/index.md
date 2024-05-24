cdk-managed-objects-bucket

# cdk-managed-objects-bucket

## Table of contents

### Classes

- [DeploymentAction](classes/DeploymentAction.md)
- [ManagedObjectsBucket](classes/ManagedObjectsBucket.md)

### Type Aliases

- [ManagedObjectsBucketProps](index.md#managedobjectsbucketprops)

## Type Aliases

### ManagedObjectsBucketProps

Ƭ **ManagedObjectsBucketProps**: `Partial`\<`Omit`\<`Omit`\<`s3.BucketProps`, ``"removalPolicy"``\>, ``"autoDeleteObjects"``\>\> & \{ `objectManagerLogGroup?`: `logs.ILogGroup`  }

#### Defined in

[constructs/managed-objects-bucket.ts:13](https://github.com/paulbarmstrong/cdk-managed-objects-bucket/blob/main/lib/constructs/managed-objects-bucket.ts#L13)
