import { useTheme } from '@/app/context/ThemeContext';
import ProfileScreen from '@/app/screens/Tab/ProfileScreen';
import StatsScreen from '@/app/screens/Tab/StatsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { GestureResponderEvent, StatusBar, TouchableOpacity, View } from 'react-native';
import DecksScreen from '../screens/Tab/DecksScreen';
import ReviewScreen from '../screens/Tab/ReviewScreen';
import { Moon, Palette, Sun, BookOpen, Library, BarChart2, User } from 'lucide-react-native';

type RootTabParamList = {
  Review: { deckId: string };
  DeckDetails: undefined;
  Stats: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  const { colors, theme, toggleTheme, colorScheme, setColorScheme } = useTheme();

  const ThemeControls = () => (
    <View style={{ flexDirection: 'row', gap: 16, marginRight: 16 }}>
      <TouchableOpacity onPress={toggleTheme}>
        {theme === 'light' ? (
          <Sun
            size={24}
            color={colors.primary}
          />
        ) : (
          <Moon
            size={24}
            color={colors.primary}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          const schemes: Array<'blue' | 'sage' | 'lavender'> = ['blue', 'sage', 'lavender'];
          const currentIndex = schemes.indexOf(colorScheme);
          const nextIndex = (currentIndex + 1) % schemes.length;
          setColorScheme(schemes[nextIndex]);
        }}>
        <Palette
          size={24}
          color={colors.primary}
        />
      </TouchableOpacity>
    </View>
  );

  const CustomTabButton = ({
    children,
    onPress,
  }: {
    children: React.ReactNode;
    onPress?: (e: GestureResponderEvent) => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {children}
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar
        backgroundColor={colors.surface}
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
      />
      <Tab.Navigator
        screenOptions={{
          headerRight: () => <ThemeControls />,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.surface,
            height: 55,
            borderTopWidth: 0,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginBottom: 4,
          },
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.text,
          tabBarButton: props => <CustomTabButton {...props} />,
        }}>
        <Tab.Screen
          name="Review"
          component={ReviewScreen}
          initialParams={{ deckId: 'deck1' }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <BookOpen
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="DeckDetails"
          component={DecksScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Library
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <BarChart2
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <User
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
