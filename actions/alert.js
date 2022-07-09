import { SET_ALERT, REMOVE_ALERT } from "./types";
import uuid from "react-native-uuid";

export const setAlert = (msg, alertType,componentName) => (dispatch) => {
	const id = uuid.v4();
	dispatch({
		type: SET_ALERT,
		payload: {
			msg,
			alertType,
			componentName,
			id
		},
	});
	setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};