import React from 'react'
import {ContainerNoTask} from '../../assets/styles/NoTask.styles'

const NoTask = () => {
  return (
    <ContainerNoTask>
        <h1> Sin tareas</h1>
        <img src="/sintarea.png" alt="" />
        <p>Crea una nueva tarea</p>
    </ContainerNoTask>
  )
}

export default NoTask
