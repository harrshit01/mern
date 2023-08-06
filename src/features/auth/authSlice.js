import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, checkUser, signOut } from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error: null
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

export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const data = await checkUser(loginInfo);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
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

export const counterSlice = createSlice({
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
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
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


  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export const { increment } = counterSlice.actions;


export default counterSlice.reducer;