import { getGlobalConfigApi } from "../../api/commonApi";
import { clearLocalStorage } from "../../utils/utils";
import { CLEAR_REDUX_STORE, SET_CONFIG, SET_DROPDOWN_VALUE, SET_LP_CUSTOMER_INFO } from "./actionTypes";
import { store } from "../configureStore";
const clearReduxStore = () => {
	return { type: CLEAR_REDUX_STORE };
};
const setConfig = (payload) => {
	return { type: SET_CONFIG, payload: payload };
};

const setDropdownValue = (payload) => ({
	type: SET_DROPDOWN_VALUE,
	payload,
});

const setSelectedCustomerInfo = (payload) => ({
	type: SET_LP_CUSTOMER_INFO,
	payload,
});

export const executeSetDropdownValue = (payload) => {
	store.dispatch(setDropdownValue(payload));
};

export const executeSelectedCustomerInfo = (payload) => {
	store.dispatch(setSelectedCustomerInfo(payload));
};

export const executeClearReduxStore = () => {
	return (dispatch) => {
		clearLocalStorage();
		dispatch(clearReduxStore());
	};
};

export const executeGetGlobalConfig = () => {
	return (dispatch) => {
		getGlobalConfigApi()
			.then((res) => {
				// console.log("GLOBAL CONFIG: ", res.data);
				res && res.data && dispatch(setConfig(res.data));
			})
			.catch((err) => {
				console.log("GLOBAL CONFIG FETCH ERROR: ", err);
			});
	};
};
