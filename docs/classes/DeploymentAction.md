[cdk-managed-objects-bucket](../index.md) / DeploymentAction

# Class: DeploymentAction

An action to be performed when changes are made to the objects in the bucket.

## Table of contents

### Methods

- [cloudFrontDistributionInvalidation](DeploymentAction.md#cloudfrontdistributioninvalidation)

## Methods

### cloudFrontDistributionInvalidation

▸ **cloudFrontDistributionInvalidation**(`props`): `CloudFrontDistributionInvalidationDeploymentAction`

DeploymentAction for performing an invalidation on a CloudFront distribution after objects
in the bucket have changed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `CloudFrontDistributionInvalidationDeploymentActionProps` |

#### Returns

`CloudFrontDistributionInvalidationDeploymentAction`

#### Defined in

[constructs/managed-objects-bucket.ts:44](https://github.com/paulbarmstrong/cdk-managed-objects-bucket/blob/main/lib/constructs/managed-objects-bucket.ts#L44)
