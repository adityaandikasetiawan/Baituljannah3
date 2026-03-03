import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'baituljannah_school',
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10'),
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test database connection
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL Database connected successfully');
    console.log(`   Database: ${process.env.DB_NAME}`);
    console.log(`   Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    connection.release();
    return true;
  } catch (error: any) {
    console.error('❌ MySQL connection error:', error.message);
    console.error('   Please check your database configuration in .env file');
    return false;
  }
};

// Helper function for queries with error handling
export const query = async <T = any>(sql: string, params?: any[]): Promise<T> => {
  try {
    const [rows] = await pool.query(sql, params);
    return rows as T;
  } catch (error: any) {
    console.error('Database query error:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
};

export default pool;
