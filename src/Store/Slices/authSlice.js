import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("customer"))?.userinfo || null,
  islogin: JSON.parse(localStorage.getItem("customer"))?.authenticate || false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setauth: (state, action) => {
      const { userinfo, authenticate } = action.payload;
      state.user = userinfo;
      if (authenticate) {
        state.islogin = true;
      } else {
        state.islogin = false;
      }
    },
    setlogout: (state, action) => {
      state.user = null;
      state.islogin = false;
    },
  },
});
export const { setauth, setlogout } = authSlice.actions;
export default authSlice.reducer;
