import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { dummyCards } from '../../data/dummyData';
import { Book, Award, Clock, BarChart2, Tag, HelpCircle } from 'lucide-react-native';

interface Props {
  route: {
    params: {
      deckId: string;
    };
  };
}

export default function DeckInfo({ route }: Props) {
  const { colors } = useTheme();
  const { deckId } = route.params;
  const cards = dummyCards[deckId] || [];

  // Calculate statistics
  const totalCards = cards.length;
  const masteredCards = cards.filter(card => card.mastered).length;
  const averageEf = cards.reduce((sum, card) => sum + card.ef, 0) / totalCards;
  const averageInterval = cards.reduce((sum, card) => sum + card.interval, 0) / totalCards;
  const totalRepetitions = cards.reduce((sum, card) => sum + card.repetitions, 0);

  // Get unique tags
  const uniqueTags = Array.from(new Set(cards.flatMap(card => card.tags)));

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <Book
            size={24}
            color={colors.primary}
          />
          <Text style={[styles.statNumber, { color: colors.text }]}>{totalCards}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Cards</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <Award
            size={24}
            color={colors.primary}
          />
          <Text style={[styles.statNumber, { color: colors.text }]}>{masteredCards}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Mastered</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <Clock
            size={24}
            color={colors.primary}
          />
          <Text style={[styles.statNumber, { color: colors.text }]}>
            {averageInterval.toFixed(1)}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Avg Interval</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <BarChart2
            size={24}
            color={colors.primary}
          />
          <Text style={[styles.statNumber, { color: colors.text }]}>{averageEf.toFixed(1)}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Avg EF</Text>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Tags</Text>
        <View style={styles.tagsContainer}>
          {uniqueTags.map((tag, index) => (
            <View
              key={index}
              style={[styles.tag, { backgroundColor: colors.primary }]}>
              <Tag
                size={16}
                color={colors.background}
              />
              <Text style={[styles.tagText, { color: colors.background }]}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Cards</Text>
        {cards.slice(0, 5).map((card, index) => (
          <View
            key={index}
            style={[styles.cardItem, { borderBottomColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardFront, { color: colors.text }]}>{card.front}</Text>
              <View style={[styles.difficultyBadge, { backgroundColor: colors.primary }]}>
                <Text style={[styles.difficultyText, { color: colors.background }]}>
                  {card.difficulty}
                </Text>
              </View>
            </View>
            <Text style={[styles.cardBack, { color: colors.textSecondary }]}>{card.back}</Text>
            {card.example && (
              <Text style={[styles.cardExample, { color: colors.textSecondary }]}>
                Example: {card.example}
              </Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 14,
  },
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  tagText: {
    fontSize: 14,
  },
  cardItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardFront: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardBack: {
    fontSize: 14,
    marginBottom: 4,
  },
  cardExample: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});
