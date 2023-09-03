import { useEffect } from 'react'
import { BiPhotoAlbum, } from "react-icons/bi"
import Card from "../Card"
import { AiOutlineBell } from "react-icons/ai"
import PostInput from "../PostInput"
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getUserFeed } from '../../redux/thunk/postThunk'

const Mid = ({ className }: { className: string }) => {
    const dispatch = useAppDispatch()
    const allPosts = useAppSelector(state => state.postReducer.allPosts)
    useEffect(() => {
        dispatch(getUserFeed())
    }, [])

    return (
        <div className={className}>
            <div className="flex w-full mb-4 justify-between px-4">
                <h1 className="text-gray-700 font-bold text-xl">Home</h1>
                <span className="text-inherit text-2xl cursor-pointer"> <AiOutlineBell /></span>
            </div>

            {/* input start*/}
            <PostInput />
            {/* input end*/}

            {/* card start */}
            {allPosts.map((post) => <Card post={post} />)}
            {/* card end */}

        </div>
    )
}

export default Mid