import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTask } from './TaskContext';

const HeaderMenu = ({ screenType }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { 
    getActiveTasks, 
    getCompletedTasks, 
    clearAllTasks, 
    clearCompletedTasks,
    completeAllTasks 
  } = useTask();

  const activeTasks = getActiveTasks();
  const completedTasks = getCompletedTasks();

  const handleCompleteAll = () => {
    if (activeTasks.length === 0) {
      Alert.alert('No Tasks', 'There are no active tasks to complete.');
      setShowMenu(false);
      return;
    }

    Alert.alert(
      'Complete All Tasks',
      `Are you sure you want to complete all ${activeTasks.length} active tasks?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Complete All',
          style: 'default',
          onPress: async () => {
            await completeAllTasks();
            setShowMenu(false);
            Alert.alert('Success', 'All tasks have been completed!');
          },
        },
      ]
    );
  };

  const handleDeleteAll = () => {
    const tasksToDelete = screenType === 'active' ? activeTasks : completedTasks;
    const taskType = screenType === 'active' ? 'active' : 'completed';

    if (tasksToDelete.length === 0) {
      Alert.alert('No Tasks', `There are no ${taskType} tasks to delete.`);
      setShowMenu(false);
      return;
    }

    Alert.alert(
      `Delete All ${taskType === 'active' ? 'Active' : 'Completed'} Tasks`,
      `Are you sure you want to delete all ${tasksToDelete.length} ${taskType} tasks? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: async () => {
            if (screenType === 'active') {
              await clearAllTasks();
            } else {
              await clearCompletedTasks();
            }
            setShowMenu(false);
            Alert.alert('Success', `All ${taskType} tasks have been deleted!`);
          },
        },
      ]
    );
  };

  const handleHelp = () => {
    setShowMenu(false);
    Alert.alert(
      'Help',
      `How to use this app:

Active Tasks:
Tap + button to add new tasks
Swipe left to complete a task
Swipe right to delete a task
Use menu to complete/delete all

Completed Tasks:
View all completed tasks here
Swipe right to delete completed tasks
Use menu to delete all completed

Adding Tasks:
Choose custom icons for your tasks
Add titles and descriptions
Tasks are automatically saved
`,
      [{ text: 'Got it!', style: 'default' }]
    );
  };

  const MenuButton = ({ icon, title, onPress, color = '#305361', destructive = false }) => (
    <TouchableOpacity
      style={[styles.menuItem, destructive && styles.destructiveItem]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={20} color={destructive ? '#FF3B30' : color} />
      <Text style={[styles.menuText, destructive && styles.destructiveText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setShowMenu(true)}
      >
        <Ionicons name="ellipsis-vertical" size={20} color="#305361" />
      </TouchableOpacity>

      <Modal
        visible={showMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
        >
          <View style={styles.menuContainer}>
            {screenType === 'active' && (
              <MenuButton
                icon="checkmark-done-outline"
                title={`Complete All (${activeTasks.length})`}
                onPress={handleCompleteAll}
              />
            )}
            
            <MenuButton
              icon="trash-outline"
              title={`Delete All ${screenType === 'active' ? `(${activeTasks.length})` : `(${completedTasks.length})`}`}
              onPress={handleDeleteAll}
              destructive={true}
            />
            
            <View style={styles.separator} />
            
            <MenuButton
              icon="help-circle-outline"
              title="Help & Instructions"
              onPress={handleHelp}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    padding: 8,
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 100,
    paddingRight: 16,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  destructiveItem: {
    backgroundColor: '#FFF5F5',
  },
  menuText: {
    fontSize: 16,
    color: '#305361',
    marginLeft: 12,
    fontWeight: '500',
  },
  destructiveText: {
    color: '#FF3B30',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 4,
  },
});

export default HeaderMenu;