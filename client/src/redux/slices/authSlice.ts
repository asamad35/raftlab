import { createSlice } from '@reduxjs/toolkit'
import { postLogin, postSignup } from '../thunk/authThunk'

// Define a type for the slice state
interface UserState {
    loggedUser: {
        _id: string,
        name: string,
        email: string,
        status: string,
        photoUrl: string,
        followers: [string],
        followings: [string],
    }
    token: string,
    authButtonState: string
}

// Define the initial state using that type
const initialState: UserState = {
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
    authButtonState: 'ideal'
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

    },
})

export const { logout } = authSlice.actions


export default authSlice.reducer