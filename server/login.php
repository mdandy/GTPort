<?php

require_once("dal.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
	$username = $_POST["username"];	
	$password = $_POST["password"];	
	echo (login ($username, $password));
}

function login($username, $password)
{
	DAL::connect();
	$success = DAL::login($username, $password);
	DAL::disconnect();
	
	if ($success)
		return "TRUE";
	else
		return "FALSE";
}

?>