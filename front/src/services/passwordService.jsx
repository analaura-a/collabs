const API_URL = 'http://localhost:3333/api';

export const requestPasswordReset = async (email) => {

  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Ocurrió un error desconocido al intentar solicitar el restablecimiento de contraseña.');
  }

  return data;
};

export const resetPassword = async (token, newPassword) => {

  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, password: newPassword }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Ocurrió un error desconocido al intentar restablecer la contraseña.');
  }

  return data;
};