// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  // Automate the setUser action whenever the user logs in
    // extraReducers: (builder) => {
    //   builder.addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
    //     state.user = payload; // Automatic update on login success
    //     localStorage.setItem("user", JSON.stringify(payload));
    //   });
    // },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
