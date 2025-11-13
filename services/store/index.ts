
import { configureStore } from "@reduxjs/toolkit";
import { authServiceApi } from "../authService";
import { setupListeners } from '@reduxjs/toolkit/query';
import { pollServiceApi } from "../pollsService";

export const store = configureStore({
    reducer: {
        [authServiceApi.reducerPath] : authServiceApi.reducer,
        [pollServiceApi.reducerPath] : pollServiceApi.reducer,
    },

    middleware: (GetDefaultMiddleware) => 
        GetDefaultMiddleware().concat(authServiceApi.middleware)
        .concat(pollServiceApi.middleware)
})

setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch