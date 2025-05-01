import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PlayCircle } from 'lucide-react-native';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { dummyCards, dummyDecks } from '../data/dummyData';
import { Flashcard, RootStackParamList } from '../types';
import FlashcardItem from '../components/FlashCardItem';

type Props = NativeStackScreenProps<RootStackParamList, 'DeckDetails'>;

const DeckDetailsScreen = ({ route, navigation }: Props) => {
  const { colors } = useTheme();
  // const { deckId } = route.params;
  const deckId = '1';
  const deck = dummyDecks.find(d => d.id === deckId);
  const deckCards = dummyCards[deckId] || [];

  if (!deck) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>Deck not found</Text>
      </View>
    );
  }

  const masteredCount = deckCards.filter(card => card.mastered).length;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={[styles.title, { color: colors.text }]}>{deck.name}</Text>
          <TouchableOpacity
            style={[styles.reviewButton, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('StudySession', { deckId })}>
            <PlayCircle
              size={24}
              color="#fff"
            />
            <Text style={styles.reviewButtonText}>Start Review</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {deckCards.length} cards • {masteredCount} mastered
        </Text>
      </View>
      <FlatList
        data={deckCards}
        keyExtractor={(item: Flashcard) => item.id}
        renderItem={({ item }: { item: Flashcard }) => <FlashcardItem card={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default DeckDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  exampleText: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  header: {
    borderBottomWidth: 1,
    padding: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  list: {
    padding: 20,
  },
  reviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    gap: 8,
  },
  reviewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
