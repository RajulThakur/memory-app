import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../context/ThemeContext';

// Mock data - will be replaced with actual stats from backend
const mockStats = {
  totalCards: 100,
  cardsLearned: 45,
  averageEF: 2.6,
  reviewsToday: 12,
  streakDays: 5,
};

export default function Stats() {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color: colors.text}]}>Your Progress</Text>

      <View style={[styles.progressBar, {backgroundColor: colors.progressTrack}]}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${(mockStats.cardsLearned / mockStats.totalCards) * 100}%`,
              backgroundColor: colors.primary,
            },
          ]}
        />
        <Text style={[styles.progressText, {color: colors.text}]}>
          {mockStats.cardsLearned} / {mockStats.totalCards} Cards
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={[styles.statItem, {backgroundColor: colors.surface}]}>
          <Text style={[styles.statValue, {color: colors.primary}]}>
            {mockStats.averageEF.toFixed(2)}
          </Text>
          <Text style={[styles.statLabel, {color: colors.textSecondary}]}>Average EF</Text>
        </View>

        <View style={[styles.statItem, {backgroundColor: colors.surface}]}>
          <Text style={[styles.statValue, {color: colors.primary}]}>{mockStats.reviewsToday}</Text>
          <Text style={[styles.statLabel, {color: colors.textSecondary}]}>Reviews Today</Text>
        </View>

        <View style={[styles.statItem, {backgroundColor: colors.surface}]}>
          <Text style={[styles.statValue, {color: colors.primary}]}>{mockStats.streakDays}</Text>
          <Text style={[styles.statLabel, {color: colors.textSecondary}]}>Day Streak</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  progressBar: {
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 32,
    position: 'relative',
  },
  progressFill: {
    position: 'absolute',
    height: '100%',
  },
  progressText: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statItem: {
    padding: 16,
    borderRadius: 12,
    width: '30%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
});
