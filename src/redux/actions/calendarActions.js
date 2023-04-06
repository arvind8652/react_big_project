import { getCalendarDetails, getCalendarEvents } from '../../api/calendarApi.js';

import { SET_CALENDAR_DETAILS, SET_CALENDAR_EVENTS } from './actionTypes';

import { store } from '../configureStore';

export const setCalendarDetails = (payload) => {
	return { type: SET_CALENDAR_DETAILS, payload: payload };
};

export const setCalendarEvents = (payload) => {
	return { type: SET_CALENDAR_EVENTS, payload: payload };
};

export const executeGetCalendarDetails = () => {
	return (dispatch) => {
		getCalendarDetails()
			.then((res) => {
				if (res.status === 200) {
					dispatch(setCalendarDetails(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				console.log('Called Calendar Details Action');
			});
	};
};

export const executeGetCalendarEvents = () => {
	return (dispatch) => {
		getCalendarEvents()
			.then((res) => {
				if (res.status === 200) {
					dispatch(setCalendarEvents(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				console.log('Called Calendar Events Action');
			});
	};
};
