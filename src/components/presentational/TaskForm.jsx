import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  HeaderTitle,
  FormGroup,
  Textarea,
  LabelInput,
  InputGroup,
  TextError
} from '../../assets/styles/TaskForm.styles';

const TaskForm = ({ open, addTask, updateTask, taskToEdit, setTaskToEdit, closeModal }) => {
  // Estados locales para manejar los datos del formulario
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(1800); // Valor por defecto de duración en segundos
  const [customDuration, setCustomDuration] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [isValidTime, setIsValidTime] = useState(false);

  // Hora máxima permitida para la duración personalizada
  const MaxTime = dayjs().set('hour', 2).startOf('hour');

  // Efecto para inicializar los valores del formulario si estamos editando una tarea
  useEffect(() => {
    if (taskToEdit) {
      setDescription(taskToEdit.description);
      setDuration(taskToEdit.duration);
      setTitle(taskToEdit.title);
    } else {
      resetForm(); // Reinicia el formulario si no estamos editando una tarea
    }
  }, [taskToEdit]);

  // Efecto para validar el formulario cada vez que cambian los valores
  useEffect(() => {
    validateForm();
  }, [title, description, duration, customDuration]);

  // Efecto para resetear la duración personalizada y el estado de validez del tiempo
  useEffect(() => {
    setCustomDuration(0);
    setIsValidTime(false);
  }, [duration]);

  // Función para resetear los valores del formulario
  const resetForm = () => {
    setDescription('');
    setDuration(1800);
    setTitle('');
    setCustomDuration(0);
  };

  // Función para manejar el cambio en el campo de duración personalizada
  const handleCustomDuration = (newValue) => {
    const { $H: hours, $m: minutes, $s: seconds } = newValue;
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    setCustomDuration(totalSeconds);
  };

  // Función para validar el formulario
  const validateForm = () => {
    const isTitleAndDescriptionFilled = title.trim() !== '' && description.trim() !== '';
    const isCustomDurationValid = customDuration > 7200;
    const isDurationCustom = duration === 0;

    if (isTitleAndDescriptionFilled && isCustomDurationValid && isDurationCustom) {
      setIsValidTime(true);
      setIsValid(false);
    } else if (isTitleAndDescriptionFilled && !isCustomDurationValid && duration !== '') {
      setIsValid(true);
      setIsValidTime(false);
    } else {
      setIsValid(false);
      setIsValidTime(false);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      if (taskToEdit) {
        // Actualiza la tarea existente
        updateTask({ id: taskToEdit.id, title, description, duration });
        setTaskToEdit(null); // Limpia la tarea en edición
      } else {
        // Agrega una nueva tarea
        addTask({ title, description, duration, customDuration });
      }
      resetForm(); // Limpia el formulario después de agregar/actualizar
      closeModal(); // Cierra el modal
    }
  };

  return (
    <Dialog
      onClose={closeModal}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="md"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <HeaderTitle>{taskToEdit ? 'Editar tarea' : 'Nueva Tarea'}</HeaderTitle>
      </DialogTitle>
      <IconButton
        onClick={closeModal}
        aria-label="close"
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 20,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            {/* Campo para el título de la tarea */}
            <InputGroup>
              <LabelInput>Título</LabelInput>
              <TextField
                id="input-titulo"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </InputGroup>
            {/* Campo para la duración de la tarea */}
            <InputGroup>
              <LabelInput>Duración</LabelInput>
              <Select
                labelId="select-duracion"
                id="select-duracion"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              >
                <MenuItem value={1800}>Corta: 30 min</MenuItem>
                <MenuItem value={2700}>Media: 45 min</MenuItem>
                <MenuItem value={3600}>Larga: 1h</MenuItem>
                <MenuItem value={0}>Otra</MenuItem>
              </Select>
            </InputGroup>
            {duration === 0 && (
              <InputGroup>
                <LabelInput>Tiempo</LabelInput>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimeField']}>
                    <TimeField
                      format="HH:mm:ss"
                      defaultValue={dayjs('2022-04-17T00:00')}
                      maxTime={MaxTime}
                      onChange={handleCustomDuration}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </InputGroup>
            )}
            {isValidTime && <TextError>El tiempo no puede ser mayor a 2 horas</TextError>}
            {/* Campo para la descripción de la tarea */}
            <InputGroup>
              <LabelInput>Descripción</LabelInput>
              <Textarea
                placeholder="Descripción de la tarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </InputGroup>
          </FormGroup>
          <DialogActions>
            <Button
              variant="contained"
              onClick={closeModal}
              color="secondary"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!isValid}
              variant="contained"
            >
              {taskToEdit ? 'Actualizar Tarea' : 'Agregar Tarea'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
