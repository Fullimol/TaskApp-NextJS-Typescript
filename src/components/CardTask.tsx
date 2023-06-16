import React, { MouseEventHandler } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { MdSettingsBackupRestore } from 'react-icons/md'

type Props = {
    id: number | string
    title: string
    description: string
    index: number
    onClickTask?: MouseEventHandler<HTMLDivElement>
    onClickDelete_button?: MouseEventHandler<HTMLButtonElement>
    onClickAdd_button?: MouseEventHandler<HTMLButtonElement>
    show_buttons: boolean
    quit_pointer?: boolean
    onClickRestore_button?: MouseEventHandler<HTMLButtonElement>
    date?: any
}

const CardTask = (props: Props) => {
    const { id, title, description, index, onClickTask, onClickDelete_button, onClickAdd_button, show_buttons, quit_pointer, onClickRestore_button, date } = props

    return (
        <div key={id} className={`rounded-xl bg-gray-700 hover:bg-gray-600 m-5 transition hover:scale-105 ${quit_pointer ? '' : 'cursor-pointer'}`} onClick={onClickTask}>
            <div className='text-center'>
                <p className='text-xs text-gray-300 pb-1'>Create: {date}</p>
            </div>
            <div className={`px-1 xl:px-20 pb-5  block xl:flex justify-start items-center `}>
                <div className='flex justify-center pb-2 md:pb-0'>
                    <span className=' text-xl xl:block xl:text-5xl mr-0 xl:mr-5 bg-gray-500 rounded-xl items-center pb-1 px-2'>{index}</span>
                </div>
                <div className='w-full'>
                    <div className='flex justify-center xl:justify-between'>
                        <h1 className='font-bold'>{title}</h1>
                    </div>
                    <p className='text-gray-300 text-center xl:text-left'>{description}</p>
                    {/* <span className='text-gray-500 text-sm'>id: {id}</span> */}
                </div>
                {show_buttons ? (<div>
                    <div className='flex justify-center pt-3 xl:block'>
                        <div className='flex justify-center px-2 xl:px-0'>
                            <button className='transition hover:scale-110 rounded-xl bg-red-700 hover:bg-red-600 px-3 py-1 flex items-center mb-1 ' onClick={onClickDelete_button}>
                                <BsFillTrash3Fill className='mr-2' /> Delete </button>
                        </div>
                        <div>
                            <button className='transition hover:scale-110 rounded-xl bg-green-700 hover:bg-green-600 px-3 py-1 flex items-center  xl:mt-1' onClick={onClickAdd_button}>
                                <AiFillCheckCircle className='mr-2' /> Complete </button>
                        </div>
                    </div>
                </div>) : (
                    <div className='flex justify-center'>
                        <button className='transition hover:scale-110 rounded-xl bg-yellow-600 hover:bg-yellow-500 px-3 py-1 mt-2 flex items-center  xl:mt-1' onClick={onClickRestore_button}>
                            <MdSettingsBackupRestore className='mr-2' />Restore </button>
                    </div>
                )}
            </div>

        </div>
    )
}

export default CardTask