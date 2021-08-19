import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredients/ingredientsSlice";
import orderReducer from "./order/orderSlice";
import authReducer from "./auth/authSlice";
import { socketMiddleware } from "../middlewares/socket";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    order: orderReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware()),
  devTools: true,
});

export default store;

// Infer the `TRootState` and `AppDispatch` types from the store itself
export type TRootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
