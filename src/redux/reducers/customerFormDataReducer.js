import { SET_CUSTOMER_FORM_DATA } from "../actions/actionTypes";
const initialState = {
    formData: []
}
const createCustomerFormData = (state = initialState, action) => {
    switch(action.type) {
        case SET_CUSTOMER_FORM_DATA:
            return {...state, formData: action.payload};
        default:
            return state;
    };
};

export default createCustomerFormData;