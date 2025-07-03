import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Modal, FlatList, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TodoForms = ({ navigateTo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('edit'); // Standard-Icon
  const [showIconPicker, setShowIconPicker] = useState(false);
  const router = useRouter();

  // Liste der verfügbaren Icons (MaterialIcons) mit etwa 30 Optionen
  const iconOptions = [
    { label: 'Kreis', value: 'circle', iconName: 'circle' },
    { label: 'Herz', value: 'heart', iconName: 'favorite' },
    { label: 'Sonne', value: 'sun', iconName: 'wb-sunny' },
    { label: 'Musik', value: 'music', iconName: 'music-note' },
    { label: 'Mülleimer', value: 'trash', iconName: 'delete' },
    { label: 'Warnung', value: 'warning', iconName: 'warning' },
    { label: 'Kamera', value: 'camera', iconName: 'camera' },
    { label: 'Telefon', value: 'phone', iconName: 'phone' },
    { label: 'Auto', value: 'car', iconName: 'directions-car' },
    { label: 'Flugzeug', value: 'airplane', iconName: 'airplanemode-active' },
    { label: 'Uhr', value: 'clock', iconName: 'access-time' },
    { label: 'Stift', value: 'edit', iconName: 'edit' },
    { label: 'Haus', value: 'home', iconName: 'home' },
    { label: 'Einkaufswagen', value: 'cart', iconName: 'shopping-cart' },
    { label: 'E-Mail', value: 'email', iconName: 'email' },
    { label: 'Kalender', value: 'calendar', iconName: 'calendar-today' },
    { label: 'Häkchen', value: 'check', iconName: 'check-circle' },
    { label: 'Stern', value: 'star', iconName: 'star' },
    { label: 'Buch', value: 'book', iconName: 'book' },
    { label: 'Blitz', value: 'bolt', iconName: 'flash-on' },
    { label: 'Pinsel', value: 'paintbrush', iconName: 'brush' },
    { label: 'Karte', value: 'map', iconName: 'map' },
    { label: 'Person', value: 'person', iconName: 'person' },
    { label: 'Einstellungen', value: 'settings', iconName: 'settings' },
    { label: 'Suchen', value: 'search', iconName: 'search' },
    { label: 'Teilen', value: 'share', iconName: 'share' },
    { label: 'Download', value: 'download', iconName: 'file-download' },
    { label: 'Schlüssel', value: 'key', iconName: 'vpn-key' },
    { label: 'Lupe', value: 'zoom', iconName: 'zoom-in' },
    { label: 'Spiel', value: 'game', iconName: 'games' },
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

  const renderIconItem = ({ item }) => (
    <TouchableOpacity
      style={styles.iconItem}
      onPress={() => { setIcon(item.value); setShowIconPicker(false); }}
    >
      <Icon name={item.iconName} size={30} color="#000000" />
    </TouchableOpacity>
  );

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
          multiline
          numberOfLines={1}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          autoCapitalize="sentences"
          multiline
          numberOfLines={3}
        />
        <Text style={styles.label}>Icon</Text>
        <TouchableOpacity
          style={styles.input} 
          onPress={() => setShowIconPicker(true)}
        >
          <Icon name={iconOptions.find((o) => o.value === icon)?.iconName || 'circle'} size={30} color="#000000" />
        </TouchableOpacity>
        <Modal visible={showIconPicker} onRequestClose={() => setShowIconPicker(false)} animationType="slide">
          <View style={styles.modalContainer}>
            <FlatList
              data={iconOptions}
              renderItem={renderIconItem}
              keyExtractor={(item) => item.value}
              numColumns={5}
              contentContainerStyle={styles.iconList}
            />
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowIconPicker(false)}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
    color: '#000000', 
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20, 
    maxWidth: Dimensions.get('window').width - 40, 
    alignItems: 'flex-start', 
    width: '100%', 
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: '400', 
    color: '#000000',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 16,
    maxWidth: '100%', 
    width: Dimensions.get('window').width - 40,
    flexShrink: 1, 
    alignSelf: 'flex-start', 
  },
  descriptionInput: {
    height: 120, 
    textAlignVertical: 'top', 
  },
  iconSelector: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    alignItems: 'center',
    width: Dimensions.get('window').width - 40, 
    flexShrink: 1, 
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  iconList: {
    paddingVertical: 10,
  },
  iconItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  modalCloseButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  modalCloseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TodoForms;