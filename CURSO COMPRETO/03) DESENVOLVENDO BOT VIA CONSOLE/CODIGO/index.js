var builder = require('botbuilder');

//Aqui estou criando um conector para usar o Bot via Console:
var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

//Aqui nós vamos criar o nosso diálogo para o nosso bot:
bot.dialog('/', [
    function(session) {
        session.send('Olá Vilhalva!!!');
    }
]);


