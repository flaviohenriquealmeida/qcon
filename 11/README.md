**IMPORTANTE**: em seu terminal de preferência, dentro deste diretório, baixe todas as dependências do projeto através do comando `npm install` antes de continuar.

# Exercício 11

Vamos concluir nosso cadastro, implementando a alteração de palestrantes.

## PASSO 1

Primeiro, precisamos criar a rota que busca o palestrante que desejamos alterar. Assim como a rota de deleção, ela recebe com parâmetro um curinga e é através desse curinga que temos acesso ao ID do palestrante enviado através de `req.params.id`. Usaremos `findById` disponível no modelo criado pelo Mongoose:

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

Como alteremos nosso servidor, precisamos reiniciá-lo para que as alterações sejam aplicadas.

## PASSO 2

Agora, no Angular, crie uma nova rota, muito parecida com a rota de cadastro que já temos, com a diferença de que ela receberá também um curinga no final, indicando que é uma rota parametrizada:

```
// public/js/controllers/cadastro-controller.js

// nova rota!

$routeProvider.when('/cadastro/:id', {
    controller: 'CadastroController',
    templateUrl: 'partials/cadastro.html'
});
```

## PASSO 3

Em `lista.html`, vamos tornar a coluna do nome do palestrante um link que chamará nossa rota, construindo-a a partir do ID do palestrante:

```
<!-- public/partials/lista.html -->
<!-- alterando a coluna já existente -->
<td>
    <a href="#/cadastro/{{palestrante._id}}">
        {{palestrante.nome}}
    </a>
</td>
```

## PASSO 4

Repare que usaremos o mesmo controller para inclusão e alteração. A diferença é que através do serviço `$routeParams` injetado no controller, temos acesso ao ID passado caso estejamos alterando um palestrante. Se o ID não for passado, é inclusão, se for, é alteração.

O primeiro passo é buscar o palestrante do nosso servidor caso o ID do palestrante tenha sido passado:


```
// public/js/controllers/cadastro-controller.js

angular.module('minhaApp')
    .controller('CadastroController', function($scope, recursoPalestrante, $routeParams) {


        $scope.palestrante = {};

        // novidade aqui!
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

## PASSO 5

Precisamos alterar o servidor mais uma vez para adicioanarmos a rota de alteração através do verbo `PUT`. Usaremos `findByIdAndUpdate` do nosso modelo para buscar e atualizar o palestrante. OBS: a novidade abaixo é apenas a funçã `put`:

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

## PASSO 6

Por fim, precisamos alterar `CadastroController` para que saiba alterar nosso palestrante quando seu ID for passado como parâmetro em nossa rota. Após alterar, fazeremos uma navegação programática através de `$location`, que também precisa ser injetado em nosso controller:

```
// public/js/controllers/cadastro-controller.js
// código anterior omitido

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

## PASSO 7
Tenha certeza de ter reiniciado o servidor e teste o resultado. Altere e inclua alguns palestrantes.