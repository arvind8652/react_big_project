import {
  SET_LEAD_VIEW_NEXT_OR_PREVIOUS_DATA,
  GET_CUSTOMER_DETAIL,
  GET_LEAD_VIEW_DATA,
  SET_LEAD_EDIT_DETAIL,
  CLEAR_LEAD_EDIT_DETAIL,
} from "../actions/actionTypes";

const initialState = {
  leadViewData: null,
  leadCustomerDetail: null,
  leadEditDetail: null,
  error: "",
};

const leadViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LEAD_VIEW_DATA:
      return {
        ...state,
        leadViewData: action.payload,
        leadEditDetail: "",
        leadCustomerDetail: "",
        error: "",
      };
    case SET_LEAD_VIEW_NEXT_OR_PREVIOUS_DATA:
      return {
        ...state,
        leadViewData: action.payload,
        leadCustomerDetail: "",
        leadEditDetail: "",
        error: "",
      };
    case GET_CUSTOMER_DETAIL:
      return {
        ...state,
        leadCustomerDetail: action.payload,
        leadEditDetail: "",
        error: "",
      };
    case SET_LEAD_EDIT_DETAIL:
      return {
        ...state,
        leadEditDetail: action.payload,
        error: "",
      };
    case CLEAR_LEAD_EDIT_DETAIL:
      return {
        ...state,
        leadEditDetail: null,
        error: "",
      };
    default:
      return state;
  }
};

export default leadViewReducer;
