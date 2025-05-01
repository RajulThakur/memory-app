export type RootStackParamList = {
  MainTabs: undefined;
  Review: { deckId: string };
  AddCard: { deckId: string };
};

export type TabParamList = {
  Home: undefined;
  Decks: undefined;
  Stats: undefined;
  Profile: undefined;
};

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  example: string;
  pronunciation?: string;
  language: Language;
  category?: Category;
  difficulty: Difficulty;
  tags: string[];
  lastReviewed?: Date;
  ef: number;
  interval: number;
  repetitions: number;
  deckId: string;
  mastered: boolean;
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  language: Language;
  difficulty: Difficulty;
  totalCards: number;
  masteredCards: number;
  tags: string[];
  createdAt: Date;
  deckCards: Flashcard[];
}

export type MainTabParamList = {
  Review: undefined;
  Decks: undefined;
  Stats: undefined;
  Profile: undefined;
};

export type Language = 'english' | 'spanish' | 'french' | 'japanese' | 'german';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type Category = 'vocabulary' | 'grammar' | 'phrases' | 'idioms';
