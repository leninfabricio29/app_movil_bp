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
  ScrollView,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { authService } from "../src/api/auth-service"; // Importamos el servicio de API
import Config from "../config/env"; // Importamos la configuración

export default function RegisterScreen({ navigation }) {
  const [ci, setCi] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [errors, setErrors] = useState({
    ci: "",
    name: "",
    email: "",
    phone: ""
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      ci: "",
      name: "",
      email: "",
      phone: ""
    };

    if (!ci.trim()) {
      newErrors.ci = "El CI es requerido";
      isValid = false;
    }

    if (!name.trim()) {
      newErrors.name = "El nombre es requerido";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "El correo electrónico es requerido";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Correo electrónico inválido";
      isValid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Preparar datos para enviar al API según la estructura del controlador
      const userData = {
        ci,
        name,
        email,
        phone,
        // lastLocation se manejará en el servidor
      };
      
      // Usar el servicio de autenticación para registrar
      const response = await authService.register(userData);
      
      // Si llegamos aquí, el registro fue exitoso
      Alert.alert(
        "Registro Exitoso",
        "Tu cuenta ha sido registrada. Un administrador validará tus datos para generar tus credenciales.",
        [{ text: "OK", onPress: () => navigation.navigate("Login") }]
      );
      
    } catch (error) {
      // Manejar errores
      console.error("Error en registro:", error);
      
      let errorMessage = "Ocurrió un error al registrar el usuario";
      
      // Si hay una respuesta del servidor con un mensaje de error
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
      
      Alert.alert("Error de Registro", errorMessage);
    } finally {
      setLoading(false);
    }
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
            <Text style={styles.appName}>{Config.APP_NAME}</Text>
            <Text style={styles.slogan}>Crea tu cuenta para continuar</Text>
            
            <View style={styles.formContainer}>
              <View style={styles.gridContainer}>
                {/* Primera fila */}
                <View style={styles.gridItem}>
                  <View style={[styles.inputContainer, errors.ci ? styles.inputError : null]}>
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
                  {errors.ci ? <Text style={styles.errorText}>{errors.ci}</Text> : null}
                </View>
                
                <View style={styles.gridItem}>
                  <View style={[styles.inputContainer, errors.phone ? styles.inputError : null]}>
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
                  {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
                </View>
              </View>
              
              {/* Nombre completo */}
              <View style={[styles.inputContainer, errors.name ? styles.inputError : null]}>
                <Ionicons name="person-outline" size={20} color="#4A6FA5" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Nombre completo"
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor="#A0A0A0"
                />
              </View>
              {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
              
              {/* Email */}
              <View style={[styles.inputContainer, errors.email ? styles.inputError : null]}>
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
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

              <TouchableOpacity 
                style={[styles.registerButton, loading && styles.disabledButton]} 
                onPress={handleRegister}
                disabled={loading}
              >
                <Text style={styles.registerButtonText}>
                  {loading ? "Procesando..." : "Registrarse"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.loginContainer} 
                onPress={() => navigation.navigate("Login")}
                disabled={loading}
              >
                <Text style={styles.loginText}>¿Ya tienes cuenta? Inicia sesión</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.creditsText}>Powered By. SoftKilla - v{Config.VERSION}</Text>
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
    marginBottom: 10
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
    marginBottom: 5
  },
  inputError: {
    borderColor: "#E53E3E",
    borderWidth: 1
  },
  errorText: {
    color: "#E53E3E",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5
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
  disabledButton: {
    backgroundColor: "#A0AEC0",
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