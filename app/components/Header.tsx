import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Palette } from 'lucide-react-native';

interface HeaderProps {
  onOpenThemeModal: () => void;
}

export default function Header({ onOpenThemeModal }: HeaderProps) {
  const { colors, theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <Text style={[styles.title, { color: '#FFFFFF' }]}>LangApp</Text>
      <View style={styles.themeControls}>
        <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
          {theme === 'light' ? <Sun size={20} color="#fff" /> : <Moon size={20} color="#fff" />}
        </TouchableOpacity>
        <TouchableOpacity onPress={onOpenThemeModal} style={styles.iconButton}>
          <Palette size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  themeControls: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 8,
  },
});
