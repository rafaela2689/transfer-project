'use strict';

/**
 * @ngdoc function
 * @name transferProjectNgApp.controller:Transferrencia
 * @description
 * # TransferCtrl
 * Controller of the transferProjectNgApp
 */
angular.module('transferApp')
	.controller('ConsultaTransferCtrl', function($scope, $filter, TransferenciaService) {

		var getTransfers = function() {
			var promise = TransferenciaService.getTransfers();
			promise.then(function(data) {
				$scope.transfers = data;
			}, function(reason) {
				console.log('Error: ' + reason.error);
			});
		};

		var getTransferPallets = function() {
			var promise = TransferenciaService.getTransferPallets();
			promise.then(function(data) {
				$scope.transferPallets = data;
			}, function(reason) {
				console.log('Error: ' + reason.error);
			});
		};

		var getTransferMasters = function() {
			var promise = TransferenciaService.getTransferMasters();
			promise.then(function(data) {
				$scope.transferMasters = data;
			}, function(reason) {
				console.log('Error: ' + reason.error);
			});
		};

		var getTransferImeis = function() {
			var promise = TransferenciaService.getTransferImeis();
			promise.then(function(data) {
				$scope.transferImeis = data;
			}, function(reason) {
				console.log('Error: ' + reason.error);
			});
		};

		$scope.init = function() {
			getTransfers();
			getTransferPallets();
			getTransferMasters();
			getTransferImeis();
		};

		$scope.init();
	});