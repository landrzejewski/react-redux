// Create an async thunk for fetching user data
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, {
    rejectWithValue }) => {
        try {
            // Using JSONPlaceholder for fake data
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error('Server Error!');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    users: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: ''
};

const onPending = (users) => {
    users.status = 'loading';
};

const onFulfiled = (users, action) => {
    users.status = 'succeeded';
    users.users = action.payload;
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, onPending)
        builder.addCase(fetchUsers.fulfilled, onFulfiled)
        builder.addCase(fetchUsers.rejected, (users, action) => {
            users.status = 'failed';
            users.error = action.payload;
        });
    }
});

export const selectAllUser = (state) => state.users.users;
export const selectUsersStatus = (state) => state.users.status;
export const selectUsersError = (state) => state.users.error;

export default userSlice.reducer;