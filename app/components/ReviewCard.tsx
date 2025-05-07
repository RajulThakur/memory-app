import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Book } from 'lucide-react-native';

export default function ReviewCard() {
  const { colors } = useTheme();

  return (
    <View style={styles.header}>
      <Book
        size={24}
        color={colors.primary}
      />
      <Text style={[styles.title, { color: colors.text }]}>Review Deck</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});
