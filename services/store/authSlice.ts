import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userProfile } from "../types";

interface UserProfile {
  email: string;
  first_name: string;
  surname: string;
  role: string; 
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    // initialState: {accessToken: null, isAuthenticated: false},
    reducers: {
        setCredentials: (state, action: PayloadAction<userProfile>) => {
            state.user = action.payload;
            console.log(state.user, "state")
         state.isAuthenticated = true;
      
            // const { accessToken } = action.payload;
            // console.log(accessToken, "from auth slice")
            // state.accessToken = accessToken;
            // state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
      state.isAuthenticated = false;
            // state.accessToken = null;
            // state.isAuthenticated = false;
        }
    }
})
export const { setCredentials, logout } = authSlice.actions;
export const selectRole = (state: any) => state.auth?.user?.role;

export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth?.isAuthenticated;

export default authSlice.reducer;