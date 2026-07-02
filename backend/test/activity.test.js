const test = require('node:test');
const assert = require('node:assert/strict');
const { startServer } = require('../server');

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

test('users can create and retrieve their activity entries', async () => {
  const signupResponse = await fetch(`http://127.0.0.1:${port}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Mina', email: 'mina@example.com', password: 'secret123' }),
  });

  const signupData = await signupResponse.json();
  assert.equal(signupResponse.status, 201);
  assert.ok(signupData.token);

  const createResponse = await fetch(`http://127.0.0.1:${port}/api/activities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${signupData.token}`,
    },
    body: JSON.stringify({
      category: 'Transport',
      activityType: 'Bus',
      quantity: 12,
      unit: 'km',
      date: '2026-07-02',
    }),
  });

  const createdData = await createResponse.json();
  assert.equal(createResponse.status, 201);
  assert.equal(createdData.activity.category, 'Transport');
  assert.equal(createdData.activity.activityType, 'Bus');

  const listResponse = await fetch(`http://127.0.0.1:${port}/api/activities`, {
    headers: {
      Authorization: `Bearer ${signupData.token}`,
    },
  });

  const listData = await listResponse.json();
  assert.equal(listResponse.status, 200);
  assert.equal(listData.activities.length, 1);
  assert.equal(listData.activities[0].activityType, 'Bus');
});
