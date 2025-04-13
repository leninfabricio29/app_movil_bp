// services/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../config/env';

const apiClient = axios.create({
  baseURL: Config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: Config.API_TIMEOUT,
});

// Interceptor para autenticación
apiClient.interceptors.request.use(
  async (config) => {
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

const contactService = {
  // Obtener contactos del usuario
  getContacts: async () => {
    try {
        console.log('Obteniendo contactos de:', Config.API_ROUTES.MY_CONTACTS);
      const response = await apiClient.get(Config.API_ROUTES.MY_CONTACTS);
      console.log('Respuesta de contactos:', response.data);
      return response.data.data; // Asumiendo que los datos vienen en response.data.data
    } catch (error) {
      console.error('Error al obtener contactos:', error);
      throw error;
    }
  },

  // Agregar nuevo contacto
  addContact: async (contactData) => {
    try {
      const response = await apiClient.post(Config.API_ROUTES.CONTACT_REGISTER, {
        contactUser: contactData._id, // ID del usuario a agregar como contacto
        alias: contactData.alias,
        relationship: contactData.relationship
      });
      return response.data;
    } catch (error) {
      console.error('Error al agregar contacto:', error);
      throw error;
    }
  },

  // Eliminar contacto
  removeContact: async (contactId) => {
    try {
      const response = await apiClient.delete(`${Config.API_ROUTES.CONTACT_DELETE}/${contactId}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar contacto:', error);
      throw error;
    }
  }
};

export { contactService };
export default apiClient;