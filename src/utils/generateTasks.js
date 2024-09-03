// Genera un conjunto de tareas aleatorias
export const generateRandomTasks = () => {
  // Lista de títulos de tareas posibles
  const taskTitles = [
    'Revisar correos electrónicos',
    'Desarrollo de nuevas funcionalidades',
    'Reunión con el equipo',
    'Escribir documentación',
    'Corrección de errores',
    'Diseñar interfaz de usuario',
    'Optimización de código',
    'Investigación de nuevas tecnologías',
    'Planificación de sprints',
    'Pruebas de rendimiento'
  ];

  // Opciones de duración en segundos para las tareas
  const durationOptions = {
    short: 1800, // 30 minutos en segundos
    medium: 2700, // 45 minutos en segundos
    long: 3600 // 1 hora en segundos
  };

  // Función para obtener un título de tarea aleatorio de la lista `taskTitles`
  const getRandomTitle = () => taskTitles[Math.floor(Math.random() * taskTitles.length)];
  
  // Función para obtener una duración aleatoria de la tarea usando `durationOptions`
  const getRandomDuration = () => {
    const durations = Object.values(durationOptions);
    return durations[Math.floor(Math.random() * durations.length)];
  };

  // Función para calcular el tiempo de finalización aleatorio basado en la duración de la tarea
  const getRandomCompletionTime = (duration) => {
    let DurationTime = Math.floor(Math.random() * (500 - 100) + 100); // Calcula un tiempo aleatorio entre 100 y 500 segundos
    return duration - DurationTime; // Devuelve el tiempo restante después de completar la tarea
  };

  // Función para obtener una fecha aleatoria dentro de la última semana
  const getRandomDateWithinLastWeek = () => {
      const today = new Date();
      const pastWeek = new Date(today);
      pastWeek.setDate(today.getDate() - 7); // Define el rango de la última semana

      // Genera una fecha aleatoria entre hace una semana y hoy
      const randomDate = new Date(
          pastWeek.getTime() + Math.random() * (today.getTime() - pastWeek.getTime())
      );

      // Obtiene el día, mes y año sin padding
      const day = randomDate.getDate(); 
      const month = randomDate.getMonth() + 1; 
      const year = randomDate.getFullYear(); 

      // Devuelve la fecha en formato DD/MM/YYYY
      return `${day}/${month}/${year}`;
  };

  // Genera un arreglo de 50 tareas aleatorias
  const tasks = Array.from({ length: 50 }, () => {
    const duration = getRandomDuration(); // Obtiene una duración aleatoria
    const isCompleted = Math.random() > 0.5;  // 50% de probabilidad de que la tarea esté completada
    return {
      id: Date.now() + Math.random(), // Genera un ID único usando la fecha actual y un valor aleatorio
      title: getRandomTitle(), // Asigna un título aleatorio
      description: 'Descripción aleatoria de la tarea.', // Descripción estática para la tarea
      duration, // Duración de la tarea
      timeSpent: getRandomCompletionTime(duration), // Tiempo aleatorio dedicado a la tarea
      completed: isCompleted, // Indica si la tarea está completada o no
      completionDate: getRandomDateWithinLastWeek(), // Fecha de finalización aleatoria dentro de la última semana
      completionTime: '00:00' // Hora de finalización (sin usar en este ejemplo, pero se podría extender)
    };
  });

  // Devuelve el arreglo de tareas generadas
  return tasks;
};
