**IMPORTANTE**: em seu terminal de preferência, dentro desta pasta, baixe todas as dependências do projeto através do comando `npm install` antes de continuar.

## Exercício 5

Para integrarmos nosso cliente Angular com nosso back-end, utilizaremos o serviço do Angular `$http`, especializado em requisições Ajax.

## PASSO 1
Angular trabalha com injeção de dependência baseada em nomes.
**Altere** `palestrantes-controller.js` e injete o serviço `$http`. Aproveite e deixe nosso array de palestrantes vazio:

```
// public/js/controllers/palestrantes-controller.js

angular
    .module('minhaApp')
    .controller('PalestrantesController', function($scope, $http) {
        $scope.palestrantes = []
    });
```

## PASSO 2 
Use o módulo `$http` para consumir o endereço `/palestrantes`. Lembre-se que ele devolve uma promise e que toda promise possui as funções `then`
 e `catch`. A primeira, recebe o callback de sucesso, a segundo, o de erro:

```
angular
    .module('minhaApp')
    .controller('PalestrantesController', function($scope, $http) {
        $scope.palestrantes = [];

        $http.get('/palestrantes')
        .then(function(retorno) {
            // cuidado, é retorno.data
            $scope.palestrantes = retorno.data
        })
        .catch(function(erro) {
            console.log(erro);
        });
    });
```

Recaregue sua página no navegador. A lista deve ser exibida com os dados que vieram do servidor.

## PASSO 2
Vamos substituir o uso de `$http` por `$resource`, este último um serviço especializado do Angular para consumir endpoints que seguem o padrão REST.

**Primeiro**, importe o script do módulo `ngResource` em `index.html`, 
logo após o último script que importamos:

```
<script src="js/lib/angular-resource.js"></script>
```

## PASSO 3
Carregar o módulo não é suficiente. Precisamos adicionar o módulo `ngResource` como dependência do nosso módulo `minhaApp`

**Altere** `public/js/main.js`:

```
angular.module('minhaApp', ['ngResource']);
```

## PASSO 4

Agora, substitua a injeção de `$http` por `$resource` e utilize a função `query` para obter todos os palestrantes:

```
angular
    .module('minhaApp')
    .controller('PalestrantesController', function($scope, $resource) {
        $scope.palestrantes = []

        // cria uma instância para o endpoint
        var recurso = $resource('/palestrantes');

        // chama a função especializada
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



## PASSO 5 
Agora teste o resultado, a lista deve continuar a ser exibida, só que dessa vez, utilizando o serviço `$resource`.