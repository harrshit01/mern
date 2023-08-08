import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, signOut, loginUser, checkAuth } from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error: null,
  userChecked:false
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const data = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    console.log(data);
    return data;
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const data = await loginUser(loginInfo);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const checkAuthAsync = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      const data = await checkAuth();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (loginInfo) => {
    const data = await signOut(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return data.data;
  }
);

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userChecked = true;
      })


  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;

export const { increment } = authSlice.actions;


export default authSlice.reducer;