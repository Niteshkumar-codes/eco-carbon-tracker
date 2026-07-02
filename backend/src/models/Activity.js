const activities = [];

function createActivity({ id, userId, category, activityType, date, quantity, unit, description }) {
  const activity = {
    id,
    userId,
    category,
    activityType,
    date,
    quantity,
    unit,
    description: description || '',
  };

  activities.push(activity);
  return activity;
}

function getActivitiesByUser(userId) {
  return activities
    .filter((activity) => activity.userId === userId)
    .sort((left, right) => new Date(right.date) - new Date(left.date));
}

module.exports = {
  createActivity,
  getActivitiesByUser,
};
