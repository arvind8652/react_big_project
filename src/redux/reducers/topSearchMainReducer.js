import {
    GET_SEARCH_RESULTS,
} from "../actions/actionTypes";
const initialState = {
    topSearchMainData: "",
};

const topSearchMainReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SEARCH_RESULTS:
            return {
                ...state,
                topSearchMainData: action.payload,
            };

        default:
            return state;
    }
};

export default topSearchMainReducer;
