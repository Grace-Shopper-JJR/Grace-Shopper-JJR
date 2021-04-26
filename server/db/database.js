const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/Grace-Shopper-JJR";

const db = new Client(connectionString);
db.connect();

module.exports = db;