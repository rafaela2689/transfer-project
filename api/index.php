<?php

require "../vendor/autoload.php";
$app = new \Slim\Slim();
$app->response()->header('Content-Type', 'application/json;charset=utf-8');

$app->get('/warehouses', 'getWarehouses');
$app->get('/pallets', 'getPallets');
$app->get('/masters', 'getMasters');
$app->get('/imeis', 'getImeis');
$app->get('/transporters', 'getTransporters');
$app->get('/warehouse-limits', 'getWarehousesLimits');
$app->post('/transfer', 'doTransfer');
$app->post('/transfer-pallets', 'addTransferPallet');
$app->post('/transfer-masters', 'addTransferMaster');
$app->post('/transfer-imeis', 'addTransferImei');
$app->put('/pallets/:id', 'updatePallet');
$app->put('/masters/:id', 'updateMaster');
$app->put('/imeis/:id', 'updateImei');
$app->get('/transfers', 'getTransferencias');
$app->get('/transfer-pallets', 'getTransferPallets');
$app->get('/transfer-masters', 'getTransferMasters');
$app->get('/transfer-imeis', 'getTransferImeis');

$app->run();

function getWarehouses() {
	$sql = "select * from warehouse order by id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$warehouses = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($warehouses);
	} catch(PDOException $e) {
		echo json_encode(array("error" => $e->getMessage() ));
	}
}

function getPallets() {
	$sql = "select * from pallet order by id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$pallets = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($pallets);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getMasters() {
	$sql = "select * from master order by id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$masters = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($masters);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getImeis() {
	$sql = "select * from imei order by id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$imeis = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($imeis);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getTransporters() {
	$sql = "select * from transporter order by id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$transporters = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($transporters);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getWarehousesLimits() {
	$sql = "select * from warehouse_limits";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$warehouses_limit = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($warehouses_limit);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function doTransfer() {
	$request = \Slim\Slim::getInstance()->request();
	$transfer = json_decode($request->getBody());
	$sql = "INSERT INTO transfer (transporter_id, warehouse_origin_id, warehouse_target_id, qte_pallets, qte_master, qte_imei) VALUES (:transporter_id, :warehouse_origin_id, :warehouse_target_id, :qte_pallets, :qte_master, :qte_imei)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("transporter_id", $transfer->transporter_id);
		$stmt->bindParam("warehouse_origin_id", $transfer->warehouse_origin_id);
		$stmt->bindParam("warehouse_target_id", $transfer->warehouse_target_id);
		$stmt->bindParam("qte_pallets", $transfer->qte_pallets);
		$stmt->bindParam("qte_master", $transfer->qte_master);
		$stmt->bindParam("qte_imei", $transfer->qte_imei);
		$stmt->execute();
		$transfer->id = $db->lastInsertId();
		$db = null;
		echo json_encode(array("id" => $transfer->id));
		// echo json_encode($transfer); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addTransferPallet() {
	$request = \Slim\Slim::getInstance()->request();
	$transferPallet = json_decode($request->getBody());
	$sql = "INSERT INTO transfer_pallet (pallet_id, transfer_id) VALUES (:pallet_id, :transfer_id)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("pallet_id", $transferPallet->pallet_id);
		$stmt->bindParam("transfer_id", $transferPallet->transfer_id);
		$stmt->execute();
		$transferPallet->id = $db->lastInsertId();
		$db = null;
		echo json_encode(array( "id" => $transferPallet->id));
		// echo json_encode($transfer); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addTransferMaster() {
	$request = \Slim\Slim::getInstance()->request();
	$transferMaster = json_decode($request->getBody());
	$sql = "INSERT INTO transfer_master (master_id, transfer_id) VALUES (:master_id, :transfer_id)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("master_id", $transferMaster->master_id);
		$stmt->bindParam("transfer_id", $transferMaster->transfer_id);
		$stmt->execute();
		$transferMaster->id = $db->lastInsertId();
		$db = null;
		echo json_encode(array( "id" => $transferMaster->id));
		// echo json_encode($transfer); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addTransferImei() {
	$request = \Slim\Slim::getInstance()->request();
	$transferImei = json_decode($request->getBody());
	$sql = "INSERT INTO transfer_imei (imei_id, transfer_id) VALUES (:imei_id, :transfer_id)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("imei_id", $transferImei->imei_id);
		$stmt->bindParam("transfer_id", $transferImei->transfer_id);
		$stmt->execute();
		$transferImei->id = $db->lastInsertId();
		$db = null;
		echo json_encode(array( "id" => $transferImei->id));
		// echo json_encode($transfer); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updatePallet($id) {
	$request = \Slim\Slim::getInstance()->request();
	$pallet = json_decode($request->getBody());
	$sql = "UPDATE pallet SET status_id=:status_id, warehouse_destiny=:warehouse_destiny WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("status_id", $pallet->status_id);
		$stmt->bindParam("warehouse_destiny", $pallet->warehouse_destiny);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode(array("message" => "updated succesfully")); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateMaster($id) {
	$request = \Slim\Slim::getInstance()->request();
	$master = json_decode($request->getBody());
	$sql = "UPDATE master SET status_id=:status_id, warehouse_destiny=:warehouse_destiny WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("status_id", $master->status_id);
		$stmt->bindParam("warehouse_destiny", $master->warehouse_destiny);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode(array("message" => "updated succesfully")); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateImei($id) {
	$request = \Slim\Slim::getInstance()->request();
	$imei = json_decode($request->getBody());
	$sql = "UPDATE imei SET status_id=:status_id, warehouse_destiny=:warehouse_destiny WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("status_id", $imei->status_id);
		$stmt->bindParam("warehouse_destiny", $imei->warehouse_destiny);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode(array("message" => "updated succesfully")); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getTransferencias() {
	$sql = "SELECT  t.id, t.transporter_id, tr.label as t_label, t.warehouse_origin_id, wo.label as worigin_label, t.warehouse_target_id, wt.label as wtarget_label
		from transfer as t
		INNER JOIN warehouse wo ON wo.id = t.warehouse_origin_id
        INNER JOIN warehouse wt ON wt.id = t.warehouse_target_id
		INNER JOIN transporter tr ON tr.id = t.transporter_id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$transfers = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($transfers);
	} catch(PDOException $e) {
		echo json_encode(array("error" => $e->getMessage()));
	}
}

function getTransferPallets() {
	$sql = "SELECT  tp.id, tp.transfer_id, tp.pallet_id, p.code
		from transfer_pallet as tp
		INNER JOIN pallet p ON p.id = tp.pallet_id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$transferPallets = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($transferPallets);
	} catch(PDOException $e) {
		echo json_encode(array("error" => $e->getMessage()));
	}
}

function getTransferMasters() {
	$sql = "SELECT  tm.id, tm.transfer_id, tm.master_id, m.code
		from transfer_master as tm
		INNER JOIN master m ON m.id = tm.pallet_id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$transferMasters = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($transferMasters);
	} catch(PDOException $e) {
		echo json_encode(array("error" => $e->getMessage()));
	}
}

function getTransferImeis() {
	$sql = "SELECT  ti.id, ti.transfer_id, ti.imei_id, i.code
		from transfer_imei as ti
		INNER JOIN imei i ON i.id = ti.imei_id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$transferImeis = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($transferImeis);
	} catch(PDOException $e) {
		echo json_encode(array("error" => $e->getMessage()));
	}
}

function getConnection() {
	$url = parse_url(getenv("CLEARDB_DATABASE_URL"));
	$dbhost=$url["host"];
	$dbuser=$url["user"];
	$dbpass=$url["pass"];
	$dbname=substr($url["path"], 1);
	$dbh = new PDO('mysql:host='.$dbhost.';dbname='.$dbname, $dbuser, $dbpass,
		array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>