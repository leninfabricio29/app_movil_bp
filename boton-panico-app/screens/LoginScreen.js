import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { login } from "../src/api/auth-service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const token = await login(email, password); // Llamar al servicio de login
      console.log("Login exitoso. Token:", token);

      // Guardar el token en AsyncStorage
      await AsyncStorage.setItem("userToken", token);

      // Redirigir a la pantalla principal
      navigation.replace("Home"); // O tu pantalla principal
    } catch (err) {
      console.error("Error de login:", err);
      setError(err.message || "Error desconocido");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
}
