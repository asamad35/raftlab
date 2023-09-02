import React, { useCallback, useMemo } from 'react'
import { AiFillHome } from "react-icons/ai"
import { BiSearch } from 'react-icons/bi';
import { BsBell, BsEnvelope, BsPeople, } from 'react-icons/bs';
import { RiFileListLine } from 'react-icons/ri';
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hooks';
import { logout as resetState } from '../../redux/slices/authSlice'

interface SidebarButton {
    title: string,
    icon: React.ReactNode,
    link: string
    active: boolean
}


const Left = ({ className }: { className: string }) => {
    const dispatch = useAppDispatch()
    const sidebarItems: SidebarButton[] = useMemo(() => [
        {
            title: 'Home',
            icon: <AiFillHome />,
            link: '/',
            active: true

        },
        {
            title: 'Explore',
            icon: <BiSearch />,
            link: '/',
            active: false


        },
        {
            title: 'Notification',
            icon: <BsBell />,
            link: '/',
            active: false

        },
        {
            title: 'Messages',
            icon: <BsEnvelope />,
            link: '/',
            active: false

        },
        {
            title: 'Lists',
            icon: <RiFileListLine />,
            link: '/',
            active: false

        },
        {
            title: 'Communities',
            icon: <BsPeople />,
            link: '/',
            active: false

        },


    ]

        , [])
    const logout = useCallback(() => {
        dispatch(resetState())
    }, [dispatch])
    return (
        <div className={className}>
            <h1 className='text-4xl bg-gradient-to-l from-blue-500 to-cyan-500 text-transparent bg-clip-text font-extrabold text-center mb-8'>Social Bowl</h1>
            <ul>
                {sidebarItems.map((el) => (
                    <li className={`flex gap-4 px-4 items-center justify-start ${el.active ? "text-blue-500" : "text-gray-700"} mb-8`}>
                        <span className="text-inherit text-3xl cursor-pointer"> {el.icon}</span>
                        <Link to={el.link} className='text-xl cursor-pointer font-bold '>{el.title}</Link>
                    </li>
                ))}
            </ul>


            <div className='flex px-4 items-center justify-center mt-auto gap-4'>
                <img className='h-20 w-20 object-cover' src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <div >
                    <p className='font-bold text-gray-500'> Abdus Samad</p>
                </div>
            </div>

            <button onClick={logout} className={`bg-gradient-to-l from-blue-500 to-cyan-500 mx-4  text-white text-xl px-8 py-2 mt-6 mb-8 rounded-full `} >Logout </button>


        </div>
    )
}

export default Left