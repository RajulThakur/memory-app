import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { dummyDecks, dummyCards } from '../data/dummyData';
import { RotateCcw, Trash2, Check } from 'lucide-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Flashcard } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'DeckDetails'>;

const FlashcardItem = ({ card }: { card: Flashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { colors } = useTheme();
  const flipAnimation = new Animated.Value(0);

  const flipCard = () => {
    Animated.spring(flipAnimation, {
      toValue: isFlipped ? 0 : 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped);
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  return (
    <View style={[styles.cardContainer, { backgroundColor: colors.surface }]}>
      <TouchableOpacity onPress={flipCard}>
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ rotateY: frontInterpolate }],
            },
          ]}
        >
          <Text style={[styles.cardText, { color: colors.text }]}>{card.front}</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            {
              transform: [{ rotateY: backInterpolate }],
            },
          ]}
        >
          <Text style={[styles.cardText, { color: colors.text }]}>{card.back}</Text>
          {card.example && (
            <Text style={[styles.exampleText, { color: colors.textSecondary }]}>
              Example: {card.example}
            </Text>
          )}
        </Animated.View>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.error }]}>
          <Trash2 size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={flipCard}
        >
          <RotateCcw size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.success }]}>
          <Check size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DeckDetailsScreen = ({ route, navigation }: Props) => {
  const { colors } = useTheme();
  const { deckId } = route.params;
  const deck = dummyDecks.find(d => d.id === deckId);
  const deckCards = dummyCards.filter((card: Flashcard) => card.deckId === deckId);

  if (!deck) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>Deck not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{deck.name}</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {deckCards.length} cards • {deckCards.filter((c: Flashcard) => c.mastered).length}{' '}
          mastered
        </Text>
      </View>
      <FlatList
        data={deckCards}
        keyExtractor={(item: Flashcard) => item.id}
        renderItem={({ item }: { item: Flashcard }) => <FlashcardItem card={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default DeckDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    fontSize: 14,
  },
  list: {
    padding: 20,
  },
  cardContainer: {
    marginBottom: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardText: {
    fontSize: 18,
    textAlign: 'center',
  },
  exampleText: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
