import Link from 'next/link';
import { ReactNode } from 'react';
import { useContext } from 'react'
import { Context } from '../context/ContextProvider';

interface Props {
    children: ReactNode
}

const Layout = (props: Props) => {
    const { children } = props
    const { tasks } = useContext(Context)

    return (
        <div className='h-screen bg-gray-900 text-white'>
            <nav className='items-center bg-gray-800 flex px-28 py-5 justify-between'>
                <Link href="/">
                    <h1 className='font-black text-lg'>Task App</h1>
                </Link>
                <span className='m-2 text-gray-400'>
                    {tasks.length} Tasks
                </span>
            </nav>
            <main className='px-28 py-10 bg-gray-900'>
                {children}
            </main>
            <footer className='items-center bg-gray-800 text-gray-400 flex py-2 justify-center fixed bottom-0 w-full'>
                <p>© 2023 | Freijomil Bruno Ezequiel</p>
            </footer>
        </div>
    )
}

export default Layout