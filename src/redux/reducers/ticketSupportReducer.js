import {
	SET_TICKET_SUPPORT_CONTROL_STRUCTURE,
	SET_TICKET_SUPPORT_LISTING_DATA
} from '../actions/actionTypes';

const initialState = {
	controlStructure: [],
	listingData: []
};

export const ticketSupportReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_TICKET_SUPPORT_CONTROL_STRUCTURE:
			return {
				...state,
				controlStructure: payload
			};
		case SET_TICKET_SUPPORT_LISTING_DATA:
			return {
				...state,
				listingData: payload
			};
		// case SET_CUSTOMER_DATA:
		// 	return {
		// 		...state,
		// 		customerDetails: payload,
		// 	};
		default:
			return state;
	}
};

export default ticketSupportReducer;
