import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { dummyDecks, dummyCards } from '../data/dummyData';
import { RotateCcw, Trash2, Check, PlayCircle } from 'lucide-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Flashcard } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'DeckDetails'>;

function FlashcardItem({ card }: { card: Flashcard }) {
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
}

const DeckDetailsScreen = ({ route, navigation }: Props) => {
  const { colors } = useTheme();
  const { deckId } = route.params;
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
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={[styles.title, { color: colors.text }]}>{deck.name}</Text>
          <TouchableOpacity
            style={[styles.reviewButton, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('StudySession', { deckId })}
          >
            <PlayCircle size={24} color="#fff" />
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
  actionButton: {
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  card: {
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    height: 200,
    justifyContent: 'center',
  },
  cardBack: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  cardContainer: {
    borderRadius: 12,
    elevation: 2,
    marginBottom: 20,
    padding: 16,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 18,
    textAlign: 'center',
  },
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
  stat: {
    fontSize: 14,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
