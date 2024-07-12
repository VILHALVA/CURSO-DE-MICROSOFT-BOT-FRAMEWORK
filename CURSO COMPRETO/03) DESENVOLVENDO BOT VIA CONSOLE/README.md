# DESENVOLVENDO BOT VIA CONSOLE
Para desenvolver um bot que interaja via console utilizando o Microsoft Bot Framework com Node.js, você precisará fazer algumas adaptações, pois o framework é geralmente usado para bots que interagem via serviços web. No entanto, você pode simular as interações do usuário e do bot diretamente no console.

## Passo 1: Configuração do Ambiente de Desenvolvimento
1. **Instalação do Node.js e npm**:
   - Baixe e instale o Node.js em [nodejs.org](https://nodejs.org).
   - Verifique a instalação com os comandos:
     ```bash
     node -v
     npm -v
     ```

2. **Instalação do Visual Studio Code**:
   - Baixe e instale o Visual Studio Code em [code.visualstudio.com](https://code.visualstudio.com).

3. **Criação do Projeto**:
   - Crie um diretório para o seu projeto e inicialize um projeto Node.js:
     ```bash
     mkdir meu-bot-console
     cd meu-bot-console
     npm init -y
     ```

4. **Instalação das Dependências**:
   - Instale o `botbuilder`:
     ```bash
     npm install --save botbuilder
     ```

## Passo 2: Criação do Bot
1. **Crie um Arquivo para o Bot**:
   - No diretório do projeto, crie um arquivo chamado `app.js`:
     ```bash
     touch app.js
     ```

2. **Edite o Arquivo `app.js`**:
   - Abra o `app.js` no Visual Studio Code e adicione o seguinte código:

   ```javascript
   const { UniversalBot, ConsoleConnector } = require('botbuilder');

   // Criação do conector de console para comunicação com o bot via terminal
   const connector = new ConsoleConnector().listen();

   // Criação do bot universal que irá lidar com as interações do usuário
   const bot = new UniversalBot(connector);

   // Diálogo inicial do bot
   bot.dialog('/', [
       (session) => {
           session.send('Olá! Eu sou um bot simples.');
           session.beginDialog('/perguntarNome');
       }
   ]);

   // Diálogo para perguntar o nome do usuário
   bot.dialog('/perguntarNome', [
       (session) => {
           session.send('Qual é o seu nome?');
           session.beginDialog('/respostaNome');
       },
       (session, results) => {
           session.endDialog(`Olá, ${results.response}!`);
       }
   ]);

   // Diálogo para capturar a resposta do usuário
   bot.dialog('/respostaNome', [
       (session, results) => {
           session.endDialogWithResult({ response: results.response });
       }
   ]);
   ```

## Passo 3: Execução do Bot
1. **Inicie o Bot**:
   - No terminal, navegue até o diretório do projeto e execute o comando:
     ```bash
     node app.js
     ```

2. **Interaja com o Bot**:
   - No console, você verá as mensagens do bot e poderá interagir com ele digitando suas respostas.

## Explicação do Código
- **Imports**: Importamos os módulos necessários do `botbuilder`.
- **Conector de Console**: Utilizamos o `ConsoleConnector` para permitir a comunicação com o bot via terminal.
- **Criação do Bot Universal**: Criamos um `UniversalBot` que gerencia os diálogos e interações com os usuários através do conector configurado.
- **Diálogos**: Definimos diálogos para o bot, onde ele envia uma mensagem de boas-vindas, pergunta o nome do usuário e responde com uma saudação personalizada.

## Conclusão
Este exemplo demonstra como desenvolver um bot que interage via console utilizando o Microsoft Bot Framework com Node.js. Isso pode ser útil para fins de teste ou para criar bots simples que não necessitam de uma interface web ou integração com outros serviços de comunicação.