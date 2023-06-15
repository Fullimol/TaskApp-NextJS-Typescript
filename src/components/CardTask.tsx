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
}

const CardTask = (props: Props) => {
    const { id, title, description, index, onClickTask, onClickDelete_button, onClickAdd_button, show_buttons, quit_pointer, onClickRestore_button } = props
    return (
        <div key={id} className={`bg-gray-700 hover:bg-gray-600 px-1 xl:px-20 py-5 m-2 block xl:flex justify-start items-center ${quit_pointer ? '' : 'cursor-pointer'}`} onClick={onClickTask}>
            <span className='flex justify-center text-3xl xl:block xl:text-5xl mr-0 xl:mr-5 '>{index}</span>
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
    )
}

export default CardTask