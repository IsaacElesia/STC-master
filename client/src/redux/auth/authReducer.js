import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './authTypes';

const initialState = {
	token: null,
	isAuthenticated: null,
	loading: true,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);

			return {
				...state,
				token: localStorage.getItem('token'),
				isAuthenticated: true,
				loading: false,
			};
		case LOGIN_FAIL:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
			};
		default:
			return state;
	}
}
