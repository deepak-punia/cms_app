import axios from "axios";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGOUT,
	LOGIN,
	API_ENDPOINT
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

import * as SecureStore from 'expo-secure-store'; 

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log("token: " + result);
    return result;
  } else {
    console.log("no Local Token value");
    return null;
  }
}

//Logout user
export const logout = () => async(dispatch) => {
	setAuthToken();
	
	dispatch({
		type: LOGOUT,
	});
	await SecureStore.deleteItemAsync('Login')
	dispatch(setAlert("Logged out.", "success","app"));
};

//Load User
export const loadUser = () => async (dispatch) => {
	const Login = await getValueFor('Login')
	if (Login) {
		setAuthToken(Login);
	}
	try {
		const response = await axios.get(`${API_ENDPOINT}/api/login`);

		dispatch({
			type: USER_LOADED,
			payload: response.data,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

//Register User
export const register =
	({ name, email, password }) =>
	async (dispatch) => {
		const body = JSON.stringify({ name, email, password });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const response = await axios.post(
				`${API_ENDPOINT}/api/users`,
				body,
				config
			);

			dispatch({
				type: REGISTER_SUCCESS,
				payload: response.data,
			});
      await save('Login', response.data.token);
			dispatch(setAlert("Register Successfull! ", "success","register"));
			dispatch(loadUser());
		} catch (error) {
			console.log(error);
			dispatch(setAlert("Register Failed! Please try again", "danger","register"));
			dispatch({
				type: REGISTER_FAIL,
			});
		}
	};

//Login User
export const login =
	({ email, password }) =>
	async (dispatch) => {
		const body = JSON.stringify({  email, password });
		console.log("Login action called")
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const response = await axios.post(
				`${API_ENDPOINT}/api/login`,
				body,
				config
			);

      

			dispatch({
				type: "LOGIN",
				payload: response.data,
			});
      await save('Login', response.data.token);
			dispatch(loadUser());
		} catch (error) {

			console.log(error)
			
			
			dispatch({
				type: "AUTH_ERROR",
			});
		}
	};


