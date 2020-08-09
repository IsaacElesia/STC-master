import cuid from 'cuid';

import { SET_ALERT, REMOVE_ALERT } from './alertTypes';

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
	const id = cuid();
	dispatch({
		type: SET_ALERT,
		payload: { msg, alertType, id },
	});

	setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
