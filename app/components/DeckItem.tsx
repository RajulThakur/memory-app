import { Book, CheckCircle2 } from 'lucide-react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { dummyDecks } from '../data/dummyData';
import type { RootStackParamList } from '../types/types';

const { width,height } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2; // 32 is total horizontal padding (8 + 8 + 8 + 8)
const CARD_HEIGHT = height * 0.2; // 20% taller than width

type Props = {
  item: (typeof dummyDecks)[0];
  navigation: NativeStackNavigationProp<RootStackParamList, 'Review'>;
};

export default function DeckItem({ item: deck, navigation }: Props) {
  const completionPercentage = (deck.masteredCards / deck.totalCards) * 100;
  const isCompleted = completionPercentage === 100;
  const { colors } = useTheme();

  const handleStartReview = (deckId: string) => {
    const deck = dummyDecks.find(d => d.id === deckId);
    if (deck) {
      navigation.navigate('ReviewDeck', { deckId, language: deck.language });
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.deckCard,
        { backgroundColor: colors.surface },
        isCompleted && { borderColor: colors.success },
      ]}
      onPress={() => handleStartReview(deck.id)}>
      <View style={styles.deckHeader}>
        <Text style={[styles.languageText, { color: colors.primary }]}>
          {deck.language.charAt(0).toUpperCase() + deck.language.slice(1)}
        </Text>
        <Text style={[styles.deckName, { color: colors.text }]}>{deck.name}</Text>
      </View>

      <View style={styles.deckStats}>
        <View style={styles.statItem}>
          <Book
            size={16}
            color={colors.primary}
          />
          <Text style={[styles.statText, { color: colors.text }]}>{deck.totalCards} cards</Text>
        </View>
        <View style={styles.statItem}>
          <CheckCircle2
            size={16}
            color={isCompleted ? colors.success : colors.primary}
          />
          <Text style={[styles.statText, { color: isCompleted ? colors.success : colors.text }]}>
            {deck.masteredCards} mastered
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${completionPercentage}%`,
                backgroundColor: isCompleted ? colors.success : colors.primary,
              },
            ]}
          />
        </View>
        <Text style={[styles.progressText, { color: colors.textSecondary }]}>
          {completionPercentage.toFixed(0)}% complete
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.startButton, { backgroundColor: colors.primary }]}
        onPress={() => handleStartReview(deck.id)}>
        <Text style={[styles.startButtonText, { color: colors.background }]}>Start Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deckCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginHorizontal: 8,
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  deckHeader: {
    marginBottom: 12,
  },
  languageText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  deckName: {
    fontSize: 14,
    color: '#666',
  },
  deckStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 10,
    textAlign: 'right',
  },
  startButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
