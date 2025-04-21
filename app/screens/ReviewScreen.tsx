import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { flashcardService, REVIEW_OPTIONS } from '../services/flashcardService';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Review'>;

function ReviewScreen({ route, navigation }: Props) {
  const { deckId } = route.params;
  const { colors } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [currentCard, setCurrentCard] = useState(flashcardService.getCurrentCard());
  const flipAnimation = new Animated.Value(0);

  useEffect(() => {
    flashcardService.setCurrentDeck(deckId);
    setCurrentCard(flashcardService.getCurrentCard());
  }, [deckId]);

  const flipCard = () => {
    if (showOptions) return;

    Animated.spring(flipAnimation, {
      toValue: isFlipped ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();

    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setShowOptions(true);
    }
  };

  const handleScore = (score: number) => {
    if (!currentCard) return;

    flashcardService.reviewCard(currentCard.id, score);
    const nextCard = flashcardService.moveToNextCard();

    if (nextCard) {
      setCurrentCard(nextCard);
      setIsFlipped(false);
      setShowOptions(false);
      flipAnimation.setValue(0);
    } else {
      navigation.goBack();
    }
  };

  if (!currentCard) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.noCards, { color: colors.text }]}>No cards to review!</Text>
      </View>
    );
  }

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity onPress={flipCard} activeOpacity={0.9} style={styles.cardContainer}>
        <Animated.View
          style={[
            styles.card,
            {
              backgroundColor: colors.surface,
              transform: [{ rotateY: frontInterpolate }],
            },
          ]}
        >
          <Text style={[styles.cardText, { color: colors.text }]}>{currentCard.front}</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            {
              backgroundColor: colors.surface,
              transform: [{ rotateY: backInterpolate }],
            },
          ]}
        >
          <Text style={[styles.cardText, { color: colors.text }]}>{currentCard.back}</Text>
          {currentCard.example && (
            <Text style={[styles.exampleText, { color: colors.textSecondary }]}>
              Example: {currentCard.example}
            </Text>
          )}
        </Animated.View>
      </TouchableOpacity>

      {showOptions && (
        <ScrollView style={styles.optionsContainer}>
          {REVIEW_OPTIONS.map(option => (
            <TouchableOpacity
              key={option.score}
              style={[styles.option, { backgroundColor: option.color }]}
              onPress={() => handleScore(option.score)}
            >
              <Text style={styles.optionLabel}>{option.label}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardContainer: {
    height: 300,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  exampleText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  optionsContainer: {
    flex: 1,
  },
  option: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  optionLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  optionDescription: {
    color: '#fff',
    fontSize: 14,
  },
  noCards: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ReviewScreen;
