import { useEffect, useState } from 'react'

import { AiOutlineSearch } from "react-icons/ai"
import UserCard from '../UserCard'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getNotFollowingUsers, getSearchUsers } from '../../redux/thunk/authThunk'

const Right = ({ className }: { className: string }) => {
    const dispatch = useAppDispatch()
    const notFollowingUsers = useAppSelector((state) => state.authReducer.notFollowingUsers)
    const searchUsers = useAppSelector((state) => state.authReducer.searchUsers)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        dispatch(getNotFollowingUsers())
    }, [])

    const handleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(getSearchUsers({ searchQuery: e.target.value }))
        setSearchQuery(e.target.value)
    }

    return (
        <div className={className}>
            <div className="flex items-center gap-2 justify-start p-2 rounded-lg bg-gray-200 mb-6">
                <AiOutlineSearch className="text-gray-400 text-xl" />
                <input onChange={handleSearchUser} className="outline-none w-full bg-inherit" type="email" placeholder="Search Users" />
            </div>
            {searchUsers?.map((el) => <UserCard user={el} />)}
            {(searchUsers && searchQuery !== "") && <p>No user found</p>}
            <h1 className='font-bold text-xl mt-6 text-gray-700'>People you may know</h1>
            {notFollowingUsers?.map((el) => <UserCard user={el} />)}

        </div>
    )
}

export default Right