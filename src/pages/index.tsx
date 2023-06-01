import { useContext } from 'react'
import { Context } from '../context/ContextProvider'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { AiFillCheckCircle, AiOutlinePlus } from 'react-icons/ai'

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
        {tasks.length === 0 ? (<h1 style={{ marginTop: "200px" }}>(No tasks)</h1>) : (
          <div className='w-7/12'  >
            {tasks.map((task, index) => (

              <div key={task.id} className={`bg-gray-700 hover:bg-gray-600 cursor-pointer px-20 py-5 m-2 flex justify-start items-center`} onClick={() => router.push(`edit/${task.id}`)}>
                <span className='text-5xl mr-5'>{index + 1}</span>
                <div className='w-full'>
                  <div className='flex justify-between'>
                    <h1 className='font-bold'>{task.title}</h1>


                  </div>
                  <p className='text-gray-300'>{task.description}</p>
                  {/* <span className='text-gray-500 text-sm'>id: {task.id}</span> */}
                </div>
                <div>
                  <div>
                    <div className='flex justify-center'>
                      <button className='rounded-xl bg-red-700 hover:bg-red-600 px-3 py-1 flex items-center mb-1 ' onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.id)
                      }}>
                        <BsFillTrash3Fill className='mr-2' /> Delete </button>
                    </div>
                    <div>
                      <button className='rounded-xl bg-green-700 hover:bg-green-600 px-3 py-1 flex items-center mt-1' onClick={(e) => {
                        e.stopPropagation();
                        addTaskToCompleted(task.id)
                      }}>
                        <AiFillCheckCircle className='mr-2' /> Complete </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default Home