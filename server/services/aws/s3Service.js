import {
  PutObjectCommand,
  GetObjectCommand,
//   DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import { s3Client, AWS_CONFIG } from "./config.js";

/**
 * Generate a pre-signed URL for uploading an object to S3
 * @param {string} filename - Original filename
 * @param {string} contentType - MIME type of the file
 * @param {string} folder - S3 folder/prefix (default: 'posts')
 * @returns {Object} - Object containing the pre-signed URL and unique filename
 */
export const generateUploadUrl = async (filename, contentType, folder = 'posts') => {
  try {
    const uniqueFilename = `${uuidv4()}-${filename}`;
    const key = `${folder}/${uniqueFilename}`;
    
    const command = new PutObjectCommand({
      Bucket: AWS_CONFIG.BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });
    
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour expiry
    
    return { 
      url, 
      uniqueFilename,
      key 
    };
  } catch (error) {
    throw new Error(`Failed to generate upload URL: ${error.message}`);
  }
};

/**
 * Generate a pre-signed URL for downloading/viewing an object from S3
 * @param {string} key - S3 object key
 * @param {string} folder - S3 folder/prefix (default: 'posts')
 * @returns {string} - Pre-signed URL for accessing the object
 */
export const generateDownloadUrl = async (key, folder = 'posts') => {
  try {
    const objectKey = key.includes('/') ? key : `${folder}/${key}`;
    
    const command = new GetObjectCommand({
      Bucket: AWS_CONFIG.BUCKET_NAME,
      Key: objectKey,
    });
    
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour expiry
    
    return url;
  } catch (error) {
    throw new Error(`Failed to generate download URL: ${error.message}`);
  }
};

// /**
//  * Delete an object from S3
//  * @param {string} key - S3 object key
//  * @param {string} folder - S3 folder/prefix (default: 'posts')
//  * @returns {boolean} - Success status
//  */
// export const deleteObject = async (key, folder = 'posts') => {
//   try {
//     const objectKey = key.includes('/') ? key : `${folder}/${key}`;
    
//     const command = new DeleteObjectCommand({
//       Bucket: AWS_CONFIG.BUCKET_NAME,
//       Key: objectKey,
//     });
    
//     await s3Client.send(command);
    
//     return true;
//   } catch (error) {
//     throw new Error(`Failed to delete object: ${error.message}`);
//   }
// };

