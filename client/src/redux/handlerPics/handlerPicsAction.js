import axios from 'axios';
import { setAlert } from '../alert/alertActions';
import { IMG_UPLOAD_SUCCESS, IMG_UPLOAD_FAIL } from './handlerPicsTypes';

// Upload Handler Pics
export const uploadPics = (image) => async (dispatch) => {
	try {
		const res = await axios.post('/api/image', image);

		dispatch({
			type: IMG_UPLOAD_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: IMG_UPLOAD_FAIL,
		});
	}
};
