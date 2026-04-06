
# Baituljannah

Website + API untuk Yayasan Baituljannah (frontend Next.js + backend Express/MySQL).

## Struktur Proyek
- `src/app` — Frontend Next.js (App Router)
- `src/backend` — Backend Express API (MySQL)
- `public/` — Static assets (termasuk `public/uploads`)

## Prasyarat
- Node.js >= 18
- npm >= 9
- MySQL (sesuai konfigurasi `.env` backend)

## Menjalankan Frontend (Next.js)
1) Install dependency:
```bash
npm install
```

2) Jalankan dev server:
```bash
npm run dev
```
Frontend default di `http://localhost:3000`.

3) Build & start (production):
```bash
npm run build
npm start
```

### Environment Frontend
- `NEXT_PUBLIC_API_URL` (opsional)
  - Default: `/api/v1` (asumsi backend diproxy di origin yang sama)
  - Untuk development tanpa reverse-proxy, set misalnya: `http://localhost:5000/api/v1`

## Menjalankan Backend (Express API)
1) Install dependency backend:
```bash
cd src/backend
npm install
```

2) Siapkan environment:
```bash
cp .env.example .env
```
Lalu isi minimal:
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `JWT_SECRET` (wajib, minimal 32 karakter random)
- `FRONTEND_URL` atau `FRONTEND_URLS` (untuk CORS)

3) Jalankan:
```bash
npm run dev
```
Backend default di `http://localhost:5000`.

Health check:
- `GET http://localhost:5000/health`

Base API:
- `http://localhost:5000/api/v1`

## CORS
Backend membatasi origin lewat:
- `FRONTEND_URL` (single origin), atau
- `FRONTEND_URLS` (comma-separated list)

Contoh:
```env
FRONTEND_URLS=http://localhost:3000,https://baituljannah.sch.id
```

## Auth & Role
- Login: `POST /api/v1/auth/login` mengembalikan token.
- Frontend menyimpan token di `localStorage` dengan key `baituljannah_token`.
- Cookie `role` dipakai oleh `middleware.ts` untuk membatasi akses halaman:
  - `admin`, `teacher`, `student`, `parent`
- Backend juga menerapkan pembatasan akses (RBAC) pada endpoint sensitif.

## Catatan Deployment
- Paling rapi gunakan reverse proxy (mis. Nginx) supaya frontend dan backend satu domain:
  - Route `/api/v1/*` → backend (port 5000)
  - Frontend tetap pakai default `NEXT_PUBLIC_API_URL=/api/v1`
- Alternatif: set `NEXT_PUBLIC_API_URL` ke URL backend full jika backend beda domain/subdomain.
  
