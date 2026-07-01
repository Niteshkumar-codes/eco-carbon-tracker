const API_BASE = '/api/activities';

function getAuthHeaders() {
  const token = localStorage.getItem('ecotrack_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function createActivity(activityData) {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(activityData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Unable to create activity.');
  }

  return data.activity;
}

export async function fetchActivities() {
  const response = await fetch(API_BASE, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Unable to fetch activities.');
  }

  return data.activities;
}
