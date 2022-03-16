import {
	REGISTER_PENDING,
	REGISTER_SUCCESS,
	REGISTER_FAILD,
	LOGIN_PENDING,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	REGISTER_COMPLETED,
	USER_LOADED,
	LOGOUT,
	CLEAR_ERRORS
} from '../actions/auth/types';

// initial state of the auth store
let initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	loading: false,
	user: null,
	error: null,
	isRegistred: false
};

const authReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case USER_LOADED:
			return {
				...state,
				loading: false,
				isAuthenticated: true,
				user: payload
			};
		case REGISTER_PENDING:
			return { ...state, loading: true };
		case REGISTER_SUCCESS:
			return {
				...state,
				loading: false,
				isRegistred: true
			};
		case REGISTER_COMPLETED:
			return {
				...state,
				loading: false,
				isRegistred: false,
				error: null
			};
		case REGISTER_FAILD:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: payload
			};
		case LOGIN_PENDING:
			return { ...state, loading: true };
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				loading: false,
				isAuthenticated: true
			};
		case LOGIN_FAILED:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: payload
			};
		case CLEAR_ERRORS:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: null
			};
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: null
			};
		default:
			return state;
	}
};

export default authReducer;
