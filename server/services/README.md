# Services Directory

This directory contains all external service integrations and business logic services.

## AWS Services (`/aws`)

Contains all AWS service integrations with proper separation of concerns.

### Current Services:
- **S3 Service** (`s3Service.js`) - File upload/download operations
- **AWS Config** (`config.js`) - Centralized AWS client configurations

### Planned Services:
- **SNS Service** (`snsService.js`) - Simple Notification Service for push notifications
- **SQS Service** (`sqsService.js`) - Simple Queue Service for message queuing

### Usage:

```javascript
// Import specific services
import { generateUploadUrl, generateDownloadUrl } from '../services/aws/s3Service.js';

// Or import from the main AWS index
import { generateUploadUrl, generateDownloadUrl } from '../services/aws/index.js';
```

### Environment Variables Required:
- `AWS_REGION` - AWS region for services
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret access key  
- `AWS_BUCKET_NAME` - S3 bucket name

### Adding New AWS Services:
1. Create the service file in `/aws` directory
2. Export functions from the service file
3. Add exports to `/aws/index.js`
4. Update this README with usage examples
