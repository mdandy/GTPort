<?php

require_once("dal.php");
require_once("json.php");

if (strcmp($_SERVER['REQUEST_METHOD'], 'POST') == 0)
{
	$username = $_POST["username"];	
	$crn_raw = $_POST["crn"];
	$crn = explode("::", $crn_raw);
	$gradeMode_raw = $_POST["grade_mode"];
	$gradeMode = explode("::", $gradeMode_raw);
	
	$ret = NULL;
	DAL::connect();
	$success = DAL::register_course($username, $crn, $gradeMode);
	DAL::disconnect();
	
	if ($success)
		$ret = array("res" => "TRUE");
	else
		$ret = array("res" => "FALSE");
		
	echo (json_encode($ret));
}

else if (strcmp($_SERVER['REQUEST_METHOD'], 'GET') == 0)
{
	$q = $_GET["q"];
	
	$ret = NULL;
	if (strcmp($q, "course") == 0)
	{
		$deptId = $_GET["dept_id"];	
		$term = $_GET["term"];	
		
		DAL::connect();
		$courses = DAL::get_course_selection($deptId, $term);
		DAL::disconnect();
		
		if ($courses != NULL)
			$ret = array ("res" => "TRUE", "data" => $courses);
		else
			$ret = array ("res" => "FALSE");
	}
	else if (strcmp($q, "registration") == 0)
	{
		$CRNs_raw = $_GET["crn"];
		$CRNs = explode("::", $CRNs_raw);	
		
		DAL::connect();
		$courses = DAL::get_registration_complete_view($CRNs);
		DAL::disconnect();
		
		if ($courses != NULL)
			$ret = array ("res" => "TRUE", "data" => $courses);
		else
			$ret = array ("res" => "FALSE");
	}
	
	echo (json_encode($ret));
}

?>