// navigation/HomeStack.js
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import MyContactsScreen from "../screens/MyContactsScreen";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen 
        name="MyContactsScreen" 
        component={MyContactsScreen} 
        options={{
          presentation: 'modal', // opcional si quieres modal
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
