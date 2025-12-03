import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setToken: (state, action) => { state.token = action.payload; },
    logout: (state) => { state.token = null; localStorage.removeItem("token")}
  }
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
