
describe("palestranteService", function() {
	var $httpBackend;

	beforeEach(function() {

		// precisa carregar o módulo
		module('minhaApp');
		
		inject(function($injector, _$httpBackend_){
		
			$httpBackend = _$httpBackend_;
			
			$httpBackend.when('GET', 'palestrantes/1')
                            .respond({_id: 1, nome: 'Flavio', palestra: 'MEAN'});
			$httpBackend.when('POST', 'palestrantes')
                            .respond({});
			$httpBackend.when('PUT', 'palestrantes/1')
                            .respond({});

		});
	});

	it("Deve incluir um palestrante", inject(function(servicoPalestrante) {

		var palestrante = {nome: 'Flávio', palestra: 'MEAN'};
		var alteracao = false;
		servicoPalestrante.cadastrar(palestrante).then(function(retorno) {
			alteracao = retorno.alteracao;	
		});
		
    	$httpBackend.flush();
		expect(alteracao).toBeFalsy();

	}));

	it("Deve alterar um palestrante", inject(function(servicoPalestrante) {
		
		var palestrante = {_id: 1, nome: 'Flávio', palestra: 'MEAN'};
		var alteracao = false;
		servicoPalestrante.cadastrar(palestrante).then(function(retorno) {
			alteracao = retorno.alteracao;	
		});

    	$httpBackend.flush();
    	expect(alteracao).toBeTruthy();

	}));

});