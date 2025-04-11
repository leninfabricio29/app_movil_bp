import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack"; // Importamos tu AuthStack
import AppTabs from "./AppTabs"; // Importamos tus AppTabs

const Stack = createStackNavigator();

const RootNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay un token guardado
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      }
    };

    checkLogin();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="AppTabs" component={AppTabs} />
      ) : (
        <Stack.Screen name="Auth">
          {(props) => <AuthStack {...props} onLogin={handleLogin} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;