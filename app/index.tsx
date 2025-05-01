import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './navigation/TabNavigator';
import { RootStackParamList } from './types/types';
import ReviewScreen from './screens/ReviewScreen';
import AddCardScreen from './screens/AddCardScreen';
import ThemeProvider from './context/ThemeContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <ThemeProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
        />
        <Stack.Screen
          name="Review"
          component={ReviewScreen}
        />
        <Stack.Screen
          name="AddCard"
          component={AddCardScreen}
        />
      </Stack.Navigator>
    </ThemeProvider>
  );
}
