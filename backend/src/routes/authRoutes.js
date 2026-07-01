const express = require('express');
const { signupUser, loginUser, getCurrentUserByToken, logoutUser } = require('../services/authService');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', (req, res) => {
  try {
    const result = signupUser(req.body);
    return res.status(201).json({ message: 'Signup successful.', ...result });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.post('/login', (req, res) => {
  try {
    const result = loginUser(req.body);
    return res.json({ message: 'Login successful.', ...result });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.get('/me', authMiddleware, (req, res) => {
  return res.json({ user: req.user });
});

router.post('/logout', authMiddleware, (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  return res.json(logoutUser(token));
});

module.exports = router;
