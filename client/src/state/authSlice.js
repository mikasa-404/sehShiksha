import { createSlice } from "@reduxjs/toolkit";

export const authSlice= createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        mode:"light",
    },
    reducers:{
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
          },
          setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
          },
          setLogout: (state) => {
            state.user = null;
            state.token = null;
          },
    }
});

export const {setLogin, setLogout, setMode}= authSlice.actions;
export default authSlice.reducer;