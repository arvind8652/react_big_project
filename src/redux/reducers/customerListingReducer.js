import {
  SET_CUSTOMER_LISTING_CS,
  SET_CUSTOMER_LISTING_DATA,
} from "../actions/actionTypes";

const initialState = {
  controlStructure: "",
  allCustomers: "",
};

const customerListingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CUSTOMER_LISTING_CS:
      return { ...state, controlStructure: action.payload };
    case SET_CUSTOMER_LISTING_DATA:
      return { ...state, allCustomers: action.payload };
    default:
      return state;
  }
};

export default customerListingReducer;
