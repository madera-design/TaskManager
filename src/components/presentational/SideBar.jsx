import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Task from './Task';
import { TitleHeader, ContainerTask, DateGroup } from '../../assets/styles/Sidebar.styles';

const SideBar = ({ open, onClose, completedTasks }) => {
  // Estado para mantener las tareas completadas agrupadas por fecha
  const [groupedTasks, setGroupedTasks] = useState({});

  // useEffect para agrupar tareas por fecha cada vez que cambie la lista de tareas completadas
  useEffect(() => {
    const groupTasksByDate = () => {
      // Ordenar las tareas de la más reciente a la más antigua
      const sortedTasks = completedTasks.sort((a, b) => {
        const [dayA, monthA, yearA] = a.completionDate.split('/').map(Number);
        const [dayB, monthB, yearB] = b.completionDate.split('/').map(Number);
        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);
        return dateB - dateA;
      });

      // Agrupar tareas por fecha de finalización
      const grouped = sortedTasks.reduce((acc, task) => {
        const { completionDate } = task;
        if (!acc[completionDate]) {
          acc[completionDate] = [];
        }
        acc[completionDate].push(task);
        return acc;
      }, {});

      setGroupedTasks(grouped);  // Actualizar el estado con las tareas agrupadas
    };

    groupTasksByDate();
  }, [completedTasks]);  // Dependencia de las tareas completadas para reagrupar cuando estas cambien

  return (
    <Drawer anchor={'right'} open={open} onClose={onClose}>
      <Box role="presentation" onClick={onClose}>
        <TitleHeader>Tareas Completadas: {completedTasks.length}</TitleHeader>
        <ContainerTask>
          {Object.keys(groupedTasks).map(date => (
            <div key={date}>
              <DateGroup>Fecha: {date}</DateGroup>
              {/* Listar cada tarea completada bajo su fecha correspondiente */}
              {groupedTasks[date].map(task => (
                <Task key={task.id} task={task} />
              ))}
            </div>
          ))}
        </ContainerTask>
      </Box>
    </Drawer>
  );
};

export default SideBar;
