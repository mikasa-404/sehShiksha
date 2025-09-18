import { SNSClient } from "@aws-sdk/client-sns";
import { AWS_CONFIG } from "./config.js";

// SNS Client Configuration
export const snsClient = new SNSClient({
  region: AWS_CONFIG.REGION,
});

// TODO: Implement SNS service functions
// Example functions that will be implemented:
// - publishMessage()
// - createTopic()
// - subscribe()
// - unsubscribe()

export const publishMessage = async (topicArn, message, subject = null) => {
  // Implementation will be added when SNS is integrated
  throw new Error("SNS service not yet implemented");
};

export const createTopic = async (topicName) => {
  // Implementation will be added when SNS is integrated
  throw new Error("SNS service not yet implemented");
};
