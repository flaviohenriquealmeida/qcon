angular
    .module('minhaApp')
    .controller('ListaController', function($scope, recursoPalestrante) {

        $scope.palestrantes = []

        recursoPalestrante.query(
            function(palestrantes) {
                $scope.palestrantes = palestrantes;
            }, 
            function(erro) {
                console.log(erro);
            }
        );  

        $scope.remover = function(palestrante) {
            recursoPalestrante.delete({id: palestrante._id}, function() {
                var index = $scope.palestrantes.indexOf(palestrante);
                $scope.palestrantes.splice(index,1);
            }, function(erro) {
                console.log('não foi possível remover')
            }); 
        };        
    });