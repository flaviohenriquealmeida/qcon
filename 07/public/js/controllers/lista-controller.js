angular
    .module('minhaApp')
    .controller('ListaController', function($scope, $resource) {
        $scope.palestrantes = []

        var recursoPalestrante = $resource('/palestrantes');

        recursoPalestrante.query(
            function(palestrantes) {
                $scope.palestrantes = palestrantes;
            }, 
            function(erro) {
                console.log(erro);
            }
        );        
        
    });