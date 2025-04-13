// App.js o archivo principal de navegación
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AppTabs from './navigation/AppTabs';
import Config from './config/env'; // Asegúrate de que la ruta sea correcta

const Stack = createStackNavigator();

// Componente para las pantallas de autenticación
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Verificar autenticación al inicio
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem(Config.STORAGE_KEYS.AUTH_TOKEN);
        setIsAuthenticated(!!token); // Convertir a booleano
      } catch (e) {
        console.log('Error verificando token:', e);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Funciones globales para autenticación
  const handleAuthentication = (authenticated) => {
    setIsAuthenticated(authenticated);
  };
  
  // Pasar estas funciones al contexto global o como props
  React.useEffect(() => {
    // Hacerlas disponibles globalmente
    global.auth = {
      login: () => handleAuthentication(true),
      logout: () => handleAuthentication(false)
    };
    
    return () => {
      delete global.auth;
    };
  }, []);

  if (isLoading) {
    // Puedes mostrar un splash screen o indicador de carga
    return null; // O un componente de carga
  }

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {isAuthenticated ? (
          // Si está autenticado, mostrar las tabs de la app
          <Stack.Screen name="Main" component={AppTabs} 
            options={{ headerShown: false }}  // Ocultar el header
          />
        ) : (
          // Si no está autenticado, mostrar pantallas de autenticación
          <Stack.Screen name="Auth" component={AuthStack}
          options={{ headerShown: false }}  // Ocultar el header
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}