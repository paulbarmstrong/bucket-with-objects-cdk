[cdk-managed-objects-bucket](../index.md) / ManagedObjectsBucket

# Class: ManagedObjectsBucket

An S3 Bucket that has its objects defined in CDK. Objects are added by calling the
`addManagedObject` and `addManagedObjectsFromAsset` methods.

The objects in the bucket are completely managed by CDK. An "object manager" custom CFN
resource internal to the ManagedObjectsBucket construct mutates objects in the bucket
to align the bucket with the objects defined in the CDK definition. The objects in the
bucket are otherwise read-only.

ManagedObjectsBucket extends Bucket. All props from Bucket are allowed except:

1. `removalPolicy` and `autoDeleteObjects` are not configurable. ManagedObjectsBuckets are
always emptied and destroyed on removal.

## Hierarchy

- `Bucket`

  ↳ **`ManagedObjectsBucket`**

## Table of contents

### Constructors

- [constructor](ManagedObjectsBucket.md#constructor)

### Methods

- [addManagedObject](ManagedObjectsBucket.md#addmanagedobject)
- [addManagedObjectChangeAction](ManagedObjectsBucket.md#addmanagedobjectchangeaction)
- [addManagedObjectsFromAsset](ManagedObjectsBucket.md#addmanagedobjectsfromasset)

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

[constructs/managed-objects-bucket.ts:80](https://github.com/paulbarmstrong/cdk-managed-objects-bucket/blob/main/lib/constructs/managed-objects-bucket.ts#L80)

## Methods

### addManagedObject

▸ **addManagedObject**(`props`): `void`

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

[constructs/managed-objects-bucket.ts:157](https://github.com/paulbarmstrong/cdk-managed-objects-bucket/blob/main/lib/constructs/managed-objects-bucket.ts#L157)

___

### addManagedObjectChangeAction

▸ **addManagedObjectChangeAction**(`action`): `void`

Add an action to be performed when objects in the bucket are changed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`ObjectChangeAction`](ObjectChangeAction.md) |

#### Returns

`void`

#### Defined in

[constructs/managed-objects-bucket.ts:194](https://github.com/paulbarmstrong/cdk-managed-objects-bucket/blob/main/lib/constructs/managed-objects-bucket.ts#L194)

___

### addManagedObjectsFromAsset

▸ **addManagedObjectsFromAsset**(`props`): `void`

Add objects to the bucket based on an [Asset](
https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3_assets-readme.html).
For example:

```
import { Asset } from "aws-cdk-lib/aws-s3-assets"
bucket.addManagedObjectsFromAsset({ asset: new Asset(this, "MyAsset", { path: "./my-local-files" }) })
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Object` | - |
| `props.asset` | `Asset` | The [Asset](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3_assets-readme.html ) to be added to the bucket. |

#### Returns

`void`

#### Defined in

[constructs/managed-objects-bucket.ts:178](https://github.com/paulbarmstrong/cdk-managed-objects-bucket/blob/main/lib/constructs/managed-objects-bucket.ts#L178)
