import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

// Mock data - will be replaced with actual stats from backend
const mockStats = {
  totalCards: 100,
  cardsLearned: 45,
  averageEF: 2.6,
  reviewsToday: 12,
  streakDays: 5,
};

export default function Stats() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Your Progress</Text>

      <View style={[styles.progressBar, { backgroundColor: colors.progressTrack }]}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${(mockStats.cardsLearned / mockStats.totalCards) * 100}%`,
              backgroundColor: colors.primary,
            },
          ]}
        />
        <Text style={[styles.progressText, { color: colors.text }]}>
          {mockStats.cardsLearned} / {mockStats.totalCards} Cards
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={[styles.statItem, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {mockStats.averageEF.toFixed(2)}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Average EF</Text>
        </View>

        <View style={[styles.statItem, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {mockStats.reviewsToday}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Reviews Today</Text>
        </View>

        <View style={[styles.statItem, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statValue, { color: colors.primary }]}>{mockStats.streakDays}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Day Streak</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  progressBar: {
    borderRadius: 20,
    height: 40,
    marginBottom: 32,
    overflow: 'hidden',
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    position: 'absolute',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    height: '100%',
    position: 'absolute',
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    borderRadius: 12,
    elevation: 2,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    width: '30%',
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
});
