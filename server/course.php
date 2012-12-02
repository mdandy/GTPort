<?php

require_once("dal.php");
require_once("json.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	$username = $_POST["username"];	
	$crn = $_POST["crn"];	
	$gradeMode = $_POST["grade_mode"];	
	
	$ret = NULL;
	DAL::connect();
	$success = register_course($username, $crn, $gradeMode);
	DAL::disconnect();
	
	if ($success)
		$ret = array("res" => "TRUE");
	else
		$ret = array("res" => "FALSE");
		
	echo (json_encode($ret));
}
else if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
	$deptId = $_GET["dept_id"];	
	$term = $_GET["term"];	
	
	DAL::connect();
	$courses = DAL::get_course_selection($deptId, $term);
	DAL::disconnect();
	
	$ret = NULL;
	if ($courses != NULL)
		$ret = array ("res" => "TRUE", "data" => $courses);
	else
		$ret = array ("res" => "FALSE");
	
	echo (json_encode($ret));
}

?>