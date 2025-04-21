interface SM2Card {
  ef: number; // Easiness Factor
  interval: number; // Current interval in days
  repetitions: number; // Number of times reviewed
  nextReviewDate: Date;
  lastReviewDate: Date;
}

export function calculateNextReview(
  card: SM2Card,
  recallScore: number // 0-5 score where 5 is perfect recall
): SM2Card {
  // Validate recall score (must be between 0-5)
  if (recallScore < 0 || recallScore > 5) {
    throw new Error('Recall score must be between 0 and 5');
  }

  // If score is less than 3, reset repetitions and start over
  if (recallScore < 3) {
    return {
      ...card,
      ef: Math.max(1.3, card.ef - 0.2), // Don't let EF go below 1.3
      interval: 1,
      repetitions: 0,
      lastReviewDate: new Date(),
      nextReviewDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    };
  }

  // Update EF (Easiness Factor)
  const newEF = card.ef + (0.1 - (5 - recallScore) * (0.08 + (5 - recallScore) * 0.02));
  const ef = Math.max(1.3, newEF); // Don't let EF go below 1.3

  // Calculate new interval
  let interval = 1;
  if (card.repetitions === 0) {
    interval = 1;
  } else if (card.repetitions === 1) {
    interval = 6;
  } else {
    interval = Math.round(card.interval * ef);
  }

  // Calculate next review date
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  return {
    ef,
    interval,
    repetitions: card.repetitions + 1,
    lastReviewDate: new Date(),
    nextReviewDate,
  };
}

export function isCardDueForReview(card: SM2Card): boolean {
  const now = new Date();
  return card.nextReviewDate <= now;
}

export function getInitialCardState(): SM2Card {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return {
    ef: 2.5, // Initial easiness factor
    interval: 1, // Start with 1-day interval
    repetitions: 0, // No repetitions yet
    lastReviewDate: now,
    nextReviewDate: tomorrow,
  };
}

export function calculateReviewProgress(cards: SM2Card[]): {
  totalCards: number;
  cardsToReview: number;
  masteredCards: number;
} {
  const now = new Date();
  const totalCards = cards.length;
  const cardsToReview = cards.filter(card => card.nextReviewDate <= now).length;
  const masteredCards = cards.filter(card => card.interval >= 30).length; // Consider cards with 30+ day intervals as mastered

  return {
    totalCards,
    cardsToReview,
    masteredCards,
  };
}
