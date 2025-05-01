import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Dimensions } from 'react-native';

import { BarChart, LineChart } from 'react-native-chart-kit';
import { Award, Clock, Book, Target } from 'lucide-react-native';
import { useTheme } from '@/app/context/ThemeContext';
import { dummyDecks } from '@/app/data/dummyData';

const { width } = Dimensions.get('window');
const chartWidth = width - 32; // 16px padding on each side

export default function StatsScreen() {
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
  }, [fadeAnim, slideAnim]);

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

  const chartData = {
    labels: dummyDecks.map(deck => deck.name),
    datasets: [
      {
        data: dummyDecks.map(deck => (deck.masteredCards / deck.totalCards) * 100),
      },
    ],
  };

  const weeklyProgress = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
      },
    ],
  };

  function StatCard({
    title,
    value,
    icon: Icon,
    color,
  }: {
    title: string;
    value: number;
    icon: any;
    color: string;
  }) {
    return (
      <View
        style={[
          styles.statCard,
          {
            backgroundColor: colors.surface,
          },
        ]}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Icon
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
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <View style={styles.statsGrid}>
        <StatCard
          title="Total Cards"
          value={stats.totalCards}
          icon={Book}
          color={colors.primary}
        />
        <StatCard
          title="Mastered"
          value={stats.masteredCards}
          icon={Award}
          color={colors.success}
        />
        <StatCard
          title="Total Decks"
          value={stats.totalDecks}
          icon={Target}
          color={colors.error}
        />
        <StatCard
          title="Average Mastery"
          value={stats.averageMastery}
          icon={Clock}
          color={colors.primary}
        />
      </View>

      <View
        style={[
          styles.chartContainer,
          {
            alignItems: 'center',
            backgroundColor: colors.surface,
          },
        ]}>
        <Text style={[styles.chartTitle, { color: colors.text }]}>Deck Mastery</Text>
        <BarChart
          data={chartData}
          width={width}
          height={220}
          chartConfig={{
            backgroundColor: colors.surface,
            backgroundGradientFrom: colors.surface,
            backgroundGradientTo: colors.surface,
            decimalPlaces: 0,
            color: () => colors.primary,
            labelColor: () => colors.text,
            style: {
              borderRadius: 16,
            },
          }}
          style={styles.chart}
          showBarTops={false}
          fromZero
          yAxisLabel="%"
          yAxisSuffix="%"
        />
      </View>

      <View
        style={[
          styles.chartContainer,
          {
            backgroundColor: colors.surface,
            alignItems: 'center',
          },
        ]}>
        <Text style={[styles.chartTitle, { color: colors.text }]}>Weekly Progress</Text>
        <LineChart
          data={weeklyProgress}
          width={chartWidth}
          height={220}
          chartConfig={{
            backgroundColor: colors.surface,
            backgroundGradientFrom: colors.surface,
            backgroundGradientTo: colors.surface,
            decimalPlaces: 0,
            color: () => colors.primary,
            labelColor: () => colors.text,
            style: {
              borderRadius: 16,
            },
          }}
          style={styles.chart}
          bezier
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chart: {
    borderRadius: 1,
    marginHorizontal: 'auto',
    marginVertical: 2,
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 2,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 48,
    flex: 1,
  },
  content: {
    padding: 0,
  },
  iconContainer: {
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginBottom: 8,
    width: 40,
  },
  statCard: {
    borderRadius: 12,
    elevation: 2,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '48%',
  },
  statTitle: {
    fontSize: 14,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
});
