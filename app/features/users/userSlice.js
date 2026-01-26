import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ⚠️ IMPORTANT: Android emulator cannot use localhost
const API_URL = 'http://10.0.2.2:5000/api/users';

// --------------------
// INITIAL STATE
// --------------------
const initialState = {
  user: null,
  foundUser: null,
  allUsers: [],
  userLoading: false,
  userSuccess: false,
  userError: false,
  userMessage: '',
  Authenticated: false,
};

// --------------------
// REGISTER USER
// --------------------
export const regUser = createAsyncThunk(
  'user/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/register`,
        userData
      );

      await AsyncStorage.setItem(
        'user',
        JSON.stringify(response.data)
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Registration failed'
      );
    }
  }
);

// --------------------
// LOGIN USER
// --------------------
export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        loginData
      );

      await AsyncStorage.setItem(
        'user',
        JSON.stringify(response.data)
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Login failed'
      );
    }
  }
);

// --------------------
// LOAD USER FROM STORAGE
// --------------------
export const loadUserFromStorage = createAsyncThunk(
  'user/load',
  async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
);

// --------------------
// LOGOUT USER
// --------------------
export const logoutUser = createAsyncThunk(
  'user/logout',
  async () => {
    await AsyncStorage.removeItem('user');
  }
);

// --------------------
// FIND USER
// --------------------
export const findMyUser = createAsyncThunk(
  'user/find',
  async (user_id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/find-user/${user_id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'User not found'
      );
    }
  }
);

// --------------------
// GET ALL USERS
// --------------------
export const getAllUsers = createAsyncThunk(
  'user/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/get-all-users`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Failed to load users'
      );
    }
  }
);

// --------------------
// SLICE
// --------------------
const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userReset: (state) => {
      state.userLoading = false;
      state.userSuccess = false;
      state.userError = false;
      state.userMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(regUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(regUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccess = true;
        state.Authenticated = true;
        state.user = action.payload;
      })
      .addCase(regUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = true;
        state.userMessage = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccess = true;
        state.Authenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = true;
        state.userMessage = action.payload;
      })

      // LOAD USER
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.user = action.payload;
        state.Authenticated = !!action.payload;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.Authenticated = false;
        state.allUsers = [];
      })

      // FIND USER
      .addCase(findMyUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(findMyUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.foundUser = action.payload;
      })
      .addCase(findMyUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = true;
        state.userMessage = action.payload;
      })

      // GET ALL USERS
      .addCase(getAllUsers.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.userLoading = false;
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = true;
        state.userMessage = action.payload;
      });
  },
});

// --------------------
export const { userReset } = userSlice.actions;
export default userSlice.reducer;
