<?php

require_once("dal.php");
require_once("json.php");

if (strcmp($_SERVER['REQUEST_METHOD'], 'POST') == 0)
{
	$q = $_POST["q"];

	$ret = NULL;
	if (strcmp($q, "assign") == 0)
	{
		$username = $_POST["username"];
		$student_Id = $_POST["student_id"];
		
		DAL::connect();
		$success = DAL::assign_tutor($username, $student_Id);
		DAL::disconnect();
		
		if ($success)
			$ret = array("res" => "TRUE");
		else
			$ret = array("res" => "FALSE");
	}
	else if (strcmp($q, "log") == 0)
	{
		$username = $_POST["username"];
		$student_id = $_POST["student_id"];
		$course_code = $_POST["course_code"];
		
		DAL::connect();
		$success = DAL::create_tutor_logbook($username, $student_id, $course_code);
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
	$q = $_POST["q"];
	
	$ret = NULL;
	if (strcmp($q, "applicant") == 0)
	{
		$username = $_GET["username"];	
		
		DAL::connect();
		$applicant = DAL::get_tutor_applicants($username);
		DAL::disconnect();
		
		if ($applicant != NULL)
			$ret = array ("res" => "TRUE", "data" => $applicant);
		else
			$ret = array ("res" => "FALSE");
	}
	else if (strcmp($q, "tutor") == 0)
	{
		$username = $_GET["username"];	
		
		DAL::connect();
		$tutor = DAL::get_tutor_applicants($username);
		$code = DAL::get_tutor_course_code($username);
		DAL::disconnect();
		
		if ($tutor != NULL)
			$ret = array ("res" => "TRUE", "data" => $tutor, "code" => $code);
		else
			$ret = array ("res" => "FALSE");
	}
	else if (strcmp($q, "find_by_code") == 0)
	{
		$search_entry = $_GET["search_entry"];
		
		DAL::connect();
		$tutors = DAL::find_tutor_by_course_code($search_entry);
		DAL::disconnect();
		
		if ($tutors != NULL)
			$ret = array ("res" => "TRUE", "data" => $tutors);
		else
			$ret = array ("res" => "FALSE");
	}
	else if (strcmp($q, "find_by_keyword") == 0)
	{
		$search_entry = $_GET["search_entry"];
		
		DAL::connect();
		$tutors = DAL::find_tutor_by_keyword($search_entry);
		DAL::disconnect();
		
		if ($tutors != NULL)
			$ret = array ("res" => "TRUE", "data" => $tutors);
		else
			$ret = array ("res" => "FALSE");
	}
	
	echo (json_encode($ret));
}

?>