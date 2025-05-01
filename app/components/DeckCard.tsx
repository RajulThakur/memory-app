import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { Book } from 'lucide-react-native';

interface DeckCardProps {
  name: string;
  description: string;
  language: string;
  totalCards: number;
  masteredCards: number;
  onPress: () => void;
}

export default function DeckCard({
  name,
  description,
  language,
  totalCards,
  masteredCards,
  onPress,
}: DeckCardProps) {
  const { colors } = useTheme();
  const progress = (masteredCards / totalCards) * 100;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface }]}
      onPress={onPress}>
      <View style={styles.cardHeader}>
        <Book
          size={24}
          color={colors.primary}
        />
        <View style={styles.cardInfo}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>{name}</Text>
          <Text style={[styles.cardLanguage, { color: colors.primary }]}>{language}</Text>
        </View>
        <ChevronRight
          size={24}
          color={colors.primary}
        />
      </View>
      <Text
        style={[styles.cardDescription, { color: colors.textSecondary }]}
        numberOfLines={2}>
        {description}
      </Text>
      <View style={[styles.progressBar, { backgroundColor: colors.progressTrack }]}>
        <View
          style={[
            styles.progressFill,
            {
              backgroundColor: colors.primary,
              width: `${progress}%`,
            },
          ]}
        />
      </View>
      <Text style={[styles.progressText, { color: colors.textSecondary }]}>
        {Math.round(progress)}% Mastered
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
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
  cardDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  cardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  cardLanguage: {
    fontSize: 14,
    marginTop: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  progressBar: {
    borderRadius: 2,
    height: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    borderRadius: 2,
    height: '100%',
  },
  progressText: {
    fontSize: 12,
  },
});
