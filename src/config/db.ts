import mysql from 'mysql2/promise';
import 'dotenv/config'

export const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3307,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit : 10,
  waitForConnections: true,
  queueLimit: 0,
});

