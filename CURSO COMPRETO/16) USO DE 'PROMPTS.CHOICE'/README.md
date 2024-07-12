# USO DE 'PROMPTS.CHOICE'
O `Prompts.choice` no Microsoft Bot Framework é usado para solicitar ao usuário que escolha uma opção de uma lista predefinida durante uma interação com o bot. Esse tipo de prompt é ideal para oferecer opções claras e específicas ao usuário, permitindo que ele faça uma seleção sem precisar digitar texto livremente. Aqui estão os principais conceitos e como você pode usar o `Prompts.choice`:

## Uso de `Prompts.choice`
### 1. **Funcionamento Básico:**
   - O `Prompts.choice` apresenta ao usuário uma lista de opções entre as quais ele pode escolher.
   - Ele é renderizado com botões, lista suspensa ou outras interfaces dependendo do canal de comunicação (como Skype, Web Chat, etc.).

### 2. **Exemplo de Implementação:**
   - Aqui está um exemplo básico de como usar `Prompts.choice` em um diálogo:

   ```javascript
   bot.dialog('/', [
       (session) => {
           builder.Prompts.choice(session, 'Qual é a sua linguagem de programação favorita?', ['JavaScript', 'Python', 'C#']);
       },
       (session, results) => {
           const escolha = results.response.entity;
           session.send(`Você escolheu ${escolha}.`);
           session.endDialog();
       }
   ]);
   ```

   Neste exemplo:
   - O bot solicita ao usuário que escolha sua linguagem de programação favorita entre as opções "JavaScript", "Python" e "C#" usando `builder.Prompts.choice`.
   - A resposta do usuário é tratada na função de callback `(session, results) => {...}`, onde `results.response.entity` contém a opção escolhida pelo usuário.
   - O bot responde com uma mensagem que confirma a escolha do usuário e depois encerra o diálogo usando `session.endDialog()`.

### 3. **Personalização:**
   - Você pode personalizar a apresentação do `Prompts.choice`, como o estilo dos botões de opção, ajustando `ListStyle` nas opções do prompt. Por exemplo:

   ```javascript
   builder.Prompts.choice(session, 'Qual é a sua linguagem de programação favorita?', ['JavaScript', 'Python', 'C#'], { listStyle: builder.ListStyle.button });
   ```

   Isso renderiza botões para cada opção, em vez de uma lista suspensa padrão, tornando a interação mais visualmente intuitiva para o usuário.

### 4. **Validação:**
   - O `Prompts.choice` valida automaticamente a entrada do usuário para garantir que ele selecione uma opção válida da lista fornecida.

### 5. **Uso em Contexto:**
   - `Prompts.choice` é útil em situações onde o bot precisa guiar o usuário através de escolhas específicas, como seleção de menu, preferências pessoais, ou opções de configuração.

## Considerações Finais
O `Prompts.choice` é uma ferramenta poderosa para criar interações claras e estruturadas em bots desenvolvidos com o Microsoft Bot Framework. Ao aproveitar este tipo de prompt de maneira eficaz, você pode facilitar a navegação do usuário e garantir que suas escolhas sejam capturadas de forma precisa e intuitiva, melhorando assim a experiência geral do usuário com seu bot.