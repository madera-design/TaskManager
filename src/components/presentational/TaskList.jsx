import React, { useState, useEffect } from 'react';
import Task from '../presentational/Task';
import SideBar from './SideBar';
import TaskHistoryChart from './TaskHistoryChart';
import NoTask from './NoTask';
import Filter from './Filter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  GridContainer,
  SectionTitle,
  TaskSection,
  ContainerTask,
} from '../../assets/styles/TaskList.styles';

const TaskList = ({ tasks, deleteTask, editTask, openTaskComplete, closeTaskComplete, openTaskHistory, closeTaskHistory }) => {
  const [taskList, setTaskList] = useState(tasks);
  const [newTasks, setNewTasks] = useState([]);

  // Actualiza `taskList` y `newTasks` cuando `tasks` cambie
  useEffect(() => {
    setTaskList(tasks);
    // Filtra tareas nuevas: no completadas y no en progreso
    setNewTasks(tasks.filter(task => !task.completed && !task.inProgress));
  }, [tasks]);

  // Marca una tarea como completada y actualiza el estado
  const handleComplete = (id, timeSpent) => {
    const updatedTasks = taskList.map(task =>
      task.id === id
        ? { ...task, completed: true, timeSpent: timeSpent }
        : task
    );
    // Actualiza `newTasks` después de completar una tarea
    setNewTasks(updatedTasks.filter(task => !task.completed && !task.inProgress));
    setTaskList(updatedTasks);
  };

  // Mueve una tarea al inicio de la lista de tareas nuevas
  const moveTaskToTop = (id) => {
    const taskToMove = newTasks.find(task => task.id === id);
    if (taskToMove) {
      const remainingTasks = newTasks.filter(task => task.id !== id);
      setNewTasks([taskToMove, ...remainingTasks]);
    }
  };

  // Filtra las tareas según la duración especificada
  const filterDurations = (duration) => {
    // Utiliza un objeto para mapear las duraciones a filtros
    const durationFilter = {
      1800: task => task.duration <= 1800,
      2700: task => task.duration > 1800 && task.duration <= 3600,
      3600: task => task.duration > 3600,
      default: task => true
    };

    const filterFunction = durationFilter[duration] || durationFilter.default;

    // Filtra las tareas según la duración y el estado de la tarea
    const filteredTasks = tasks.filter(task =>
      (!task.completed && !task.inProgress) && filterFunction(task)
    );
    if(filteredTasks.length === 0){
      toast.error('Tareas con esa duración no encontrada', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      return
    }
    setNewTasks(filteredTasks);
  };
  const ordenTasksList = (id) =>{
    console.log(id)
  }

  // Filtra las tareas completadas
  const completedTasks = taskList.filter(task => task.completed);

  return (
    <ContainerTask>
      <TaskSection>
        {newTasks.length === 0 ? (
          <NoTask />
        ) : (
          <>
            <SectionTitle>Lista de tareas: {newTasks.length}</SectionTitle>
            <Filter filterDurations={filterDurations} ordenTasks={ordenTasksList} />
            <GridContainer>
              {newTasks.map(task => (
                <Task
                  key={task.id}
                  task={task}
                  onEdit={() => editTask(task)}
                  onDelete={() => deleteTask(task)}
                  onComplete={handleComplete}
                  onStart={() => moveTaskToTop(task.id)}
                />
              ))}
            </GridContainer>
          </>
        )}
      </TaskSection>
      {openTaskComplete && (
        <SideBar
          open={openTaskComplete}
          onClose={closeTaskComplete}
          completedTasks={completedTasks}
        />
      )}
      {openTaskHistory && (
        <TaskHistoryChart
          open={openTaskHistory}
          onClose={closeTaskHistory}
          data={completedTasks}
        />
      )}
      <ToastContainer />
    </ContainerTask>
  );
};

export default TaskList;
