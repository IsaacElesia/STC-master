import axios from 'axios';
import config from '../../config';
import { setAlert } from '../alert/alertActions';
import {
	IMG_UPLOAD_SUCCESS,
	IMG_UPLOAD_FAIL,
	IMG_LOADED,
} from './handlerPicsTypes';

// Upload Handler Pics
export const uploadPics = (image) => async (dispatch) => {
	try {
		const res = await axios.post(`${config.API_ENDPOINT}/api/image`, image);

		dispatch({
			type: IMG_UPLOAD_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		const error = err.response;

		if (error) {
			dispatch(setAlert(error.msg, 'danger'));
		}

		dispatch({
			type: IMG_UPLOAD_FAIL,
		});
	}
};

export const imgLoaded = () => {
	return {
		type: IMG_LOADED,
	};
};
