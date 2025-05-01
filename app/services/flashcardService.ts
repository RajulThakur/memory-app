import { dummyCards } from '../data/dummyData';
import {
  calculateNextReview,
  getInitialCardState,
  isCardDueForReview,
  type SM2Card,
} from '../utils/sm2';

interface FlashcardWithSM2 extends SM2Card {
  id: string;
  deckId: string;
  front: string;
  back: string;
  example: string;
  mastered: boolean;
}

export interface ReviewOption {
  score: number;
  label: string;
  description: string;
  color: string;
}

export const REVIEW_OPTIONS: ReviewOption[] = [
  {
    score: 0,
    label: 'Blackout',
    description: 'Complete failure to recall the information',
    color: '#FF6B6B', // Muted Red
  },
  {
    score: 1,
    label: 'Wrong',
    description: 'Incorrect response, but upon seeing the answer, it felt familiar',
    color: '#FF9F43', // Muted Orange
  },
  {
    score: 2,
    label: 'Difficult',
    description: 'Correct response after much difficulty',
    color: '#FFD93D', // Muted Yellow
  },
  {
    score: 3,
    label: 'Hesitant',
    description: 'Correct response with significant hesitation',
    color: '#6BCB77', // Muted Green
  },
  {
    score: 4,
    label: 'Good',
    description: 'Correct response with some hesitation',
    color: '#4D96FF', // Muted Blue
  },
  {
    score: 5,
    label: 'Perfect',
    description: 'Perfect response with no hesitation',
    color: '#845EC2', // Muted Purple
  },
];

class FlashcardService {
  private cards: Map<string, FlashcardWithSM2> = new Map();
  private currentDeckId: string | null = null;
  private currentCardIndex: number = 0;
  private currentDeckCards: FlashcardWithSM2[] = [];

  constructor() {
    this.initializeCards();
  }

  private initializeCards() {
    // Initialize cards from dummy data with SM2 state
    Object.entries(dummyCards).forEach(([deckId, cards]) => {
      cards.forEach(card => {
        const initialState = getInitialCardState();
        this.cards.set(card.id, {
          ...card,
          ...initialState,
          mastered: false,
        });
      });
    });

    // Add 10 example review cards for Japanese
    const reviewCards = [
      { front: 'こんにちは', back: 'Hello', example: 'こんにちは、元気ですか？' },
      { front: 'ありがとう', back: 'Thank you', example: 'どうもありがとうございます。' },
      { front: 'お願いします', back: 'Please', example: 'コーヒーをお願いします。' },
      { front: 'さようなら', back: 'Goodbye', example: 'さようなら、また会いましょう。' },
      { front: 'はい', back: 'Yes', example: 'はい、わかりました。' },
      { front: 'いいえ', back: 'No', example: 'いいえ、結構です。' },
      { front: 'おはよう', back: 'Good morning', example: 'おはようございます。' },
      { front: 'こんばんは', back: 'Good evening', example: 'こんばんは、お疲れ様です。' },
      { front: 'すみません', back: 'Excuse me', example: 'すみません、時間はありますか？' },
      { front: 'わかりました', back: 'I understand', example: 'はい、わかりました。' },
    ];

    reviewCards.forEach((card, index) => {
      const id = `review-${index}`;
      this.cards.set(id, {
        id,
        deckId: 'review-deck',
        ...card,
        ...getInitialCardState(),
        mastered: false,
      });
    });
  }

  setCurrentDeck(deckId: string) {
    this.currentDeckId = deckId;
    this.currentCardIndex = 0;
    this.currentDeckCards = this.getDueCards(deckId);
  }

  setDeckCards(cards: FlashcardWithSM2[]) {
    this.currentDeckCards = cards;
    this.currentCardIndex = 0;
  }

  getCurrentCard(): FlashcardWithSM2 | null {
    if (!this.currentDeckCards.length) return null;
    return this.currentDeckCards[this.currentCardIndex];
  }

  moveToNextCard(): FlashcardWithSM2 | null {
    if (this.currentCardIndex < this.currentDeckCards.length - 1) {
      this.currentCardIndex++;
      return this.getCurrentCard();
    }
    return null;
  }

  getDueCards(deckId?: string): FlashcardWithSM2[] {
    const allCards = Array.from(this.cards.values());
    const dueCards = allCards.filter(
      card => isCardDueForReview(card) && (!deckId || card.deckId === deckId)
    );
    return dueCards;
  }

  reviewCard(cardId: string, recallScore: number): FlashcardWithSM2 {
    const card = this.cards.get(cardId);
    if (!card) {
      throw new Error('Card not found');
    }

    const updatedSM2 = calculateNextReview(card, recallScore);
    const updatedCard: FlashcardWithSM2 = {
      ...card,
      ...updatedSM2,
      mastered: updatedSM2.interval >= 30, // Consider mastered if interval is 30+ days
    };

    this.cards.set(cardId, updatedCard);
    return updatedCard;
  }

  getReviewOption(score: number): ReviewOption | undefined {
    return REVIEW_OPTIONS.find(option => option.score === score);
  }

  getCardsByDeck(deckId: string): FlashcardWithSM2[] {
    return Array.from(this.cards.values()).filter(card => card.deckId === deckId);
  }

  getDeckProgress(deckId: string): {
    totalCards: number;
    masteredCards: number;
    dueCards: number;
    remainingCards: number;
  } {
    const deckCards = this.getCardsByDeck(deckId);
    const dueCount = deckCards.filter(card => isCardDueForReview(card)).length;
    return {
      totalCards: deckCards.length,
      masteredCards: deckCards.filter(card => card.mastered).length,
      dueCards: dueCount,
      remainingCards: this.currentDeckCards.length - this.currentCardIndex,
    };
  }

  addCard(
    deckId: string,
    card: Omit<FlashcardWithSM2, keyof SM2Card | 'id' | 'mastered'>
  ): FlashcardWithSM2 {
    const id = `card${Date.now()}`;
    const newCard: FlashcardWithSM2 = {
      ...card,
      id,
      deckId,
      ...getInitialCardState(),
      mastered: false,
    };
    this.cards.set(id, newCard);
    return newCard;
  }
}

export const flashcardService = new FlashcardService();
export type { FlashcardWithSM2 };
