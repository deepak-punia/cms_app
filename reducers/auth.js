import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT, LOGIN } from "../actions/types";
const initialState = {
	token: null,
	isAuthenticated: null,
	loading: true,
	user: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case "REGISTER_SUCCESS":
		case "LOGIN":
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			};
		case "REGISTER_FAIL":
		case "AUTH_ERROR":
		case "LOGOUT":
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null
			};
    case "USER_LOADED":
				
				return {
					...state,
					user: action.payload,
					isAuthenticated: true,
					loading: false,
				};
		default:
			return state;
	}
}