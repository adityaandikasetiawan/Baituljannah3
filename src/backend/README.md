# 🚀 Baituljannah School Management System - Backend API

Backend API untuk sistem manajemen sekolah Yayasan Baituljannah yang dibangun dengan **Node.js**, **Express**, dan **MySQL**.

---

## 📋 **Table of Contents**

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Security](#security)
- [Testing](#testing)
- [Deployment](#deployment)

---

## ✨ **Features**

✅ **Authentication & Authorization**
- JWT-based authentication
- Role-based access control (Admin, Guru, Siswa, Orang Tua)
- Secure password hashing with bcrypt
- Token refresh mechanism

✅ **News Management**
- CRUD operations for news/articles
- Category and unit sekolah filtering
- Search functionality
- View counter
- Pagination

✅ **PPDB (Student Registration)**
- Online registration form
- Registration number generation
- Status tracking (pending, verified, approved, rejected)
- Email notifications
- Statistics dashboard

✅ **Contact Management**
- Contact form submission
- Message status tracking
- Reply functionality
- Email auto-reply

✅ **Security Features**
- Helmet.js for security headers
- CORS protection
- Rate limiting
- Input validation & sanitization
- SQL injection prevention
- XSS protection

---

## 🛠 **Tech Stack**

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Database:** MySQL (v8.0+)
- **Authentication:** JWT (jsonwebtoken)
- **Validation:** express-validator
- **Security:** Helmet, CORS, Rate Limiting
- **Email:** Nodemailer
- **Other:** bcryptjs, dotenv, compression, morgan

---

## 📦 **Prerequisites**

Pastikan Anda sudah menginstall:

- **Node.js** v18 atau lebih baru ([Download](https://nodejs.org/))
- **MySQL** v8.0 atau lebih baru ([Download](https://dev.mysql.com/downloads/))
- **npm** v9 atau lebih baru (biasanya sudah termasuk dengan Node.js)

---

## 🔧 **Installation**

### 1. Clone Repository

```bash
git clone https://github.com/your-repo/baituljannah-backend.git
cd baituljannah-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

```bash
cp .env.example .env
```

Edit file `.env` dengan konfigurasi Anda (lihat [Configuration](#configuration)).

---

## ⚙️ **Configuration**

Edit file `.env` dengan konfigurasi yang sesuai:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
API_VERSION=v1

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=baituljannah_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-email-password
FROM_EMAIL=noreply@baituljannah.sch.id
FROM_NAME=Yayasan Baituljannah

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

### 🔐 **Important Security Notes:**

1. **JWT_SECRET**: Gunakan string yang panjang dan random untuk production
2. **DB_PASSWORD**: Gunakan password yang kuat
3. **Email Credentials**: Jangan commit credentials ke Git
4. Untuk Gmail, gunakan [App Password](https://support.google.com/accounts/answer/185833)

---

## 🗄️ **Database Setup**

### 1. Create Database

```sql
CREATE DATABASE baituljannah_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Import Schema

Database schema dengan 43 tables sudah tersedia di folder `/database`. Import ke MySQL:

```bash
mysql -u root -p baituljannah_db < database/schema.sql
```

### 3. Import Seed Data (Optional)

```bash
mysql -u root -p baituljannah_db < database/seed.sql
```

### 4. Create Default Admin User

```sql
INSERT INTO users (username, email, password, full_name, role, is_active, created_at)
VALUES (
  'admin',
  'admin@baituljannah.sch.id',
  '$2a$10$YourHashedPasswordHere', -- Password: Admin123!
  'Administrator',
  'admin',
  1,
  NOW()
);
```

**Default Login:**
- Email: `admin@baituljannah.sch.id`
- Password: `Admin123!`

⚠️ **Penting:** Segera ganti password default setelah login pertama kali!

---

## 🚀 **Running the Server**

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Server akan berjalan di: `http://localhost:5000`

### Health Check

```bash
curl http://localhost:5000/health
```

Response:
```json
{
  "success": true,
  "message": "Server is running",
  "environment": "development",
  "timestamp": "2024-12-01T10:00:00.000Z"
}
```

---

## 📖 **API Documentation**

### Base URL

```
http://localhost:5000/api/v1
```

### Authentication

Semua protected routes memerlukan JWT token di header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

### 🔐 **Authentication Endpoints**

#### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "Password123!",
  "full_name": "John Doe",
  "role": "siswa",
  "phone": "081234567890"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@baituljannah.sch.id",
  "password": "Admin123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@baituljannah.sch.id",
      "full_name": "Administrator",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Get Current User
```http
GET /api/v1/auth/me
Authorization: Bearer YOUR_TOKEN
```

#### Update Profile
```http
PUT /api/v1/auth/updatedetails
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "full_name": "John Doe Updated",
  "phone": "081234567890"
}
```

#### Update Password
```http
PUT /api/v1/auth/updatepassword
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewPassword123!"
}
```

---

### 📰 **News Endpoints**

#### Get All News (Public)
```http
GET /api/v1/news?page=1&limit=10&category=Akademik&search=juara
```

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)
- `category` (Akademik, Kegiatan, Prestasi, Pengumuman, Lainnya)
- `unit_sekolah` (TKIT, SDIT, SMPIT, SMAIT, SLBIT, Semua)
- `search` (search in title and content)
- `sort` (created_at, title, views)
- `order` (ASC, DESC)

#### Get Latest News (Public)
```http
GET /api/v1/news/latest?limit=5&unit_sekolah=SDIT
```

#### Get News by ID (Public)
```http
GET /api/v1/news/123
```

#### Create News (Admin, Guru only)
```http
POST /api/v1/news
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "Prestasi Gemilang Siswa SDIT",
  "content": "Siswa SDIT Baituljannah meraih juara 1...",
  "category": "Prestasi",
  "unit_sekolah": "SDIT",
  "image_url": "https://example.com/image.jpg",
  "status": "published",
  "publish_date": "2024-12-01"
}
```

#### Update News (Admin, Author only)
```http
PUT /api/v1/news/123
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "published"
}
```

#### Delete News (Admin only)
```http
DELETE /api/v1/news/123
Authorization: Bearer YOUR_TOKEN
```

---

### 📝 **PPDB Endpoints**

#### Submit Registration (Public)
```http
POST /api/v1/ppdb/register
Content-Type: application/json

{
  "nama_lengkap": "Ahmad Zaki",
  "jenjang": "SDIT",
  "jenis_kelamin": "L",
  "tempat_lahir": "Jakarta",
  "tanggal_lahir": "2015-05-15",
  "nik": "3201234567890123",
  "alamat": "Jl. Pendidikan No. 123",
  "kota": "Jakarta",
  "provinsi": "DKI Jakarta",
  "kode_pos": "12345",
  "nama_ayah": "Budi Santoso",
  "pekerjaan_ayah": "Wiraswasta",
  "nama_ibu": "Siti Aminah",
  "pekerjaan_ibu": "Guru",
  "no_telp": "081234567890",
  "email": "parent@example.com",
  "asal_sekolah": "TK Islam",
  "prestasi": "Juara 1 Tahfidz",
  "informasi_dari": "Website"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Pendaftaran berhasil! Nomor pendaftaran Anda akan dikirim via email",
  "data": {
    "no_pendaftaran": "PPDB2024SDIT4567",
    "registration": { ... }
  }
}
```

#### Check Registration Status (Public)
```http
GET /api/v1/ppdb/check/PPDB2024SDIT4567
```

#### Get All Registrations (Admin only)
```http
GET /api/v1/ppdb/registrations?page=1&limit=20&jenjang=SDIT&status=pending
```

#### Update Registration Status (Admin only)
```http
PUT /api/v1/ppdb/registrations/123/status
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "status": "approved",
  "catatan": "Data sudah diverifikasi"
}
```

**Valid Statuses:** `pending`, `verified`, `approved`, `rejected`, `registered`

#### Get PPDB Statistics (Admin only)
```http
GET /api/v1/ppdb/statistics
Authorization: Bearer YOUR_TOKEN
```

---

### 📧 **Contact Endpoints**

#### Submit Contact Form (Public)
```http
POST /api/v1/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "081234567890",
  "subject": "Pertanyaan tentang PPDB",
  "message": "Saya ingin menanyakan tentang...",
  "unit_sekolah": "SDIT"
}
```

#### Get All Messages (Admin only)
```http
GET /api/v1/contact?page=1&limit=20&status=unread
```

#### Get Message by ID (Admin only)
```http
GET /api/v1/contact/123
Authorization: Bearer YOUR_TOKEN
```

#### Update Message Status (Admin only)
```http
PUT /api/v1/contact/123/status
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "status": "replied",
  "reply": "Terima kasih atas pertanyaannya..."
}
```

**Valid Statuses:** `unread`, `read`, `replied`, `archived`

#### Delete Message (Admin only)
```http
DELETE /api/v1/contact/123
Authorization: Bearer YOUR_TOKEN
```

#### Get Contact Statistics (Admin only)
```http
GET /api/v1/contact/statistics
Authorization: Bearer YOUR_TOKEN
```

---

## 📁 **Project Structure**

```
backend/
├── config/
│   ├── database.js          # Database connection & helpers
│   └── config.js            # App configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── newsController.js    # News CRUD logic
│   ├── ppdbController.js    # PPDB logic
│   └── contactController.js # Contact form logic
├── middleware/
│   ├── auth.js              # JWT authentication & authorization
│   ├── validation.js        # Input validation rules
│   └── errorHandler.js      # Global error handler
├── routes/
│   ├── auth.js              # Auth routes
│   ├── news.js              # News routes
│   ├── ppdb.js              # PPDB routes
│   └── contact.js           # Contact routes
├── utils/
│   └── sendEmail.js         # Email utility & templates
├── uploads/                 # File upload directory
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
├── server.js                # Main server file
└── README.md
```

---

## 🔒 **Security**

### Implemented Security Measures:

1. **Authentication**
   - JWT with expiration
   - Secure password hashing (bcrypt, 10 rounds)
   - Role-based access control

2. **Input Validation**
   - express-validator for all inputs
   - SQL injection prevention (parameterized queries)
   - XSS protection

3. **Security Headers**
   - Helmet.js for secure headers
   - CORS configuration
   - Content Security Policy

4. **Rate Limiting**
   - 100 requests per 15 minutes per IP
   - Prevents brute force attacks

5. **Environment Variables**
   - Sensitive data in .env (not committed to Git)
   - Different configs for dev/prod

### Security Checklist for Production:

- [ ] Change all default passwords
- [ ] Use strong JWT_SECRET (min 32 chars random)
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall rules
- [ ] Enable MySQL SSL connection
- [ ] Regular security updates
- [ ] Implement logging & monitoring
- [ ] Regular database backups
- [ ] Use environment-specific .env files

---

## 🧪 **Testing**

### Manual Testing with cURL

```bash
# Register user
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Test123!",
    "full_name": "Test User"
  }'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'

# Get news (with token)
curl http://localhost:5000/api/v1/news \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Testing with Postman

1. Import collection dari `/postman` folder (jika ada)
2. Set environment variables untuk token
3. Test semua endpoints

---

## 🚀 **Deployment**

### Deploy to VPS (Ubuntu)

1. **Install Node.js & MySQL**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs mysql-server
```

2. **Clone & Setup**
```bash
git clone https://github.com/your-repo/baituljannah-backend.git
cd baituljannah-backend
npm install --production
```

3. **Setup MySQL**
```bash
sudo mysql_secure_installation
mysql -u root -p < database/schema.sql
```

4. **Configure Environment**
```bash
cp .env.example .env
nano .env  # Edit dengan production values
```

5. **Use PM2 for Process Management**
```bash
npm install -g pm2
pm2 start server.js --name baituljannah-api
pm2 save
pm2 startup
```

6. **Setup Nginx Reverse Proxy**
```nginx
server {
    listen 80;
    server_name api.baituljannah.sch.id;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. **Enable SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.baituljannah.sch.id
```

---

## 📞 **Support**

Jika ada pertanyaan atau issue:

- **Email:** dev@baituljannah.sch.id
- **GitHub Issues:** [Create Issue](https://github.com/your-repo/issues)
- **Documentation:** [Wiki](https://github.com/your-repo/wiki)

---

## 📄 **License**

MIT License - Copyright (c) 2024 Yayasan Baituljannah

---

## 🙏 **Credits**

Developed with ❤️ for **Yayasan Baituljannah Islamic School**

**Tech Stack:**
- Node.js & Express.js
- MySQL Database
- JWT Authentication
- Nodemailer for Emails

---

**🎉 Happy Coding!**
