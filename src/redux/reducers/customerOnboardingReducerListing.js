import {
  SET_CUSTOMER_ONBOARDING_LISTING_CS,
  SET_CUSTOMER_ONBOARDING_LISTING_DATA,
} from "../actions/actionTypes";

const initialState = {
  controlStructure: "",
  allCustomerOnboarding: "",
};

const customerOnboardingListingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CUSTOMER_ONBOARDING_LISTING_CS:
      return { ...state, controlStructure: action.payload };
    case SET_CUSTOMER_ONBOARDING_LISTING_DATA:
      return { ...state, allCustomerOnboarding: action.payload };
    default:
      return state;
  }
};

export default customerOnboardingListingReducer;
