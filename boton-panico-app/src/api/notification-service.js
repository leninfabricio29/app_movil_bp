import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../config/env';

export async function registerForPushNotificationsAsync() {
  let token;

  if (!Device.isDevice) {
    Alert.alert('Solo funciona en dispositivos reales');
    return;
  }

  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Permiso denegado', 'No se pueden enviar notificaciones');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('📱 Expo Push Token:', token);

    const authToken = await AsyncStorage.getItem(Config.STORAGE_KEYS.AUTH_TOKEN);
    const apiUrl = `${Config.API_URL}/users/token`;

    console.log('🔐 Bearer Token:', authToken);
    console.log('🌍 API URL:', apiUrl);
    console.log('📦 Body:', JSON.stringify({ expoToken: token }));

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ expoToken: token }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log('✅ Token enviado al backend:', data);
    } else {
      console.error('❌ Error desde backend:', data);
    }

  } catch (error) {
    console.error('💥 Error al registrar token:', error.message);
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
