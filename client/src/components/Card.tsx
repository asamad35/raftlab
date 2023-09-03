import { useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BiRepost } from 'react-icons/bi'
import { FaRegComment } from 'react-icons/fa'
import { SinglePostState } from '../redux/slices/postSlice'
import { useAppDispatch, useAppSelector } from '../hooks'
import { postCreatePost, postUpdatePost } from '../redux/thunk/postThunk'


enum Actions {
    Like = "like",
    Comment = "comment",
    Repost = "repost",
    Default = ""
}

export interface PostAction {
    actionType: Actions,
    comment?: string,
    userId: string,
    postId: string
}

const Card = ({ post }: { post: SinglePostState }) => {
    const dispatch = useAppDispatch()
    const loggedUser = useAppSelector((state) => state.authReducer.loggedUser)
    const [showComments, setShowComments] = useState(false)
    const [inputComment, setInputComment] = useState("")

    const action: PostAction = {
        actionType: Actions.Default,
        userId: post.belongsTo._id,
        postId: post._id,
        comment: ""
    }

    // event delegation for performance optimization
    const handleButtonActions = (e: React.MouseEvent<HTMLElement>) => {
        const element = e.target as HTMLElement


        if (element.classList.contains('like')) {
            action.actionType = Actions.Like
            dispatch(postUpdatePost(action))
        }
        else if (element.classList.contains('comment')) {
            setShowComments(!showComments)
        }

        else if (element.classList.contains('repost')) {
            action.actionType = Actions.Repost
            const formData = new FormData();
            formData.append("postPhotoUrl", post.photoUrl);
            formData.append("description", post.description);

            dispatch(postCreatePost({ formData, resetInputState: '', resetPreviewState: '' }))
            dispatch(postUpdatePost(action))
        }
    }

    const handleAddComment = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter") {
            action.actionType = Actions.Comment
            action.comment = inputComment
            dispatch(postUpdatePost(action))
            setInputComment('')
        }
    }
    return (
        <div key={post._id} className="flex gap-4 px-4 border-b-2 py-8 border-gray-300 w-full">
            <div className="flex flex-col w-full">
                <div className="flex gap-4 items-center mb-2">
                    <img className='h-14 w-14 object-cover bg-gray-300 rounded-full' src={post.belongsTo.photoUrl} alt="" />
                    <h2 className="font-semibold">{post.belongsTo.name}</h2>
                    <span className="text-sm">09/03/2023</span>
                </div>
                {post.photoUrl && post.photoUrl !== "undefined" && <img className="w-full h-72 object-contain bg-gray-300" src={post.photoUrl} alt="" />}
                <p className="my-4">{post.description}
                </p>

                <div onClick={handleButtonActions} className="flex gap-4">
                    <p className="flex items-center justify-center gap-2 text-blue-500 font-semibold">
                        <span className="cursor-pointer text-xl like">{post.likes.findIndex((user) => user._id === loggedUser._id) > -1 ? <AiFillHeart className="pointer-events-none" /> : <AiOutlineHeart className="like" />}  </span>
                        <span> {post.likesCount} </span>
                    </p>
                    <p className="flex items-center justify-center gap-2 text-blue-500 font-semibold">
                        <span className="cursor-pointer text-xl comment"><FaRegComment className="pointer-events-none" /></span>
                        <span> {post.commentsCount} </span>
                    </p>
                    <p className="flex items-center justify-center gap-2 text-blue-500 font-semibold">
                        <span className="cursor-pointer text-xl repost"><BiRepost className="pointer-events-none" /></span>
                        <span> {post.repostCount} </span>
                    </p>

                </div>

                {/* COMMENTS */}
                {showComments &&
                    <div className=''>
                        <div className='flex gap-4 items-center  my-4'>
                            <img className='h-10 w-10 rounded-full bg-gray-300 p-1' src={loggedUser.photoUrl} alt="" />
                            <input onKeyDown={handleAddComment} value={inputComment} onChange={(e) => { setInputComment(e.target.value) }} className="rounded-sm outline-none w-full bg-gray-300 py-2 px-4" type="text" placeholder="Add comment" />
                        </div>

                        {
                            post.comments.map((comment) => <div key={comment.timeStamp} className='flex gap-4 items-center  my-4'>
                                <img className='h-10 w-10 rounded-full bg-gray-300 p-1' src={comment.user.photoUrl} alt="" />
                                <p className='bg-gray-300 px-2 rounded-sm'>{comment.commentText}</p>
                            </div>)

                        }

                    </div>
                }            </div>

        </div>
    )
}

export default Card