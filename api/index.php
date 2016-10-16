<?php

require 'vendor/autoload.php';
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
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
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

function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="root";
	$dbpass="";
	$dbname="warehouse_transfer";
	$dbh = new PDO("mysql:host=localhost;dbname=warehouse_transfer", "root", "root",
		array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>