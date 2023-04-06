import { SET_CALENDAR_DETAILS, SET_CALENDAR_EVENTS } from '../actions/actionTypes';

const initialState = {
	calendarDetails: null,
	calendarEvents: null
};

const calendarReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CALENDAR_DETAILS:
			return { ...state, calendarDetails: action.payload };
		case SET_CALENDAR_EVENTS:
			return { ...state, calendarEvents: action.payload };
		default:
			return state;
	}
};

export default calendarReducer;
