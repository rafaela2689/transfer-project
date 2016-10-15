'use strict';

/**
 * @ngdoc function
 * @name transferProjectNgApp.controller:Transferrencia
 * @description
 * # TransferCtrl
 * Controller of the transferProjectNgApp
 */
angular.module('transferApp')
	.controller('TransferenciaCtrl', function($scope, TransferenciaService) {

		var getWarehouses = function() {
			var promise = TransferenciaService.getWarehouses();
			promise.then(function(data) {
				$scope.warehouses = data;
			}, function(reason) {
				console.log('Error: ' + reason);
			});
		};

		var getPallets = function() {
			var promise = TransferenciaService.getPallets();
			promise.then(function(data) {
				$scope.pallets = data;
			}, function(reason) {
				console.log('Error: ' + reason);
			});
		};

		var getMasters = function () {
			var promise = TransferenciaService.getMasters();
			promise.then(function(data) {
				$scope.masters = data;
			}, function(reason) {
				console.log('Error: ' + reason);
			});
		};

		var getImeis = function () {
			var promise = TransferenciaService.getImeis();
			promise.then(function(data) {
				$scope.imeis = data;
			}, function(reason) {
				console.log('Error: ' + reason);
			});
		};

		var getTransporters = function () {
			var promise = TransferenciaService.getTransporters();
			promise.then(function(data) {
				$scope.transporters = data;
			}, function(reason) {
				console.log('Error: ' + reason);
			});
		};

		$scope.transfer = {
			originWarehouse: '',
			pallets: [],
			masters: [],
			imeis: []
		};

		$scope.init = function() {
			getWarehouses();
			getPallets();
			getMasters();
			getImeis();
			getTransporters();
		};

		$scope.init();
	});