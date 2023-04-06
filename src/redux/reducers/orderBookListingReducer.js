import {
  SET_ORDER_BOOK_ADVANCED_FILTER,
  SET_ORDER_BOOK_CONTROL_STRUCTURE_DATA,
  SET_ORDER_BOOK_LISTING_DATA,
} from "../actions/actionTypes";

const initialState = {
  controlStructure: "",
  orderBookList: [],
  advancedFilter: "",
};

const orderBookListingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_BOOK_CONTROL_STRUCTURE_DATA:
      return { ...state, controlStructure: action.payload };
    case SET_ORDER_BOOK_LISTING_DATA:
      return { ...state, orderBookList: action.payload };
    case SET_ORDER_BOOK_ADVANCED_FILTER:
      return { ...state, advancedFilter: action.payload };
    default:
      return state;
  }
};

export default orderBookListingReducer;
