-- ============================================
-- SEED DATA - YAYASAN BAITULJANNAH
-- Initial data for testing and development
-- ============================================

USE baituljannah_school;

-- ============================================
-- 1. SCHOOL UNITS
-- ============================================

INSERT INTO school_units (code, name, level, description, accent_color, icon, address, phone, email, website, principal_name, status, established_year) VALUES
('TKIT', 'TKIT Baituljannah', 'TK Islam Terpadu', 'Pendidikan anak usia dini berbasis Islam dengan metode pembelajaran yang menyenangkan dan mengembangkan potensi anak secara optimal melalui pendekatan holistik.', '#10B981', '🎨', 'Jl. Pendidikan No. 1, Jakarta', '021-1234567', 'tkit@baituljannah.sch.id', 'tkit.baituljannah.sch.id', 'Ustadzah Aisyah', 'active', 2010),
('SDIT', 'SDIT Baituljannah', 'SD Islam Terpadu', 'Sekolah Dasar Islam Terpadu dengan kurikulum nasional plus pendidikan agama Islam yang komprehensif untuk membentuk generasi Qurani yang cerdas dan berakhlak mulia.', '#3B82F6', '📚', 'Jl. Pendidikan No. 2, Jakarta', '021-1234568', 'sdit@baituljannah.sch.id', 'sdit.baituljannah.sch.id', 'Ustadz Ahmad Fauzi', 'active', 2010),
('SMPIT', 'SMPIT Baituljannah', 'SMP Islam Terpadu', 'Sekolah Menengah Pertama Islam Terpadu yang mengintegrasikan ilmu pengetahuan dengan nilai-nilai Islam untuk membentuk remaja yang berkarakter dan berprestasi.', '#F97316', '🎓', 'Jl. Pendidikan No. 3, Jakarta', '021-1234569', 'smpit@baituljannah.sch.id', 'smpit.baituljannah.sch.id', 'Ustadz Muhammad Rizki', 'active', 2012),
('SMAIT', 'SMAIT Baituljannah', 'SMA Islam Terpadu', 'Sekolah Menengah Atas Islam Terpadu yang mempersiapkan siswa menjadi pemimpin masa depan yang berakhlak mulia, cerdas, dan siap menghadapi tantangan global.', '#8B5CF6', '🏆', 'Jl. Pendidikan No. 4, Jakarta', '021-1234570', 'smait@baituljannah.sch.id', 'smait.baituljannah.sch.id', 'Ustadz Abdullah Rahman', 'active', 2015),
('SLBIT', 'SLBIT Baituljannah', 'SLB Islam Terpadu', 'Sekolah Luar Biasa Islam Terpadu yang memberikan pendidikan inklusif dengan perhatian khusus untuk setiap siswa berkebutuhan khusus dengan kasih sayang dan profesionalisme.', '#14B8A6', '❤️', 'Jl. Pendidikan No. 5, Jakarta', '021-1234571', 'slbit@baituljannah.sch.id', 'slbit.baituljannah.sch.id', 'Ustadzah Fatimah', 'active', 2018);

-- ============================================
-- 2. ACADEMIC YEARS
-- ============================================

INSERT INTO academic_years (name, start_date, end_date, semester, is_active) VALUES
('2024/2025 Ganjil', '2024-07-15', '2024-12-20', 'ganjil', TRUE),
('2024/2025 Genap', '2025-01-06', '2025-06-25', 'genap', FALSE),
('2025/2026 Ganjil', '2025-07-14', '2025-12-19', 'ganjil', FALSE);

-- ============================================
-- 3. USERS - SUPER ADMIN
-- ============================================

-- Password: Admin123!
INSERT INTO users (username, email, password_hash, role, status, email_verified, last_login) VALUES
('superadmin', 'admin@baituljannah.sch.id', '$2b$10$rZ1qXqEY5qF0Qjx1Z7KX4OvWHmYz4bQqGjT8hKLH2nMxOkW3YzJ0e', 'super_admin', 'active', TRUE, NOW());

INSERT INTO user_profiles (user_id, full_name, phone, address, city, province, gender, photo_url) VALUES
(1, 'Administrator Yayasan', '081234567890', 'Jl. Yayasan No. 1, Jakarta', 'Jakarta', 'DKI Jakarta', 'L', NULL);

-- ============================================
-- 4. USERS - ADMIN UNIT (5 units)
-- ============================================

-- Password for all: Admin123!
INSERT INTO users (username, email, password_hash, role, status, email_verified) VALUES
('admin.tkit', 'admin.tkit@baituljannah.sch.id', '$2b$10$rZ1qXqEY5qF0Qjx1Z7KX4OvWHmYz4bQqGjT8hKLH2nMxOkW3YzJ0e', 'admin_unit', 'active', TRUE),
('admin.sdit', 'admin.sdit@baituljannah.sch.id', '$2b$10$rZ1qXqEY5qF0Qjx1Z7KX4OvWHmYz4bQqGjT8hKLH2nMxOkW3YzJ0e', 'admin_unit', 'active', TRUE),
('admin.smpit', 'admin.smpit@baituljannah.sch.id', '$2b$10$rZ1qXqEY5qF0Qjx1Z7KX4OvWHmYz4bQqGjT8hKLH2nMxOkW3YzJ0e', 'admin_unit', 'active', TRUE),
('admin.smait', 'admin.smait@baituljannah.sch.id', '$2b$10$rZ1qXqEY5qF0Qjx1Z7KX4OvWHmYz4bQqGjT8hKLH2nMxOkW3YzJ0e', 'admin_unit', 'active', TRUE),
('admin.slbit', 'admin.slbit@baituljannah.sch.id', '$2b$10$rZ1qXqEY5qF0Qjx1Z7KX4OvWHmYz4bQqGjT8hKLH2nMxOkW3YzJ0e', 'admin_unit', 'active', TRUE);

INSERT INTO user_profiles (user_id, full_name, phone, address, city, province, gender) VALUES
(2, 'Admin TKIT', '081234567801', 'Jl. TKIT No. 1', 'Jakarta', 'DKI Jakarta', 'P'),
(3, 'Admin SDIT', '081234567802', 'Jl. SDIT No. 1', 'Jakarta', 'DKI Jakarta', 'L'),
(4, 'Admin SMPIT', '081234567803', 'Jl. SMPIT No. 1', 'Jakarta', 'DKI Jakarta', 'L'),
(5, 'Admin SMAIT', '081234567804', 'Jl. SMAIT No. 1', 'Jakarta', 'DKI Jakarta', 'L'),
(6, 'Admin SLBIT', '081234567805', 'Jl. SLBIT No. 1', 'Jakarta', 'DKI Jakarta', 'P');

-- ============================================
-- 5. USERS - TEACHERS (Sample 10 teachers)
-- ============================================

-- Password for all: Guru123!
INSERT INTO users (username, email, password_hash, role, status, email_verified) VALUES
('ustadz.ahmad', 'ahmad@baituljannah.sch.id', '$2b$10$rZ1qXqEY5qF0Qjx1Z7KX4OvWHmYz4bQqGjT8hKLH2nMxOkW3YzJ0e', 'guru', 'active', TRUE),
('ustadzah.fatimah', 'fatimah@baituljannah.sch.id', '$2b$10$rZ1qXqEY5qF0Qjx1Z7KX4OvWHmYz4bQqGjT8hKLH2nMxOkW3YzJ0e', 'guru', 'active', TRUE),
('ustadz.abdullah', 'abdullah@baituljannah.sch.id', '$2b$10$rZ1qXqEY5qF0Qjx1Z7KX4OvWHmYz4bQqGjT8hKLH2nMxOkW3YzJ0e', 'guru', 'active', TRUE),
('ustadzah.aisyah', 'aisyah@baituljannah.sch.id', '$2b$10$rZ1qXqEY5qF0Qjx1Z7KX4OvWHmYz4bQqGjT8hKLH2nMxOkW3YzJ0e', 'guru', 'active', TRUE),
('ustadz.yusuf', 'yusuf@baituljannah.sch.id', '$2b$10$rZ1qXqEY5qF0Qjx1Z7KX4OvWHmYz4bQqGjT8hKLH2nMxOkW3YzJ0e', 'guru', 'active', TRUE);

INSERT INTO user_profiles (user_id, full_name, phone, address, city, province, birth_date, birth_place, gender) VALUES
(7, 'Ustadz Ahmad Fauzi', '081234560001', 'Jl. Guru No. 1', 'Jakarta', 'DKI Jakarta', '1985-05-15', 'Jakarta', 'L'),
(8, 'Ustadzah Fatimah Zahra', '081234560002', 'Jl. Guru No. 2', 'Jakarta', 'DKI Jakarta', '1987-08-20', 'Bandung', 'P'),
(9, 'Ustadz Abdullah Rahman', '081234560003', 'Jl. Guru No. 3', 'Jakarta', 'DKI Jakarta', '1983-03-10', 'Surabaya', 'L'),
(10, 'Ustadzah Aisyah Rahmawati', '081234560004', 'Jl. Guru No. 4', 'Jakarta', 'DKI Jakarta', '1990-12-05', 'Jakarta', 'P'),
(11, 'Ustadz Yusuf Hakim', '081234560005', 'Jl. Guru No. 5', 'Jakarta', 'DKI Jakarta', '1988-07-25', 'Yogyakarta', 'L');

INSERT INTO teachers (user_id, school_unit_id, nip, join_date, status, position, specialization, education_level, certification) VALUES
(7, 2, 'GT-2020-001', '2020-07-15', 'active', 'Guru Matematika', 'Matematika', 'S1', 'Sertifikasi Guru Profesional'),
(8, 3, 'GT-2020-002', '2020-07-15', 'active', 'Guru Bahasa Arab', 'Bahasa Arab', 'S1', 'Sertifikasi Guru Profesional'),
(9, 4, 'GT-2021-003', '2021-07-15', 'active', 'Guru Fisika', 'Fisika', 'S2', 'Sertifikasi Guru Profesional'),
(10, 2, 'GT-2021-004', '2021-07-15', 'active', 'Guru Tahfidz', 'Tahfidz Quran', 'S1', 'Tahfidz 30 Juz'),
(11, 4, 'GT-2022-005', '2022-07-15', 'active', 'Guru Kimia', 'Kimia', 'S1', 'Sertifikasi Guru Profesional');

-- ============================================
-- 6. CLASSES
-- ============================================

INSERT INTO classes (school_unit_id, academic_year_id, name, level, homeroom_teacher_id, capacity, current_students, status) VALUES
-- SDIT Classes
(2, 1, '1A', 1, 1, 30, 28, 'active'),
(2, 1, '1B', 1, NULL, 30, 25, 'active'),
(2, 1, '4A', 4, 1, 30, 30, 'active'),
(2, 1, '4B', 4, 2, 30, 28, 'active'),
-- SMPIT Classes
(3, 1, '7A', 7, 2, 32, 30, 'active'),
(3, 1, '7B', 7, NULL, 32, 28, 'active'),
-- SMAIT Classes
(4, 1, '10A', 10, 3, 32, 30, 'active'),
(4, 1, '10B', 10, NULL, 32, 28, 'active'),
(4, 1, '12A', 12, 3, 30, 28, 'active');

-- ============================================
-- 7. SUBJECTS
-- ============================================

INSERT INTO subjects (school_unit_id, code, name, description, credit_hours, category, status) VALUES
-- SDIT Subjects
(2, 'MTK-SD', 'Matematika', 'Matematika Sekolah Dasar', 4, 'wajib', 'active'),
(2, 'IPA-SD', 'IPA', 'Ilmu Pengetahuan Alam', 3, 'wajib', 'active'),
(2, 'BIND-SD', 'Bahasa Indonesia', 'Bahasa Indonesia SD', 4, 'wajib', 'active'),
(2, 'THFZ-SD', 'Tahfidz Quran', 'Hafalan Quran', 4, 'tahfidz', 'active'),
-- SMAIT Subjects
(4, 'MTK-SMA', 'Matematika', 'Matematika SMA', 4, 'wajib', 'active'),
(4, 'FIS-SMA', 'Fisika', 'Fisika SMA', 4, 'peminatan', 'active'),
(4, 'KIM-SMA', 'Kimia', 'Kimia SMA', 4, 'peminatan', 'active'),
(4, 'BARB-SMA', 'Bahasa Arab', 'Bahasa Arab SMA', 2, 'muatan_lokal', 'active');

-- ============================================
-- 8. USERS - STUDENTS (Sample 5 students)
-- ============================================

-- Password for all: Siswa123!
INSERT INTO users (username, email, password_hash, role, status, email_verified) VALUES
('siswa.rizki', 'rizki@student.baituljannah.sch.id', '$2b$10$rZ1qXqEY5qF0Qjx1Z7KX4OvWHmYz4bQqGjT8hKLH2nMxOkW3YzJ0e', 'siswa', 'active', TRUE),
('siswa.zahra', 'zahra@student.baituljannah.sch.id', '$2b$10$rZ1qXqEY5qF0Qjx1Z7KX4OvWHmYz4bQqGjT8hKLH2nMxOkW3YzJ0e', 'siswa', 'active', TRUE),
('siswa.hassan', 'hassan@student.baituljannah.sch.id', '$2b$10$rZ1qXqEY5qF0Qjx1Z7KX4OvWHmYz4bQqGjT8hKLH2nMxOkW3YzJ0e', 'siswa', 'active', TRUE),
('siswa.maryam', 'maryam@student.baituljannah.sch.id', '$2b$10$rZ1qXqEY5qF0Qjx1Z7KX4OvWHmYz4bQqGjT8hKLH2nMxOkW3YzJ0e', 'siswa', 'active', TRUE),
('siswa.ibrahim', 'ibrahim@student.baituljannah.sch.id', '$2b$10$rZ1qXqEY5qF0Qjx1Z7KX4OvWHmYz4bQqGjT8hKLH2nMxOkW3YzJ0e', 'siswa', 'active', TRUE);

INSERT INTO user_profiles (user_id, full_name, phone, address, city, province, birth_date, birth_place, gender) VALUES
(12, 'Muhammad Rizki Pratama', '081234561001', 'Jl. Siswa No. 1', 'Jakarta', 'DKI Jakarta', '2008-05-15', 'Jakarta', 'L'),
(13, 'Fatimah Zahra', '081234561002', 'Jl. Siswa No. 2', 'Jakarta', 'DKI Jakarta', '2008-08-20', 'Bandung', 'P'),
(14, 'Ali Hassan', '081234561003', 'Jl. Siswa No. 3', 'Jakarta', 'DKI Jakarta', '2013-03-10', 'Surabaya', 'L'),
(15, 'Maryam Azzahra', '081234561004', 'Jl. Siswa No. 4', 'Jakarta', 'DKI Jakarta', '2011-12-05', 'Jakarta', 'P'),
(16, 'Ibrahim Abdullah', '081234561005', 'Jl. Siswa No. 5', 'Jakarta', 'DKI Jakarta', '2012-07-25', 'Yogyakarta', 'L');

INSERT INTO students (user_id, school_unit_id, class_id, nis, nisn, enrollment_date, status) VALUES
(12, 4, 9, '2024001', '0083456789', '2024-07-15', 'active'),
(13, 3, 5, '2024002', '0083456790', '2024-07-15', 'active'),
(14, 2, 1, '2024003', '0093456791', '2024-07-15', 'active'),
(15, 3, 6, '2024004', '0083456792', '2024-07-15', 'active'),
(16, 2, 3, '2024005', '0093456793', '2024-07-15', 'active');

-- ============================================
-- 9. USERS - PARENTS (Sample 3 parents)
-- ============================================

-- Password for all: Parent123!
INSERT INTO users (username, email, password_hash, role, status, email_verified) VALUES
('ortu.ahmad', 'ahmad.fauzi@parent.baituljannah.sch.id', '$2b$10$rZ1qXqEY5qF0Qjx1Z7KX4OvWHmYz4bQqGjT8hKLH2nMxOkW3YzJ0e', 'orang_tua', 'active', TRUE),
('ortu.abdullah', 'abdullah.r@parent.baituljannah.sch.id', '$2b$10$rZ1qXqEY5qF0Qjx1Z7KX4OvWHmYz4bQqGjT8hKLH2nMxOkW3YzJ0e', 'orang_tua', 'active', TRUE),
('ortu.yusuf', 'yusuf.h@parent.baituljannah.sch.id', '$2b$10$rZ1qXqEY5qF0Qjx1Z7KX4OvWHmYz4bQqGjT8hKLH2nMxOkW3YzJ0e', 'orang_tua', 'active', TRUE);

INSERT INTO user_profiles (user_id, full_name, phone, address, city, province, gender) VALUES
(17, 'Bapak Ahmad Fauzi', '081234562001', 'Jl. Orangtua No. 1', 'Jakarta', 'DKI Jakarta', 'L'),
(18, 'Bapak Abdullah Rahman', '081234562002', 'Jl. Orangtua No. 2', 'Jakarta', 'DKI Jakarta', 'L'),
(19, 'Bapak Yusuf Hakim', '081234562003', 'Jl. Orangtua No. 3', 'Jakarta', 'DKI Jakarta', 'L');

INSERT INTO parents (user_id, father_name, father_occupation, father_phone, mother_name, mother_occupation, mother_phone) VALUES
(17, 'Ahmad Fauzi', 'Pengusaha', '081234562001', 'Siti Aisyah', 'Ibu Rumah Tangga', '081234562011'),
(18, 'Abdullah Rahman', 'PNS', '081234562002', 'Fatimah Zahra', 'Guru', '081234562012'),
(19, 'Yusuf Hakim', 'Dokter', '081234562003', 'Khadijah', 'Dokter', '081234562013');

INSERT INTO student_parents (student_id, parent_id, relation, is_primary) VALUES
(1, 1, 'father', TRUE),
(2, 2, 'father', TRUE),
(3, 3, 'father', TRUE);

-- ============================================
-- 10. PAYMENT CATEGORIES
-- ============================================

INSERT INTO payment_categories (school_unit_id, name, description, amount, frequency, is_mandatory, status) VALUES
-- SDIT
(2, 'SPP Bulanan', 'Sumbangan Pembinaan Pendidikan', 500000, 'monthly', TRUE, 'active'),
(2, 'Uang Bangunan', 'Kontribusi Pembangunan Gedung', 5000000, 'one_time', TRUE, 'active'),
(2, 'Uang Seragam', 'Pembelian Seragam Sekolah', 1000000, 'annual', TRUE, 'active'),
-- SMAIT
(4, 'SPP Bulanan', 'Sumbangan Pembinaan Pendidikan', 750000, 'monthly', TRUE, 'active'),
(4, 'Uang Kegiatan', 'Dana Kegiatan Ekstrakurikuler', 500000, 'semester', TRUE, 'active');

-- ============================================
-- 11. BOOKS
-- ============================================

INSERT INTO books (school_unit_id, isbn, title, author, publisher, publication_year, category, pages, stock, available, location, status) VALUES
(2, '978-602-123-456-7', 'Fiqih Sunnah Jilid 1', 'Sayyid Sabiq', 'Pena Pundi Aksara', 2015, 'Agama', 450, 15, 12, 'Rak A-1', 'available'),
(2, '978-602-123-456-8', 'Tafsir Ibnu Katsir Jilid 1', 'Ibnu Katsir', 'Pustaka Imam Syafii', 2016, 'Agama', 600, 10, 7, 'Rak A-2', 'available'),
(2, '978-602-123-456-9', 'Matematika Kelas 4 SD', 'Tim Penulis', 'Erlangga', 2022, 'Pelajaran', 200, 50, 15, 'Rak B-1', 'available'),
(4, '978-602-234-567-1', 'Fisika untuk SMA Kelas 10', 'Marthen Kanginan', 'Erlangga', 2021, 'Pelajaran', 350, 40, 32, 'Rak C-1', 'available'),
(4, '978-602-234-567-2', 'Kimia untuk SMA Kelas 10', 'Michael Purba', 'Erlangga', 2021, 'Pelajaran', 320, 40, 35, 'Rak C-2', 'available');

-- ============================================
-- 12. NEWS
-- ============================================

INSERT INTO news (school_unit_id, title, slug, excerpt, content, author_id, category, is_featured, status, published_at) VALUES
(NULL, 'Peringatan Maulid Nabi Muhammad SAW 1446 H', 'maulid-nabi-1446h', 'Yayasan Baituljannah mengadakan peringatan Maulid Nabi Muhammad SAW dengan berbagai kegiatan.', 'Alhamdulillah, pada hari Senin, 15 Desember 2024, Yayasan Baituljannah mengadakan peringatan Maulid Nabi Muhammad SAW yang diikuti oleh seluruh siswa dari TKIT hingga SLBIT. Kegiatan dimulai dengan pembacaan Al-Quran, dilanjutkan dengan ceramah tentang sirah nabawiyah, dan ditutup dengan pentas seni Islami yang meriah.', 1, 'Event', TRUE, 'published', '2024-12-01 08:00:00'),
(4, 'Siswa SMAIT Juara Olimpiade Matematika', 'juara-olimpiade-matematika', 'Muhammad Rizki berhasil meraih juara 1 Olimpiade Matematika Tingkat Provinsi.', 'Prestasi membanggakan kembali ditorehkan oleh siswa SMAIT Baituljannah. Muhammad Rizki dari kelas XII IPA berhasil meraih juara 1 dalam Olimpiade Matematika Tingkat Provinsi yang diselenggarakan di Jakarta Convention Center.', 1, 'Prestasi', TRUE, 'published', '2024-11-28 10:00:00'),
(2, 'Wisuda Tahfidz SDIT 10 Juz', 'wisuda-tahfidz-10-juz', 'Sebanyak 50 siswa SDIT berhasil menyelesaikan hafalan 10 juz Al-Quran.', 'Alhamdulillah, pada tanggal 20 Januari 2025, sebanyak 50 siswa SDIT Baituljannah akan diwisuda setelah berhasil menyelesaikan hafalan 10 juz Al-Quran.', 3, 'Akademik', FALSE, 'published', '2024-11-25 09:00:00');

-- ============================================
-- 13. ACHIEVEMENTS
-- ============================================

INSERT INTO achievements (school_unit_id, title, description, category, level, rank, student_name, teacher_name, achievement_date, status) VALUES
(4, 'Juara 1 Olimpiade Matematika Provinsi', 'Olimpiade Matematika tingkat Provinsi DKI Jakarta', 'Akademik', 'provinsi', 'Juara 1', 'Muhammad Rizki Pratama', 'Ustadz Ahmad Fauzi', '2024-11-15', 'published'),
(3, 'Juara 2 Lomba Pidato Bahasa Arab', 'Lomba pidato Bahasa Arab tingkat Nasional', 'Bahasa', 'nasional', 'Juara 2', 'Fatimah Zahra', 'Ustadzah Fatimah Zahra', '2024-10-20', 'published'),
(2, 'Juara 1 Tahfidz 5 Juz', 'Kompetisi Tahfidz Al-Quran tingkat Kabupaten', 'Agama', 'kabupaten', 'Juara 1', 'Ali Hassan', 'Ustadzah Aisyah Rahmawati', '2024-09-10', 'published');

-- ============================================
-- 14. PROGRAMS
-- ============================================

INSERT INTO programs (school_unit_id, title, slug, description, icon, category, status) VALUES
(NULL, 'Program Tahfidz Quran', 'tahfidz-quran', 'Program unggulan hafalan Al-Quran dengan metode terbukti efektif', '📖', 'Akademik', 'active'),
(NULL, 'Pembelajaran Berbasis Teknologi', 'pembelajaran-teknologi', 'Integrasi teknologi dalam proses pembelajaran modern', '💻', 'Akademik', 'active'),
(NULL, 'Character Building', 'character-building', 'Pembentukan karakter Islami melalui berbagai kegiatan', '🎯', 'Karakter', 'active'),
(NULL, 'Ekstrakurikuler Olahraga', 'ekstrakurikuler-olahraga', 'Berbagai cabang olahraga untuk mengembangkan bakat siswa', '⚽', 'Ekstrakurikuler', 'active');

-- ============================================
-- 15. SETTINGS
-- ============================================

INSERT INTO settings (`key`, value, description, category, is_public) VALUES
('site_name', 'Yayasan Baituljannah', 'Nama website', 'general', TRUE),
('site_description', 'Yayasan Pendidikan Islam Terpadu', 'Deskripsi website', 'general', TRUE),
('contact_email', 'info@baituljannah.sch.id', 'Email kontak', 'contact', TRUE),
('contact_phone', '021-1234567', 'Nomor telepon', 'contact', TRUE),
('contact_address', 'Jl. Pendidikan No. 1-5, Jakarta', 'Alamat lengkap', 'contact', TRUE),
('ppdb_open', '1', 'Status PPDB (1=buka, 0=tutup)', 'ppdb', TRUE),
('academic_year_active', '2024/2025 Ganjil', 'Tahun ajaran aktif', 'academic', FALSE);

-- ============================================
-- 16. PPDB (Penerimaan Peserta Didik Baru)
-- ============================================

INSERT INTO ppdb_periods (school_unit_id, name, start_date, end_date, description, status) VALUES
(1, 'Gelombang 1 TKIT 2025/2026', '2024-10-01', '2024-12-31', 'Pendaftaran gelombang pertama untuk TKIT', 'active'),
(2, 'Gelombang 1 SDIT 2025/2026', '2024-10-01', '2024-12-31', 'Pendaftaran gelombang pertama untuk SDIT', 'active');

-- ============================================
-- 17. Recruitment / Karir
-- ============================================

INSERT INTO job_postings (title, slug, type, description, requirements, department, location, close_date, status) VALUES
('Guru Matematika SD', 'guru-matematika-sd', 'full_time', 'Mencari guru matematika yang berdedikasi.', '- Lulusan S1 Pendidikan Matematika\n- Berpengalaman minimal 1 tahun\n- Menyukai dunia anak-anak', 'Akademik SDIT', 'Jakarta', '2024-12-31', 'published'),
('Staff Administrasi', 'staff-administrasi', 'contract', 'Staff administrasi untuk unit TKIT.', '- Lulusan D3/S1 Manajemen/Administrasi\n- Menguasai Ms. Office', 'Tata Usaha', 'Jakarta', '2024-11-30', 'published');

-- ============================================
-- 18. CMS Content (Sliders, Testimonials, FAQ)
-- ============================================

INSERT INTO sliders (title, image, subtitle, button_text, button_url, `order`, status) VALUES
('Selamat Datang di Baituljannah', '/uploads/hero/hero_1769592571870_m7ehtcua18j.webp', 'Membangun Generasi Rabbani Berprestasi', 'Daftar Sekarang', '/admission', 1, 'active'),
('Pendidikan Berkualitas', '/uploads/hero/hero_1769592838236_ttv2yfpxyb.webp', 'Kurikulum Terpadu Ilmu Umum dan Agama', 'Lihat Program', '/program', 2, 'active');

INSERT INTO testimonials (name, role, content, image, rating, status) VALUES
('Budi Santoso', 'Wali Murid SDIT', 'Sekolah yang sangat bagus untuk perkembangan karakter anak. Guru-gurunya ramah dan profesional.', NULL, 5, 'published'),
('Siti Aminah', 'Alumni 2015', 'Banyak ilmu dan pengalaman berharga yang saya dapatkan selama bersekolah di sini.', NULL, 5, 'published');

INSERT INTO faq (question, answer, category, `order`, status) VALUES
('Bagaimana cara mendaftar sekolah?', 'Pendaftaran dapat dilakukan secara online melalui menu PPDB atau datang langsung ke sekolah.', 'PPDB', 1, 'published'),
('Apakah ada layanan antar jemput?', 'Ya, kami menyediakan layanan antar jemput untuk wilayah tertentu. Silakan hubungi admin untuk detail rutenya.', 'Fasilitas', 2, 'published');

-- ============================================
-- END OF SEED DATA
-- ============================================
