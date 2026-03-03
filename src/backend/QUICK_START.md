# ⚡ Quick Start Guide - Baituljannah Backend

Panduan cepat untuk menjalankan backend API dalam 5 menit!

---

## 🚀 **5-Minute Setup**

### Step 1: Install Dependencies (1 min)

```bash
cd backend
npm install
```

### Step 2: Setup Environment (1 min)

```bash
# Copy environment template
cp .env.example .env

# Edit dengan text editor favorit
nano .env
```

**Minimal configuration:**
```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=baituljannah_db
JWT_SECRET=change_this_to_random_string_min_32_chars
```

### Step 3: Setup Database (2 min)

```bash
# Login ke MySQL
mysql -u root -p

# Create database
CREATE DATABASE baituljannah_db;
exit;
```

**Import minimal tables untuk testing:**

```sql
-- Table: users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  role ENUM('admin', 'guru', 'siswa', 'ortu') DEFAULT 'siswa',
  phone VARCHAR(20),
  avatar VARCHAR(255),
  is_active TINYINT(1) DEFAULT 1,
  last_login DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: news
CREATE TABLE news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  category ENUM('Akademik', 'Kegiatan', 'Prestasi', 'Pengumuman', 'Lainnya') DEFAULT 'Lainnya',
  unit_sekolah ENUM('TKIT', 'SDIT', 'SMPIT', 'SMAIT', 'SLBIT', 'Semua') DEFAULT 'Semua',
  image_url VARCHAR(255),
  author_id INT,
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  views INT DEFAULT 0,
  publish_date DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: ppdb_registrations
CREATE TABLE ppdb_registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  no_pendaftaran VARCHAR(50) UNIQUE NOT NULL,
  nama_lengkap VARCHAR(100) NOT NULL,
  jenjang ENUM('TKIT', 'SDIT', 'SMPIT', 'SMAIT', 'SLBIT') NOT NULL,
  jenis_kelamin ENUM('L', 'P') NOT NULL,
  tempat_lahir VARCHAR(100),
  tanggal_lahir DATE NOT NULL,
  nik VARCHAR(20),
  alamat TEXT NOT NULL,
  kota VARCHAR(100),
  provinsi VARCHAR(100),
  kode_pos VARCHAR(10),
  nama_ayah VARCHAR(100) NOT NULL,
  pekerjaan_ayah VARCHAR(100),
  nama_ibu VARCHAR(100) NOT NULL,
  pekerjaan_ibu VARCHAR(100),
  no_telp VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  asal_sekolah VARCHAR(100),
  prestasi TEXT,
  informasi_dari VARCHAR(100),
  status ENUM('pending', 'verified', 'approved', 'rejected', 'registered') DEFAULT 'pending',
  catatan TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: contact_messages
CREATE TABLE contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  unit_sekolah VARCHAR(50) DEFAULT 'Umum',
  status ENUM('unread', 'read', 'replied', 'archived') DEFAULT 'unread',
  reply TEXT,
  read_at DATETIME,
  replied_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

**Insert admin user:**

```sql
-- Password: Admin123!
INSERT INTO users (username, email, password, full_name, role, is_active)
VALUES (
  'admin',
  'admin@baituljannah.sch.id',
  '$2a$10$YbQQKGLPRLNLvfqJLM5dYuqZ5mW7nU3m5Xc0wRWJKEVJk5vYPw5Ly',
  'Administrator',
  'admin',
  1
);
```

### Step 4: Start Server (30 seconds)

```bash
npm run dev
```

**Expected output:**
```
============================================================
🚀 BAITULJANNAH SCHOOL MANAGEMENT SYSTEM API
============================================================
✅ MySQL Database Connected Successfully
📊 Database: baituljannah_db
📍 Server running on port: 5000
🌍 Environment: development
📡 API Version: v1
🔗 URL: http://localhost:5000
💚 Health Check: http://localhost:5000/health
============================================================
```

### Step 5: Test API (30 seconds)

Open browser atau curl:

```bash
# Health check
curl http://localhost:5000/health

# Test login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@baituljannah.sch.id",
    "password": "Admin123!"
  }'
```

---

## 🎉 **Done! API is Running**

Your backend is now running at: **http://localhost:5000**

---

## 🧪 **Quick Test Commands**

### 1. Health Check
```bash
curl http://localhost:5000/health
```

### 2. Login as Admin
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@baituljannah.sch.id",
    "password": "Admin123!"
  }'
```

**Copy the token from response!**

### 3. Get Current User
```bash
curl http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Get News (Public)
```bash
curl http://localhost:5000/api/v1/news
```

### 5. Create News (Admin only)
```bash
curl -X POST http://localhost:5000/api/v1/news \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test News",
    "content": "This is a test news article",
    "category": "Pengumuman",
    "status": "published"
  }'
```

---

## 📁 **Project Structure Overview**

```
backend/
├── config/           # Configuration files
├── controllers/      # Business logic
├── middleware/       # Auth, validation, error handling
├── routes/          # API routes
├── utils/           # Helper functions
├── server.js        # Main entry point
└── .env             # Environment variables
```

---

## 🔑 **Default Credentials**

**Admin Account:**
- Email: `admin@baituljannah.sch.id`
- Password: `Admin123!`

⚠️ **IMPORTANT:** Ganti password ini setelah login pertama kali!

---

## 📚 **Available Endpoints**

### Authentication
- `POST /api/v1/auth/register` - Register user baru
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get current user (protected)
- `PUT /api/v1/auth/updatedetails` - Update profile (protected)
- `PUT /api/v1/auth/updatepassword` - Update password (protected)

### News
- `GET /api/v1/news` - Get all news (public)
- `GET /api/v1/news/latest` - Get latest news (public)
- `GET /api/v1/news/:id` - Get single news (public)
- `POST /api/v1/news` - Create news (admin/guru)
- `PUT /api/v1/news/:id` - Update news (admin/author)
- `DELETE /api/v1/news/:id` - Delete news (admin)

### PPDB
- `POST /api/v1/ppdb/register` - Submit registration (public)
- `GET /api/v1/ppdb/check/:no` - Check registration (public)
- `GET /api/v1/ppdb/registrations` - Get all (admin)
- `PUT /api/v1/ppdb/registrations/:id/status` - Update status (admin)
- `GET /api/v1/ppdb/statistics` - Get statistics (admin)

### Contact
- `POST /api/v1/contact` - Submit contact form (public)
- `GET /api/v1/contact` - Get all messages (admin)
- `GET /api/v1/contact/:id` - Get message (admin)
- `PUT /api/v1/contact/:id/status` - Update status (admin)
- `DELETE /api/v1/contact/:id` - Delete message (admin)

---

## ⚡ **Common Commands**

```bash
# Install dependencies
npm install

# Run development server (with auto-reload)
npm run dev

# Run production server
npm start

# Check server status
curl http://localhost:5000/health

# View logs (if using PM2)
pm2 logs baituljannah-api
```

---

## 🐛 **Troubleshooting**

### Error: "Database connection failed"
```bash
# Check MySQL is running
sudo systemctl status mysql

# Verify credentials
mysql -u root -p

# Check .env file
cat .env | grep DB_
```

### Error: "Port 5000 already in use"
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>

# Or change port in .env
PORT=5001
```

### Error: "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📖 **Next Steps**

1. ✅ **Read Full Documentation:** `README.md`
2. ✅ **Test All Endpoints:** `API_TESTING_GUIDE.md`
3. ✅ **Setup Frontend:** Connect React frontend to this API
4. ✅ **Configure Email:** Setup SMTP for notifications
5. ✅ **Deploy:** Follow deployment guide in README

---

## 💡 **Tips**

- Use **Postman** or **Insomnia** for easier API testing
- Install **jq** for pretty JSON output: `brew install jq`
- Use **nodemon** for auto-reload during development (already configured)
- Check logs in terminal for debugging

---

## 📞 **Need Help?**

- 📖 Full Documentation: `README.md`
- 🧪 Testing Guide: `API_TESTING_GUIDE.md`
- 🐛 Issues: Create GitHub issue
- 📧 Email: dev@baituljannah.sch.id

---

**Happy Coding! 🚀**
