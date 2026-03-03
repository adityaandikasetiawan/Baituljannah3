const mysql = require('mysql2/promise');
require('dotenv').config();

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'baituljannah_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL Database Connected Successfully');
    console.log(`📊 Database: ${process.env.DB_NAME}`);
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database Connection Failed:', error.message);
    return false;
  }
};

// Execute query helper
const executeQuery = async (query, params = []) => {
  try {
    const [rows] = await pool.execute(query, params);
    return rows;
  } catch (error) {
    console.error('Query Error:', error.message);
    throw error;
  }
};

// Get single row
const getOne = async (query, params = []) => {
  try {
    const [rows] = await pool.execute(query, params);
    return rows[0] || null;
  } catch (error) {
    console.error('Query Error:', error.message);
    throw error;
  }
};

// Insert and return ID
const insert = async (query, params = []) => {
  try {
    const [result] = await pool.execute(query, params);
    return result.insertId;
  } catch (error) {
    console.error('Insert Error:', error.message);
    throw error;
  }
};

// Update and return affected rows
const update = async (query, params = []) => {
  try {
    const [result] = await pool.execute(query, params);
    return result.affectedRows;
  } catch (error) {
    console.error('Update Error:', error.message);
    throw error;
  }
};

// Delete and return affected rows
const deleteRow = async (query, params = []) => {
  try {
    const [result] = await pool.execute(query, params);
    return result.affectedRows;
  } catch (error) {
    console.error('Delete Error:', error.message);
    throw error;
  }
};

module.exports = {
  pool,
  testConnection,
  executeQuery,
  getOne,
  insert,
  update,
  deleteRow
};
