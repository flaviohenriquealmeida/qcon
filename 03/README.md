**IMPORTANTE**: em seu terminal de preferência, dentro deste diretório, baixe todas as dependências do projeto através do comando `npm install` antes de continuar.

# EXERCÍCIO 3 

Temos nosso servidor Express rodando com as rotas `/palestrantes` e `/eventos` configuradas. Chegou a hora de prepararmos o terreno para nosso cliente em Angular. 

Repare que `index.html` já importa o script `angular.js`, porém isso não é suficiente. Angular utiliza o conceito de módulos para construir suas aplicações, sendo assim, podemos combinar e reutilizar vários módulos para construirmos nossa aplicação. Contudo, precisamos criar o módulo principal da aplicação, isto é, aquele primeiro módulo iniciado quando nossa aplicação é carregada no navegador.

## PASSO 1

Crie o arquivo **public/js/main.js** e não esqueça de importá-lo logo após o script do Angular.js:

```
<!-- public/index.html -->
<!-- código anterior omitido -->

<script src="js/lib/angular.js"></script>
<script src="js/main.js"></script>

<!-- códigi posterior omitido -->
```

O script do Angular disponibiliza o objeto global `angular`. É por meio dele que executamos uma série de tarefas, entre elas a criação de módulos através da função `module`. Ela recebe como primeiro parâmetro o nome do módulo e como segundo um array com o nome dos módulos de que ele depende. Como não temos nenhuma dependência, passamos um array vazio (você não pode omiti-lo!):

## PASSO 2
No arquivo `public/js/main.js`, crie o módulo `minhaApp`:

```
angular.module('minhaApp', []);
```

Precisamos agorar indicar para o Angular que o módulo `minhaApp` deve ser carregando assim que `index.html` for carregada (carregar `main.js` apenas disponbiliza o módulo para ser carregado, não o carrega automaticamente).

## PASSO 3

**Altere** `public/index.html` adicionando a diretiva `ng-app` com o valor `minhaApp` diretamente na tag HTML. Esta diretiva carrega o módulo principal da aplicação, aquele que é iniciado assim que carregamos nossa página pela primeira vez. 

```
<!doctype html>
<html ng-app="minhaApp">
<!-- código posterior omitido -->
```

## PASSO 4

Acesse o endereço `localhost:3000` em seu navegador. Continuamos com a mesma página, pois ainda não fizemos nada de excepcional em Angular, porém não deixe de verificar no console do navegador se existe alguma mensagem de erro (script não importado, erros de sintaxe) antes de continuar. 

Se nenhuma mensagem for exibida, parabéns, você criou e carregou seu primeiro módulo do Angular que nada faz! :) No próximos exercícios aprendemos como consumir nossa lista de participantes e construir uma lista dinâmica através do Angular.