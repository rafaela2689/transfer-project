<?php

require 'vendor/autoload.php';
$app = new \Slim\Slim();
$app->response()->header('Content-Type', 'application/json;charset=utf-8');

$app->get('/warehouses', 'getWarehouses');
$app->get('/pallets', 'getPallets');
$app->get('/masters', 'getMasters');
$app->get('/imeis', 'getImeis');
$app->get('/transporters', 'getTransporters');
$app->get('/warehouse-limits/:originId/:targetId', 'getWarehousesLimits');

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

function getWarehousesLimits($originId, $targetId) {
	$sql = "select * from warehouse_limits where warehouse_origin_id=".$originId." and warehouse_target_id=".$targetId;
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