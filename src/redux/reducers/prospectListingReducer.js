import {
  SET_PROSPECT_LISTING_CS,
  SET_PROSPECT_LISTING_DATA,
  SET_PROSPECT_ADVANCED_FILTER,
} from "../actions/actionTypes";

const initialState = {
  controlStructure: "",
  allProspect: "",
  getProspectAdvFilter: "",
};

const prospectListingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROSPECT_LISTING_CS:
      return { ...state, controlStructure: action.payload };
    case SET_PROSPECT_LISTING_DATA:
      return { ...state, allProspect: action.payload };
    case SET_PROSPECT_ADVANCED_FILTER:
      return { ...state, getProspectAdvFilter: action.payload };
    default:
      return state;
  }
};

export default prospectListingReducer;
