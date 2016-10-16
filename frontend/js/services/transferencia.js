'use strict';

/**
 * @ngdoc function
 * @name transferProjectNgApp.controller:Transferrencia
 * @description
 * # TransferCtrl
 * Controller of the transferProjectNgApp
 */
angular.module('transferApp')
	.factory('TransferenciaService', function($http, $q) {

		var transferencia = {

			getWarehouses: function() {

				var deferred = $q.defer();
				$http.get('api/warehouses').success(function(data) {
					deferred.resolve(data);
				}).error(function() {
					deferred.reject('something wrong');
				});

				return deferred.promise;
			},

			getPallets: function() {
				var deferred = $q.defer();
				$http.get('api/pallets').success(function(data) {
					deferred.resolve(data);
				}).error(function() {
					deferred.reject('something wrong');
				});

				return deferred.promise;
			},

			getMasters: function() {
				var deferred = $q.defer();
				$http.get('api/masters').success(function(data) {
					deferred.resolve(data);
				}).error(function() {
					deferred.reject('something wrong');
				});

				return deferred.promise;
			},

			getImeis: function() {
				var deferred = $q.defer();
				$http.get('api/imeis').success(function(data) {
					deferred.resolve(data);
				}).error(function() {
					deferred.reject('something wrong');
				});

				return deferred.promise;
			},

			getTransporters: function() {
				var deferred = $q.defer();
				$http.get('api/transporters').success(function(data) {
					deferred.resolve(data);
				}).error(function() {
					deferred.reject('something wrong');
				});

				return deferred.promise;
			},

			getWarehouseLimits : function () {
				var deferred = $q.defer();
				$http.get('api/warehouse-limits').success(function(data) {
					deferred.resolve(data);
				}).error(function() {
					deferred.reject('something wrong');
				});

				return deferred.promise;
			},

			doTransfer : function (dataTransfer, pallets, masters, imeis) {
				var deferred = $q.defer();
				var palletsInsert = [];
				var mastersInsert = [];
				var imeisInsert = [];
				$http.post('api/transfer', dataTransfer).success(function (data) {
					angular.forEach(pallets, function (p) {
						palletsInsert.push({
							pallet_id : p.id,
							transfer_id : data.id
						});
					});
					angular.forEach(palletsInsert, function(pallet) {
						$http.post('api/transfer-pallets', pallet);
					});
					angular.forEach(masters, function (m) {
						mastersInsert.push({
							master_id : m.id,
							transfer_id : data.id
						});
					});
					angular.forEach(mastersInsert, function(master) {
						$http.post('api/transfer-masters', master);
					});

					angular.forEach(imeis, function (i) {
						imeisInsert.push({
							imei_id : i.id,
							transfer_id : data.id
						});
					});
					angular.forEach(imeisInsert, function(imei) {
						$http.post('api/transfer-imeis', imei);
					});
				}).error(function () {
					
				});
			}

		};

		return transferencia;
	});