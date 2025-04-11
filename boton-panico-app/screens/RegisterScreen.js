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
  Platform,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen({ navigation }) {
  const [ci, setCi] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureConfirmTextEntry, setSecureConfirmTextEntry] = useState(true);

  const handleRegister = () => {
    console.log("Registro con:", { ci, fullName, email, phone, password });
    // Aquí iría la lógica de registro
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2345/2345500.png' }} 
              style={styles.logo} 
              resizeMode="contain"
            />
            <Text style={styles.appName}>SafeGuard</Text>
            <Text style={styles.slogan}>Crea tu cuenta para continuar</Text>
            
            <View style={styles.formContainer}>
              <View style={styles.gridContainer}>
                {/* Primera fila */}
                <View style={styles.gridItem}>
                  <View style={styles.inputContainer}>
                    <Ionicons name="card-outline" size={20} color="#4A6FA5" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="CI"
                      value={ci}
                      onChangeText={setCi}
                      keyboardType="number-pad"
                      placeholderTextColor="#A0A0A0"
                    />
                  </View>
                </View>
                
                <View style={styles.gridItem}>
                  <View style={styles.inputContainer}>
                    <Ionicons name="call-outline" size={20} color="#4A6FA5" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Teléfono"
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                      placeholderTextColor="#A0A0A0"
                    />
                  </View>
                </View>
              </View>
              
              {/* Nombre completo */}
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#4A6FA5" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Nombre completo"
                  value={fullName}
                  onChangeText={setFullName}
                  placeholderTextColor="#A0A0A0"
                />
              </View>
              
              {/* Email */}
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
              
             

              <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>Registrarse</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.loginContainer} 
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.loginText}>¿Ya tienes cuenta? Inicia sesión</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.creditsText}>Powered By. SoftKilla</Text>
          </View>
        </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C5282",
    marginBottom: 8
  },
  slogan: {
    color: "#718096",
    marginBottom: 30,
    fontSize: 14
  },
  formContainer: {
    width: "100%"
  },
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  gridItem: {
    flex: 0.48
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7FAFC",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 15
  },
  inputIcon: {
    paddingLeft: 12,
    paddingRight: 8
  },
  input: {
    flex: 1,
    height: 48,
    color: "#2D3748",
    fontSize: 15
  },
  eyeIcon: {
    paddingRight: 12
  },
  registerButton: {
    backgroundColor: "#2C5282",
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 1
  },
  registerButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700"
  },
  loginContainer: {
    marginTop: 20,
    alignItems: "center"
  },
  loginText: {
    color: "#2C5282",
    fontSize: 15
  },
  creditsText: {
    color: "gray",
    fontSize: 12,
    marginTop: 20
  }
});