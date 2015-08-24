**IMPORTANTE**: em seu terminal de preferência, dentro deste diretório, baixe todas as dependências do projeto através do comando `npm install` antes de continuar.

# Exercício 13

No Angular, nosso `CadastroController` está com muita responsabilidade. Ele precisa saber quando queremos incluir ou alterar. Neste exercício criaremos um serviço do Angular que encapsulará a lógica de inclusão e alteração. Serviços podem ser injetados em controller ou em outros serviços.

## PASSO 1

Vamos criar mais um serviço através da função `factory`, desta vez `servicoPalestrante`. Ele dependerá o nosso serviço `recursoPalestrante` e deve retornar no final uma promise. Criamos promises através do serviço `$q`.

**Altere** `public/js/services/palestrantes-service.js` e crie mais um serviço através da função `factory`:

```
angular.module('meusServicos', ['ngResource'])
    .factory('recursoPalestrante', function($resource) {
        // código omitido
    })
    .factory('servicoPalestrante', function(recursoPalestrante, $q) {
        return {};
    }); 
```


```
angular.module('meusServicos', ['ngResource'])
    .factory('recursoPalestrante', function($resource) {
        // código omitido
    })
    .factory('servicoPalestrante', function(recursoPalestrante, $q) {
        return $q(function(resolve, reject) {

        });
    }); 
```