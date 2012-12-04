-- phpMyAdmin SQL Dump
-- version 2.11.11.3
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 04, 2012 at 04:08 PM
-- Server version: 5.0.95
-- PHP Version: 5.1.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cs4400_Group46`
--

-- --------------------------------------------------------

--
-- Table structure for table `Administrator`
--

CREATE TABLE IF NOT EXISTS `Administrator` (
  `Username` varchar(64) NOT NULL,
  PRIMARY KEY  (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Administrator`
--

INSERT INTO `Administrator` (`Username`) VALUES
('admin');

-- --------------------------------------------------------

--
-- Table structure for table `Course`
--

CREATE TABLE IF NOT EXISTS `Course` (
  `Title` varchar(64) NOT NULL,
  PRIMARY KEY  (`Title`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Course`
--

INSERT INTO `Course` (`Title`) VALUES
('Advanced AE'),
('Advanced BIO'),
('Advanced BME'),
('Advanced CS'),
('Advanced ECE'),
('BME and BIO'),
('CS and AE'),
('Intro AE'),
('Intro BIO'),
('Intro BME'),
('Intro CS'),
('Intro ECE');

-- --------------------------------------------------------

--
-- Table structure for table `Course_Code`
--

CREATE TABLE IF NOT EXISTS `Course_Code` (
  `Title` varchar(64) NOT NULL,
  `Code` varchar(64) NOT NULL,
  PRIMARY KEY  (`Title`,`Code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Course_Code`
--

INSERT INTO `Course_Code` (`Title`, `Code`) VALUES
('Advanced AE', 'AE 3000'),
('Advanced BIO', 'BIO 3000'),
('Advanced BME', 'BME 3000'),
('Advanced CS', 'CS 3000'),
('Advanced ECE', 'ECE 3000'),
('BME and BIO', 'BIO 2400'),
('BME and BIO', 'BME 2400'),
('CS and AE', 'AE 1500'),
('CS and AE', 'CS 1500'),
('Intro AE', 'AE 1000'),
('Intro BIO', 'BIO 1000'),
('Intro BME', 'BME 1000'),
('Intro CS', 'CS 1000'),
('Intro ECE', 'ECE 1000');

-- --------------------------------------------------------

--
-- Table structure for table `Course_Section`
--

CREATE TABLE IF NOT EXISTS `Course_Section` (
  `CRN` varchar(8) NOT NULL,
  `Title` varchar(64) NOT NULL,
  PRIMARY KEY  (`CRN`,`Title`),
  KEY `FK_Course_Section_Title` (`Title`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Course_Section`
--

INSERT INTO `Course_Section` (`CRN`, `Title`) VALUES
('1005', 'Advanced AE'),
('1006', 'Advanced AE'),
('2011', 'Advanced BIO'),
('2012', 'Advanced BIO'),
('3017', 'Advanced BME'),
('3018', 'Advanced BME'),
('4023', 'Advanced CS'),
('4024', 'Advanced CS'),
('5029', 'Advanced ECE'),
('5030', 'Advanced ECE'),
('6031', 'BME and BIO'),
('6032', 'BME and BIO'),
('7033', 'CS and AE'),
('7034', 'CS and AE'),
('1001', 'Intro AE'),
('1002', 'Intro AE'),
('2007', 'Intro BIO'),
('2008', 'Intro BIO'),
('3013', 'Intro BME'),
('3014', 'Intro BME'),
('4019', 'Intro CS'),
('4020', 'Intro CS'),
('5025', 'Intro ECE'),
('5026', 'Intro ECE');

-- --------------------------------------------------------

--
-- Table structure for table `Department`
--

CREATE TABLE IF NOT EXISTS `Department` (
  `Dept_Id` tinyint(4) NOT NULL,
  `Name` varchar(64) NOT NULL,
  PRIMARY KEY  (`Dept_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Department`
--

INSERT INTO `Department` (`Dept_Id`, `Name`) VALUES
(1, 'AE'),
(2, 'BIO'),
(3, 'BME'),
(4, 'CS'),
(5, 'ECE');

-- --------------------------------------------------------

--
-- Table structure for table `Department_Course`
--

CREATE TABLE IF NOT EXISTS `Department_Course` (
  `Dept_Id` tinyint(4) NOT NULL,
  `Title` varchar(64) NOT NULL,
  PRIMARY KEY  (`Dept_Id`,`Title`),
  KEY `FK_Department_Course_Title` (`Title`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Department_Course`
--

INSERT INTO `Department_Course` (`Dept_Id`, `Title`) VALUES
(1, 'Advanced AE'),
(2, 'Advanced BIO'),
(3, 'Advanced BME'),
(4, 'Advanced CS'),
(5, 'Advanced ECE'),
(2, 'BME and BIO'),
(3, 'BME and BIO'),
(1, 'CS and AE'),
(4, 'CS and AE'),
(1, 'Intro AE'),
(2, 'Intro BIO'),
(3, 'Intro BME'),
(4, 'Intro CS'),
(5, 'Intro ECE');

-- --------------------------------------------------------

--
-- Table structure for table `Department_Faculty`
--

CREATE TABLE IF NOT EXISTS `Department_Faculty` (
  `Dept_Id` tinyint(4) NOT NULL,
  `Instructor_Id` int(11) NOT NULL,
  PRIMARY KEY  (`Dept_Id`,`Instructor_Id`),
  KEY `FK_Department_Faculty_Instructor_Id` (`Instructor_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Department_Faculty`
--

INSERT INTO `Department_Faculty` (`Dept_Id`, `Instructor_Id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(3, 9),
(3, 10),
(3, 11),
(3, 12),
(4, 13),
(4, 14),
(4, 15),
(4, 16),
(5, 17),
(5, 18),
(5, 19),
(5, 20),
(1, 21),
(2, 22),
(3, 23),
(4, 24),
(5, 25);

-- --------------------------------------------------------

--
-- Table structure for table `Education_History`
--

CREATE TABLE IF NOT EXISTS `Education_History` (
  `Student_Id` int(11) NOT NULL,
  `Name_of_School` varchar(64) NOT NULL,
  `Year_of_Grad` year(4) NOT NULL,
  `Major` varchar(64) NOT NULL,
  `Degree` varchar(64) NOT NULL,
  `GPA` float NOT NULL,
  PRIMARY KEY  (`Student_Id`,`Name_of_School`,`Year_of_Grad`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Education_History`
--

INSERT INTO `Education_History` (`Student_Id`, `Name_of_School`, `Year_of_Grad`, `Major`, `Degree`, `GPA`) VALUES
(13, 'Georgia State', 2010, 'CSIX', 'BS', 8),
(13, 'Michael College', 2010, 'CS', 'BS', 6),
(13, 'UGA', 2010, 'CS', 'BS', 4);

-- --------------------------------------------------------

--
-- Table structure for table `Faculty`
--

CREATE TABLE IF NOT EXISTS `Faculty` (
  `Username` varchar(64) NOT NULL,
  `Instructor_Id` int(11) NOT NULL auto_increment,
  `Position` varchar(64) NOT NULL,
  PRIMARY KEY  (`Instructor_Id`),
  UNIQUE KEY `Username` (`Username`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Dumping data for table `Faculty`
--

INSERT INTO `Faculty` (`Username`, `Instructor_Id`, `Position`) VALUES
('prasad', 1, 'professor'),
('sankar', 2, 'professor'),
('mavris', 3, 'associate'),
('hodges', 4, 'assistant'),
('montoya', 5, 'professor'),
('skolnick', 6, 'professor'),
('weitz', 7, 'associate'),
('gibson', 8, 'assistant'),
('rains', 9, 'professor'),
('bao', 10, 'professor'),
('potter', 11, 'associate'),
('kemp', 12, 'assistant'),
('leahy', 13, 'professor'),
('clark', 14, 'professor'),
('conte', 15, 'assistant'),
('wolf', 16, 'assistant'),
('moin', 17, 'professor'),
('sands', 18, 'professor'),
('coyle', 19, 'associate'),
('brand', 20, 'assistant'),
('feron', 21, 'professor'),
('kerr', 22, 'associate'),
('ting', 23, 'assistant'),
('sweat', 24, 'professor'),
('west', 25, 'associate');

-- --------------------------------------------------------

--
-- Table structure for table `Faculty_Section`
--

CREATE TABLE IF NOT EXISTS `Faculty_Section` (
  `Instructor_Id` int(11) NOT NULL,
  `CRN` varchar(8) NOT NULL,
  PRIMARY KEY  (`Instructor_Id`,`CRN`),
  KEY `FK_Faculty_Section_CRN` (`CRN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Faculty_Section`
--

INSERT INTO `Faculty_Section` (`Instructor_Id`, `CRN`) VALUES
(3, '1001'),
(4, '1002'),
(1, '1005'),
(2, '1006'),
(7, '2007'),
(8, '2008'),
(5, '2011'),
(6, '2012'),
(11, '3013'),
(12, '3014'),
(9, '3017'),
(10, '3018'),
(16, '4020'),
(13, '4023'),
(14, '4024'),
(19, '5025'),
(20, '5026'),
(17, '5029'),
(18, '5030'),
(2, '6031'),
(3, '6032'),
(21, '7033'),
(15, '7034'),
(24, '7034');

-- --------------------------------------------------------

--
-- Table structure for table `RegularUser`
--

CREATE TABLE IF NOT EXISTS `RegularUser` (
  `Username` varchar(64) NOT NULL,
  `Name` varchar(64) NOT NULL,
  `Email_Id` varchar(64) NOT NULL,
  `DOB` date NOT NULL,
  `Address` varchar(128) NOT NULL,
  `Permanent_Address` varchar(128) NOT NULL,
  `Gender` varchar(8) NOT NULL,
  `Contact_No` varchar(16) NOT NULL,
  PRIMARY KEY  (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `RegularUser`
--

INSERT INTO `RegularUser` (`Username`, `Name`, `Email_Id`, `DOB`, `Address`, `Permanent_Address`, `Gender`, `Contact_No`) VALUES
('alexa', 'Alexa', 'alexa@email.com', '1990-12-02', 'Georgia Tech Station', 'Home', 'Female', '1'),
('bao', 'bao', 'bao@gatech.edu', '1962-12-02', '123 Main Street', '123 Main Street', 'Female', '123-456-7890'),
('blake', 'Blake', 'blake@email.com', '1990-12-02', 'Georgia Tech Station', 'Home', 'Male', '2'),
('bob', 'Bob Buddy', 'bob@gatech.edu', '1989-12-08', 'Super Street 123', 'Super Street 123', 'Male', '555'),
('brand', 'brand', 'brand@gatech.edu', '1962-12-02', '123 Main Street', '123 Main Street', 'Female', '123-456-7890'),
('branon', 'Branon', 'branon@email.com', '1990-12-02', 'Georgia Tech Station', 'Home', 'Male', '3'),
('brett', 'Brett', 'brett@email.com', '1990-12-02', 'Georgia Tech Station', 'Home', 'Male', '4'),
('broski', 'Broski Buddy', 'buddy@gatech.edu', '1987-12-10', 'Super Street 123', 'Super Street 123', 'Male', '555'),
('clark', 'clark', 'clark@gatech.edu', '1962-12-02', '123 Main Street', '123 Main Street', 'Male', '123-456-7890'),
('conte', 'Tom Conte', 'conte.tom@gatech.edu', '1962-12-09', '123 Main Technology', '123 Main Parkway', 'Male', '456-123-7890'),
('coyle', 'coyle', 'coyle@gatech.edu', '1962-12-02', '123 Main Street', '123 Main Street', 'Male', '123-456-7890'),
('david', 'David', 'david@email.com', '1990-12-02', 'Georgia Tech Station', 'Home', 'Male', '5'),
('eric', 'eric crockett', 'eric@gatech.edu', '2012-10-10', '123 Main', '123 Main', 'Male', '123-456-7890'),
('feron', 'feron', 'feron@gatech.edu', '1962-12-03', '123 Main Street', '123 Main Street', 'Male', '123-456-7890'),
('gibson', 'gibson', 'gibson@gatech.edu', '1962-12-02', '123 Main Street', '123 Main Street', 'Female', '123-456-7890'),
('hodges', 'hodges', 'hodges@gatech.edu', '1962-12-02', '123 Main Street', '123 Main Street', 'Female', '123-456-7890'),
('jake', 'Jake', 'jake@email.com', '1990-12-02', 'Georgia Tech Station', 'Home', 'Male', '6'),
('jared', 'Jared Collins', 'jared@gatech.edu', '1972-10-17', 'Imadork 15', 'Imadork 15', 'Female', '123999'),
('jennifer', 'Jennifer', 'jennifer@email.com', '1990-12-02', 'Georgia Tech Station', 'Home', 'Female', '7'),
('jingle', 'Jingle Highmer', 'jingle@gatech.edu', '1995-12-03', 'Fairytale Lane 1', 'Fairytale Lane 1', 'Male', '3893838'),
('john', 'John Jacob', 'john@gatech.edu', '1990-02-06', 'Your Mom''s Street 1337', 'Your Mom''s Street 1337', 'Male', '1337'),
('jonathan', 'Jonathan', 'jonathan@email.com', '1990-12-02', 'Georgia Tech Station', 'Home', 'Male', '8'),
('justin', 'Justin', 'justin@email.com', '1990-12-02', 'Georgia Tech Station', 'Home', 'Male', '9'),
('kelly', 'Kelly', 'kelly@email.com', '1990-12-02', 'Georgia Tech Station', 'Home', 'Female', '10'),
('kemp', 'kemp', 'kemp@gatech.edu', '1962-12-02', '123 Main Street', '123 Main Street', 'Female', '123-456-7890'),
('kerr', 'Kerr', 'kerr@gatech.edu', '1962-12-03', '123 Main Street', '123 Main Street', 'Male', '123-456-7890'),
('kyle', 'Kyle', 'kyle@email.com', '1990-12-02', 'Georgia Tech Station', 'Home', 'Male', '11'),
('leahy', 'leahy', 'leahy@gatech.edu', '1962-12-02', '123 Main Street', '123 Main Street', 'Male', '123-456-7890'),
('mason', 'Mason', 'mason@email.com', '1990-12-02', 'Georgia Tech Station', 'Home', 'Male', '12'),
('mavris', 'mavris', 'mavris@gatech.edu', '1962-12-02', '123 Main Street', '123 Main Street', 'Male', '123-456-7890'),
('michael', 'Michael Dandy', 'michael@gatech.com', '1990-12-08', '123 Georgia Parkway', '123 Georgia Parkway', 'Male', '123-456-7890'),
('moin', 'moin', 'moin@gatech.edu', '1962-12-02', '123 Main Street', '123 Main Street', 'Male', '123-456-7890'),
('montoya', 'montoya', 'montoya@gatech.edu', '1962-12-02', '123 Main Street', '123 Main Street', 'Male', '123-456-7890'),
('potter', 'potter', 'potter@gatech.edu', '1962-12-02', '123 Main Street', '123 Main Street', 'Male', '123-456-7890'),
('prasad', 'prasad', 'prasad@gatech.edu', '1962-12-02', '123 Main Street', '123 Main Street', 'Male', '123-456-7890'),
('rains', 'rains', 'rains@gatech.edu', '1962-12-02', '123 Main Street', '123 Main Street', 'Male', '123-456-7890'),
('robert', 'Robert', 'robert@email.com', '1990-12-02', 'Georgia Tech Station', 'Home', 'Male', '14'),
('sands', 'sands', 'sands@gatech.edu', '1962-12-02', '123 Main Street', '123 Main Street', 'Female', '123-456-7890'),
('sankar', 'sankar', 'sankar@gatech.edu', '1962-12-02', '123 Main Street', '123 Main Street', 'Female', '123-456-7890'),
('skolnick', 'skolnick', 'skolnick@gatech.edu', '1962-12-02', '123 Main Street', '123 Main Street', 'Female', '123-456-7890'),
('smit', 'Smit Man', 'smit@gatech.edu', '1988-01-06', 'Bloopydoo Road 15', 'Bloopydoo Road 15', 'Male', '12312234'),
('sweat', 'Sweat', 'sweat@gatech.edu', '1962-12-03', '123 Main Street', '123 Main Street', 'Female', '123-456-7890'),
('ting', 'Ting', 'ting@gatech.edu', '1962-12-03', '123 Main Street', '123 Main Street', 'Female', '123-456-7890'),
('weitz', 'weitz', 'weitz@gatech.edu', '1962-12-02', '123 Main Street', '123 Main Street', 'Male', '123-456-7890'),
('west', 'West', 'west@gatech.edu', '1962-12-03', '123 Main Street', '123 Main Street', 'Male', '123-456-7890'),
('wolf', 'wolf', 'wolf@gatech.edu', '1962-12-02', '123 Main Street', '123 Main Street', 'Male', '123-456-7890'),
('zed', 'Zed', 'zed@email.com', '1990-12-02', 'Georgia Tech Station', 'Mars', 'Male', '15');

-- --------------------------------------------------------

--
-- Table structure for table `Research_Interests`
--

CREATE TABLE IF NOT EXISTS `Research_Interests` (
  `Instructor_Id` int(11) NOT NULL,
  `Research_Interest` varchar(64) NOT NULL,
  PRIMARY KEY  (`Instructor_Id`,`Research_Interest`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Research_Interests`
--

INSERT INTO `Research_Interests` (`Instructor_Id`, `Research_Interest`) VALUES
(13, 'Branch Prediction Techniques'),
(13, 'High Performance Computing Research'),
(15, 'Super Scalar Processors'),
(15, 'x64 Assembly'),
(15, 'x86 Assembly Language Research'),
(16, 'Latest and Greates Multithreading Techniques'),
(16, 'Million Core Processor Research');

-- --------------------------------------------------------

--
-- Table structure for table `Section`
--

CREATE TABLE IF NOT EXISTS `Section` (
  `CRN` varchar(8) NOT NULL,
  `Letter` varchar(4) NOT NULL,
  `Term` varchar(16) NOT NULL,
  `Location` varchar(64) NOT NULL,
  `Day` varchar(16) NOT NULL,
  `Time` varchar(16) NOT NULL,
  PRIMARY KEY  (`CRN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Section`
--

INSERT INTO `Section` (`CRN`, `Letter`, `Term`, `Location`, `Day`, `Time`) VALUES
('1001', 'A', 'Spring2013', 'Georgia Tech', 'MWF', '8:00AM-9:00AM'),
('1002', 'B', 'Spring2013', 'Georgia Tech', 'MWF', '8:00AM-9:00AM'),
('1005', 'A', 'Spring2013', 'Georgia Tech', 'MWF', '9:00AM-10:00AM'),
('1006', 'B', 'Spring2013', 'Georgia Tech', 'MWF', '9:00AM-10:00AM'),
('2007', 'A', 'Spring2013', 'Georgia Tech', 'TR', '9:00AM-10:00AM'),
('2008', 'B', 'Spring2013', 'Georgia Tech', 'TR', '9:00AM-10:00AM'),
('2011', 'A', 'Spring2013', 'Georgia Tech', 'TR', '10:00AM-11:00AM'),
('2012', 'B', 'Spring2013', 'Georgia Tech', 'TR', '10:00AM-11:00AM'),
('3013', 'A', 'Spring2013', 'Georgia Tech', 'MWF', '11:00AM-12:00PM'),
('3014', 'B', 'Spring2013', 'Georgia Tech', 'MWF', '11:00AM-12:00PM'),
('3017', 'A', 'Spring2013', 'Georgia Tech', 'MWF', '12:00PM-1:00PM'),
('3018', 'B', 'Spring2013', 'Georgia Tech', 'MWF', '12:00PM-1:00PM'),
('4019', 'A', 'Spring2013', 'Georgia Tech', 'TR', '12:00PM-1:00PM'),
('4020', 'B', 'Spring2013', 'Georgia Tech', 'TR', '12:00PM-1:00PM'),
('4023', 'A', 'Spring2013', 'Georgia Tech', 'TR', '1:00PM-2:00PM'),
('4024', 'B', 'Spring2013', 'Georgia Tech', 'TR', '1:00PM-2:00PM'),
('5025', 'A', 'Spring2013', 'Georgia Tech', 'MWF', '2:00PM-3:00PM'),
('5026', 'B', 'Spring2013', 'Georgia Tech', 'MWF', '2:00PM-3:00PM'),
('5029', 'A', 'Spring2013', 'Georgia Tech', 'MWF', '3:00PM-4:00PM'),
('5030', 'B', 'Spring2013', 'Georgia Tech', 'MWF', '3:00PM-4:00PM'),
('6031', 'A', 'Spring2013', 'Georgia Tech', 'TR', '3:00PM-4:00PM'),
('6032', 'B', 'Spring2013', 'Georgia Tech', 'TR', '3:00PM-4:00PM'),
('7033', 'A', 'Spring2013', 'Georgia Tech', 'MWF', '4:00PM-5:00PM'),
('7034', 'B', 'Spring2013', 'Georgia Tech', 'MWF', '4:00PM-5:00PM');

-- --------------------------------------------------------

--
-- Table structure for table `Student`
--

CREATE TABLE IF NOT EXISTS `Student` (
  `Username` varchar(64) NOT NULL,
  `Student_Id` int(11) NOT NULL auto_increment,
  `Major` varchar(64) NOT NULL,
  `Degree` varchar(64) NOT NULL,
  PRIMARY KEY  (`Student_Id`),
  UNIQUE KEY `Username` (`Username`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `Student`
--

INSERT INTO `Student` (`Username`, `Student_Id`, `Major`, `Degree`) VALUES
('alexa', 1, 'AE', 'BS'),
('blake', 2, 'AE', 'MS'),
('branon', 3, 'AE', 'PHD'),
('brett', 4, 'BIO', 'BS'),
('david', 5, 'BIO', 'MS'),
('jake', 6, 'BIO', 'PHD'),
('jennifer', 7, 'BME', 'BS'),
('jonathan', 8, 'BME', 'MS'),
('justin', 9, 'BME', 'PHD'),
('kelly', 10, 'CS', 'BS'),
('kyle', 11, 'CS', 'MS'),
('mason', 12, 'CS', 'PHD'),
('michael', 13, 'CS', 'BS'),
('robert', 14, 'ECE', 'MS'),
('zed', 15, 'ECE', 'PHD'),
('eric', 16, 'CS', 'PHD'),
('jared', 17, 'CS', 'BS'),
('john', 18, 'ECE', 'BS'),
('bob', 19, 'AE', 'BS'),
('broski', 20, 'BME', 'BS'),
('jingle', 21, 'BIO', 'BS'),
('smit', 22, 'ECE', 'BS');

-- --------------------------------------------------------

--
-- Table structure for table `Student_Section`
--

CREATE TABLE IF NOT EXISTS `Student_Section` (
  `Student_Id` int(11) NOT NULL,
  `CRN` varchar(8) NOT NULL,
  `Grade_Mode` varchar(16) NOT NULL,
  `Grade` varchar(16) default NULL,
  PRIMARY KEY  (`Student_Id`,`CRN`),
  KEY `FK_Student_Section_CRN` (`CRN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Student_Section`
--

INSERT INTO `Student_Section` (`Student_Id`, `CRN`, `Grade_Mode`, `Grade`) VALUES
(3, '2007', 'registered', 'A'),
(3, '2011', 'registered', 'A'),
(3, '5025', 'registered', 'B'),
(3, '5029', 'registered', 'B'),
(12, '1002', 'registered', 'C'),
(12, '1005', 'registered', 'B'),
(12, '3013', 'registered', 'C'),
(12, '3017', 'registered', 'A'),
(12, '6031', 'registered', 'A'),
(13, '4020', 'pass_fail', 'B'),
(13, '4023', 'registered', 'B'),
(13, '5029', 'registered', 'C'),
(13, '7033', 'audit', 'A'),
(14, '1002', 'registered', 'A'),
(14, '1005', 'registered', 'B'),
(14, '3013', 'registered', 'C'),
(14, '3017', 'registered', 'A'),
(14, '4023', 'registered', 'A'),
(14, '6031', 'registered', 'A');

-- --------------------------------------------------------

--
-- Table structure for table `Tutor`
--

CREATE TABLE IF NOT EXISTS `Tutor` (
  `Student_Id` int(11) NOT NULL,
  PRIMARY KEY  (`Student_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Tutor`
--

INSERT INTO `Tutor` (`Student_Id`) VALUES
(1),
(3),
(6),
(12);

-- --------------------------------------------------------

--
-- Table structure for table `Tutor_Application`
--

CREATE TABLE IF NOT EXISTS `Tutor_Application` (
  `Student_Id` int(11) NOT NULL,
  `Title` varchar(64) NOT NULL,
  PRIMARY KEY  (`Student_Id`,`Title`),
  KEY `FK_Tutor_Application_Title` (`Title`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Tutor_Application`
--

INSERT INTO `Tutor_Application` (`Student_Id`, `Title`) VALUES
(6, 'Advanced BIO'),
(3, 'Advanced BME'),
(12, 'Advanced CS'),
(15, 'Advanced ECE'),
(13, 'CS and AE'),
(1, 'Intro BME'),
(1, 'Intro CS'),
(12, 'Intro CS'),
(13, 'Intro CS'),
(15, 'Intro ECE');

-- --------------------------------------------------------

--
-- Table structure for table `Tutor_Course`
--

CREATE TABLE IF NOT EXISTS `Tutor_Course` (
  `Student_Id` int(11) NOT NULL,
  `Title` varchar(64) NOT NULL,
  PRIMARY KEY  (`Student_Id`,`Title`),
  KEY `FK_Tutor_Course_Title` (`Title`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Tutor_Course`
--

INSERT INTO `Tutor_Course` (`Student_Id`, `Title`) VALUES
(3, 'Intro AE'),
(6, 'Intro BIO'),
(1, 'Intro CS'),
(12, 'Intro CS');

-- --------------------------------------------------------

--
-- Table structure for table `Tutor_Log`
--

CREATE TABLE IF NOT EXISTS `Tutor_Log` (
  `Tutor_Id` int(11) NOT NULL,
  `Student_Id` int(11) NOT NULL,
  `CRN` varchar(8) NOT NULL,
  PRIMARY KEY  (`Tutor_Id`,`Student_Id`,`CRN`),
  KEY `FK_Tutor_Log_Student_Username` (`Student_Id`),
  KEY `FK_Tutor_Log_CRN` (`CRN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Tutor_Log`
--

INSERT INTO `Tutor_Log` (`Tutor_Id`, `Student_Id`, `CRN`) VALUES
(3, 1, '1001'),
(3, 2, '1001'),
(6, 4, '2007'),
(6, 5, '2007'),
(6, 7, '2007'),
(6, 8, '2007'),
(12, 10, '4020'),
(12, 11, '4020'),
(12, 13, '4020'),
(3, 14, '1001'),
(12, 16, '4020'),
(12, 17, '4020'),
(3, 18, '1001'),
(12, 18, '4020'),
(3, 19, '1001'),
(6, 20, '2007'),
(6, 21, '2007'),
(3, 22, '1001');

-- --------------------------------------------------------

--
-- Table structure for table `Tutor_Log_DateTime`
--

CREATE TABLE IF NOT EXISTS `Tutor_Log_DateTime` (
  `Tutor_Id` int(11) NOT NULL,
  `Student_Id` int(11) NOT NULL,
  `CRN` varchar(8) NOT NULL,
  `DateTime` datetime NOT NULL,
  PRIMARY KEY  (`Tutor_Id`,`Student_Id`,`CRN`,`DateTime`),
  KEY `FK_Tutor_Log_DateTime_Student_Student_Id` (`Student_Id`),
  KEY `FK_Tutor_Log_DateTime_CRN` (`CRN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Tutor_Log_DateTime`
--

INSERT INTO `Tutor_Log_DateTime` (`Tutor_Id`, `Student_Id`, `CRN`, `DateTime`) VALUES
(3, 1, '1001', '2012-10-01 14:57:00'),
(3, 1, '1001', '2012-10-30 14:57:16'),
(3, 1, '1001', '2012-11-07 14:57:29'),
(3, 1, '1001', '2012-12-12 14:57:40'),
(3, 2, '1001', '2012-09-04 14:58:19'),
(3, 2, '1001', '2012-10-16 14:58:30'),
(3, 2, '1001', '2012-11-07 14:58:39'),
(6, 4, '2007', '2012-09-05 15:11:21'),
(6, 4, '2007', '2012-10-30 15:12:04'),
(6, 4, '2007', '2012-11-06 15:11:32'),
(6, 4, '2007', '2012-12-04 15:11:43'),
(6, 4, '2007', '2012-12-05 15:12:13'),
(6, 5, '2007', '2012-10-01 15:11:55'),
(6, 5, '2007', '2012-11-05 15:14:02'),
(6, 5, '2007', '2012-12-13 15:13:54'),
(6, 7, '2007', '2012-11-06 15:14:18'),
(6, 7, '2007', '2012-12-11 15:14:27'),
(6, 8, '2007', '2012-12-12 15:14:37'),
(12, 10, '4020', '2012-10-01 15:17:28'),
(12, 10, '4020', '2012-11-05 15:17:38'),
(12, 10, '4020', '2012-12-13 15:17:48'),
(12, 11, '4020', '2012-10-08 15:17:57'),
(12, 11, '4020', '2012-11-13 15:18:12'),
(12, 11, '4020', '2012-12-12 15:18:19'),
(12, 11, '4020', '2012-12-13 15:18:31'),
(12, 13, '4020', '2012-11-12 15:18:40'),
(12, 13, '4020', '2012-12-14 15:18:51'),
(3, 14, '1001', '2012-10-24 14:58:55'),
(3, 14, '1001', '2012-12-19 14:59:10'),
(12, 14, '4020', '2012-10-03 15:19:37'),
(3, 18, '1001', '2012-12-06 14:59:28');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE IF NOT EXISTS `User` (
  `Username` varchar(64) NOT NULL,
  `Password` varchar(128) NOT NULL,
  PRIMARY KEY  (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`Username`, `Password`) VALUES
('admin', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('alexa', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('bao', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('blake', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('bob', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('brand', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('branon', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('brett', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('broski', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('clark', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('conte', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('corn', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('coyle', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('david', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('eric', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('feron', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('gibson', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('hodges', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('jake', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('jared', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('jennifer', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('jingle', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('john', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('jonathan', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('justin', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('kelly', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('kemp', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('kerr', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('kyle', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('leahy', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('mason', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('mavris', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('michael', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('moin', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('montoya', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('potter', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('prasad', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('rains', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('robert', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('sands', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('sankar', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('skolnick', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('smit', 'password'),
('sweat', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('ting', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('weitz', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('west', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('wolf', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33'),
('zed', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Administrator`
--
ALTER TABLE `Administrator`
  ADD CONSTRAINT `FK_Administrator` FOREIGN KEY (`Username`) REFERENCES `User` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Course_Code`
--
ALTER TABLE `Course_Code`
  ADD CONSTRAINT `FK_Course_Code` FOREIGN KEY (`Title`) REFERENCES `Course` (`Title`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Course_Section`
--
ALTER TABLE `Course_Section`
  ADD CONSTRAINT `FK_Course_Section_CRN` FOREIGN KEY (`CRN`) REFERENCES `Section` (`CRN`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Course_Section_Title` FOREIGN KEY (`Title`) REFERENCES `Course` (`Title`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Department_Course`
--
ALTER TABLE `Department_Course`
  ADD CONSTRAINT `FK_Department_Course_Dept_Id` FOREIGN KEY (`Dept_Id`) REFERENCES `Department` (`Dept_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Department_Course_Title` FOREIGN KEY (`Title`) REFERENCES `Course` (`Title`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Department_Faculty`
--
ALTER TABLE `Department_Faculty`
  ADD CONSTRAINT `FK_Department_Faculty_Dept_Id` FOREIGN KEY (`Dept_Id`) REFERENCES `Department` (`Dept_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Department_Faculty_Instructor_Id` FOREIGN KEY (`Instructor_Id`) REFERENCES `Faculty` (`Instructor_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Education_History`
--
ALTER TABLE `Education_History`
  ADD CONSTRAINT `FK_Education_History` FOREIGN KEY (`Student_Id`) REFERENCES `Student` (`Student_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Faculty`
--
ALTER TABLE `Faculty`
  ADD CONSTRAINT `FK_Faculty` FOREIGN KEY (`Username`) REFERENCES `RegularUser` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Faculty_Section`
--
ALTER TABLE `Faculty_Section`
  ADD CONSTRAINT `FK_Faculty_Section_Instructor_Id` FOREIGN KEY (`Instructor_Id`) REFERENCES `Faculty` (`Instructor_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Faculty_Section_CRN` FOREIGN KEY (`CRN`) REFERENCES `Section` (`CRN`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `RegularUser`
--
ALTER TABLE `RegularUser`
  ADD CONSTRAINT `FK_RegularUser` FOREIGN KEY (`Username`) REFERENCES `User` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Research_Interests`
--
ALTER TABLE `Research_Interests`
  ADD CONSTRAINT `FK_Research_Interests` FOREIGN KEY (`Instructor_Id`) REFERENCES `Faculty` (`Instructor_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Student`
--
ALTER TABLE `Student`
  ADD CONSTRAINT `FK_Student` FOREIGN KEY (`Username`) REFERENCES `RegularUser` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Student_Section`
--
ALTER TABLE `Student_Section`
  ADD CONSTRAINT `FK_Student_Section_CRN` FOREIGN KEY (`CRN`) REFERENCES `Section` (`CRN`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Student_Section_Username` FOREIGN KEY (`Student_Id`) REFERENCES `Student` (`Student_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Tutor`
--
ALTER TABLE `Tutor`
  ADD CONSTRAINT `FK_Tutor` FOREIGN KEY (`Student_Id`) REFERENCES `Student` (`Student_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Tutor_Application`
--
ALTER TABLE `Tutor_Application`
  ADD CONSTRAINT `FK_Tutor_Application_Username` FOREIGN KEY (`Student_Id`) REFERENCES `Student` (`Student_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Tutor_Application_Title` FOREIGN KEY (`Title`) REFERENCES `Course` (`Title`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Tutor_Course`
--
ALTER TABLE `Tutor_Course`
  ADD CONSTRAINT `FK_Tutor_Course_Student_Id` FOREIGN KEY (`Student_Id`) REFERENCES `Tutor` (`Student_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Tutor_Course_Title` FOREIGN KEY (`Title`) REFERENCES `Course` (`Title`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Tutor_Log`
--
ALTER TABLE `Tutor_Log`
  ADD CONSTRAINT `FK_Tutor_Log_Tutor_Id` FOREIGN KEY (`Tutor_Id`) REFERENCES `Tutor` (`Student_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Tutor_Log_Student_Username` FOREIGN KEY (`Student_Id`) REFERENCES `Student` (`Student_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Tutor_Log_CRN` FOREIGN KEY (`CRN`) REFERENCES `Section` (`CRN`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Tutor_Log_DateTime`
--
ALTER TABLE `Tutor_Log_DateTime`
  ADD CONSTRAINT `FK_Tutor_Log_DateTime_Tutor_Student_Id` FOREIGN KEY (`Tutor_Id`) REFERENCES `Tutor_Log` (`Tutor_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Tutor_Log_DateTime_Student_Student_Id` FOREIGN KEY (`Student_Id`) REFERENCES `Tutor_Log` (`Student_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Tutor_Log_DateTime_CRN` FOREIGN KEY (`CRN`) REFERENCES `Tutor_Log` (`CRN`) ON DELETE CASCADE ON UPDATE CASCADE;
