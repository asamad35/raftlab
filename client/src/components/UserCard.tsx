import { UserState } from '../redux/slices/authSlice'
import { useAppDispatch, useAppSelector } from '../hooks'
import { postFollowAndUnfollow } from '../redux/thunk/authThunk'

const UserCard = ({ user }: { user: UserState }) => {
    const dispatch = useAppDispatch()
    const loggedUser = useAppSelector((state) => state.authReducer.loggedUser)
    const followAndUnfollow = () => {
        dispatch(postFollowAndUnfollow({ otherUserId: user._id }))
    }
    const handleIsFollowing = () => {
        console.log(loggedUser.followings.includes(user._id), 'aaa', loggedUser.followings, user)
        return loggedUser.followings.includes(user._id)

    }
    return (
        user.email && <div className='flex items-center my-2 gap-4'>
            <img className='h-12 w-12 object-cover rounded-full' src={user.photoUrl} alt="" />

            <p>
                <h3>{user.name}</h3>
                <h3 className='text-xs max-w-[100px] break-words'>{user.email}</h3>
            </p>
            <button onClick={followAndUnfollow} className='px-4 rounded-full bg-gray-700 text-white text-sm py-2'>{handleIsFollowing() ? "Following" : "Follow"}</button>
        </div>

    )
}

export default UserCard