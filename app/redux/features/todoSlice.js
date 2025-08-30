import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';


// Async thunk using axios to POST to /register
export const createTodo = createAsyncThunk(
    'todo/createTodo',
    async ({ title, description, createdBy }, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/todo/create', { title, description, createdBy });
            return response?.data; // assuming API returns user data
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || 'create todo failed';
            console.log(error);
            return thunkAPI.rejectWithValue(message);
        }
    }
);
//get todo
export const getTodos = createAsyncThunk(
    'todo/getTodos',
    async (userId, thunkAPI) => {
        try {
            // console.log('userid ==>', userId);
            const response = await axiosInstance.post(`/todo/getAll/${userId}`); // Adjust endpoint if needed
            return response.data;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || 'Failed to fetch todos';
            console.log(error);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteTodo = createAsyncThunk(
    'todo/deleteTodo',
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(`/todo/delete/${id}`);
            return id; // We just need the deleted todo's ID
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || 'Delete failed';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateTodo = createAsyncThunk(
    'todo/updateTodo',
    async ({ id, updatedTodo }, thunkAPI) => {
        try {
            const response = await axiosInstance.patch(`/todo/update/${id}`, updatedTodo);
            return response?.data; // Updated todo object
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || 'Update failed';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todo: [],
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetTodoState: (state) => {
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            //CREATE TODO
            .addCase(createTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.todo = action.payload;
                state.success = true;
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.message = action.payload;
            })
            // GET TODOS
            .addCase(getTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todo = action.payload.todos; // replace the entire list
            })
            .addCase(getTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //delete todo
            .addCase(deleteTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.todo = state.todo.filter((item) => item._id !== action.payload);
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //Update
            .addCase(updateTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                // Find and replace the updated todo in the state
                state.todo = state.todo.map((item) =>
                    item._id === action.payload._id ? action.payload : item
                );
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});
export const { resetTodoState } = todoSlice.actions;
export default todoSlice.reducer;