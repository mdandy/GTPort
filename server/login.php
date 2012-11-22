<?php

require_once("dal.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
	$username = $_POST["username"];	
	$password = $_POST["password"];	
	
	$ret = login ($username, $password);
	echo ($ret);
}

function login($username, $password)
{
	DAL::connect();
	$user = DAL::login($username, $password);
	DAL::disconnect();
	return $user[0]["Username"];
}

?>