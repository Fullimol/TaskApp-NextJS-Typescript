import useTasks from '@/hooks/useTasks';
import React, { ReactNode, createContext } from 'react';

//aca se establece el estado inicial, luego estos datos se sobreescriben
export const Context = createContext<ContextType>({ tasks: [], deleteTask: () => { }, createTask: () => { }, updateTask: () => { } });

// aca pongo los types que hay dentro del objeto "task"
interface Task {
    id: number | string;
    title: string;
    description: string;
    // Otras propiedades de la tarea
}

type UpdateTask = Partial<Task>;

// aca pongo los types de como son los valors que recibirá.
interface ContextType {
    tasks: Task[]
    deleteTask: (id: number | string) => void;
    createTask: (tittle: string, description: string) => void;
    updateTask: (id: string | string[], updatedTask: UpdateTask) => void;
}

// aca pongo los types de las props que se reciben
type Props = {
    children: ReactNode;
};

const ContextProvider = (props: Props) => {
    const { children } = props;
    const { tasks, deleteTask, createTask, updateTask } = useTasks();

    return (
        <Context.Provider value={{ tasks, deleteTask, createTask, updateTask }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;