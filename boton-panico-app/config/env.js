// config/env.js

// Captura el entorno desde variables de entorno definidas en eas.json
const __ENV__ = process.env.ENV || 'development';
const __DEV__ = __ENV__ !== 'production';

const Config = {
  // En tu caso la URL es la misma, pero puedes cambiarla si lo deseas según __ENV__
  API_URL: 'https://softkilla.es/api',

  API_ROUTES: {
    REGISTER: '/users/register',
    LOGIN: '/auth/login',
    GET_USER_LOGIN: '/users/:id',
    GET_USERS: '/users',
    CONTACT_REGISTER: '/contacts/register',
    MY_CONTACTS: '/contacts/all-contacts',
    CONTACT_DELETE: '/contacts/:id',
  },

  API_TIMEOUT: 10000,
  APP_NAME: 'SafeGuard',
  VERSION: '1.0.0',
  DEBUG: __DEV__,

  STORAGE_KEYS: {
    AUTH_TOKEN: 'safeguard_auth_token',
    USER_DATA: 'safeguard_user_data',
  }
};

Config.getFullUrl = (routeName) => {
  if (!Config.API_ROUTES[routeName]) {
    console.warn(`La ruta '${routeName}' no está definida en la configuración`);
    return Config.API_URL;
  }
  return `${Config.API_URL}${Config.API_ROUTES[routeName]}`;
};

export default Config;
