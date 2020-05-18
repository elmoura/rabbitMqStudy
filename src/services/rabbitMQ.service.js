const amqp = require('amqplib/callback_api');
require('dotenv/config')

class RabbitMQ {

    connect() {
        return new Promise((resolve, reject) => {

            amqp.connect(process.env.QUEUE_ADDRESS, (err, connection) => {

                if (err) {
                    return reject(err);
                }

                return resolve(connection);
            });

        });
    }

    createChannel(connection) {

        return new Promise((resolve, reject) => {
            connection.createChannel((err, channel) => {
                if (err) {
                    return reject(err);
                }
                return resolve(channel);
            });

        });
    }
}

module.exports = new RabbitMQ();