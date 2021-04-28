const { Client } = require('pg');

const chalk = require('chalk');

const DB_Name = 'Grace-Shopper-JJR';

const client = new Client({
    connectionString: process.env.DATABASE_URL || `postgres://localhost:5432/${DB_Name}`,
    ssl: process.env.NODE_ENV === 'production' ? 
    { rejectUnauthorized: false } : undefined,
  });

  module.exports = client;