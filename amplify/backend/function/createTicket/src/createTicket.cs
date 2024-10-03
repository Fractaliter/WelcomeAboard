
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;


// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

// If you rename this namespace, you will need to update the invocation shim
// to match if you intend to test the function with 'amplify mock function'
namespace createTicket
{
    // If you rename this class, you will need to update the invocation shim
    // to match if you intend to test the function with 'amplify mock function'
    public class CreateTicket
  {
    private readonly IAmazonDynamoDB _dynamoDbClient;

    public CreateTicket()
    {
        _dynamoDbClient = new AmazonDynamoDBClient();
    }

    public async Task<APIGatewayProxyResponse> LambdaHandler(APIGatewayProxyRequest request, ILambdaContext context)
    {
        var response = new APIGatewayProxyResponse
        {
            Headers = new Dictionary<string, string> {
                { "Access-Control-Allow-Origin", "*" },
                { "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" }
            }
        };

        if (request.HttpMethod == "POST")
        {
            context.Logger.LogLine($"Post Request: {request.Path}\n");

            // Deserialize the request body
            var requestBody = JsonSerializer.Deserialize<TicketRequest>(request.Body);

            // Validate the request body
            if (string.IsNullOrEmpty(requestBody.CompanyId) || string.IsNullOrEmpty(requestBody.Description))
            {
                response.StatusCode = (int)HttpStatusCode.BadRequest;
                response.Body = JsonSerializer.Serialize(new { message = "companyId and description are required." });
                return response;
            }

            // Validate if the company exists (Optional: skip this if it's validated elsewhere)
            var companyCheck = await _dynamoDbClient.GetItemAsync(new GetItemRequest
            {
                TableName = "Company",  // Replace with your actual Company table name
                Key = new Dictionary<string, AttributeValue> { { "id", new AttributeValue { S = requestBody.CompanyId } } }
            });

            if (companyCheck.Item == null)
            {
                response.StatusCode = (int)HttpStatusCode.BadRequest;
                response.Body = JsonSerializer.Serialize(new { message = "Invalid companyId." });
                return response;
            }

            // Prepare the DynamoDB item for the ticket
            var newTicket = new Dictionary<string, AttributeValue>
            {
                { "id", new AttributeValue { S = Guid.NewGuid().ToString() } },
                { "status", new AttributeValue { S = requestBody.Status ?? "OPEN" } },
                { "description", new AttributeValue { S = requestBody.Description } },
                { "companyId", new AttributeValue { S = requestBody.CompanyId } },
                { "supportAgentId", new AttributeValue { S = requestBody.SupportAgentId ?? "" } },
                { "createdAt", new AttributeValue { S = DateTime.UtcNow.ToString("o") } },
                { "updatedAt", new AttributeValue { S = DateTime.UtcNow.ToString("o") } }
            };

            // Insert into DynamoDB table
            var putItemRequest = new PutItemRequest
            {
                TableName = "Ticket",  // Replace with your DynamoDB Ticket table name
                Item = newTicket
            };

            try
            {
                await _dynamoDbClient.PutItemAsync(putItemRequest);

                response.StatusCode = (int)HttpStatusCode.Created;
                response.Body = JsonSerializer.Serialize(new { message = "Ticket created successfully.", ticketId = newTicket["id"].S });
            }
            catch (Exception ex)
            {
                context.Logger.LogLine($"Error saving ticket: {ex.Message}");
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                response.Body = JsonSerializer.Serialize(new { message = "Failed to create ticket." });
            }
        }
        else
        {
            response.StatusCode = (int)HttpStatusCode.MethodNotAllowed;
            response.Body = JsonSerializer.Serialize(new { message = "Only POST requests are allowed." });
        }

        return response;
    }

    // Request body model for creating tickets
    public class TicketRequest
    {
        public string CompanyId { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }
        public string SupportAgentId { get; set; }
    }
  }
}
