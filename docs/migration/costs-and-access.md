# Costs and required access

Prepared October 10, 2026 for AWS account **764595992126**. The **USD 250 monthly ceiling applies only to timothymunroroberts.com**. It is not a spending target or authorization to add unrelated services. No resources or billing controls have been created.

## Planning estimate

The draft uses pay-as-you-go S3 and CloudFront with Price Class 100. For a planning example with US viewer traffic, 100 GB delivered per month, one million HTTPS requests, one function invocation per request, and 1 GB of S3 storage including versions:

| Component | Planning amount per month |
| --- | ---: |
| CloudFront delivery, 100 GB at USD 0.085/GB | USD 8.50 |
| HTTPS requests, one million at USD 0.01/10,000 | USD 1.00 |
| CloudFront Function, one million invocations | USD 0.10 |
| S3 Standard, 1 GB at USD 0.023/GB-month | About USD 0.02 |
| S3 request allowance for a small static site | USD 1.00 reserved |
| Route 53 hosted zone, after approved DNS migration | USD 0.50 |
| Non-exportable ACM public certificate for CloudFront | USD 0.00 |
| Total planning example | About USD 11.12 |

This is an estimate before tax, domain registration, GitHub Actions charges, optional logging, or other services. It does not subtract any free allowances or credits. Visitor geography and actual traffic change the result. Recalculate after measuring the successful export and confirming expected traffic. As a stress example, 1,000 GB at the same transfer rate is USD 85 for delivery alone.

Official [CloudFront usage rates](https://aws.amazon.com/cloudfront/pricing/pay-as-you-go/) support the delivery, request and function assumptions. [S3 pricing](https://aws.amazon.com/s3/pricing/) and the [S3 product pricing overview](https://aws.amazon.com/s3/) cover storage and requests. [Route 53 pricing](https://aws.amazon.com/route53/pricing/) lists USD 0.50 per hosted zone for the first 25 zones; Alias queries to CloudFront have no charge. [ACM pricing](https://aws.amazon.com/certificate-manager/pricing/) lists no charge for non-exportable public certificates used by integrated AWS services.

AWS also advertises CloudFront [flat-rate plans](https://aws.amazon.com/cloudfront/pricing/) from USD 0/month and Pro at USD 15/month. Do not promise either price for this account. Eligibility, existing subscriptions, usage allowances and configuration support remain unverified. The [plan documentation](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/flat-rate-pricing-plan.html) places custom cache policies in Business/Premium tiers, and lists account restrictions, including accounts using AWS Free Tier. This draft includes a custom cache policy and does not enroll in a plan. Review whether a supported managed cache policy and an eligible lower tier would suit this site before approving provisioning. A Free plan and an AWS Free Tier account are different concepts.

## Enforcing the ceiling

Tag resources `Site=timothymunroroberts.com` and activate that cost allocation tag after approval. Verify which charges support tagging, then reconcile any shared or untagged charges so the site's total is not understated. Propose a USD 250 monthly site budget with actual and forecast alerts at USD 25, 50, 100 and 200, with recipients chosen by the user. No notifications have been configured or sent.

AWS Budgets is an alerting mechanism, not an instantaneous cap. [AWS documents billing and notification delays](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html). Pay-as-you-go hosting cannot guarantee a USD 250 maximum by itself. Before production, the user must approve either an eligible fixed-price configuration that covers the required service costs, or an operating response that suspends this site's distribution/uploads before the ceiling is reached. Any automated disable action needs separate approval because it affects availability. Do not enable production while treating alerts as a hard spending limit.

## Access boundaries

No new credentials, GitHub grants, roles, OIDC providers or IAM policies were created. The existing AWS audit connector cannot provision resources, and the delegated context reports expired AWS authentication. Restore that existing connection for read-only inventory first. Provisioning requires a separately approved write-capable AWS session. Do not grant AdministratorAccess.

The recurring content uploader needs only the example actions in [deploy-policy.example.json](../../infra/aws/deploy-policy.example.json): bucket listing/location, object upload and multipart abort on this bucket, plus invalidation creation/status on the one approved distribution. Replace the distribution placeholder only after its ID is known. It has no DNS, certificate, IAM, distribution configuration, object deletion or infrastructure provisioning permissions. `sts:GetCallerIdentity` verifies the account before upload.

The one-time infrastructure operator has a different scope. Review and restrict these action groups to the `tmr-site` stack, named site bucket, approved certificate, and CloudFront resources in account 764595992126. Some create/list operations require `Resource: "*"`; limit those by supported account, region and request-tag conditions. Remove provisioning access after setup if it is temporary.

| Purpose | Required action scope to review |
| --- | --- |
| CloudFormation preview and apply | `CreateChangeSet`, `DescribeChangeSet`, `ExecuteChangeSet`, `DeleteChangeSet`, `DescribeStacks`, `DescribeStackEvents`, `GetTemplate`, `ValidateTemplate`, and stack create/update permissions for the approved stack |
| Private S3 setup | `CreateBucket`; get/put bucket policy, public access block, ownership controls, encryption configuration, versioning, lifecycle configuration and tagging; bucket inspection; rollback cleanup only for resources created by the approved operation |
| CloudFront distribution | Create distribution with tags; get distribution/config; update, tag/untag and list resource tags; approved rollback delete |
| CloudFront OAC and cache policy | Create/get/update/delete the site's origin access control and cache policy, including their config reads |
| CloudFront Function | Create/get/describe/update/publish/test the site's function; approved rollback delete |
| ACM certificate | Request/describe certificate, list/add/remove its tags, and approved rollback delete, restricted to `us-east-1` and the site's names where supported |
| Cost controls, only after approval | Cost Explorer read access, cost allocation tag activation, and create/update/describe the site budget and its approved notifications |

If using a CloudFormation execution role, `iam:PassRole` must name that specific approved role. Creating it is a separate persistent-access action. If future GitHub OIDC is chosen, restrict its audience, repository and protected environment as described in [deployment.md](deployment.md); do not create an account-wide trust.

DNS is a later approval. A complete zone inventory requires existing GoDaddy access. After approval, Route 53 needs only the specific hosted zone creation/read/list/change-record operations and the approved record types/names. Changing registrar nameservers needs separate GoDaddy authorization. This branch grants neither.
