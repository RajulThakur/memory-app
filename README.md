# Language Learning Flashcard App

A modern, intuitive flashcard application for language learning, built with React Native. The app uses spaced repetition algorithms to optimize your learning experience and help you master new languages effectively.

## Demo

[![Watch the demo](https://res.cloudinary.com/dqglgc5dj/image/upload/v1745247215/Screenshot_2025-04-21_at_20.22.47_pjwqtv.png)](https://res.cloudinary.com/dqglgc5dj/video/upload/v1745246679/demo_zaiui4.mp4)

## Features

### 1. Smart Learning System

- **Spaced Repetition**: Uses the SM-2 algorithm to optimize review intervals
- **Adaptive Learning**: Adjusts card frequency based on your performance
- **Mastery Tracking**: Visual progress indicators for each deck and card

### 2. Deck Management

- **Multiple Decks**: Organize cards by language or topic
- **Progress Tracking**: View statistics for each deck
- **Easy Navigation**: Intuitive interface for managing your decks

### 3. Flashcard Features

- **Rich Content**: Support for text and examples
- **Interactive Review**: Flip cards with smooth animations
- **Performance Rating**: 6-level rating system for accurate progress tracking
  - Perfect (5): Perfect response
  - Good (4): Correct with hesitation
  - Hesitant (3): Correct with significant hesitation
  - Difficult (2): Correct after struggle
  - Wrong (1): Incorrect but familiar
  - Blackout (0): Complete failure to recall

### 4. Statistics and Progress

- **Detailed Analytics**: Track your learning progress
- **Visual Charts**: Bar and line charts for progress visualization
- **Performance Metrics**: Monitor mastery rates and study streaks

### 5. Customization

- **Theme Support**: Light and dark modes
- **Color Schemes**: Choose from Blue, Sage, and Lavender themes
- **Responsive Design**: Works on various screen sizes

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React Native development environment

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone [repository-url]
   cd lang-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the Development Server**

   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on iOS**

   ```bash
   npm run ios
   # or
   yarn ios
   ```

5. **Run on Android**
   ```bash
   npm run android
   # or
   yarn android
   ```

### Configuration

1. **Environment Setup**

   - Make sure you have Xcode installed for iOS development
   - Install Android Studio for Android development
   - Configure your development environment following React Native's official guide

2. **Code Formatting**
   - The project uses Prettier for code formatting
   - Format your code using:
     ```bash
     npm run format
     # or
     yarn format
     ```

## Project Structure

```
lang-app/
├── app/
│   ├── components/    # Reusable UI components
│   ├── screens/       # Screen components
│   ├── context/       # React Context providers
│   ├── services/      # Business logic and services
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript type definitions
│   └── data/          # Sample data and constants
├── assets/           # Static assets
└── ...
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
