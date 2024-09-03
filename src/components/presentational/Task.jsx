import React, { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import PauseCircleOutlineRoundedIcon from '@mui/icons-material/PauseCircleOutlineRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import {
  Card,
  Title,
  Description,
  Timer,
  TitleCrad,
  ContainerTime,
  ConatinerBtnAction,
  BtnGroup
} from '../../assets/styles/Task.styles';

const Task = ({ task, onEdit, onDelete, onComplete, onStart }) => {
  // Estado para manejar el tiempo restante, si la tarea está corriendo, si está completada y si está en pausa
  const [timeLeft, setTimeLeft] = useState(task.duration === 0 ? task.customDuration : task.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task.completed ?? false);
  const [isPause, setIsPause] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      // Actualiza el tiempo restante cada segundo
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Marca la tarea como completada cuando el tiempo llega a cero
      markAsCompleted();
    }
    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [isRunning, timeLeft]);

  // Formatea el tiempo en horas, minutos y segundos
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Maneja el inicio de la tarea
  const handleStart = () => {
    setIsRunning(true);
    setIsPause(false);
    if (onStart) onStart(); // Mueve la tarea al principio de la lista
  };

  // Maneja la pausa de la tarea
  const handlePause = () => {
    setIsRunning(false);
    setIsPause(true);
  };

  // Maneja el reinicio de la tarea
  const handleReset = () => {
    setIsRunning(false);
    setIsPause(false);
    setTimeLeft(task.duration);
  };

  // Marca la tarea como completada y llama a la función onComplete
  const markAsCompleted = () => {
    Swal.fire({
      title: "Tarea eliminada correctamente",
      icon: "success",
      timer: 1500
    });
    setIsRunning(false);
    setIsCompleted(true);
    let timeSpent = timeLeft === task.duration ? 0 : task.duration - timeLeft;
    onComplete(task.id, timeSpent);
  };

  return (
    <Card>
      <TitleCrad>
        <Title>{task.title}</Title>
        {!isCompleted && (
          <Tooltip title="Eliminar">
            <IconButton 
              color="error" 
              onClick={onDelete} 
              disabled={isCompleted}
              aria-label="Eliminar Tarea"
            >
              <DeleteForeverRoundedIcon />
            </IconButton>
          </Tooltip>
        )}
      </TitleCrad>
      <Description>
        <CalendarTodayIcon /> 
        <b>{task.completionDate}</b>
      </Description>
      {isCompleted && (
        <Description>
          <AccessTimeIcon />
          <b>{formatTime(task.timeSpent)}</b>
        </Description>
      )}
      <ContainerTime>
        <Timer>{formatTime(timeLeft)}</Timer>
        {!isCompleted && (
          <ConatinerBtnAction>
            <Tooltip title="Iniciar">
              <IconButton 
                color="primary" 
                onClick={handleStart} 
                disabled={isRunning}
                aria-label="Iniciar Tarea"
              >
                <PlayCircleOutlineRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Pausar">
              <IconButton 
                color="primary" 
                onClick={handlePause}
                disabled={!isRunning}
                aria-label="Pausar Tarea"
              >
                <PauseCircleOutlineRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reiniciar">
              <IconButton 
                color="primary" 
                onClick={handleReset}
                aria-label="Reiniciar Tarea"
              >
                <RestartAltRoundedIcon />
              </IconButton>
            </Tooltip>
          </ConatinerBtnAction>
        )}
      </ContainerTime>
      {!isCompleted && (
        <>
          {isRunning && <Chip label="Tarea Iniciada" color="primary" filled />}
          {isPause && <Chip label="Tarea Pausada" color="secondary" filled />}
        </>
      )}
      {isCompleted && <Chip label="Tarea Completada" color="success" filled />}
      {!isCompleted && (
        <BtnGroup>
          <Button 
            color="success" 
            onClick={markAsCompleted} 
            variant="contained" 
            endIcon={<CheckRoundedIcon />}
          >
            Completar
          </Button>
          <Button 
            color="primary" 
            onClick={onEdit} 
            disabled={isCompleted} 
            variant="contained" 
            endIcon={<EditRoundedIcon />}
          >
            Editar
          </Button>
        </BtnGroup>
      )}
    </Card>
  );
};

export default Task;
