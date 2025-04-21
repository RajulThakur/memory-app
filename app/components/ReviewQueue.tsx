import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useTheme} from '../context/ThemeContext';

// Mock data - will be replaced with actual data from backend
const mockReviews = [
  {id: '1', front: '1', dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000)},
  {
    id: '2',
    front: '2',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    front: '3',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  },
];

export default function ReviewQueue() {
  const {colors} = useTheme();

  const renderItem = ({item}: {item: (typeof mockReviews)[0]}) => (
    <View style={[styles.reviewItem, {backgroundColor: colors.surface}]}>
      <Text style={[styles.cardPreview, {color: colors.text}]}>Card: {item.front}</Text>
      <Text style={[styles.dueDate, {color: colors.textSecondary}]}>
        Due: {item.dueDate.toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color: colors.text}]}>Upcoming Reviews</Text>
      <FlatList
        data={mockReviews}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  reviewItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardPreview: {
    fontSize: 16,
  },
  dueDate: {
    fontSize: 14,
  },
});
