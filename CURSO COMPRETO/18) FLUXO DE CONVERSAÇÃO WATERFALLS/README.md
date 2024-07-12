# FLUXO DE CONVERSAÇÃO: WATERFALLS
No Microsoft Bot Framework, o conceito de Waterfall (cachoeira, em tradução livre) é uma maneira de estruturar e gerenciar conversas de forma sequencial e organizada entre o bot e o usuário. O Waterfall é utilizado para encadear uma série de passos ou etapas (funções) que o bot executa para interagir com o usuário e coletar informações de forma estruturada. Aqui estão os principais pontos sobre o fluxo de conversação utilizando Waterfalls:

## Como Funciona o Waterfall?
1. **Estrutura Sequencial:** Um Waterfall permite definir uma série de etapas sequenciais que serão executadas em ordem. Cada etapa geralmente corresponde a uma função que o bot executa para solicitar informações, processar respostas e continuar a conversa.

2. **Passagem de Controle:** Após cada etapa (função) dentro do Waterfall, o controle da conversa é passado para a próxima etapa automaticamente. Isso significa que você pode definir um fluxo de interações sem precisar lidar manualmente com o gerenciamento de estados entre as etapas.

3. **Tratamento de Respostas:** Cada etapa pode receber parâmetros como a sessão atual (`session`) e possíveis resultados (`results`) das etapas anteriores. Isso permite que o bot capture e processe as respostas do usuário de maneira eficiente e estruturada.

## Exemplo de Implementação:
Aqui está um exemplo básico de como usar um Waterfall no Microsoft Bot Framework para criar um diálogo simples de boas-vindas:

```javascript
bot.dialog('/', [
    (session) => {
        session.beginDialog('cumprimento');
    },
    (session, results) => {
        session.send(`Olá ${results.nome}! Como posso ajudar você hoje?`);
    }
]);

bot.dialog('cumprimento', [
    (session) => {
        builder.Prompts.text(session, 'Olá! Qual é o seu nome?');
    },
    (session, results) => {
        session.endDialogWithResult(results);
    }
]);
```

Neste exemplo:
- O diálogo principal (`'/'`) inicia chamando o diálogo `'cumprimento'` usando `session.beginDialog('cumprimento')`.
- O diálogo `'cumprimento'` solicita ao usuário que digite seu nome usando `builder.Prompts.text`.
- Após obter o nome do usuário, a função de callback na segunda etapa do diálogo principal (`(session, results) => {...}`) é acionada, enviando uma mensagem de boas-vindas personalizada.

## Vantagens do Waterfall:
- **Estruturação Clara:** O Waterfall ajuda a estruturar conversas de maneira lógica e organizada, facilitando a compreensão e manutenção do código do bot.

- **Gerenciamento Automático de Estado:** O controle entre as etapas é passado automaticamente, simplificando o fluxo de trabalho do desenvolvedor.

- **Reutilização de Código:** É possível reutilizar etapas (funções) em diferentes partes do bot, promovendo uma programação mais modular e eficiente.

- **Personalização:** Cada etapa pode ser personalizada com prompts específicos, validações de entrada e lógica de negócios, conforme necessário para atender aos requisitos do bot.

Utilizando Waterfalls no Microsoft Bot Framework, você pode criar interações mais naturais e guiadas com os usuários, melhorando a experiência geral do usuário ao interagir com seu bot.