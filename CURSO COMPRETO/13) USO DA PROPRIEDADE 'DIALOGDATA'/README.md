# USO DA PROPRIEDADE 'DIALOGDATA'
A propriedade `dialogData` no Microsoft Bot Framework é usada para armazenar dados temporários que são específicos para o diálogo atual. Isso significa que os dados armazenados em `dialogData` estão disponíveis apenas enquanto o diálogo está ativo e são automaticamente limpos quando o diálogo é encerrado. Essa característica é útil para manter o contexto e informações temporárias durante uma interação específica com o usuário.

## Uso da Propriedade `dialogData`
### 1. Armazenamento de Dados
Você pode usar `dialogData` para armazenar informações temporárias dentro de um diálogo. Aqui está um exemplo simples de como você pode usá-lo para armazenar o nome e a idade do usuário durante uma interação:

```javascript
bot.dialog('/', [
    (session) => {
        session.dialogData.nome = null; // Inicializa o campo nome
        builder.Prompts.text(session, 'Qual é o seu nome?');
    },
    (session, results) => {
        session.dialogData.nome = results.response;
        builder.Prompts.number(session, 'Quantos anos você tem?');
    },
    (session, results) => {
        session.dialogData.idade = results.response;
        session.send(`Obrigado, ${session.dialogData.nome}! Você tem ${session.dialogData.idade} anos.`);
        session.endDialog();
    }
]);
```

No exemplo acima:
- `session.dialogData.nome` é usado para armazenar o nome do usuário temporariamente enquanto o diálogo está ativo.
- `session.dialogData.idade` é usado para armazenar a idade do usuário temporariamente durante a mesma interação.

### 2. Acesso aos Dados
Os dados armazenados em `dialogData` podem ser acessados dentro do mesmo diálogo em qualquer etapa. Isso é útil para manter o contexto e usar informações anteriormente coletadas em etapas posteriores do diálogo.

```javascript
bot.dialog('/', [
    (session) => {
        session.dialogData.counter = session.dialogData.counter ? session.dialogData.counter + 1 : 1;
        session.send(`Você está na ${session.dialogData.counter}ª vez que iniciou este diálogo.`);
        session.endDialog();
    }
]);
```

### 3. Limpeza Automática
Quando o diálogo é encerrado usando `session.endDialog()`, todos os dados armazenados em `dialogData` para essa instância específica do diálogo são automaticamente removidos. Isso garante que não haja vazamento de informações ou conflitos entre interações de usuários diferentes.

## Exemplo Completo
Aqui está um exemplo mais completo que demonstra o uso de `dialogData` para armazenar e acessar informações temporárias durante um diálogo:

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
        session.dialogData.counter = 0;
        session.send('Bem-vindo ao bot!');
        session.beginDialog('/perguntarNome');
    }
]);

// Diálogo para perguntar o nome do usuário
bot.dialog('/perguntarNome', [
    (session) => {
        builder.Prompts.text(session, 'Qual é o seu nome?');
    },
    (session, results) => {
        session.dialogData.nome = results.response;
        session.beginDialog('/perguntarIdade');
    }
]);

// Diálogo para perguntar a idade do usuário
bot.dialog('/perguntarIdade', [
    (session) => {
        builder.Prompts.number(session, 'Quantos anos você tem?');
    },
    (session, results) => {
        session.dialogData.idade = results.response;
        session.send(`Obrigado, ${session.dialogData.nome}! Você tem ${session.dialogData.idade} anos.`);
        session.endDialog();
    }
]);
```

## Considerações Finais
O uso da propriedade `dialogData` no Microsoft Bot Framework é crucial para manter informações temporárias durante um diálogo específico com o usuário. Isso ajuda a criar interações mais personalizadas e contextuais, mantendo a integridade dos dados apenas pelo tempo necessário. Certifique-se de usar `dialogData` quando precisar armazenar dados que são relevantes apenas para o diálogo atual e que não precisam ser persistentes entre diferentes sessões de interação com o usuário.