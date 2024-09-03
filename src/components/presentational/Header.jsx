import React from 'react'
import { HaederContainer, TitleHeader, HeaderContainerBtn } from '../../assets/styles/Header.styles'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {SecondaryButton, TertiaryButton, PrimaryButton} from '../../assets/styles/MUI.styles'

const Header = ({ onCreatetTask, onOpenSiberbar, onOpenHistory }) => {
  return (
    <>
      <HaederContainer>
        <TitleHeader>Administrador de tareas</TitleHeader>
      </HaederContainer>
      <HeaderContainerBtn>
        <SecondaryButton
          onClick={onCreatetTask}  // Función para abrir el modal de creación de tareas
          variant="contained"
          color="secondary"
          endIcon={<AddCircleOutlineRoundedIcon />}  // Icono de "Añadir" en el botón
        >
          Crear Tarea
        </SecondaryButton>
        <PrimaryButton
          onClick={onOpenSiberbar}  // Función para abrir el sidebar de tareas completadas
          variant="contained"
          color="secondary"
          endIcon={<CheckCircleOutlineIcon />}  // Icono de "Tareas Completas" en el botón
        >
          Tareas completas
        </PrimaryButton>
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
