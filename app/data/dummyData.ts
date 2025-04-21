import type { DeckMetadata, Flashcard, Language, Category, Difficulty } from '../types';

export interface Deck {
  id: string;
  name: string;
  description: string;
  language: string;
  totalCards: number;
  masteredCards: number;
  progress: number;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  example: string;
  lastReviewed?: Date;
  mastered: boolean;
  deckId: string;
}

const dummyDecks: DeckMetadata[] = [
  {
    id: 'deck1',
    name: 'Japanese',
    description: 'Essential phrases for daily conversation',
    language: 'japanese' as Language,
    category: 'phrases' as Category,
    difficulty: 'beginner' as Difficulty,
    totalCards: 20,
    masteredCards: 5,
    tags: ['basics', 'daily life'],
    createdAt: new Date(),
  },
  {
    id: 'deck2',
    name: 'Spanish',
    description: 'Common Spanish verbs and conjugations',
    language: 'spanish' as Language,
    category: 'grammar' as Category,
    difficulty: 'beginner' as Difficulty,
    totalCards: 30,
    masteredCards: 10,
    tags: ['verbs', 'conjugation'],
    createdAt: new Date(),
  },
  {
    id: 'deck3',
    name: 'French',
    description: 'Words and phrases for traveling in France',
    language: 'french' as Language,
    category: 'vocabulary' as Category,
    difficulty: 'beginner' as Difficulty,
    totalCards: 25,
    masteredCards: 15,
    tags: ['travel', 'vocabulary'],
    createdAt: new Date(),
  },
  {
    id: 'deck4',
    name: 'German',
    description: 'Common German idioms and expressions',
    language: 'german' as Language,
    category: 'idioms' as Category,
    difficulty: 'intermediate' as Difficulty,
    totalCards: 15,
    masteredCards: 5,
    tags: ['idioms', 'expressions'],
    createdAt: new Date(),
  },
  {
    id: 'deck5',
    name: 'English',
    description: 'Business vocabulary and phrases',
    language: 'english' as Language,
    category: 'vocabulary' as Category,
    difficulty: 'intermediate' as Difficulty,
    totalCards: 40,
    masteredCards: 20,
    tags: ['business', 'vocabulary'],
    createdAt: new Date(),
  },
];

const dummyCards: Record<string, Flashcard[]> = {
  deck1: [
    {
      id: 'card1',
      front: 'こんにちは',
      back: 'Hello',
      example: 'こんにちは、元気ですか？ (Hello, how are you?)',
      language: 'japanese' as Language,
      category: 'phrases' as Category,
      difficulty: 'beginner' as Difficulty,
      tags: ['greetings'],
      ef: 2.5,
      interval: 1,
      repetitions: 0,
      deckId: 'deck1',
      mastered: false,
    },
    {
      id: 'card2',
      front: 'ありがとう',
      back: 'Thank you',
      example: 'ありがとうございます (Thank you very much)',
      language: 'japanese' as Language,
      category: 'phrases' as Category,
      difficulty: 'beginner' as Difficulty,
      tags: ['courtesy'],
      ef: 2.5,
      interval: 1,
      repetitions: 0,
      deckId: 'deck1',
      mastered: false,
    },
  ],
  deck2: [
    {
      id: 'card3',
      front: 'hablar',
      back: 'to speak',
      example: 'Yo hablo español (I speak Spanish)',
      language: 'spanish' as Language,
      category: 'grammar' as Category,
      difficulty: 'beginner' as Difficulty,
      tags: ['verbs'],
      ef: 2.5,
      interval: 1,
      repetitions: 0,
      deckId: 'deck2',
      mastered: false,
    },
    {
      id: 'card4',
      front: 'comer',
      back: 'to eat',
      example: 'Nosotros comemos paella (We eat paella)',
      language: 'spanish' as Language,
      category: 'grammar' as Category,
      difficulty: 'beginner' as Difficulty,
      tags: ['verbs'],
      ef: 2.5,
      interval: 1,
      repetitions: 0,
      deckId: 'deck2',
      mastered: false,
    },
  ],
  deck3: [
    {
      id: 'card5',
      front: 'Bonjour',
      back: 'Hello',
      example: 'Bonjour, comment allez-vous? (Hello, how are you?)',
      language: 'french' as Language,
      category: 'phrases' as Category,
      difficulty: 'beginner' as Difficulty,
      tags: ['greetings'],
      ef: 2.5,
      interval: 1,
      repetitions: 0,
      deckId: 'deck3',
      mastered: false,
    },
    {
      id: 'card6',
      front: 'Merci',
      back: 'Thank you',
      example: 'Merci beaucoup (Thank you very much)',
      language: 'french' as Language,
      category: 'phrases' as Category,
      difficulty: 'beginner' as Difficulty,
      tags: ['courtesy'],
      ef: 2.5,
      interval: 1,
      repetitions: 0,
      deckId: 'deck3',
      mastered: false,
    },
  ],
  deck4: [
    {
      id: 'card7',
      front: 'Das ist nicht mein Bier',
      back: "That's not my problem",
      example:
        "Das ist nicht mein Bier, frag jemand anderen (That's not my problem, ask someone else)",
      language: 'german' as Language,
      category: 'idioms' as Category,
      difficulty: 'intermediate' as Difficulty,
      tags: ['idioms'],
      ef: 2.5,
      interval: 1,
      repetitions: 0,
      deckId: 'deck4',
      mastered: false,
    },
    {
      id: 'card8',
      front: 'Tomaten auf den Augen haben',
      back: 'To be oblivious',
      example: "Er hat Tomaten auf den Augen (He's oblivious)",
      language: 'german' as Language,
      category: 'idioms' as Category,
      difficulty: 'intermediate' as Difficulty,
      tags: ['idioms'],
      ef: 2.5,
      interval: 1,
      repetitions: 0,
      deckId: 'deck4',
      mastered: false,
    },
  ],
  deck5: [
    {
      id: 'card9',
      front: 'ROI',
      back: 'Return on Investment',
      example: 'The ROI for this project is expected to be 20%',
      language: 'english' as Language,
      category: 'vocabulary' as Category,
      difficulty: 'intermediate' as Difficulty,
      tags: ['business'],
      ef: 2.5,
      interval: 1,
      repetitions: 0,
      deckId: 'deck5',
      mastered: false,
    },
    {
      id: 'card10',
      front: 'KPI',
      back: 'Key Performance Indicator',
      example: 'We need to improve our KPIs this quarter',
      language: 'english' as Language,
      category: 'vocabulary' as Category,
      difficulty: 'intermediate' as Difficulty,
      tags: ['business'],
      ef: 2.5,
      interval: 1,
      repetitions: 0,
      deckId: 'deck5',
      mastered: false,
    },
  ],
};

export { dummyDecks, dummyCards };
export default { dummyDecks, dummyCards };
