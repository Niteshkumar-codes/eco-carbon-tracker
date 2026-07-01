const activities = [];

function createActivity({ id, userId, category, date, quantity, unit, description }) {
  const activity = { id, userId, category, date, quantity, unit, description };
  activities.push(activity);
  return activity;
}

function getActivitiesByUser(userId) {
  return activities.filter((activity) => activity.userId === userId);
}

module.exports = {
  createActivity,
  getActivitiesByUser,
};
