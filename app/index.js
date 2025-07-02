import { View, Text, StyleSheet } from 'react-native';
import SaveButton from '../components/SaveButton';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SaveButton navigateTo="" backgroundColor="#75F27E">
        <Text style={styles.buttonText}>Save</Text>
      </SaveButton>
      <SaveButton navigateTo="" backgroundColor="#FFC3C3">
        <Text style={styles.buttonText}>Cancel</Text>
      </SaveButton>
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