# DESENVOLVENDO BOT VIA BOT EMULATOR
Para desenvolver um bot utilizando o Microsoft Bot Framework e testá-lo no Bot Framework Emulator, siga os passos abaixo:

## Passo 1: Preparação do Ambiente de Desenvolvimento
### Instalação do Node.js e npm
1. **Node.js e npm**: Certifique-se de ter o Node.js instalado. Você pode baixá-lo em [nodejs.org](https://nodejs.org). O npm (Node Package Manager) será instalado automaticamente junto com o Node.js.
   - Verifique a instalação com os seguintes comandos no terminal:
     ```bash
     node -v
     npm -v
     ```

### Instalação do Visual Studio Code
2. **Visual Studio Code**: Baixe e instale o Visual Studio Code a partir de [code.visualstudio.com](https://code.visualstudio.com).

### Instalação do Bot Framework Emulator
3. **Bot Framework Emulator**: Baixe e instale o Bot Framework Emulator a partir de [aka.ms/botframework-emulator](https://aka.ms/botframework-emulator).

## Passo 2: Configuração do Projeto Node.js
### Criação do Diretório do Projeto
1. **Crie um Diretório para o Projeto**: Abra o terminal e crie um diretório para o seu projeto. Navegue até o diretório criado:
   ```bash
   mkdir meu-bot
   cd meu-bot
   ```

### Inicialização do Projeto Node.js
2. **Inicialize o Projeto Node.js**: No diretório do projeto, execute o seguinte comando para inicializar um projeto Node.js:
   ```bash
   npm init -y
   ```

### Instalação das Dependências
3. **Instale Dependências**: Instale o Microsoft Bot Framework SDK e o Restify:
   ```bash
   npm install --save botbuilder restify
   ```

## Passo 3: Criação e Configuração do Bot
### Criação do Arquivo do Bot
1. **Crie um Arquivo para o Bot**: No diretório do projeto, crie um arquivo chamado `app.js`:
   ```bash
   touch app.js
   ```

### Edição do Arquivo `app.js`
2. **Edite o Arquivo `app.js`**: Abra o `app.js` no Visual Studio Code e adicione o seguinte código:

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

   // Diálogo para perguntar o nome do usuário:
   bot.dialog('/perguntarNome', [
       (session) => {
           session.send('Qual é o seu nome?');
           session.beginDialog('/respostaNome');
       },
       (session, results) => {
           session.endDialog(`Olá, ${results.response}!`);
       }
   ]);

   // Diálogo para capturar a resposta do usuário:
   bot.dialog('/respostaNome', [
       (session, results) => {
           session.endDialogWithResult({ response: results.response });
       }
   ]);
   ```

## Passo 4: Execução do Bot
### Inicie o Bot
1. **Inicie o Bot**: No terminal, navegue até o diretório do projeto e execute o comando:
   ```bash
   node app.js
   ```

## Passo 5: Teste do Bot com o Bot Framework Emulator
### Configuração do Emulador
1. **Abra o Bot Framework Emulator**: Abra o Bot Framework Emulator.
2. **Conecte-se ao Bot**: Configure o emulador para se conectar ao bot utilizando o endpoint `http://localhost:3978/api/messages`.
   - No emulador, clique em "Open Bot" e insira a URL: `http://localhost:3978/api/messages`.
   - Deixe os campos de Microsoft App ID e Microsoft App Password em branco (ou preencha-os se estiver utilizando autenticação).

3. **Teste o Bot**: Envie mensagens para o bot através do emulador e veja as respostas.

## Conclusão
Este tutorial cobre os passos básicos para configurar o ambiente de desenvolvimento, criar um bot simples utilizando o Microsoft Bot Framework com Node.js, e testá-lo utilizando o Bot Framework Emulator. Você pode expandir este bot adicionando mais diálogos, integração com serviços cognitivos como LUIS para compreensão de linguagem natural, e muito mais. Consulte a documentação oficial do Microsoft Bot Framework para informações detalhadas e guias avançados.