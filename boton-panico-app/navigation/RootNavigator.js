// navigation/RootNavigator.js
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import AppTabs from "./AppTabs";

import HomeStack from './HomeStack'; // ajusta el path


const Stack = createStackNavigator();

const RootNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{ 
        headerShown: false,
        gestureEnabled: false
      }}
    >
      {isAuthenticated ? (
        <>
          {/* IMPORTANTE: AppTabs debe estar primero */}
          <Stack.Screen name="AppTabs" component={AppTabs} />
        </>
      ) : (
        <Stack.Screen name="Auth">
          {(props) => <AuthStack {...props} onLogin={() => setIsAuthenticated(true)} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;