export type AmplifyDependentResourcesAttributes = {
  "api": {
    "WelcomeAboard": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "function": {
    "createTicket": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "storage": {
    "s3welcomeaboardstoragedocument": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}