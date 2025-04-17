// DebugScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { registerForPushNotificationsAsync } from '../src/api/notification-service';

export default function DebugScreen() {
  const [token, setToken] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    const debugPush = async () => {
      const token = await registerForPushNotificationsAsync();
      setToken(token || 'No token generado');

      if (token) {
        setResult('Token enviado al backend con éxito.');
      } else {
        setResult('Error generando o enviando el token.');
      }
    };

    debugPush();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>🔧 Debug de Push Token</Text>
      <Text style={{ marginTop: 10 }}>Token:</Text>
      <Text selectable style={{ color: 'blue' }}>{token}</Text>

      <Text style={{ marginTop: 20 }}>Resultado:</Text>
      <Text>{result}</Text>
    </ScrollView>
  );
}
