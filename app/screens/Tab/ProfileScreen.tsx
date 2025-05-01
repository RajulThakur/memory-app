import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { User, Settings, Bell, Bookmark, LogOut, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/app/context/ThemeContext';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const MenuItem = ({
    icon: Icon,
    title,
    onPress,
  }: {
    icon: any;
    title: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.menuItem, { backgroundColor: colors.surface }]}
      onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
          <Icon
            size={20}
            color="#fff"
          />
        </View>
        <Text style={[styles.menuItemText, { color: colors.text }]}>{title}</Text>
      </View>
      <ChevronRight
        size={20}
        color={colors.textSecondary}
      />
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <User
              size={40}
              color="#fff"
            />
          </View>
        </View>
        <Text style={[styles.name, { color: colors.text }]}>John Doe</Text>
        <Text style={[styles.email, { color: colors.textSecondary }]}>john.doe@example.com</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text }]}>150</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Cards Studied</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text }]}>5</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Active Streak</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text }]}>85%</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Mastery Rate</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <MenuItem
          icon={Settings}
          title="Settings"
          onPress={() => {
            console.log('Settings');
          }}
        />
        <MenuItem
          icon={Bell}
          title="Notifications"
          onPress={() => {
            console.log('Settings');
          }}
        />
        <MenuItem
          icon={Bookmark}
          title="Saved Cards"
          onPress={() => {
            console.log('Settings');
          }}
        />
        <MenuItem
          icon={LogOut}
          title="Log Out"
          onPress={() => {
            console.log('Settings');
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 24,
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  menuContainer: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
