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

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const storedTasks = await getItem();
      console.log('Loaded tasks from storage:', storedTasks); 
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        console.log('Parsed tasks:', parsedTasks); 
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
      console.log('Saving tasks:', tasksToSave); 
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

  const completeAllTasks = async () => {
    const updatedTasks = tasks.map(task =>
      !task.completed 
        ? { 
            ...task, 
            completed: true,
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

  const getActiveTasks = () => {
    const activeTasks = tasks.filter(task => !task.completed);
    console.log('Active tasks:', activeTasks); 
    return activeTasks;
  };

  const getCompletedTasks = () => {
    const completedTasks = tasks.filter(task => task.completed);
    console.log('Completed tasks:', completedTasks); 
    return completedTasks;
  };

  const clearAllTasks = async () => {
    setTasks([]);
    await saveTasks([]);
  };

  const clearCompletedTasks = async () => {
    const activeTasks = tasks.filter(task => !task.completed);
    setTasks(activeTasks);
    await saveTasks(activeTasks);
  };

  useEffect(() => {
    console.log('Current tasks in context:', tasks);
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        completeTask,
        completeAllTasks,
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