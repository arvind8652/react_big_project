import {
    SET_QUICK_ADD_MENU_ITEMS
} from '../actions/actionTypes';

const initialState = {
    quickAddMenuItems: [],
};

export const topBarReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_QUICK_ADD_MENU_ITEMS:
            return {
                ...state,
                quickAddMenuItems: payload,
            };
        default:
            return state;
    }
};

export default topBarReducer;