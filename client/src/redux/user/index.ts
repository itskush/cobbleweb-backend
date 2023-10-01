import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../types";

const initialState = {
  user: {
    access_token: ""
  },
  loginUser: {
    password: "",
    firstName: "",
    lastName: "",
    photos: "",
    email: "",
  },
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoginUser: (state, action) => {
      state.loginUser = action.payload;
    },
  },
});

export const { setUser, setLoginUser } = userSlice.actions;

export default userSlice.reducer;
