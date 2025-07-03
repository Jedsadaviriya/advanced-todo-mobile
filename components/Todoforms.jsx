import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Modal, FlatList, Dimensions, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTask } from './TaskContext';

const TodoForms = ({ navigateTo, editTask = null }) => {
  const [title, setTitle] = useState(editTask?.title || '');
  const [description, setDescription] = useState(editTask?.description || '');
  const [icon, setIcon] = useState(editTask?.icon || 'edit');
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { addTask, updateTask } = useTask();

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

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Bitte geben Sie einen Titel ein.');
      return;
    }

    setLoading(true);
    
    try {
      if (editTask) {
        // update existing task
        await updateTask(editTask.id, {
          title: title.trim(),
          description: description.trim(),
          icon: icon
        });
        Alert.alert('Erfolg', 'Aufgabe wurde aktualisiert!');
      } else {
        // Add new task
        const success = await addTask(title.trim(), description.trim(), icon);
        if (success) {
          Alert.alert('Erfolg', 'Aufgabe wurde hinzugefügt!');
        } else {
          Alert.alert('Fehler', 'Aufgabe konnte nicht hinzugefügt werden.');
          return;
        }
      }
      
      // back or to a route
      if (navigateTo) {
        router.push(navigateTo);
      } else {
        router.back();
      }
    } catch (error) {
      console.error('Error saving task:', error);
      Alert.alert('Fehler', 'Ein Fehler ist aufgetreten.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // check for unsaved changes
    const hasChanges = editTask 
      ? (title !== editTask.title || description !== editTask.description || icon !== editTask.icon)
      : (title.trim() !== '' || description.trim() !== '' || icon !== 'edit');

    if (hasChanges) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Are you sure you want to cancel?',
        [
          { text: 'Keep Editing', style: 'cancel' },
          { 
            text: 'Discard Changes', 
            style: 'destructive', 
            onPress: () => router.back() 
          },
        ]
      );
    } else {
      router.back();
    }
  };

  const renderIconItem = ({ item }) => (
    <TouchableOpacity
      style={styles.iconItem}
      onPress={() => { setIcon(item.value); setShowIconPicker(false); }}
    >
      <Icon name={item.iconName} size={30} color="#305361" />
      <Text style={styles.iconLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity 
          style={[styles.cancelButton, loading && styles.disabledButton]} 
          onPress={handleCancel}
          disabled={loading}
        >
          <Text style={[styles.cancelButtonText, loading && styles.disabledText]}>
            Cancel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.saveButton, loading && styles.disabledButton]} 
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={[styles.saveButtonText, loading && styles.disabledText]}>
            {loading ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
          autoCapitalize="sentences"
          multiline
          numberOfLines={1}
          maxLength={100}
          editable={!loading}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Enter description (optional)"
          value={description}
          onChangeText={setDescription}
          autoCapitalize="sentences"
          multiline
          numberOfLines={3}
          maxLength={500}
          editable={!loading}
        />

        <Text style={styles.label}>Icon</Text>
        <TouchableOpacity
          style={[styles.input, styles.iconSelector]} 
          onPress={() => setShowIconPicker(true)}
          disabled={loading}
        >
          <Icon 
            name={iconOptions.find((o) => o.value === icon)?.iconName || 'circle'} 
            size={30} 
            color="#305361" 
          />
        </TouchableOpacity>

        <Modal 
          visible={showIconPicker} 
          onRequestClose={() => setShowIconPicker(false)} 
          animationType="slide"
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Icon</Text>
              <TouchableOpacity 
                style={styles.modalCloseButton} 
                onPress={() => setShowIconPicker(false)}
              >
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={iconOptions}
              renderItem={renderIconItem}
              keyExtractor={(item) => item.value}
              numColumns={4}
              contentContainerStyle={styles.iconList}
              showsVerticalScrollIndicator={false}
            />
          </SafeAreaView>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E1',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#305361',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  cancelButtonText: {
    color: '#305361',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#305361',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#999',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20, 
    paddingTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500', 
    color: '#305361',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    width: '100%',
  },
  descriptionInput: {
    height: 120, 
    textAlignVertical: 'top', 
  },
  iconSelector: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFF5E1',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#305361',
  },
  iconList: {
    padding: 16,
  },
  iconItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    margin: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  iconLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  modalCloseButton: {
    backgroundColor: '#305361',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  modalCloseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TodoForms;