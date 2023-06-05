import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import {IToken} from "../../utils/models";
interface FilterState {
    user: string
    loading: boolean
    error: string
    success: string
}
const initialState: FilterState ={
    user: 'User',
    loading: false,
    error: '',
    success: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        startAction(state) {
            state.loading = true
            state.error = ''
            state.success = ''
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload
        },
        setSuccess(state, action: PayloadAction<string>) {
            state.success = action.payload
        },
        userSuccess(state, action: PayloadAction<any>) {
            const token: IToken = jwt_decode(action.payload.token)
            state.user = token.role
            localStorage.setItem('token', action.payload.token)
            state.error = ''
            state.loading = false
        },
        userChecking(state){
            state.loading = true
            const token = localStorage.getItem('token')
            if (token) {
                const decodedToken: IToken = jwt_decode(token)
                state.user = decodedToken.role
                console.log('User status:', decodedToken.role)
            } else {
                state.user = ''
                console.log('User status:', 401)
            }
            state.loading = false
        },
    }
})
export default userSlice.reducer