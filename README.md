### AWS Newsletter Lambda Function

## Description
This is a node.js lambda function (index.js) and a node.js layer that includes the latest aws-sdk. Emails are validated according to the RFC 5322 Format. Validation of uniqueness is also performed to ensure there are no duplicate emails. 