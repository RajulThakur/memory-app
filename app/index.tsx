import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashcardView from './components/FlashcardView';
import DecksScreen from './screens/DecksScreen';
import DeckDetailsScreen from './screens/DeckDetailsScreen';
import AddCardScreen from './screens/AddCardScreen';
import StatsScreen from './screens/StatsScreen';
import ProfileScreen from './screens/ProfileScreen';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ThemeModal from './components/ThemeModal';
import TabBar, { type TabName } from './components/TabBar';
import Header from './components/Header';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainScreen() {
  const [activeTab, setActiveTab] = useState<TabName>('review');
  const [showThemeModal, setShowThemeModal] = useState(false);
  const { colors } = useTheme();

  const renderContent = () => {
    switch (activeTab) {
      case 'review':
        return <FlashcardView />;
      case 'decks':
        return <DecksScreen />;
      case 'stats':
        return <StatsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <FlashcardView />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.statusBar} backgroundColor={colors.primary} animated={true} />

      <Header onOpenThemeModal={() => setShowThemeModal(true)} />

      <ThemeModal visible={showThemeModal} onClose={() => setShowThemeModal(false)} />

      <View style={styles.content}>{renderContent()}</View>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Home' }} />
        <Stack.Screen
          name="DeckDetails"
          component={DeckDetailsScreen}
          options={{ title: 'Deck Details' }}
        />
        <Stack.Screen name="AddCard" component={AddCardScreen} options={{ title: 'Add Card' }} />
      </Stack.Navigator>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});
