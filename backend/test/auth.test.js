const test = require('node:test');
const assert = require('node:assert/strict');
const { createApp, startServer } = require('../server');

let server;
let port;

test.before(async () => {
  const result = await startServer(0);
  server = result.server;
  port = result.port;
});

test.after(async () => {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('signup, login, protected profile, and logout work', async () => {
  const signupResponse = await fetch(`http://127.0.0.1:${port}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Asha', email: 'asha@example.com', password: 'secret123' }),
  });

  const signupData = await signupResponse.json();
  assert.equal(signupResponse.status, 201);
  assert.equal(signupData.message, 'Signup successful.');
  assert.ok(signupData.token);

  const loginResponse = await fetch(`http://127.0.0.1:${port}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'asha@example.com', password: 'secret123' }),
  });

  const loginData = await loginResponse.json();
  assert.equal(loginResponse.status, 200);
  assert.equal(loginData.user.email, 'asha@example.com');

  const meResponse = await fetch(`http://127.0.0.1:${port}/api/auth/me`, {
    headers: { Authorization: `Bearer ${loginData.token}` },
  });

  const meData = await meResponse.json();
  assert.equal(meResponse.status, 200);
  assert.equal(meData.user.email, 'asha@example.com');

  const logoutResponse = await fetch(`http://127.0.0.1:${port}/api/auth/logout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${loginData.token}` },
  });

  const logoutData = await logoutResponse.json();
  assert.equal(logoutResponse.status, 200);
  assert.equal(logoutData.message, 'Logout successful.');
});
