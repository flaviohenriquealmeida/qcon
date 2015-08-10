**IMPORTANTE**: em seu terminal de preferência, dentro da pasta 01, baixe todas as dependências do projeto através do comando `npm install` antes de continuar.

## Exercício 4
Nossa tarefa será construir uma lista de palestrantes dinamicamente através do Angular, entendendo como funciona seu mecanismo de `data binding`.


## PASSO 1 
Vamos indicar que nossa view `index.html` precisa de uma lista de `participantes` através de uma **Angular Expression** caracterizada por `{{ expressao }}`. No final das contas, estamos abrindo uma lacuna em nossa view que precisa ser preenchida:


```
<!-- public/index.html -->
<!-- código anterior omitido -->

<body ng-controller="PalestrantesControler">
    <div class="jumbotron text-center">
        <h1>Workshop MEAN</h1>
    </div>
    <div class="container">
        {{palestrantes}}
    </div>
</body>
```
Abrimos a lacuna em nossa view, mas dentro do modelo MVC é papel de do **controller** disponbilizar o dado (model) de que a view necessita.

## PASSO 2 

Crie o arquivo **public/js/controllers/palestrantes-controller.js**. Importe-o logo em seguida em nossa view `index.html`, logo abaixo do `main.js`:

```
<!-- public/index.html -->
<script src="js/lib/angular.js"></script>
<script src="js/main.js"></script>
<!-- novo arquivo importado -->
<script src="js/controllers/palestrantes-controller.js"></script>
```

Apesar de termos criado nosso controller em um arquivo em separado, ele precisa pertencer ao módulo `minhaApp`.

## PASSO 3
Altere **js/controllers/palestrantes-controller.js** e crie o controller `PalestrantesController`:

```
// public/js/controllers/palestrantes-controller.js
angular
    .module('minhaApp')
    .controller('PalestrantesController', function($scope) {
    
});
```

ATENÇÃO: como não passamos o array de dependência para a função `module`, o Angular entende que estamos querendo acessar um módulo já criado, em nosso caso `minhaApp`.

## PASSO 4

Criamos nosso controller, mas ainda precisamos disponibilizar nossa lista de `palestrantes` para nossa view e não basta declararmos uma variável dentro do nosso controller, porque toda variável declarada com `var` em uma função é enxergada apenas dentro da função.

É por isso que solicitamos ao sistema de injeção de dependências do angular o objeto `$scope` passando-o como parâmetro da função que representa nosso controller (O sistema de injeção do Angular é baseado em nomes e não na posição do parâmetro)

O `$scope` é um objeto JavaScript e qualquer propriedade adicionada dinamicamente neste objeto é visível pelo fragmento da view gerenciado pelo nosso controller.

**Altere** a declaração de `PalestrantesController`, recebendo como parâmetro **$scope** adicionando neste objeto a propriedade `participantes` que contém nossa lista de participantes:

```
// public/js/controllers/palestrantes-controller.js

angular
    .module('minhaApp')
    .controller('PalestrantesController', function($scope) {

        $scope.palestrantes = [
            {"nome": "Flávio Almeida", "palestra" : "MEAN"},
            {"nome" : "Zeca Baleiro",  "palestra" : "Angular"},
            {"nome" : "Tião Galinha",  "palestra" : "Mongo"}
        ];

});
```

## PASSO 5
Angular permite termos mais de um controller por view permitindo que cada controller gerencia parte do DOM. É por isso que criar o controller não é suficiente, precisamos indicar qual elemento do DOM ele gerenciará, isto é, qual será o seu **escopo**. Fazemos isso através diretiva **ng-controller** 
que deve ter como valor o nome exato do controller que desejamos asssociar àquele elemento do DOM, em nosso caso, `PalestrantesController`:

Altere `index.html` adicionando a diretiva `ng-controller` na tag `body`:

```
<body ng-controller='PalestrantesController'>
```

Queremos que a tag `body` sejam gerenciados por `PalestrantesController`. Isso permitirá que a AE (Angular Expression) que adicionamos em `index.html` seja resolvida utilizando a lista de participantes disponibilizada em `$scope`:

### PASSO 6
Verifique o resultado: aparecerá a estrutura de dados da nossa lista. Caso apareça `{{palestrantes}}` é porque houve algum problema no código anterior. Veja o console do seu navegador e tente descobrir.


### PASSO 7 
Queremos exibir nossos participantes em uma tabela dinâmica que deve exibir o nome e a palestra do palestrante. Vamos usar a diretiva `ng-repeat` para criar uma `<tr>` para cada um de nossos participantes:

```
    <body ng-controller="PalestrantesController">
        <div class="jumbotron text-center">
            <h1>Workshop MEAN</h1>
        </div>
        <div class="container">

            <!-- novidade aqui! template da tabela -->
            <table class="table table-bordered">
                <tr ng-repeat="palestrante in palestrantes">
                    <td>{{palestrante.nome}}</td>
                    <td>{{palestrante.palestra}}</td>
                </tr>
            <table>
        </div>
    </body>
```

## PASSO 8

Você já pode testar e ver o resultado. Angular montará dinamicamente em seu navegador a tabela de acordo com os dados que foram disponbilizados pelo controller. 



