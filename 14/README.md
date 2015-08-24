**IMPORTANTE**: em seu terminal de preferência, dentro deste diretório, baixe todas as dependências do projeto através do comando `npm install` antes de continuar.

# Exercício 14

Podemos melhorar a experiência do usuário exibindo informações.

## PASSO 1

```
<p class="alert-info" ng-show="msg">{{msg}}</p>
```

## PASSO 2

```
// public/js/controllers/cadastro-controller.js

$scope.gravar = function() {

    servicoPalestrante
        .cadastrar($scope.palestrante)
        .then(function(retorno) {
            if (retorno.alteracao) $location.path('/');
            $scope.palestrante = {};
            $scope.msg = retorno.msg;  // novidade             
        })
        .catch(function(erro) {
            console.log(erro.msg);
            $scope.msg = erro.msg; // novidade
        }); 
};
```

