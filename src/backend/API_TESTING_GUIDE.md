# 🧪 API Testing Guide - Baituljannah Backend

Panduan lengkap untuk testing API Backend menggunakan berbagai tools.

---

## 📋 **Quick Start Testing**

### 1️⃣ **Start Server**

```bash
cd backend
npm install
cp .env.example .env
# Edit .env dengan database credentials Anda
npm run dev
```

Server akan running di: `http://localhost:5000`

---

## 🔧 **Testing dengan cURL**

### Authentication

#### Register User Baru
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "Password123!",
    "full_name": "John Doe",
    "phone": "081234567890"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123!"
  }'
```

**Save the token from response!**

#### Get Current User Info
```bash
curl http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### News API

#### Get All News
```bash
curl http://localhost:5000/api/v1/news
```

#### Get News with Filters
```bash
curl "http://localhost:5000/api/v1/news?page=1&limit=5&category=Prestasi&unit_sekolah=SDIT"
```

#### Create News (Admin/Guru only)
```bash
curl -X POST http://localhost:5000/api/v1/news \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Siswa SDIT Juara Olimpiade",
    "content": "Alhamdulillah siswa SDIT Baituljannah berhasil meraih juara 1 dalam Olimpiade Matematika tingkat nasional...",
    "category": "Prestasi",
    "unit_sekolah": "SDIT",
    "status": "published"
  }'
```

#### Get Single News
```bash
curl http://localhost:5000/api/v1/news/1
```

---

### PPDB API

#### Submit Registration
```bash
curl -X POST http://localhost:5000/api/v1/ppdb/register \
  -H "Content-Type: application/json" \
  -d '{
    "nama_lengkap": "Ahmad Zaki",
    "jenjang": "SDIT",
    "jenis_kelamin": "L",
    "tempat_lahir": "Jakarta",
    "tanggal_lahir": "2015-05-15",
    "alamat": "Jl. Pendidikan No. 123, Jakarta",
    "nama_ayah": "Budi Santoso",
    "nama_ibu": "Siti Aminah",
    "no_telp": "081234567890",
    "email": "parent@example.com"
  }'
```

#### Check Registration Status
```bash
curl http://localhost:5000/api/v1/ppdb/check/PPDB2024SDIT4567
```

#### Get All Registrations (Admin only)
```bash
curl http://localhost:5000/api/v1/ppdb/registrations \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

---

### Contact API

#### Submit Contact Form
```bash
curl -X POST http://localhost:5000/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "081234567890",
    "subject": "Pertanyaan tentang PPDB",
    "message": "Saya ingin menanyakan tentang jadwal PPDB untuk tahun ajaran 2025/2026"
  }'
```

#### Get All Messages (Admin only)
```bash
curl http://localhost:5000/api/v1/contact \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

---

## 🔥 **Testing dengan HTTPie** (More User-Friendly)

Install HTTPie:
```bash
# macOS
brew install httpie

# Ubuntu/Debian
sudo apt install httpie

# Windows
pip install httpie
```

### Examples

```bash
# Login
http POST localhost:5000/api/v1/auth/login \
  email=john@example.com \
  password=Password123!

# Get news with pretty output
http GET localhost:5000/api/v1/news category==Prestasi

# Create news with auth
http POST localhost:5000/api/v1/news \
  Authorization:"Bearer YOUR_TOKEN" \
  title="New Achievement" \
  content="Our students won..." \
  category=Prestasi \
  unit_sekolah=SDIT \
  status=published
```

---

## 📮 **Testing dengan Postman**

### Setup Collection

1. **Import Environment**

Create new environment `Baituljannah - Dev`:

```json
{
  "name": "Baituljannah - Dev",
  "values": [
    {
      "key": "base_url",
      "value": "http://localhost:5000/api/v1",
      "enabled": true
    },
    {
      "key": "token",
      "value": "",
      "enabled": true
    }
  ]
}
```

2. **Auto-save Token Script**

Untuk request Login, tambahkan di **Tests** tab:

```javascript
// Save token to environment
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set("token", response.data.token);
    pm.test("Token saved", function() {
        pm.expect(response.data.token).to.not.be.undefined;
    });
}
```

3. **Authorization Setup**

Untuk protected endpoints:
- Type: **Bearer Token**
- Token: `{{token}}`

---

### Sample Postman Requests

#### 1. Register
```
POST {{base_url}}/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "Test123!",
  "full_name": "Test User"
}
```

#### 2. Login
```
POST {{base_url}}/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test123!"
}

# Tests script akan auto-save token
```

#### 3. Get Current User
```
GET {{base_url}}/auth/me
Authorization: Bearer {{token}}
```

#### 4. Create News
```
POST {{base_url}}/news
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "title": "{{$randomLoremWords}}",
  "content": "{{$randomLoremParagraphs}}",
  "category": "Prestasi",
  "unit_sekolah": "SDIT",
  "status": "published"
}
```

#### 5. Get News with Pagination
```
GET {{base_url}}/news?page=1&limit=10&category=Prestasi
```

---

## 🧪 **Automated Testing Scenarios**

### Scenario 1: Complete User Flow

```bash
#!/bin/bash

BASE_URL="http://localhost:5000/api/v1"

# 1. Register
echo "1. Registering new user..."
REGISTER_RESPONSE=$(curl -s -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "autotest",
    "email": "autotest@example.com",
    "password": "Test123!",
    "full_name": "Auto Test User"
  }')
echo $REGISTER_RESPONSE | jq .

# 2. Login
echo -e "\n2. Logging in..."
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "autotest@example.com",
    "password": "Test123!"
  }')
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.data.token')
echo "Token: $TOKEN"

# 3. Get user info
echo -e "\n3. Getting user info..."
curl -s $BASE_URL/auth/me \
  -H "Authorization: Bearer $TOKEN" | jq .

# 4. Get news
echo -e "\n4. Getting news..."
curl -s "$BASE_URL/news?limit=3" | jq '.data'

echo -e "\n✅ All tests completed!"
```

Save as `test_api.sh` dan jalankan:
```bash
chmod +x test_api.sh
./test_api.sh
```

---

### Scenario 2: PPDB Registration Flow

```bash
#!/bin/bash

BASE_URL="http://localhost:5000/api/v1"

# Submit registration
echo "Submitting PPDB registration..."
PPDB_RESPONSE=$(curl -s -X POST $BASE_URL/ppdb/register \
  -H "Content-Type: application/json" \
  -d '{
    "nama_lengkap": "Test Student",
    "jenjang": "SDIT",
    "jenis_kelamin": "L",
    "tempat_lahir": "Jakarta",
    "tanggal_lahir": "2015-05-15",
    "alamat": "Jl. Test No. 123",
    "nama_ayah": "Test Father",
    "nama_ibu": "Test Mother",
    "no_telp": "081234567890",
    "email": "parent@test.com"
  }')

echo $PPDB_RESPONSE | jq .

# Get registration number
REG_NUMBER=$(echo $PPDB_RESPONSE | jq -r '.data.no_pendaftaran')
echo -e "\nRegistration Number: $REG_NUMBER"

# Check registration status
echo -e "\nChecking registration status..."
curl -s "$BASE_URL/ppdb/check/$REG_NUMBER" | jq .
```

---

## 📊 **Performance Testing dengan Apache Bench**

### Test Login Endpoint

```bash
# 100 requests, 10 concurrent
ab -n 100 -c 10 -p login.json -T application/json \
  http://localhost:5000/api/v1/auth/login
```

**login.json:**
```json
{
  "email": "test@example.com",
  "password": "Test123!"
}
```

### Test GET News Endpoint

```bash
# 1000 requests, 50 concurrent
ab -n 1000 -c 50 http://localhost:5000/api/v1/news
```

---

## ✅ **Testing Checklist**

### Authentication
- [ ] Register dengan data valid
- [ ] Register dengan email duplikat (harus error)
- [ ] Login dengan credentials benar
- [ ] Login dengan password salah (harus error)
- [ ] Access protected route tanpa token (harus 401)
- [ ] Access protected route dengan token valid
- [ ] Access protected route dengan token expired (harus 401)

### News
- [ ] Get all news (public)
- [ ] Get news dengan pagination
- [ ] Get news dengan filter category
- [ ] Get news dengan search
- [ ] Create news sebagai admin (berhasil)
- [ ] Create news sebagai siswa (harus 403)
- [ ] Update news sebagai author
- [ ] Delete news sebagai admin

### PPDB
- [ ] Submit registration dengan data lengkap
- [ ] Submit registration dengan data tidak lengkap (harus error)
- [ ] Check registration dengan nomor valid
- [ ] Check registration dengan nomor invalid (harus 404)
- [ ] Admin dapat melihat semua registrations
- [ ] Admin dapat update status registration
- [ ] Non-admin tidak dapat akses admin endpoints (harus 403)

### Contact
- [ ] Submit contact form dengan data valid
- [ ] Submit dengan email invalid (harus error)
- [ ] Admin dapat melihat semua messages
- [ ] Admin dapat update message status
- [ ] Admin dapat reply message

### Security
- [ ] Rate limiting berfungsi (test dengan banyak request)
- [ ] SQL injection prevention (test dengan malicious input)
- [ ] XSS prevention (test dengan script tags)
- [ ] CORS berfungsi
- [ ] Password di-hash dengan bcrypt
- [ ] Sensitive data tidak muncul di response

---

## 🐛 **Common Issues & Solutions**

### Issue: "Database connection failed"
**Solution:**
```bash
# Check MySQL is running
sudo systemctl status mysql

# Check credentials in .env
cat .env | grep DB_

# Test connection
mysql -u root -p
```

### Issue: "Token invalid"
**Solution:**
- Check JWT_SECRET di .env
- Pastikan token tidak expired (default 7 hari)
- Copy token dengan benar (tanpa extra spaces)

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 PID

# Or change PORT in .env
PORT=5001
```

### Issue: "Validation error"
**Solution:**
- Check request body format
- Pastikan semua required fields terisi
- Check data types (string, number, etc)
- Lihat error message detail di response

---

## 📝 **Response Format Standard**

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message here",
  "errors": [
    {
      "field": "email",
      "message": "Email tidak valid"
    }
  ]
}
```

### Paginated Response
```json
{
  "success": true,
  "count": 10,
  "total": 100,
  "totalPages": 10,
  "currentPage": 1,
  "data": [ ... ]
}
```

---

## 🎯 **Next Steps**

1. ✅ Test semua endpoints manually
2. ✅ Create Postman collection
3. ✅ Run automated test scripts
4. ✅ Test error scenarios
5. ✅ Test security measures
6. ✅ Performance testing
7. ✅ Integration testing dengan frontend
8. ✅ Load testing untuk production

---

**Happy Testing! 🚀**
