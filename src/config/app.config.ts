import { config } from 'dotenv';

config();

const APP_CONFIG = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 5000,
    HOST: process.env.HOST || '0.0.0.0',
    MAX_MESSAGE_SIZE: process.env.MAX_MESSAGE_SIZE,
    MAX_QUEUE_SIZE: process.env.MAX_QUEUE_SIZE,
    AMQP_CONNECTION_URL: process.env.AMQP_CONNECTION_URL,
};

export { APP_CONFIG };
