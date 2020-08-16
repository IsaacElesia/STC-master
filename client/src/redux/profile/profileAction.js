import axios from 'axios';
import config from '../../config';
import { setAlert } from '../alert/alertActions';

import {
	GET_PROFILE,
	GET_PROFILES,
	CURRENT_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	CLEAR_PROFILES,
	CLEAR_CURRENT_PROFILE,
} from './profileTypes';

// Get current handler profile
export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get(`${config.API_ENDPOINT}/api/handler/me`);

		dispatch({
			type: CURRENT_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({ type: CLEAR_CURRENT_PROFILE });
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response },
		});
	}
};

// Get all handlers profiles
export const getProfiles = () => async (dispatch) => {
	try {
		const res = await axios.get(`${config.API_ENDPOINT}/api/handler`);

		dispatch({
			type: GET_PROFILES,
			payload: res.data,
		});
	} catch (err) {
		dispatch({ type: CLEAR_PROFILES });
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Get handler profiles By id
export const getProfileById = (handlerID) => async (dispatch) => {
	try {
		const res = await axios.get(
			`${config.API_ENDPOINT}/api/handler/${handlerID}`
		);

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		console.log('error =', err);
		dispatch({ type: CLEAR_PROFILE });
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response },
		});
	}
};

//Update handler profile
export const updateHandlerProfile = (formData = {}, history) => async (
	dispatch
) => {
	try {
		const axiosConfig = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const body = JSON.stringify(formData);

		const res = await axios.put(
			`${config.API_ENDPOINT}/api/handler/update`,
			body,
			axiosConfig
		);

		dispatch({
			type: CURRENT_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Profile Updated', 'success'));

		history.push('/home/handler');
	} catch (err) {
		const errors = err;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
