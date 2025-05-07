import DeckCard from '@/app/components/DeckCard';
import { useTheme } from '@/app/context/ThemeContext';
import { dummyDecks } from '@/app/data/dummyData';
import { useNavigation } from '@react-navigation/native';
import { PlusIcon } from 'lucide-react-native';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { calculateReviewProgress } from '@/app/utils/sm2';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/app/types/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function DecksScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  // Calculate review progress for each deck
  const decksWithProgress = dummyDecks.map(deck => {
    // Convert Flashcard[] to SM2Card[]
    const sm2Cards = deck.deckCards.map(card => ({
      ef: card.ef,
      interval: card.interval,
      repetitions: card.repetitions,
      nextReviewDate: card.nextReviewDate || new Date(),
      lastReviewDate: card.lastReviewDate || new Date(),
    }));

    const progress = calculateReviewProgress(sm2Cards);
    console.log(`\n=== Deck: ${deck.name} ===`);
    console.log(`Total Cards: ${progress.totalCards}`);
    console.log(`Cards to Review: ${progress.cardsToReview}`);
    console.log(`Mastered Cards: ${progress.masteredCards}`);
    console.log('===================\n');
    return { ...deck, progress };
  });

  const handleAddCard = () => {
    try {
      navigation.navigate('AddCard');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={decksWithProgress}
        style={{ backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <DeckCard
            title={item.name}
            totalCards={item.progress.totalCards}
            masteredCards={item.progress.masteredCards}
            cardsToReview={item.progress.cardsToReview}
            onPress={() => navigation.navigate('DeckInfo', { deckId: item.id })}
          />
        )}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={handleAddCard}
        activeOpacity={0.8}>
        <PlusIcon
          stroke={colors.background}
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    alignItems: 'center',
    borderRadius: 28,
    bottom: 16,
    elevation: 2,
    height: 56,
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    width: 56,
  },
  list: {
    paddingBottom: 20,
    paddingHorizontal: 15,
    paddingTop: 8,
  },
});
