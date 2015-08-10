**IMPORTANTE**: em seu terminal de preferência, dentro da pasta 01, baixe todas as dependências do projeto através do comando `npm install` antes de continuar.

## Exercício 3 

Temos nosso servidor Express rodando com as rotas `/palestrantes` e `/eventos` configuradas. Chegou a hora de prepararmos o terreno para nosso cliente em Angular. 

Repare que `index.html` já importa o script `angular.js`, porém isso não é suficiente. Precisamos criar o módulo principal da aplicação e carregá-lo.

## PASSO 1

Crie o arquivo **public/js/main.js** e não esqueça de importá-lo logo após o scriot do Angular.js.

O script do Angular disponibiliza o objeto global `angular`. É por meio dele que executamos uma série de tarefas, entre elas a criação de módulos através da função `module`.

## PASSO 2
No arquivo `main.js`, crie o módulo `minhaApp`:

```
angular.module('minhaApp', []);
```

Precisamos agorar indicar para o Angular que o módulo `minhaApp` deve ser carregando assim que `index.html` for carregada (carregar `main.js` apenas disponbiliza o módulo para ser carregado).

## PASSO 3
Altere `public/index.html` adicionando a diretiva `ng-app` com o valor `minhaApp` diretamente na tag HTML. Lembre-se que diretivas ensinam novos truques para o navegador, neste caso, ele aprende a carregar módulos do Angular:

```
<!doctype html>
<html ng-app="minhaApp">
<!-- código posterior omitido -->
```

## Passo 4
Acesse o endereço `localhost:3000` em seu navegador. Continuamos com a mesma página, pois ainda não fizemos nada excepcional em Angular, porém não deixe de verificar no console do navegador se existe alguma mensagem de erro (script não importado, erros de sintaxe) antes de continuar. 

Se nenhuma mensagem for exibida, parabéns, você criou e carregou seu primeiro módulo do Angular que nada faz! :). No próximo exercícios aprendemos como consumir nossa lista de participantes e construir uma lista dinâmica através do Angular.