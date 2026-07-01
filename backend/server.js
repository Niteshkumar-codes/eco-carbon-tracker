const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const activityRoutes = require('./src/routes/activityRoutes');

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/api/auth', authRoutes);
  app.use('/api/activities', activityRoutes);

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  return app;
}

function startServer(port = process.env.PORT || 5000) {
  const app = createApp();

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      resolve({ app, server, port: server.address().port });
    });
  });
}

if (require.main === module) {
  startServer().then(({ server, port }) => {
    console.log(`Auth backend running on port ${port}`);
  });
}

module.exports = {
  createApp,
  startServer,
};
