const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createActivityHandler, getActivitiesHandler } = require('../controllers/activityController');

const router = express.Router();

router.post('/', authMiddleware, createActivityHandler);
router.get('/', authMiddleware, getActivitiesHandler);

module.exports = router;
