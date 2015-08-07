**IMPORTANTE**: em seu terminal de preferência, dentro da pasta 01, baixe todas as dependências do projeto através do comando `npm install` antes de continuar.

## Exercício - 2

Temos um servidor web que apenas compartilha dados estáticos, mas isso não é suficiente. Precisamos criar alguns endpoints REST que serão consumidos por nosso cliente em Angular.js.


**PASSO 1**

Vamos seguir a seguinte convenção: nossos endpoints ficarão todos dentro da pasta `app/api`, inclusive já temos o `app/api/palestrantes.js` que configura a rota `/palestrantes` que retorna uma lista de palestrantes. 

Nosso problema é que o Express ainda não está ciente deste endpoint, alguém precisa carregá-lo. Uma maneira de fazermos isso é através do modulo `express-load`. Podemos indicar a pasta `app/api` fazendo com que ele carregue automaticamente nossas novas API's à medida que formos adicionando-as dentro da pasta. 

Vamos editar `config/express.js` e adicionar a configuração do `express-load`. Seu arquivo `config/express.js` deve ficar assim:

```
var express = require('express');

// importa o módulo express-load
var app = express()
    ,load = require('express-load');

app.use(express.static('public'));

// configura o express-load
load('api', {cwd: 'app'}).into(app);

module.exports = app;

``

**PASSO 2**

Agora que você configurou o expres-load, já pode subir o servidor com `npm start` e acessar a URL `http://localhost:3000/participantes` que 
retornará um JSON com uma lista de participantes.

**PASSO 3**

Estamos acessando um endpoint que foi registrado no Express, mas isso não vale, ele já estava criado! Vamos criar um novo endpoint!

Crie o arquivo `eventos.js` dentro da pasta `app/api`. Como estamos usando o `expres-load` ele carregará o arquivo quando o servidor for reiniciado, mas é claro, precisamos configurar o novo arquivo primeiro.

**PASSO 4**

No início do arquivo `eventos.js`, crie uma lista de eventos. Usaremos dados estáticos por enquanto, mais tarde aprendemos a obter esses dados do MongoDB:

```
// arquivo 02/app/api/eventos.js

var eventos = [
    {"nome" : "Workshop MEAN"},
    {"nome" : "Workshop Angular"},
];
```

Agora que já temos nossa lista, precisamos criar um módulo do Node.js 
que configurará o endpoint `/eventos`. Ele deve retornar uma lista de eventos. 

Fazemos isso através de `app.route` da instância do Express recebida 
como parâmetro.

```
// arquivo 02/app/api/eventos.js

var eventos = [
    {"nome" : "Workshop MEAN"},
    {"nome" : "Workshop Angular"},
];

module.exports = function(app) {
    
    app.route('/eventos')
        .get(function(req, res) {
            res.json(eventos);
        });
};
```