import { SET_PRIMARY_MARKET_CONTROL_STRUCTURE, SET_PRIMARY_ORDER, SET_CUSTOMER_DATA } from "../actions/actionTypes";

const initialState = {
	controlStructure: {},
	primaryOrder: {
		dealId: "",
		valueDate: "",
		assetType: "",
		security: "",
		scheme: "",
		appAmount: 0,
		eligUnits: 0,
		fcyTotPaid: 0,
		appYield: "",
		agent: "",
		fcyArrangerFee: "",
		arrangerFeePer: "",
		fcynettval: "",
		branch: "",
		freshSchemeYn: "",
		instrType: "",
		account: "",
		chqNumber: "",
		bank: "",
		chqDate: null,
		bankAccForINM: "",
		custodian: "",
		dpAccountNo: "",
		sourceUserId: "",
		OthSourceName: "",
		OthDesignation: "",
		emailId: "",
		AddressOthYn: "",
		mailAdd1: "",
		mailCountry: "",
		mailState: "",
		mailCity: "",
		mailPin: "",
		remarks: "",
		currency: "",
		accCurrency: "",
		premium: null,
		faceValue: 0,
	},
	customerDetails: {},
};

export const primaryMarketReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_PRIMARY_MARKET_CONTROL_STRUCTURE:
			return {
				...state,
				controlStructure: payload,
			};
		case SET_PRIMARY_ORDER:
			return {
				...state,
				primaryOrder: { ...state.primaryOrder, ...payload },
			};
		case SET_CUSTOMER_DATA:
			return {
				...state,
				customerDetails: payload,
			};
		default:
			return state;
	}
};

export default primaryMarketReducer;
