import { View, Text, StyleSheet } from 'react-native';
import SaveButton from '../components/SaveButton';
import TodoForm from '../components/Todoforms';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TodoForm/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});