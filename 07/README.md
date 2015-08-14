**IMPORTANTE**: em seu terminal de preferência, dentro deste diretório, baixe todas as dependências do projeto através do comando `npm install` antes de continuar.

# EXERCÍCIO 7

Com o MongoDB devidamente instalado, dentro do terminal do seu sistema operacional favorito, cheme o Mongo Shell:

```
mongo
```

O Mongo Shell será carregado com a mensagem:

```
MongoDB shell version: 3.0.3
connecting to: test
```

## PASSO 1

Por padrão, estamos conectados com o baco `test`. Vamos nos conectar no banco `workshop`, caso ele não existe, o MongoDB o criará automaticamente:

### a)
```
use workshop
```

Se digitarmos `db` teclando ENTER logo em seguida, o nome do nosso banco será exibido no console. Agora `db` é um atalho para nosso banco.

### b)
O Mongo Shell é compatível com a linguagem JavaScript. Vamos criar uma variável que representa um palestrante no formato JSON:

```
palestrante = {"nome" : "Rayson", "palestra" : "perdendo peso"}
```

### c)
Agora precisamos salvar este palestrante, mas em qual "tabela"? Bem, o MongoDB não trabalha com tabelas, mas com **collections** que não possuem esquemas. Vamos criar a collection `palestrantes` acessando-a como se fosse uma propriedade de `db`. Em seguida, a partir da collection, chamaremos a função `insert` que recebe nosso palestrante gravando-o na collection `palestrantes`:

```
db.palestrantes.insert(palestrante)
```

### d)
Excelente, agora vamos alterar nosso palestrante adicionando-o mais uma vez na collection `palestrantes`:

```
palestrante = {"nome" : "Shall", "palestra" : "ganhando peso"}
db.palestrantes.insert(palestrante)
```

### e)
Temos dois palestrantes gravados. Como listá-los? Fazemos isso através da função `find`:

```
db.palestrantes.find()
```

Agora que já aprendemos incluir e a listar palestrantes, vamos alterar nosso servidor para retornar a lista de participantes do Banco no lugar de retornar uma lista estática.

## PASSO 2

Abra o arquivo `app/config/database.js`. A conexão com o MongoDB será feita através do Mongoose, uma ferramenta de ODM que além de nos auxiliar na conexão com o banco, também nos ajudará na criação de esquemas no lado da aplicação. Não precisamos alterar este arquivo.

## PASSO 3

**Altere** `07/server.js` e carregue o módulo `database.js` passando como parâmetro o endereço do MongoDB (localhost) e o nome do banco que queremos nos conectar (workshop). Seu `server.js` deve ficar assim:

```
var http = require('http')
    ,app = require('./config/express');

// novidade!
require('./config/database')('localhost/workshop');

http.createServer(app)
    .listen(3000, function() {
        console.log('Server is running');
        console.log('http://localhost:3000');
    });
```
Faça um teste, parando seu servidor iniciando-o logo em seguida. A string `Mongoose! Connectado em localhost/workshophttp://localhost` deve ser exibida.

## PASSO 4

Apesar do MongoDB ser Schemaless, isso não quer dizer que esquemas não sejam importantes, a grande questão é que eles são responsabilidades da aplicação. Criaremos nosso primeiro esquema que representa um palestrante.

**Crie** o arquivo **app/models/palestrante.js**.

```
var mongoose = require('mongoose');

module.exports = function() {
  
  // cria o esquema
  var schema = mongoose.Schema({
    nome: { 
      type: String, 
      required: true
    }, 
    palestra: {
      type: String, 
      required: true
    }
  });

  // baseado no esquema criado, cria um modelo
  return mongoose.model('Palestrante', schema);
};
```

## PASSO 5

Precisamos usar o modelo `Palestrante` em nossa API, mas como? Precisamos alterar express-load para que carregue primeiro todos os módulos da pasta `models` para em seguida carregar nossa API.

**Altere** `07/config/express.js`, a linha que chama a função `load` deve ficar assim:

```
load('models', {cwd: 'app'})
    .then('api')
    .into(app);
```

## PASSO 6

Essa pequena alteração tornará acessível nosso modelo através da instância do expressa passada como parâmetro para a API. Lembre-se que é o Express load que carregará todos os módulos dentro de `models` inclusive nossas `API's`
```

module.exports = function(app) {
    
    // models é a pasta e palestrante é o nome do arquivo js
    var Palestrante = app.models.palestrante;
    
    app.route('/palestrantes')
        .get(function(req, res) {
            Palestrante
                .find()
                .exec()
                .then(function(palestrantes) {
                    res.json(palestrantes);     
                });
        });
};
```

Depois de tanta alterações, reinicie o servidor e acesse o endereço da aplicação. Os dados cadastrados devem ser exibidos por nosso cliente Angular.
