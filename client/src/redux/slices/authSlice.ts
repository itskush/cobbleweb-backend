import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  expiry: number | null; 
}

const initialState: AuthState = {
  user: null,
  token: null,
  expiry: null  
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; token: string; expiry: number }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.expiry = action.payload.expiry;
    },
    setAccessToken: (state, action) => {
      console.log(action.payload);
      // state.user =  action.payload.user
      state.token = action.payload.access_token;
      // state.expiry = action.payload.expiry;
    },
    logout(state) {
      state = initialState; 
    }
  }
});

export const { setCredentials, logout, setAccessToken} = authSlice.actions;
export default authSlice.reducer;