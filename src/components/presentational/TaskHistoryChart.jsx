// src/components/TaskHistoryChart.js

import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { TitleHeader, ContainerTask } from '../../assets/styles/Sidebar.styles';

// Registro de componentes de Chart.js que se utilizarán en las gráficas
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

const TaskHistoryChart = ({ open, onClose, data }) => {
  // Función para agrupar tareas por fecha
  // La función recibe una lista de tareas y devuelve un objeto agrupado por fechas
  const groupTasksByDate = () => {
    return data.reduce((acc, task) => {
      const date = task.completionDate; // Fecha de finalización de la tarea
      if (!acc[date]) {
        acc[date] = { count: 0, totalTimeSpent: 0 }; // Inicializa el acumulador para cada fecha
      }
      acc[date].count += 1; // Incrementa el conteo de tareas para la fecha
      acc[date].totalTimeSpent += task.timeSpent / 60; // Suma el tiempo total gastado en minutos
      return acc;
    }, {});
  };

  // Agrupa los datos de las tareas por fecha
  const groupedData = groupTasksByDate();
  
  // Extrae las fechas y calcula el conteo de tareas y el tiempo promedio gastado por tarea
  const labels = Object.keys(groupedData);
  const taskCounts = labels.map((date) => groupedData[date].count);
  const avgTimeSpent = labels.map((date) =>
    groupedData[date].totalTimeSpent / groupedData[date].count
  );

  // Datos para la gráfica de tareas realizadas por día
  const tasksPerDayData = {
    labels,
    datasets: [
      {
        label: 'Tareas Realizadas',
        data: taskCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.5)', // Color de fondo de las barras
        borderColor: 'rgba(75, 192, 192, 1)', // Color del borde de las barras
        borderWidth: 1, // Ancho del borde de las barras
      },
    ],
  };

  // Datos para la gráfica de tiempo promedio por tarea
  const timePerTaskData = {
    labels,
    datasets: [
      {
        label: 'Tiempo Promedio por Tarea (minutos)',
        data: avgTimeSpent,
        backgroundColor: 'rgba(153, 102, 255, 0.5)', // Color de fondo de la línea
        borderColor: 'rgba(153, 102, 255, 1)', // Color de la línea
        borderWidth: 1, // Ancho de la línea
      },
    ],
  };

  // Datos para la gráfica de promedio de tiempo por tarea
  const avgTimePerTaskData = {
    labels,
    datasets: [
      {
        label: 'Tiempo Promedio por Tarea (minutos)',
        data: avgTimeSpent,
        backgroundColor: 'rgba(255, 159, 64, 0.5)', // Color de fondo de las barras
        borderColor: 'rgba(255, 159, 64, 1)', // Color del borde de las barras
        borderWidth: 1, // Ancho del borde de las barras
      },
    ],
  };

  return (
    <Drawer anchor={'right'} open={open} onClose={onClose}>
      <Box role="presentation" onClick={onClose}>
        <TitleHeader>Gráficas de Tareas Completadas</TitleHeader>
        <ContainerTask>
          <h2>Tareas realizadas por día</h2>
          <Bar data={tasksPerDayData} />

          <h2>Tiempo promedio por tarea</h2>
          <Line data={timePerTaskData} />

          <h2>Promedio de tiempo por tarea</h2>
          <Bar data={avgTimePerTaskData} />
        </ContainerTask>
      </Box>
    </Drawer>
  );
};

export default TaskHistoryChart;
