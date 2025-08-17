# University Database ER Diagram Specifications

## Entity Types and Key Attributes

### 1. STUDENT
**Primary Keys:** StudentNumber, SSN (both unique)
**Attributes:**
- StudentNumber (unique identifier)
- SSN (unique identifier)
- Name (composite: FirstName, LastName)
- CurrentAddress (composite: Street, City, State, ZipCode)
- CurrentPhone
- PermanentAddress (composite: Street, City, State, ZipCode)
- PermanentPhone
- BirthDate
- Sex
- Class (freshman, sophomore, junior, senior, graduate)
- DegreeProgram (B.A., B.S., M.S., Ph.D., etc.)

### 2. DEPARTMENT
**Primary Keys:** DeptCode, DeptName (both unique)
**Attributes:**
- DeptCode (unique identifier)
- DeptName (unique identifier)
- OfficeNumber
- OfficePhone
- College

### 3. COURSE
**Primary Key:** CourseNumber
**Attributes:**
- CourseNumber (unique identifier)
- CourseName
- Description
- SemesterHours
- Level (undergraduate, graduate)

### 4. SECTION
**Composite Primary Key:** (CourseNumber, Semester, Year, SectionNumber)
**Attributes:**
- SectionNumber (distinguishes sections of same course in same semester/year)
- Semester
- Year
- CourseNumber (foreign key from COURSE)
- Instructor

### 5. GRADE_REPORT
**Composite Primary Key:** (StudentNumber, SectionID)
**Attributes:**
- StudentNumber (foreign key from STUDENT)
- SectionID (composite foreign key referencing SECTION)
- LetterGrade
- NumericGrade (0, 1, 2, 3, or 4)

## Relationship Types and Structural Constraints

### 1. MAJORS_IN (STUDENT ↔ DEPARTMENT)
- **Cardinality:** N:1 (Many students to one department)
- **Participation:** Total participation by STUDENT (every student must have a major)
- **Participation:** Partial participation by DEPARTMENT (not all departments need to have majors)

### 2. MINORS_IN (STUDENT ↔ DEPARTMENT)
- **Cardinality:** N:1 (Many students to one department)
- **Participation:** Partial participation by STUDENT (minor is optional)
- **Participation:** Partial participation by DEPARTMENT (not all departments need to have minors)

### 3. OFFERS (DEPARTMENT ↔ COURSE)
- **Cardinality:** 1:N (One department offers many courses)
- **Participation:** Total participation by COURSE (every course must be offered by a department)
- **Participation:** Partial participation by DEPARTMENT (departments may not offer courses)

### 4. SECTION_OF (COURSE ↔ SECTION)
- **Cardinality:** 1:N (One course has many sections)
- **Participation:** Total participation by SECTION (every section belongs to a course)
- **Participation:** Partial participation by COURSE (courses may not have current sections)

### 5. ENROLLED_IN (STUDENT ↔ SECTION)
- **Cardinality:** M:N (Many students enrolled in many sections)
- **Participation:** Partial participation by both entities
- **Note:** This relationship is actually captured through GRADE_REPORT entity

## Additional Constraints and Business Rules

### Integrity Constraints:
1. **Student Uniqueness:** Both StudentNumber and SSN must be unique across all students
2. **Department Uniqueness:** Both DeptCode and DeptName must be unique
3. **Course Uniqueness:** CourseNumber must be unique across all courses
4. **Section Uniqueness:** The combination of (CourseNumber, Semester, Year, SectionNumber) must be unique
5. **Grade Constraints:** NumericGrade must be in {0, 1, 2, 3, 4}

### Referential Integrity:
1. Major department in STUDENT must reference an existing DEPARTMENT
2. Minor department in STUDENT (if specified) must reference an existing DEPARTMENT
3. Offering department in COURSE must reference an existing DEPARTMENT
4. CourseNumber in SECTION must reference an existing COURSE
5. StudentNumber in GRADE_REPORT must reference an existing STUDENT
6. Section reference in GRADE_REPORT must reference an existing SECTION

## Assumptions Made

### 1. Student-Department Relationships:
- Each student has exactly one major department
- Each student can have at most one minor department (optional)
- A student cannot major and minor in the same department

### 2. Course-Department Relationships:
- Each course is offered by exactly one department
- Departments can offer multiple courses

### 3. Section Management:
- Section numbers start from 1 for each course in each semester/year
- The same course can have multiple sections in the same semester
- Each section has one primary instructor

### 4. Grade Reporting:
- GRADE_REPORT serves as both the enrollment record and grade record
- A student receives exactly one grade per section enrolled
- Both letter grades and numeric grades are stored for flexibility

### 5. Address Handling:
- Both current and permanent addresses are stored as composite attributes
- The system needs to support queries on city, state, and ZIP code of permanent address

## Unspecified Requirements Addressed

1. **Degree Program Storage:** Added DegreeProgram attribute to STUDENT entity
2. **Address Structure:** Modeled addresses as composite attributes with city, state, ZIP components
3. **Name Structure:** Modeled Name as composite attribute to support last name queries
4. **Section Identification:** Created composite key for SECTION to ensure uniqueness
5. **Grade Report as Entity:** Treated GRADE_REPORT as a separate entity rather than just a relationship due to its attributes
6. **Multiple Unique Keys:** Handled both SSN and StudentNumber as unique identifiers for students
