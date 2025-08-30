// src/features/counter/counterSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../api/axiosInstance';


// Async thunk using axios to POST to /register
export const register = createAsyncThunk(
    'auth/register',
    async ({ username, email, password }, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/user/register', { username, email, password });
            return response.data; // assuming API returns user data
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || 'Registration failed';
            console.log(error);
            return thunkAPI.rejectWithValue(message);
        }
    }
);
// LOGIN
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
        try {
            const res = await axiosInstance.post('/user/login', { email, password });
            // const { token, user } = res?.data;
            // await AsyncStorage.setItem('token', token);
            // await AsyncStorage.setItem('userId', user?.id);
            // return { token, user };  
            await AsyncStorage.setItem('appData', JSON.stringify(res.data));
            return res.data;
        } catch (error) {
            console.log(error);
            const message =
                error.response?.data?.message || error.message || 'Login failed';
            console.log(error);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const loadToken = createAsyncThunk(
    'auth/loadToken',
    async (_, thunkAPI) => {
        const localData = await AsyncStorage.getItem('appData');
        const appData = JSON.parse(localData);
        // console.log('slice ==> ', appData.token);
        return appData?.token;
    }
);
export const getUserData = createAsyncThunk(
    'auth/getUserData',
    async (_, thunkAPI) => {
        const localData = await AsyncStorage.getItem('appData');
        const appData = JSON.parse(localData);
        return appData?.user;
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        loading: false,
        error: null,
        success: false,
        token: null
    },
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder
            //REGISTER
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
                state.message = action.payload;
            })
            // Login ============================================================
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
                state.message = action.payload;
            })
            // TOKEN ================================== 
            .addCase(loadToken.fulfilled, (state, action) => {
                state.token = action.payload;
            })
            // GET USER ================================== 
            .addCase(getUserData.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;