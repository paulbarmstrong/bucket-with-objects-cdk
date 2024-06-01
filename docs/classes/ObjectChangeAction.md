[@paulbarmstrong/cdk-managed-objects-bucket](../index.md) / ObjectChangeAction

# Class: ObjectChangeAction

An action to be performed when changes are made to the objects in the bucket.

## Table of contents

### Constructors

- [constructor](ObjectChangeAction.md#constructor)

### Methods

- [cloudFrontInvalidation](ObjectChangeAction.md#cloudfrontinvalidation)

## Constructors

### constructor

• **new ObjectChangeAction**(): [`ObjectChangeAction`](ObjectChangeAction.md)

#### Returns

[`ObjectChangeAction`](ObjectChangeAction.md)

## Methods

### cloudFrontInvalidation

▸ **cloudFrontInvalidation**(`props`): `CloudFrontInvalidationObjectChangeAction`

ObjectChangeAction for performing a CloudFront invalidation after objects
in the bucket have changed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `CloudFrontInvalidationObjectChangeActionProps` |

#### Returns

`CloudFrontInvalidationObjectChangeAction`

#### Defined in

[constructs/managed-objects-bucket.ts:43](https://github.com/paulbarmstrong/cdk-managed-objects-bucket/blob/main/lib/constructs/managed-objects-bucket.ts#L43)
