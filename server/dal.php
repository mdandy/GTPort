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
			$sql = "SELECT Username FROM User WHERE Username=:username AND Password=SHA1(:password)";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			$query->bindParam(":password", $password, PDO::PARAM_STR, 128);
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
			$sql = "INSERT INTO User (Username, Password) VALUES (:username, SHA1(:password))";
			$sql .= " ON DUPLICATE KEY UPDATE Password=SHA1(:uPassword)";
	
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			$query->bindParam(":password", $password, PDO::PARAM_STR, 128);
			$query->bindParam(":uPassword", $password, PDO::PARAM_STR, 128);
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
			$sql = "SELECT Name, Email_Id, DOB, Address, Permanent_Address, Gender, 
                        Contact_No, Position, Research_Interest, Dept_Name, Letter, Course
                    FROM (
                        SELECT Name, Email_Id, DOB, Address, Permanent_Address, Gender, 
                            Contact_No, Position, Instructor_Id
                        FROM RegularUser AS R NATURAL JOIN Faculty AS F
                        WHERE R.Username=:username
                    ) AS FACULTY_INFO 
                    JOIN (
                        SELECT Research_Interest, Name AS Dept_Name, Instructor_Id
                        FROM Research_Interests 
                        NATURAL JOIN Department_Faculty 
                        NATURAL JOIN Department
                    ) AS FACULTY_EXTRA ON FACULTY_INFO.Instructor_Id=FACULTY_EXTRA.Instructor_Id  
                    JOIN (
                        SELECT Letter, Instructor_Id, CRN
                        FROM Faculty_Section NATURAL JOIN Section
                    ) AS FACULTY_SECTION ON FACULTY_INFO.Instructor_Id=FACULTY_SON DUPLICATE KEY UPDATEECTION.Instructor_Id
                    JOIN (
                        SELECT CRN, Title
                        FROM Course_Section
                    ) AS COURSE_TITLE ON FACULTY_SECTION.CRN=COURSE_TITLE.CRN
                    JOIN (
                        SELECT Title, Code AS Course
                        FROM Course_Code
                    ) AS COURSE_CODE ON COURSE_TITLE.Title=COURSE_CODE.Title;";
			
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
			$sql = "SELECT Dept_Id, Name FROM Department;";
			
			$query = self::$dbh->prepare($sql);
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
			$sql = "SELECT Title, Code FROM Course_Code NATURAL JOIN Department_Course
                    WHERE Dept_Id=:dept_Id;";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":dept_Id", $dept_Id, PDO::PARAM_INT);
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
			$sql = "SELECT CRN, Letter FROM Section NATURAL JOIN Course_Section
                    WHERE Title=:course_title;";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":course_title", $course_title, PDO::PARAM_STR, 64);
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
			$sql = "INSERT INTO RegularUser (  
                        Username,
                        Name,
                        Email_Id,
                        DOB,
                        Address, 
                        Permanent_Address,
                        Gender,
                        Contact_No 
                    ) VALUES (
                        :username,
                        :name,
                        :email,
                        :DOB,
                        :address, 
                        :permanentAddr,
                        :gender,
                        :contactNumber
                    )
                    ON DUPLICATE KEY 
                    UPDATE
                    SET
                        Name = :name,
                        Email_Id = :email,
                        DOB = :DOB,
                        Address = :address, 
                        Permanent_Address = :permanentAddr,
                        Gender = :gender,
                        Contact_No = :contactNumber
                    WHERE Username = :username;";
                                            
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			$query->bindParam(":name", $name, PDO::PARAM_STR, 64);
			$query->bindParam(":email", $email, PDO::PARAM_STR, 64);
			$query->bindParam(":DOB", $DOB);
			$query->bindParam(":address", $address, PDO::PARAM_STR, 128);
			$query->bindParam(":permanentAddr", $permanentAddr, PDO::PARAM_STR, 128);
			$query->bindParam(":gender", $gender, PDO::PARAM_STR, 8);
			$query->bindParam(":contactNumber", $contactNumber, PDO::PARAM_STR, 16);
			$query->execute();
            
            $sql = "INSERT INTO Faculty (
                        Username,
                        Position
                    ) VALUES (
                        :username,
                        :position
                    )
                    ON DUPLICATE KEY
                    UPDATE
                    SET
                        Position = :position
                    WHERE Username = :username;";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			$query->bindParam(":position", $position, PDO::PARAM_STR, 64);
			$query->execute();
         
        }
		catch(PDOException $e) 
		{
			echo ("Error: " . $e->getMessage());
		}
         
        try{   
            $sql = "INSERT INTO Research_Interests (
                        Instructor_Id,
                        Research_Interest
                    ) VALUES (
                        (SELECT Instructor_Id 
                         FROM Faculty 
                         WHERE Username=:username), 
                        :research_interest
                    );";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			$query->bindParam(":research_interest", $research_interest, PDO::PARAM_STR, 64);
			return $query->execute();
		}
		catch(PDOException $e) 
		{
			//If insert into research fails due to duplicate key, that 
            //is ok because the entry is already there.  Do not show
            //error msg.
            //Todo: implement a log file to log this error.
		}
		return false;
	}
	
	public static function upsert_faculty_department($username, $dept_id)
	{
		try
		{
			$sql = "INSERT INTO Department_Faculty (
                        Dept_Id, 
                        Instructor_Id
                    ) VALUES (
                        :dept_id,
                        (SELECT Instructor_Id FROM Faculty WHERE Username=:username)
                    )
                    ON DUPLICATE KEY
                    UPDATE Department_Faculty
                        SET 
                            Dept_Id = :dept_id
                        WHERE 
                            Instructor_Id = 
                                (SELECT Instructor_Id FROM Faculty WHERE Username=:username);
                        ;";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			$query->bindParam(":dept_id", $dept_id);
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
			$sql = "INSERT INTO Faculty_Section (
                        Instructor_Id, 
                        CRN
                    ) VALUES (
                        (SELECT Instructor_Id FROM Faculty WHERE Username=:username),
                        :CRN
                    )
                    ON DUPLICATE KEY
                    UPDATE
                    SET
                        CRN = :CRN
                    WHERE 
                        Instructor_Id = 
                            (SELECT Instructor_Id FROM Faculty WHERE Username=:username);";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			$query->bindParam(":CRN", $CRN, PDO::PARAM_STR, 8);
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
			$sql = "SELECT S.CRN, CS.Title, CC.Code, S.Letter, RU.Name, S.Day, S.Time, S.Location
                    FROM
                        Department_Course AS DC
                        NATURAL JOIN Course_Section AS CS
                        NATURAL JOIN Course_Code AS CC
                        NATURAL JOIN Section AS S
                        NATURAL JOIN Faculty_Section AS FS
                        NATURAL JOIN Faculty AS F
                        NATURAL JOIN RegularUser AS RU
                    WHERE 
                        Dept_Id = :deptId AND 
                        Term = :term;";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":deptId", $deptId);
			$query->bindParam(":term", $term, PDO::PARAM_STR, 16);
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
			$sql = "INSERT INTO Student_Section (
                        Student_Id, CRN, Grade_Mode
                    ) VALUES (
                        (SELECT Student_Id FROM Student WHERE Username=$username),
                        :crn,
                        :gradeMode
                    );";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			$query->bindParam(":crn", $crn, PDO::PARAM_STR, 8);
			$query->bindParam(":gradeMode", $gradeMode, PDO::PARAM_STR, 16);
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
			$sql = "SELECT Title, Code, Letter, Grade_Mode 
                    FROM (
                        SELECT Title, Code, CRN 
                        FROM Course_Code NATURAL J
                        OIN Course_Section
                        WHERE CRN 
                        IN (:CRN)
                    ) AS COURSE_REG_INFO
                    JOIN (
                        SELECT CRN, Letter, Grade_Mode 
                        FROM  Student_Section NATURAL JOIN Section
                        WHERE CRN IN (:CRN)
                    ) AS COURE_REG ON COURSE_REG_INFO.CRN=COURE_REG.CRN;";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":CRN", implode(", ". $CRN));
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
			$sql = "SELECT Name, Student_Id FROM RegularUser NATURAL JOIN Student
                    WHERE Student_Id 
                    IN (
                        SELECT Student_Id FROM Tutor_Application 
                        WHERE Title=(
                            SELECT DISTINCT Title FROM Faculty_Section NATURAL JOIN Course_Section
                            WHERE Instructor_Id=(SELECT Instructor_Id FROM Faculty WHERE Username=:username)
                        )
                    );";
			
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
			$sql = "INSERT INTO Tutor (Student_Id) VALUES (:student_Id);
                    INSERT INTO Tutor_Course (
                        Student_Id,
                        Title
                    ) VALUES (
                        :student_Id,
                        (SELECT DISTINCT Title FROM Faculty_Section NATURAL JOIN Course_Section
                            WHERE Instructor_Id=(
                                SELECT Instructor_Id FROM Faculty WHERE Username=:username)
                        )
                    );";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			$query->bindParam(":student_Id", $student_Id);
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
			$sql = "SELECT Code, Title, RegularUser.Name, RegularUser.Email_Id 
                    FROM (
                        SELECT Course_Code.Title, Code, Student_ID
                            FROM Course_Code, Tutor_Course
                            WHERE Course_Code.Code LIKE '%:search_entry%'
                    ) AS MyTable
                    NATURAL JOIN Student
                    NATURAL JOIN RegularUser;";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":search_entry", $search_entry);
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
			$sql = "SELECT Code, Title, RegularUser.Name, RegularUser.Email_Id 
                    FROM (
                        SELECT Course_Code.Title, Code, Student_Id
                            FROM Course_Code, Tutor_Course
                            WHERE Course_Code.Title LIKE '%:search_entry%'
                    ) AS MyTable
                    NATURAL JOIN Student
                    NATURAL JOIN RegularUser;";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":search_entry", $search_entry);
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
			$sql = "SELECT Name 
                    FROM RegularUser
                    WHERE Username=:username;";
			
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
			$sql = "SELECT Code
                    FROM Tutor_Course NATURAL 
                    JOIN Course_Code
                    WHERE Student_Id = 
                        (SELECT Student_Id FROM Student WHERE Username=:username);";
			
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
	
	public static function get_tutor_student_name($student_id)
	{
		try
		{
			$sql = "SELECT Name
                    FROM RegularUser 
                    NATURAL JOIN Student
                    WHERE Student_Id=:student_id;";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":student_id", $student_id);
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
			$sql = "INSERT INTO Tutor_Log (
                        Tutor_Id, Student_Id, CRN
                    ) VALUES (
                        (SELECT Student_Id AS tutor_Id FROM Student WHERE Username=:username), 
                        :student_id, 
                        (SELECT CRN FROM Course_Code NATURAL JOIN Course_Section
                                                     WHERE Code = :course_code));";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
			$query->bindParam(":student_id", $student_id);
			$query->bindParam(":course_code", $course_code, PDO::PARAM_STR, 64);
			$query->execute();
		}
        catch(PDOException $e) 
		{
			//do nothing because this is mostly likely bcause entry
            //already exists in the tutor_log
		}
		try
		{
			$sql = "INSERT INTO Tutor_Log_DateTime (
                        Tutor_Id, Student_Id, CRN, `DateTime`
                    ) VALUES (
                        (SELECT Student_Id AS tutor_Id FROM STUDENT WHERE Username=:username),
                        :student_id, 
                        (SELECT CRN FROM Course_Code NATURAL JOIN Course_Section
                                    WHERE Code = :course_code), 
                        NOW()
                    );";
			
			$query = self::$dbh->prepare($sql);
			$query->bindParam(":username", $username, PDO::PARAM_STR, 64);
            $query->bindParam(":student_id", $student_id);
			$query->bindParam(":course_code", $course_code, PDO::PARAM_STR, 64);
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
			$sql = "SELECT Code, Title, Average_Grade
                    FROM (
                        SELECT Code, Title, CRN
                        FROM Course_Code NATURAL JOIN Course NATURAL JOIN Course_Section
                    ) AS Course_CRNs
                    NATURAL JOIN (
                        SELECT CRN, AVG(Grade) AS Average_Grade FROM (
                            SELECT CRN, Grade FROM (
                                SELECT CRN FROM Student_Section
                                WHERE CRN IN (SELECT CRN FROM Course_Section)
                                AND Grade='A'
                            ) AS GRADE_A JOIN (SELECT 4 AS Grade) AS GRADE_VAL_4
                            UNION
                            SELECT CRN, Grade FROM (
                                SELECT CRN FROM Student_Section
                                WHERE CRN IN (SELECT CRN FROM Course_Section)
                                AND Grade='B'
                            ) AS GRADE_B JOIN (SELECT 3 AS Grade) AS GRADE_VAL_3
                            UNION
                            SELECT CRN, Grade FROM (
                                SELECT CRN FROM Student_Section
                                WHERE CRN IN (SELECT CRN FROM Course_Section)
                                AND Grade='C'
                            ) AS GRADE_C JOIN (SELECT 2 AS Grade) AS GRADE_VAL_2
                            UNION
                            SELECT CRN, Grade FROM (
                                SELECT CRN FROM Student_Section
                                WHERE CRN IN (SELECT CRN FROM Course_Section)
                                AND Grade='D'
                            ) AS GRADE_D JOIN (SELECT 1 AS Grade) AS GRADE_VAL_1
                            UNION
                            SELECT CRN, Grade FROM (
                                SELECT CRN FROM Student_Section
                                WHERE CRN IN (SELECT CRN FROM Course_Section)
                                AND Grade='F'
                            ) AS GRADE_F JOIN (SELECT 0 AS Grade) AS GRADE_VAL_0
                        ) AS GRADE_TOTAL GROUP BY CRN
                    ) AS GRADE_TOTAL;";
			
			$query = self::$dbh->prepare($sql);
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
			$sql = "SELECT Name, Code, Title, Average_Grade FROM (
                        SELECT Name, Instructor_Id, CRN
                        FROM RegularUser NATURAL JOIN Faculty NATURAL JOIN Faculty_Section 
                    ) AS FACULTY_INFO 
                    JOIN (
                        SELECT Title, Code, CRN
                        FROM Course_Section NATURAL JOIN Course_Code
                    ) AS COURSE_CRN ON FACULTY_INFO.CRN=COURSE_CRN.CRN
                    JOIN (
                        SELECT CRN, AVG(Grade) AS Average_Grade FROM (
                            SELECT CRN, Grade FROM (
                                SELECT CRN FROM Student_Section
                                WHERE CRN IN (SELECT CRN FROM Course_Section)
                                AND Grade='A'
                            ) AS GRADE_A JOIN (SELECT 4 AS Grade) AS GRADE_VAL_4
                            UNION
                            SELECT CRN, Grade FROM (
                                SELECT CRN FROM Student_Section
                                WHERE CRN IN (SELECT CRN FROM Course_Section)
                                AND Grade='B'
                            ) AS GRADE_B JOIN (SELECT 3 AS Grade) AS GRADE_VAL_3
                            UNION
                            SELECT CRN, Grade FROM (
                                SELECT CRN FROM Student_Section
                                WHERE CRN IN (SELECT CRN FROM Course_Section)
                                AND Grade='C'
                            ) AS GRADE_C JOIN (SELECT 2 AS Grade) AS GRADE_VAL_2
                            UNION
                            SELECT CRN, Grade FROM (
                                SELECT CRN FROM Student_Section
                                WHERE CRN IN (SELECT CRN FROM Course_Section)
                                AND Grade='D'
                            ) AS GRADE_D JOIN (SELECT 1 AS Grade) AS GRADE_VAL_1
                            UNION
                            SELECT CRN, Grade FROM (
                                SELECT CRN FROM Student_Section
                                WHERE CRN IN (SELECT CRN FROM Course_Section)
                                AND Grade='F'
                            ) AS GRADE_F JOIN (SELECT 0 AS Grade) AS GRADE_VAL_0
                        ) AS GRADE_TOTAL GROUP BY CRN
                    ) AS COURSE_GRADE ON FACULTY_INFO.CRN=COURSE_GRADE.CRN;";
			
			$query = self::$dbh->prepare($sql);
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
