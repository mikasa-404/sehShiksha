import { SQSClient } from "@aws-sdk/client-sqs";
import { AWS_CONFIG } from "./config.js";

// SQS Client Configuration
export const sqsClient = new SQSClient({
  region: AWS_CONFIG.REGION,
});

// TODO: Implement SQS service functions
// Example functions that will be implemented:
// - sendMessage()
// - receiveMessage()
// - deleteMessage()
// - createQueue()
// - purgeQueue()

export const sendMessage = async (queueUrl, messageBody, attributes = {}) => {
  // Implementation will be added when SQS is integrated
  throw new Error("SQS service not yet implemented");
};

export const receiveMessage = async (queueUrl, maxMessages = 1) => {
  // Implementation will be added when SQS is integrated
  throw new Error("SQS service not yet implemented");
};

export const createQueue = async (queueName, attributes = {}) => {
  // Implementation will be added when SQS is integrated
  throw new Error("SQS service not yet implemented");
};
