import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import TaskItem from "../../components/TaskItem";

export default function CompletedScreen() {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Task 1", description: "Description 1", completed: true },
    { id: "2", title: "Task 2", description: "Description 2", completed: true },
  ]);

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const renderItem = ({ item }) => (
    <TaskItem
      task={item}
      onComplete={() => {}} // To Do on complete function
      onDelete={() => handleDelete(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
});