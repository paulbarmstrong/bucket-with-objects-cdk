[cdk-managed-objects-bucket](../index.md) / ManagedObjectsBucket

# Class: ManagedObjectsBucket

An S3 Bucket that has its objects defined in CDK. Objects are added by calling the
`addObject` and `addObjectsFromAsset` methods.

The objects in the bucket are completely managed by CDK. A `Custom::ManagedBucketObjects`
CFN resource internal to the ManagedObjectsBucket construct mutates objects in the bucket
to align the bucket with the objects defined in the CDK definition. The objects in the
bucket are otherwise read-only.

ManagedObjectsBucket extends Bucket. All props from Bucket are allowed except:

1. `removalPolicy` and `autoDeleteObjects` are not configurable. ManagedObjectsBuckets are
always emptied and destroyed on removal.

In the event of ManagedObjectsBucket's `Custom::ManagedBucketObjects` custom resource having
a persistent problem, you can unblock your stack by adding the following environment variable
to the ObjectManagerFunction lambda function also inside the stack:

Key: `SKIP`, Value: `true`

## Hierarchy

- `Bucket`

  ↳ **`ManagedObjectsBucket`**

## Table of contents

### Constructors

- [constructor](ManagedObjectsBucket.md#constructor)

### Methods

- [addObject](ManagedObjectsBucket.md#addobject)
- [addObjectChangeAction](ManagedObjectsBucket.md#addobjectchangeaction)
- [addObjectsFromAsset](ManagedObjectsBucket.md#addobjectsfromasset)

## Constructors

### constructor

• **new ManagedObjectsBucket**(`scope`, `id`, `props`): [`ManagedObjectsBucket`](ManagedObjectsBucket.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`ManagedObjectsBucketProps`](../index.md#managedobjectsbucketprops) |

#### Returns

[`ManagedObjectsBucket`](ManagedObjectsBucket.md)

#### Overrides

s3.Bucket.constructor

#### Defined in

[constructs/managed-objects-bucket.ts:86](https://github.com/paulbarmstrong/cdk-managed-objects-bucket/blob/main/lib/constructs/managed-objects-bucket.ts#L86)

## Methods

### addObject

▸ **addObject**(`props`): `void`

Add an object to the bucket based on a given key and body. Deploy-time values from the CDK
like resource ARNs can be used here.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Object` | - |
| `props.body` | `string` | Content to be stored within the S3 object. |
| `props.key` | `string` | S3 object key for the object. |

#### Returns

`void`

#### Defined in

[constructs/managed-objects-bucket.ts:163](https://github.com/paulbarmstrong/cdk-managed-objects-bucket/blob/main/lib/constructs/managed-objects-bucket.ts#L163)

___

### addObjectChangeAction

▸ **addObjectChangeAction**(`action`): `void`

Add an action to be performed when objects in the bucket are changed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`ObjectChangeAction`](ObjectChangeAction.md) |

#### Returns

`void`

#### Defined in

[constructs/managed-objects-bucket.ts:197](https://github.com/paulbarmstrong/cdk-managed-objects-bucket/blob/main/lib/constructs/managed-objects-bucket.ts#L197)

___

### addObjectsFromAsset

▸ **addObjectsFromAsset**(`props`): `void`

Add objects to the bucket based on an [Asset](
https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3_assets-readme.html).
For example:

`bucket.addObjectsFromAsset({ asset: new Asset(this, "MyAsset", { path: "./my-local-files" }) })`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Object` | - |
| `props.asset` | `Asset` | The [Asset](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3_assets-readme.html ) to be added to the bucket. |

#### Returns

`void`

#### Defined in

[constructs/managed-objects-bucket.ts:181](https://github.com/paulbarmstrong/cdk-managed-objects-bucket/blob/main/lib/constructs/managed-objects-bucket.ts#L181)
