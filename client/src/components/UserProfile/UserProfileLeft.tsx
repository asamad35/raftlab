import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { logout as resetAuthState } from '../../redux/slices/authSlice'
import { logout as resetPostState } from '../../redux/slices/postSlice'
import { useParams } from 'react-router'
import { getVisitedUserDetails, postUpdateUserProfile } from '../../redux/thunk/authThunk'
import { MdModeEditOutline } from 'react-icons/md'



const UserProfileLeft = ({ className }: { className: string }) => {
    const dispatch = useAppDispatch()
    const visitedUser = useAppSelector((state) => state.authReducer.visitedUser)
    const loggedUser = useAppSelector((state) => state.authReducer.loggedUser)
    const [userStatus, setUserStatus] = useState({ visibility: false, value: visitedUser.status })
    const params = useParams();
    const userId = params.id as string


    useEffect(() => {
        dispatch(getVisitedUserDetails({ userId }))
    }, [userId])


    const logout = useCallback(() => {
        dispatch(resetAuthState())
        dispatch(resetPostState())
    }, [dispatch])


    const updatePhoto = () => {
        const inputElement = document.createElement("input");
        inputElement.type = "file";
        inputElement.accept = "image/*";
        inputElement.multiple = false;

        inputElement.addEventListener("change", () => {
            const file = inputElement.files?.[0]
            if (!file) return
            const formData = new FormData();
            formData.append("userProfilePhoto", file);
            console.log(formData, file)
            dispatch(postUpdateUserProfile({ formData: formData }))
        })
        inputElement.click()
    }

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserStatus({ ...userStatus, value: e.target.value })
    }


    const handleEnter = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter') {
            const formData = new FormData();
            formData.append("status", userStatus.value);
            dispatch(postUpdateUserProfile({ formData: formData }))
            setUserStatus({ ...userStatus, visibility: false })
        }
    }


    return (
        <div className={className}>
            <h1 className='text-4xl bg-gradient-to-l from-blue-500 to-cyan-500 text-transparent bg-clip-text font-extrabold text-center mb-10'>User Profile</h1>
            <div className='relative'>
                {loggedUser._id === visitedUser._id &&
                    <p onClick={updatePhoto} className='cursor-pointer text-xl absolute bottom-0 -translate-y-full right-0 bg-blue-500 text-white p-1 rounded-full flex items-center justify-center w-8 h-8' ><MdModeEditOutline /></p>
                }
                <img className='h-24 w-24 object-cover rounded-full mb-8 bg-gray-300' src={loggedUser._id === userId ? loggedUser.photoUrl : visitedUser.photoUrl} alt="" />
            </div>
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
                {!userStatus.visibility ?
                    <span className='font-bold text-blue-500 text-left'>{loggedUser._id === userId ? loggedUser.status : visitedUser.status ?? "no bio"}</span>
                    : <input type="text" value={userStatus.value} className='p-2' onKeyDown={handleEnter} onChange={handleStatusChange} />
                }
                {
                    loggedUser._id === visitedUser._id &&
                    <p onClick={() => setUserStatus({ ...userStatus, visibility: !userStatus.visibility })} className='cursor-pointer text-xl  bg-blue-500 text-white p-1 rounded-full flex items-center justify-center w-8 h-8' ><MdModeEditOutline /></p>
                }
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