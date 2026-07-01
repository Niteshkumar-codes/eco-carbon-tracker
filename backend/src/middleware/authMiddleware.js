const { getCurrentUserByToken } = require('../services/authService');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  try {
    const user = getCurrentUserByToken(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(error.statusCode || 401).json({ message: error.message });
  }
}

module.exports = authMiddleware;
