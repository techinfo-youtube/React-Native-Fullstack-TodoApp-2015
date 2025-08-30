import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

//CREATE TODO
export const createTodo = createAsyncThunk(
  "todo/createTodo",
  async ({ title, description, createdBy }, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/todo/create", {
        title,
        description,
        createdBy,
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      console.log(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//GET TODOS
export const getTodos = createAsyncThunk(
  "todo/getTodos",
  async (userId, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/todo/getAll/${userId}`);
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      console.log(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// DELEET TODO
export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`/todo/delete/${id}`);
      return id;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      console.log(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//UPDATE
export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async ({ id, updatedTodo }, thunkAPI) => {
    try {
      const res = await axiosInstance.patch(`/todo/update/${id}`, updatedTodo);
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      console.log(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    loading: false,
    error: null,
    todo: [],
    success: false,
  },
  reducers: {
    resetTodoState: (state) => {
      (state.success = false), (state.error = false);
    },
  },
  extraReducers: (builder) => {
    //CREATE TODO
    builder
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
      })
      // GET TODOS
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todo = action.payload.todos;
        state.success = true;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // DELETE TODO
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todo = state.todo.filter((item) => item._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // UDPATE TODO
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.todo = state.todo.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetTodoState } = todoSlice.actions;
export default todoSlice.reducer;
