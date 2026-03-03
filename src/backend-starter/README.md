# BAITULJANNAH BACKEND API

Backend API Server untuk Sistem Manajemen Sekolah Yayasan Baituljannah

## 🚀 Quick Start

### Prerequisites
- Node.js v18 atau lebih baru
- MySQL 8.0 atau lebih baru
- npm atau yarn

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Setup environment variables**
```bash
cp .env.example .env
# Edit .env file dengan konfigurasi database Anda
```

3. **Setup database**
```bash
# Login ke MySQL
mysql -u root -p

# Jalankan schema SQL
source ../database/schema.sql

# Jalankan seed data
source ../database/seed.sql
```

4. **Start development server**
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3001`

## 📁 Project Structure

```
backend-starter/
├── src/
│   ├── config/
│   │   └── database.ts          # Database configuration
│   ├── controllers/
│   │   └── auth.controller.ts   # Auth controller
│   ├── middleware/
│   │   └── auth.ts               # Auth middleware
│   ├── routes/
│   │   └── auth.routes.ts       # Auth routes
│   └── app.ts                    # Main application
├── uploads/                      # File uploads directory
├── .env.example                  # Environment variables example
├── .gitignore
├── nodemon.json                  # Nodemon configuration
├── package.json
├── tsconfig.json                 # TypeScript configuration
└── README.md
```

## 🔐 Authentication

### Test Credentials

```
Super Admin:
Email: admin@baituljannah.sch.id
Password: Admin123!

Admin Unit SDIT:
Email: admin.sdit@baituljannah.sch.id
Password: Admin123!

Teacher:
Email: ahmad@baituljannah.sch.id
Password: Guru123!

Student:
Email: rizki@student.baituljannah.sch.id
Password: Siswa123!
```

## 📚 Available Endpoints

### Health Check
```
GET /api/health
```

### Authentication
```
POST   /api/auth/login      - Login user
POST   /api/auth/register   - Register new user
POST   /api/auth/logout     - Logout user (requires auth)
GET    /api/auth/me         - Get current user (requires auth)
POST   /api/auth/refresh    - Refresh access token
```

## 🧪 Testing API

### Using cURL

**Health Check:**
```bash
curl http://localhost:3001/api/health
```

**Login:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@baituljannah.sch.id",
    "password": "Admin123!"
  }'
```

**Get Current User:**
```bash
curl http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Import collection dari `API_DOCUMENTATION.md`
2. Set environment variable `API_URL` = `http://localhost:3001/api`
3. Test endpoints

## 🔧 Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build TypeScript to JavaScript
npm start        # Start production server
npm test         # Run tests
npm run lint     # Run ESLint
```

## 📝 Environment Variables

Lihat `.env.example` untuk daftar lengkap environment variables yang diperlukan.

**Penting:**
- `DB_NAME`: baituljannah_school
- `DB_USER`: root (atau user MySQL Anda)
- `DB_PASSWORD`: password MySQL Anda
- `JWT_SECRET`: Ganti dengan secret key yang aman untuk production

## 🛠️ Development

### Adding New Routes

1. Create controller in `src/controllers/`
2. Create route in `src/routes/`
3. Import and use in `src/app.ts`

Example:
```typescript
// src/controllers/users.controller.ts
export const getUsers = async (req: Request, res: Response) => {
  // Implementation
};

// src/routes/users.routes.ts
import express from 'express';
import * as usersController from '../controllers/users.controller';
const router = express.Router();
router.get('/', usersController.getUsers);
export default router;

// src/app.ts
import usersRoutes from './routes/users.routes';
app.use('/api/users', usersRoutes);
```

## 🚀 Deployment

### Production Build

```bash
npm run build
NODE_ENV=production node dist/app.js
```

### Using PM2

```bash
npm install -g pm2
pm2 start dist/app.js --name baituljannah-api
pm2 save
pm2 startup
```

## 📄 License

MIT License - Yayasan Baituljannah

## 👥 Support

For support, email dev@baituljannah.sch.id
