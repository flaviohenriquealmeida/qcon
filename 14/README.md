**IMPORTANTE**: em seu terminal de preferência, dentro deste diretório, baixe todas as dependências do projeto através do comando `npm install` antes de continuar.

# Exercício 14

Podemos melhorar a experiência do usuário exibindo informações.

## PASSO 1
**Altere** `public/partials/cadastro.html` e adicione o parágrafo 
após o título da página:
```
<!-- public/partials/cadastro.html -->
<p class="alert-info" ng-show="msg">{{msg}}</p>
```

A diretiva `ng-show` exibirá o parágrafo caso o valor de `$scope.msg` seja diferente de `undefined`.

## PASSO 2

**Altere** `public/js/controllers/cadastro-controller.js`. Adicione em `$scope.msg` a mensagem retornada pelo serviço:

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

Cadastre um novo palestrante e veja a mensagem sendo exibida.

