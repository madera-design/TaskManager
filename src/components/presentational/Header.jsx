import React from 'react'
import Button from '@mui/material/Button';
import { HaederContainer, TitleHeader, HeaderContainerBtn } from '../../assets/styles/Header.styles'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {TertiaryButton} from '../../assets/styles/MUI.styles'

const Header = ({ onCreatetTask, onOpenSiberbar, onOpenHistory }) => {
  return (
    <>
      <HaederContainer>
        <TitleHeader>Task Manager</TitleHeader>
      </HaederContainer>

      <HeaderContainerBtn>
        <TertiaryButton
          onClick={onCreatetTask}  // Función para abrir el modal de creación de tareas
          variant="contained"
          color="secondary"
          endIcon={<AddCircleOutlineRoundedIcon />}  // Icono de "Añadir" en el botón
        >
          Crear Tarea
        </TertiaryButton>

        <TertiaryButton
          onClick={onOpenSiberbar}  // Función para abrir el sidebar de tareas completadas
          variant="contained"
          color="secondary"
          endIcon={<CheckCircleOutlineIcon />}  // Icono de "Tareas Completas" en el botón
        >
          Tareas completas
        </TertiaryButton>

        <TertiaryButton
          onClick={onOpenHistory}  // Función para abrir el sidebar del historial de tareas
          variant="contained"
          color="secondary"
          endIcon={<ShowChartIcon />}  // Icono de "Historial" en el botón
        >
          Historial
        </TertiaryButton>
      </HeaderContainerBtn>
    </>
  )
}

export default Header
