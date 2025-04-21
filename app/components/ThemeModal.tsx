import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { Palette, MoonIcon, SunIcon } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import type { ColorScheme } from '../context/ThemeContext';

interface ColorSchemeButtonProps {
  name: string;
  color: string;
  isSelected: boolean;
  onPress: () => void;
}

function ColorSchemeButton({ name, color, isSelected, onPress }: ColorSchemeButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.colorSchemeButton,
        { backgroundColor: color },
        isSelected && styles.selectedScheme,
      ]}
    >
      <Text style={[styles.colorSchemeName, isSelected && styles.selectedSchemeName]}>{name}</Text>
    </Pressable>
  );
}

interface ThemeModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ThemeModal({ visible, onClose }: ThemeModalProps) {
  const { colors, toggleTheme, colorScheme, setColorScheme, theme } = useTheme();

  const handleColorSchemeChange = (scheme: ColorScheme) => {
    setColorScheme(scheme);
    onClose();
  };

  const handleThemeToggle = () => {
    toggleTheme();
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View
          style={[styles.modalContent, { backgroundColor: colors.surface }]}
          onStartShouldSetResponder={() => true}
        >
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Color Scheme</Text>
            <Palette size={24} color={colors.primary} />
          </View>

          <View style={styles.themeOptions}>
            <ColorSchemeButton
              name="Soft Blue"
              color="#4A90E2"
              isSelected={colorScheme === 'blue'}
              onPress={() => handleColorSchemeChange('blue')}
            />
            <ColorSchemeButton
              name="Sage Green"
              color="#7CAA98"
              isSelected={colorScheme === 'sage'}
              onPress={() => handleColorSchemeChange('sage')}
            />
            <ColorSchemeButton
              name="Lavender"
              color="#967BB6"
              isSelected={colorScheme === 'lavender'}
              onPress={() => handleColorSchemeChange('lavender')}
            />
          </View>

          <TouchableOpacity
            style={[styles.darkModeButton, { backgroundColor: colors.primary }]}
            onPress={handleThemeToggle}
          >
            {theme === 'light' ? (
              <View style={styles.buttonContent}>
                <MoonIcon size={20} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.darkModeButtonText}>Switch to Dark Mode</Text>
              </View>
            ) : (
              <View style={styles.buttonContent}>
                <SunIcon size={20} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.darkModeButtonText}>Switch to Light Mode</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  themeOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  colorSchemeButton: {
    padding: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  selectedScheme: {
    borderWidth: 2,
    borderColor: '#fff',
  },
  colorSchemeName: {
    color: '#fff',
    fontWeight: '500',
  },
  selectedSchemeName: {
    fontWeight: 'bold',
  },
  darkModeButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 10,
    width: '100%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  darkModeButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
});
