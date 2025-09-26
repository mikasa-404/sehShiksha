import { MESSAGE_QUEUE_URL, sqsClient } from "./config.js";
import { ReceiveMessageCommand, DeleteMessageCommand, SendMessageCommand } from "@aws-sdk/client-sqs";

// TODO: Implement SQS service functions
// Example functions that will be implemented:
// - sendMessage()
// - receiveMessage()
// - deleteMessage()
// - createQueue()
// - purgeQueue()

export const sendMessage = async (messageBody, attributes = {}) => {
    try {
        const command = new SendMessageCommand({
            QueueUrl: MESSAGE_QUEUE_URL,
            MessageBody: JSON.stringify(messageBody),
            MessageAttributes: Object.keys(attributes).reduce((acc, key) => {
                acc[key] = {
                    DataType: 'String',
                    StringValue: String(attributes[key])
                };
                return acc;
            }, {})
        });
        
        const result = await sqsClient.send(command);
        console.log('Message sent to SQS:', result.MessageId);
        return result;
    } catch (error) {
        console.error('Error sending message to SQS:', error);
        throw error;
    }
};

export const receiveMessage = async (maxMessages = 1) => {
    const command = new ReceiveMessageCommand({
        QueueUrl: MESSAGE_QUEUE_URL,
        MaxNumberOfMessages: maxMessages,
        MessageAttributeNames: ['All'], // Get all message attributes
    });
    const result = await sqsClient.send(command);
    
    if (!result.Messages) {
        return [];
    }
    
    // Parse the message body and add parsed content
    const parsedMessages = result.Messages.map(message => {
        let parsedData = null;
        try {
            // SNS sends the message in message.Body as a JSON string
            const parsedBody = JSON.parse(message.Body);
            parsedData = JSON.parse(parsedBody.Message);
        } catch (error) {
            console.error('Error parsing message body:', error);
            // parsedData = { rawBody: message.Message };
        }
        
        return {
            ...message,
            ParsedData: parsedData
        };
    });
    
    console.log('Received messages:', parsedMessages.length);
    return parsedMessages;
};

export const deleteMessage = async (receiptHandle) => {
    try{
        const command = new DeleteMessageCommand({
            QueueUrl: MESSAGE_QUEUE_URL,
            ReceiptHandle: receiptHandle,
        });
        const result = await sqsClient.send(command);
        return result;
    }catch(error){
      
    }
};

