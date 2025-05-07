import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../types/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParamList, 'ReviewDeck'>;

export default function Congratulations({ navigation }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.completionContainer, { backgroundColor: colors.surface }]}>
        <Text style={[styles.completionTitle, { color: colors.text }]}>All Done for Today! 🎉</Text>
        <Text style={[styles.completionSubtitle, { color: colors.textSecondary }]}>
          You&apos;ve completed all your reviews for today. Come back tomorrow for more learning!
        </Text>
        <TouchableOpacity
          style={[styles.restartButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.goBack()}>
          <Text style={[styles.restartButtonText, { color: colors.background }]}>
            Back to Decks
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  completionSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  completionContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
  },
  completionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  restartButton: {
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
