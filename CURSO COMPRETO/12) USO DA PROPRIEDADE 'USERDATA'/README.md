# USO DA PROPRIEDADE 'USERDATA'
No Microsoft Bot Framework, a propriedade `userData` é usada para armazenar dados específicos do usuário de forma persistente e independente de qualquer conversa específica. Essa propriedade é muito útil para manter informações que devem ser acessíveis em todas as interações do usuário com o bot, mesmo que ocorram em diferentes sessões.

## Uso da Propriedade `userData`
### 1. Armazenamento de Dados
Para armazenar dados na propriedade `userData`, você pode atribuir valores a ela diretamente durante a interação com o usuário. Aqui está um exemplo básico de como você pode usar `userData` para armazenar o nome do usuário:

```javascript
bot.dialog('/', [
    (session) => {
        // Verifica se já existe um nome na userData
        if (!session.userData.nome) {
            builder.Prompts.text(session, 'Qual é o seu nome?');
        } else {
            session.send(`Olá de novo, ${session.userData.nome}!`);
            session.endDialog();
        }
    },
    (session, results) => {
        // Armazena o nome na userData após receber a resposta do usuário
        session.userData.nome = results.response;
        session.send(`Olá, ${session.userData.nome}!`);
        session.endDialog();
    }
]);
```

### 2. Acesso aos Dados
Os dados armazenados em `userData` podem ser acessados em qualquer parte do bot onde a sessão esteja disponível. Por exemplo, você pode usar `session.userData.nome` para acessar o nome do usuário em diferentes diálogos ou partes do código do bot.

```javascript
bot.dialog('/', [
    (session) => {
        if (session.userData.nome) {
            session.send(`Olá de novo, ${session.userData.nome}!`);
        } else {
            session.send('Olá! Parece que ainda não sei o seu nome.');
        }
        session.endDialog();
    }
]);
```

### 3. Persistência dos Dados
Os dados armazenados em `userData` são persistentes, o que significa que eles são mantidos entre as sessões do usuário. Isso é útil para lembrar informações importantes, como preferências do usuário, históricos de interação ou configurações personalizadas.

### 4. Exemplo Completo
Aqui está um exemplo mais completo que mostra como você pode usar `userData` para armazenar e recuperar informações do usuário ao longo de várias interações:

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
        if (session.userData.nome) {
            session.send(`Olá de novo, ${session.userData.nome}!`);
            session.endDialog();
        } else {
            builder.Prompts.text(session, 'Qual é o seu nome?');
        }
    },
    (session, results) => {
        session.userData.nome = results.response;
        session.send(`Olá, ${session.userData.nome}!`);
        session.endDialog();
    }
]);
```

## Considerações Finais
O uso adequado da propriedade `userData` no Microsoft Bot Framework permite que você crie experiências personalizadas e contínuas para os usuários, mantendo informações relevantes ao longo de diferentes sessões de interação. Isso é fundamental para bots que precisam lembrar dados sobre o usuário para oferecer um serviço mais eficaz e amigável.