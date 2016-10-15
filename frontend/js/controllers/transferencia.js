'use strict';

/**
 * @ngdoc function
 * @name transferProjectNgApp.controller:Transferrencia
 * @description
 * # TransferCtrl
 * Controller of the transferProjectNgApp
 */
angular.module('transferApp')
  .controller('TransferenciaCtrl', function ($scope, $http) {

    $http.get('api/warehouses').success(function(data) {
      $scope.warehouses = data;
    });

    $scope.transfer = {
      originWarehouse : '',
      pallets : [],
      masters : [],
      imeis : []
    };
  });