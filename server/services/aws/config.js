import { S3Client } from "@aws-sdk/client-s3";
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
