import { getLeftPanelData, getClientLeftPanelData } from '../../api/dashboardApi';
import {
	SET_LEFT_PANEL_DATA,
	SET_CLIENT_LEFT_PANEL_DATA,
	SET_CHILD_MENU_FLAG
} from './actionTypes';
import { store } from '../configureStore';

const setLeftPanelData = (payload) => {
	return { type: SET_LEFT_PANEL_DATA, payload: payload };
};

const setClientLeftPanelData = (payload) => {
	return { type: SET_CLIENT_LEFT_PANEL_DATA, payload: payload };
};

const setChildMenuFlag = (payload) => {
	return { type: SET_CHILD_MENU_FLAG, payload: payload };
};

export const executeSetChildMenuFlag = (payload) => {
	store.dispatch(setChildMenuFlag(payload));
};

export const executeGetLeftPanelData = () => {
	return (dispatch) => {
		getLeftPanelData()
			.then((res) => {
				dispatch(setLeftPanelData(res.data ?? []));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const executeGetClientLeftPanelData = (ClientID) => {
	return (dispatch) => {
		getClientLeftPanelData(ClientID)
			.then((res) => {
				if (res.status === 200) {
					dispatch(setClientLeftPanelData(res.data));
				}
			})
			.catch((err) => {
				// console.log(err);
			});
	};
};
