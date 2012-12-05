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
		
		// Merge data
		$result = array();
		$more_than_three = $report["more_than_three"];
		$one_to_three = $report["one_to_three"];
		$zero = $report["zero"];
		
		for ($i = 0; $i < count($more_than_three); $i++)
		{
			$code = $more_than_three[$i]["Code"];
			$title = $more_than_three[$i]["Title"];
			$average = $more_than_three[$i]["Average_Grade"];
			
			if (array_key_exists($code, $result))
			{
				$result[$code]["more_than_three"] = $average;
			}
			else
			{
				$entry = array();
				$entry["Title"] = $title;
				$entry["more_than_three"] = $average;
				$result[$code] = $entry;
			}
		}
		
		for ($i = 0; $i < count($one_to_three); $i++)
		{
			$code = $one_to_three[$i]["Code"];
			$title = $one_to_three[$i]["Title"];
			$average = $one_to_three[$i]["Average_Grade"];
			
			if (array_key_exists($code, $result))
			{
				$result[$code]["one_to_three"] = $average;
			}
			else
			{
				$entry = array();
				$entry["Title"] = $title;
				$entry["one_to_three"] = $average;
				$result[$code] = $entry;
			}
		}
		
		for ($i = 0; $i < count($zero); $i++)
		{
			$code = $zero[$i]["Code"];
			$title = $zero[$i]["Title"];
			$average = $zero[$i]["Average_Grade"];
			
			if (array_key_exists($code, $result))
			{
				$result[$code]["zero"] = $average;
			}
			else
			{
				$entry = array();
				$entry["Title"] = $title;
				$entry["zero"] = $average;
				$result[$code] = $entry;
			}
		}
		
		
		if ($report != NULL)
			$ret = array ("res" => "TRUE", "data" => $result);
		else
			$ret = array ("res" => "FALSE");
	}
	else if (strcmp($q, "student") == 0)
	{
		DAL::connect();
		$report = DAL::get_student_report();
		DAL::disconnect();
		
		// process the report to combine any crosslisted
		$map = array();
		for ($i = 0; $i < count($report); $i++)
		{
			$professor = $report[$i]["Name"];
			if (array_key_exists("$professor", $map))
			{
				$index = $map[$professor];
				$report[$index]["Code"] .= "/ " . $report[$i]["Code"];
				unset($report[$i]);
			}
			else
				$map[$professor] = $i;
		}
		
		if ($report != NULL)
			$ret = array ("res" => "TRUE", "data" => $report);
		else
			$ret = array ("res" => "FALSE");
	}
	
	echo (json_encode($ret));
}

?>