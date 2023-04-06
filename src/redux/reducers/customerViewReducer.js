import {
  GET_CUSTOMER_VIEW_ONBOARDING_DATA,
  GET_WORKFLOW_STATUS_DATA,
  GET_TIMELINE,
  GET_ATTACHMENT_DETAILS,
  GET_CUSTOMER_MISCELLANEOUS_DETAILS,
  GET_PROSPECT_RELATION,
  GET_DOCUMENT_DETAILS,
  SET_CUSTOMER_EDIT_DETAIL,
  CLEAR_CUSTOMER_EDIT_DETAIL,
} from "../actions/actionTypes";

const initialState = {
  customerOnboarding: "",
  workflowStatus: "",
  getTimeline: "",
  customerMiscellaneousDetail: null,
  customerAttachmentsDetail: "",
  customerDocumentDetail: null,
  prospectRelation: "",
  customerEditDetail: null,
  customerClearDetail: null,
  error: "",
};

const customerViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMER_VIEW_ONBOARDING_DATA:
      return {
        ...state,
        customerOnboarding: action.payload,
        error: "",
      };
    case GET_WORKFLOW_STATUS_DATA:
      return {
        ...state,
        workflowStatus: action.payload,
        error: "",
      };
    case GET_TIMELINE:
      return {
        ...state,
        getTimeline: action.payload,
        error: "",
      };
    case GET_PROSPECT_RELATION:
      return {
        ...state,
        prospectRelation: action.payload,
        customerEditDetail: "",
        error: "",
      };
    case GET_CUSTOMER_MISCELLANEOUS_DETAILS:
      return {
        ...state,
        customerMiscellaneousDetail: action.payload,
        customerEditDetail: "",
        error: "",
      };
    case GET_ATTACHMENT_DETAILS:
      return {
        ...state,
        customerAttachmentsDetail: action.payload,
        error: "",
      };
    case GET_DOCUMENT_DETAILS:
      return {
        ...state,
        customerDocumentDetail: action.payload,
        customerEditDetail: "",
        error: "",
      };
    case SET_CUSTOMER_EDIT_DETAIL:
      return {
        ...state,
        customerEditDetail: action.payload,
        error: "",
      };
    case CLEAR_CUSTOMER_EDIT_DETAIL:
      return {
        ...state,
        customerClearDetail: null,
        error: "",
      };
    default:
      return state;
  }
};

export default customerViewReducer;
