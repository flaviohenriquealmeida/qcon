**IMPORTANTE**: em seu terminal de preferência, dentro deste diretório, baixe todas as dependências do projeto através do comando `npm install` antes de continuar.

# Exercício 12

Neste exercícios vamos deixar ainda melhor a organização do nosso código no lado do servidor separando as rotas de suas implementações.

## PASSO 1
**Crie** o arquivo `app/routes/palestrantes.js`. Como estamos usando o `express-load`, através de `app` teremos acesso à todas as API's criadas dentro da pasta `app/api`. O arquivo `app/routes/palestrantes.js` no final deve estar assim:

```
// app/routes/palestrantes.js

module.exports = function(app) {

    // nossa API app/api/palestrantes

    var api = app.api.palestrantes
    
    app.route('/palestrantes')
        .get(api.lista)
        .post(api.adiciona);

    app.route('/palestrantes/:id')
        .delete(api.deleta)
        .get(api.buscaPorId)
        .put(api.altera);
};
```

## PASSO 2
O diretório `app/routes` ainda não é carregado pelo `express-load`. **Altere** `config/express.js` e carregue o diretório `routes` logo após o carregamento do diretório `api`. O trecho do codigo do `express-load` deve ficar assim:

```
load('models', {cwd: 'app'})
    .then('api')
    .then('routes')
    .into(app);
```

## PASSO 3

**Altere** `app/api/palestrantes.js` para retornar um objeto que contém as funções que usaremos em `app/routes`. 

Seu arquivo `app/api/palestrantes.js` deve estar exatamente como abaixo:

```
// app/api/palestrantes.js

module.exports = function(app) {
    
    var Palestrante = app.models.palestrante;
    
    // objeto que será retornado pelo módulo 
    var api = {};

    api.lista = function(req, res) {
        Palestrante
            .find()
            .exec()
            .then(function(palestrantes) {
                res.json(palestrantes);     
            });
    };

    api.adiciona = function(req, res) {
        Palestrante
        .create(req.body)
        .then(function(palestrante) {
            res.status(200).send(palestrante);
        });
    };

    
    api.deleta = function(req, res) {
        var id = req.params.id;
        Palestrante.remove({"_id" : id}).exec()
        .then(
        function() {
             res.status(204).end(); 
        }, 
        function(err) {
            return console.error(erro);
        });
    };

    api.buscaPorId = function(req, res) {

        var _id = req.params.id;
        Palestrante.findById(_id)
        .exec()
        .then(function(palestrante) {
            if (!palestrante) throw new Error("Palestrante não encontrado");
                res.json(palestrante)       
            }, 
            function(erro) {
                console.log(erro);
                res.status(404).json(erro);
            });     
    };

    api.altera = function(req, res) {

        var id = req.params.id;
        var palestrante = req.body;

        console.log(id);
        console.log(palestrante);

        Palestrante.findByIdAndUpdate(id, palestrante)
            .exec()
            .then(function(palestrante) {
                res.json(palestrante);
             }, 
             function(erro) {
                console.error(erro);
                    res.status(500).json(erro);
                 }
             );
    };

    return api;
};
```

## PASSO 4

Reinicie o servidor e teste o resultado. Apenas refatoramos nosso sistema, isto é, não mudamos seu comportamento.

