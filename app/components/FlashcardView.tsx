import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function FlashcardView() {
  const { colors } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState({
    front: '1',
    back: 'One',
    ef: 2.5,
    interval: 1,
  });

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleScore = (score: number) => {
    // TODO: Implement SM2 algorithm scoring logic
    setIsFlipped(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.card, { backgroundColor: colors.surface }]}
        onPress={handleFlip}>
        <View style={styles.cardInner}>
          <Text style={[styles.cardText, { color: colors.text }]}>
            {isFlipped ? currentCard.back : currentCard.front}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.statsContainer}>
        <Text style={[styles.statsText, { color: colors.textSecondary }]}>
          EF: {currentCard.ef.toFixed(2)}
        </Text>
        <Text style={[styles.statsText, { color: colors.textSecondary }]}>
          Next review: {currentCard.interval} days
        </Text>
      </View>

      {isFlipped && (
        <View style={styles.scoreContainer}>
          <Text style={[styles.scoreTitle, { color: colors.text }]}>
            How well did you remember?
          </Text>
          <View style={styles.scoreButtons}>
            {[1, 2, 3, 4, 5].map(score => (
              <TouchableOpacity
                key={score}
                style={[styles.scoreButton, { backgroundColor: colors.primary }]}
                onPress={() => handleScore(score)}>
                <Text style={styles.scoreButtonText}>{score}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    aspectRatio: 1.5,
    borderRadius: 20,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '90%',
  },
  cardInner: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  cardText: {
    fontSize: 24,
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  scoreButton: {
    alignItems: 'center',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  scoreButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoreButtons: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    marginTop: 30,
    width: '100%',
  },
  scoreTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  statsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  statsText: {
    fontSize: 16,
    marginVertical: 4,
  },
});
