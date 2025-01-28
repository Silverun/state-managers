import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore, Tuple } from "@reduxjs/toolkit";
import { todoReducer } from "./slices/todo";
import { usersReducer } from "./slices/user";
import { asyncTimeLogger } from "./middleware";

export const reduxStore = configureStore({
  reducer: {
    todos: todoReducer,
    users: usersReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().prepend(asyncTimeLogger);
  },
});

export type AppStore = typeof reduxStore;
export type RootState = ReturnType<AppStore["getState"]>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
// Define a reusable type describing thunk functions
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
