import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: [] | null;
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
    setUser(state, action) {
      state.user = action.payload.user;
    },
    setAccessToken: (state, action) => {
      state.token = action.payload.access_token;
    },
    logout(state) {
      state = initialState; 
    }
  }
});

export const { setUser, logout, setAccessToken} = authSlice.actions;
export default authSlice.reducer;