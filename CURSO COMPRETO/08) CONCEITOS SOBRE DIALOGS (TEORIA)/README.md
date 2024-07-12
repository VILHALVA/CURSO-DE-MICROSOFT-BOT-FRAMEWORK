# CONCEITOS SOBRE DIALOGS (TEORIA)
## 1. O que são Diálogos no Bot Framework?
No Microsoft Bot Framework, diálogos são componentes fundamentais que gerenciam o fluxo de conversação entre o bot e o usuário. Eles permitem que você crie conversas estruturadas e complexas, mantendo o contexto e a lógica necessárias para interações significativas. 

## 2. Tipos de Diálogos
Existem vários tipos de diálogos no Bot Framework:

- **Waterfall Dialogs**: Sequências de etapas que são executadas uma após a outra. Cada etapa pode coletar informações, processar dados e passar para a próxima etapa.
- **Prompts**: Tipos especiais de diálogos que são usados para solicitar informações do usuário, como texto, números, confirmações, etc.
- **Component Dialogs**: Diálogos modulares que podem ser reutilizados em diferentes partes do bot.
- **Dialog Sets**: Coleções de diálogos que são gerenciadas juntas, permitindo a navegação entre diferentes diálogos dentro de um conjunto.

## 3. Waterfall Dialogs
Os diálogos do tipo "Waterfall" são os mais comuns e consistem em uma sequência de etapas que são executadas em ordem. Cada etapa em um diálogo de Waterfall é uma função que recebe o contexto atual da conversa e uma função `next` que permite passar para a próxima etapa.

Exemplo:
```javascript
bot.dialog('/', [
    (session) => {
        session.send('Bem-vindo ao bot!');
        session.beginDialog('/perguntarNome');
    }
]);

bot.dialog('/perguntarNome', [
    (session) => {
        session.send('Qual é o seu nome?');
        builder.Prompts.text(session, 'Por favor, digite seu nome:');
    },
    (session, results) => {
        session.userData.nome = results.response;
        session.send(`Olá, ${session.userData.nome}!`);
        session.endDialog();
    }
]);
```

## 4. Prompts
Prompts são diálogos especializados que pedem informações ao usuário. Eles são usados para coletar dados específicos, como texto, números, confirmações, etc. Os prompts garantem que as respostas do usuário sejam validadas antes de passar para a próxima etapa.

Tipos de Prompts:
- **Text Prompt**: Solicita entrada de texto.
- **Number Prompt**: Solicita entrada numérica.
- **Confirm Prompt**: Solicita uma confirmação (sim/não).
- **Choice Prompt**: Solicita uma escolha entre várias opções.

Exemplo de uso de Prompts:
```javascript
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

## 5. Component Dialogs
Component Dialogs são usados para criar diálogos modulares que podem ser reutilizados em diferentes partes do bot. Eles permitem encapsular lógica de conversação complexa em unidades menores e reutilizáveis.

Exemplo:
```javascript
const { ComponentDialog, WaterfallDialog, TextPrompt } = require('botbuilder-dialogs');

class PerguntarNomeDialog extends ComponentDialog {
    constructor(dialogId) {
        super(dialogId);

        this.addDialog(new TextPrompt('textPrompt'))
            .addDialog(new WaterfallDialog('waterfallDialog', [
                this.perguntarNome.bind(this),
                this.retornoNome.bind(this)
            ]));

        this.initialDialogId = 'waterfallDialog';
    }

    async perguntarNome(step) {
        return await step.prompt('textPrompt', 'Qual é o seu nome?');
    }

    async retornoNome(step) {
        step.values.nome = step.result;
        await step.context.sendActivity(`Olá, ${step.values.nome}!`);
        return await step.endDialog();
    }
}

module.exports.PerguntarNomeDialog = PerguntarNomeDialog;
```

## 6. Dialog Sets
Dialog Sets são coleções de diálogos que são gerenciadas juntas. Eles permitem que você navegue entre diferentes diálogos dentro de um conjunto e mantenha o estado e o contexto da conversa.

Exemplo:
```javascript
const { DialogSet, WaterfallDialog, TextPrompt } = require('botbuilder-dialogs');
const dialogSet = new DialogSet();

dialogSet.add(new WaterfallDialog('mainDialog', [
    async (step) => {
        return await step.prompt('textPrompt', 'Qual é o seu nome?');
    },
    async (step) => {
        step.values.nome = step.result;
        await step.context.sendActivity(`Olá, ${step.values.nome}!`);
        return await step.endDialog();
    }
]));

dialogSet.add(new TextPrompt('textPrompt'));
```

## 7. Estado e Persistência
Os diálogos no Bot Framework podem manter o estado e a persistência das conversas, permitindo que o bot "lembre" de informações fornecidas pelo usuário em diferentes etapas ou sessões. Isso é crucial para criar uma experiência de usuário fluida e coerente.

## 8. Controle de Fluxo
Os diálogos permitem um controle de fluxo refinado, onde você pode direcionar a conversa com base nas respostas do usuário, eventos específicos ou condições lógicas. Isso ajuda a criar interações dinâmicas e personalizadas.

## Conclusão
Compreender os conceitos de diálogos no Microsoft Bot Framework é essencial para construir bots interativos e eficientes. Diálogos bem estruturados permitem criar conversas naturais, manter o contexto e fornecer uma experiência de usuário de alta qualidade. A prática e experimentação com diferentes tipos de diálogos e seus componentes ajudarão a desenvolver habilidades para criar bots mais complexos e úteis.