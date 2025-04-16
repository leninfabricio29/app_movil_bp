import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AppTabs from './navigation/AppTabs';
import Config from './config/env';
import { registerForPushNotificationsAsync } from './src/api/notification-service';
import * as Notifications from 'expo-notifications';

// 👇 Configurar handler para mostrar notificaciones cuando la app está abierta
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const token = await AsyncStorage.getItem(Config.STORAGE_KEYS.AUTH_TOKEN);
        const isAuth = !!token;
        setIsAuthenticated(isAuth);

        if (isAuth) {
          await registerForPushNotificationsAsync();

          // Escuchar notificaciones mientras la app está abierta
          notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log('📬 Notificación recibida en foreground:', notification);
          });

          // Escuchar interacciones con la notificación (cuando se toca)
          responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('👆 Notificación tocada:', response);
          });

          // Configuración del canal para Android
          if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
              name: 'default',
              importance: Notifications.AndroidImportance.MAX,
              vibrationPattern: [0, 250, 250, 250],
              lightColor: '#FF231F7C',
            });
          }
        }
      } catch (error) {
        console.error('❌ Error inicializando la app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();

    return () => {
      if (notificationListener.current) Notifications.removeNotificationSubscription(notificationListener.current);
      if (responseListener.current) Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // Manejo global de login/logout
  useEffect(() => {
    global.auth = {
      login: () => handleAuthentication(true),
      logout: () => handleAuthentication(false),
    };
    return () => {
      delete global.auth;
    };
  }, []);

  const handleAuthentication = (authenticated) => {
    setIsAuthenticated(authenticated);
  };

  if (isLoading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={AppTabs} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
