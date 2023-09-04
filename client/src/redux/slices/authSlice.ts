import { createSlice } from '@reduxjs/toolkit'
import { getNotFollowingUsers, getSearchUsers, getVisitedUserDetails, postFollowAndUnfollow, postLogin, postSignup, postUpdateUserProfile } from '../thunk/authThunk'

// Define a type for the slice state

export interface UserState {
    _id: string,
    name: string,
    email: string,
    status: string,
    photoUrl: string,
    followers: string[],
    followings: string[],
}

export interface AuthUserState {
    loggedUser: UserState
    token: string,
    authButtonState: string
    notFollowingUsers: UserState[]
    searchUsers: UserState[]
    visitedUser: UserState

}

// Define the initial state using that type
const initialState: AuthUserState = {
    loggedUser: {
        _id: "",
        name: "",
        email: "",
        status: "",
        photoUrl: "",
        followers: [""],
        followings: [""],
    },
    token: "",
    authButtonState: 'ideal',
    notFollowingUsers: [{
        _id: "",
        name: "",
        email: "",
        status: "",
        photoUrl: "",
        followers: [""],
        followings: [""],
    }],
    searchUsers: [{
        _id: "",
        name: "",
        email: "",
        status: "",
        photoUrl: "",
        followers: [""],
        followings: [""],
    }],
    visitedUser: {
        _id: "",
        name: "",
        email: "",
        status: "",
        photoUrl: "",
        followers: [""],
        followings: [""],
    }
}
export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: () => {
            localStorage.removeItem("raftlab");
            return initialState
        },

    }, extraReducers: (builder) => {
        builder
            // signup
            .addCase(postSignup.fulfilled, (state, action) => {
                state.loggedUser = action.payload.data;
                state.token = action.payload.token;
                state.authButtonState = "idle";
            })
            .addCase(postSignup.pending, (state) => {
                state.authButtonState = "loading";
            })
            .addCase(postSignup.rejected, (state) => {
                state.authButtonState = "idle";
            })

            // login
            .addCase(postLogin.fulfilled, (state, action) => {
                state.loggedUser = action.payload.data;
                state.token = action.payload.token;
                state.authButtonState = "idle";
            })
            .addCase(postLogin.pending, (state) => {
                state.authButtonState = "loading";
            })
            .addCase(postLogin.rejected, (state) => {
                state.authButtonState = "idle";
            })

            // get not following users
            .addCase(getNotFollowingUsers.fulfilled, (state, action) => {
                state.notFollowingUsers = action.payload.data;
            })
            // .addCase(getNotFollowingUsers.pending, (state) => {
            //     state.authButtonState = "loading";
            // })
            // .addCase(getNotFollowingUsers.rejected, (state) => {
            //     state.authButtonState = "idle";
            // })

            // follow and unfollow users
            .addCase(postFollowAndUnfollow.fulfilled, (state, action) => {
                const otherUserId = action.meta.arg.otherUserId
                if (state.loggedUser.followings.includes(otherUserId)) {
                    state.loggedUser.followings = state.loggedUser.followings.filter(id => id !== otherUserId)
                } else {
                    state.loggedUser.followings.push(otherUserId)
                }
            })
            // .addCase(getNotFollowingUsers.pending, (state) => {
            //     state.authButtonState = "loading";
            // })
            // .addCase(getNotFollowingUsers.rejected, (state) => {
            //     state.authButtonState = "idle";
            // })


            // follow and unfollow users
            .addCase(getSearchUsers.fulfilled, (state, action) => {
                state.searchUsers = action.payload.data
            })
            // .addCase(getNotFollowingUsers.pending, (state) => {
            //     state.authButtonState = "loading";
            // })
            // .addCase(getNotFollowingUsers.rejected, (state) => {
            //     state.authButtonState = "idle";
            // })


            // visited user details
            .addCase(getVisitedUserDetails.fulfilled, (state, action) => {
                state.visitedUser = action.payload.data
            })
            // .addCase(getNotFollowingUsers.pending, (state) => {
            //     state.authButtonState = "loading";
            // })
            // .addCase(getNotFollowingUsers.rejected, (state) => {
            //     state.authButtonState = "idle";
            // })


            // update user profile
            .addCase(postUpdateUserProfile.fulfilled, (state, action) => {
                state.loggedUser = action.payload.data
            })
        // .addCase(getNotFollowingUsers.pending, (state) => {
        //     state.authButtonState = "loading";
        // })
        // .addCase(getNotFollowingUsers.rejected, (state) => {
        //     state.authButtonState = "idle";
        // })

    },
})

export const { logout } = authSlice.actions


export default authSlice.reducer