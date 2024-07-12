# USO DO MÉTODO 'BEGINDIALOG'
O método `beginDialog` no Microsoft Bot Framework é usado para iniciar um novo diálogo dentro do contexto de um diálogo existente. Este método é útil para modularizar a lógica de conversação e criar fluxos de conversa mais complexos. 

## 1. Conceito
Quando um diálogo é iniciado com `beginDialog`, o controle é passado para o novo diálogo, e o diálogo atual é colocado em espera até que o novo diálogo seja concluído. Após a conclusão, o controle retorna ao diálogo original.

## 2. Sintaxe
A sintaxe básica do método `beginDialog` é:

```javascript
session.beginDialog(dialogId, args);
```

- `dialogId`: O ID do diálogo que você deseja iniciar.
- `args`: (Opcional) Argumentos adicionais que você deseja passar para o novo diálogo.

## 3. Exemplo Prático
Vamos criar um exemplo prático que demonstra o uso do `beginDialog`. Suponha que temos um bot que pergunta o nome do usuário e depois a idade, utilizando um novo diálogo para cada pergunta.

### Passo 1: Criar o Projeto
1. **Preparar o ambiente**:
   - Certifique-se de que você já tenha o Node.js e o npm instalados.
   - Crie um novo diretório para o projeto e navegue até ele:
     ```bash
     mkdir meu-bot-begin-dialog
     cd meu-bot-begin-dialog
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
           session.endDialog();
       }
   ]);
   ```

### 4. Explicação do Código
- **Diálogo Inicial**: O diálogo inicial (`'/'`) envia uma mensagem de boas-vindas e inicia o diálogo `/perguntarNome` utilizando `session.beginDialog('/perguntarNome')`.
- **Diálogo `/perguntarNome`**: Este diálogo pede o nome do usuário e, ao receber a resposta, inicia o diálogo `/perguntarIdade` com `session.beginDialog('/perguntarIdade')`.
- **Diálogo `/perguntarIdade`**: Este diálogo pede a idade do usuário e, após receber a resposta, envia uma mensagem com a idade do usuário e termina o diálogo com `session.endDialog()`.

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
O método `beginDialog` é uma ferramenta poderosa no Microsoft Bot Framework que permite a criação de conversas estruturadas e modulares. Ao utilizar este método, você pode organizar e gerenciar fluxos de conversa complexos, melhorando a experiência do usuário e a manutenção do código.