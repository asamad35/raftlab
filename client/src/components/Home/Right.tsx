import React from 'react'

import { AiOutlineSearch } from "react-icons/ai"
import UserCard from '../UserCard'

const Right = ({ className }: { className: string }) => {
    return (
        <div className={className}>
            <div className="flex items-center gap-2 justify-start p-2 rounded-lg bg-gray-200 mb-6">
                <AiOutlineSearch className="text-gray-400 text-xl" />
                <input onChange={(e) => { }} className="outline-none w-full bg-inherit" type="email" placeholder="Search Users" />
            </div>
            {Array.from(Array(5)).map(() => <UserCard />)}
            <h1 className='font-bold text-xl mt-6 text-gray-700'>People you may know</h1>
            {Array.from(Array(5)).map(() => <UserCard />)}

        </div>
    )
}

export default Right