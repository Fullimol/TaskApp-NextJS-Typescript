import React, { useContext } from 'react'
import { Context } from '../context/ContextProvider'
import { MdCancel } from 'react-icons/md'

type Props = {}

const completed = (props: Props) => {
    const { completedTasks, clearCompletedTasks } = useContext(Context)

    return (
        <div>
            <h1 className='text-center text-3xl'>Tasks completed</h1>
            {completedTasks.length === 0 ? (<h1 className='text-center' style={{ marginTop: "200px" }}>(No tasks completed)</h1>) : (
                <div>
                    <div className='flex justify-center  p-3'>
                        <button className='transition hover:scale-110 hover:bg-red-500 bg-red-700 px-3 py-2 rounded-xl inline-flex items-center m-5'
                            onClick={(e) => {
                                e.stopPropagation();
                                clearCompletedTasks()
                            }}>
                            <MdCancel className='mr-2' />
                            Clear history
                        </button>
                    </div>

                    <div className='flex justify-center align-center'>
                        <div className='w-7/12'  >
                            {/* En este ejemplo, se utiliza slice() antes de reverse() para crear una copia del array completedTasks. Esto es necesario porque el método reverse() modifica el array original en su lugar. Al crear una copia, aseguramos que no se modifique el array original. */}
                            {completedTasks?.slice().reverse().map((taskChek, index) => (
                                <div key={index} className={`bg-gray-700 hover:bg-gray-600 px-20 py-5 m-2  items-center`}>
                                    <div className='flex'>
                                        <span className='text-5xl mr-5'>{completedTasks.length - index}</span>  {/* se calcula restando el índice invertido de la longitud total del array de completedTasks. Esto asignará números descendentes en orden inverso. */}
                                        <div className='w-full'>
                                            <div className='flex justify-between'>
                                                <h1 className='font-bold'>{taskChek.title}</h1>
                                                {/* <button className='rounded-xl bg-red-700 hover:bg-red-600 px-3 py-1 flex items-center' onClick={(e) => {
                                         e.stopPropagation();
                                         deleteTaskCompleted(taskChek.id)
                                     }}>
                                         Delete
                                     </button> */}
                                            </div>
                                            <p className='text-gray-300'>{taskChek.description}</p>
                                        </div>
                                    </div>
                                    {/* <span className='text-gray-500 text-sm'>id: {taskChek.id}</span> */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}



        </div>


    )
}

export default completed





// hacer un ternario para ver el boton borrar o ver los tasks