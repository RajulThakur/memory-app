import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/app/context/ThemeContext';
import { formatRelativeDate } from '@/app/utils/DateHelper';

type MaterialCommunityIconName = keyof typeof MaterialCommunityIcons.glyphMap;

interface Props {
  title: string;
  totalCards: number;
  masteredCards: number;
  cardsToReview?: number;
  onPress: () => void;
}

export default function DeckCard({
  title,
  totalCards,
  masteredCards,
  cardsToReview = 0,
  onPress,
}: Props) {
  const { colors } = useTheme();
  const progress = Math.round((masteredCards / totalCards) * 100);

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.surface }]}
      onPress={onPress}>
      <View style={styles.content}>
        <MaterialCommunityIcons
          name="book"
          size={24}
          color={colors.primary}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <View style={styles.statsContainer}>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {masteredCards} of {totalCards} cards mastered
            </Text>
            {cardsToReview > 0 && (
              <Text style={[styles.reviewText, { color: colors.primary }]}>
                {cardsToReview} cards due today
              </Text>
            )}
          </View>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={colors.textSecondary}
        />
      </View>
      <View style={[styles.progressBar, { backgroundColor: colors.background }]}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
              backgroundColor: colors.primary,
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    marginTop: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  reviewText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 2,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginTop: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});
