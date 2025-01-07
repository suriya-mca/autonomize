const { Pool } = require('pg');

// Configure PostgreSQL connection
const pool = new Pool({
  user: 'your_postgres_user',
  host: 'localhost',
  database: 'github_users',
  password: 'your_password',
  port: 5432,
});

pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database');
});

module.exports = pool;
