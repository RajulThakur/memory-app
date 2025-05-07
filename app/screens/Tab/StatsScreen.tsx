import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/app/context/ThemeContext';
import { dummyDecks } from '@/app/data/dummyData';

type MaterialCommunityIconName = keyof typeof MaterialCommunityIcons.glyphMap;

export default function StatsScreen() {
  const { colors } = useTheme();

  const stats = {
    totalCards: dummyDecks.reduce((sum, deck) => sum + deck.totalCards, 0),
    masteredCards: dummyDecks.reduce((sum, deck) => sum + deck.masteredCards, 0),
    totalDecks: dummyDecks.length,
    averageMastery: Math.round(
      (dummyDecks.reduce((sum, deck) => sum + deck.masteredCards, 0) /
        dummyDecks.reduce((sum, deck) => sum + deck.totalCards, 0)) *
        100
    ),
  };

  function StatCard({
    title,
    value,
    iconName,
    color,
  }: {
    title: string;
    value: number;
    iconName: MaterialCommunityIconName;
    color: string;
  }) {
    return (
      <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <MaterialCommunityIcons
            name={iconName}
            size={24}
            color="#fff"
          />
        </View>
        <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
        <Text style={[styles.statTitle, { color: colors.textSecondary }]}>{title}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.statsGrid}>
        <StatCard
          title="Total Cards"
          value={stats.totalCards}
          iconName="cards"
          color={colors.primary}
        />
        <StatCard
          title="Mastered"
          value={stats.masteredCards}
          iconName="trophy"
          color={colors.success}
        />
        <StatCard
          title="Total Decks"
          value={stats.totalDecks}
          iconName="book-multiple"
          color={colors.error}
        />
        <StatCard
          title="Average Mastery"
          value={stats.averageMastery}
          iconName="clock"
          color={colors.primary}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
  },
});
