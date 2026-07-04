const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = data?.error || data?.message || 'Erro na requisição';
    throw new Error(error);
  }

  return data;
}

export async function loginRequest(credentials) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: credentials,
  });
}

export async function signupRequest(user) {
  return apiRequest('/auth/signup', {
    method: 'POST',
    body: user,
  });
}

export async function forgotPasswordRequest(payload) {
  return apiRequest('/auth/forgot-password', {
    method: 'POST',
    body: payload,
  });
}

export async function getComplaintsRequest() {
  return apiRequest('/complaints', {
    method: 'GET',
  });
}

export async function updateComplaintRequest(id, updates) {
  return apiRequest(`/complaints/${id}`, {
    method: 'PATCH',
    body: updates,
  });
}

export async function deleteComplaintRequest(id) {
  return apiRequest(`/complaints/${id}`, {
    method: 'DELETE',
  });
}
