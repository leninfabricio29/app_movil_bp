import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    console.log("Registrando", email, password);
    navigation.navigate("Login"); // Regresar a login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Crear cuenta</Text>
      <TextInput
        style={styles.input}
        placeholder="Cédula de identidad"
        value={email}
        onChangeText={setEmail}
        keyboardType="ci"
      />

<TextInput
        style={styles.input}
        placeholder="Nombres y apellidos"
        value={email}
        onChangeText={setEmail}
        keyboardType="name"
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

        <TextInput
        style={styles.input}
        placeholder="Número de teléfono"
        value={email}
        onChangeText={setEmail}
        keyboardType="phone-pad"
        />
      

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  logo: { fontSize: 32, fontWeight: "bold", textAlign: "center", marginBottom: 30 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, marginBottom: 20, borderRadius: 8 },
  button: { backgroundColor: "#e91e63", padding: 15, borderRadius: 8, marginBottom: 10 },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  link: { color: "#e91e63", textAlign: "center", marginTop: 10 },
});
