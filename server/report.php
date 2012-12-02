<?php

require_once("dal.php");
require_once("json.php");

if (strcmp($_SERVER['REQUEST_METHOD'], 'GET') == 0)
{
	$q = $_GET["q"];
	
	$ret = NULL;
	if (strcmp($q, "admin") == 0)
	{
		DAL::connect();
		$report = DAL::get_admin_report();
		DAL::disconnect();
		
		if ($report != NULL)
			$ret = array ("res" => "TRUE", "data" => $report);
		else
			$ret = array ("res" => "FALSE");
	}
	else if (strcmp($q, "faculty") == 0)
	{
		DAL::connect();
		$report = DAL::get_faculty_report();
		DAL::disconnect();
		
		if ($report != NULL)
			$ret = array ("res" => "TRUE", "data" => $report);
		else
			$ret = array ("res" => "FALSE");
	}
	else if (strcmp($q, "student") == 0)
	{
		DAL::connect();
		$report = DAL::get_student_report();
		DAL::disconnect();
		
		if ($report != NULL)
			$ret = array ("res" => "TRUE", "data" => $report);
		else
			$ret = array ("res" => "FALSE");
	}
	
	echo (json_encode($ret));
}

?>