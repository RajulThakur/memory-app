import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Check, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { RootStackParamList } from '../types/types';
import { useTheme } from '../context/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'AddCard'>;

function AddCardScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [example, setExample] = useState('');

  function handleAddCard() {
    console.log('Adding card:', { front, back, example });
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.button, { backgroundColor: colors.error }]}>
          <X
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Add New Card</Text>
        <TouchableOpacity
          onPress={handleAddCard}
          style={[styles.button, { backgroundColor: colors.success }]}
          disabled={!front.trim() || !back.trim()}>
          <Check
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Front</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            value={front}
            onChangeText={setFront}
            placeholder="Enter the front of the card"
            placeholderTextColor={colors.textSecondary}
            multiline
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Back</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            value={back}
            onChangeText={setBack}
            placeholder="Enter the back of the card"
            placeholderTextColor={colors.textSecondary}
            multiline
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Example</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            value={example}
            onChangeText={setExample}
            placeholder="Enter an example usage"
            placeholderTextColor={colors.textSecondary}
            multiline
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    padding: 8,
    borderRadius: 20,
    opacity: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default AddCardScreen;
