import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import TodoForms from '../../components/Todoforms';
import { useTask } from '../../components/TaskContext';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams();
  const { getTaskById } = useTask();
  
  const task = getTaskById(id);

  if (!task) {
    return null;
  }

  return <TodoForms editTask={task} navigateTo="/active" />;
}