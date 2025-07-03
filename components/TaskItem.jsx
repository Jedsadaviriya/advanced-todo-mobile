import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/MaterialIcons';

const TaskItem = ({ task, onComplete, onDelete, showCompleteAction = true }) => {
  const router = useRouter();

  const getIconName = (iconValue) => {
    const iconMap = {
      'circle': 'circle',
      'heart': 'favorite',
      'sun': 'wb-sunny',
      'music': 'music-note',
      'trash': 'delete',
      'warning': 'warning',
      'camera': 'camera',
      'phone': 'phone',
      'car': 'directions-car',
      'airplane': 'airplanemode-active',
      'clock': 'access-time',
      'edit': 'edit',
      'home': 'home',
      'cart': 'shopping-cart',
      'email': 'email',
      'calendar': 'calendar-today',
      'check': 'check-circle',
      'star': 'star',
      'book': 'book',
      'bolt': 'flash-on',
      'paintbrush': 'brush',
      'map': 'map',
      'person': 'person',
      'settings': 'settings',
      'search': 'search',
      'share': 'share',
      'download': 'file-download',
      'key': 'vpn-key',
      'zoom': 'zoom-in',
      'game': 'games',
    };
    return iconMap[iconValue] || 'edit';
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${task.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: onDelete },
      ]
    );
  };

  const handleComplete = () => {
    onComplete();
  };

  const handleEdit = () => {
    router.push(`/edit-task/${task.id}`);
  };

  const handleTaskPress = () => {
    // to task details or edit 
    router.push(`/edit-task/${task.id}`);
  };

  const renderRightActions = (progress, dragX) => (
    <TouchableOpacity style={styles.deleteAction} onPress={handleDelete}>
      <Ionicons name="trash-outline" size={24} color="#fff" />
      <Text style={styles.actionText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderLeftActions = (progress, dragX) => {
    if (!showCompleteAction) return null;
    
    return (
      <TouchableOpacity style={styles.completeAction} onPress={handleComplete}>
        <Ionicons 
          name={task.completed ? "arrow-back-outline" : "checkmark-circle-outline"} 
          size={24} 
          color="#fff" 
        />
        <Text style={styles.actionText}>
          {task.completed ? "Undo" : "Complete"}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      onSwipeableLeftOpen={showCompleteAction ? handleComplete : undefined}
    >
      <TouchableOpacity 
        style={[styles.taskContainer, task.completed && styles.completedTask]}
        onPress={handleTaskPress}
        activeOpacity={0.7}
      >
        <Icon 
          name={getIconName(task.icon)} 
          size={24} 
          color={task.completed ? "#999" : "#305361"} 
        />
        <View style={styles.taskContent}>
          <Text style={[styles.title, task.completed && styles.completedText]}>
            {task.title}
          </Text>
          {task.description ? (
            <Text style={[styles.description, task.completed && styles.completedText]}>
              {task.description}
            </Text>
          ) : null}
          <Text style={styles.timestamp}>
            Created: {new Date(task.createdAt).toLocaleDateString()}
            {task.updatedAt !== task.createdAt && (
              <Text> • Updated: {new Date(task.updatedAt).toLocaleDateString()}</Text>
            )}
          </Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Ionicons name="create-outline" size={20} color="#666" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  completedTask: {
    backgroundColor: "#f9f9f9",
  },
  taskContent: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: "#999",
  },
  editButton: {
    padding: 8,
  },
  deleteAction: {
    backgroundColor: "#ff3b30",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
  completeAction: {
    backgroundColor: "#34c759",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
  actionText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
});

export default TaskItem;