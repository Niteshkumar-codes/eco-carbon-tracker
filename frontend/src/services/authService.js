const API_BASE = '/api/auth';

function getAuthHeaders() {
  const token = localStorage.getItem('ecotrack_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function signupUser(name, email, password) {
  const response = await fetch(`${API_BASE}/signup`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Signup failed.');
  }

  if (data.token) {
    localStorage.setItem('ecotrack_token', data.token);
  }

  return data;
}

export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Login failed.');
  }

  if (data.token) {
    localStorage.setItem('ecotrack_token', data.token);
  }

  return data;
}

export async function getCurrentUser() {
  const response = await fetch(`${API_BASE}/me`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Unable to fetch user.');
  }

  return data.user;
}

export async function logoutUser() {
  try {
    await fetch(`${API_BASE}/logout`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
  } finally {
    localStorage.removeItem('ecotrack_token');
  }
}
