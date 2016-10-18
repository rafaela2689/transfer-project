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

		var createModel = function () {
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
				pallet : {
					id: '',
					code: '',
					status_id: ''
				},
				master : {
					id: '',
					code: '',
					status_id: ''
				},
				pallets : [],
				masters : [],
				imeis : []
			};
		};

		$scope.addPallet = function () {
			$scope.palletExists = false;
			var found = false;

			angular.forEach($scope.transfer.pallets, function (p) {
				if (p.code === $scope.transfer.pallet.code) {
					$scope.transfer.pallet.id = p.id;
					$scope.palletExists = true;
				}
			});

			if (!$scope.palletExists) {
				angular.forEach($scope.pallets, function (p) {
	    		if (p.code === $scope.transfer.pallet.code && p.status_id == 1) {
	    			$scope.transfer.pallet.id = p.id;
	    			$scope.transfer.pallets.push(p);
	    			found = true;
	    		}
	    	});
			}

    	if (found) {
    		var masters = $filter('filter')($scope.masters, { pallet_id : $scope.transfer.pallet.id , status_id : 1 }, true);
    		$scope.transfer.masters = masters;
    		angular.forEach($scope.transfer.masters, function (m) {
    			var imeis = $filter('filter')($scope.imeis, { master_id : m.id , status_id : 1 }, true);
    			$scope.transfer.imeis = imeis;
    		});
    		$scope.isPalletValid = true;
    		$scope.transfer.pallet = {
    			id: '',
					code: '',
					status_id: ''
				};
    	} else {
    		$scope.isPalletValid = false;
    	}

    	if ($scope.palletExists) {
    		$scope.isPalletValid = true;
    	}
		};

		$scope.addMaster = function () {
			$scope.masterExists = false;
			var found = false;

			angular.forEach($scope.transfer.masters, function (p) {
				if (p.code === $scope.transfer.master.code) {
					$scope.transfer.master.id = p.id;
					$scope.masterExists = true;
				}
			});

			if (!$scope.masterExists) {
				angular.forEach($scope.masters, function (p) {
	    		if (p.code === $scope.transfer.master.code && p.status_id == 1) {
	    			$scope.transfer.master.id = p.id;
	    			$scope.transfer.masters.push(p);
	    			found = true;
	    		}
	    	});
			}

    	if (found) {
    		var imeis = $filter('filter')($scope.imeis, { master_id : $scope.transfer.master.id , status_id : 1 }, true);
    		$scope.transfer.imeis = imeis;
    		$scope.isMasterValid = true;
    		$scope.transfer.master = {
    			id: '',
					code: '',
					status_id: ''
				};
    	} else {
    		$scope.isMasterValid = false;
    	}

    	if ($scope.masterExists) {
    		$scope.isMasterValid = true;	
    	}
		};

		$scope.addImei = function () {
			$scope.imeiExists = false;
			var found = false;

			angular.forEach($scope.transfer.imeis, function (p) {
				if (p.code === $scope.transfer.imei.code) {
					$scope.transfer.imei.id = p.id;
					$scope.imeiExists = true;
				}
			});

			if (!$scope.imeiExists) {
				angular.forEach($scope.imeis, function (p) {
	    		if (p.code === $scope.transfer.imei && p.status_id == 1) {
	    			$scope.transfer.imei.id = p.id;
	    			$scope.transfer.imeis.push(p);
	    			found = true;
	    		}
	    	});
			}

    	if (found) {
    		$scope.isImeiValid = true;
    		$scope.transfer.imei = {
    			id: '',
					code: '',
					status_id: ''
				};
    	} else {
    		$scope.isImeiValid = false;
    	}

    	if ($scope.imeiExists) {
    		$scope.isImeiValid = true;	
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
    	var limit = $filter('filter')($scope.warehouseLimits, { warehouse_origin_id : $scope.transfer.originWarehouse.id, warehouse_target_id : $scope.transfer.destinyWarehouse.id }, true);
    	$scope.warehouseLimit = limit[0];
    };

    $scope.transferir = function () {
    	if (!$scope.transfer.originWarehouse.label || !$scope.transfer.destinyWarehouse.label || !$scope.transfer.transporter.label) {
    		return;
    	}

    	$scope.submitted = true;

    	var transferData = {
    		transporter_id : $scope.transfer.transporter.id,
    		warehouse_origin_id : $scope.transfer.originWarehouse.id,
    		warehouse_target_id : $scope.transfer.destinyWarehouse.id,
    		qte_pallets : $scope.transfer.pallets.length,
    		qte_master : $scope.transfer.masters.length,
    		qte_imei : $scope.transfer.imeis.length
    	};

    	TransferenciaService.doTransfer(transferData, $scope.transfer.pallets, $scope.transfer.masters, $scope.transfer.imeis);
    	createModel();
    };

    $scope.removePallet = function ($index) {
    	$scope.transfer.pallets.splice($index, 1);
    };

    $scope.removeMaster = function ($index) {
    	$scope.transfer.masters.splice($index, 1);
    };

    $scope.removeImei = function ($index) {
    	$scope.transfer.imeis.splice($index, 1);
    };

    $scope.getWarehousesTarget = function () {
    	var warehousesTargets = [];
    	angular.forEach($scope.warehouses, function(w) {
    		if (w.id !== $scope.transfer.originWarehouse.id) {
    			warehousesTargets.push(w);
    		}
    	});

    	return warehousesTargets;
    };

    $scope.getWarehousesOrigin = function () {
    	var warehousesOrigin = [];
    	angular.forEach($scope.warehouses, function(w) {
    		if (w.id !== $scope.transfer.destinyWarehouse.id) {
    			warehousesOrigin.push(w);
    		}
    	});

    	return warehousesOrigin;
    };

    $scope.selectPallets = function () {
    	for (var i = 0; i < $scope.pallets.length; i++) {
    		if ($scope.pallets[i].checked) {
    			$scope.transfer.pallets.push($scope.pallets[i]);
    			$scope.pallets.splice(i, 1);
    		}
    	};
    };

    $scope.unselectPallets = function () {
    	for (var i = 0; i < $scope.transfer.pallets.length; i++) {
    		if ($scope.transfer.pallets[i].checked) {
    			$scope.pallets.push($scope.transfer.pallets[i]);
    			$scope.transfer.pallets.splice(i, 1);
    		}
    	};
    };

	$scope.init = function() {
		createModel();
		getWarehouses();
		getPallets();
		getMasters();
		getImeis();
		getTransporters();
		getWarehouseLimits();
	};

	$scope.init();
});