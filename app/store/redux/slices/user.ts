// store/slices/usersSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, toggleUserStatus, getAllUsers } from "../../../api";

// Define the initial state
interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  statusUpdating: number | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  statusUpdating: null,
};

// Async thunk to fetch all users
export const fetchUsers = createAsyncThunk<User[], void>(
  "users/fetchUsers",
  getAllUsers
);

// Async thunk to toggle user status
export const toggleStatus = createAsyncThunk<User, number>(
  "users/toggleStatus",
  toggleUserStatus
);

// Create the slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
    // Toggle user status
    builder
      .addCase(toggleStatus.pending, (state, action) => {
        state.statusUpdating = action.meta.arg; // Set the user ID whose status is being updated
      })
      .addCase(toggleStatus.fulfilled, (state, action: PayloadAction<User>) => {
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        state.statusUpdating = null;
      })
      .addCase(toggleStatus.rejected, (state, action) => {
        state.error = action.error.message || "Failed to toggle user status";
        state.statusUpdating = null;
      });
  },
});

export const usersReducer = usersSlice.reducer;

/* 
export function fetchTodos() {
  return async function fetchTodosThunk(dispatch, getState) {
    const response = await client.get('/fakeApi/todos')
    dispatch(todosLoaded(response.todos))
  }
}
 */
