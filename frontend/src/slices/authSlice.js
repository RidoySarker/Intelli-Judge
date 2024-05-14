import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        email: localStorage.getItem('userEmail'),
        token: localStorage.getItem('userToken'),
        isLoggedIn: !!localStorage.getItem('userToken'),
    },
    reducers: {
        login: (state, {payload}) => {
            console.log({payload});
            localStorage.setItem('userToken', payload.token);
            localStorage.setItem('userEmail', payload.user.email);
            state.email = localStorage.getItem('userEmail');
            state.token = localStorage.getItem('userToken');

            state.isLoggedIn = !!localStorage.getItem('userToken');
        },
        logout: (state) => {
            // state.email = null;
            // state.token = null;
            state.isLoggedIn = false;

            localStorage.removeItem('userToken');
            localStorage.removeItem('userEmail');
        },
    }
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;