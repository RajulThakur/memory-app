export type Language = "english" | "spanish" | "french" | "japanese" | "german";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Category = "vocabulary" | "grammar" | "phrases" | "idioms";

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  example: string;
  pronunciation?: string;
  language: Language;
  category: Category;
  difficulty: Difficulty;
  tags: string[];
  lastReviewed?: Date;
  ef: number;
  interval: number;
  repetitions: number;
  deckId: string;
  mastered: boolean;
}

export interface DeckMetadata {
  id: string;
  name: string;
  language: Language;
  category: Category;
  difficulty: Difficulty;
  totalCards: number;
  masteredCards: number;
  description: string;
  tags: string[];
  createdAt: Date;
  lastStudied?: Date;
}

export type RootStackParamList = {
  Main: undefined;
  AddCard: undefined;
  DeckDetails: { deckId: string };
  StudySession: { deckId: string };
};

export type MainTabParamList = {
  Review: undefined;
  Decks: undefined;
  Stats: undefined;
  Profile: undefined;
};
