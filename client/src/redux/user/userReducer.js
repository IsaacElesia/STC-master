import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
} from './userTypes';

const initialState = {
	token: null,
	isAuthenticated: null,
	loading: true,
	handler: null,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				token: localStorage.getItem('token'),
				isAuthenticated: true,
				loading: false,
				handler: payload,
			};
		case REGISTER_SUCCESS:
		case REGISTER_FAIL:
			return {
				...state,
				loading: false,
			};
		case AUTH_ERROR:
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
