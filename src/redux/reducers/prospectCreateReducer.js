import { SET_PROSPECT_CREATE_CS } from "../actions/actionTypes";

const initialState = {
  controlStructure: "",
};

const prospectCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROSPECT_CREATE_CS:
      return { ...state, controlStructure: action.payload };
    default:
      return state;
  }
};

export default prospectCreateReducer;
