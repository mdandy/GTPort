<?php

require_once("dal.php");
require_once("json.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
	$username = $_POST["username"];	
	$password = $_POST["password"];	
	
	$ret = "";
	if (isset($_POST["q"]))
	{
		if (strcmp($_POST["q"], "register") == 0)
			$ret = register($username, $password);
	}
	else
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

function register($username, $password)
{
	if (strlen($username) == 0 || strlen($password) == 0)
		return array("res" => "FALSE");
	
	DAL::connect();
	$success = DAL::create_account($username, $password);
	DAL::disconnect();
	
	if ($success)
		return array("res" => "TRUE");
	return array("res" => "FALSE");
}

?>