import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (store, action) => {
      store.data = action.payload;
    },
  },
});

export const { login } = authSlice.actions;

export const isAuthCheck = (state) => Boolean(state.auth.data);
export default authSlice.reducer;
