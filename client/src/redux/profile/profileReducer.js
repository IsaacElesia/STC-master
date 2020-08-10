import {
	GET_PROFILE,
	GET_PROFILES,
	CURRENT_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	CLEAR_PROFILES,
	CLEAR_CURRENT_PROFILE,
} from './profileTypes';

const initialState = {
	profile: null,
	profiles: [],
	currentProfile: null,
	loading: true,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false,
			};
		case CURRENT_PROFILE:
			return {
				...state,
				currentProfile: payload,
				loading: false,
			};
		case GET_PROFILES:
			return {
				...state,
				profiles: payload,
				loading: false,
			};
		case PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
				profile: null,
			};
		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				loading: false,
			};
		case CLEAR_CURRENT_PROFILE:
			return {
				...state,
				currentProfile: null,
				loading: false,
			};
		case CLEAR_PROFILES:
			return {
				...state,
				profiles: [],
				loading: false,
			};
		default:
			return state;
	}
}
