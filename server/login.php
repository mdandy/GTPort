<?php

require_once("dal.php");
require_once("json.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
	$username = $_POST["username"];	
	$password = $_POST["password"];	
	
	$ret = login ($username, $password);
	echo (json_encode($ret));
}

function login($username, $password)
{
	DAL::connect();
	$user = DAL::login($username, $password);
	DAL::disconnect();
	return $user;
}

?>