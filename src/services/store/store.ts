import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredientsSlice";
import orderReducer from "./orderSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    order: orderReducer,
    auth: authReducer,
  },
  devTools: true,
});

export default store;

// Infer the `TRootState` and `AppDispatch` types from the store itself
export type TRootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;