import axios from "axios";
import {
	LOAD_USER_COMPLAINTS,
    LOAD_COMPLAINTS_ERROR,
	API_ENDPOINT,
	LOAD_COMPLAINT_WITH_ID,
	RESOLVE_COMPLAINT_WITH_ID,
	ALL_USER_COMPLAINTS
} from "./types";
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

//Load User complaints
export const loadUserComplaints = () => async (dispatch) => {
	const Login = await getValueFor('Login')
	if (Login) {
		setAuthToken(Login);
	}
	try {
		const response = await axios.get(`${API_ENDPOINT}/api/complaint/usercomplaints`);

		dispatch({
			type: LOAD_USER_COMPLAINTS,
			payload: response.data,
		});
	} catch (error) {
		console.log(error);
        dispatch(setAlert("Loading Failed! Please try again", "danger","dashboard"));
		dispatch({
			type: LOAD_COMPLAINTS_ERROR,
		});
	}
};

//Load All complaints
export const loadAllComplaints = () => async (dispatch) => {
	const Login = await getValueFor('Login')
	if (Login) {
		setAuthToken(Login);
	}
	try {
		const response = await axios.get(`${API_ENDPOINT}/api/complaint`);

		dispatch({
			type: ALL_USER_COMPLAINTS,
			payload: response.data,
		});
	} catch (error) {
		console.log(error);
        dispatch(setAlert("Loading Failed! Please refresh page", "danger","moddashboard"));
		
	}
};


//Load  complaint with id
export const loadComplaintwithid = (id) => async (dispatch) => {
	const Login = await getValueFor('Login')
	if (Login) {
		setAuthToken(Login);
	}
	try {
		const response = await axios.get(`${API_ENDPOINT}/api/complaint/${id}`);

		dispatch({
			type: LOAD_COMPLAINT_WITH_ID,
			payload: response.data,
		});
	} catch (error) {
		console.log(error);
        dispatch(setAlert("Loading Failed! Please try again", "danger","dashboard"));
		
	}
};

//Resolve complaint with id
export const reslveComplaintwithid = (id) => async (dispatch) => {
	const Login = await getValueFor('Login')
	if (Login) {
		setAuthToken(Login);
	}
	try {
		const response = await axios.post(`${API_ENDPOINT}/api/complaint/status/${id}`);

		dispatch({
			type: RESOLVE_COMPLAINT_WITH_ID,
		});
		dispatch(loadAllComplaints());
	} catch (error) {
		console.log(error);
        dispatch(setAlert("Loading Failed! Please try again", "danger","dashboard"));
		
	}
};