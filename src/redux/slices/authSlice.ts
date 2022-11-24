import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignInData, User } from 'src/types';

interface AuthState {
  signIn: {
    loading: boolean;
    error: string;
  };
  user: User | null;
}

const initialState: AuthState = {
  signIn: {
    loading: false,
    error: '',
  },
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInStart(state, action: PayloadAction<SignInData>) {
      state.signIn = {
        loading: true,
        error: '',
      };
      state.user = null;
    },
    signInSuccess(state, action: PayloadAction<User>) {
      state.signIn = {
        loading: false,
        error: '',
      };
      state.user = action.payload;
    },
    signInFailed(state, action: PayloadAction<string>) {
      state.signIn = {
        loading: false,
        error: action.payload,
      };
      state.user = null;
    },
    signOut(state) {
      state.user = null;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
