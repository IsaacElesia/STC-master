import axios from 'axios';
import config from '../../config';
import { setAlert } from '../alert/alertActions';
import { loadUser } from '../user/userAction';

import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE } from './authTypes';

// Login Handlers
export const login = (email, password) => async (dispatch) => {
	const axiosConfig = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	email = email.toLowerCase();
	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post(
			`${config.API_ENDPOINT}/api/auth`,
			body,
			axiosConfig
		);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUser());
	} catch (err) {
		console.log('err =', err);
		const error = err;

		if (error) {
			dispatch(setAlert(error.msg, 'danger'));
		}

		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

// Logout / clear Profile
export const logout = () => (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: LOGOUT });
};
