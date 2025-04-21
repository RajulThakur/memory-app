import React, {createContext, useContext, useState} from 'react';

export type ColorScheme = 'blue' | 'sage' | 'lavender';
export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  toggleTheme: () => void;
  setColorScheme: (scheme: ColorScheme) => void;
  colors: {
    background: string;
    surface: string;
    primary: string;
    text: string;
    textSecondary: string;
    border: string;
    progressTrack: string;
    statusBar: 'light-content' | 'dark-content';
    error: string;
    success: string;
  };
}

export const colorSchemes = {
  blue: {
    light: {
      background: '#F5F9FF',
      surface: '#ffffff',
      primary: '#4A90E2',
      text: '#2C3E50',
      textSecondary: '#607D8B',
      border: '#E3EAF4',
      progressTrack: '#E3EAF4',
      statusBar: 'dark-content' as const,
      error: '#B00020',
      success: '#00C853',
    },
    dark: {
      background: '#1A2634',
      surface: '#243447',
      primary: '#64A5F6',
      text: '#E9F0F7',
      textSecondary: '#B0BEC5',
      border: '#37474F',
      progressTrack: '#37474F',
      statusBar: 'light-content' as const,
      error: '#CF6679',
      success: '#00E676',
    },
  },
  sage: {
    light: {
      background: '#F5F8F6',
      surface: '#ffffff',
      primary: '#7CAA98',
      text: '#2D3B36',
      textSecondary: '#5C6E67',
      border: '#E3EAE7',
      progressTrack: '#E3EAE7',
      statusBar: 'dark-content' as const,
      error: '#B00020',
      success: '#00C853',
    },
    dark: {
      background: '#1C2422',
      surface: '#243330',
      primary: '#8FBB9F',
      text: '#E8F0EC',
      textSecondary: '#B0C4B8',
      border: '#364842',
      progressTrack: '#364842',
      statusBar: 'light-content' as const,
      error: '#CF6679',
      success: '#00E676',
    },
  },
  lavender: {
    light: {
      background: '#F8F6FB',
      surface: '#ffffff',
      primary: '#967BB6',
      text: '#2E2A33',
      textSecondary: '#666270',
      border: '#EAE7EE',
      progressTrack: '#EAE7EE',
      statusBar: 'dark-content' as const,
      error: '#B00020',
      success: '#00C853',
    },
    dark: {
      background: '#1E1B23',
      surface: '#2A2533',
      primary: '#B08FD8',
      text: '#EDE9F2',
      textSecondary: '#B7B0C0',
      border: '#3D3647',
      progressTrack: '#3D3647',
      statusBar: 'light-content' as const,
      error: '#CF6679',
      success: '#00E676',
    },
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const lightColors = {
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: '#000000',
  textSecondary: '#666666',
  primary: '#6200EE',
  error: '#B00020',
  success: '#00C853',
  statusBar: 'dark-content',
  progressTrack: '#E0E0E0',
};

const darkColors = {
  background: '#121212',
  surface: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  primary: '#BB86FC',
  error: '#CF6679',
  success: '#00E676',
  statusBar: 'light-content',
  progressTrack: '#2D2D2D',
};

export function ThemeProvider({children}: {children: React.ReactNode}) {
  const [theme, setTheme] = useState<Theme>('light');
  const [colorScheme, setColorScheme] = useState<ColorScheme>('blue');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  const value = {
    theme,
    colorScheme,
    toggleTheme,
    setColorScheme,
    colors: colorSchemes[colorScheme][theme],
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeProvider;
