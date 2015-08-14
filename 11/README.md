**IMPORTANTE**: em seu terminal de preferência, dentro deste diretório, baixe todas as dependências do projeto através do comando `npm install` antes de continuar.

# Exercício 11

Vamos concluir nosso cadastro, implementando a alteração de palestrantes.

## PASSO 1

```
// app/api/palestrantes.js

module.exports = function(app) {
    
    var Palestrante = app.models.palestrante;
    
   // rota anterior omitida

    app.route('/palestrantes/:id')
        .delete(function(req, res) {
           // código omitido
        })
        .get(function(req, res) {

            var _id = req.params.id;
            Palestrante.findById(_id)
            .exec()
            .then(function(palestrante) {
                if (!palestrante) throw new Error("Palestrante não encontrado");
                    res.json(palestrante);
                }, 
                function(erro) {
                    console.log(erro);
                    res.status(404).json(erro);
                });     
        });
};
```

```
$routeProvider.when('/cadastro/:id', {
    controller: 'CadastroController',
    templateUrl: 'partials/cadastro.html'
});
```

```
<td>
    <a href="#/cadastro/{{palestrante._id}}">
        {{palestrante.nome}}
    </a>
</td>
```

```
angular.module('minhaApp')
    .controller('CadastroController', function($scope, recursoPalestrante, $routeParams) {


        $scope.palestrante = {};

        var idPalestrante = $routeParams.id;
        
        if(idPalestrante) {
            recursoPalestrante.get({id: idPalestrante}, function(palestrante) {
                $scope.palestrante = palestrante;
            }, function(erro) {
                console.log(erro);
            });
        }

        // código posterior omitido
```

```
// app/api/palestrantes.js

// rota anterior omitida

    app.route('/palestrantes/:id')
        .delete(function(req, res) {
            var id = req.params.id;
            Palestrante.remove({"_id" : id}).exec()
            .then(
            function() {
                 res.status(204).end(); 
            }, 
            function(err) {
                return console.error(erro);
            });
        })
        .get(function(req, res) {

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
        })
        .put(function(req, res) {

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
        });
```

```
$scope.gravar = function() {

    if(idPalestrante) {
        recursoPalestrante.update({id: idPalestrante}, $scope.palestrante, function(palestrante) {
            $location.path('/');
        });
    } else {
        recursoPalestrante.save($scope.palestrante, function() {
            $scope.palestrante = {};
        });
    }
}
```
