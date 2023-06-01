import { useState } from 'react';
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
  completedTasks: Task[],
  addTaskToCompleted: (id: number | string) => void,
  clearCompletedTasks: () => void;
}

type UpdateTask = Partial<Task>;

const useTasks = (): UseTaskData => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [completedTasks, setCompletedTasks] = useLocalStorage("completedTasks", []);
  // const [tasks, setTasks] = useState<Task[]>([]);

  const deleteTask = (id: number | string) => {
    setTasks(tasks.filter((task: Task) => task.id !== id));
    localStorage.setItem("tasks", JSON.stringify([]));  //esto es por si queda en 0 el array, borre el ultimo dato
    console.log(tasks)
  };

  const createTask = (title: string, description: string) => {
    setTasks([...tasks, { title, description, id: uuid() }])
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
    console.log(completedTasks)
  };


  return {
    tasks,
    setTasks,
    deleteTask,
    createTask,
    updateTask,
    completedTasks,
    addTaskToCompleted,
    clearCompletedTasks
  };
};

export default useTasks;


// 31/05 18:54
// SOLUCIONAR! que siempre la ultima task no se borra del LocalStorage!