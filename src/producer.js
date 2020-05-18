(async() => {

    const rabbitMQ = require('./services/rabbitMQ.service')

    const connection = await rabbitMQ.connect();

    console.log('connected!');

    const channel = await rabbitMQ.createChannel(connection);

    console.log('created channel!');

    channel.assertQueue('logs', {
        durable: true
    });

    for (let index = 0; index <= 100; index++) {

        //PRECISA SER BUFFER!
        channel.sendToQueue('logs', Buffer.from(`Message ${index}`));

        console.log(`message ${index} sent!`);
    }

})();