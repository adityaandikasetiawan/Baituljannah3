-- ============================================
-- YAYASAN BAITULJANNAH - MYSQL DATABASE SCHEMA
-- School Management System
-- Version: 1.0.0
-- Date: December 1, 2024
-- ============================================

-- Create Database
CREATE DATABASE IF NOT EXISTS baituljannah_school CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE baituljannah_school;

-- ============================================
-- 1. USERS & AUTHENTICATION
-- ============================================

-- Users Table (All system users)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'admin_unit', 'guru', 'siswa', 'orang_tua') NOT NULL,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires DATETIME,
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_role (role),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User Profiles
CREATE TABLE user_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(50),
    province VARCHAR(50),
    postal_code VARCHAR(10),
    birth_date DATE,
    birth_place VARCHAR(50),
    gender ENUM('L', 'P'),
    photo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sessions
CREATE TABLE sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(500) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_token (token),
    INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 2. SCHOOL UNITS & STRUCTURE
-- ============================================

-- School Units (TKIT, SDIT, SMPIT, SMAIT, SLBIT)
CREATE TABLE school_units (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    level VARCHAR(50) NOT NULL,
    description TEXT,
    accent_color VARCHAR(7) NOT NULL,
    icon VARCHAR(50),
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(100),
    website VARCHAR(100),
    principal_name VARCHAR(100),
    status ENUM('active', 'inactive') DEFAULT 'active',
    established_year YEAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_code (code),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Academic Years
CREATE TABLE academic_years (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    semester ENUM('ganjil', 'genap') NOT NULL,
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_is_active (is_active),
    INDEX idx_dates (start_date, end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Classes
CREATE TABLE classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    school_unit_id INT NOT NULL,
    academic_year_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    level INT NOT NULL,
    homeroom_teacher_id INT,
    capacity INT DEFAULT 30,
    current_students INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_unit_id) REFERENCES school_units(id) ON DELETE CASCADE,
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE,
    FOREIGN KEY (homeroom_teacher_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_school_unit (school_unit_id),
    INDEX idx_academic_year (academic_year_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 3. STUDENTS
-- ============================================

-- Students
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    school_unit_id INT NOT NULL,
    class_id INT,
    nis VARCHAR(20) UNIQUE NOT NULL,
    nisn VARCHAR(20) UNIQUE,
    registration_number VARCHAR(50),
    enrollment_date DATE NOT NULL,
    graduation_date DATE,
    status ENUM('active', 'inactive', 'graduated', 'dropped_out', 'transferred') DEFAULT 'active',
    previous_school VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (school_unit_id) REFERENCES school_units(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_school_unit (school_unit_id),
    INDEX idx_class_id (class_id),
    INDEX idx_nis (nis),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Parents
CREATE TABLE parents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    father_name VARCHAR(100),
    father_occupation VARCHAR(100),
    father_phone VARCHAR(20),
    father_education VARCHAR(50),
    mother_name VARCHAR(100),
    mother_occupation VARCHAR(100),
    mother_phone VARCHAR(20),
    mother_education VARCHAR(50),
    guardian_name VARCHAR(100),
    guardian_relation VARCHAR(50),
    guardian_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Student Parents Relationship
CREATE TABLE student_parents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    parent_id INT NOT NULL,
    relation ENUM('father', 'mother', 'guardian') NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE CASCADE,
    UNIQUE KEY unique_student_parent_relation (student_id, parent_id, relation),
    INDEX idx_student_id (student_id),
    INDEX idx_parent_id (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 4. TEACHERS
-- ============================================

-- Teachers
CREATE TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    school_unit_id INT NOT NULL,
    nip VARCHAR(30) UNIQUE NOT NULL,
    employee_id VARCHAR(50),
    join_date DATE NOT NULL,
    resign_date DATE,
    status ENUM('active', 'inactive', 'resigned') DEFAULT 'active',
    position VARCHAR(100),
    specialization VARCHAR(100),
    education_level VARCHAR(50),
    certification VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (school_unit_id) REFERENCES school_units(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_school_unit (school_unit_id),
    INDEX idx_nip (nip),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 5. ACADEMIC
-- ============================================

-- Subjects
CREATE TABLE subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    school_unit_id INT NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    credit_hours INT DEFAULT 2,
    category ENUM('wajib', 'peminatan', 'muatan_lokal', 'tahfidz') NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_unit_id) REFERENCES school_units(id) ON DELETE CASCADE,
    INDEX idx_school_unit (school_unit_id),
    INDEX idx_code (code),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Class Subjects (Subject assignments to classes)
CREATE TABLE class_subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    class_id INT NOT NULL,
    subject_id INT NOT NULL,
    teacher_id INT NOT NULL,
    academic_year_id INT NOT NULL,
    day_of_week ENUM('senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu') NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE,
    INDEX idx_class_id (class_id),
    INDEX idx_subject_id (subject_id),
    INDEX idx_teacher_id (teacher_id),
    INDEX idx_schedule (day_of_week, start_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Materials
CREATE TABLE materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    class_subject_id INT NOT NULL,
    teacher_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    content LONGTEXT,
    material_type ENUM('document', 'video', 'link', 'presentation', 'other') NOT NULL,
    file_url VARCHAR(255),
    file_size INT,
    views INT DEFAULT 0,
    status ENUM('draft', 'published') DEFAULT 'draft',
    published_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (class_subject_id) REFERENCES class_subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    INDEX idx_class_subject (class_subject_id),
    INDEX idx_teacher_id (teacher_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Assignments
CREATE TABLE assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    class_subject_id INT NOT NULL,
    teacher_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    instructions LONGTEXT,
    assignment_type ENUM('tugas', 'kuis', 'uts', 'uas', 'praktik') NOT NULL,
    max_score INT DEFAULT 100,
    deadline DATETIME NOT NULL,
    allow_late_submission BOOLEAN DEFAULT FALSE,
    late_penalty_percent INT DEFAULT 0,
    file_url VARCHAR(255),
    status ENUM('draft', 'published', 'closed') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (class_subject_id) REFERENCES class_subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    INDEX idx_class_subject (class_subject_id),
    INDEX idx_teacher_id (teacher_id),
    INDEX idx_deadline (deadline),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Assignment Submissions
CREATE TABLE assignment_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    assignment_id INT NOT NULL,
    student_id INT NOT NULL,
    submission_content LONGTEXT,
    file_url VARCHAR(255),
    file_name VARCHAR(255),
    file_size INT,
    submitted_at DATETIME NOT NULL,
    is_late BOOLEAN DEFAULT FALSE,
    score DECIMAL(5,2),
    feedback TEXT,
    graded_at DATETIME,
    graded_by INT,
    status ENUM('submitted', 'graded', 'returned') DEFAULT 'submitted',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (graded_by) REFERENCES teachers(id) ON DELETE SET NULL,
    UNIQUE KEY unique_assignment_student (assignment_id, student_id),
    INDEX idx_assignment_id (assignment_id),
    INDEX idx_student_id (student_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Grades
CREATE TABLE grades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    class_subject_id INT NOT NULL,
    academic_year_id INT NOT NULL,
    grade_type ENUM('tugas', 'kuis', 'uts', 'uas', 'praktek', 'sikap', 'final') NOT NULL,
    score DECIMAL(5,2) NOT NULL,
    max_score INT DEFAULT 100,
    weight DECIMAL(5,2) DEFAULT 1.00,
    description TEXT,
    recorded_by INT NOT NULL,
    recorded_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (class_subject_id) REFERENCES class_subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE,
    FOREIGN KEY (recorded_by) REFERENCES teachers(id) ON DELETE CASCADE,
    INDEX idx_student_id (student_id),
    INDEX idx_class_subject (class_subject_id),
    INDEX idx_academic_year (academic_year_id),
    INDEX idx_grade_type (grade_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 6. ATTENDANCE
-- ============================================

-- Attendance
CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    class_subject_id INT,
    date DATE NOT NULL,
    status ENUM('hadir', 'sakit', 'izin', 'alpa') NOT NULL,
    time_in TIME,
    time_out TIME,
    notes TEXT,
    recorded_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (class_subject_id) REFERENCES class_subjects(id) ON DELETE SET NULL,
    FOREIGN KEY (recorded_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_student_id (student_id),
    INDEX idx_date (date),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 7. FINANCE
-- ============================================

-- Payment Categories
CREATE TABLE payment_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    school_unit_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    amount DECIMAL(12,2) NOT NULL,
    frequency ENUM('monthly', 'semester', 'annual', 'one_time') NOT NULL,
    is_mandatory BOOLEAN DEFAULT TRUE,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_unit_id) REFERENCES school_units(id) ON DELETE CASCADE,
    INDEX idx_school_unit (school_unit_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Student Payments
CREATE TABLE student_payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    payment_category_id INT NOT NULL,
    academic_year_id INT NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    due_date DATE NOT NULL,
    paid_date DATE,
    paid_amount DECIMAL(12,2) DEFAULT 0,
    remaining_amount DECIMAL(12,2),
    payment_method ENUM('cash', 'transfer', 'va', 'qris', 'other'),
    transaction_id VARCHAR(100),
    notes TEXT,
    status ENUM('pending', 'partial', 'paid', 'overdue', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (payment_category_id) REFERENCES payment_categories(id) ON DELETE CASCADE,
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE,
    INDEX idx_student_id (student_id),
    INDEX idx_status (status),
    INDEX idx_due_date (due_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Payment Transactions
CREATE TABLE payment_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_payment_id INT NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    payment_method ENUM('cash', 'transfer', 'va', 'qris', 'other') NOT NULL,
    transaction_id VARCHAR(100) UNIQUE,
    reference_number VARCHAR(100),
    payment_proof VARCHAR(255),
    paid_at DATETIME NOT NULL,
    verified_by INT,
    verified_at DATETIME,
    status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_payment_id) REFERENCES student_payments(id) ON DELETE CASCADE,
    FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_student_payment (student_payment_id),
    INDEX idx_transaction_id (transaction_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 8. LIBRARY
-- ============================================

-- Books
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    school_unit_id INT NOT NULL,
    isbn VARCHAR(20),
    title VARCHAR(200) NOT NULL,
    author VARCHAR(100),
    publisher VARCHAR(100),
    publication_year YEAR,
    category VARCHAR(50),
    language VARCHAR(20) DEFAULT 'Indonesia',
    pages INT,
    stock INT DEFAULT 1,
    available INT DEFAULT 1,
    location VARCHAR(50),
    cover_url VARCHAR(255),
    description TEXT,
    status ENUM('available', 'unavailable') DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_unit_id) REFERENCES school_units(id) ON DELETE CASCADE,
    INDEX idx_school_unit (school_unit_id),
    INDEX idx_isbn (isbn),
    INDEX idx_category (category),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Book Borrowing
CREATE TABLE book_borrowing (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    student_id INT NOT NULL,
    borrowed_date DATE NOT NULL,
    due_date DATE NOT NULL,
    returned_date DATE,
    fine_amount DECIMAL(10,2) DEFAULT 0,
    status ENUM('borrowed', 'returned', 'overdue', 'lost') DEFAULT 'borrowed',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    INDEX idx_book_id (book_id),
    INDEX idx_student_id (student_id),
    INDEX idx_status (status),
    INDEX idx_dates (borrowed_date, due_date, returned_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 9. PPDB (ADMISSION)
-- ============================================

-- PPDB Registrations
CREATE TABLE ppdb_registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    school_unit_id INT NOT NULL,
    academic_year_id INT NOT NULL,
    registration_number VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    nik VARCHAR(20),
    nisn VARCHAR(20),
    birth_place VARCHAR(50),
    birth_date DATE NOT NULL,
    gender ENUM('L', 'P') NOT NULL,
    religion VARCHAR(20),
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(100),
    previous_school VARCHAR(100),
    father_name VARCHAR(100),
    father_occupation VARCHAR(100),
    father_phone VARCHAR(20),
    mother_name VARCHAR(100),
    mother_occupation VARCHAR(100),
    mother_phone VARCHAR(20),
    photo_url VARCHAR(255),
    birth_certificate_url VARCHAR(255),
    family_card_url VARCHAR(255),
    status ENUM('pending', 'verified', 'accepted', 'rejected', 'enrolled') DEFAULT 'pending',
    notes TEXT,
    verified_by INT,
    verified_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_unit_id) REFERENCES school_units(id) ON DELETE CASCADE,
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE,
    FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_school_unit (school_unit_id),
    INDEX idx_academic_year (academic_year_id),
    INDEX idx_registration_number (registration_number),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 10. RECRUITMENT (CAREER)
-- ============================================

-- Job Positions
CREATE TABLE job_positions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    school_unit_id INT,
    title VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    employment_type ENUM('full_time', 'part_time', 'contract', 'internship') NOT NULL,
    description TEXT,
    requirements TEXT,
    responsibilities TEXT,
    qualifications TEXT,
    salary_range VARCHAR(50),
    positions_available INT DEFAULT 1,
    deadline DATE,
    status ENUM('draft', 'open', 'closed') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_unit_id) REFERENCES school_units(id) ON DELETE SET NULL,
    INDEX idx_school_unit (school_unit_id),
    INDEX idx_status (status),
    INDEX idx_deadline (deadline)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Job Applications
CREATE TABLE job_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_position_id INT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    birth_date DATE,
    address TEXT,
    education_level VARCHAR(50),
    major VARCHAR(100),
    university VARCHAR(100),
    graduation_year YEAR,
    experience_years INT DEFAULT 0,
    current_job VARCHAR(100),
    cv_url VARCHAR(255),
    cover_letter TEXT,
    portfolio_url VARCHAR(255),
    status ENUM('pending', 'reviewed', 'interview', 'accepted', 'rejected') DEFAULT 'pending',
    notes TEXT,
    reviewed_by INT,
    reviewed_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (job_position_id) REFERENCES job_positions(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_job_position (job_position_id),
    INDEX idx_status (status),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 11. CONTENT MANAGEMENT
-- ============================================

-- News/Articles
CREATE TABLE news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    school_unit_id INT,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    featured_image VARCHAR(255),
    author_id INT NOT NULL,
    category VARCHAR(50),
    tags VARCHAR(255),
    views INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    published_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_unit_id) REFERENCES school_units(id) ON DELETE SET NULL,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_school_unit (school_unit_id),
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_published_at (published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Gallery
CREATE TABLE gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    school_unit_id INT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    image_url VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(255),
    category VARCHAR(50),
    tags VARCHAR(255),
    uploaded_by INT NOT NULL,
    event_date DATE,
    views INT DEFAULT 0,
    status ENUM('draft', 'published') DEFAULT 'published',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_unit_id) REFERENCES school_units(id) ON DELETE SET NULL,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_school_unit (school_unit_id),
    INDEX idx_category (category),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Achievements
CREATE TABLE achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    school_unit_id INT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    level ENUM('sekolah', 'kecamatan', 'kabupaten', 'provinsi', 'nasional', 'internasional') NOT NULL,
    rank VARCHAR(20),
    student_name VARCHAR(100),
    teacher_name VARCHAR(100),
    achievement_date DATE,
    image_url VARCHAR(255),
    certificate_url VARCHAR(255),
    status ENUM('draft', 'published') DEFAULT 'published',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_unit_id) REFERENCES school_units(id) ON DELETE SET NULL,
    INDEX idx_school_unit (school_unit_id),
    INDEX idx_category (category),
    INDEX idx_level (level),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Programs
CREATE TABLE programs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    school_unit_id INT,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    image_url VARCHAR(255),
    category VARCHAR(50),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_unit_id) REFERENCES school_units(id) ON DELETE SET NULL,
    INDEX idx_school_unit (school_unit_id),
    INDEX idx_slug (slug),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Events
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    school_unit_id INT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    location VARCHAR(200),
    image_url VARCHAR(255),
    category VARCHAR(50),
    max_participants INT,
    current_participants INT DEFAULT 0,
    status ENUM('upcoming', 'ongoing', 'completed', 'cancelled') DEFAULT 'upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (school_unit_id) REFERENCES school_units(id) ON DELETE SET NULL,
    INDEX idx_school_unit (school_unit_id),
    INDEX idx_event_date (event_date),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 12. NOTIFICATIONS & MESSAGES
-- ============================================

-- Notifications
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
    link VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE,
    read_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Messages
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    read_at DATETIME,
    parent_message_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_message_id) REFERENCES messages(id) ON DELETE CASCADE,
    INDEX idx_sender_id (sender_id),
    INDEX idx_receiver_id (receiver_id),
    INDEX idx_is_read (is_read)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 13. SETTINGS & CONFIGURATION
-- ============================================

-- System Settings
CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `key` VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    category VARCHAR(50),
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_key (`key`),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Activity Logs
CREATE TABLE activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id INT,
    description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- END OF SCHEMA
-- ============================================
