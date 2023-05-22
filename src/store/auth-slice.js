import { createSlice } from '@reduxjs/toolkit';
// createSlice is a higher-order function that accepts the slice name (e.g. token, user, todos),
//  a set of reducers, and returns a single reducer along with the action creators for that reducer.
//  The goal of createSlice is to reduce the boilerplate required to add data to redux the canonical way.

const authSlice = createSlice({
	name: 'auth',
	initialState: { isLoggedIn: false },
	reducers: {
		login(state) {
			state.isLoggedIn = true;
		},
		logout(state) {
			state.isLoggedIn = false;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice;
