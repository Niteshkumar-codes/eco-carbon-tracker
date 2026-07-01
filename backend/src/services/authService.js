const { createUser, findUserByEmail, findUserById } = require('../models/userModel');

const sessions = new Map();

function createToken() {
  return `token-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function signupUser({ name, email, password }) {
  if (!name || !email || !password) {
    const error = new Error('Name, email, and password are required.');
    error.statusCode = 400;
    throw error;
  }

  const existingUser = findUserByEmail(email);
  if (existingUser) {
    const error = new Error('User already exists.');
    error.statusCode = 409;
    throw error;
  }

  const newUser = createUser({
    id: Date.now().toString(),
    name,
    email,
    password,
  });

  const token = createToken();
  sessions.set(token, newUser.id);

  return {
    token,
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
  };
}

function loginUser({ email, password }) {
  if (!email || !password) {
    const error = new Error('Email and password are required.');
    error.statusCode = 400;
    throw error;
  }

  const user = findUserByEmail(email);
  if (!user || user.password !== password) {
    const error = new Error('Invalid credentials.');
    error.statusCode = 401;
    throw error;
  }

  const token = createToken();
  sessions.set(token, user.id);

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email },
  };
}

function getCurrentUserByToken(token) {
  if (!token || !sessions.has(token)) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  const userId = sessions.get(token);
  const user = findUserById(userId);
  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = 401;
    throw error;
  }

  return { id: user.id, name: user.name, email: user.email };
}

function logoutUser(token) {
  if (token) {
    sessions.delete(token);
  }
  return { message: 'Logout successful.' };
}

module.exports = {
  signupUser,
  loginUser,
  getCurrentUserByToken,
  logoutUser,
};
