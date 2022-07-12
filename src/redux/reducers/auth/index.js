import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || "",
    isLoggedIn:
      localStorage.getItem("token") == null ||
      localStorage.getItem("token") == ""
        ? false
        : true,
    isSignUpFormShown: false,
    showLoginForm: false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
    },
    setLogout: (state, action) => {
      state.token = "";
      state.isLoggedIn = false;
      localStorage.clear();
    },
    setIsSignUpFormShown: (state, action) => {
      state.isSignUpFormShown = !state.isSignUpFormShown;
    },

    setShowLoginForm: (state, action) => {
      state.showLoginForm = action.payload;
    },
  },
});

export const {
  setLogin: setlogin,
  setLogout: setlogout,
  setIsSignUpFormShown,
  setShowLoginForm,
} = authSlice.actions;

export default authSlice.reducer;
