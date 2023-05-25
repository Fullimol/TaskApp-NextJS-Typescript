import { v4 as uuid } from 'uuid';
import { useLocalStorage } from './useLocalStorage';

interface Task {
  id: number | string;
  title: string;
  description: string;
  // Otras propiedades de la tarea
}

interface UseTaskData {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  deleteTask: (id: number | string) => void;
  createTask: (title: string, description: string) => void;
  updateTask: (id: string | string[], updatedTask: UpdateTask) => void;
}

type UpdateTask = Partial<Task>;

const useTasks = (): UseTaskData => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const deleteTask = (id: number | string) => {
    setTasks(tasks.filter((task: Task) => task.id !== id));
  };

  const createTask = (title: string, description: string) => {
    setTasks([...tasks, { title, description, id: uuid() }])
  }

  //esta funcion copia todo lo que ya exista en "task", busca si alguna coincide con el id, si es así: Pasa una copia de todos los VALORES de ese objeto, y luego actualiza el valor que se modifica. SI NO COINCIDE EL ID: solo pasa el "task" actual
  const updateTask = (id: string | string[], updatedTask: UpdateTask) => {
    setTasks([...tasks.map((task: Task) => task.id === id ? { ...task, ...updatedTask } : task)])
  }
  
  return {
    tasks,
    setTasks,
    deleteTask,
    createTask,
    updateTask
  };
};

export default useTasks;