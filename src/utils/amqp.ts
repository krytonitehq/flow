import * as amqp from 'amqplib/callback_api';

class AMQPUtil {
    private connection: amqp.Connection | null = null;
    private channel: amqp.Channel | null = null;

    constructor(private url: string) {}

    public async connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            amqp.connect(this.url, (error, connection) => {
                if (error) {
                    reject(error);
                } else {
                    this.connection = connection;
                    resolve();
                }
            });
        });
    }

    public async createChannel(callback: (error: Error | null) => void): Promise<void> {
        if (!this.connection) {
            callback(new Error('Connection not established.'));
            return;
        }
        this.connection.createChannel((error, channel) => {
            if (error) {
                callback(error);
            } else {
                this.channel = channel;
                callback(null);
            }
        });
    }

    public async publish(queueName: string, message: string): Promise<void> {
        if (!this.channel) {
            throw new Error('Channel not created.');
        }
        this.channel.assertQueue(queueName, { durable: true });
        this.channel.sendToQueue(queueName, Buffer.from(message), { persistent: true });
    }

    public async consume(queueName: string, callback: (message: any) => void): Promise<void> {
        if (!this.channel) {
            throw new Error('Channel not created.');
        }
        this.channel.assertQueue(queueName, { durable: true });
        this.channel.consume(queueName, (msg) => {
            if (msg !== null) {
                callback(msg.content.toString());
                this.channel!.ack(msg);
            }
        });
    }

    public async close(): Promise<void> {
        if (this.channel) {
            await new Promise<void>((resolve, reject) => {
                this.channel!.close((error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            }).catch(console.error);
        }

        if (this.connection) {
            this.connection.close();
        }
    }
}

export default AMQPUtil;
