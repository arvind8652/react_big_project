import {
    SET_TOPBAR_NOTIFICATIONS
} from "../actions/actionTypes";

const initialState = {
    notifications: []
};

const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOPBAR_NOTIFICATIONS:
            return {...state, notifications : action.payload};
        default:
            return state;
    }
}

export default notificationsReducer;