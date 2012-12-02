<?php

require_once("dal.php");
require_once("json.php");

if (strcmp($_SERVER['REQUEST_METHOD'], 'POST') == 0)
{
	$q = $_POST["q"];
	$username = $_POST["username"];	
	$password = $_POST["password"];	
	
	$ret = NULL;
	if (strcmp($q, "login") == 0)
	{
		DAL::connect();
		$user = DAL::login($username, $password);
		DAL::disconnect();
		
		if ($user != NULL)
			$ret = array ("res" => "TRUE", "data" => $user[0]);
		else
			$ret = array ("res" => "FALSE");
	}
	else if (strcmp($_POST["q"], "register") == 0)
	{
		if (strlen($username) == 0 || strlen($password) == 0)
		return array("res" => "FALSE");
	
		DAL::connect();
		$success = DAL::create_account($username, $password);
		DAL::disconnect();
		
		if ($success)
			$ret = array("res" => "TRUE");
		else
			$ret = array("res" => "FALSE");
	}
	
	echo (json_encode($ret));
}

else if (strcmp($_SERVER['REQUEST_METHOD'], 'GET') == 0)
{
	$username = $_GET["username"];	
	
	DAL::connect();
	$type = DAL::get_account_type($username);
	DAL::disconnect();
	
	$ret = NULL;
	if ($type != NULL)
		$ret = array ("res" => "TRUE", "data" => $type);
	else
		$ret = array ("res" => "FALSE");
	
	echo (json_encode($ret));
}

?>