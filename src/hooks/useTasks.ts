import { v4 as uuid } from 'uuid';
import { useLocalStorage } from './useLocalStorage';

interface Task {
  id: number | string;
  title: string;
  description: string;
  // Otras propiedades de la tarea
  createdAt: Date
}

interface UseTaskData {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  deleteTask: (id: number | string) => void;
  createTask: (title: string, description: string) => void;
  updateTask: (id: string | string[], updatedTask: UpdateTask) => void;
  completedTasks: Task[],
  addTaskToCompleted: (id: number | string) => void,
  clearCompletedTasks: () => void;
  restoreTask: (id: number | string) => void,
}

type UpdateTask = Partial<Task>;

const useTasks = (): UseTaskData => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [completedTasks, setCompletedTasks] = useLocalStorage("completedTasks", []);


  const deleteTask = (id: number | string) => {
    setTasks(tasks.filter((task: Task) => task.id !== id));
    localStorage.setItem("tasks", JSON.stringify([]));  //esto es por si queda en 0 el array, borre el ultimo dato
    console.log(tasks)
  };

  const createTask = (title: string, description: string) => {
    setTasks([...tasks, { title, description, id: uuid(), createdAt: new Date() }])
  }

  //esta funcion copia todo lo que ya exista en "task", busca si alguna coincide con el id, si es así: Pasa una copia de todos los VALORES de ese objeto, y luego actualiza el valor que se modifica. SI NO COINCIDE EL ID: solo pasa el "task" actual
  const updateTask = (id: string | string[], updatedTask: UpdateTask) => {
    setTasks([...tasks.map((task: Task) => task.id === id ? { ...task, ...updatedTask } : task)])
  }

  const addTaskToCompleted = (id: number | string) => {
    // Encuentra la tarea con el ID correspondiente
    const taskToAdd = tasks.find((task: Task) => task.id === id);
    if (taskToAdd) {
      // Agrega la tarea a completedTasks
      setCompletedTasks((prevCompletedTasks: Task[]) => [...prevCompletedTasks, taskToAdd]);
      // Elimina la tarea de tasks
      setTasks((prevTasks: any) => prevTasks.filter((task: Task) => task.id !== id));
      localStorage.setItem("tasks", JSON.stringify([]));  //esto es por si queda en 0 el array, borre el ultimo dato
    }
  };

  const clearCompletedTasks = () => {
    setCompletedTasks([]);
    localStorage.setItem("completedTasks", JSON.stringify([])); //esto es por si queda en 0 el array, borre el ultimo dato

  };


  const restoreTask = (id: string | number) => {
    // Buscar la tarea completada que se va a restaurar por su id
    const taskToRestore = completedTasks.find((task: Task) => task.id === id);

    if (!taskToRestore) {
      return; // La tarea no fue encontrada, no se realiza ninguna acción
    }

    // Actualizar el array de tareas completadas eliminando la tarea restaurada
    setCompletedTasks((prevCompletedTasks: Task[]) => prevCompletedTasks.filter((task) => task.id !== id));
    localStorage.setItem("completedTasks", JSON.stringify([]));  //esto es por si queda en 0 el array, borre el ultimo dato

    // Agregar la tarea restaurada al array de todas las tareas
    setTasks((prevTasks: Task[]) => [...prevTasks, taskToRestore]);
  };

  return {
    tasks,
    setTasks,
    deleteTask,
    createTask,
    updateTask,
    completedTasks,
    addTaskToCompleted,
    clearCompletedTasks,
    restoreTask
  };
};

export default useTasks;