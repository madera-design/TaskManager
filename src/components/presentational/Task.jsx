import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseIcon from '@mui/icons-material/Close';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PauseCircleOutlineRoundedIcon from '@mui/icons-material/PauseCircleOutlineRounded';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';

import { lightBlue, blueGrey, green, orange } from '@mui/material/colors';

import { Title, Description, Timer, ContainerTime, ConatinerBtnAction, BtnGroup } from '../../assets/styles/Task.styles';
import { PrimaryButton, SecondaryButton, CloseButton} from '../../assets/styles/MUI.styles';

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
      title: "Tarea Completada correctamente",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
    setIsRunning(false);
    setIsCompleted(true);
    let timeSpent = timeLeft === task.duration ? 0 : task.duration - timeLeft;
    onComplete(task.id, timeSpent);
  };

  return (
    <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
      <CardHeader
        avatar={
          <>
            {isCompleted ? (
              <Avatar sx={{ bgcolor: green[300] }}> 
                <CheckCircleOutlineIcon /> 
              </Avatar>
            ) : (
              <>
                {isRunning ? (
                  <Avatar sx={{ bgcolor: lightBlue[300] }}> 
                    <PlayCircleOutlineRoundedIcon /> 
                  </Avatar>
                ) : null}
                {isPause ? (
                  <Avatar sx={{ bgcolor: orange[300] }}> 
                    <PauseCircleOutlineRoundedIcon /> 
                  </Avatar>
                ) : null}
                {!isRunning && !isPause && (
                  <Avatar sx={{ bgcolor: blueGrey[100] }}> 
                    <InsertDriveFileIcon /> 
                  </Avatar>
                )}
              </>
            )}
          </>
        }
        action={
          <>
            {!isCompleted && (
              <Tooltip title="Eliminar">
                <CloseButton 
                  onClick={onDelete} 
                  disabled={isCompleted}
                  aria-label="Eliminar Tarea"
                >
                  <CloseIcon />
                </CloseButton>
              </Tooltip>
            )}
          </>
        }
        title={
          <Title>{task.title}</Title>
        }
        subheader={
          <span>{task.completionDate}</span>
        }
      />
      <CardContent>
        <Description>{task.description}</Description>
        {isCompleted && (<Description><b>Duración: {formatTime(task.timeSpent)}</b></Description>)}
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
        </CardContent>
      <CardActions>
        <BtnGroup>
          <PrimaryButton 
            color="success" 
            onClick={markAsCompleted} 
            variant="contained"
            disabled={isCompleted} 
            endIcon={<CheckRoundedIcon />}
          >
            Completar
          </PrimaryButton>
          <SecondaryButton 
            color="primary" 
            onClick={onEdit} 
            disabled={isCompleted} 
            variant="contained" 
            endIcon={<EditRoundedIcon />}
          >
            Editar
          </SecondaryButton>
        </BtnGroup>
      </CardActions>
    </Card>
  );
};

export default Task;
