import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Award, Book, CheckCircle2, Clock, XCircle } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { dummyDecks } from '../data/dummyData';
import { REVIEW_OPTIONS, ReviewOption } from '../services/flashcardService';
import type { RootStackParamList } from '../types/types';
import { calculateNextReview, isCardDueForReview } from '../utils/sm2';
import { formatRelativeDate } from '../utils/DateHelper';
import Congratulations from '../components/Congratulations';

type Props = NativeStackScreenProps<RootStackParamList, 'ReviewDeck'>;

export default function CardReviewDeck({ route, navigation }: Props) {
  const { colors } = useTheme();
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [reviewCompleted, setReviewCompleted] = useState(false);
  const [reviewStats, setReviewStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0,
    startTime: new Date(),
  });

  const deckId = route.params?.deckId || 'deck1';
  const deck = dummyDecks.find(d => d.id === deckId);

  // New logic - filter only cards due for review today
  const cards = (deck?.deckCards || []).filter(card => {
    // If card has no nextReviewDate, it's a new card and should be shown
    if (!card.nextReviewDate) return true;

    // Convert Flashcard to SM2Card format
    const sm2Card = {
      ef: card.ef,
      interval: card.interval,
      repetitions: card.repetitions,
      nextReviewDate: card.nextReviewDate,
      lastReviewDate: card.lastReviewDate || new Date(),
    };

    return isCardDueForReview(sm2Card);
  });

  const currentCard = cards[currentCardIndex];
  console.log('current card', currentCard);

  // Log the number of cards due for review
  console.log(`Cards due for review today: ${cards.length}`);

  // Show message if no cards are due
  if (cards.length === 0) {
    return (
      <Congratulations
        navigation={navigation}
        route={route}
      />
    );
  }

  const handleScore = (score: number) => {
    if (!currentCard) return;

    // Initialize SM2 state for the card if it doesn't exist
    const cardSM2 = {
      ef: currentCard.ef,
      interval: currentCard.interval,
      repetitions: currentCard.repetitions,
      nextReviewDate: currentCard.nextReviewDate || new Date(),
      lastReviewDate: currentCard.lastReviewDate || new Date(),
    };

    // Calculate next review using SM2
    const updatedSM2 = calculateNextReview(cardSM2, score);

    // Log SM2 calculations
    // console.log('cardId:', currentCard.id);
    // console.log('Card:', currentCard.front);
    // console.log('Score:', score);
    // console.log('Previous EF:', cardSM2.ef);
    // console.log('New EF:', updatedSM2.ef);
    // console.log('Previous Interval:', cardSM2.interval);
    // console.log('New Interval:', updatedSM2.interval);
    // console.log('Next Review Date:', updatedSM2.nextReviewDate);
    // console.log('-------------------');

    // Update the card with new SM2 values
    currentCard.ef = updatedSM2.ef;
    currentCard.interval = updatedSM2.interval;
    currentCard.repetitions = updatedSM2.repetitions;
    currentCard.nextReviewDate = updatedSM2.nextReviewDate;
    currentCard.lastReviewDate = updatedSM2.lastReviewDate;
    currentCard.mastered = updatedSM2.interval >= 30;

    // Update review stats
    setReviewStats(prev => ({
      ...prev,
      correct: score >= 3 ? prev.correct + 1 : prev.correct,
      incorrect: score < 3 ? prev.incorrect + 1 : prev.incorrect,
      total: prev.total + 1,
    }));

    // Move to next card
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setReviewCompleted(true);
      // Navigate back to ReviewScreen after a short delay
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    }
  };

  const handleRestartReview = () => {
    setCurrentCardIndex(0);
    setReviewCompleted(false);
    setShowAnswer(false);
    setReviewStats({
      correct: 0,
      incorrect: 0,
      total: 0,
      startTime: new Date(),
    });
  };

  if (reviewCompleted) {
    const timeSpent = Math.round(
      (new Date().getTime() - reviewStats.startTime.getTime()) / 1000 / 60
    );
    const accuracy = (reviewStats.correct / reviewStats.total) * 100;

    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.completionContainer, { backgroundColor: colors.surface }]}>
          <Text style={[styles.completionTitle, { color: colors.text }]}>Review Completed!</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <CheckCircle2
                size={24}
                color={colors.success}
              />
              <Text style={[styles.statNumber, { color: colors.text }]}>{reviewStats.correct}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Correct</Text>
            </View>

            <View style={styles.statItem}>
              <XCircle
                size={24}
                color={colors.error}
              />
              <Text style={[styles.statNumber, { color: colors.text }]}>
                {reviewStats.incorrect}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Incorrect</Text>
            </View>

            <View style={styles.statItem}>
              <Clock
                size={24}
                color={colors.primary}
              />
              <Text style={[styles.statNumber, { color: colors.text }]}>{timeSpent}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Minutes</Text>
            </View>

            <View style={styles.statItem}>
              <Award
                size={24}
                color={colors.primary}
              />
              <Text style={[styles.statNumber, { color: colors.text }]}>
                {accuracy.toFixed(1)}%
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Accuracy</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.restartButton, { backgroundColor: colors.primary }]}
            onPress={handleRestartReview}>
            <Text style={[styles.restartButtonText, { color: colors.background }]}>
              Start New Review
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.progressContainer}>
        <View style={styles.progressItem}>
          <Book
            size={20}
            color={colors.primary}
          />
          <Text style={[styles.progressText, { color: colors.text }]}>
            {cards.length - currentCardIndex} remaining
          </Text>
        </View>
        <View style={styles.progressItem}>
          <Award
            size={20}
            color={colors.primary}
          />
          <Text style={[styles.progressText, { color: colors.text }]}>
            {cards.filter(card => card.mastered).length}/{cards.length} mastered
          </Text>
        </View>
      </View>

      <View style={styles.cardStats}>
        <Text style={[styles.cardStatText, { color: colors.textSecondary }]}>
          EF: {currentCard.ef.toFixed(2)}
        </Text>
        <Text style={[styles.cardStatText, { color: colors.textSecondary }]}>
          Next Review:{' '}
          {currentCard.nextReviewDate
            ? formatRelativeDate(new Date(currentCard.nextReviewDate))
            : 'Not set'}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => setShowAnswer(!showAnswer)}
        activeOpacity={0.9}
        style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardText, { color: colors.text }]}>{currentCard.front}</Text>
        {showAnswer && (
          <>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <Text style={[styles.cardText, { color: colors.text }]}>{currentCard.back}</Text>
            {currentCard.example && (
              <Text style={[styles.exampleText, { color: colors.textSecondary }]}>
                Example: {currentCard.example}
              </Text>
            )}
          </>
        )}
      </TouchableOpacity>

      {showAnswer && (
        <View style={styles.reviewButtons}>
          {REVIEW_OPTIONS.map((option: ReviewOption) => (
            <TouchableOpacity
              key={option.score}
              style={[styles.reviewButton, { backgroundColor: option.color }]}
              onPress={() => handleScore(option.score)}>
              <Text style={styles.reviewButtonNumber}>{option.score}</Text>
              <Text style={styles.reviewButtonLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Modal
        visible={showHelp}
        transparent
        animationType="fade"
        onRequestClose={() => setShowHelp(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Review Scoring Guide</Text>
            <ScrollView>
              {REVIEW_OPTIONS.map((option: ReviewOption) => (
                <View
                  key={option.score}
                  style={[styles.helpOption, { backgroundColor: option.color }]}>
                  <Text style={styles.helpOptionLabel}>{option.label}</Text>
                  <Text style={styles.helpOptionDescription}>{option.description}</Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: colors.primary }]}
              onPress={() => setShowHelp(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  statLabel: {
    fontSize: 14,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressText: {
    fontSize: 14,
  },
  card: {
    height: 300,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 20,
  },
  exampleText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  reviewButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  reviewButton: {
    width: 50,
    height: 45,
    paddingVertical: 1,
    paddingHorizontal: 3,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewButtonNumber: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  reviewButtonLabel: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    maxHeight: '80%',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  helpOption: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  helpOptionLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  helpOptionDescription: {
    color: '#fff',
    fontSize: 14,
  },
  closeButton: {
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completionContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
  },
  completionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },

  statItem: {
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
  restartButton: {
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  cardStatText: {
    fontSize: 14,
  },
});
