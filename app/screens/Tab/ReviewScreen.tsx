import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import DeckItem from '@/app/components/DeckItem';
import { FlatList, StyleSheet, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { dummyDecks } from '../../data/dummyData';
import type { RootStackParamList } from '../../types/types';
import { useEffect, useState } from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'Review'>;

function ReviewScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [decks, setDecks] = useState(dummyDecks);

  // Update decks when screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setDecks([...dummyDecks]); // Create new array to trigger re-render
    });

    return unsubscribe;
  }, [navigation]);

  const renderDeckItem = ({ item }: { item: (typeof dummyDecks)[0] }) => (
    <DeckItem
      item={item}
      navigation={navigation}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={decks}
        renderItem={renderDeckItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        extraData={decks} // Add this to ensure FlatList updates when decks change
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
  },
  listContent: {
    padding: 4,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default ReviewScreen;
