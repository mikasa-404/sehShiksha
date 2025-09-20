import { S3Client } from "@aws-sdk/client-s3";
import { SNSClient } from "@aws-sdk/client-sns";
import { SQSClient } from "@aws-sdk/client-sqs";
import dotenv from "dotenv";

dotenv.config();

// AWS S3 Client Configuration
export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// AWS Configuration Constants
export const AWS_CONFIG = {
  BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  REGION: process.env.AWS_REGION,
};

export const snsClient = new SNSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const sqsClient = new SQSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Topic and Queue URLs (set these in environment variables)
export const NOTIFICATION_TOPIC_ARN = process.env.NOTIFICATION_TOPIC_ARN;
export const MESSAGE_QUEUE_URL = process.env.MESSAGE_QUEUE_URL;
export const EMAIL_QUEUE_URL = process.env.EMAIL_QUEUE_URL;
export const DB_QUEUE_URL = process.env.DB_QUEUE_URL;