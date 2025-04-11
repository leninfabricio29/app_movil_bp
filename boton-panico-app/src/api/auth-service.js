import axios from "axios";

// Cambia esto por la URL de tu API real
const API_URL = "http://172.22.48.1:5050/api/auth/login";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    
    if (response.status === 200) {
      // El login fue exitoso, podemos devolver el token
      return response.data.token;
    }

    throw new Error(response.data.message || "Error desconocido");
  } catch (error) {
    throw error.response?.data || error;
  }
};
