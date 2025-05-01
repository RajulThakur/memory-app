import DeckCard from '@/app/components/DeckCard';
import { useTheme } from '@/app/context/ThemeContext';
import { dummyDecks } from '@/app/data/dummyData';
import { useRouter } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DecksScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={dummyDecks}
        style={{ backgroundColor: colors.background }}
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
        <Text style={styles.fabText}>
          <PlusIcon
            stroke={colors.background}
            size={24}
          />
        </Text>
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
    elevation: 2,
    height: 56,
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    width: 56,
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 20,
    paddingHorizontal: 15,
    paddingTop: 8,
  },
});
