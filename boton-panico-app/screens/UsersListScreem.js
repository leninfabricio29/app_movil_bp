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
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Searchbar, Avatar, Button, Divider, Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userService } from '../src/api/users-service';
import Config from '../config/env';
import { MaterialIcons } from '@expo/vector-icons';

// Definir color primario para uso consistente
const PRIMARY_COLOR = '#4A90E2';

const setColorAvatar = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
};

// Componente UserItem para cada usuario en la lista
const UserItem = React.memo(({ item, onAddContact, isAdding }) => {
  const getInitials = (name) => {
    if (!name) return '?';
    const names = name.split(' ');
    return names.length >= 2
      ? `${names[0][0]}${names[1][0]}`.toUpperCase()
      : name[0].toUpperCase();
  };

  return (
    <View style={styles.userItemContainer}>
      <Avatar.Text
        size={48}
        label={getInitials(item.name)}
        style={{ backgroundColor: setColorAvatar() }}
        color="#fff"
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.userDetail} numberOfLines={1}>
          {item.phone}
        </Text>
      </View>
      <Button
        mode="contained"
        onPress={() => onAddContact(item)}
        loading={isAdding === item._id}
        style={styles.addButton}
        labelStyle={styles.addButtonLabel}
        contentStyle={styles.addButtonContent}
      >
        Agregar
      </Button>
    </View>
  );
});

// Pantalla principal de la lista de usuarios
const UsersListScreen = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [addingContact, setAddingContact] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(Config.STORAGE_KEYS.USER_DATA);
        const currentUser = storedUser ? JSON.parse(storedUser) : null;
        const allUsers = await userService.getUsers();
        
        let filtered = allUsers.users || allUsers;
        if (currentUser) {
          filtered = filtered.filter(user => user._id !== currentUser._id);
        }
        
        setUsers(filtered);
        setFilteredUsers(filtered);
      } catch (error) {
        console.error('Error loading data:', error);
        Alert.alert("Error", "No se pudieron cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const onChangeSearch = useCallback((query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        (user.name?.toLowerCase().includes(query.toLowerCase())) ||
        (user.email?.toLowerCase().includes(query.toLowerCase())) ||
        (user.phone?.includes(query))
      );
      setFilteredUsers(filtered);
    }
  }, [users]);

  const handleAddContact = useCallback(async (user) => {
    setAddingContact(user._id);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      Alert.alert("Contacto Agregado", `${user.name} ha sido agregado como contacto.`);
    } catch (error) {
      Alert.alert("Error", "No se pudo agregar el contacto");
    } finally {
      setAddingContact(null);
    }
  }, []);

  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        <Text style={styles.loadingText}>Cargando usuarios...</Text>
      </View>
    );
  }

  // Footer para el FlatList
  const renderFooter = () => (
    <View style={styles.listFooter}>
      <Text style={styles.footerText}>Has llegado al final de la lista</Text>
    </View>
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
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
              {/* Header compacto y más colorido */}
              <View style={styles.header}>
                <View style={styles.headerContent}>
                  <MaterialIcons name="people" size={28} color={PRIMARY_COLOR} />
                  <Text style={styles.headerTitle}>Directorio de Usuarios</Text>
                </View>
                <Text style={styles.headerSubtitle}>Selecciona un usuario para agregarlo</Text>
                <Searchbar
                  placeholder="Buscar usuarios..."
                  onChangeText={onChangeSearch}
                  value={searchQuery}
                  style={styles.searchBar}
                  inputStyle={styles.searchInput}
                  iconColor={PRIMARY_COLOR}
                  placeholderTextColor="#999"
                />
              </View>

              <Divider style={styles.divider} />

              <View style={styles.usersSection}>
                <FlatList
                  data={filteredUsers}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <UserItem
                      item={item}
                      onAddContact={handleAddContact}
                      isAdding={addingContact}
                    />
                  )}
                  contentContainerStyle={[
                    styles.usersList,
                    filteredUsers.length === 0 && styles.emptyList
                  ]}
                  ListEmptyComponent={() => (
                    <View style={styles.emptyResults}>
                      <Text style={styles.emptyResultsText}>
                        No se encontraron resultados
                      </Text>
                    </View>
                  )}
                  ListFooterComponent={filteredUsers.length > 0 ? renderFooter : null}
                  keyboardDismissMode="on-drag"
                  keyboardShouldPersistTaps="handled"
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
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
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    backgroundColor: '#F8F9FA',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#ECF0F1',
    top: 30,

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
    marginVertical: 8
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'

  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666'
  },
  searchBar: {
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ECF0F1'
  },
  searchInput: {
    fontSize: 15,
    color: '#2C3E50'
  },
  divider: {
    height: 1,
    backgroundColor: '#ECF0F1',
    top: 25
  },
  usersSection: {
    flex: 1
  },
  usersList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    top: 45
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center'
  },
  userItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ECF0F1'
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 2
  },
  userDetail: {
    fontSize: 13,
    color: '#7F8C8D'
  },
  addButton: {
    borderRadius: 8,
    backgroundColor: "green",
    minWidth: 80,
    height: 36
  },
  addButtonLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF'
  },
  addButtonContent: {
    height: 36
  },
  emptyResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40
  },
  emptyResultsText: {
    fontSize: 16,
    color: '#95A5A6',
    textAlign: 'center'
  },
  listFooter: {
    paddingVertical: 16,
    alignItems: 'center'
  },
  footerText: {
    fontSize: 14,
    color: '#7F8C8D'
  }
});

export default UsersListScreen;
