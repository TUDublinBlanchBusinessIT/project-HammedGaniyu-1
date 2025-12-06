import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './pages/LoginScreen';
import SignupScreen from './pages/SignupScreen';
import HomeScreen from './pages/HomeScreen';
import AddWorkoutScreen from './pages/AddWorkoutScreen';
import HistoryScreen from './pages/HistoryScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">



        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerTitle: 'Login' }}
        />

        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerTitle: 'Sign Up' }}
        />


        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerTitle: 'LiftLog Home' }}
        />

        <Stack.Screen name="AddWorkout" component={AddWorkoutScreen} />

        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ headerTitle: 'History' }}
        />



      </Stack.Navigator>
    </NavigationContainer>
  );
}
