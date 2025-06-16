import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    token: null,  // Add token to initial state
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload.user;  // Expect user data here
            state.token = action.payload.token;      // Store token separately
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload.user || action.payload;
            // Update token if new one is provided
            if (action.payload.token) {
                state.token = action.payload.token;
            }
            state.loading = false;
            state.error = null;
        },
        updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOutSuccess: (state) => {
            state.currentUser = null;
            state.token = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateStart,
    updateSuccess,
    updateFailure,
    signOutSuccess
} = userSlice.actions;

export default userSlice.reducer;