<?php

require_once("dal.php");
require_once("json.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
	$q = $_POST["q"];
	$username = $_POST["username"];	
	
	$ret = NULL;
	if (strcmp($q, "student") == 0)
	{
		DAL::connect();
		$info = DAL::get_student_information($username);
		$tutor_application = DAL::get_student_tutor_application($username);
		$prev_education = DAL::get_student_previous_education($username);
		DAL::disconnect();
		
		if ($info != NULL)
			$ret = array ("res" => "TRUE", "info" => $info, "tutor_application" => $tutor_application, "prev_education" => $prev_education);
		else
			$ret = array ("res" => "FALSE");
	}
	else  if(strcmp($q, "faculty") == 0)
	{
		DAL::connect();
		$info = DAL::get_faculty_information($username);
		$department = DAL::get_department();
		DAL::disconnect();
		
		if ($info != NULL)
			$ret = array ("res" => "TRUE", "info" => $info, "department" => $department);
		else
			$ret = array ("res" => "FALSE");
	}
	
	echo (json_encode($ret));
}

function get_student_profile($username)
{
	
}

?>