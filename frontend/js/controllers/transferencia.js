'use strict';

/**
 * @ngdoc function
 * @name transferProjectNgApp.controller:Transferrencia
 * @description
 * # TransferCtrl
 * Controller of the transferProjectNgApp
 */
angular.module('transferApp')
	.controller('TransferenciaCtrl', function($scope, $filter, TransferenciaService) {
		$scope.isPalletValid = true;
		$scope.isMasterValid = true;
		$scope.isImeiValid = true;

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

		var getWarehouseLimits = function () {
			var promise = TransferenciaService.getWarehouseLimits();
			promise.then(function(data) {
				$scope.warehouseLimits = data;
			}, function(reason) {
				console.log('Error: ' + reason);
			});
		};

		$scope.transfer = {
			originWarehouse : {
				id: '',
				label: ''
			},
			destinyWarehouse : {
				id: '',
				label: ''
			},
			transporter : {
				id: '',
				label: ''
			},
			pallets : [],
			masters : [],
			imeis : []
		};

		$scope.addPallet = function () {
			$scope.palletExists = false;
			var found = false;

			angular.forEach($scope.transfer.pallets, function (p) {
				if (p.code === $scope.transfer.pallet) {
					$scope.palletExists = true;
				}
			});

			if (!$scope.palletExists) {
				angular.forEach($scope.pallets, function (p) {
	    		if (p.code === $scope.transfer.pallet && p.status_id == 1) {
	    			$scope.transfer.pallets.push(p);
	    			found = true;
	    		}
	    	});
			}

    	if (found || $scope.palletExists) {
    		$scope.isPalletValid = true;
    	} else {
    		$scope.isPalletValid = false;
    	}
		};

		$scope.addMaster = function () {
			$scope.masterExists = false;
			var found = false;

			angular.forEach($scope.transfer.masters, function (p) {
				if (p.code === $scope.transfer.master) {
					$scope.masterExists = true;
				}
			});

			if (!$scope.masterExists) {
				angular.forEach($scope.masters, function (p) {
	    		if (p.code === $scope.transfer.master && p.status_id == 1) {
	    			$scope.transfer.masters.push(p);
	    			found = true;
	    		}
	    	});
			}

    	if (found || $scope.masterExists) {
    		$scope.isMasterValid = true;
    	} else {
    		$scope.isMasterValid = false;
    	}
		};

		$scope.addImei = function () {
			$scope.imeiExists = false;
			var found = false;

			angular.forEach($scope.transfer.imeis, function (p) {
				if (p.code === $scope.transfer.imei) {
					$scope.imeiExists = true;
				}
			});

			if (!$scope.imeiExists) {
				angular.forEach($scope.imeis, function (p) {
	    		if (p.code === $scope.transfer.imei && p.status_id == 1) {
	    			$scope.transfer.imeis.push(p);
	    			found = true;
	    		}
	    	});
			}

    	if (found || $scope.imeiExists) {
    		$scope.isImeiValid = true;
    	} else {
    		$scope.isImeiValid = false;
    	}
		};

		$scope.showHidePallets = function () {
    	if (!$scope.showPallets) {
    		$scope.showPallets = true;
    	} else {
    		$scope.showPallets = false;
    	}
    };

    $scope.setLimit = function () {
    	var limit = $filter('filter')($scope.warehouseLimits, {warehouse_origin_id : $scope.transfer.originWarehouse.id, warehouse_target_id : $scope.transfer.destinyWarehouse.id}, true);
    	$scope.warehouseLimit = limit[0];
    };

    $scope.transferir = function () {
    	var transferData = {
    		transporter_id : $scope.transfer.transporter.id,
    		warehouse_origin_id : $scope.transfer.originWarehouse.id,
    		warehouse_target_id : $scope.transfer.destinyWarehouse.id,
    		qte_pallets : $scope.transfer.pallets.length,
    		qte_master : $scope.transfer.masters.length,
    		qte_imei : $scope.transfer.imeis.length
    	};

    	TransferenciaService.doTransfer(transferData, $scope.transfer.pallets, $scope.transfer.masters, $scope.transfer.imeis);
    };

		$scope.init = function() {
			getWarehouses();
			getPallets();
			getMasters();
			getImeis();
			getTransporters();
			getWarehouseLimits();
		};

		$scope.init();
	});