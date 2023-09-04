import { useState, useEffect } from 'react'
import { BiPhotoAlbum } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '../hooks'
import { postCreatePost } from '../redux/thunk/postThunk'
import MentionInput from './MentionInput'

export interface PostInput {
    file: File | string
    tagUserIds: string[]
}



const PostInput = () => {
    const dispatch = useAppDispatch()
    const postLoaderState = useAppSelector((state) => state.postReducer.postLoaderState)
    const loggedUser = useAppSelector((state) => state.authReducer.loggedUser)

    const [postInput, setPostInput] = useState<PostInput>({ file: '', tagUserIds: [] })
    const [postInputText, setPostInputText] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    const handleFile = () => {
        const inputElement = document.createElement("input");
        inputElement.type = "file";
        inputElement.accept = "image/*";
        inputElement.multiple = false;

        inputElement.addEventListener("change", () => {
            const file = inputElement.files?.[0]
            if (!file) return
            setPreviewImage(URL.createObjectURL(file))
            setPostInput({ ...postInput, file: file })

        })
        inputElement.click()

    }

    useEffect(() => {
        console.log({ ...postInput, description: postInputText })


    }, [postInput, postInputText])


    return (
        <div className="flex flex-col w-full pb-6 border-b-2 border-gray-300 px-4 ">
            <div className="flex gap-4">
                <img className='h-14 w-14 object-cover rounded-full' src={loggedUser.photoUrl} alt="" />
                <div className='flex flex-col w-full mb-4'>
                    <MentionInput postInputText={postInputText} setPostInputText={setPostInputText} postInput={postInput} setPostInput={setPostInput} />
                    {/* <textarea onChange={e => setPostInput({ ...postInput, description: e.target.value })} value={postInput.description} className=" outline-none" placeholder="What's happening?" name="" id="" cols={15} rows={2}></textarea> */}
                    {previewImage && <img className='mt-4 h-36 object-contain' src={previewImage} alt="" />}
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span onClick={handleFile} className="cursor-pointer text-blue-500 text-2xl pl-16"> <BiPhotoAlbum /> </span>
                <button onClick={() => {
                    if (postInputText || postInput.file) {
                        const formData = new FormData();
                        formData.append("postPhoto", postInput.file);
                        formData.append("description", postInputText);
                        formData.append("tagUserIds", JSON.stringify(postInput.tagUserIds));

                        dispatch(postCreatePost({ formData, resetInputState: setPostInput,resetPostInputState: setPostInputText, resetPreviewState: setPreviewImage }))
                    }
                }} className={`bg-gradient-to-l from-blue-500 to-cyan-500 mx-4 w-36 text-white text-xl px-8 py-2 rounded-full ${postLoaderState ? "opacity-60" : ""} `} > {postLoaderState ? "Posting" : "Post"} </button>
            </div>
        </div>

    )
}

export default PostInput