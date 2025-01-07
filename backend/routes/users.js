const express = require('express');
const axios = require('axios');
const pool = require('../db');
const validate = require('../middleware/validate');
const { body, param } = require('express-validator');

const router = express.Router();

// Fetch and save GitHub user details
router.post(
  '/user',
  validate([
    body('username').notEmpty().withMessage('Username is required'),
  ]),
  async (req, res) => {
    const { username } = req.body;

    try {
      const existingUser = await pool.query(
        'SELECT * FROM users WHERE username = $1 AND soft_deleted = false',
        [username]
      );

      if (existingUser.rows.length > 0) {
        return res.status(200).json({ message: 'User already exists', user: existingUser.rows[0] });
      }

      const response = await axios.get(`https://api.github.com/users/${username}`);
      const userData = response.data;

      const query = `
        INSERT INTO users (username, location, blog, bio, public_repos, public_gists, followers, following, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
      `;

      const values = [
        userData.login,
        userData.location,
        userData.blog,
        userData.bio,
        userData.public_repos,
        userData.public_gists,
        userData.followers,
        userData.following,
        new Date(userData.created_at),
      ];

      const newUser = await pool.query(query, values);
      res.status(201).json(newUser.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Fetch mutual followers and save as friends
router.post(
  '/user/:username/friends',
  validate([param('username').notEmpty().withMessage('Username is required')]),
  async (req, res) => {
    const { username } = req.params;

    try {
      const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      if (user.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const followersResponse = await axios.get(`https://api.github.com/users/${username}/followers`);
      const followingResponse = await axios.get(`https://api.github.com/users/${username}/following`);

      const followers = followersResponse.data.map((f) => f.login);
      const following = followingResponse.data.map((f) => f.login);

      const mutuals = followers.filter((f) => following.includes(f));

      for (const mutual of mutuals) {
        const friend = await pool.query('SELECT * FROM users WHERE username = $1', [mutual]);
        if (friend.rows.length > 0) {
          await pool.query(
            'INSERT INTO friendships (user_id, friend_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
            [user.rows[0].id, friend.rows[0].id]
          );
        }
      }

      res.status(200).json({ message: 'Friends updated' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Search users
router.get('/users', async (req, res) => {
  const { username, location } = req.query;

  try {
    let query = 'SELECT * FROM users WHERE soft_deleted = false';
    const values = [];

    if (username) {
      values.push(username);
      query += ` AND username ILIKE '%' || $${values.length} || '%'`;
    }

    if (location) {
      values.push(location);
      query += ` AND location ILIKE '%' || $${values.length} || '%'`;
    }

    const users = await pool.query(query, values);
    res.status(200).json(users.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Soft delete user
router.delete(
  '/user/:username',
  validate([param('username').notEmpty().withMessage('Username is required')]),
  async (req, res) => {
    const { username } = req.params;

    try {
      await pool.query('UPDATE users SET soft_deleted = true WHERE username = $1', [username]);
      res.status(200).json({ message: 'User soft deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Update user fields
router.put(
  '/user/:username',
  validate([param('username').notEmpty().withMessage('Username is required')]),
  async (req, res) => {
    const { username } = req.params;
    const updates = req.body;

    try {
      const fields = Object.keys(updates)
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');

      const values = [username, ...Object.values(updates)];

      const query = `UPDATE users SET ${fields} WHERE username = $1 RETURNING *`;
      const updatedUser = await pool.query(query, values);

      res.status(200).json(updatedUser.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
