**IMPORTANTE**: em seu terminal de preferência, dentro deste diretório, baixe todas as dependências do projeto através do comando `npm install` antes de continuar.

# EXERCÍCIO - 2

Temos um servidor web que apenas compartilha arquivos estáticos, mas isso não é suficiente. Precisamos criar alguns endpoints REST que serão consumidos pelo cliente Angular que ainda faremos.


## PASSO 1

Vamos seguir a seguinte convenção: nossos endpoints ficarão todos dentro da pasta `app/api`, inclusive já temos o `app/api/palestrantes.js` que configura a rota `/palestrantes` que retorna uma lista de palestrantes.

Nosso problema é que o Express ainda não está ciente deste endpoint, alguém precisa carregá-lo. Uma maneira de fazermos isso é através do modulo `express-load`. Podemos indicar para este módulo a pasta `app/api` e todas as novas API's que forem adicionadas serão carregadas automaticamente sem qualquer outro tipo de configuração (você ainda precisará reiniciar o servidor).

**Edite** o arquivo `config/express.js` importando e configurando o `express-load`. Seu arquivo `config/express.js` deve ficar assim:

```
// 02/config/express.js

var express = require('express');

// importa o módulo express-load
var app = express()
    ,load = require('express-load');

app.use(express.static('public'));

// configura o express-load
load('api', {cwd: 'app'}).into(app);

module.exports = app;

```

A configuração `{cwd: 'app'}` indica a raíz na qual o `express-load` procurará os demais diretórios para carregamento de módulos.

## PASSO 2

Agora que você configurou o expres-load, já pode subir o servidor com `npm start` e acessar a URL `http://localhost:3000/participantes` que 
retornará um JSON com uma lista de participantes.

## PASSO 3

Estamos acessando um endpoint que foi registrado no Express, mas isso não vale, ele já estava criado! Vamos criar um novo endpoint!

Crie o arquivo **app/api/eventos.js**. Como estamos usando o `expres-load` ele carregará o arquivo quando o servidor for reiniciado, mas é claro, precisamos configurar o novo arquivo primeiro.

## PASSO 4

No início do arquivo `eventos.js`, crie uma lista de eventos. Usaremos dados estáticos por enquanto, mais tarde aprendemos a obter esses dados do MongoDB:

```
// 02/app/api/eventos.js

var eventos = [
    {"nome" : "Workshop MEAN"},
    {"nome" : "Workshop Angular"},
];
```

Agora que já temos nossa lista, precisamos criar um módulo do Node.js 
que configurará o endpoint `/eventos`. Ele deve retornar uma lista de eventos. 

Fazemos isso através de `app.route` da instância do Express recebida 
como parâmetro.

```
// 02/app/api/eventos.js

var eventos = [
    {"nome" : "Workshop MEAN"},
    {"nome" : "Workshop Angular"},
];

module.exports = function(app) {
    
    app.route('/eventos')
        .get(function(req, res) {
            res.json(eventos);
        });
};
```
 O objeto `app.route` possui uma função para cada verbo HTTP, em nosso caso, estamos interessados em lidar para requisições do tipo `GET` quando a URL `/eventos` for acessada, por isso usamos uma função de mesmo nome. Esta função recebe como parâmetro um callback que será executado quando a requisição for executada, retornando como resposta um JSON com os dados dos eventos. O próprio objeto que presenta o fluxo de resposta já possui o a função `json` que sabe lidar com essa estrutura de dados.

## PASSO 5

Depois de reiniciar o servidor, experimente acessar a URL `http://localhost:3000/eventos`. Os dados dos eventos devem ser exibidos em seu navegador.