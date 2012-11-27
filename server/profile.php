<?php

require_once("dal.php");
require_once("json.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	$q = $_GET["q"];
	$username = $_GET["username"];
	
	$ret = NULL;
	if (strcmp($q, "student_info") == 0)
	{
		$name = $_GET["name"];
		$email = $_GET["email"];
		$DOB = $_GET["dob"];
		$address = $_GET["address"];
		$permanentAddr = $_GET["permanent_address"];
		$gender = $_GET["gender"];
		$contactNumber = $_GET["contactNumber"];
		$major = $_GET["major"];
		$degree = $_GET["degree"];
		
		DAL::connect();
		$success = DAL::upsert_student_information($username, $name, $email, $DOB, $address,
												   $permanentAddr, $gender, $contactNumber,
												   $major, $degree);
		DAL::disconnect();
		
		if ($success)
			$ret = array ("res" => "TRUE");
		else
			$ret = array ("res" => "FALSE");
	}
	else if (strcmp($q, "student_tutor_application") == 0)
	{
		$codes_raw = $_GET["code"];

		DAL::connect();
		$success = DAL::insert_student_tutor_application($username, $codes);
		DAL::disconnect();
		
		if ($success)
			$ret = array ("res" => "TRUE");
		else
			$ret = array ("res" => "FALSE");
	}
	else if (strcmp($q, "student_prev_education") == 0)
	{
		
	}
	
	echo (json_encode($ret));
}
else if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
	$q = $_GET["q"];
	$username = $_GET["username"];	
	
	$ret = NULL;
	if (strcmp($q, "student") == 0)
	{
		DAL::connect();
		$info = DAL::get_student_information($username);
		$tutor_application = DAL::get_student_tutor_application($username);
		$prev_education = DAL::get_student_previous_education($username);
		DAL::disconnect();
		
		if ($info != NULL)
			$ret = array ("res" => "TRUE", "info" => $info[0], "tutor_application" => $tutor_application, "prev_education" => $prev_education);
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
			$ret = array ("res" => "TRUE", "info" => $info[0], "department" => $department);
		else
			$ret = array ("res" => "FALSE");
	}
	
	echo (json_encode($ret));
}

?>