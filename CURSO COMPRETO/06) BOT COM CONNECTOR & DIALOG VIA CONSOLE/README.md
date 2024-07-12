# BOT COM CONNECTOR & DIALOG VIA CONSOLE
Para criar um bot utilizando o Microsoft Bot Framework com Connector e Dialog que funciona via console, vamos usar a biblioteca `botbuilder` para Node.js. Vamos configurar um conector de console e definir alguns diálogos básicos para interação.

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
     mkdir meu-bot-console
     cd meu-bot-console
     ```

3. **Inicialize um Projeto Node.js**:
   - Inicialize um projeto Node.js no diretório:
     ```bash
     npm init -y
     ```

4. **Instale as Dependências Necessárias**:
   - Instale o `botbuilder`:
     ```bash
     npm install --save botbuilder
     ```

## Passo 2: Criação do Bot
1. **Crie o Arquivo Principal**:
   - No diretório do projeto, crie um arquivo chamado `app.js`:
     ```bash
     touch app.js
     ```

2. **Edite o Arquivo `app.js`**:
   - Abra o `app.js` em um editor de texto e adicione o seguinte código:

   ```javascript
   const { ConsoleConnector, UniversalBot, Prompts } = require('botbuilder');

   // Criação do conector de console
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

2. **Interaja com o Bot**:
   - No console, você verá as mensagens do bot e poderá interagir com ele digitando suas respostas.

## Explicação do Código
- **Conector de Console**: Utilizamos o `ConsoleConnector` para permitir a comunicação com o bot via terminal.
- **Criação do Bot**: Criamos um `UniversalBot` que gerencia os diálogos e interações com os usuários através do conector configurado.
- **Diálogos**: Definimos diálogos para o bot, onde ele envia uma mensagem de boas-vindas, pergunta o nome do usuário e a idade, e responde com uma saudação personalizada.

## Conclusão
Este exemplo demonstra como desenvolver um bot que interage via console utilizando o Microsoft Bot Framework com Node.js. Isso pode ser útil para fins de teste ou para criar bots simples que não necessitam de uma interface web ou integração com outros serviços de comunicação. Para bots mais complexos e interativos, considere expandir este exemplo com mais diálogos, integração com serviços de IA, e deploy em canais de comunicação como Microsoft Teams, Slack, e outros.