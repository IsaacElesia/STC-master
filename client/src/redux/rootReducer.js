import { combineReducers } from 'redux';
import alertReducer from './alert/alertReducer';
import authReducer from './auth/authReducer';
import profileReducer from './profile/profileReducer';
import userReducer from './user/userReducer';
import handlerPicsReducer from './handlerPics/handlerPicsReducer';

const rootReducer = combineReducers({
	alert: alertReducer,
	auth: authReducer,
	image: handlerPicsReducer,
	profile: profileReducer,
	user: userReducer,
});

export default rootReducer;
