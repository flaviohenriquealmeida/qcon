**IMPORTANTE**: em seu terminal de preferência, dentro da pasta 01, baixe todas as dependências do projeto através do comando `npm install` antes de continuar.

## Exercício - 1

Nosso projeto possui a seguinte estrutura:

```
server.js -> incializa nosso servidor que recebe uma instância do Express
config
    express.js -> centraliza as configurações do Express
public
    css
        bootstrap.min.css
        bootrap.theme.css
    index.html -> Página principal da aplicação
```

**PASSO 1**

Inicie seu servidor, para isso, dentro da pasta 01, utilize o comando:

```
npm init
```

**PASSO 2**

Nosso servidor incializa, mas a instância do Express passada para nosso servidor ainda não foi devidamente configurada. Por exemplo, ainda não somos capazes de acessar o arquivo `index.html` dentro da pasta `public`. Precisamos configurar nosso primeiro middleware!

Altere o arquivo 01/config/express.js e adicione o middleware `express-static` para tornar acessível a pasta `public` e todos os nossos arquivos para o navegador:

```
// qcon/01/config/express.js

var express = require('express');
var app = express();

// novidade: configurando o express static
app.use(express.static('public'));

module.exports = app;
```

Será necessário parar o servidor (CONTROL + C, COMMAND + C) e reiniciá-lo novamente para que as alterações surtam efeito.

**PASSO 3**

Experimente acessar o endereço `http://localhost:3000` e verifique se a tela de boas-vindas do workshop é exibida. 