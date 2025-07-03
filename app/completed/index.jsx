import React from "react";
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import TaskItem from "../../components/TaskItem";
import { useTask } from "../../components/TaskContext";

export default function CompletedScreen() {
  const { getCompletedTasks, deleteTask, completeTask, loading } = useTask();
  const completedTasks = getCompletedTasks();

  const handleUndo = (taskId) => {
    completeTask(taskId);
  };

  const renderItem = ({ item }) => (
    <TaskItem
      task={item}
      onComplete={() => handleUndo(item.id)} 
      onDelete={() => deleteTask(item.id)}
      showCompleteAction={true} 
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="checkmark-done-outline" size={64} color="#ccc" />
      <Text style={styles.emptyStateText}>No completed tasks</Text>
      <Text style={styles.emptyStateSubtext}>Complete some tasks to see them here</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#305361" />
        <Text style={styles.loadingText}>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={completedTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={completedTasks.length === 0 ? styles.emptyContainer : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fafafa",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
});