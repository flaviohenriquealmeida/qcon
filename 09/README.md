**IMPORTANTE**: em seu terminal de preferência, dentro deste diretório, baixe todas as dependências do projeto através do comando `npm install` antes de continuar.

# Exercício 9

Neste exercício, implementaremos a funcionalidade de remoção de palestrantes.

## PASSO 1

Precisamos adicionar mais uma rota em nosso servidor, desta vez, para lidar com requisições do tipo DELETE, inclusive nosso código deve ter capaz de obter o ID do palestrante que desejamos apagar.

**Altere** `api/palestrantes.js` criando a rota `/palestrantes/:id`. Veja que dessa vez ela possui o curinga `:id`. É através de `req.params.id` que teremos acesso ao ID enviado pelo nosso cliente Angular: 

```
// app/api/palestrantes.js
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
        })
        .post(function(req, res) {
            Palestrante
            .create(req.body)
            .then(function(palestrante) {
                res.status(200).send(palestrante);
            });
        });
    
    // novidade, nova rota com o curinga :id
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
        });
};
```

Como realizamos uma modificação em nosso servidor, precisamos reiniciá-lo.

## PASSO 2
Altere **public/partials/lista.html** adicioando mais uma coluna com o botão `remover`. É através da diretiva `ng-click` do botão que executaremos a função `remover` de `ListaController`. Veja que ele recebe como parâmetro o palestrante que desejamos remover:

Nossa parcial no final deve ficar assim:

```
<!-- public/partials/lista.html -->
<h1 class="text-center">Paletrantes</h1>
<table class="table table-bordered table-striped">
    <tr ng-repeat="palestrante in palestrantes">
        <td>{{palestrante.nome}}</td>
        <td>{{palestrante.palestra}}</td>
        <td>
            <button class="btn btn-danger" 
                    ng-click="remover(palestrante)">
                Remover
            </button>
        </td>
    </tr>
<table>
```

## PASSO 3

Agora precisamos implementar a função `remover` em `ListaController`.
**Altere** `public/js/controllers/lista-controller.js` adicionando nossa função em `$scope`:

```
// public/js/controllers/lista-controller.js
angular
    .module('minhaApp')
    .controller('ListaController', function($scope, $resource) {

        $scope.palestrantes = []

        var recursoPalestrante = $resource('/palestrantes/:id');

        recursoPalestrante.query(
            function(palestrantes) {
                $scope.palestrantes = palestrantes;
            }, 
            function(erro) {
                console.log(erro);
            }
        );  
        
        // novidade aqui! 

        $scope.remover = function(palestrante) {
            recursoPalestrante.delete({id: palestrante._id}, function() {
               // não executa nenhuma ação, por enquanto.
            }, function(erro) {
                console.log('não foi possível remover')
            }); 
        };        
    });
```

## PASSO 4
Nossa remoção ainda deixa a desejar. Se removermos um palestrante, teremos que recarregar a página para que ele suma da lista. Podemos resolver isso removendo o produto de `$scope` caso o callback de sucesso de `recursoPalestrante.delete` seja executado com sucesso:

```
// public/js/controllers/lista-controller.js
angular
    .module('minhaApp')
    .controller('ListaController', function($scope, $resource) {

        $scope.palestrantes = []

        var recursoPalestrante = $resource('/palestrantes/:id');

        recursoPalestrante.query(
            function(palestrantes) {
                $scope.palestrantes = palestrantes;
            }, 
            function(erro) {
                console.log(erro);
            }
        );  

        $scope.remover = function(palestrante) {
            recursoPalestrante.delete({id: palestrante._id}, function() {

                // remove o palestrante na lista se a remoção no servidor for bem sucedida
                var index = $scope.palestrantes.indexOf(palestrante);
                $scope.palestrantes.splice(index,1);

            }, function(erro) {
                console.log('não foi possível remover')
            }); 
        };        
    });
