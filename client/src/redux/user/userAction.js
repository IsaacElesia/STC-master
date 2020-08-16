import axios from 'axios';
import config from '../../config';
import { setAlert } from '../alert/alertActions';
import setAuthToken from '../../utils/setAuthToken';

import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
} from './userTypes';

// Load User
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get(`${config.API_ENDPOINT}/api/auth`);

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

// Rgister Handlers
export const register = (formData = {}) => async (dispatch) => {
	const axiosConfig = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify(formData);

	try {
		const res = await axios.post(
			`${config.API_ENDPOINT}/api/handler`,
			body,
			axiosConfig
		);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
		dispatch(setAlert('Handler created', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: REGISTER_FAIL,
		});
	}
};
