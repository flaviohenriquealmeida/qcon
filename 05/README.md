**IMPORTANTE**: em seu terminal de preferência, dentro da pasta 01, baixe todas as dependências do projeto através do comando `npm install` antes de continuar.

## Exercício 5

No lugar de disponibilizarmos dados para a view, buscaremos esses dados do servidor através do serviço `$http`.

## PASSO 1
Angular trabalha com injeção de dependência baseados em nosso.
Altere `palestrantes-controller.js` e injete o serviço `$http` deixe nosso array de palestrantes vazio:

```
angular
    .module('minhaApp')
    .controller('PalestrantesController', function($scope, $http) {
        $scope.palestrantes = []
    });
```

## PASSO 2 
Use o módulo `$http` para consumir o endereço `/palestrantes`


```
angular
    .module('minhaApp')
    .controller('PalestrantesController', function($scope, $http) {
        $scope.palestrantes = [];

        $http.get('/palestrantes')
        .then(function(retorno) {
            $scope.palestrantes = retorno.data
        })
        .catch(function(erro) {
            console.log(erro);
        });
    });
```

Recaregue sua página no navegador. A lista deve ser exibida com os dados que vieram do servidor.

## PASSO 2
Vamos substituir o uso de $http por $resource, um serviço especializado do Angular para consumir endpoints que seguem o padrão REST.

Primeiro, importe o script do módulo `ngResour` em `index.html`, 
logo após o último script que importamos:

```
<script src="js/lib/angular-resource.js"></script>
```

## PASSO 3

Agora, substitua a injeção de `$http` por `$resource` e utilize a função `query` para obter todos os palestrantes:

```
angular
    .module('minhaApp')
    .controller('PalestrantesController', function($scope, $resource) {
        $scope.palestrantes = []

        var recurso = $resource('/palestrantes');

        recurso.query(
            function(palestrantes) {
                $scope.palestrantes = palestrantes;
            }, 
            function(erro) {
                console.log(erro);
            }
        );        
        
    });
```

## PASSO 4
Precisamos adicionar a dependência do módulo `ngResource` em nosso módulo `minhaApp`. Altere `public/js/main.js`:

```
angular.module('minhaApp', ['ngResource']);
```

## PASSO 5 
Agora teste o resultado, a lista deve continuar a ser exibida.