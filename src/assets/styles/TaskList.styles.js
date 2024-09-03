import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 columnas en pantallas grandes */
  gap: 16px; /* Espacio entre las tareas */
  margin: 0 auto;
  padding: 16px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas en pantallas medianas */
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr; /* 1 columna en pantallas pequeñas */
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 1 columna en pantallas muy pequeñas */
  }
`;

export const SectionTitle = styled.h2`
  margin: 16px 0;
  font-size: 1.5em;
  color: #333;
`;

export const TaskSection = styled.div`
  flex: 1; /* Para que cada sección tenga el mismo tamaño */
  margin: 0 8px;
`;

export const ContainerTask = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* 3 columnas de igual tamaño */
  gap: 16px; /* Espacio entre las secciones */
  margin: 0 auto;
  padding: 16px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(1, 1fr); /* 2 columnas en pantallas medianas */
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr; /* 1 columna en pantallas pequeñas */
  }
`;