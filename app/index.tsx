import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import ThemeProvider from './context/ThemeContext';
import TabNavigator from './navigation/TabNavigator';
import AddCardScreen from './screens/AddCardScreen';
import SplashScreen from './screens/SplashScreen';
import DeckInfo from './screens/Tab/DeckInfo';
import { RootStackParamList } from './types/types';
import CardReviewDeck from './screens/CardReviewDeck';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { isAuthenticated } from './utils/getToken';
import { getValidToken } from './utils/tokenManager';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const [animationCompleted, setAnimationComplete] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // First check if we have any token
      const hasToken = await isAuthenticated();
      if (!hasToken) {
        setIsAuth(false);
        return;
      }

      // If we have a token, try to get a valid one
      try {
        await getValidToken();
        setIsAuth(true);
      } catch (error) {
        console.error('Error validating token:', error);
        setIsAuth(false);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsAuth(false);
    }
  };

  const changeAnimationStatus = (param: boolean) => {
    setAnimationComplete(param);
  };

  if (!animationCompleted) {
    return <SplashScreen onFinish={changeAnimationStatus} />;
  }

  return (
    <ThemeProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isAuth ? (
          // Authenticated stack
          <>
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
            <Stack.Screen
              name="ReviewDeck"
              options={{
                headerShown: true,
                headerBackVisible: true,
              }}
              component={CardReviewDeck}
            />
          </>
        ) : (
          // Non-authenticated stack
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </ThemeProvider>
  );
}
