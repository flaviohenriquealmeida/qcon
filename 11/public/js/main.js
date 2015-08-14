angular.module('minhaApp', ['ngRoute', 'meusServicos'])
	.config(function($routeProvider) {

		$routeProvider.when('/', {
			controller: 'ListaController',
			templateUrl: 'partials/lista.html'
		});

		$routeProvider.when('/cadastro', {
			controller: 'CadastroController',
			templateUrl: 'partials/cadastro.html'
		});

		$routeProvider.otherwise({redirectTo: '/'});
	});