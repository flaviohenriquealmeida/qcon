**IMPORTANTE**: em seu terminal de preferência, dentro deste diretório, baixe todas as dependências do projeto através do comando `npm install` antes de continuar.

# Exercício 12

Neste exercícios vamos deixar ainda melhor a organização do nosso código no lado do servidor separando as rotas de suas implementações.

## PASSO 1

``
module.exports = function(app) {

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

```
load('models', {cwd: 'app'})
    .then('api')
    .then('routes')
    .into(app);
```

```
module.exports = function(app) {
    
    var Palestrante = app.models.palestrante;
    
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

