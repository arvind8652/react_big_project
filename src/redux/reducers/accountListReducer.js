import { SET_ACCOUNT_LIST, SET_ACCOUNT_LISTING_CS } from '../actions/actionTypes';

const initialState = {
	allAccount: '',
	Status: '',
	controlStructure: ''
};

const accountListReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ACCOUNT_LISTING_CS:
			return { ...state, controlStructure: action.payload };
		case SET_ACCOUNT_LIST:
			return {
				...state,
				allAccount: action.payload
			};
		default:
			return state;
	}
};

export default accountListReducer;
