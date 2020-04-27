import axios from 'axios';
import { setAlert } from './alert';

import {
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_ERROR,
	CLEAR_PROFILE,
} from './types';

// Get current handler profile
export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/handler/me');

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Get all handlers profiles
export const getProfiles = () => async (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
	try {
		const res = await axios.get('/api/handler');

		dispatch({
			type: GET_PROFILES,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Get handlers profiles By id
export const getProfileById = (handlerID) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/handler/${handlerID}`);

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//Update handler profile
export const updateHandlerProfile = (
	{
		name,
		email,
		role,
		phone,
		street,
		apt,
		city,
		zip,
		state,
		country,
		avatarLocation,
		avatarId,
	},
	history
) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const body = JSON.stringify({
			name,
			email,
			role,
			phone,
			street,
			apt,
			city,
			zip,
			state,
			country,
			avatarLocation,
			avatarId,
		});

		const res = await axios.post('/api/handler/update', body, config);

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Profile Updated', 'success'));

		history.push('/home/handler');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
