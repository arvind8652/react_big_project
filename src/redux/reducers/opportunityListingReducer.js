import {
  SET_OPPORTUNITY_LISTING_CS,
  SET_OPPORTUNITY_LISTING_DATA,
  SET_OPPORTUNITY_ADVANCED_FILTER,
} from "../actions/actionTypes";

const initialState = {
  controlStructure: "",
  allOpportunity: "",
};

const opportunityListingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OPPORTUNITY_LISTING_CS:
      return { ...state, controlStructure: action.payload };
    case SET_OPPORTUNITY_LISTING_DATA:
      return { ...state, allOpportunity: action.payload };
      case SET_OPPORTUNITY_ADVANCED_FILTER:
        return { ...state, getOpportunityAdvFilter: action.payload };
    default:
      return state;
  }
};

export default opportunityListingReducer;
