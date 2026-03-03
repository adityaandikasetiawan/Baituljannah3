import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { testConnection } from './config/database';

// Import routes
import authRoutes from './routes/auth.routes';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// ============================================
// MIDDLEWARE
// ============================================

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files for uploads
app.use('/uploads', express.static('uploads'));

// ============================================
// ROUTES
// ============================================

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Server is running',
    data: {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0'
    }
  });
});

// API routes
app.use('/api/auth', authRoutes);

// TODO: Add more routes here
// app.use('/api/users', usersRoutes);
// app.use('/api/students', studentsRoutes);
// app.use('/api/teachers', teachersRoutes);
// app.use('/api/classes', classesRoutes);
// app.use('/api/subjects', subjectsRoutes);
// app.use('/api/materials', materialsRoutes);
// app.use('/api/assignments', assignmentsRoutes);
// app.use('/api/grades', gradesRoutes);
// app.use('/api/attendance', attendanceRoutes);
// app.use('/api/finance', financeRoutes);
// app.use('/api/library', libraryRoutes);
// app.use('/api/ppdb', ppdbRoutes);
// app.use('/api/career', careerRoutes);
// app.use('/api/news', newsRoutes);
// app.use('/api/gallery', galleryRoutes);
// app.use('/api/achievements', achievementsRoutes);
// app.use('/api/programs', programsRoutes);
// app.use('/api/notifications', notificationsRoutes);
// app.use('/api/messages', messagesRoutes);

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: err.errors
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized access'
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      details: err 
    })
  });
});

// ============================================
// START SERVER
// ============================================

const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('⚠️  Starting server without database connection');
      console.error('   Please check your database configuration');
    }

    // Start Express server
    app.listen(PORT, () => {
      console.log('');
      console.log('========================================');
      console.log('🚀 YAYASAN BAITULJANNAH API SERVER');
      console.log('========================================');
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 Server URL: http://localhost:${PORT}`);
      console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
      console.log('========================================');
      console.log('');
      
      if (process.env.NODE_ENV === 'development') {
        console.log('📝 Available endpoints:');
        console.log('   POST   /api/auth/login');
        console.log('   POST   /api/auth/register');
        console.log('   POST   /api/auth/logout');
        console.log('   GET    /api/auth/me');
        console.log('   POST   /api/auth/refresh');
        console.log('');
        console.log('🔑 Test credentials (from seed data):');
        console.log('   Email: admin@baituljannah.sch.id');
        console.log('   Password: Admin123!');
        console.log('');
      }
    });
  } catch (error: any) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: any) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: any) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

// Start the server
startServer();

export default app;
