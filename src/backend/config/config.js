require('dotenv').config();

module.exports = {
  // Server
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  apiVersion: process.env.API_VERSION || 'v1',
  
  // Database
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'baituljannah_db'
  },
  
  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
    expire: process.env.JWT_EXPIRE || '7d',
    cookieExpire: process.env.JWT_COOKIE_EXPIRE || 7
  },
  
  // Email
  email: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    from: process.env.FROM_EMAIL,
    fromName: process.env.FROM_NAME
  },
  
  // File Upload
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880, // 5MB
    uploadPath: process.env.FILE_UPLOAD_PATH || './uploads'
  },
  
  // Frontend
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  
  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) * 60 * 1000 || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
  },
  
  // Security
  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10
};
