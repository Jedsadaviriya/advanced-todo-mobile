import React, { useState } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import TaskItem from "./TaskItem";

const TaskList = ({ navigation }) => {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Task 1", description: "Description 1", completed: false },
    { id: "2", title: "Task 2", description: "Description 2", completed: false },
    { id: "3", title: "Task 3", description: "Description 3", completed: false },
  ]);

//   Testing data
//   To do: persistenz for data

  const handleComplete = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: true } : task
    ));
    navigation.navigate("completed/index");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const renderItem = ({ item }) => (
    <TaskItem
      task={item}
      onComplete={() => handleComplete(item.id)}
      onDelete={() => handleDelete(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks.filter((task) => !task.completed)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => {}}>
        <Ionicons name="add" size={24} color="#305361" /> 
        {/* to do: create  */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#00ff00",
    // change color to a different color
    borderRadius: 10,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TaskList;