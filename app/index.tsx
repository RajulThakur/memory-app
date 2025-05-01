import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import ThemeProvider from './context/ThemeContext';
import TabNavigator from './navigation/TabNavigator';
import AddCardScreen from './screens/AddCardScreen';
import SplashScreen from './screens/SplashScreen';
import DeckInfo from './screens/Tab/DeckInfo';
import { RootStackParamList } from './types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const [animationCompleted, setAnimationComplete] = useState<boolean>(false);
  const changeAnimationStatus = (param: boolean) => {
    setAnimationComplete(param);
  };
  return (
    <>
      {!animationCompleted ? (
        <SplashScreen onFinish={changeAnimationStatus} />
      ) : (
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
              name="AddCard"
              component={AddCardScreen}
            />
            <Stack.Screen
              name="DeckInfo"
              component={DeckInfo}
            />
          </Stack.Navigator>
        </ThemeProvider>
      )}
    </>
  );
}
