import {
  SET_INTERACTION_LISTING_CS,
  SET_INTERACTION_LISTING_DATA,
  SET_INTERACTION_ADVANCED_FILTER,
} from "../actions/actionTypes";

const initialState = {
  controlStructure: "",
  allInteractions: "",
  getInteractionAdvFilter: "",
};

const interactionListingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INTERACTION_LISTING_CS:
      return { ...state, controlStructure: action.payload };
    case SET_INTERACTION_LISTING_DATA:
      return { ...state, allInteractions: action.payload };
      case SET_INTERACTION_ADVANCED_FILTER:
        return { ...state, getInteractionAdvFilter: action.payload };
    default:
      return state;
  }
};

export default interactionListingReducer;
