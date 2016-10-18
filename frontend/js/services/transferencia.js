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
				}).error(function(e) {
					deferred.reject(e.error);
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
						p.status_id = 2;
						p.warehouse_destiny = dataTransfer.warehouse_target_id;
						$http.put('api/pallets/'+parseInt(p.id), p);
					});
					angular.forEach(palletsInsert, function(pallet) {
						$http.post('api/transfer-pallets', pallet);
					});
					angular.forEach(masters, function (m) {
						mastersInsert.push({
							master_id : m.id,
							transfer_id : data.id
						});
						m.status_id = 2;
						m.warehouse_destiny = dataTransfer.warehouse_target_id;
						$http.put('api/masters/'+parseInt(m.id), m);
					});
					angular.forEach(mastersInsert, function(master) {
						$http.post('api/transfer-masters', master);
					});

					angular.forEach(imeis, function (i) {
						imeisInsert.push({
							imei_id : i.id,
							transfer_id : data.id
						});
						i.status_id = 2;
						i.warehouse_destiny = dataTransfer.warehouse_target_id;
						$http.put('api/imeis/'+parseInt(i.id), i);
					});
					angular.forEach(imeisInsert, function(imei) {
						$http.post('api/transfer-imeis', imei);
					});
				}).error(function () {

				});
			},

			getTransfers : function() {
				var deferred = $q.defer();
				$http.get('api/transfers').success(function(data) {
					deferred.resolve(data);
				}).error(function(e) {
					deferred.reject({ 'error' : e.error });
				});
				return deferred.promise;
			},

			getTransferPallets : function() {
				var deferred = $q.defer();
				$http.get('api/transfer-pallets').success(function(data) {
					deferred.resolve(data);
				}).error(function(e) {
					deferred.reject({ 'error' : e.error });
				});
				return deferred.promise;
			},

			getTransferMasters : function() {
				var deferred = $q.defer();
				$http.get('api/transfer-masters').success(function(data) {
					deferred.resolve(data);
				}).error(function(e) {
					deferred.reject({ 'error' : e.error });
				});
				return deferred.promise;
			},
			getTransferImeis : function() {
				var deferred = $q.defer();
				$http.get('api/transfer-imeis').success(function(data) {
					deferred.resolve(data);
				}).error(function(e) {
					deferred.reject({ 'error' : e.error });
				});
				return deferred.promise;
			}

		};

		return transferencia;
	});