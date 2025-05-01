import DeckCard from '@/app/components/DeckCard';
import { useTheme } from '@/app/context/ThemeContext';
import { dummyDecks } from '@/app/data/dummyData';
import { useNavigation } from '@react-navigation/native';
import { PlusIcon } from 'lucide-react-native';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function DecksScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleAddCard = () => {
    try {
      navigation.navigate('AddCard');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

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
            onPress={() => navigation.navigate('DeckInfo', { deckId: item.id })}
          />
        )}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={handleAddCard}
        activeOpacity={0.8}>
        <PlusIcon
          stroke={colors.background}
          size={24}
        />
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
  list: {
    paddingBottom: 20,
    paddingHorizontal: 15,
    paddingTop: 8,
  },
});
