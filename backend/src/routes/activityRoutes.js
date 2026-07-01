const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { addActivity, listActivities } = require('../services/activityService');

const router = express.Router();

router.post('/', authMiddleware, (req, res) => {
  try {
    const activity = addActivity({
      userId: req.user.id,
      category: req.body.category,
      date: req.body.date,
      quantity: req.body.quantity,
      unit: req.body.unit,
      description: req.body.description,
    });
    return res.status(201).json({ activity });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.get('/', authMiddleware, (req, res) => {
  const activities = listActivities(req.user.id);
  return res.json({ activities });
});

module.exports = router;
