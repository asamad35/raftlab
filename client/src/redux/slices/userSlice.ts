import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface UserState {
    token: string
}

// Define the initial state using that type
const initialState: UserState = {
    token: "",
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // increment: (state) => {
        //     state.value += 1
        // },
        // decrement: (state) => {
        //     state.value -= 1
        // },
        // Use the PayloadAction type to declare the contents of `action.payload`
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // },
    },
})

// export const { increment, decrement, incrementByAmount } = userSlice.actions


export default userSlice.reducer