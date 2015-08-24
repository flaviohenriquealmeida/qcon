**IMPORTANTE**: em seu terminal de preferência, dentro deste diretório, baixe todas as dependências do projeto através do comando `npm install` antes de continuar.

# Exercício 13

No Angular, nosso `CadastroController` está com muita responsabilidade. Ele precisa saber quando queremos incluir ou alterar. Neste exercício criaremos um serviço do Angular que encapsulará a lógica de inclusão e alteração. Serviços podem ser injetados em controller ou em outros serviços.

## PASSO 1

**Altere** `public/js/services/palestrante-service.js` encadeando mais uma chamada à função `factory` criando o serviço `servicoPalestrante`. Ele dependerá de `recursoPalestrante` e do serviço `$q` para criação de promises.

```
// public/js/services/palestrante-service.js

angular.module('meusServicos', ['ngResource'])
    .factory('recursoPalestrante', function($resource) {

       // código omitido
    })
    .factory('servicoPalestrante', function(recursoPalestrante, $q) {

        var servico = {};

       // ainda precisamos configurar nosso serviço

        return servico;
    }); 
```

## PASSO 2

Nosso serviço será um objeto com a propriedade `cadastrar`. Ela guardará uma função que receberá como parâmetro um palestrante. Internamente, ela conterá a lógica para saber se precisamos incluir ou alterar um palestrante. Além disso, 
o retorno da nossa função devolverá uma **promise**, por isso injetamos o módulo `$q` que nos ajudará nessa tarefa.

Altere **public/js/services/palestrante-service.js** criando a função do nosso serviço que retornará uma promise:


```
angular.module('meusServicos', ['ngResource'])
    .factory('recursoPalestrante', function($resource) {
       // código omitido
    })
    .factory('servicoPalestrante', function(recursoPalestrante, $q) {

        var servico = {};

        // novidade!
        servico.cadastrar = function(palestrante) {

            return $q(function(resolve, reject) {
                if(palestrante._id) {
                    // alteração
                } else {
                    // inclusão
                }
            });
        };

        return servico;
    }); 
```

O serviço `$q` receve como parâmetro uma função com dois parâmetros. O primeiro, `resolve`, nos dá acesso à função que deve ser chamada apenas quando a promise é resolvida. O segundo, `reject`, apenas se acontecer algo der errado.

## PASSO 3

Agora, para alteração, chamaremos `recursoPalestrante.update` e na sua função de callback com o resultado da operação, chamaremos a função `resolve` passando um objeto com a mensagem de sucesso e uma propriedade indicando que a operação foi de alteração. A mesma coisa será feita para a inclusão. Nos dois caso, no callback de retorno de erros de `recursoPalestrante`, chamaremos a função `reject` que receberá uma mensagem de alto nível cada:

```
angular.module('meusServicos', ['ngResource'])
    .factory('recursoPalestrante', function($resource) {
        // código omitido
    })
    .factory('servicoPalestrante', function(recursoPalestrante, $q) {

        var servico = {};

        servico.cadastrar = function(palestrante) {


            return $q(function(resolve, reject) {

                if(palestrante._id) {
                    recursoPalestrante.update({id: palestrante._id}, palestrante, function() {
                        resolve({ msg: 'Alterado com sucesso', alteracao: true});
                    }, function(erro) {
                        console.log(erro);
                        reject({ msg: 'Não foi possível alterar'});
                    });

                } else {
                    recursoPalestrante.save(palestrante, function() {
                        resolve({ msg: 'Incluído com sucesso', alteracao: false});
                    }, function(erro) {
                        console.log(erro);
                        reject({ msg: 'Não foi possível incluir'});
                    });
                }
            });
        };

        return servico;
    }); 
```

## PASSO 4

Altere `public/js/controllers/cadastro-controller.js` para que faça uso do nosso novo serviço. Para isso, ele precisará ser injetado como qualquer outro serviço, inclusive já faça a alteração para chamarmos apenas `servicoPalestrante.cadastrar` em nosso controller. 

```
// public/js/controllers/cadastro-controller.js

// alterando apenas o `gravar`

$scope.gravar = function() {

    servicoPalestrante
        .cadastrar($scope.palestrante)
        .then(function(retorno) {
            if (retorno.alteracao) $location.path('/');
            $scope.palestrante = {};                
        })
        .catch(function(erro) {
            console.log(erro.msg);
        }); 
};
```

## PASSO 5

Teste o resultado.

