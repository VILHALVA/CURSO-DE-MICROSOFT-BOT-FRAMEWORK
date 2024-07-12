# BOT COM CONNECTOR & DIALOG VIA EMULATOR
Para criar um bot utilizando o Microsoft Bot Framework com Connector e Dialog que pode ser testado utilizando o Bot Framework Emulator, siga os passos abaixo.

## Passo 1: Preparação do Ambiente de Desenvolvimento
1. **Instale o Node.js e npm**:
   - Baixe e instale o Node.js em [nodejs.org](https://nodejs.org).
   - Verifique a instalação com os comandos:
     ```bash
     node -v
     npm -v
     ```

2. **Crie um Diretório para o Projeto**:
   - Crie um diretório para o projeto e navegue até ele:
     ```bash
     mkdir meu-bot-emulator
     cd meu-bot-emulator
     ```

3. **Inicialize um Projeto Node.js**:
   - Inicialize um projeto Node.js no diretório:
     ```bash
     npm init -y
     ```

4. **Instale as Dependências Necessárias**:
   - Instale o `botbuilder` e o `restify`:
     ```bash
     npm install --save botbuilder restify
     ```

5. **Instale o Bot Framework Emulator**:
   - Baixe e instale o Bot Framework Emulator a partir de [aka.ms/botframework-emulator](https://aka.ms/botframework-emulator).

## Passo 2: Criação do Bo
1. **Crie o Arquivo Principal**:
   - No diretório do projeto, crie um arquivo chamado `app.js`:
     ```bash
     touch app.js
     ```

2. **Edite o Arquivo `app.js`**:
   - Abra o `app.js` em um editor de texto e adicione o seguinte código:

   ```javascript
   const restify = require('restify');
   const { ChatConnector, UniversalBot, Prompts } = require('botbuilder');

   // Configuração do servidor via Restify
   const server = restify.createServer();
   server.listen(process.env.port || process.env.PORT || 3978, () => {
       console.log('%s Aplicação executando na porta %s', server.name, server.url);
   });

   // Criação do chat connector para comunicar com o serviço do Bot Framework
   const connector = new ChatConnector({
       appId: process.env.MICROSOFT_APP_ID,
       appPassword: process.env.MICROSOFT_APP_PASSWORD
   });

   // Endpoint para executar as mensagens para os usuários
   server.post('/api/messages', connector.listen());

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
           Prompts.text(session, 'Qual é o seu nome?');
       },
       (session, results) => {
           session.userData.nome = results.response;
           session.send(`Olá, ${session.userData.nome}!`);
           session.beginDialog('/perguntarIdade');
       }
   ]);

   // Diálogo para perguntar a idade do usuário
   bot.dialog('/perguntarIdade', [
       (session) => {
           Prompts.number(session, 'Quantos anos você tem?');
       },
       (session, results) => {
           session.userData.idade = results.response;
           session.send(`Você tem ${session.userData.idade} anos.`);
           session.endDialog();
       }
   ]);
   ```

## Passo 3: Executar o Bot
1. **Inicie o Bot**:
   - No terminal, navegue até o diretório do projeto e execute o comando:
     ```bash
     node app.js
     ```

## Passo 4: Teste do Bot com o Bot Framework Emulator
1. **Abra o Bot Framework Emulator**.
2. **Conecte-se ao Bot**:
   - No emulador, clique em "Open Bot" e insira a URL: `http://localhost:3978/api/messages`.
   - Deixe os campos de Microsoft App ID e Microsoft App Password em branco (ou preencha-os se estiver utilizando autenticação).

3. **Interaja com o Bot**:
   - No emulador, você verá as mensagens do bot e poderá interagir com ele digitando suas respostas.

## Explicação do Código
- **Restify**: Utilizamos o `restify` para criar um servidor web leve que gerencia as solicitações HTTP.
- **ChatConnector**: Utilizamos o `ChatConnector` para permitir a comunicação entre o bot e o Bot Framework Emulator.
- **UniversalBot**: Criamos um `UniversalBot` que gerencia os diálogos e interações com os usuários através do conector configurado.
- **Diálogos**: Definimos diálogos para o bot, onde ele envia uma mensagem de boas-vindas, pergunta o nome do usuário e a idade, e responde com uma saudação personalizada.

## Conclusão
Este exemplo demonstra como desenvolver um bot que interage via Bot Framework Emulator utilizando o Microsoft Bot Framework com Node.js. Este é um ponto de partida para criar bots mais complexos e interativos. Você pode expandir este exemplo adicionando mais diálogos, integração com serviços de IA, e deploy em canais de comunicação como Microsoft Teams, Slack, e outros.