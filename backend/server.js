const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const users = [];
const sessions = new Map();

function createToken() {
  return `token-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists.' });
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
  };

  users.push(newUser);
  const token = createToken();
  sessions.set(token, newUser.id);

  return res.status(201).json({
    message: 'Signup successful.',
    token,
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = users.find((entry) => entry.email === email && entry.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const token = createToken();
  sessions.set(token, user.id);

  return res.json({
    message: 'Login successful.',
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token || !sessions.has(token)) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }

  const userId = sessions.get(token);
  const user = users.find((entry) => entry.id === userId);

  if (!user) {
    return res.status(401).json({ message: 'User not found.' });
  }

  return res.json({ user: { id: user.id, name: user.name, email: user.email } });
});

app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (token) {
    sessions.delete(token);
  }

  return res.json({ message: 'Logout successful.' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Auth backend running on port ${PORT}`);
});
