import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Provider as PaperProvider
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { contactService } from '../src/api/contacts-service';

const PRIMARY_COLOR = '#4A90E2';

// Componente que presenta cada contacto como una tarjeta cuadrada
const ContactCard = ({ contact, onViewDetails, onRemove }) => {
  // Función para obtener las iniciales del nombre
  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    return names.length >= 2
      ? `${names[0][0]}${names[1][0]}`.toUpperCase()
      : name[0].toUpperCase();
  };

  return (
    <Card style={styles.card}>
      <Card.Title
        title={contact.alias || contact.name}
        subtitle={
          contact.relationship
            ? contact.relationship.charAt(0).toUpperCase() +
              contact.relationship.slice(1)
            : 'Sin relación'
        }
        left={(props) => (
          <Avatar.Text
            {...props}
            label={
              contact.alias
                ? contact.alias[0].toUpperCase()
                : contact.name
                ? getInitials(contact.name)
                : 'U'
            }
            color="#fff"
            style={{ backgroundColor: PRIMARY_COLOR }}
            size={48}
          />
        )}
      />
      <Card.Actions style={styles.cardActions}>
        <Button onPress={() => onViewDetails(contact)}>Ver detalles</Button>
        <Button onPress={() => onRemove(contact)} color="#E53935">
          Eliminar
        </Button>
      </Card.Actions>
    </Card>
  );
};

const MyContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  // Cargar contactos a través del servicio
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await contactService.getContacts();
      setContacts(data);
    } catch (error) {
      console.error('Error al cargar contactos:', error);
      Alert.alert('Error', 'No se pudieron cargar tus contactos.');
    } finally {
      setLoading(false);
    }
  };

  // Función para ver detalles del contacto (por ahora muestra una alerta de ejemplo)
  const handleViewDetails = (contact) => {
    Alert.alert('Detalles', `Detalles de ${contact.alias || contact.name}`);
  };

  // Función para eliminar un contacto
  const handleRemoveContact = useCallback((contact) => {
    Alert.alert(
      'Eliminar Contacto',
      `¿Estás seguro de eliminar a ${contact.alias || contact.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            setRemoving(contact._id);
            try {
              await contactService.removeContact(contact._id);
              setContacts(prev => prev.filter(c => c._id !== contact._id));
              Alert.alert(
                'Contacto eliminado',
                `${contact.alias || contact.name} fue eliminado.`
              );
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el contacto');
            } finally {
              setRemoving(null);
            }
          }
        }
      ]
    );
  }, []);

  // Renderiza cada tarjeta de contacto
  const renderContact = ({ item }) => (
    <ContactCard
      contact={item}
      onViewDetails={handleViewDetails}
      onRemove={handleRemoveContact}
    />
  );

  return (
    <PaperProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 85 : 0}
        >
          <View style={styles.container}>
            {/* Encabezado */}
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <MaterialIcons name="contacts" size={28} color={PRIMARY_COLOR} />
                <Text style={styles.headerTitle}>Mis Contactos</Text>
              </View>
              <Text style={styles.headerSubtitle}>
                Gestiona tus contactos con facilidad
              </Text>
            </View>
            <Divider style={styles.divider} />

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={PRIMARY_COLOR} />
                <Text style={styles.loadingText}>Cargando contactos...</Text>
              </View>
            ) : contacts.length > 0 ? (
              <FlatList
                data={contacts}
                keyExtractor={(item) => item._id}
                renderItem={renderContact}
                contentContainerStyle={styles.contactsList}
              />
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No tienes contactos agregados.</Text>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  // Encabezado
  header: {
    backgroundColor: '#F8F9FA',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#ECF0F1'
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 8
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#7F8C8D',
    marginTop: 4
  },
  divider: {
    height: 1,
    backgroundColor: '#ECF0F1'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666'
  },
  contactsList: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 16,
    color: '#95A5A6'
  },
  // Estilos de la tarjeta
  card: {
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2
  },
  cardActions: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingBottom: 8
  }
});

export default MyContactsScreen;
