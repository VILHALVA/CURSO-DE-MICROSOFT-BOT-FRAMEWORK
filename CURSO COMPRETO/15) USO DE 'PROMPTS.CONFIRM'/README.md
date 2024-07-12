# USO DE 'PROMPTS.CONFIRM'
O `Prompts.confirm` no Microsoft Bot Framework é usado para solicitar ao usuário uma confirmação simples, geralmente sim ou não, em resposta a uma pergunta específica durante uma interação do bot. Esse tipo de prompt é útil para obter confirmações diretas de ações propostas pelo bot ou para confirmar escolhas feitas pelo usuário. Aqui estão os principais conceitos e como você pode usar o `Prompts.confirm`:

## Uso de `Prompts.confirm`
### 1. **Funcionamento Básico:**
   - O `Prompts.confirm` solicita ao usuário que confirme ou negue uma pergunta específica.
   - Ele é renderizado com botões ou opções de lista dependendo do canal de comunicação (como Skype, Web Chat, etc.).

### 2. **Exemplo de Implementação:**
   - Aqui está um exemplo básico de como usar `Prompts.confirm` em um diálogo:

   ```javascript
   bot.dialog('/', [
       (session) => {
           builder.Prompts.confirm(session, 'Você deseja continuar?');
       },
       (session, results) => {
           if (results.response) {
               session.send('Ótimo! Vamos continuar.');
           } else {
               session.send('Entendido. Até a próxima!');
           }
           session.endDialog();
       }
   ]);
   ```

   Neste exemplo:
   - O bot inicia solicitando uma confirmação ao usuário com a mensagem "Você deseja continuar?" usando `builder.Prompts.confirm`.
   - A resposta do usuário é tratada na função de callback `(session, results) => {...}`, onde `results.response` conterá `true` se o usuário confirmar e `false` se negar.
   - Dependendo da resposta, o bot pode enviar uma mensagem apropriada e encerrar o diálogo usando `session.endDialog()`.

### 3. **Personalização:**
   - Você pode personalizar a apresentação do `Prompts.confirm`, como o estilo dos botões de confirmação, ajustando `ListStyle` nas opções do prompt. Por exemplo:

   ```javascript
   builder.Prompts.confirm(session, 'Você gostaria de prosseguir?', { listStyle: builder.ListStyle.button });
   ```

   Isso renderiza botões para "Sim" e "Não" em vez de uma caixa de entrada de texto padrão, tornando a interação mais visualmente intuitiva para o usuário.

### 4. **Validação:**
   - O `Prompts.confirm` automaticamente valida a entrada do usuário para garantir que ela seja uma resposta de confirmação válida (sim/não).

### 5. **Uso em Contexto:**
   - `Prompts.confirm` é útil em situações onde o bot precisa confirmar uma ação do usuário antes de prosseguir, como confirmar uma reserva, aceitar termos de serviço, ou confirmar uma compra.

## Considerações Finais
O `Prompts.confirm` é uma ferramenta simples e eficaz para obter confirmações diretas dos usuários em bots desenvolvidos com o Microsoft Bot Framework. Ao utilizar este tipo de prompt de maneira adequada, você pode criar interações mais claras e intuitivas, melhorando a experiência geral do usuário com seu bot.