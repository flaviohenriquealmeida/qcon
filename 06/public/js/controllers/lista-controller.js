angular
    .module('minhaApp')
    .controller('ListaController', function($scope, $resource) {
        $scope.palestrantes = []

        var recurso = $resource('/palestrantes');

        recurso.query(
            function(palestrantes) {
                $scope.palestrantes = palestrantes;
            }, 
            function(erro) {
                console.log(erro);
            }
        );        
        
    });