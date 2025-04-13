import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../config/env';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
//import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const { width } = Dimensions.get('window');

export default function HomeScreen({navigation}) {

  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userData = await AsyncStorage.getItem(Config.STORAGE_KEYS.USER_DATA);
        if (userData) {
          const user = JSON.parse(userData);
          setUserName(user.name); // Asumiendo que tu objeto user tiene el campo "name"
        }
      } catch (error) {
        console.error('Error al cargar el usuario:', error);
      }
    };

    fetchUserName();
  }, []);



  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem(Config.STORAGE_KEYS.AUTH_TOKEN);
      await AsyncStorage.removeItem(Config.STORAGE_KEYS.USER_DATA);
      
      if (global.auth) {
        global.auth.logout();
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleSOS = () => {
    console.log('SOS presionado 🚨');
    // Aquí implementar la lógica de emergencia
  };

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem(Config.STORAGE_KEYS.USER_DATA);
  };

  getUserData(); // Llamar a la función para obtener los datos del usuario al cargar la pantalla

  const activeUsers = 52;
 ;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{Config.APP_NAME}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Tarjeta de bienvenida */}
        <Card style={styles.welcomeCard}>
      <Card.Content>
        <Title style={styles.welcomeTitle}>
          {userName ? `¡Hola, ${userName}!` : '¡Hola!'}
        </Title>
        <Paragraph style={styles.welcomeSubtitle}>
          Bienvenido de nuevo. Tu seguridad es nuestra prioridad.
        </Paragraph>
      </Card.Content>
    </Card>

        {/* Sección SOS */}
        <View style={styles.sosSection}>
          <Text style={styles.sectionTitle}>Asistencia de emergencia</Text>
          <View style={styles.sosCentered}>
            <Button 
              mode="contained" 
              onPress={handleSOS} 
              style={styles.sosButton}
              labelStyle={styles.sosLabel}
              buttonColor="#E53935"
              textColor="white"
            >
              SOS
            </Button>
            <Text style={styles.sosDescription}>
              Pulsa en caso de emergencia
            </Text>
          </View>
        </View>

        {/* Opciones rápidas */}
        <View style={styles.quickOptionsSection}>
          <Text style={styles.sectionTitle}>Acciones rápidas</Text>
          <View style={styles.quickOptionsGrid}>
          <TouchableOpacity 
  style={styles.quickOption}
  onPress={() => navigation.navigate('MyContactsScreen')}


>
  <View style={[styles.quickOptionIcon, {backgroundColor: 'gray'}]}>
    <Ionicons name="keypad-outline" size={24} color="white" />
  </View>
  <Text style={styles.quickOptionText}>Otros usuarios</Text>
</TouchableOpacity>
            
           
            
            <TouchableOpacity style={styles.quickOption}>
              <View style={[styles.quickOptionIcon, {backgroundColor: 'gray'}]}>
                <Ionicons name="keypad-outline" size={24} color="white" />
              </View>
              <Text style={styles.quickOptionText}>Configurar API </Text>
            </TouchableOpacity>
            
           
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* Promociones */}
        <View style={styles.promotionsSection}>
          <Text style={styles.sectionTitle}>Novedades y promociones</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.promotionsScrollContent}
          >
            <Card style={styles.promotionCard}>
              <Card.Cover 
                source={{ uri: 'https://cablefamilia.com/wp-content/uploads/2024/05/movil.png' }} 
                style={styles.promotionImage}
              />
              <Card.Content>
                <Title style={styles.promotionTitle}>Nuevo Plan</Title>
                <Paragraph>Conoce nuestro nuevo plan familiar con mejores beneficios</Paragraph>
              </Card.Content>
            </Card>

            <Card style={styles.promotionCard}>
              <Card.Cover 
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvnCFdDJK2c0_vwGLvvPahzXaW2qELE2pTpQ&s' }} 
                style={styles.promotionImage}
              />
              <Card.Content>
                <Title style={styles.promotionTitle}>Seguridad Avanzada</Title>
                <Paragraph>Descubre nuestras nuevas funciones de seguridad</Paragraph>
              </Card.Content>
            </Card>

            <Card style={styles.promotionCard}>
              <Card.Cover 
                source={{ uri: 'https://pbs.twimg.com/media/FOJwku0WQAQS1z6.jpg' }} 
                style={styles.promotionImage}
              />
              <Card.Content>
                <Title style={styles.promotionTitle}>Descuentos</Title>
                <Paragraph>Ofertas especiales por tiempo limitado</Paragraph>
              </Card.Content>
            </Card>
          </ScrollView>
        </View>

        {/* Estadísticas */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Estadísticas</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="people-outline" size={24} color="#2C5282" />
              <Text style={styles.statNumber}>{activeUsers}</Text>
              <Text style={styles.statLabel}>Usuarios activos</Text>
            </View>
            
            <View style={styles.statItem}>
              <Ionicons name="shield-checkmark-outline" size={24} color="#2C5282" />
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Protección</Text>
            </View>
            
            <View style={styles.statItem}>
              <Ionicons name="alert-circle-outline" size={24} color="#2C5282" />
              <Text style={styles.statNumber}>-3min</Text>
              <Text style={styles.statLabel}>Tiempo de respuesta</Text>
            </View>
          </View>
        </View>

        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#266ca9',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  logoutButton: {
    padding: 5,
    color: 'white',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  welcomeCard: {
    marginBottom: 20,
    elevation: 2,
    borderRadius: 10,
  },
  welcomeTitle: {
    fontSize: 22,
    color: '#2C5282',
  },
  welcomeSubtitle: {
    color: '#666',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  sosSection: {
    marginBottom: 25,
  },
  sosCentered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    elevation: 5,
  },
  sosLabel: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sosDescription: {
    marginTop: 10,
    color: '#666',
    textAlign: 'center',
  },
  
  quickOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickOption: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  quickOptionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickOptionText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  divider: {
    marginVertical: 5,
    backgroundColor: '#e0e0e0',
    height: 1,
  },
  promotionsSection: {
    marginVertical: 20,
  },
  promotionsScrollContent: {
    paddingRight: 20,
  },
  promotionCard: {
    width: width * 0.7,
    marginRight: 15,
    borderRadius: 10,
    elevation: 3,
  },
  promotionImage: {
    height: 130,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  promotionTitle: {
    fontSize: 16,
  },
  statsSection: {
    marginBottom: 25,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C5282',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 3,
  },
  securityTipsCard: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#f0f7ff',
  },
  securityTipsTitle: {
    fontSize: 18,
    color: '#2C5282',
    marginBottom: 5,
  },
  securityTipText: {
    color: '#555',
    lineHeight: 20,
  }
});