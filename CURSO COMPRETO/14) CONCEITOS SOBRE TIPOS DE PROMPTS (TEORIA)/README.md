# CONCEITOS SOBRE TIPOS DE PROMPTS (TEORIA)
Os prompts no contexto do Microsoft Bot Framework são essenciais para interagir com os usuários, solicitando e validando informações durante uma conversa. Cada tipo de prompt serve para coletar um tipo específico de entrada do usuário e validar essa entrada antes de prosseguir para a próxima etapa do diálogo. Aqui estão os conceitos principais sobre os tipos de prompts:

## Conceitos Básicos sobre Tipos de Prompts
### 1. **O que são Prompts?**
   - Prompts são mecanismos que o bot utiliza para solicitar informações aos usuários durante uma conversa. Eles facilitam a interação natural, permitindo que o bot guie os usuários através de questionamentos e colete informações necessárias para continuar o diálogo.

### 2. **Tipos de Prompts Disponíveis:**
   - **Text Prompt:** Solicita ao usuário uma entrada de texto livre.
   - **Number Prompt:** Solicita ao usuário um número.
   - **Choice Prompt:** Solicita ao usuário que escolha uma opção de uma lista predefinida de escolhas.
   - **Confirm Prompt:** Solicita ao usuário uma confirmação sim/não.
   - **Attachment Prompt:** Solicita ao usuário um arquivo anexado.
   - **Time Prompt:** Solicita ao usuário uma hora específica.
   - **Attachment Prompt:** Solicita ao usuário um anexo (como imagens, vídeos, documentos).

### 3. **Validação de Entrada:**
   - Cada tipo de prompt pode incluir validação para garantir que a entrada do usuário atenda aos critérios esperados antes de prosseguir para a próxima etapa do diálogo. Por exemplo, um Number Prompt pode validar se o valor fornecido é realmente um número.

### 4. **Personalização:**
   - É possível personalizar a apresentação e o comportamento de prompts, como o estilo visual (botões, caixa de entrada de texto) e a mensagem exibida ao usuário.

### 5. **Uso em Diálogos:**
   - Prompts são usados em conjunto com diálogos no Microsoft Bot Framework para estruturar interações com os usuários de maneira lógica e eficaz. Cada prompt é geralmente associado a uma função de callback que processa a resposta do usuário e toma decisões com base nessa entrada.

## Exemplo de Uso
Aqui está um exemplo básico de como você pode usar diferentes tipos de prompts em um diálogo no Microsoft Bot Framework:

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
        builder.Prompts.text(session, 'Olá! Qual é o seu nome?');
    },
    (session, results) => {
        session.dialogData.nome = results.response;
        builder.Prompts.number(session, `Oi ${session.dialogData.nome}. Quantos anos você tem?`);
    },
    (session, results) => {
        session.dialogData.idade = results.response;
        builder.Prompts.choice(session, `${session.dialogData.nome}, qual é a sua linguagem de programação favorita?`, ['JavaScript', 'Python', 'C#']);
    },
    (session, results) => {
        session.dialogData.linguagem = results.response.entity;
        builder.Prompts.confirm(session, `Você gosta de programar em ${session.dialogData.linguagem}?`, { listStyle: builder.ListStyle.button });
    },
    (session, results) => {
        if (results.response) {
            session.endDialog(`Legal! Então ${session.dialogData.nome}, você tem ${session.dialogData.idade} anos e gosta de programar em ${session.dialogData.linguagem}.`);
        } else {
            session.endDialog('Oh, que pena! Espero que encontre uma linguagem de programação que você goste.');
        }
    }
]);
```

Neste exemplo:
- `builder.Prompts.text`, `builder.Prompts.number`, `builder.Prompts.choice` e `builder.Prompts.confirm` são usados para solicitar diferentes tipos de informações ao usuário.
- Cada prompt coleta uma entrada específica e armazena os resultados em `session.dialogData` para uso posterior no diálogo.
- O diálogo é estruturado para guiar o usuário através de várias perguntas, utilizando prompts diferentes para coletar e validar as respostas.

## Considerações Finais
Os prompts são fundamentais para criar interações fluidas e eficazes com os usuários em bots desenvolvidos com o Microsoft Bot Framework. Compreender os diferentes tipos de prompts disponíveis e como usá-los adequadamente permite que você construa bots que não apenas coletem informações de forma eficiente, mas também ofereçam uma experiência de usuário intuitiva e personalizada.