import { SET_RISK_PROFILE_QA_LIST } from "../actions/actionTypes";

const initialState = {};
const getRiskProfileQaList = (state = initialState, action) => {
    switch(action.type) {
        case SET_RISK_PROFILE_QA_LIST:
            return {...state, riskProfileQa: action.payload};
        default:
            return state;
    };
};

export default getRiskProfileQaList;