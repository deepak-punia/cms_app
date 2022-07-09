import {GET_USERS, ERROR_GET_USERS, UPDATE_USER_ROLE, API_ENDPOINT} from './types';
import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

import * as SecureStore from 'expo-secure-store'; 

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log(result);
    return result;
  } else {
    console.log("no Local Token value");
    return null;
  }
}

//Load All Users 
export const loadUsers = () => async (dispatch) => {
  const Login = await getValueFor('Login')
	if (Login) {
		setAuthToken(Login);
	}
	try {
		const response = await axios.get(`${API_ENDPOINT}/api/users`);

		dispatch({
			type: GET_USERS,
			payload: response.data,
		});
	} catch (error) {
		console.log(error);
        dispatch(setAlert("Loading Failed! Please try again", "danger","admindashboard"));
		dispatch({
			type: ERROR_GET_USERS,
		});
	}
};

//make user MOD with id
export const makeUserMod = (id) => async (dispatch) => {
  const Login = await getValueFor('Login')
	if (Login) {
		setAuthToken(Login);
	}
	try {
		const response = await axios.post(`${API_ENDPOINT}/api/users/${id}`);

		dispatch({
			type: UPDATE_USER_ROLE,
		});
        dispatch(loadUsers());
        dispatch(setAlert("User Role is updated.", "success","admindashboard"));
	} catch (error) {
		console.log(error);
        dispatch(setAlert("Loading Failed! Please try again", "danger","admindashboard"));
	}
};

//Delete user  with id
export const deleteUser = (id) => async (dispatch) => {
  const Login = await getValueFor('Login')
	if (Login) {
		setAuthToken(Login);
	}
	try {
		const response = await axios.delete(`${API_ENDPOINT}/api/users/${id}`);

		dispatch({
			type: UPDATE_USER_ROLE,
		});
        dispatch(loadUsers());
        dispatch(setAlert("User is Deleted", "success","admindashboard"));
	} catch (error) {
		console.log(error);
        dispatch(setAlert("Loading Failed! Please try again", "danger","admindashboard"));
	}
};