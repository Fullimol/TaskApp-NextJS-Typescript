import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import { Context } from '../context/ContextProvider';
import { useRouter } from 'next/router';
import { MdCancel } from 'react-icons/md';
import Link from 'next/link';

type Task = {
  title: string;
  description: string;
};

const TaskFormPage = () => {
  const [newtask, setNewTask] = useState<Task>({
    title: "",
    description: ""
  })

  const { createTask, updateTask, tasks } = useContext(Context)
  const { push, query } = useRouter()

  // En el caso del código que has proporcionado, el tipo del evento e sería React.ChangeEvent<HTMLInputElement>. Esto es porque estás accediendo a las propiedades name y value en e.target, lo cual es comúnmente utilizado en eventos de cambio (onChange) de elementos de entrada de tipo input
  //Al especificar ChangeEvent<HTMLInputElement> como el tipo del evento e, estás indicando que e es un evento de cambio específico de un elemento de entrada de tipo input. Esto proporciona sugerencias y verificaciones de tipo más precisas para las propiedades y métodos relacionados con los elementos de entrada. Recuerda importar ChangeEvent desde 'react' para obtener el tipo correcto. Esto ayudará a tener un código más robusto y prevenir errores relacionados con el manejo de eventos de cambio.
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask({ ...newtask, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!query.id) {
      createTask(newtask.title, newtask.description)
      alert("Add new task")
    } else {
      updateTask(query.id, newtask)
      alert("Task updated")
    }
    push("/")
  }

  useEffect(() => {
    if (query.id) { //si existe el id en la URL entonces...
      // busca en la lista de "tasks" (viene del context) si algun ID de esta coincide con el id del query.
      const taskFound = tasks.find(task => task.id === query.id);
      if (taskFound) {
        setNewTask({ ...taskFound });
      }
    }
  }, [query.id, tasks]);

  return (
    <form onSubmit={handleSubmit}>
      <h1 className='text-center m-5 text-xl'>{query.id ? "Update a Task" : "Create a Task"}</h1>

      <h2 className='mb-3'>Tittle: </h2>
      <input type="text" value={newtask.title} name='title' placeholder='Write a tittle...' className='text-gray-300 bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5' onChange={handleChange} />

      <h2 className='mb-3'>Description: </h2>
      <textarea rows={2} value={newtask.description} name='description' placeholder='Write a description...' className='w-full h-40  text-gray-300 bg-gray-800 focus:text-gray-100 focus:outline-none resize-none py-3 px-4' onChange={handleChange}></textarea>

      <div className='flex justify-center m-5'>
        <button className='transition hover:scale-110 hover:bg-green-500 bg-green-700 px-3 py-2 mr-2 rounded-xl inline-flex items-center disabled:opacity-50' >
          <AiOutlinePlus className='mr-2' />
          {query.id ? "Save changes" : "Add task"}
        </button>
        <Link href={"/"}>
          <button className='transition hover:scale-110 hover:bg-red-500 bg-red-700 px-3 py-2 ml-2 rounded-xl inline-flex items-center' >
            <MdCancel className='mr-2' />
            {query.id ? "Cancel changes" : "Cancel"}
          </button>
        </Link>
      </div>
    </form>

  )
}

export default TaskFormPage