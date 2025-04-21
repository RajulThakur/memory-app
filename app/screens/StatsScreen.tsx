import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, ScrollView, Animated, Dimensions} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {dummyDecks} from '../data/dummyData';
import {BarChart, LineChart} from 'react-native-chart-kit';
import {Award, Clock, Book, Target} from 'lucide-react-native';

const {width} = Dimensions.get('window');

export default function StatsScreen() {
  const {colors} = useTheme();
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

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
  }: {
    title: string;
    value: number;
    icon: any;
    color: string;
  }) => (
    <Animated.View
      style={[
        styles.statCard,
        {
          backgroundColor: colors.surface,
          opacity: fadeAnim,
          transform: [{translateY: slideAnim}],
        },
      ]}
    >
      <View style={[styles.iconContainer, {backgroundColor: color}]}>
        <Icon
          size={24}
          color="#fff"
        />
      </View>
      <Text style={[styles.statValue, {color: colors.text}]}>{value}</Text>
      <Text style={[styles.statTitle, {color: colors.textSecondary}]}>{title}</Text>
    </Animated.View>
  );

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, {color: colors.text}]}>Statistics</Text>

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

      <Animated.View
        style={[
          styles.chartContainer,
          {
            backgroundColor: colors.surface,
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}],
          },
        ]}
      >
        <Text style={[styles.chartTitle, {color: colors.text}]}>Deck Mastery</Text>
        <BarChart
          data={chartData}
          width={width - 48}
          height={220}
          chartConfig={{
            backgroundColor: colors.surface,
            backgroundGradientFrom: colors.surface,
            backgroundGradientTo: colors.surface,
            decimalPlaces: 0,
            color: (opacity = 1) => colors.primary,
            labelColor: (opacity = 1) => colors.text,
            style: {
              borderRadius: 16,
            },
          }}
          style={styles.chart}
          yAxisSuffix="%"
          showBarTops={false}
          fromZero
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.chartContainer,
          {
            backgroundColor: colors.surface,
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}],
          },
        ]}
      >
        <Text style={[styles.chartTitle, {color: colors.text}]}>Weekly Progress</Text>
        <LineChart
          data={weeklyProgress}
          width={width - 48}
          height={220}
          chartConfig={{
            backgroundColor: colors.surface,
            backgroundGradientFrom: colors.surface,
            backgroundGradientTo: colors.surface,
            decimalPlaces: 0,
            color: (opacity = 1) => colors.primary,
            labelColor: (opacity = 1) => colors.text,
            style: {
              borderRadius: 16,
            },
          }}
          style={styles.chart}
          bezier
        />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  chartContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
