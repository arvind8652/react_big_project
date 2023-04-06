import {
  SET_EXPLORE_PRODUCTS_FILTERED,
  SET_EXPLORE_PRODUCTS_DETAILS,
  SET_EXPLORE_PRODUCTS_CONTROL_STRUCTURE,
  SET_EXPLORE_PRODUCTS_ADVANCED_FILTER,
  SET_EXPLORE_PRODUCTS_ADV_CACHE,
} from "../actions/actionTypes";

const initialState = {
  // exploreProductsDetails: {exploreProductsControlStructure : [{dropDownValue: []}]},
  exploreProductsDetails: [],
  exploreProducts: [],
};

const exploreProductsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_EXPLORE_PRODUCTS_DETAILS:
      return { ...state, exploreProductsDetails: payload };
    case SET_EXPLORE_PRODUCTS_CONTROL_STRUCTURE:
      return { ...state, exploreProductsControlStructure: payload };
    case SET_EXPLORE_PRODUCTS_ADVANCED_FILTER:
      return { ...state, exploreProductsAdvFilter: payload };
    case SET_EXPLORE_PRODUCTS_FILTERED:
      return { ...state, exploreProductsFilteredData: payload };
    case SET_EXPLORE_PRODUCTS_ADV_CACHE:
      return { ...state, advCache: payload };

    default:
      return state;
  }
};

export default exploreProductsReducer;
