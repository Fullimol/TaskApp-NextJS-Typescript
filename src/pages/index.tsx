import { useContext } from 'react'
import { Context } from '../context/ContextProvider'
import { useRouter } from 'next/router'
import { AiOutlinePlus } from 'react-icons/ai'
import CardTask from '@/components/CardTask'

const Home = () => {
  const { tasks, deleteTask, addTaskToCompleted } = useContext(Context)
  const router = useRouter() //agrego esto para darla función al boton y que me redirija.

  return (
    <div>
      <div>
        <h1 className='text-center text-3xl mb-6'>Your tasks</h1>
        <div className='flex justify-center align-center mb-8'>
          <button className='transition hover:scale-110 hover:bg-green-500 bg-green-700 px-3 py-2 rounded-xl inline-flex items-center' onClick={() => router.push("/new")}>
            <AiOutlinePlus className='mr-2' />
            {"New Task"}
          </button>
        </div>
      </div>

      <div className='flex justify-center align-center'>
        {tasks.length === 0 ? (<h1 className='text-gray-500 mt-40' >(No tasks)</h1>) : (
          <div className='w-full xl:w-7/12'  >
            {tasks.map(({ id, title, description, createdAt }, index) => {
              const formattedDate = new Date(createdAt).toLocaleString(); //esto es para darle un formato mas "visual" a la fecha
              return (
                  <CardTask
                    key={id}
                    id={id}
                    title={title}
                    description={description}
                    index={index + 1}
                    show_buttons={true}
                    onClickTask={() => router.push(`edit/${id}`)}
                    onClickAdd_button={(e) => {
                      e.stopPropagation();
                      addTaskToCompleted(id);
                    }}
                    onClickDelete_button={(e) => {
                      e.stopPropagation();
                      deleteTask(id);
                    }}
                    date= {formattedDate}
                  />
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home