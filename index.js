const { DynamoDBClient, ScanCommand, PutItemCommand  } = require("@aws-sdk/client-dynamodb");

exports.handler = async (event, context) => {
    
    const client = new DynamoDBClient()
    let command = new ScanCommand({TableName: "newsletter"})
    let response = await client.send(command);
    let data = response.Items
    
    let userEmail = event["email"]
    if(userEmail){
        // TODO implement
        let found = false;
        for(let item of data){
            if(item["email"]["S"] === userEmail){
                found = true
                break
            }
        };
        
        if(!found){
            try {
                /* code */
                const putCommand = new PutItemCommand({TableName: "newsletter", Item: {email: {"S": userEmail}}});
                let res = await client.send(putCommand);
            } catch (e) {
                response = {
                    statusCode: 500,
                    body: JSON.stringify(`It looks like you've found a bug. We're working on it, 
                    if possible please try again later.`),
                }
            }
            response = {
                    statusCode: 201,
                    body: JSON.stringify("subscription successful"),
                }
        } else{
            response = {
                    statusCode: 400,
                    body: JSON.stringify("email already exists")
                }
        }
        
        return response
    };
    
    return {
            statusCode: 406,
            body: JSON.stringify("Please provide a valid input")
        }
};
