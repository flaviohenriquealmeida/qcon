**IMPORTANTE**: em seu terminal de preferência, dentro da pasta 01, baixe todas as dependências do projeto através do comando `npm install` antes de continuar.

## Exercício 7

## PASSO 1

### a)
```
use workshop
```

### b) 
```
palestrante = {"nome" : "Rayson", "palestra" : "perdendo peso"}
```

### c)
```
db.palestrantes.insert(palestrante)
```

### d)
```
palestrante = {"nome" : "Shall", "palestra" : "ganhando peso"}
db.palestrantes.insert(palestrante)
```

### e)
```
db.palestrantes.find()
```

## PASSO 2
veja o arquivo app/config/database.js. 

## PASSO 3

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

## PASSO 4
Crie o arquivo **app/models/palestrante.js**.

```
var mongoose = require('mongoose');

module.exports = function() {
  
  var schema = mongoose.Schema({
    nome: { 
      type: String, 
      required: true,
      index: {
        unique: true
      }
    }, 
    palestra: {
      type: String, 
      required: true
    }
  });

  return mongoose.model('Palestrante', schema);
};
```

## PASSO 5

```
load('models', {cwd: 'app'})
    .then('api')
    .into(app);
```

## PASSO 6

```
module.exports = function(app) {
    
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