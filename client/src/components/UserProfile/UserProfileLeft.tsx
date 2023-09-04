import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { logout as resetAuthState } from '../../redux/slices/authSlice'
import { logout as resetPostState } from '../../redux/slices/postSlice'
import { useParams } from 'react-router'
import { getVisitedUserDetails } from '../../redux/thunk/authThunk'

const UserProfileLeft = ({ className }: { className: string }) => {
    const dispatch = useAppDispatch()
    const visitedUser = useAppSelector((state) => state.authReducer.visitedUser)
    const params = useParams();
    const userId = params.id as string


    useEffect(() => {
        dispatch(getVisitedUserDetails({ userId }))
    }, [userId])


    const logout = useCallback(() => {
        dispatch(resetAuthState())
        dispatch(resetPostState())
    }, [dispatch])

    return (
        <div className={className}>
            <h1 className='text-4xl bg-gradient-to-l from-blue-500 to-cyan-500 text-transparent bg-clip-text font-extrabold text-center mb-10'>User Profile</h1>
            <img className='h-24 w-24 object-cover rounded-full mb-8 bg-gray-300' src={visitedUser.photoUrl} alt="" />
            <div className="flex gap-2 bg-gray-300 p-2 px-4 mb-6 rounded-xl">
                <span className='font-bold text-blue-500'>Name:</span>
                <span className='font-semibold text-blue-500'>{visitedUser.name}</span>
            </div>
            <div className="flex gap-2 bg-gray-300 p-2 px-4 mb-6 rounded-xl">
                <span className='font-bold text-blue-500'>Email:</span>
                <span className='font-semibold text-blue-500'>{visitedUser.email}</span>
            </div>
            <div className="flex gap-2 bg-gray-300 p-2 px-4 mb-6 rounded-xl">
                <span className='font-bold text-blue-500 text-left'>Bio:</span>
                <span className='font-bold text-blue-500 text-left'>{visitedUser?.status ?? "no bio"}</span>
            </div>
            <div className='flex'>
                <div className='flex flex-col items-center justify-center p-4 gap-2  text-blue-500 font-bold '>
                    <span className='bg-gray-300 text-xl h-14 w-14 items-center justify-center flex rounded-full p-4'>{visitedUser.followers?.length}</span>
                    <span>Followers</span>
                </div>
                <div className='flex flex-col items-center justify-center p-4 gap-2  text-blue-500 font-bold '>
                    <span className='bg-gray-300 text-xl h-14 w-14 items-center justify-center flex rounded-full p-4'>{visitedUser.followings?.length}</span>
                    <span>Followings</span>
                </div>
            </div>

            <button onClick={logout} className={`bg-gradient-to-l from-blue-500 to-cyan-500 mx-4  text-white text-xl px-8 py-2 mt-6 mb-8 rounded-full `} >Logout </button>
        </div>
    )
}

export default UserProfileLeft