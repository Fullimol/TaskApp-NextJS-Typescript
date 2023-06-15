import React, { useContext } from 'react'
import { Context } from '../context/ContextProvider'
import { MdCancel } from 'react-icons/md'
import CardTask from '@/components/CardTask'

type Props = {}

const completed = (props: Props) => {
    const { completedTasks, clearCompletedTasks, restoreTask } = useContext(Context)

    return (
        <div>
            <h1 className='text-center text-3xl mb-6'>Tasks completed</h1>
            {completedTasks.length === 0 ? (<h1 className='text-center' style={{ marginTop: "200px" }}>(No tasks completed)</h1>) : (
                <div>
                    <div className='flex justify-center pb-3'>
                        <button className='transition hover:scale-110 hover:bg-red-500 bg-red-700 px-2 py-2 md:mx-0 md:px-3  rounded-xl inline-flex items-center md:m-5'
                            onClick={(e) => {
                                e.stopPropagation();
                                clearCompletedTasks()
                            }}>
                            <MdCancel className='mr-2 md:mr-2' />
                            Clear history
                        </button>
                    </div>

                    <div className='flex justify-center align-center'>
                        <div className='w-full xl:w-7/12'  >
                            {/* En este ejemplo, se utiliza slice() antes de reverse() para crear una copia del array completedTasks. Esto es necesario porque el método reverse() modifica el array original en su lugar. Al crear una copia, aseguramos que no se modifique el array original. */}
                            {completedTasks?.slice().reverse().map((taskChek, index) => (
                                <CardTask
                                    id={taskChek.id}
                                    key={index}
                                    index={completedTasks.length - index} /* se calcula restando el índice invertido de la longitud total del array de completedTasks. Esto asignará números descendentes en orden inverso. */
                                    title={taskChek.title}
                                    description={taskChek.description}
                                    show_buttons={false}
                                    quit_pointer={true}
                                    onClickRestore_button={(e) => {
                                        e.stopPropagation();
                                        restoreTask(taskChek.id)
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default completed





