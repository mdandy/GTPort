<?php

require_once("dal.php");
require_once("json.php");

if (strcmp($_SERVER['REQUEST_METHOD'], 'POST') == 0)
{
	$q = $_POST["q"];
	$username = $_POST["username"];
	
	$ret = NULL;
	if (strcmp($q, "student_info") == 0)
	{
		$name = $_POST["name"];
		$email = $_POST["email"];
		$DOB = $_POST["dob"];
		$address = $_POST["address"];
		$permanentAddr = $_POST["permanent_address"];
		$gender = $_POST["gender"];
		$contactNumber = $_POST["contact_number"];
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
		$codes_raw = $_POST["code"];
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
		$contactNumber = $_POST["contact_number"];
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

else if (strcmp($_SERVER['REQUEST_METHOD'], 'GET') == 0)
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
	else if (strcmp($q, "tutor_application") == 0)
	{
		$username = $_GET["username"];	
		
		DAL::connect();
		$tutor_application = DAL::get_student_tutor_application($username);
		DAL::disconnect();
		
		if ($tutor_application != NULL)
			$ret = array ("res" => "TRUE", "data" => $tutor_application);
		else
			$ret = array ("res" => "FALSE");
	}
	else if (strcmp($q, "student_name") == 0)
	{
		$student_id = $_GET["student_id"];	
		
		DAL::connect();
		$name = DAL::get_tutor_student_name($student_id);
		DAL::disconnect();
		
		if ($name != NULL)
			$ret = array ("res" => "TRUE", "data" => $name);
		else
			$ret = array ("res" => "FALSE");
	}
	else if(strcmp($q, "department") == 0)
	{
		$username = $_GET["username"];	
		
		DAL::connect();
		$info = DAL::get_student_information($username);
		DAL::disconnect();
		
		if ($info != NULL)
			$ret = array ("res" => "TRUE", "data" => $info[0]["Major"]);
		else
			$ret = array ("res" => "FALSE");
	}
	else if(strcmp($q, "faculty") == 0)
	{
		$username = $_GET["username"];	
		
		DAL::connect();
		$info = DAL::get_faculty_information($username);
		
		$dept_id = $info[0]["Dept_Id"];
		$course_title = $info[0]["Title"];
		
		$course = DAL::get_course_code($dept_id);
		$section = DAL::get_section($course_title, $dept_id);
		//$department = DAL::get_department();
		DAL::disconnect();
		
		if ($info != NULL)
			$ret = array ("res" => "TRUE", "info" => $info, "course" => $course, "section" => $section);
		else
			$ret = array ("res" => "FALSE");
	}
	else if(strcmp($q, "course") == 0)
	{
		$dept_Id = $_GET["dept_id"];	
		
		DAL::connect();
		$courses = DAL::get_course_code($dept_Id);
		DAL::disconnect();
		
		if ($courses != NULL)
			$ret = array ("res" => "TRUE", "data" => $courses);
		else
			$ret = array ("res" => "FALSE");
	}
	else if(strcmp($q, "section") == 0)
	{
		$course_title = $_GET["course_title"];	
		$dept_id = $_GET["dept_id"];
		
		DAL::connect();
		$sections = DAL::get_section($course_title, $dept_id);
		DAL::disconnect();
		
		if ($sections != NULL)
			$ret = array ("res" => "TRUE", "data" => $sections);
		else
			$ret = array ("res" => "FALSE");
	}
	
	echo (json_encode($ret));
}

?>