// Create an async thunk for fetching user data
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UsersState, RootState } from "../types";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { 
  rejectWithValue, dispatch
}) => {
  try {
    // Using JSONPlaceholder for fake data
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Server Error!');
    }
    const data = await response.json();
    return data as User[];
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const initialState: UsersState = {
  users: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const onPending = (state: UsersState) => {
  state.status = 'loading';
};

const onFulfiled = (state: UsersState, action: PayloadAction<User[]>) => {
  state.status = 'succeeded';
  state.users = action.payload;
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, onPending)
    builder.addCase(fetchUsers.fulfilled, onFulfiled)
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });
  }
});

export const selectAllUser = (state: RootState): User[] => state.users.users;
export const selectUsersStatus = (state: RootState): UsersState['status'] => state.users.status;
export const selectUsersError = (state: RootState): string | null => state.users.error;

export default userSlice.reducer;
