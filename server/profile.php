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
		$name = $_POST["name"];
		$email = $_POST["email"];
		$DOB = $_POST["dob"];
		$address = $_POST["address"];
		$permanentAddr = $_POST["permanent_address"];
		$gender = $_POST["gender"];
		$contactNumber = $_POST["contactNumber"];
		$major = $_POST["major"];
		$degree = $_POST["degree"];
		
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
		$codes = explode("::", $codes_raw);

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
		$name_school = $_POST["name_school"];
		$year_grad = $_POST["year_grad"];
		$major = $_POST["major"];
		$degree = $_POST["degree"];
		$gpa = $_POST["gpa"];
		
		DAL::connect();
		$success = DAL::upsert_student_previous_education($username, $name_school, $year_grad, 
														  $major, $degree, $gpa);
		DAL::disconnect();

		if ($success)
			$ret = array ("res" => "TRUE");
		else
			$ret = array ("res" => "FALSE");
	}
	if (strcmp($q, "faculty_info") == 0)
	{
		$name = $_POST["name"];
		$email = $_POST["email"];
		$DOB = $_POST["dob"];
		$address = $_POST["address"];
		$permanentAddr = $_POST["permanent_address"];
		$gender = $_POST["gender"];
		$contactNumber = $_POST["contactNumber"];
		$position = $_POST["position"];
		$research_interests_raw = $_POST["research_interests"];
		$research_interests = explode("::", $research_interests_raw);
		$dept_id = $_POST["dept_id"];
		$CRN = $_POST["crn"];
		
		DAL::connect();
		$success = DAL::upsert_faculty_information($username, $name, $email, $DOB, $address,
												   $permanentAddr, $gender, $contactNumber,
												   $position, $research_interests);
		$success &= DAL::upsert_faculty_department($username, $dept_id);
		$success &= DAL::upsert_faculty_teaching($username, $CRN);
		DAL::disconnect();
		
		if ($success)
			$ret = array ("res" => "TRUE");
		else
			$ret = array ("res" => "FALSE");
	}
	
	echo (json_encode($ret));
}
else if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
	$q = $_GET["q"];
	
	$ret = NULL;
	if (strcmp($q, "student") == 0)
	{
		$username = $_GET["username"];	
		
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
	else if(strcmp($q, "faculty") == 0)
	{
		$username = $_GET["username"];	
		
		DAL::connect();
		$info = DAL::get_faculty_information($username);
		$department = DAL::get_department();
		DAL::disconnect();
		
		if ($info != NULL)
			$ret = array ("res" => "TRUE", "info" => $info[0], "department" => $department);
		else
			$ret = array ("res" => "FALSE");
	}
	else if(strcmp($q, "course") == 0)
	{
		$dept_Id = $_GET["dept_id"];	
		
		DAL::connect();
		$info = DAL::get_course_code($dept_Id);
		DAL::disconnect();
		
		if ($info != NULL)
			$ret = array ("res" => "TRUE", "info" => $info[0], "department" => $department);
		else
			$ret = array ("res" => "FALSE");
	}
	else if(strcmp($q, "section") == 0)
	{
		$course_title = $_GET["course_title"];	
		
		DAL::connect();
		$info = DAL::get_section($course_title);
		DAL::disconnect();
		
		if ($info != NULL)
			$ret = array ("res" => "TRUE", "info" => $info[0], "department" => $department);
		else
			$ret = array ("res" => "FALSE");
	}
	
	echo (json_encode($ret));
}

?>