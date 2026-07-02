const { createActivity, getActivitiesByUser } = require('../models/Activity');

const supportedCategories = ['Transport', 'Electricity', 'Food', 'Waste'];

function addActivity({ userId, category, activityType, date, quantity, unit, description }) {
  if (!userId || !category || !activityType || !date || !quantity || !unit) {
    const error = new Error('User, category, activity type, date, quantity, and unit are required.');
    error.statusCode = 400;
    throw error;
  }

  if (!supportedCategories.includes(category)) {
    const error = new Error('Category must be one of Transport, Electricity, Food, or Waste.');
    error.statusCode = 400;
    throw error;
  }

  const parsedQuantity = Number(quantity);
  if (Number.isNaN(parsedQuantity) || parsedQuantity < 0) {
    const error = new Error('Quantity must be a non-negative number.');
    error.statusCode = 400;
    throw error;
  }

  const activity = createActivity({
    id: Date.now().toString(),
    userId,
    category,
    activityType,
    date,
    quantity: parsedQuantity,
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
