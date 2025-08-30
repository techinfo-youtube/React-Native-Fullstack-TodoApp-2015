import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
//REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/user/register", {
        username,
        email,
        password,
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

//LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/user/login", { email, password });
      await AsyncStorage.setItem("appData", JSON.stringify(res?.data));
      return res?.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      console.log(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//LOAD TOKEN
export const loadToken = createAsyncThunk(
  "auth/loadToken",
  async (_, thunkAPI) => {
    const localData = await AsyncStorage.getItem("appData");
    const appData = JSON.parse(localData);
    return appData?.token;
  }
);

//GET USER
export const getUserData = createAsyncThunk(
  "auth/getUsrData",
  async (_, thunkAPI) => {
    const localData = await AsyncStorage.getItem("appData");
    const appData = JSON.parse(localData);
    return appData?.user;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    user: {},
    token: null,
    success: false,
  },
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    //REGISTER
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      //LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.success = true;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // load token
      .addCase(loadToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      //GET USER DATA
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});
export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
