import { SET_ACCOUNT_CREATE_CS, SET_ACCOUNT_DETAILS, SET_ACCOUNT_DETAILS_PROFILE } from "../actions/actionTypes";

const initialState = {
    controlStructure: "",
    accountDetails: undefined,
    accountDetailsProfile: undefined,
};
const accountCreateReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_ACCOUNT_CREATE_CS:
            return { ...state, controlStructure: payload };
        case SET_ACCOUNT_DETAILS:
            return { ...state, accountDetails: payload };
        case SET_ACCOUNT_DETAILS_PROFILE:
            return {...state, accountDetailsProfile: payload};
        default:
            return state;
    }
};


export default accountCreateReducer;