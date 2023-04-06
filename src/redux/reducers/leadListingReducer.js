import { SET_LEAD_LISTING_CS, SET_LEAD_LISTING_DATA, SET_LEAD_ADVANCED_FILTER } from "../actions/actionTypes";

const initialState = {
  controlStructure: "",
  allLeads: "",
  getLeadAdvFilter: "",
};

const leadListingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEAD_LISTING_CS:
      return { ...state, controlStructure: action.payload };
    case SET_LEAD_LISTING_DATA:
      return { ...state, allLeads: action.payload };
    case SET_LEAD_ADVANCED_FILTER:
      return { ...state, getLeadAdvFilter: action.payload };
    default:
      return state;
  }
};

export default leadListingReducer;
