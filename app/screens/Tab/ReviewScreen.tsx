import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import DeckItem from '@/app/components/DeckItem';
import { FlatList, StyleSheet, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { dummyDecks } from '../../data/dummyData';
import type { RootStackParamList } from '../../types/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Review'>;

function ReviewScreen({ navigation }: Props) {
  const { colors } = useTheme();

  const renderDeckItem = ({ item }: { item: (typeof dummyDecks)[0] }) => (
    <DeckItem
      item={item}
      navigation={navigation}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={dummyDecks}
        renderItem={renderDeckItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
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
