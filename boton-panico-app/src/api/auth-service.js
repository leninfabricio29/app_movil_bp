// services/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../config/env';

// Crear instancia de axios con configuración común
const apiClient = axios.create({
  baseURL: Config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: Config.API_TIMEOUT,
});

// Interceptor para añadir token de autenticación a las peticiones
apiClient.interceptors.request.use(
  async (config) => {
    // Obtener el token de autenticación si existe
    try {
      const token = await AsyncStorage.getItem(Config.STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error al recuperar el token:', error);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Servicios de autenticación
const authService = {
  // Registrar un nuevo usuario
  register: async (userData) => {
    try {
      const url = Config.API_ROUTES.REGISTER;
      const response = await apiClient.post(url, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Login de usuario
  // Login de usuario
login: async (credentials) => {
  try {
    const url = Config.API_ROUTES.LOGIN;
    console.log('URL completa de login:', `${Config.API_URL}${url}`);
    console.log('Datos enviados:', JSON.stringify(credentials));
    
    const response = await apiClient.post(url, credentials);
    console.log('Respuesta de login:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error detallado:', error.response ? {
      status: error.response.status,
      data: error.response.data,
      headers: error.response.headers
    } : error.message);
    throw error;
  }
},

  // Obtener datos del usuario logueado
  getUser: async (userId) => {
    try {
      const url = Config.API_ROUTES.GET_USER_LOGIN.replace(':id', userId);
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  

};

export { authService };
export default apiClient;