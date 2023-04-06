import { SET_COMP_LEAD_CREATE_CS } from "../actions/actionTypes";

const initialState = {
  controlStructure: "",
};
const compLeadCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMP_LEAD_CREATE_CS:
      return { ...state, controlStructure: action.payload };
    default:
      return state;
  }
};

export default compLeadCreateReducer;
