# MANUAL GERAL
## PASSO 1: INSTALAÇÃO DO NODE.JS E NPM:
1. **Node.js e npm**: Certifique-se de ter o Node.js instalado. Você pode baixá-lo em [nodejs.org](https://nodejs.org) e o npm (gerenciador de pacotes do Node.js) será instalado automaticamente junto com o Node.js.

## PASSO 2: CONFIGURAÇÃO DO AMBIENTE DE DESENVOLVIMENTO:
1. **Editor de Código**: Escolha um editor de código, como Visual Studio Code, Sublime Text, Atom, ou qualquer outro de sua preferência.

## PASSO 3: CONFIGURAÇÃO DO PROJETO:
1. **Crie um Diretório**: Crie um diretório para o seu projeto e navegue até ele no terminal.

2. **Inicialize o Projeto Node.js**: Execute o seguinte comando para inicializar um projeto Node.js:
   ```
   npm init -y
   ```

3. **Instale o Microsoft Bot Framework**: Instale o Microsoft Bot Framework SDK para Node.js utilizando o npm:
   ```
   npm install --save botbuilder
   ```

## PASSO 4: CRIAÇÃO DO BOT:
1. **Crie um Arquivo para o Bot**: Crie um arquivo JavaScript (por exemplo, `app.js`) para o seu bot e abra-o no seu editor de código.

2. **Importe o Módulo `botbuilder`**: No arquivo `app.js`, importe o módulo `botbuilder`:
   ```javascript
   const { ChatConnector, UniversalBot, builder } = require('botbuilder');
   ```

3. **Configuração do Conector**: Configure um conector para o seu bot, que permite a comunicação entre o seu bot e os serviços do Microsoft Bot Framework:
   ```javascript
   const connector = new ChatConnector({
       appId: process.env.MICROSOFT_APP_ID,
       appPassword: process.env.MICROSOFT_APP_PASSWORD
   });
   ```

   - **Observação**: `MICROSOFT_APP_ID` e `MICROSOFT_APP_PASSWORD` são obtidos ao registrar seu bot no portal do Azure ou no Bot Framework. Eles devem ser armazenados de forma segura e podem ser configurados como variáveis de ambiente.

4. **Criação do Bot Universal**: Crie um bot universal que irá lidar com as interações do usuário:
   ```javascript
   const bot = new UniversalBot(connector);
   ```

5. **Defina Diálogos e Comportamentos do Bot**: Adicione diálogos para responder às mensagens do usuário. Aqui está um exemplo simples:
   ```javascript
   bot.dialog('/', [
       (session) => {
           session.send('Olá! Eu sou um bot simples.');
           builder.Prompts.text(session, 'Qual é o seu nome?');
       },
       (session, results) => {
           session.endDialog(`Olá, ${results.response}!`);
       }
   ]);
   ```

## PASSO 5: EXECUÇÃO DO BOT:
1. **Inicie o Servidor**: Adicione o código para iniciar o servidor e ouvir as mensagens dos usuários:
   ```javascript
   const restify = require('restify');
   const server = restify.createServer();
   server.listen(process.env.port || process.env.PORT || 3978, () => {
       console.log('%s Aplicação executando na porta %s', server.name, server.url);
   });
   server.post('/api/messages', connector.listen());
   ```

2. **Inicie o Bot**: Execute o seu bot com o seguinte comando no terminal:
   ```
   node app.js
   ```

## PASSO 6: TESTE DO BOT:
1. **Teste Local**: Use o Bot Framework Emulator para testar o bot localmente. Baixe o emulador em [botframework-emulator](https://github.com/Microsoft/BotFramework-Emulator/releases).

2. **Teste no Canal**: Registre e publique seu bot no portal do Azure ou no Bot Framework para permitir que ele seja acessível em canais como Skype, Microsoft Teams, entre outros.

## CONCLUSÃO:
Este tutorial cobriu os passos básicos para começar com o Microsoft Bot Framework usando Node.js. A partir daqui, você pode explorar mais recursos, como integração com serviços cognitivos, armazenamento de estado do bot, e muito mais. Lembre-se de consultar a documentação oficial do Microsoft Bot Framework para informações detalhadas e guias avançados.

# MANUAL PARA ESSE CURSO:
Para realizar as demos dessa série, se faz necessário instalar os seguintes programas:

* Visual Studio Code - [DOWNLOAD AQUI](https://code.visualstudio.com/?WT.mc_id=javascript-0000-gllemos)
* Node.JS - [DOWNLOAD AQUI](https://nodejs.org/en/)
* Microsoft Bot Framework Emulator - [DOWNLOAD AQUI](https://github.com/Microsoft/BotFramework-Emulator/releases
)
* Instalar a versão Python 2.x - [DOWNLOAD AQUI](https://www.python.org/downloads/)
* Instalar globalmente o node-gyp - [DOCUMENTAÇÃO PARA INSTALAÇÃO DE MANEIRA CORRETA AQUI](https://github.com/nodejs/node-gyp)

* Cadastro no site LUIS: https://www.luis.ai/
* Cadastro no site Azure: https://azure.microsoft.com/services/bot-service/?WT.mc_id=javascript-0000-gllemos

OBS.: Quando seguir o passo da instalação do **node-gyp** é de suma importância que façam o seguinte:

**Passo 1:** criar manualmente o arquivo **binding.gyp** dentro do diretório do node_modules do appData, conforme o exemplo abaixo:

```

> C:\users\UserName\appdata\roaming\npm\node_modules\node-gyp

```

**Passo 2:** incluir no arquivo **binding.gyp** o seguinte bloco de código e salve:

```

{
    "targets": [{
    "target_name": "binding",
    "sources": [ "build/Release/binding.node" ]
    }]
}

```

**Passo 3:** feito isso, agore execute os seguintes comandos abaixo, dentro do mesmo diretório do appData:

```

> node-gyp configure

```

```

> node-gyp configure --msvs_version=2015

```

```

> node-gyp build

```

Seguindo todos esses passos, vocês estará para pronta para instalar as depedências do projeto na pasta do projeto! 