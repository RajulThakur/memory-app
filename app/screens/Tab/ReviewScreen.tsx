import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { flashcardService, REVIEW_OPTIONS } from '../../services/flashcardService';
import type { RootStackParamList } from '../../types/types';
import { dummyCards, dummyDecks } from '../../data/dummyData';
import {
  Clock,
  Book,
  Award,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Languages,
  Globe,
} from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Review'>;

function ReviewScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentCard, setCurrentCard] = useState(flashcardService.getCurrentCard());
  const [deckProgress, setDeckProgress] = useState(
    flashcardService.getDeckProgress(route.params?.deckId || 'deck1')
  );
  const [showHelp, setShowHelp] = useState(false);
  const [reviewCompleted, setReviewCompleted] = useState(false);
  const [showDeckInfo, setShowDeckInfo] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [reviewStats, setReviewStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0,
    startTime: new Date(),
  });

  const deckId = route.params?.deckId || 'deck1';
  const deck = dummyDecks.find(d => d.id === deckId);
  const deckCards = dummyCards[deckId] || [];

  // Get unique languages from the deck
  const uniqueLanguages = Array.from(new Set(deckCards.map(card => card.language)));

  useEffect(() => {
    if (!showDeckInfo && selectedLanguage) {
      const languageCards = deckCards.filter(card => card.language === selectedLanguage);
      flashcardService.setCurrentDeck(deckId);
      flashcardService.setDeckCards(languageCards);
      setCurrentCard(flashcardService.getCurrentCard());
      setDeckProgress(flashcardService.getDeckProgress(deckId));
    }
  }, [showDeckInfo, selectedLanguage, deckId]);

  const handleStartReview = (language: string) => {
    setSelectedLanguage(language);
    setShowDeckInfo(false);
  };

  const handleBack = () => {
    if (showDeckInfo) {
      navigation.goBack();
    } else {
      setShowDeckInfo(true);
      setSelectedLanguage(null);
    }
  };

  const handleScore = (score: number) => {
    if (!currentCard) return;

    setReviewStats(prev => ({
      ...prev,
      correct: score >= 3 ? prev.correct + 1 : prev.correct,
      incorrect: score < 3 ? prev.incorrect + 1 : prev.incorrect,
      total: prev.total + 1,
    }));

    flashcardService.reviewCard(currentCard.id, score);
    const nextCard = flashcardService.moveToNextCard();
    setDeckProgress(flashcardService.getDeckProgress(deckId));

    if (nextCard) {
      setCurrentCard(nextCard);
      setShowAnswer(false);
    } else {
      setReviewCompleted(true);
    }
  };

  const handleRestartReview = () => {
    if (selectedLanguage) {
      const languageCards = deckCards.filter(card => card.language === selectedLanguage);
      flashcardService.setCurrentDeck(deckId);
      flashcardService.setDeckCards(languageCards);
      setCurrentCard(flashcardService.getCurrentCard());
      setDeckProgress(flashcardService.getDeckProgress(deckId));
      setReviewCompleted(false);
      setReviewStats({
        correct: 0,
        incorrect: 0,
        total: 0,
        startTime: new Date(),
      });
    }
  };

  if (showDeckInfo && deck) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}>
            <ArrowLeft
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
          <Text style={[styles.deckTitle, { color: colors.text }]}>{deck.name}</Text>
        </View>

        <View style={[styles.deckInfoContainer, { backgroundColor: colors.surface }]}>
          <View style={styles.languageContainer}>
            <Languages
              size={24}
              color={colors.primary}
            />
            <Text style={[styles.languageText, { color: colors.text }]}>
              {deck.language.charAt(0).toUpperCase() + deck.language.slice(1)}
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Book
                size={24}
                color={colors.primary}
              />
              <Text style={[styles.statNumber, { color: colors.text }]}>{deck.totalCards}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Cards</Text>
            </View>

            <View style={styles.statItem}>
              <Award
                size={24}
                color={colors.primary}
              />
              <Text style={[styles.statNumber, { color: colors.text }]}>{deck.masteredCards}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Mastered</Text>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={[styles.descriptionTitle, { color: colors.text }]}>Description</Text>
            <Text style={[styles.descriptionText, { color: colors.textSecondary }]}>
              {deck.description}
            </Text>
          </View>

          <View style={styles.languagesContainer}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Available Languages</Text>
            <View style={styles.languageButtons}>
              {uniqueLanguages.map((language, index) => {
                const languageCards = deckCards.filter(card => card.language === language);
                const masteredCards = languageCards.filter(card => card.mastered).length;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.languageButton, { backgroundColor: colors.primary }]}
                    onPress={() => handleStartReview(language)}>
                    <Globe
                      size={24}
                      color={colors.background}
                    />
                    <Text style={[styles.languageButtonText, { color: colors.background }]}>
                      {language.charAt(0).toUpperCase() + language.slice(1)}
                    </Text>
                    <Text style={[styles.languageStats, { color: colors.background }]}>
                      {masteredCards}/{languageCards.length} mastered
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.tagsContainer}>
            {deck.tags.map((tag, index) => (
              <View
                key={index}
                style={[styles.tag, { backgroundColor: colors.primary }]}>
                <Text style={[styles.tagText, { color: colors.background }]}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }

  if (reviewCompleted) {
    const timeSpent = Math.round(
      (new Date().getTime() - reviewStats.startTime.getTime()) / 1000 / 60
    );
    const accuracy = (reviewStats.correct / reviewStats.total) * 100;
    const languageCards = deckCards.filter(card => card.language === selectedLanguage);

    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}>
            <ArrowLeft
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
          <Text style={[styles.deckTitle, { color: colors.text }]}>
            {deck?.name} -{' '}
            {selectedLanguage
              ? selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)
              : ''}
          </Text>
        </View>

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

          <View style={styles.allCardsContainer}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>All Cards</Text>
            <ScrollView style={styles.cardsList}>
              {languageCards.map((card, index) => (
                <View
                  key={index}
                  style={[styles.cardItem, { backgroundColor: colors.surface }]}>
                  <View style={styles.cardHeader}>
                    <Text style={[styles.cardFront, { color: colors.text }]}>{card.front}</Text>
                    <View style={[styles.difficultyBadge, { backgroundColor: colors.primary }]}>
                      <Text style={[styles.difficultyText, { color: colors.background }]}>
                        {card.difficulty}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.cardBack, { color: colors.textSecondary }]}>
                    {card.back}
                  </Text>
                  {card.example && (
                    <Text style={[styles.exampleText, { color: colors.textSecondary }]}>
                      Example: {card.example}
                    </Text>
                  )}
                  <View style={styles.cardFooter}>
                    <Text style={[styles.cardLanguage, { color: colors.textSecondary }]}>
                      Language: {card.language}
                    </Text>
                    <Text style={[styles.cardCategory, { color: colors.textSecondary }]}>
                      Category: {card.category}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
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

  if (!currentCard) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}>
            <ArrowLeft
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
          <Text style={[styles.deckTitle, { color: colors.text }]}>
            {deck?.name} -{' '}
            {selectedLanguage
              ? selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)
              : ''}
          </Text>
        </View>
        <Text style={[styles.noCards, { color: colors.text }]}>No cards to review!</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}>
          <ArrowLeft
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
        <Text style={[styles.deckTitle, { color: colors.text }]}>
          {deck?.name} -{' '}
          {selectedLanguage
            ? selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)
            : ''}
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressItem}>
          <Book
            size={20}
            color={colors.primary}
          />
          <Text style={[styles.progressText, { color: colors.text }]}>
            {deckProgress.remainingCards} remaining
          </Text>
        </View>
        <View style={styles.progressItem}>
          <Award
            size={20}
            color={colors.primary}
          />
          <Text style={[styles.progressText, { color: colors.text }]}>
            {deckProgress.masteredCards}/{deckProgress.totalCards} mastered
          </Text>
        </View>
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
          {REVIEW_OPTIONS.map(option => (
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
              {REVIEW_OPTIONS.map(option => (
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 16,
  },
  deckTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  deckInfoContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
  },
  languageContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 8,
  },
  languageText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
  statLabel: {
    fontSize: 14,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  languagesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  languageButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  languageButton: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  languageButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  languageStats: {
    fontSize: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
    fontWeight: 'bold',
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
  noCards: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
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
  allCardsContainer: {
    flex: 1,
    marginBottom: 16,
  },
  cardsList: {
    flex: 1,
  },
  cardItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cardLanguage: {
    fontSize: 12,
  },
  cardCategory: {
    fontSize: 12,
  },
  restartButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  restartButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReviewScreen;
