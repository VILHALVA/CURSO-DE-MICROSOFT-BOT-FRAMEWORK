# USO DE DIFERENTES TIPOS DE PROMPTS
No Microsoft Bot Framework, diferentes tipos de prompts são utilizados para interagir com os usuários e coletar informações específicas durante uma conversa. Cada tipo de prompt serve para solicitar um tipo diferente de entrada do usuário e pode incluir validações específicas para garantir que a entrada seja adequada para a aplicação. Aqui está um resumo dos principais tipos de prompts e como cada um pode ser usado:

## Tipos de Prompts Disponíveis
### 1. **Text Prompt**
   - **Descrição:** Solicita ao usuário uma entrada de texto livre.
   - **Exemplo:**
     ```javascript
     builder.Prompts.text(session, 'Digite seu nome:');
     ```
   - **Uso:** Útil para capturar respostas que não são de múltipla escolha e que podem variar amplamente em formato.

### 2. **Number Prompt**
   - **Descrição:** Solicita ao usuário um número.
   - **Exemplo:**
     ```javascript
     builder.Prompts.number(session, 'Quantos anos você tem?');
     ```
   - **Uso:** Ideal para coletar números específicos, como idade, quantidade, etc.

### 3. **Choice Prompt**
   - **Descrição:** Solicita ao usuário que escolha uma opção de uma lista predefinida.
   - **Exemplo:**
     ```javascript
     builder.Prompts.choice(session, 'Qual é a sua linguagem de programação favorita?', ['JavaScript', 'Python', 'C#']);
     ```
   - **Uso:** Permite ao usuário selecionar uma opção entre várias, útil para menus, preferências ou configurações.

### 4. **Confirm Prompt**
   - **Descrição:** Solicita ao usuário uma confirmação sim ou não.
   - **Exemplo:**
     ```javascript
     builder.Prompts.confirm(session, 'Você deseja continuar?', { listStyle: builder.ListStyle.button });
     ```
   - **Uso:** Utilizado para confirmar ações ou decisões do usuário.

### 5. **Attachment Prompt**
   - **Descrição:** Solicita ao usuário um anexo, como imagens, vídeos ou documentos.
   - **Exemplo:**
     ```javascript
     builder.Prompts.attachment(session, 'Por favor, anexe uma imagem:');
     ```
   - **Uso:** Útil quando o bot precisa receber arquivos ou mídias do usuário.

### 6. **Time Prompt**
   - **Descrição:** Solicita ao usuário uma hora específica.
   - **Exemplo:**
     ```javascript
     builder.Prompts.time(session, 'Por favor, informe que horas são agora:');
     ```
   - **Uso:** Permite ao bot capturar horários ou datas precisas fornecidas pelo usuário.

## Considerações ao Usar Prompts
- **Validação:** Cada tipo de prompt pode incluir validações para garantir que a entrada do usuário seja correta antes de prosseguir para a próxima etapa do diálogo.
  
- **Personalização:** É possível personalizar a apresentação dos prompts, como o estilo dos botões de opção ou a interface para anexos, dependendo do canal de comunicação utilizado.

- **Integração com Diálogos:** Prompts são normalmente usados em conjunto com diálogos para estruturar interações com os usuários de maneira lógica e guiada.

Ao escolher e utilizar os diferentes tipos de prompts disponíveis no Microsoft Bot Framework, você pode criar experiências de usuário mais interativas, eficientes e adaptadas às necessidades específicas do seu bot.