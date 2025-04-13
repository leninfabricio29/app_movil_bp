// config/env.js
// Archivo de configuración centralizado para variables de entorno

// Detectar el entorno en que se ejecuta la aplicación
const __DEV__ = process.env.NODE_ENV !== 'production';

// Configuración de la API para diferentes entornos
const Config = {
  // URLs de API
  API_URL: __DEV__ ? 'http://3.148.85.5:5050/api' : 'http://localhost:3000',

  // Rutas específicas
  API_ROUTES: {
    REGISTER: '/users/register',
    LOGIN: '/auth/login',
    GET_USER_LOGIN: '/users/:id',
    GET_USERS: '/users',
    CONTACT_REGISTER: '/contacts/register',
    MY_CONTACTS: '/contacts/all-contacts',
    CONTACT_DELETE: '/contacts/:id',
  },

  // Configuración de timeout para peticiones
  API_TIMEOUT: 10000,

  // Otras configuraciones de la aplicación
  APP_NAME: 'SafeGuard',
  
  // Versión de la app
  VERSION: '1.0.0',
  
  // Modo de depuración
  DEBUG: __DEV__,

  // Configuración de almacenamiento local
  STORAGE_KEYS: {
    AUTH_TOKEN: 'safeguard_auth_token',
    USER_DATA: 'safeguard_user_data',
  }
};

// Función helper para construir URLs completas
Config.getFullUrl = (routeName) => {
  // Verificar que la ruta existe en la configuración
  if (!Config.API_ROUTES[routeName]) {
    console.warn(`La ruta '${routeName}' no está definida en la configuración`);
    return Config.API_URL;
  }
  
  return `${Config.API_URL}${Config.API_ROUTES[routeName]}`;
};

export default Config;