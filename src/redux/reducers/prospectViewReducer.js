import {
  GET_PROSPECT360_VIEW_DATA,
  GET_PROSPECT_VERTICAL_TIMELINE,
  GET_PROSPECT_ATTACHMENT_DETAILS,
  GET_PROSPECT_MISCELLANEOUS_DETAILS,
  GET_PROSPECT_CUSTOMER_DETAIL,
  GET_PROSPECT_OPPORUNTIY_DETAILS,
  GET_PROSPECT_REALTION_DETAILS,
  GET_PROSPECT_INTERACTION_DETAILS,
  GET_PROSPECT_TASK_DETAILS,
  GET_PROSPECT_NOTES_DETAILS,
  SET_PROSPECT_UPLOAD_ATTACHMENT,
  SET_PROSPECT_EDIT_DETAIL,
  CLEAR_PROSPECT_EDIT_DETAIL,
  GET_PROSPECT_CONVERSION_DEPENDANT_DATA
} from "../actions/actionTypes";

const initialState = {
  prospectViewData: null,
  verticalTimelineDetail: null,
  prospectOpportunityDetail: null,
  prospectMiscellaneousDetail: null,
  prospectAttachmentsDetail: null,
  prospectNotesDetail: null,
  prospectTaskDetail: null,
  prospectInteractionDetail: null,
  prospectRelationDetail: null,
  prospectCustomerDetail: null,
  prospectEditDetail: null,
  prospectClearDetail: null,
  error: "",
  prospectConversionDependantData: {}
};

const prospectViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROSPECT360_VIEW_DATA:
      return {
        ...state,
        prospectViewData: action.payload,
        verticalTimelineDetail: "",
        prospectOpportunityDetail: "",
        prospectMiscellaneousDetail: "",
        prospectAttachmentsDetail: "",
        prospectNotesDetail: "",
        prospectTaskDetail: "",
        prospectInteractionDetail: "",
        prospectRelationDetail: "",
        prospectCustomerDetail: "",
        prospectEditDetail: "",
        error: "",
      };
    case GET_PROSPECT_VERTICAL_TIMELINE:
      return {
        ...state,
        verticalTimelineDetail: action.payload,
        prospectEditDetail: "",
        error: "",
      };
    case GET_PROSPECT_REALTION_DETAILS:
      return {
        ...state,
        prospectRelationDetail: action.payload,
        prospectEditDetail: "",
        error: "",
      };
    case GET_PROSPECT_CUSTOMER_DETAIL:
      return {
        ...state,
        prospectCustomerDetail: action.payload,
        prospectEditDetail: "",
        error: "",
      };
    case GET_PROSPECT_MISCELLANEOUS_DETAILS:
      return {
        ...state,
        prospectMiscellaneousDetail: action.payload,
        prospectEditDetail: "",
        error: "",
      };
    case GET_PROSPECT_ATTACHMENT_DETAILS:
      return {
        ...state,
        prospectAttachmentsDetail: action.payload,
        prospectEditDetail: "",
        error: "",
      };
    case GET_PROSPECT_OPPORUNTIY_DETAILS:
      return {
        ...state,
        prospectOpportunityDetail: action.payload,
        prospectEditDetail: "",
        error: "",
      };
    case GET_PROSPECT_INTERACTION_DETAILS:
      return {
        ...state,
        prospectInteractionDetail: action.payload,
        prospectEditDetail: "",
        error: "",
      };
    case GET_PROSPECT_TASK_DETAILS:
      return {
        ...state,
        prospectTaskDetail: action.payload,
        prospectEditDetail: "",
        error: "",
      };
    case GET_PROSPECT_NOTES_DETAILS:
      return {
        ...state,
        prospectNotesDetail: action.payload,
        prospectEditDetail: "",
        error: "",
      };
    case SET_PROSPECT_EDIT_DETAIL:
      return {
        ...state,
        prospectEditDetail: action.payload,
        error: "",
      };
    case CLEAR_PROSPECT_EDIT_DETAIL:
      return {
        ...state,
        prospectClearDetail: null,
        error: "",
      };
    case GET_PROSPECT_CONVERSION_DEPENDANT_DATA:
      return {
        ...state,
        prospectConversionDependantData: action.payload,
        error: ""
      }
    default:
      return state;
  }
};

export default prospectViewReducer;
