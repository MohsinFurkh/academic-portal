# Database Systems Experiment 3: DDL and DML Commands with Key Constraints

## Objective
To understand the concept of designing database tables using DDL commands, populating tables with DML commands, and implementing data constraints focusing on Primary Key and Foreign Key relationships.

## Prerequisites
- Basic understanding of relational database concepts
- Access to a database management system (MySQL, PostgreSQL, SQL Server, or SQLite)
- SQL client or command-line interface

## Theory Overview

### DDL (Data Definition Language) Commands
- **CREATE**: Creates database objects (tables, indexes, views)
- **ALTER**: Modifies existing database objects
- **DROP**: Deletes database objects
- **TRUNCATE**: Removes all data from a table

### DML (Data Manipulation Language) Commands
- **INSERT**: Adds new records to a table
- **UPDATE**: Modifies existing records
- **DELETE**: Removes records from a table
- **SELECT**: Retrieves data from tables

### Key Constraints
- **Primary Key**: Uniquely identifies each record in a table
- **Foreign Key**: Establishes relationships between tables and maintains referential integrity

## Experiment Procedure

### Step 1: Database Schema Design

Design a simple university management system with the following entities:
- **Students**: Information about students
- **Courses**: Information about courses
- **Enrollments**: Student course registrations

### Step 2: Create Database and Tables (DDL Commands)

```sql
-- Create database
CREATE DATABASE university_db;
USE university_db;

-- Create Students table
CREATE TABLE Students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    date_of_birth DATE,
    enrollment_date DATE DEFAULT CURRENT_DATE
);

-- Create Courses table
CREATE TABLE Courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_code VARCHAR(10) UNIQUE NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    credits INT CHECK (credits > 0),
    department VARCHAR(50)
);

-- Create Enrollments table with foreign key constraints
CREATE TABLE Enrollments (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    course_id INT,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    grade CHAR(2),
    FOREIGN KEY (student_id) REFERENCES Students(student_id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Courses(course_id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE(student_id, course_id)
);
```

### Step 3: Insert Sample Data (DML Commands)

```sql
-- Insert data into Students table
INSERT INTO Students (first_name, last_name, email, date_of_birth) VALUES
('John', 'Doe', 'john.doe@university.edu', '2000-05-15'),
('Jane', 'Smith', 'jane.smith@university.edu', '2001-03-22'),
('Mike', 'Johnson', 'mike.johnson@university.edu', '1999-11-08'),
('Sarah', 'Williams', 'sarah.williams@university.edu', '2000-09-12');

-- Insert data into Courses table
INSERT INTO Courses (course_code, course_name, credits, department) VALUES
('CS101', 'Introduction to Computer Science', 3, 'Computer Science'),
('MATH201', 'Calculus II', 4, 'Mathematics'),
('ENG102', 'English Composition', 3, 'English'),
('PHYS101', 'General Physics', 4, 'Physics');

-- Insert data into Enrollments table
INSERT INTO Enrollments (student_id, course_id, grade) VALUES
(1, 1, 'A'),
(1, 2, 'B+'),
(2, 1, 'A-'),
(2, 3, 'B'),
(3, 2, 'C+'),
(3, 4, 'B-'),
(4, 1, 'A'),
(4, 3, 'A-');
```

### Step 4: Test Constraint Violations

#### Test Primary Key Constraints
```sql
-- This should fail - duplicate primary key
INSERT INTO Students (student_id, first_name, last_name, email) 
VALUES (1, 'Test', 'User', 'test@university.edu');

-- This should fail - NULL primary key (if not auto-increment)
INSERT INTO Students (student_id, first_name, last_name, email) 
VALUES (NULL, 'Test', 'User', 'test2@university.edu');
```

#### Test Foreign Key Constraints
```sql
-- This should fail - invalid student_id reference
INSERT INTO Enrollments (student_id, course_id) VALUES (999, 1);

-- This should fail - invalid course_id reference
INSERT INTO Enrollments (student_id, course_id) VALUES (1, 999);
```

#### Test Unique Constraints
```sql
-- This should fail - duplicate email
INSERT INTO Students (first_name, last_name, email, date_of_birth) 
VALUES ('Another', 'User', 'john.doe@university.edu', '2000-01-01');

-- This should fail - duplicate enrollment
INSERT INTO Enrollments (student_id, course_id) VALUES (1, 1);
```

### Step 5: Data Retrieval and Analysis

```sql
-- Basic SELECT queries
SELECT * FROM Students;
SELECT * FROM Courses;
SELECT * FROM Enrollments;

-- JOIN queries to see relationships
SELECT 
    s.first_name, 
    s.last_name, 
    c.course_name, 
    e.grade
FROM Students s
JOIN Enrollments e ON s.student_id = e.student_id
JOIN Courses c ON e.course_id = c.course_id
ORDER BY s.last_name, s.first_name;

-- Count enrollments per student
SELECT 
    s.first_name, 
    s.last_name, 
    COUNT(e.enrollment_id) as total_courses
FROM Students s
LEFT JOIN Enrollments e ON s.student_id = e.student_id
GROUP BY s.student_id, s.first_name, s.last_name;
```

### Step 6: Modify Data Structure (Advanced DDL)

```sql
-- Add a new column to Students table
ALTER TABLE Students ADD COLUMN phone VARCHAR(15);

-- Update existing records
UPDATE Students 
SET phone = '555-0123' 
WHERE student_id = 1;

-- Add a check constraint
ALTER TABLE Students 
ADD CONSTRAINT chk_email 
CHECK (email LIKE '%@%.%');
```

### Step 7: Test Referential Integrity

```sql
-- Try to delete a student who has enrollments
-- This should cascade and delete related enrollments
DELETE FROM Students WHERE student_id = 1;

-- Verify the cascade effect
SELECT * FROM Enrollments WHERE student_id = 1;

-- Try to delete a course that has enrollments
DELETE FROM Courses WHERE course_id = 1;
```

## Expected Outcomes and Observations

### Successful Operations
1. **Table Creation**: All tables should be created successfully with proper constraints
2. **Data Insertion**: Valid data should be inserted without errors
3. **Constraint Enforcement**: Invalid data should be rejected with appropriate error messages
4. **Referential Integrity**: Foreign key relationships should be maintained

### Constraint Violation Tests
1. **Primary Key Violations**: 
   - Duplicate values should be rejected
   - NULL values should be rejected (unless auto-increment)

2. **Foreign Key Violations**:
   - References to non-existent records should be rejected
   - Cascade operations should work as defined

3. **Unique Constraint Violations**:
   - Duplicate unique values should be rejected

## Lab Report Structure

### 1. Introduction
- Brief explanation of DDL and DML
- Importance of data constraints in database design

### 2. Methodology
- Database schema design rationale
- Step-by-step procedure followed

### 3. Results
- Screenshots of successful table creation
- Examples of successful data insertion
- Error messages from constraint violations
- Query results showing data relationships

### 4. Analysis
- Discussion of how primary keys ensure entity integrity
- Explanation of how foreign keys maintain referential integrity
- Analysis of constraint violation outcomes

### 5. Conclusion
- Summary of key learnings
- Importance of proper constraint design
- Real-world applications

## Additional Exercises

### Exercise 1: Complex Relationships
Create additional tables (e.g., Professors, Departments) and establish more complex foreign key relationships.

### Exercise 2: Constraint Modification
Practice adding and dropping constraints on existing tables.

### Exercise 3: Data Migration
Transfer data between tables while maintaining referential integrity.

## Common Issues and Solutions

### Issue 1: Foreign Key Creation Fails
**Cause**: Referenced table/column doesn't exist or has different data type
**Solution**: Ensure referenced table exists and data types match exactly

### Issue 2: Cannot Delete Referenced Record
**Cause**: Foreign key constraint prevents deletion
**Solution**: Either delete dependent records first or use CASCADE options

### Issue 3: Primary Key Violation on Insert
**Cause**: Attempting to insert duplicate or NULL primary key
**Solution**: Use AUTO_INCREMENT or ensure unique values

## Assessment Criteria

1. **Understanding of DDL Commands** (25%)
   - Correct table creation syntax
   - Proper constraint definition

2. **Understanding of DML Commands** (25%)
   - Successful data insertion and manipulation
   - Proper query syntax

3. **Constraint Implementation** (30%)
   - Correct primary key implementation
   - Proper foreign key relationships
   - Understanding of referential integrity

4. **Problem-Solving** (20%)
   - Ability to identify and resolve constraint violations
   - Understanding of error messages and solutions

## Tools and Resources

### Recommended Database Systems
- **MySQL Workbench**: User-friendly GUI with visual schema design
- **phpMyAdmin**: Web-based MySQL administration
- **PostgreSQL pgAdmin**: Comprehensive PostgreSQL management
- **SQLite Browser**: Lightweight option for beginners

### Useful Commands for Verification
```sql
-- Show table structure
DESCRIBE table_name;
-- or
SHOW CREATE TABLE table_name;

-- Show constraints
SHOW CREATE TABLE table_name;

-- Check foreign key relationships
SELECT 
    CONSTRAINT_NAME,
    TABLE_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE REFERENCED_TABLE_NAME IS NOT NULL;
```

This experiment provides comprehensive hands-on experience with database design principles, constraint implementation, and the practical application of DDL and DML commands in maintaining data integrity.