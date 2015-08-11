**IMPORTANTE**: em seu terminal de preferência, dentro da pasta 01, baixe todas as dependências do projeto através do comando `npm install` antes de continuar.

## Exercício 6

Não é porque estamos criando uma Single Page Application que tudo ficará no `index.html`. Vamos criar uma view partcial para a listatem de palestrantes e outra para o cadastro de palestrantes que ainda faremos.

## PASSO 1 

O primeiro passo é importar o módulo `ngRoute` para que possamos trabalhar com o sistema de rotas do Angular. 

**Em index.html**, adicione a importação do módulo:

```
<script src="js/lib/angular-route.js"></script>
```

## PASSO 2
Isso ainda não é suficiente, precisamos indicar que nosso módulo `minhaApp` depende do módulo `ngRoute`:

**Altere public/js/main.js** adicionando a nova dependência:

```
angular.module('minhaApp', ['ngResource', 'ngRoute']);
```

## PASSO 3

Chegou a hora de criarmos as views particiais `lista.html` e `cadastro.html`, ambas dentro da pasta `public/partials`

<!-- public/partials/lista.html -->
<h1 class="text-center">Paletrantes</h1>
<table class="table table-bordered">
    <tr ng-repeat="palestrante in palestrantes">
        <td>{{palestrante.nome}}</td>
        <td>{{palestrante.palestra}}</td>
    </tr>
<table>

<!-- public/partials/palestrante.html -->
<h2>Cadastro de Palestrante</h2>


## PASSO 4

Agora, `index.html`, no lugar de exibir algum conteúdo, terá uma grande lacuna que será preenchida com o conteúdos das particiais que criamos de acordo com a rota do usuário acessada na barra de endereços. Usaremos a diretiva `<ng-view>`.

**Altere public/index.html**, o conteúdo da `div.container` será apenas a diretiva `<ng-view>`:


<!-- public/index.html -->

<body>
    <div class="jumbotron text-center">
        <h1>Workshop MEAN</h1>
    </div>
    <div class="container">
        <ng-view></ng-view>
    </div>
</body>

## PASSO 4

De nada isso adiantará se não cadastramos as rotas que serão processadas no lado do cliente. É através delas que o Angular saberá qual parcial inserir dentro da diretiva `<ng-view>`:

**Altere public/js/main.js** adicionando uma chamada à função `config`, que recebe como artefato injetável `$routeProvider`. Sem o módulo `ngResource`, não seria possível injetá-lo. O serviço injetado possui a função `when` que recebe como primeiro parâmetro o nome da rota e o segundo um objeto JavaScript com as chaves `controller` e `templateUrl`:

angular.module('minhaApp', ['ngResource', 'ngRoute'])
    .config(function($routeProvider) {

        $routeProvider.when('/', {
            controller: 'PalestrantesController',
            templateUrl: 'partials/listagem.html'
        });

        $routeProvider.when('/cadastro', {
            templateUrl: 'partials/cadastro.html'
        });

        // se uma rota inexistente for acessada, redireciona para `/`
        $routeProvider.otherwise({redirectTo: '/'});
    });

