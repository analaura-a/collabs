const API_URL = 'http://localhost:3333/api';

//Solicita un correo de restablecimiento de contraseña.
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
      throw new Error(data.message || 'Error al solicitar el restablecimiento de contraseña.'); // Manejo de errores
    }
  
    return data; 
  };

//Restablecer la contraseña del usuario.
  export const resetPassword = async (token, newPassword) => {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Enviamos el token y la nueva contraseña al backend
      body: JSON.stringify({ token, password: newPassword }), 
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || 'Error al restablecer la contraseña.'); 
    }
  
    return data; 
  };