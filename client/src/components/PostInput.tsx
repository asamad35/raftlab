import { useState, useEffect } from 'react'
import { BiPhotoAlbum } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '../hooks'
import { postCreatePost } from '../redux/thunk/postThunk'


export interface PostInput {
    description: string
    file: File | string
}



const PostInput = () => {
    const dispatch = useAppDispatch()
    const postLoaderState = useAppSelector((state) => state.postReducer.postLoaderState)

    const [postInput, setPostInput] = useState<PostInput>({ description: "", file: '' })
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
        console.log(postInput)


    }, [postInput])


    return (
        <div className="flex flex-col w-full pb-6 border-b-2 border-gray-300 px-4 ">
            <div className="flex gap-4">
                <img className='h-14 w-14 object-cover rounded-full' src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <div className='flex flex-col w-full mb-4'>
                    <textarea onChange={e => setPostInput({ ...postInput, description: e.target.value })} value={postInput.description} className=" outline-none" placeholder="What's happening?" name="" id="" cols={15} rows={2}></textarea>
                    {previewImage && <img className='mt-4 h-36 object-contain' src={previewImage} alt="" />}
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span onClick={handleFile} className="cursor-pointer text-blue-500 text-2xl pl-16"> <BiPhotoAlbum /> </span>
                <button onClick={() => {
                    if (postInput.description || postInput.file) {
                        const formData = new FormData();
                        formData.append("postPhoto", postInput.file);
                        formData.append("description", postInput.description);

                        dispatch(postCreatePost({ formData, resetInputState: setPostInput, resetPreviewState: setPreviewImage }))
                    }
                }} className={`bg-gradient-to-l from-blue-500 to-cyan-500 mx-4 w-36 text-white text-xl px-8 py-2 rounded-full ${postLoaderState ? "opacity-60" : ""} `} > {postLoaderState ? "Posting" : "Post"} </button>
            </div>
        </div>

    )
}

export default PostInput