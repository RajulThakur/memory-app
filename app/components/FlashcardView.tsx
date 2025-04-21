import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function FlashcardView() {
  const { colors } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState({
    front: "1",
    back: "One",
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
            {[1, 2, 3, 4, 5].map((score) => (
              <TouchableOpacity
                key={score}
                style={[
                  styles.scoreButton,
                  { backgroundColor: colors.primary },
                ]}
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "90%",
    aspectRatio: 1.5,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardInner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  cardText: {
    fontSize: 24,
    textAlign: "center",
  },
  statsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  statsText: {
    fontSize: 16,
    marginVertical: 4,
  },
  scoreContainer: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  scoreTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  scoreButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  scoreButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
