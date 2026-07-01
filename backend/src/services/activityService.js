const { createActivity, getActivitiesByUser } = require('../models/activityModel');

function addActivity({ userId, category, date, quantity, unit, description }) {
  if (!userId || !category || !date || !quantity || !unit) {
    const error = new Error('User, category, date, quantity, and unit are required.');
    error.statusCode = 400;
    throw error;
  }

  const activity = createActivity({
    id: Date.now().toString(),
    userId,
    category,
    date,
    quantity: Number(quantity),
    unit,
    description: description || '',
  });

  return activity;
}

function listActivities(userId) {
  return getActivitiesByUser(userId);
}

module.exports = {
  addActivity,
  listActivities,
};
