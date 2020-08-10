import { IMG_UPLOAD_SUCCESS, IMG_UPLOAD_FAIL } from './handlerPicsTypes';

const initialState = {
	image: {},
	loading: true,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case IMG_UPLOAD_SUCCESS:
			return {
				image: payload,
				loading: false,
			};
		case IMG_UPLOAD_FAIL:
			return {
				image: {},
				loading: false,
			};
		default:
			return state;
	}
}
