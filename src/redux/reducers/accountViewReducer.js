import {
  SET_CUSTOMER_LISTING_CS,
  SET_ACCOUNT_DETAILS_DATA,
  SET_DOCUMENT_DETAILS_DATA,
  SET_TIMELINE_DETAILS_DATA,
  SET_ATTACHMENT_DATA,
  SET_MISCELLANEOUS_DATA
} from "../actions/actionTypes";

const initialState = {
  controlStructure: "",
  accountDetails: "",
  documentDetails: "",
  timelineDetails: "",
  attachmentDetails: "",
  miscellaneousDetails: ""
};

const accountViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CUSTOMER_LISTING_CS:
      return { ...state, controlStructure: action.payload };
    case SET_ACCOUNT_DETAILS_DATA:
      return { ...state, accountDetails: action.payload };
    case SET_DOCUMENT_DETAILS_DATA:
      return { ...state, documentDetails: action.payload };
    case SET_TIMELINE_DETAILS_DATA:
      return { ...state, timelineDetails: action.payload };
    case SET_ATTACHMENT_DATA:
      return { ...state, attachmentDetails: action.payload };
    case SET_MISCELLANEOUS_DATA:
      return { ...state, miscellaneousDetails: action.payload };
    default:
      return state;
  }
};

export default accountViewReducer;
