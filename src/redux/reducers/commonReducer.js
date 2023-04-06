import { SET_CONFIG, SET_DROPDOWN_VALUE, SET_LP_CUSTOMER_INFO } from "../actions/actionTypes";

const initialState = {
	config: undefined,
	customerInfo: {
		customerCode: false,
	},
};

const commonReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CONFIG:
			return { ...state, config: action.payload };
		case SET_DROPDOWN_VALUE:
			return {
				...state,
				dropdownKeys: { ...action.payload },
			};
		case SET_LP_CUSTOMER_INFO:
			return {
				...state,
				customerInfo: action.payload,
			};

		default:
			return state;
	}
};

export default commonReducer;
