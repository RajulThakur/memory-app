import { useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Flashcard } from '../types/types';
import { useTheme } from '../context/ThemeContext';

export default function FlashcardItem({ card }: { card: Flashcard }) {
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
          ]}>
          <Text style={[styles.cardText, { color: colors.text }]}>{card.front}</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            {
              transform: [{ rotateY: backInterpolate }],
            },
          ]}>
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
          <Trash
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={flipCard}>
          <RotateCcw
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.success }]}>
          <Check
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
});
