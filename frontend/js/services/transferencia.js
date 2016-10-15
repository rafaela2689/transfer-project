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
			}

		};

		return transferencia;
	});