import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {accessToken: null, isAuthenticated: false},
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload;
            console.log(accessToken, "from auth slice")
            state.accessToken = accessToken;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.accessToken = null;
            state.isAuthenticated = false;
        }
    }
})

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;