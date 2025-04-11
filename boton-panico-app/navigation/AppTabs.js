import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/AccountScreen';
import ContactScreen from '../screens/ContactScreen';
import HistorialScreen from '../screens/HistorialScreen';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={AccountScreen} />
         <Tab.Screen name="Contact" component={ContactScreen} />
        <Tab.Screen name="Historial" component={HistorialScreen} />
    </Tab.Navigator>
  );
};

export default AppTabs;
