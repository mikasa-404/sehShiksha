//read messages from the queue and process them by sending real time notifications to the users
// Queue processors run as separate background services that continuously poll SQS queues and process messages asynchronously.
import { receiveMessage, deleteMessage } from '../aws/sqsService.js';
import { MESSAGE_QUEUE_URL } from '../aws/config.js';

class MessageQueueProcessor {
    constructor() {
        this.isRunning = false;
        this.pollingDelay = 5000; // 5 seconds delay between polling cycles
    }

    start() {
        if (this.isRunning) {
            console.log('Message queue processor is already running');
            return;
        }

        this.isRunning = true;
        console.log('Starting message queue processor...');
        this.startPolling();
    }

    stop() {
        if (!this.isRunning) {
            console.log('Message queue processor is not running');
            return;
        }
        this.isRunning = false;
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
            this.pollingInterval = null;
        }
        console.log('Message queue processor stopped');
    }

    isRunning() {
        return this.isRunning;
    }
    /**
       * Process messages from SQS queue
       */
    async processMessages() {
        if (!this.isRunning) {
            return;
        }
        
        try {
            const messages = await receiveMessage(10);
            if (messages && messages.length > 0) {
                console.log('Processing messages:', messages.length);
                const processingPromises = messages.map(message => this.processMessage(message));
                await Promise.allSettled(processingPromises);
            } else {
                console.log('No messages to process, waiting...');
            }
        } catch(error) {
            console.error('Error processing messages:', error);
            // Don't throw error to prevent stopping the polling
        }
    }

    async processMessage(message) {
        try {
            console.log('Processing message:', message.MessageId);
            const notificationData = message.ParsedData;
            console.log('Notification data:', message);
            const eventType = notificationData.eventType;
            // TODO: Process the notification (send to users, etc.)
            //NEW_POST CASE

            // Delete message after successful processing
            // if (message.ReceiptHandle) {
            //     await deleteMessage(message.ReceiptHandle);
            //     console.log('Message deleted successfully:', message.MessageId);
            // }
            
        } catch(error) {
            console.error('Error processing message:', error);
            throw error;
        }
    }

    startPolling() {
        // Start the polling loop immediately
        this.processMessages();
        
        // Set up interval for continuous polling
        this.pollingInterval = setInterval(() => {
            if (this.isRunning) {
                this.processMessages();
            }
        }, this.pollingDelay);
        
        console.log(`Message processor started with ${this.pollingDelay}ms interval`);
    }


}

export default new MessageQueueProcessor();
