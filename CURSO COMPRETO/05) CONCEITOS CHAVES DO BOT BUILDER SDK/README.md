# CONCEITOS CHAVES DO BOT BUILDER SDK
## 1. Bot Framework
O Bot Framework da Microsoft é uma plataforma para construir, conectar, testar e implantar bots inteligentes que interagem naturalmente com os usuários onde quer que estejam.

## 2. Bot Builder SDK
O Bot Builder SDK é um conjunto de bibliotecas e ferramentas que ajudam a construir bots poderosos usando diversas linguagens de programação, incluindo Node.js e C#.

## 3. Conectores
Conectores são responsáveis por gerenciar a comunicação entre o bot e o canal de mensagens (como Microsoft Teams, Facebook Messenger, Slack, etc.). Eles convertem mensagens do bot em um formato que o canal pode entender e vice-versa.

## 4. Atividades
Atividades são as mensagens trocadas entre o bot e o usuário. Existem diferentes tipos de atividades, incluindo mensagens, eventos, comandos de ação, etc. A atividade mais comum é a de mensagem (`message`), usada para enviar texto e outros conteúdos.

## 5. Diálogos
Diálogos são componentes modulares que gerenciam a conversação com o usuário. Eles permitem que você crie conversas complexas e gerencie o fluxo da conversa. Existem diferentes tipos de diálogos, como diálogos de prompt, diálogos de resposta e diálogos de waterfall.

## 6. Prompts
Prompts são tipos especiais de diálogos usados para pedir informações ao usuário e coletar respostas. Eles suportam diferentes tipos de entrada, como texto, números, confirmações, datas, etc.

## 7. Estado do Bot
O estado do bot permite armazenar dados e acompanhar o contexto da conversação com o usuário. Pode ser usado para armazenar informações de sessão, dados do usuário e outras informações contextuais que ajudam a manter a continuidade da conversa.

## 8. Middleware
Middleware são componentes que permitem interceptar e processar atividades antes ou depois que elas alcancem o bot. Eles podem ser usados para adicionar funcionalidades transversais, como autenticação, logging, tradução, etc.

## Explicação com Código de Exemplo
### 1. Conector
```javascript
const { ChatConnector } = require('botbuilder');

const connector = new ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
```

### 2. Atividades
```javascript
bot.dialog('/', (session) => {
    session.send('Olá! Esta é uma mensagem de atividade.');
});
```

### 3. Diálogos
```javascript
bot.dialog('/', [
    (session) => {
        session.send('Bem-vindo ao bot!');
        session.beginDialog('/perguntarNome');
    },
    (session, results) => {
        session.send(`Olá, ${results.response}!`);
    }
]);

bot.dialog('/perguntarNome', [
    (session) => {
        session.send('Qual é o seu nome?');
        session.endDialogWithResult({ response: session.message.text });
    }
]);
```

### 4. Prompts
```javascript
const { Prompts } = require('botbuilder');

bot.dialog('/perguntarIdade', [
    (session) => {
        Prompts.number(session, 'Quantos anos você tem?');
    },
    (session, results) => {
        session.endDialog(`Você tem ${results.response} anos.`);
    }
]);
```

### 5. Estado do Bot
```javascript
const { MemoryBotStorage } = require('botbuilder');

const bot = new UniversalBot(connector, (session) => {
    session.send('Olá! Eu posso lembrar de coisas.');
}).set('storage', new MemoryBotStorage());
```

### 6. Middleware
```javascript
bot.use({
    botbuilder: (session, next) => {
        console.log('Nova mensagem recebida: ', session.message.text);
        next();
    },
    send: (event, next) => {
        console.log('Enviando mensagem: ', event.text);
        next();
    }
});
```

## Conclusão
Esses são os conceitos-chave do Bot Builder SDK da Microsoft. Compreender esses conceitos permitirá que você desenvolva bots mais eficientes, interativos e capazes de manter conversas naturais com os usuários. A prática e a experimentação com esses componentes e padrões ajudarão a solidificar seu entendimento e a construir bots mais complexos e úteis.