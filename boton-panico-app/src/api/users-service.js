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

// En services/api.js

const userService = {
    // Obtener la lista de usuarios
    getUsers: async () => {
      try {
        // Asegúrate de que esta ruta exista en tu Config
        const url = Config.API_ROUTES.GET_USERS || '/users';
        //console.log('Obteniendo usuarios de:', url);
        const response = await apiClient.get(url);
        //console.log('Respuesta de usuarios:', response.data);
        return response.data;
      } catch (error) {
        //console.error('Error en getUsers:', error);
        throw error;
      }
    },
  };



export { userService };
export default apiClient;