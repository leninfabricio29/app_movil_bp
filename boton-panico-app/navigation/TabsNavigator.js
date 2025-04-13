import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ContactScreen from "../screens/ContactScreen";
import AccountScreen from "../screens/AccountScreen";
import HistorialScreen from "../screens/HistorialScreen";
import { Ionicons } from "@expo/vector-icons"; // íconos bonitos
import UsersSearchScreen from "../screens/UsersSearchScreen";

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#e91e63",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Inicio") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Historial") {
            iconName = focused ? "alert-circle" : "alert-circle-outline";
          }else if (route.name === "Contactos") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Cuenta") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen}  />
      <Tab.Screen name="Historial" component={HistorialScreen} />
      <Tab.Screen name="Contactos" component={ContactScreen} />
      <Tab.Screen name="Cuenta" component={AccountScreen} />
      <Screen name="Usuarios" component={UsersSearchScreen} />
    </Tab.Navigator>
  );
}
