import { SET_CUSTOMER_CREATE_CS } from "../actions/actionTypes";

const initialState = {
  controlStructure: "",
};
const customerCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CUSTOMER_CREATE_CS:
      return { ...state, controlStructure: action.payload };
    default:
      return state;
  }
};

export default customerCreateReducer;
