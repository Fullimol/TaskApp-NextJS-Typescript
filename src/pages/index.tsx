import { useContext } from 'react'
import { Context } from '../context/ContextProvider'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { useRouter } from 'next/router'

const Home = () => {
  const { tasks, deleteTask } = useContext(Context)
  const router = useRouter()

  return (
    <div className='flex justify-center align-center'>
      {tasks.length === 0 ? (<h1>No tasks</h1>) : (
        <div className='w-7/12'  >
          {tasks.map((task, index) => (
            <div key={task.id} className='bg-gray-700 hover:bg-gray-600 cursor-pointer px-20 py-5 m-2 flex justify-star items-center' onClick={() => router.push(`edit/${task.id}`)}>
              <span className='text-5xl mr-5'>{index}</span>
              <div className='w-full'>
                <div className='flex justify-between'>
                  <h1 className='font-bold'>{task.title}</h1>

                  <button className='rounded-xl bg-red-700 hover:bg-red-600 px-3 py-1 flex items-center' onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task.id)
                  }}>
                    <BsFillTrash3Fill className='mr-2' /> Delete </button>
                </div>
                <p className='text-gray-300'>{task.description}</p>
                <span className='text-gray-500 text-sm'>id: {task.id}</span>
              </div>
            </div>
          ))
          }
        </div>
      )}
    </div>
  )
}

export default Home