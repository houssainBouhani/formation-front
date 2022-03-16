import {
	REGISTER_PENDING,
	REGISTER_SUCCESS,
	REGISTER_FAILD,
	LOGIN_PENDING,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT,
	USER_LOADED
} from './types';

import api from '../../../axiosConfig';
import setAuthToken from '../../../utils/setAuthToken';

//register user
export const register = (userData) => async (dispatch) => {
	dispatch({
		type: REGISTER_PENDING
	});

	try {
		const { data } = await api.post('users/register', userData);
		console.log(data);
		dispatch({ type: REGISTER_SUCCESS });
	} catch (error) {
		dispatch({ type: REGISTER_FAILD, payload: error.message });
	}
};

//login
export const login = (userData) => async (dispatch) => {
	dispatch({
		type: LOGIN_PENDING
	});

	try {
		const { data } = await api.post('/users/login', userData);
    console.log(data)
		dispatch({ type: LOGIN_SUCCESS, payload: data });
    dispatch(loadUser());
	} catch (error) {
		dispatch({ type: LOGIN_FAILED, payload: error.message});
	}
};

// Load User
export const loadUser = () => async (dispatch) => {
	setAuthToken(localStorage.token);
	try {
		const res = await api.get('/users/current');
		dispatch({type: USER_LOADED,payload: res.data});
	} catch (err) {
		//dispatch({ type: AUTH_ERROR });
	}
};

export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
};
