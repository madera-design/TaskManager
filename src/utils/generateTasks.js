// src/utils/generateTasks.js

export const generateRandomTasks = () => {
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

  const durationOptions = {
    short: 1800, // 30 minutos en segundos
    medium: 2700, // 45 minutos en segundos
    long: 3600 // 1 hora en segundos
  };

  const getRandomTitle = () => taskTitles[Math.floor(Math.random() * taskTitles.length)];
  
  const getRandomDuration = () => {
    const durations = Object.values(durationOptions);
    return durations[Math.floor(Math.random() * durations.length)];
  };

  const getRandomCompletionTime = (duration) => {
    let DurationTime = Math.floor(Math.random() * (500 - 100) + 100);
    return duration - DurationTime;
  };

  const getRandomDateWithinLastWeek = () => {
    const today = new Date();
    const pastWeek = new Date(today);
    pastWeek.setDate(today.getDate() - 7);

    const randomDate = new Date(
        pastWeek.getTime() + Math.random() * (today.getTime() - pastWeek.getTime())
    );

    const day = String(randomDate.getDate()).padStart(2, '0'); // Día con dos dígitos
    const month = String(randomDate.getMonth() + 1).padStart(2, '0'); // Mes con dos dígitos (meses van de 0 a 11)
    const year = randomDate.getFullYear(); // Año

    return `${day}/${month}/${year}`;
};

  const tasks = Array.from({ length: 5 }, () => {
    const duration = getRandomDuration();
    const isCompleted = Math.random() > 0.5;  // 50% de probabilidad de estar completada
    return {
      id: Date.now() + Math.random(),
      title: getRandomTitle(),
      description: 'Descripción aleatoria de la tarea.',
      duration,
      timeSpent: getRandomCompletionTime(duration),
      completed: isCompleted,
      completionDate: getRandomDateWithinLastWeek(),
      completionTime: '00:00'
    };
  });

  return tasks;
};
