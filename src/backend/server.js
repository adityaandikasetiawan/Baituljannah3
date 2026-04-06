const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const config = require('./config/config');
const { testConnection } = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Initialize express app
const app = express();
app.locals.dbConnected = false;

// ======================
// MIDDLEWARE
// ======================

// Security headers
app.use(helmet());

// Enable CORS
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const normalized = String(origin).trim().replace(/\/$/, '');
    if (config.frontendUrls.includes(normalized)) return callback(null, true);
    return callback(null, false);
  },
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Logging
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    success: false,
    message: 'Terlalu banyak request dari IP ini, silakan coba lagi nanti'
  }
});
app.use('/api/', limiter);

// ======================
// ROUTES
// ======================

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    dbConnected: Boolean(req.app.locals.dbConnected),
    environment: config.nodeEnv,
    timestamp: new Date().toISOString()
  });
});

// API Routes
const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/news');
const ppdbRoutes = require('./routes/ppdb');
const contactRoutes = require('./routes/contact');
const messagesRoutes = require('./routes/messages');
const extracurricularRoutes = require('./routes/extracurricular');
const counselingRoutes = require('./routes/counseling');
const slidersRoutes = require('./routes/sliders');
const achievementsRoutes = require('./routes/achievements');

app.use(`/api/${config.apiVersion}/auth`, authRoutes);
app.use(`/api/${config.apiVersion}/news`, newsRoutes);
app.use(`/api/${config.apiVersion}/ppdb`, ppdbRoutes);
app.use(`/api/${config.apiVersion}/contact`, contactRoutes);
app.use(`/api/${config.apiVersion}/messages`, messagesRoutes);
app.use(`/api/${config.apiVersion}/extracurricular`, extracurricularRoutes);
app.use(`/api/${config.apiVersion}/counseling`, counselingRoutes);
app.use(`/api/${config.apiVersion}/sliders`, slidersRoutes);
app.use(`/api/${config.apiVersion}/achievements`, achievementsRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Baituljannah School Management System API',
    version: config.apiVersion,
    documentation: '/api/docs',
    endpoints: {
      auth: `/api/${config.apiVersion}/auth`,
      news: `/api/${config.apiVersion}/news`,
      ppdb: `/api/${config.apiVersion}/ppdb`,
      contact: `/api/${config.apiVersion}/contact`,
      messages: `/api/${config.apiVersion}/messages`,
      extracurricular: `/api/${config.apiVersion}/extracurricular`,
      counseling: `/api/${config.apiVersion}/counseling`,
      sliders: `/api/${config.apiVersion}/sliders`,
      achievements: `/api/${config.apiVersion}/achievements`
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler middleware
app.use(errorHandler);

// ======================
// START SERVER
// ======================

const PORT = config.port || 5000;

const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    app.locals.dbConnected = dbConnected;
    
    if (!dbConnected) {
      console.error('❌ Failed to connect to database. Server running in degraded mode.');
      app.listen(PORT, () => {
        console.log(`📍 Server running on port: ${PORT} (degraded mode - no database connection)`);
      });
      return;
    }

    // Start server
    app.listen(PORT, () => {
      console.log('');
      console.log('='.repeat(60));
      console.log('🚀 BAITULJANNAH SCHOOL MANAGEMENT SYSTEM API');
      console.log('='.repeat(60));
      console.log(`📍 Server running on port: ${PORT}`);
      console.log(`🌍 Environment: ${config.nodeEnv}`);
      console.log(`📡 API Version: ${config.apiVersion}`);
      console.log(`🔗 URL: http://localhost:${PORT}`);
      console.log(`💚 Health Check: http://localhost:${PORT}/health`);
      console.log('='.repeat(60));
      console.log('');
      console.log('📋 Available Endpoints:');
      console.log(`   🔐 Auth:    /api/${config.apiVersion}/auth`);
      console.log(`   📰 News:    /api/${config.apiVersion}/news`);
      console.log(`   📝 PPDB:    /api/${config.apiVersion}/ppdb`);
      console.log(`   📧 Contact: /api/${config.apiVersion}/contact`);
      console.log('='.repeat(60));
      console.log('');
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  // Close server & exit process
  process.exit(1);
});

// Start the server
startServer();

module.exports = app;
