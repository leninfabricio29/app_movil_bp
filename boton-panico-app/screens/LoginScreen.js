import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleLogin = () => {
    console.log("Intentando login con", email, password);
    // Lógica de autenticación aquí
    onLogin(); // Simula que se logueó
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <View style={styles.content}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2345/2345500.png' }} 
            style={styles.logo} 
            resizeMode="contain"
          />
          <Text style={styles.appName}>SafeGuard</Text>
          <Text style={styles.slogan}>Seguridad a un toque de distancia</Text>
          
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#4A6FA5" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#A0A0A0"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#4A6FA5" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={secureTextEntry}
                placeholderTextColor="#A0A0A0"
              />
              <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                <Ionicons
                  name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#4A6FA5"
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerContainer} onPress={() => navigation.navigate("Register")}>
              <Text style={styles.registerText}>Crear cuenta nueva</Text>
            </TouchableOpacity>

          </View>
          <Text style={styles.creditsText}>Powered By. SoftKilla</Text>

        </View>
      </KeyboardAvoidingView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  keyboardContainer: {
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 15
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C5282",
    marginBottom: 10
  },
  slogan: {
    color: "#718096",
    marginBottom: 40,
    fontSize: 14
  },
  formContainer: {
    width: "100%"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#F7FAFC",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0"
  },
  inputIcon: {
    paddingLeft: 15,
    paddingRight: 10
  },
  input: {
    flex: 1,
    height: 50,
    color: "#2D3748",
    fontSize: 16
  },
  eyeIcon: {
    paddingRight: 15
  },
  loginButton: {
    backgroundColor: "#2C5282",
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 1
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700"
  },
  registerContainer: {
    marginTop: 20,
    alignItems: "center"
  },
  registerText: {
    color: "#2C5282",
    fontSize: 16
  },
  creditsText: {
    color: "gray",
    fontSize: 12,
    marginTop: 20
  }
});