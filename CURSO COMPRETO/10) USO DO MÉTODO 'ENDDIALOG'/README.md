# USO DO MÉTODO 'ENDDIALOG'
O método `endDialog` no Microsoft Bot Framework é utilizado para encerrar um diálogo. Quando um diálogo é encerrado usando `endDialog`, o controle retorna ao diálogo anterior que estava em espera, permitindo a continuação do fluxo de conversação a partir desse ponto.

## 1. Conceito
`endDialog` é uma forma de finalizar o diálogo atual. Pode ser usado para enviar uma mensagem final, processar dados finais ou simplesmente concluir o diálogo quando não há mais passos a serem executados.

## 2. Sintaxe
A sintaxe básica do método `endDialog` é:

```javascript
session.endDialog(result);
```

- `result`: (Opcional) Dados ou resultados que você deseja passar de volta para o diálogo anterior.

## 3. Exemplo Prático
Vamos criar um exemplo prático que demonstra o uso do `endDialog`. Suponha que temos um bot que pergunta o nome do usuário e depois a idade, e então finaliza o diálogo, retornando ao diálogo inicial.

### Passo 1: Criar o Projeto
1. **Preparar o ambiente**:
   - Certifique-se de que você já tenha o Node.js e o npm instalados.
   - Crie um novo diretório para o projeto e navegue até ele:
     ```bash
     mkdir meu-bot-end-dialog
     cd meu-bot-end-dialog
     ```

2. **Inicializar o projeto Node.js**:
   - Inicialize um novo projeto Node.js:
     ```bash
     npm init -y
     ```

3. **Instalar dependências**:
   - Instale `botbuilder` e `restify`:
     ```bash
     npm install --save botbuilder restify
     ```

### Passo 2: Escrever o Código do Bot
1. **Criar o arquivo `app.js`**:
   - No diretório do projeto, crie um arquivo chamado `app.js`:
     ```bash
     touch app.js
     ```

2. **Adicionar o código ao `app.js`**:
   - Abra o `app.js` em um editor de texto e adicione o seguinte código:

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
           session.userData.idade = results.response;
           session.send(`Você tem ${session.userData.idade} anos.`);
           session.endDialogWithResult({ response: session.userData });
       }
   ]);
   ```

### 4. Explicação do Códig
- **Diálogo Inicial**: O diálogo inicial (`'/'`) envia uma mensagem de boas-vindas e inicia o diálogo `/perguntarNome` utilizando `session.beginDialog('/perguntarNome')`.
- **Diálogo `/perguntarNome`**: Este diálogo pede o nome do usuário e, ao receber a resposta, inicia o diálogo `/perguntarIdade` com `session.beginDialog('/perguntarIdade')`.
- **Diálogo `/perguntarIdade`**: Este diálogo pede a idade do usuário e, após receber a resposta, envia uma mensagem com a idade do usuário e termina o diálogo com `session.endDialogWithResult({ response: session.userData })`.

### 5. Execução e Teste
1. **Inicie o Bot**:
   - No terminal, execute o bot:
     ```bash
     node app.js
     ```

2. **Teste no Bot Framework Emulator**:
   - Abra o Bot Framework Emulator.
   - Conecte-se ao bot em `http://localhost:3978/api/messages`.

## 4. Conclusão
O método `endDialog` é uma ferramenta crucial no Microsoft Bot Framework para finalizar diálogos e retornar ao controle anterior. Isso permite a criação de conversas modulares e a manutenção de um fluxo de conversa organizado. Ao utilizar `endDialog` e `endDialogWithResult`, você pode passar dados de volta para diálogos anteriores, permitindo uma interação contínua e contextualizada com o usuário.