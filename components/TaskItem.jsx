import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";

const TaskItem = ({ task, onComplete, onDelete }) => {
  const renderRightActions = (progress, dragX) => (
    <TouchableOpacity style={styles.deleteAction} onPress={onDelete}>
      <Ionicons name="trash-outline" size={24} color="#fff" />
    </TouchableOpacity>
  );

  const renderLeftActions = (progress, dragX) => (
    <TouchableOpacity style={styles.completeAction} onPress={onComplete}>
      <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      onSwipeableRightOpen={onDelete}
      onSwipeableLeftOpen={onComplete}
    >
      <View style={styles.taskContainer}>
        <Ionicons name="document-text-outline" size={24} color="#000" />
        <View style={styles.taskContent}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  taskContent: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  editButton: {
    padding: 5,
  },
  deleteAction: {
    backgroundColor: "#ff0000",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: "100%",
  },
  completeAction: {
    backgroundColor: "#00cc00",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: "100%",
  },
});

export default TaskItem;