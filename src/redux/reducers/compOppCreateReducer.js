import { SET_COMP_OPP_CREATE_CS } from "../actions/actionTypes";

const initialState = {
  controlStructure: "",
};
const compOppCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMP_OPP_CREATE_CS:
      return { ...state, controlStructure: action.payload };
    default:
      return state;
  }
};

export default compOppCreateReducer;
