# ARMAZENAMENTO DE DADOS EM DIALOGS
Armazenar dados em diálogos no Microsoft Bot Framework é essencial para manter o contexto e a informação ao longo da interação do usuário com o bot. Isso é feito principalmente através de `session.userData`, `session.conversationData`, `session.privateConversationData` e `session.dialogData`.

## Tipos de Armazenamento de Dados
1. **`session.userData`**: Armazena dados persistentes específicos do usuário, independentemente da conversa.
2. **`session.conversationData`**: Armazena dados específicos da conversa atual.
3. **`session.privateConversationData`**: Armazena dados específicos da conversa privada entre o usuário e o bot.
4. **`session.dialogData`**: Armazena dados específicos do diálogo atual.

## 1. Armazenamento de Dados em `session.userData`
Este é o método mais comum para armazenar dados que devem persistir ao longo de várias conversas e sessões.

```javascript
bot.dialog('/perguntarNome', [
    (session) => {
        builder.Prompts.text(session, 'Qual é o seu nome?');
    },
    (session, results) => {
        session.userData.nome = results.response;
        session.send(`Olá, ${session.userData.nome}!`);
        session.beginDialog('/perguntarIdade');
    }
]);
```

## 2. Armazenamento de Dados em `session.conversationData`
Utilize este método para armazenar dados que devem ser mantidos durante a conversa atual, mas não persistem em futuras conversas.

```javascript
bot.dialog('/perguntarNome', [
    (session) => {
        builder.Prompts.text(session, 'Qual é o seu nome?');
    },
    (session, results) => {
        session.conversationData.nome = results.response;
        session.send(`Olá, ${session.conversationData.nome}!`);
        session.beginDialog('/perguntarIdade');
    }
]);
```

## 3. Armazenamento de Dados em `session.privateConversationData`
Este método é útil para armazenar dados em uma conversa privada entre o usuário e o bot.

```javascript
bot.dialog('/perguntarNome', [
    (session) => {
        builder.Prompts.text(session, 'Qual é o seu nome?');
    },
    (session, results) => {
        session.privateConversationData.nome = results.response;
        session.send(`Olá, ${session.privateConversationData.nome}!`);
        session.beginDialog('/perguntarIdade');
    }
]);
```

## 4. Armazenamento de Dados em `session.dialogData`
Utilize este método para armazenar dados temporários que só precisam estar disponíveis enquanto o diálogo atual estiver ativo.

```javascript
bot.dialog('/perguntarNome', [
    (session) => {
        builder.Prompts.text(session, 'Qual é o seu nome?');
    },
    (session, results) => {
        session.dialogData.nome = results.response;
        session.send(`Olá, ${session.dialogData.nome}!`);
        session.beginDialog('/perguntarIdade');
    }
]);
```

## Exemplo Completo: Uso Combinado de Armazenamento de Dados
Vamos criar um exemplo prático onde armazenamos diferentes tipos de dados em um bot que pergunta o nome, a idade e a cidade do usuário.

1. **Criar o Projeto**

```bash
mkdir bot-armazenamento-dados
cd bot-armazenamento-dados
npm init -y
npm install --save botbuilder restify
```

2. **Código do Bot (`app.js`)**

```javascript
const restify = require('restify');
const builder = require('botbuilder');

// Configuração do servidor via Restify
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log('%s Aplicação executando na porta %s', server.name, server.url);
});

// Criação do chat connector para comunicar com o serviço do Bot Framework
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Endpoint para executar as mensagens para os usuários
server.post('/api/messages', connector.listen());

// Criação do bot universal que irá lidar com as interações do usuário
const bot = new builder.UniversalBot(connector);

// Diálogo inicial do bot
bot.dialog('/', [
    (session) => {
        session.send('Bem-vindo ao bot!');
        session.beginDialog('/perguntarNome');
    },
    (session, results) => {
        session.send('Obrigado por usar o bot! Até a próxima.');
    }
]);

// Diálogo para perguntar o nome do usuário
bot.dialog('/perguntarNome', [
    (session) => {
        builder.Prompts.text(session, 'Qual é o seu nome?');
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
        builder.Prompts.number(session, 'Quantos anos você tem?');
    },
    (session, results) => {
        session.conversationData.idade = results.response;
        session.send(`Você tem ${session.conversationData.idade} anos.`);
        session.beginDialog('/perguntarCidade');
    }
]);

// Diálogo para perguntar a cidade do usuário
bot.dialog('/perguntarCidade', [
    (session) => {
        builder.Prompts.text(session, 'Qual é a sua cidade?');
    },
    (session, results) => {
        session.privateConversationData.cidade = results.response;
        session.send(`Você mora em ${session.privateConversationData.cidade}.`);
        session.endDialog();
    }
]);
```

3. **Execução e Teste**

1. **Inicie o Bot**:
   - No terminal, execute o bot:
     ```bash
     node app.js
     ```

2. **Teste no Bot Framework Emulator**:
   - Abra o Bot Framework Emulator.
   - Conecte-se ao bot em `http://localhost:3978/api/messages`.

## Conclusão
Armazenar dados de forma eficaz em diálogos no Microsoft Bot Framework é crucial para criar experiências de usuário personalizadas e contextuais. Usando `session.userData`, `session.conversationData`, `session.privateConversationData` e `session.dialogData`, você pode gerenciar informações de forma estruturada, garantindo que os dados necessários estejam disponíveis quando necessário e mantidos de forma segura e organizada.