const { addActivity, listActivities } = require('../services/activityService');

function createActivityHandler(req, res) {
  try {
    const activity = addActivity({
      userId: req.user.id,
      category: req.body.category,
      activityType: req.body.activityType,
      quantity: req.body.quantity,
      unit: req.body.unit,
      date: req.body.date,
      description: req.body.description,
    });

    return res.status(201).json({ activity });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
}

function getActivitiesHandler(req, res) {
  try {
    const activities = listActivities(req.user.id);
    return res.json({ activities });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
}

module.exports = {
  createActivityHandler,
  getActivitiesHandler,
};
