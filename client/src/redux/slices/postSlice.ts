import { createSlice } from '@reduxjs/toolkit'
import { getUserFeed, getUserPosts, postCreatePost, postUpdatePost } from '../thunk/postThunk'
import { UserState } from './authSlice'

// Define a type for the slice state
export interface SinglePostState {
    description: string,
    photoUrl: string,
    likesCount: number,
    commentsCount: number,
    repostCount: number,
    likes: UserState[],
    reposts: UserState[],
    tagUsers: [],
    comments: { user: UserState, commentText: string, timeStamp: number }[],
    belongsTo: UserState,
    _id: string,
}

interface PostSliceState {
    allPosts: SinglePostState[]
    postLoaderState: boolean
    visitedUserPosts: SinglePostState[]

}

// Define the initial state using that type
const initialState: PostSliceState = {
    allPosts: [{
        description: '',
        photoUrl: '',
        likesCount: 0,
        commentsCount: 0,
        repostCount: 0,
        likes: [],
        reposts: [],
        tagUsers: [],
        comments: [],
        belongsTo: {
            _id: "",
            name: "",
            email: "",
            status: "",
            photoUrl: "",
            followers: [""],
            followings: [""],
        },
        _id: '',
    }],
    postLoaderState: false,
    visitedUserPosts: [{
        description: '',
        photoUrl: '',
        likesCount: 0,
        commentsCount: 0,
        repostCount: 0,
        likes: [],
        reposts: [],
        tagUsers: [],
        comments: [],
        belongsTo: {
            _id: "",
            name: "",
            email: "",
            status: "",
            photoUrl: "",
            followers: [""],
            followings: [""],
        },
        _id: '',
    }],
}

function replacePostById(array: SinglePostState[], id: string, newElement: SinglePostState): SinglePostState[] {
    const updatedArr: SinglePostState[] = array.map((element: SinglePostState) => {
        if (element._id === id) {
            return newElement;
        }
        return element;
    });
    return updatedArr
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        logout: () => {
            localStorage.removeItem("raftlab");
            return initialState
        },

    }, extraReducers: (builder) => {
        builder
            // create post
            .addCase(postCreatePost.fulfilled, (state, action) => {
                state.allPosts.unshift(action.payload.data);
                state.postLoaderState = false;
                console.log({ action })
                action.meta.arg?.resetInputState && typeof action.meta.arg?.resetInputState !== 'string' && action.meta.arg?.resetInputState({ file: '', tagUserIds: [] })
                action.meta.arg?.resetPreviewState && typeof action.meta.arg?.resetPreviewState !== 'string' && action.meta.arg?.resetPreviewState("")
                action.meta.arg?.resetPostInputState && typeof action.meta.arg?.resetPostInputState !== 'string' && action.meta.arg?.resetPostInputState("")
            })
            .addCase(postCreatePost.pending, (state) => {
                state.postLoaderState = true;
            })
            .addCase(postCreatePost.rejected, (state) => {
                state.postLoaderState = false;
            })

            // user feed
            .addCase(getUserFeed.fulfilled, (state, action) => {
                state.allPosts = action.payload.data
            })
            // .addCase(getUserFeed.pending, (state) => {
            // })
            // .addCase(getUserFeed.rejected, (state) => {
            //     state.postLoaderState = false;
            // })

            // update post
            .addCase(postUpdatePost.fulfilled, (state, action) => {
                const updatedPost = action.payload.data
                state.allPosts = replacePostById(state.allPosts, updatedPost._id, updatedPost)



            })
            // .addCase(postUpdatePost.pending, (state) => {
            // })
            // .addCase(postUpdatePost.rejected, (state) => {
            //     state.postLoaderState = false;
            // })



            // visited user posts
            .addCase(getUserPosts.fulfilled, (state, action) => {
                state.visitedUserPosts = action.payload.data
            })
        // .addCase(postUpdatePost.pending, (state) => {
        // })
        // .addCase(postUpdatePost.rejected, (state) => {
        //     state.postLoaderState = false;
        // })



    },
})

export const { logout } = postSlice.actions


export default postSlice.reducer