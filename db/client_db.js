const { Client } = require('pg');

const DB_Name = 'Grace-Shopper-JJR';

const client = new Client({
    connectionString: process.env.DATABASE_URL || `postgres://localhost:5432/${DB_Name}`,
    ssl: process.env.NODE_ENV === 'production' ? 
    { rejectUnauthorized: false } : undefined,
  });

  module.exports = client;