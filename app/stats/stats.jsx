import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTask } from '../../components/TaskContext';

export default function StatsScreen() {
  const { getActiveTasks, tasks } = useTask();
  const [chartData, setChartData] = useState({ labels: [], datasets: [{ data: [] }] });

  useEffect(() => {
    const activeTasks = getActiveTasks();
    const allTasks = tasks || [];

    if (!allTasks.length) {
      setChartData({
        labels: ['No Data'],
        datasets: [{ data: [0], color: (opacity = 1) => `rgba(48, 83, 97, ${opacity})`, strokeWidth: 1 }],
      });
      return;
    }

    // Berechne die Anzahl der aktiven Tasks pro Tag basierend auf createdAt
    const tasksByDate = {};
    allTasks.forEach(task => {
      const date = new Date(task.createdAt).toLocaleDateString();
      if (!isNaN(new Date(task.createdAt).getTime())) {
        tasksByDate[date] = (tasksByDate[date] || 0) + (task.completed ? 0 : 1);
      } else {
        console.warn('Invalid date for task:', task.createdAt);
      }
    });

    // Sortiere nach Datum und berechne den Burndown (abnehmende aktive Tasks)
    const sortedDates = Object.keys(tasksByDate).sort((a, b) => new Date(a) - new Date(b));
    let cumulativeActive = allTasks.length; // Starte mit der Gesamtzahl der Tasks
    const dataPoints = sortedDates.map(date => {
      cumulativeActive -= (tasksByDate[date] || 0); // Reduziere bei jedem Datum
      return Math.max(cumulativeActive, 0); // Verhindere negative Werte
    }).reverse(); // Umgekehrt, damit der neueste Tag links ist (Azure-Style)

    if (dataPoints.length === 0) {
      Alert.alert('No Data', 'No valid tasks with dates available for the chart.');
      setChartData({
        labels: ['No Data'],
        datasets: [{ data: [0], color: (opacity = 1) => `rgba(48, 83, 97, ${opacity})`, strokeWidth: 1 }],
      });
      return;
    }

    setChartData({
      labels: sortedDates,
      datasets: [
        {
          data: dataPoints,
          color: (opacity = 1) => `rgba(48, 83, 97, ${opacity})`, // #305361
          strokeWidth: 1.5,
        },
      ],
      legend: ['Remaining Active Tasks'],
    });
  }, [tasks]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Burndown Chart</Text>
      <Text style={styles.subtitle}>Remaining Active Tasks Over Time</Text>
      {chartData.labels.length > 0 && chartData.datasets[0].data.length > 0 ? (
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 40} // Breite mit Padding
          height={220}
          yAxisLabel=""
          yAxisInterval={1} // Gitterlinien für jeden Wert
          chartConfig={{
            backgroundColor: '#FFF5E1',
            backgroundGradientFrom: '#FFF5E1',
            backgroundGradientTo: '#FFF5E1',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(48, 83, 97, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(48, 83, 97, ${opacity})`,
            style: {
              paddingRight: 10,
              borderRadius: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
            },
            propsForDots: {
              r: '3',
              strokeWidth: '1',
              stroke: '#305361',
            },
            propsForBackgroundLines: {
              stroke: '#E0E0E0',
              strokeDasharray: '5, 5', // Gepunktete Gitterlinien
            },
          }}
          bezier={false} // Gerade Linien wie in Azure DevOps
          style={styles.chart}
        />
      ) : (
        <Text style={styles.noDataText}>No data available to display.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#305361',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});