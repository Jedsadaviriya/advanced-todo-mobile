import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { randomUUID } from 'expo-crypto';

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getItem, setItem } = useAsyncStorage("todoTasks");

  // Load tasks when app starts
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const storedTasks = await getItem();
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        setTasks(parsedTasks);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveTasks = async (tasksToSave) => {
    try {
      await setItem(JSON.stringify(tasksToSave));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const addTask = async (title, description = '', icon = 'edit') => {
    const trimmedTitle = title.trim();
    if (trimmedTitle === '') return false;

    const newTask = {
      id: randomUUID(),
      title: trimmedTitle,
      description: description.trim(),
      icon: icon,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
    return true;
  };

  const completeTask = async (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id 
        ? { 
            ...task, 
            completed: !task.completed,
            updatedAt: new Date().toISOString()
          } 
        : task
    );
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  const deleteTask = async (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  const updateTask = async (id, updates) => {
    const updatedTasks = tasks.map(task =>
      task.id === id 
        ? { 
            ...task, 
            ...updates,
            updatedAt: new Date().toISOString()
          } 
        : task
    );
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  const getTaskById = (id) => {
    return tasks.find(task => task.id === id);
  };

  const getActiveTasks = () => tasks.filter(task => !task.completed);
  const getCompletedTasks = () => tasks.filter(task => task.completed);

  const clearAllTasks = async () => {
    setTasks([]);
    await saveTasks([]);
  };

  const clearCompletedTasks = async () => {
    const activeTasks = tasks.filter(task => !task.completed);
    setTasks(activeTasks);
    await saveTasks(activeTasks);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        completeTask,
        deleteTask,
        updateTask,
        getTaskById,
        getActiveTasks,
        getCompletedTasks,
        clearAllTasks,
        clearCompletedTasks,
        loadTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};