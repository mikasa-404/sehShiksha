//need a centralized way to start and manage all background processors 
// //(DB queue, email queue, message queue)

import MessageQueueProcessor from './processors/messageQueueProcessor.js';

class BackgroundServiceManager {
    constructor() {
        this.services = [
            // { name: 'DB Queue Processor', instance: DbQueueProcessor },
            // { name: 'Email Queue Processor', instance: EmailQueueProcessor },
            { name: 'Message Queue Processor', instance: MessageQueueProcessor }
        ];

        this.isRunning = false;
        this.setupGracefulShutdown();
    }

    async start() {
        try {
            if (this.isRunning) {
                console.log('Background services are already running');
                return;
            }
            console.log('Starting background notification services...');

            this.services.forEach(service => {
                console.log(`Starting ${service.name}...`);
                service.instance.start();
            });
            this.isRunning = true;

            console.log('Background notification services started successfully');
        } catch (error) {
            console.error('Error starting background notification services:', error);
            await this.stopServices();
            throw error;
        }

    }

    async stopServices() {
        try {
            if (!this.isRunning) {
                console.log('Background services are not running');
                return;
            }
            this.services.forEach(service => {
                console.log(`Stopping ${service.name}...`);
                service.instance.stop();
            });
            this.isRunning = false;
            console.log('✅ All background services stopped successfully');
        } catch (error) {
            console.error('Error stopping background notification services:', error);
            throw error;
        }

    }

    setupGracefulShutdown() {
        try {
            const shutdown = async (signal) => {
                console.log(`Received ${signal}, shutting down gracefully...`);

                try {
                    await this.stopServices();
                    console.log('✅ Graceful shutdown completed');
                    process.exit(0);
                } catch (error) {
                    console.error('❌ Error during shutdown:', error);
                    process.exit(1);
                }
            };

            // Handle different shutdown signals
            process.on('SIGTERM', () => shutdown('SIGTERM'));
            process.on('SIGINT', () => shutdown('SIGINT'));
            process.on('SIGUSR2', () => shutdown('SIGUSR2')); // Nodemon restart
        } catch (error) {
            console.error('Error setting up graceful shutdown:', error);
            throw error;
        }
    }
}
export default new BackgroundServiceManager();
