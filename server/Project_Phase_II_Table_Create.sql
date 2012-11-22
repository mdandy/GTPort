--
-- Entity: User
--
CREATE TABLE User (
	Username 			varchar(64) 	NOT NULL,
	Password 			varchar(64) 	NOT NULL,
	CONSTRAINT PK_User 
		PRIMARY KEY (Username)	
);

--
-- Entity: Administrator
--
CREATE TABLE Administrator (
	Username 			varchar(64) 	NOT NULL,
	CONSTRAINT PK_Administrator 
		PRIMARY KEY (Username),
	CONSTRAINT FK_Administrator 
		FOREIGN KEY (Username) REFERENCES User(Username) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Entity: RegularUser
--
CREATE TABLE RegularUser (
	Username 			varchar(64) 	NOT NULL,
	Name 				varchar(64) 	NOT NULL,
	Email_Id 			varchar(64) 	NOT NULL,
 	DOB 				date 			NOT NULL,
	Address 			varchar(128) 	NOT NULL,
	Permanent_Address 	varchar(128) 	NOT NULL,
	Gender 				varchar(8) 		NOT NULL,
	Contact_No 			varchar(16) 	NOT NULL,
	CONSTRAINT PK_RegularUser 
		PRIMARY KEY (Username),
	CONSTRAINT FK_RegularUser 
		FOREIGN KEY (Username) REFERENCES User(Username) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Entity: Student
--
CREATE TABLE Student (
	Username 			varchar(64) 	NOT NULL,
	Student_Id 			int			 	NOT NULL	AUTO_INCREMENT,
	Major 				varchar(64) 	NOT NULL,
	Degree 				varchar(64) 	NOT NULL,
	CONSTRAINT PK_Student 
		PRIMARY KEY (Student_Id),
	CONSTRAINT FK_Student 
		FOREIGN KEY (Username) REFERENCES RegularUser(Username) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Entity: Education_History
--
CREATE TABLE Education_History (
	Student_Id 			int 			NOT NULL,
	Name_of_School 		varchar(64) 	NOT NULL,
	Year_of_Grad 		year(4) 		NOT NULL,
	Major 				varchar(64) 	NOT NULL,
	Degree 				varchar(64) 	NOT NULL,
	GPA 				float 			NOT NULL,
	CONSTRAINT PK_Education_History 
		PRIMARY KEY (Student_Id,Name_of_School,Year_of_Grad),
	CONSTRAINT FK_Education_History 
		FOREIGN KEY (Student_Id) REFERENCES Student(Student_Id) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Entity: Faculty
--
CREATE TABLE Faculty (
	Username 			varchar(64) 	NOT NULL,
	Instructor_Id 		int			 	NOT NULL	AUTO_INCREMENT,
	Position 			varchar(64) 	NOT NULL,
	CONSTRAINT PK_Faculty 
		PRIMARY KEY  (Instructor_Id),
	CONSTRAINT FK_Faculty 
		FOREIGN KEY (Username) REFERENCES RegularUser(Username) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Multiple Attribute: Research_Interests
--
CREATE TABLE Research_Interests (
	Instructor_Id 		int			 	NOT NULL,
	Research_Interest 	varchar(64) 	NOT NULL,
	CONSTRAINT PK_Research_Interests 
		PRIMARY KEY (Instructor_Id, Research_Interest),
	CONSTRAINT FK_Research_Interests 
		FOREIGN KEY (Instructor_Id) REFERENCES Faculty(Instructor_Id) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Entity: Department
--
CREATE TABLE Department (
	Dept_Id 			tinyint		 	NOT NULL,
	Name 				varchar(64) 	NOT NULL,
	CONSTRAINT PK_Department 
		PRIMARY KEY (Dept_Id)
);

--
-- Relationship: Belongs
--
CREATE TABLE Department_Faculty (
	Dept_Id 			tinyint		 	NOT NULL,
	Instructor_Id		int			 	NOT NULL,
	CONSTRAINT PK_Department_Faculty 
		PRIMARY KEY (Dept_Id,Instructor_Id),
	CONSTRAINT FK_Department_Faculty_Dept_Id 
		FOREIGN KEY (Dept_Id) REFERENCES Department(Dept_Id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Department_Faculty_Instructor_Id 
		FOREIGN KEY (Instructor_Id) REFERENCES Faculty(Instructor_Id) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Entity: Course
--
CREATE TABLE Course (
	Title 				varchar(64) 	NOT NULL,
	CONSTRAINT PK_Course 
		PRIMARY KEY (Title)
);

--
-- Multiple Attribute: Course_Code
--
CREATE TABLE Course_Code (	
	Title 				varchar(64) 	NOT NULL,
	Code				varchar(64) 	NOT NULL,
	CONSTRAINT PK_Course_Code 
		PRIMARY KEY (Title,Code),
	CONSTRAINT FK_Course_Code 
		FOREIGN KEY (Title) REFERENCES Course(Title) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Relationship: Offers
--
CREATE TABLE Department_Course (	
	Dept_Id 			tinyint		 	NOT NULL,
	Title 				varchar(64) 	NOT NULL,
	CONSTRAINT PK_Department_Course 
		PRIMARY KEY (Dept_Id,Title),
	CONSTRAINT FK_Department_Course_Dept_Id 
		FOREIGN KEY (Dept_Id) REFERENCES Department(Dept_Id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Department_Course_Title 
		FOREIGN KEY (Title) REFERENCES Course(Title) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Entity: Section
--
CREATE TABLE Section (
	CRN 				varchar(8) 		NOT NULL,
	Letter 				varchar(4) 		NOT NULL,
	Term 				varchar(16) 	NOT NULL,
	Location 			varchar(64) 	NOT NULL,
	`Day` 				varchar(16) 	NOT NULL,
	`Time` 				varchar(16)		NOT NULL,
	CONSTRAINT PK_Section 
		PRIMARY KEY (CRN)
);

--
-- Relationship: Course has Section
--
CREATE TABLE Course_Section (
	CRN 				varchar(8) 		NOT NULL,
	Title 				varchar(64) 	NOT NULL,
	CONSTRAINT PK_Course_Section 
		PRIMARY KEY (CRN,Title),
	CONSTRAINT FK_Course_Section_CRN 
		FOREIGN KEY (CRN) REFERENCES Section(CRN) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Course_Section_Title 
		FOREIGN KEY (Title) REFERENCES Course(Title) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Relationship: Teaches
--
CREATE TABLE Faculty_Section (
	Instructor_Id 		int			 	NOT NULL,
	CRN 				varchar(8) 		NOT NULL,
	CONSTRAINT PK_Faculty_Section 
		PRIMARY KEY (Instructor_Id,CRN),
	CONSTRAINT FK_Faculty_Section_Instructor_Id 
		FOREIGN KEY (Instructor_Id) REFERENCES Faculty(Instructor_Id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Faculty_Section_CRN 
		FOREIGN KEY (CRN) REFERENCES Section(CRN) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Relationship: Registers
--
CREATE TABLE Student_Section (
	Student_Id 			int  			NOT NULL,
	CRN 				varchar(8) 		NOT NULL,
	Grade_Mode 			varchar(16) 	NOT NULL,
	Grade 				varchar(16),
	CONSTRAINT PK_Student_Section 
		PRIMARY KEY (Student_Id,CRN),
	CONSTRAINT FK_Student_Section_Username 
		FOREIGN KEY (Student_Id) REFERENCES Student(Student_Id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Student_Section_CRN 
		FOREIGN KEY (CRN) REFERENCES Section(CRN) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Entity: Tutor
--
CREATE TABLE Tutor (
	Student_Id 			int  			NOT NULL,
	CONSTRAINT PK_Tutor 
		PRIMARY KEY (Student_Id),
	CONSTRAINT FK_Tutor 
		FOREIGN KEY (Student_Id) REFERENCES Student(Student_Id) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Relationship: Apply to tutor for
--
CREATE TABLE Tutor_Application (
	Student_Id 			int  			NOT NULL,
	Title 				varchar(64) 	NOT NULL,
	CONSTRAINT PK_Tutor_Application 
		PRIMARY KEY (Student_Id,Title),
	CONSTRAINT FK_Tutor_Application_Username 
		FOREIGN KEY (Student_Id) REFERENCES Student(Student_Id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Tutor_Application_Title 
		FOREIGN KEY (Title) REFERENCES Course(Title) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Relationship: Tutors for
--
CREATE TABLE Tutor_Course (
	Student_Id 			int  			NOT NULL,
	Title 				varchar(64) 	NOT NULL,
	CONSTRAINT PK_Tutor_Course 
		PRIMARY KEY (Student_Id,Title),
	CONSTRAINT FK_Tutor_Course_Student_Id 
		FOREIGN KEY (Student_Id) REFERENCES Tutor(Student_Id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Tutor_Course_Title 
		FOREIGN KEY (Title) REFERENCES Course(Title) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Relationship: Logs Visit
--
CREATE TABLE Tutor_Log (
	Tutor_Id	 		int			 	NOT NULL,
	Student_Id 			int 			NOT NULL,
	CRN 				varchar(8) 		NOT NULL,
	CONSTRAINT PK_Tutor_Log 
		PRIMARY KEY (Tutor_Id,Student_Id,CRN),
	CONSTRAINT FK_Tutor_Log_Tutor_Id 
		FOREIGN KEY (Tutor_Id) REFERENCES Tutor(Student_Id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Tutor_Log_Student_Username 
		FOREIGN KEY (Student_Id) REFERENCES Student(Student_Id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Tutor_Log_CRN 
		FOREIGN KEY (CRN) REFERENCES Section(CRN) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Multivalue Attribute: Tutor DateTime
--
CREATE TABLE Tutor_Log_DateTime (
	Tutor_Id	 		int			 	NOT NULL,
	Student_Id 			int 		 	NOT NULL,
	CRN 				varchar(8) 		NOT NULL,
	`DateTime` 			datetime 		NOT NULL,
	CONSTRAINT PK_Tutor_Log_DateTime 
		PRIMARY KEY (Tutor_Id,Student_Id,CRN,`DateTime`),
	CONSTRAINT FK_Tutor_Log_DateTime_Tutor_Student_Id 
		FOREIGN KEY (Tutor_Id) REFERENCES Tutor_Log(Tutor_Id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Tutor_Log_DateTime_Student_Student_Id 
		FOREIGN KEY (Student_Id) REFERENCES Tutor_Log(Student_Id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_Tutor_Log_DateTime_CRN 
		FOREIGN KEY (CRN) REFERENCES Tutor_Log(CRN) ON DELETE CASCADE ON UPDATE CASCADE
);

