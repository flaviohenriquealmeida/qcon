**IMPORTANTE**: em seu terminal de preferência, dentro da pasta 01, baixe todas as dependências do projeto através do comando `npm install` antes de continuar.

## Exercício 4
Nossa tarefa será consumir a lista de participantes de nosso servidor e montar uma lista dinamicamente no cliente através do Angular. Encare `index.html` como nossa view que precisa de dados (model) do servidor. É papel de um controller disponbilizar o model para view, sendo assim, criaremos nosso primeiro controller. Inicialmente, ele retornará uma lista fixa, não buscará do nosso servidor. Faremos essa integração mais tarde.

## PASSO 1
Crie o arquivo **public/js/controllers/palestrantes-controller.js**.
Vamos criar um controller para o módulo `minhaApp` que criamos:

```
// public/js/controllers/palestrantes-controller.js
angular
    .module('minhaApp')
    .controller('PalestrantesController', function($scope) {
    
});
```

## PASSO 2
Como não passamos o array de dependências para a função `module`, Angular entende que desejamos acessar um módulo já existe, o `minhaApp`.

É através de `$scope` que disponbilizamos dados para view. Primeiro, vamos disponbilizar uma fixa de palestrantes:

```
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

## PASS 4
Adicione a tag script que importa nosso controller logo após a importação do nosso arquivo `main.js`:
```
<script src="js/lib/angular.js"></script>
<script src="js/main.js"></script>
<script src="js/controllers/palestrantes-controller.js"></script>
```
## PASSO 3
Como em nossa view `index.html` teremos acesso à lista de participantes definida em `$scope` de `PaletrantesController`? O primeiro passo indicar que 
nosso controller tomará conta de um fragmento do DOM em nossa página, em nosso caso, queremos que ele gerencie todo o `body`:

Altere `index.html` adicionando a diretiva `ng-controller` na tag `body`:

```
<body ng-controller='PalestrantesController'>
```

Dentro da tag body, incluindo todos os seus elementos filhos, podemos acessar `$scope.palestrantes` através deu uma Angular Expression (AE). Adicione a expressão como primeiro elemento filho da `div` com classe `container`:
```
<body ng-controller="PalestrantesControler">
    <div class="jumbotron text-center">
        <h1>Workshop MEAN - Qcon Rio</h1>
    </div>
    <div class="container">
        {{palestrantes}}
    </div>
</body>
```

### PASSO 4
Verifique o resultado: aparecerá a estrutura de dados da nossa lista. Caso apareça `{{palestrantes}}` é porque houve algum problema no código anterior. Veja o console do seu navegador e tente descobrir, caso algum erro aconteça.


### PASSO 5 
Queremos exibir nossos participantes em uma tabela dinâmica que deve exibir o nome e a palestra do palestrante. Vamos usar a diretiva `ng-repeat` para criar uma `<tr>` para cada um de nossos participantes:

```
    <body ng-controller="PalestrantesController">
        <div class="jumbotron text-center">
            <h1>Workshop MEAN</h1>
        </div>
        <div class="container">
            <table class="table table-bordered">
                <tr ng-repeat="palestrante in palestrantes">
                    <td>{{palestrante.nome}}</td>
                    <td>{{palestrante.palestra}}</td>
                </tr>
            <table>
        </div>
    </body>
```

## PASSO 6

Você já pode testar e ver o resultado. Angular montará dinamicamente em seu navegador a tabela de acordo com os dados que foram disponbilizados pelo controller. 



