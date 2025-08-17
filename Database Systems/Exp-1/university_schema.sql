
-- University Database Schema

CREATE DATABASE IF NOT EXISTS UniversityDB;
USE UniversityDB;

-- ============================
-- Table: DEPARTMENT
-- ============================
CREATE TABLE Department (
    DeptCode VARCHAR(10) PRIMARY KEY,
    DeptName VARCHAR(100) UNIQUE NOT NULL,
    OfficeNumber VARCHAR(20),
    OfficePhone VARCHAR(20),
    College VARCHAR(100)
);

-- ============================
-- Table: INSTRUCTOR
-- ============================
CREATE TABLE Instructor (
    InstructorID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    DeptCode VARCHAR(10),
    Email VARCHAR(100),
    Phone VARCHAR(20),
    FOREIGN KEY (DeptCode) REFERENCES Department(DeptCode)
);

-- ============================
-- Table: STUDENT
-- ============================
CREATE TABLE Student (
    StudentNumber INT PRIMARY KEY,
    SSN CHAR(9) UNIQUE NOT NULL,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    CurrentStreet VARCHAR(100),
    CurrentCity VARCHAR(50),
    CurrentState VARCHAR(50),
    CurrentZipCode VARCHAR(10),
    CurrentPhone VARCHAR(20),
    PermanentStreet VARCHAR(100),
    PermanentCity VARCHAR(50),
    PermanentState VARCHAR(50),
    PermanentZipCode VARCHAR(10),
    PermanentPhone VARCHAR(20),
    BirthDate DATE,
    Sex CHAR(1),
    Class ENUM('Freshman','Sophomore','Junior','Senior','Graduate'),
    DegreeProgram ENUM('BA','BS','MS','PhD'),
    MajorDeptCode VARCHAR(10) NOT NULL,
    MinorDeptCode VARCHAR(10),
    FOREIGN KEY (MajorDeptCode) REFERENCES Department(DeptCode),
    FOREIGN KEY (MinorDeptCode) REFERENCES Department(DeptCode)
);

-- ============================
-- Table: COURSE
-- ============================
CREATE TABLE Course (
    CourseNumber VARCHAR(10) PRIMARY KEY,
    CourseName VARCHAR(100) NOT NULL,
    Description TEXT,
    SemesterHours INT,
    Level ENUM('Undergraduate','Graduate'),
    DeptCode VARCHAR(10) NOT NULL,
    FOREIGN KEY (DeptCode) REFERENCES Department(DeptCode)
);

-- ============================
-- Table: SECTION
-- ============================
CREATE TABLE Section (
    SectionID INT AUTO_INCREMENT PRIMARY KEY,
    CourseNumber VARCHAR(10) NOT NULL,
    Semester ENUM('Spring','Summer','Fall','Winter') NOT NULL,
    Year YEAR NOT NULL,
    SectionNumber INT NOT NULL,
    InstructorID INT NOT NULL,
    UNIQUE (CourseNumber, Semester, Year, SectionNumber),
    FOREIGN KEY (CourseNumber) REFERENCES Course(CourseNumber),
    FOREIGN KEY (InstructorID) REFERENCES Instructor(InstructorID)
);

-- ============================
-- Table: GRADE_REPORT
-- ============================
CREATE TABLE GradeReport (
    StudentNumber INT NOT NULL,
    SectionID INT NOT NULL,
    LetterGrade CHAR(2),
    NumericGrade INT CHECK (NumericGrade BETWEEN 0 AND 4),
    PRIMARY KEY (StudentNumber, SectionID),
    FOREIGN KEY (StudentNumber) REFERENCES Student(StudentNumber),
    FOREIGN KEY (SectionID) REFERENCES Section(SectionID)
);
