const pool = require('../db');

// Initialize database table
const initTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      location VARCHAR(255),
      blog VARCHAR(255),
      bio TEXT,
      public_repos INT,
      public_gists INT,
      followers INT,
      following INT,
      created_at TIMESTAMP,
      soft_deleted BOOLEAN DEFAULT FALSE
    );
    CREATE TABLE IF NOT EXISTS friendships (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id),
      friend_id INT REFERENCES users(id),
      UNIQUE(user_id, friend_id)
    );
  `;
  await pool.query(query);
};

module.exports = { initTable };
