import React, { useState, useEffect } from 'react';
import TaskForm from '../presentational/TaskForm';
import TaskList from '../presentational/TaskList';
import Header from '../presentational/Header';
import Swal from 'sweetalert2'
import { generateRandomTasks } from '../../utils/generateTasks';

const TaskManager = () => {
  // Estado para almacenar la lista de tareas
  const [tasks, setTasks] = useState([]);
  // Estado para almacenar la tarea que se está editando
  const [taskToEdit, setTaskToEdit] = useState(null);
  // Estado para controlar la visibilidad del modal de tareas
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Estado para controlar la visibilidad de la barra lateral de historial
  const [isSidebarHistory, setSidebarHistory] = useState(false);
  // Estado para controlar la visibilidad de la barra lateral de tareas completadas
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Función para agregar una nueva tarea
  const addTask = (task) => {
    const date = new Date();
    const NewDate = date.toLocaleDateString(); // Obtener la fecha actual en formato local
    // Agregar la nueva tarea con un ID único y la fecha de finalización
    setTasks([...tasks, { id: Date.now(), completionDate: NewDate, ...task }]);
  };

  // Función para actualizar una tarea existente
  const updateTask = (updatedTask) => {
    // Reemplazar la tarea con el mismo ID por la tarea actualizada
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  // Función para eliminar una tarea por su ID
  const deleteTask = (item) => {
    Swal.fire({
      title: `¿Quieres eliminar la tarea "${item.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28b1f5",
      cancelButtonColor: "#c0392b",
      confirmButtonText: "Elimnar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Tarea eliminada correctamente",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        setTasks(tasks.filter(task => task.id !== item.id));
      }
    });
    // Filtrar las tareas y eliminar la tarea con el ID especificado
    
  };

  // Función para iniciar la edición de una tarea
  const editTask = (task) => {
    setTaskToEdit(task); // Establecer la tarea seleccionada como la que se va a editar
    setIsModalOpen(true); // Abrir el modal de edición de tareas
  };

  // Función para abrir el modal de creación de tareas
  const openModal = () => {
    setTaskToEdit(null); // No establecer ninguna tarea como seleccionada
    setIsModalOpen(true); // Abrir el modal de creación de tareas
  };

  // Función para cerrar el modal de tareas
  const closeModal = () => {
    setIsModalOpen(false); // Cerrar el modal de tareas
  };

  // Función para abrir la barra lateral de tareas completadas
  const openSidebar = () => {
    setSidebarOpen(true); // Abrir la barra lateral
  };

  // Función para cerrar la barra lateral de tareas completadas
  const closeSidebar = () => {
    setSidebarOpen(false); // Cerrar la barra lateral
  };

  // Función para abrir la barra lateral de historial de tareas
  const openHistory = () => {
    setSidebarHistory(true); // Abrir la barra lateral de historial
  };

  // Función para cerrar la barra lateral de historial de tareas
  const closeHistory = () => {
    setSidebarHistory(false); // Cerrar la barra lateral de historial
  };

  // Efecto para generar tareas aleatorias al cargar el componente
  useEffect(() => {
    const randomTasks = generateRandomTasks(); // Generar tareas aleatorias
    setTasks(randomTasks); // Establecer las tareas generadas en el estado
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montarse el componente

  return (
    <div>
      {/* Renderizar el componente de encabezado con las funciones para crear tareas, abrir el sidebar y abrir el historial */}
      <Header
        onCreatetTask={openModal}
        onOpenSiberbar={openSidebar}
        onOpenHistory={openHistory}
      />
      {/* Renderizar el componente TaskList con las tareas, funciones para eliminar y editar tareas, y control del sidebar */}
      <TaskList 
        tasks={tasks} 
        deleteTask={deleteTask} 
        editTask={editTask}
        openTaskComplete={isSidebarOpen}
        closeTaskComplete={closeSidebar}
        openTaskHistory={isSidebarHistory}
        closeTaskHistory={closeHistory}
      />
      {/* Renderizar el modal de tareas solo si isModalOpen es verdadero */}
      {isModalOpen && (
        <TaskForm
          open={isModalOpen}
          addTask={addTask}
          updateTask={updateTask}
          taskToEdit={taskToEdit}
          setTaskToEdit={setTaskToEdit}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default TaskManager;
