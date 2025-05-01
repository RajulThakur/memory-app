import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BarChart2, Book, Home, Moon, Palette, Sun, User } from 'lucide-react-native';
import { GestureResponderEvent, StatusBar, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import DeckDetailsScreen from '../screens/DeckDetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StatsScreen from '../screens/StatsScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { colors, theme, toggleTheme, colorScheme, setColorScheme } = useTheme();

  const ThemeControls = () => (
    <View style={{ flexDirection: 'row', gap: 16, marginRight: 16 }}>
      <TouchableOpacity onPress={toggleTheme}>
        {theme === 'light' ? (
          <Moon
            size={24}
            color={colors.primary}
          />
        ) : (
          <Sun
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
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Home
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="DeckDetails"
          component={DeckDetailsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Book
                color={color}
                size={size}
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
                color={color}
                size={size}
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
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
