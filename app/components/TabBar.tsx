import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Home, Book, BarChart2, User } from 'lucide-react-native';

export type TabName = 'review' | 'decks' | 'stats' | 'profile';

interface TabBarProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
}

const tabLabels = {
  review: 'Review',
  decks: 'Decks',
  stats: 'Stats',
  profile: 'Profile',
};

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const { colors } = useTheme();

  const tabs = [
    { name: 'review' as TabName, icon: Home },
    { name: 'decks' as TabName, icon: Book },
    { name: 'stats' as TabName, icon: BarChart2 },
    { name: 'profile' as TabName, icon: User },
  ];

  return (
    <View
      style={[styles.container, { backgroundColor: colors.surface, borderTopColor: colors.border }]}
    >
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.name;
        return (
          <TouchableOpacity key={tab.name} style={styles.tab} onPress={() => onTabChange(tab.name)}>
            <Icon size={24} color={isActive ? colors.primary : colors.textSecondary} />
            <Text
              style={[
                styles.tabLabel,
                {
                  color: isActive ? colors.primary : colors.textSecondary,
                },
              ]}
            >
              {tabLabels[tab.name]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderTopWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});
