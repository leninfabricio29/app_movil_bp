import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons"; // íconos bonitos
import AccountScreen from '../screens/AccountScreen';
import HistorialScreen from '../screens/HistorialScreen';
import HomeStack from './HomeStack'; // ajusta el path
import UsersListScreen from '../screens/UsersListScreem';


const Tab = createBottomTabNavigator();

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#266ca9",
        tabBarInactiveTintColor: "gray",
        
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Historial") {
            iconName = focused ? "time" : "time-outline";
          } else if (route.name === "Contact") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Historial" component={HistorialScreen} />
      <Tab.Screen name="Contact" component={UsersListScreen} />
      <Tab.Screen name="Settings" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default AppTabs;
