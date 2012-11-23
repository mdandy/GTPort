<?php

require_once("dbconfig.php");

class DAL 
{
	private static $dbh;

	/**
	 * Basic DB Handler functions
	 */
	public static function connect() 
	{
		if (!self::$dbh) 
		{
			try 
			{
				$host = HOST;
				$db_name = DB_NAME;
				$username = USERNAME;
				$password = PASSWORD;
		
				// Establish the connection
				self::$dbh = new PDO("mysql:host=".$host.";dbname=".$db_name, $username, $password);
				self::$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			}
			catch(PDOException $e) 
			{
				echo ("Error: " . $e->getMessage());
				return false;
			}
		}
		return (self::$dbh != NULL);
	}
	
	public static function isConnected() 
	{
		if (self::$dbh == NULL)
			return false;
		return true;
	}

	public static function disconnect() 
	{
		self::$dbh = NULL;
	}
	
	/**
	 * Login
	 */
	public static function login($username, $password)
	{
		try
		{
			$sql = "SELECT Username FROM User WHERE Username=:username AND Password=:password";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			$query->bindParam(":password", $password, PDO::PARAM_STR, 64);
			$query->execute();
			return $query->fetchAll(PDO::FETCH_ASSOC);
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return NULL;
	}
	
	/**
	 * Create Account
	 */
	public static function create_account($username, $password)
	{
		try 
		{
			$sql = "INSERT INTO User (Username, Password) VALUES (:username, :password)";
			$sql .= " ON DUPLICATE KEY UPDATE Password=:uPassword";
	
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			$query->bindParam(":password", $password, PDO::PARAM_STR, 64);
			$query->bindParam(":uPassword", $password, PDO::PARAM_STR, 64);
			$query->execute();
			
			return true;
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	public static function get_account_type($username)
	{
		try
		{		
			$sql = "SELECT COUNT(*) FROM Student WHERE Username=:username";
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			$query->execute();
			$num = $query->fetchColumn();
			$query->closeCursor();
			
			if ($num > 0)
			{
				$sql = "SELECT COUNT(*) FROM Tutor WHERE Student_Id=(SELECT Student_Id FROM Student WHERE Username=:username)";
				$query = self::$dbh->prepare($sql);
				$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
				$query->execute();
				$num = $query->fetchColumn();
				$query->closeCursor();
				
				if($num > 0)
					return "tutor";
				else
					return "student";
			}
			
			$sql = "SELECT COUNT(*) FROM Faculty WHERE Username=:username";
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			$query->execute();
			$num = $query->fetchColumn();
			$query->closeCursor();
			
			if($num > 0)
				return "faculty";
			
			$sql = "SELECT COUNT(*) FROM Administrator WHERE Username=:username";
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			$query->execute();
			if($query->fetchColumn() > 0)
				return "admin";
				
			return "unknown";
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return NULL;
	}
	
	/**
	 * Student Profile
	 */
	public static function get_student_information($username)
	{
		try
		{
			$sql = "SELECT Name, Email_Id, DOB, Address, Permanent_Address, Gender, Contact_No, Major, Degree";
			$sql .= " FROM RegularUser AS R NATURAL JOIN Student AS S WHERE R.Username=:username";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			$query->execute();
			return $query->fetchAll(PDO::FETCH_ASSOC);
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return NULL;
	}
	
	public static function get_student_previous_education($username)
	{
		try
		{
			$sql = "SELECT Name_of_School, Year_of_Grad, Major, Degree, GPA";
			$sql .= " FROM RegularUser NATURAL JOIN Education_History";
			$sql .= " WHERE Username=:username";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			$query->execute();
			return $query->fetchAll(PDO::FETCH_ASSOC);
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return NULL;
	}
	
	public static function get_student_tutor_application($username)
	{
		try
		{
			$sql = "SELECT Code FROM Course_Code NATURAL JOIN Course WHERE Title IN (";
			$sql .= " SELECT Title FROM Course_Section WHERE CRN IN (";
			$sql .= " SELECT CRN FROM Student_Section";
			$sql .= " WHERE (Grade='A' OR Grade='B') AND Student_Id=(";
			$sql .= " SELECT Student_Id FROM Student WHERE Username=:username";
			$sql .= " )))";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			$query->execute();
			return $query->fetchAll(PDO::FETCH_ASSOC);
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
	}
	
	public static function upsert_student_information($username, $name, $email, $DOB, $address,
													  $permanentAddr, $gender, $contactNumber,
													  $major, $degree)
	{
		try
		{		  
			$sql = "INSERT INTO RegularUser (";
			$sql .= "Username, Name, Email_Id, DOB, Address, Permanent_Address, Gender, Contact_No";
			$sql .= ") VALUES (";
			$sql .= ":username, :name, :email, :DOB, :address, :permanentAddr, :gender, :contactNumber";
			$sql .= ") ON DUPLICATE KEY UPDATE";
			$sql .= " Name=:uName, Email_Id=:uEmail, DOB=:uDOB, Address=:uAddress,";
			$sql .= " Permanent_Address=:uPermanentAddr, Gender=:uGender, Contact_No=:uContactNumber";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			$query->bindParam(":name", $name, PDO::PARAM_STR, 64);
			$query->bindParam(":email", $email, PDO::PARAM_STR, 64);
			$query->bindParam(":DOB", $DOB);
			$query->bindParam(":address", $address, PDO::PARAM_STR, 128);
			$query->bindParam(":permanentAddr", $permanentAddr, PDO::PARAM_STR, 128);
			$query->bindParam(":gender", $gender, PDO::PARAM_STR, 8);
			$query->bindParam(":contactNumber", $contactNumber, PDO::PARAM_STR, 16);
			$query->bindParam(":uName", $name, PDO::PARAM_STR, 64);
			$query->bindParam(":uEmail", $email, PDO::PARAM_STR, 64);
			$query->bindParam(":uDOB", $DOB);
			$query->bindParam(":uAddress", $address, PDO::PARAM_STR, 128);
			$query->bindParam(":uPermanentAddr", $permanentAddr, PDO::PARAM_STR, 128);
			$query->bindParam(":uGender", $gender, PDO::PARAM_STR, 8);
			$query->bindParam(":uContactNumber", $contactNumber, PDO::PARAM_STR, 16);
			$query->execute();
			
			$sql = "INSERT INTO Student (Username, Major, Degree)";
			$sql .= " VALUES (:username, :major, :degree) ON DUPLICATE KEY UPDATE";
			$sql .= " Major=:major, Degree=:degree";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			$query->bindParam(":major", $major, PDO::PARAM_STR, 64);
			$query->bindParam(":degree", $degree, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	public static function upsert_student_previous_education($username, $name_school, $year_grad, 
														     $major, $degree, $gpa)
	{
		try
		{
			// TODO: Make sure we only have 3 previous educations
			
			$sql = "INSERT INTO Education_History (";
			$sql .= " Student_Id, Name_of_School, Year_of_Grad, Major, Degree, GPA";
			$sql .= " ) VALUES (";
			$sql .= " (SELECT Student_Id FROM Student WHERE Username=:username),";
			$sql .= " :name_school, :year_grad, :major, :degree, :gpa)";
			$sql .= " ON DUPLICATE KEY UPDATE";
			$sql .= " Major=:uMajor, Degree=:uDegree, GPA=:uGpa";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			$query->bindParam(":name_school", $name_school, PDO::PARAM_STR, 64);
			$query->bindParam(":year_grad", $year_grad);
			$query->bindParam(":major", $major, PDO::PARAM_STR, 64);
			$query->bindParam(":degree", $degree, PDO::PARAM_STR, 64);
			$query->bindParam(":gpa", $gpa);
			$query->bindParam(":uMajor", $major, PDO::PARAM_STR, 64);
			$query->bindParam(":uDegree", $degree, PDO::PARAM_STR, 64);
			$query->bindParam(":uGpa", $gpa);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	public static function insert_student_tutor_application($username, $code)
	{
		try
		{
			$sql = "INSERT INTO Tutor_Application (Student_Id, Title) VALUES (";
			$sql .= " (SELECT Student_Id FROM Student WHERE Username=:username),";
			$sql .= " (SELECT Title FROM Course_Code WHERE Code=$code))";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			$query->bindParam(":code", $code, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	/**
	 * Faculty Profile
	 */
	public static function get_faculty_information($username)
	{
		try
		{
			$sql = "";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	public static function get_department()
	{
		try
		{
			$sql = "";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	public static function get_course_code($dept_Id)
	{
		try
		{
			$sql = "";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	public static function get_section($course_title)
	{
		try
		{
			$sql = "";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	public static function upsert_faculty_information($username, $name, $email, $DOB, $address,
													  $permanentAddr, $gender, $contactNumber,
													  $position, $research_interests)
	{
		try
		{
			$sql = "";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	public static function upsert_faculty_department($username, $dept_id)
	{
		try
		{
			$sql = "";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	public static function upsert_faculty_teaching($username, $CRN)
	{
		try
		{
			$sql = "";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	/**
	 * Course Selection
	 */
	public static function get_course_selection($deptId, $term)
	{
		try
		{
			$sql = "";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	public static function register_course($username, $crn, $gradeMode)
	{
		try
		{
			$sql = "";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	/**
	 * Registration Complete View
	 */
	public static function get_registration_complete_view($CRN)
	{
		try
		{
			$sql = "";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	/**
	 * Tutor Assignment
	 */
	public static function get_tutor_applicants($username)
	{
		try
		{
			$sql = "";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	public static function assign_tutor($username, $student_Id)
	{
		try
		{
			$sql = "";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	/**
	 * Find Tutor
	 */
	public static function find_tutor_by_course_code($search_entry)
	{
		try
		{
			$sql = "";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	public static function find_tutor_by_keyword($search_entry)
	{
		try
		{
			$sql = "";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	/**
	 * Tutor Logbook
	 */
	public static function get_tutor_name($username)
	{
		try
		{
			$sql = "";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	public static function get_tutor_course_code($username)
	{
		try
		{
			$sql = "";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	public static function get_tutor_student_name($username)
	{
		try
		{
			$sql = "";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	public static function create_tutor_logbook($username, $student_id, $course_code)
	{
		try
		{
			$sql = "";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	/**
	 * Admin Report
	 */
	public static function get_admin_report()
	{
		try
		{
			$sql = "";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	/**
	 * Faculty Report
	 */
	public static function get_faculty_report()
	{
		try
		{
			$sql = "";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
	
	/**
	 * Student Report
	 */
	public static function get_student_report()
	{
		try
		{
			$sql = "";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
		return false;
	}
}
?>
