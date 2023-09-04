import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from 'react'
import Card from "../Card";
import { getUserPosts } from "../../redux/thunk/postThunk";

const UserProfileMid = ({ className }: { className: string }) => {
    const dispatch = useAppDispatch()
    const visitedUserPosts = useAppSelector((state) => state.postReducer.visitedUserPosts)
    const params = useParams();
    const userId = params.id as string

    useEffect(() => {
        dispatch(getUserPosts({ userId }))
    }, [userId])


    return (
        <div className={className}>
            <h1 className='text-4xl bg-gradient-to-l from-blue-500 to-cyan-500 text-transparent bg-clip-text font-extrabold text-center mb-10'>User Posts</h1>
            {visitedUserPosts?.map((post) => <Card post={post} />)}
        </div>
    )
}

export default UserProfileMid