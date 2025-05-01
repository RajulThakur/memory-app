import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DeckCard from '../components/DeckCard';
import { useTheme } from '../context/ThemeContext';
import { dummyDecks } from '../data/dummyData';

export default function DecksScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={dummyDecks}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <DeckCard
            name={item.name}
            description={item.description}
            language={item.language}
            totalCards={item.totalCards}
            masteredCards={item.masteredCards}
            onPress={() => console.log('Deck pressed')}
          />
        )}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    alignItems: 'center',
    borderRadius: 28,
    bottom: 16,
    elevation: 4,
    height: 56,
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: 56,
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    padding: 16,
  },
});
