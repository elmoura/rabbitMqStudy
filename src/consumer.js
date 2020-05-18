(async() => {

    const rabbitMQ = require('./services/rabbitMQ.service')

    const connection = await rabbitMQ.connect();

    console.log('connected!');

    const channel = await rabbitMQ.createChannel(connection);

    console.log('created channel!');

    //Determina quantidade de leituras por vez
    channel.prefetch(100);

    channel.consume('logs', async msg => {

        //caso seja JSON, mandar um stringfy!
        console.log('Message =>', msg.content.toString());

        //Pode ser qualquer coisa aqui, por exemplo:
        // - salvar informações no banco;
        // - enviar mensagem para outro sistema;

        channel.ack(msg);

    }, {
        //Falso throw => Pesquisar depois!
        noAck: false
    });

})();