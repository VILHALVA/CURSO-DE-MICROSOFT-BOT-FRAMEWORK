# PREPARANDO O AMBIENTE DE DESENVOLVIMENTO
## Passo 1: Instalação do Node.js e npm
1. **Node.js e npm**: Certifique-se de ter o Node.js instalado. Você pode baixá-lo em [nodejs.org](https://nodejs.org). O npm (Node Package Manager) será instalado automaticamente junto com o Node.js.
   - Para verificar se o Node.js e o npm estão instalados corretamente, execute os seguintes comandos no terminal:
     ```bash
     node -v
     npm -v
     ```

## Passo 2: Instalação do Visual Studio Code
1. **Visual Studio Code**: Baixe e instale o Visual Studio Code a partir de [code.visualstudio.com](https://code.visualstudio.com). É um editor de código gratuito, leve e altamente extensível, ideal para desenvolvimento com Node.js.

## Passo 3: Configuração do Projeto Node.js
1. **Crie um Diretório para o Projeto**: Abra o terminal e crie um diretório para o seu projeto. Navegue até o diretório criado:
   ```bash
   mkdir meu-bot
   cd meu-bot
   ```

2. **Inicialize o Projeto Node.js**: No diretório do projeto, execute o seguinte comando para inicializar um projeto Node.js:
   ```bash
   npm init -y
   ```

3. **Instale Dependências**: Instale o Microsoft Bot Framework SDK e o Restify, um framework para criar servidores REST em Node.js:
   ```bash
   npm install --save botbuilder restify
   ```

## Passo 4: Criação e Configuração do Bot
1. **Crie um Arquivo para o Bot**: No diretório do projeto, crie um arquivo chamado `app.js`:
   ```bash
   touch app.js
   ```

2. **Edite o Arquivo `app.js`**: Abra o `app.js` no Visual Studio Code e adicione o seguinte código para configurar o bot:

   ```javascript
   const restify = require('restify');
   const { ChatConnector, UniversalBot } = require('botbuilder');

   // Configuração do Server via Restify:
   const server = restify.createServer();
   server.listen(process.env.port || process.env.PORT || 3978, () => {
       console.log('%s Aplicação executando na porta %s', server.name, server.url);
   });

   // Criação do chat connector para comunicar com o serviço do Bot Framework:
   const connector = new ChatConnector({
       appId: process.env.MICROSOFT_APP_ID,
       appPassword: process.env.MICROSOFT_APP_PASSWORD
   });

   // Endpoint para executar as mensagens para os usuários
   server.post('/api/messages', connector.listen());

   // Criação do bot universal que irá lidar com as interações do usuário:
   const bot = new UniversalBot(connector);

   // Diálogo inicial do bot:
   bot.dialog('/', [
       (session) => {
           session.send('Olá! Eu sou um bot simples.');
           session.beginDialog('/perguntarNome');
       }
   ]);

   bot.dialog('/perguntarNome', [
       (session) => {
           session.send('Qual é o seu nome?');
           session.beginDialog('/respostaNome');
       },
       (session, results) => {
           session.endDialog(`Olá, ${results.response}!`);
       }
   ]);

   bot.dialog('/respostaNome', [
       (session, results) => {
           session.endDialogWithResult({ response: results.response });
       }
   ]);
   ```

## Passo 5: Execução do Bot
1. **Inicie o Bot**: No terminal, navegue até o diretório do projeto e execute o seguinte comando para iniciar o bot:
   ```bash
   node app.js
   ```

## Passo 6: Teste do Bot
1. **Teste Local**: Use o Bot Framework Emulator para testar o bot localmente. Baixe o emulador em [aka.ms/botframework-emulator](https://aka.ms/botframework-emulator).
   - Configure o emulador para se conectar ao bot usando o endpoint `http://localhost:3978/api/messages`.

## Conclusão
Este tutorial cobre os passos básicos para configurar o ambiente de desenvolvimento e criar um bot simples utilizando o Microsoft Bot Framework com Node.js. A partir daqui, você pode explorar mais recursos, como integração com serviços cognitivos, armazenamento de estado do bot, e muito mais. Lembre-se de consultar a documentação oficial do Microsoft Bot Framework para informações detalhadas e guias avançados.