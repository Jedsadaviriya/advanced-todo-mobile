import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TodoForm = ({ navigateTo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('circle'); // Standard-Icon
  const router = useRouter();

  // Liste der verfügbaren Icons (MaterialIcons)
  const iconOptions = [
    { label: 'Star ', value: 'star' },
    { label: 'House ', value: 'house' },
    { label: 'Heart ', value: 'heart' },
    { label: 'Calendar ', value: 'calendar' },
    { label: 'Check ', value: 'check' },
    { label: 'Book ', value: 'book' },
    { label: 'Clock ', value: 'clock' },
    { label: 'Bolt ', value: 'bolt' },
    { label: 'Music ', value: 'music' },
    { label: 'Cart ', value: 'cart' },
    { label: 'Sun ', value: 'sun' },
    { label: 'Paintbrush ', value: 'paintbrush' },
  ];

  const handleSubmit = () => {
    if (title && description && icon) {
      console.log('Todo-Daten:', { title, description, icon });
      if (navigateTo) {
        router.push(navigateTo); // Navigiert zur angegebenen Route
      }
    } else {
      alert('Bitte fülle alle Felder aus.');
    }
  };

  const handleCancel = () => {
    router.push('/'); // Zurück zur Hauptseite
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleCancel}>
          <Text style={styles.headerButtonText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add ToDos</Text>
        <TouchableOpacity style={styles.headerButton} onPress={handleSubmit}>
          <Text style={styles.headerButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
          autoCapitalize="sentences"
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          autoCapitalize="sentences"
          multiline
          numberOfLines={3}
        />
        <Text style={styles.label}>Icon</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={icon}
            onValueChange={(itemValue) => setIcon(itemValue)}
            style={styles.picker}
          >
            {iconOptions.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerButton: {
    padding: 10,
  },
  headerButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TodoForm;