**IMPORTANTE**: em seu terminal de preferência, dentro deste diretório, baixe todas as dependências do projeto através do comando `npm install` antes de continuar.

# Exercício 10

Temos a definição do nosso recurso espalhada em nossos controllers. Vamos centralizar sua configuração em um serviço do Angular.

## PASSO 1

**Crie** o arquivo `public/js/services/palestrante-service.js`. Criaremos um novo módulo chamado `meusServicos` que dependenrá do móudlo `ngResource`. É através da função `factory` que criamos nosso serviço. O primeiro parâmetro é seu nome e o segundo uma função que o define:

```
// public/js/servicos/palestrante-service.js

angular.module('meusServicos', ['ngResource'])
    .factory('recursoPalestrante', function($resource) {

        return $resource('/palestrantes/:id');
    });
```

Nosso serviço é bem simples, retorna uma instância já configurada do nosso recurso, porém isola em um único lugar sua configuração.

## PASSO 2

Precisamos importar o script do nosso serviço em `public/index.html`:

```
<!-- outros scripts omitidos -->
<script src="js/services/palestrante-service.js"></script>
```

## PASSO 3

Altere **public/js/main.js**. Troque a importação da dependência `ngResource` por `meusServicos`, o módulo que acabamos de criar. 

```
// public/js/main.js

angular.module('minhaApp', ['ngRoute', 'meusServicos'])
    .config(function($routeProvider) {

        // código omitido
    });
```

## PASSO 4
Agora, vamos alterar `ListaController` recebendo como injeção o serviço `recursoPalestrante` no lugar de `$resource`. Inclusive não esqueça de apagar a linha que instanciava `$resource`. 

```
// public/js/controllers/lista-controller.js
angular
    .module('minhaApp')
    .controller('ListaController', function($scope, recursoPalestrante) {

        $scope.palestrantes = []

        // removida a linha que instanciava $resource
        // códig posterior omitido
    });
```

Faça a mesma coisa com `CadastroController`:

```
// public/js/controllers/cadastro-controller.js

angular.module('minhaApp')
    .controller('CadastroController', function($scope, recursoPalestrante) {

        // removida a linha que instanciava $resource

        // código posterior omitido
    });
```

## PASSO 5

Agora é só testar. Tudo deve continuar funcionando.


