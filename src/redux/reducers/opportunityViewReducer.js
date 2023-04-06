import {
  SET_OPPORTUNITY_VIEW_FULL_CS,
  SET_OPPORTUNITY_VIEW_CS,
  SET_OPPORTUNITY_ADD_FULL_CS,
  SET_OPPORTUNITY_ADD_CS,
  GET_OPPORTUNITY_VIEW_DATA,
  SET_OPPORTUNITY_VIEW_NEXT_OR_PREVIOUS_DATA,
  GET_HORIZONTAL_TIMELINE,
  GET_VERTICAL_TIMELINE,
  GET_OPPORTUNITY_ATTACHMENT_DETAILS,
  GET_OPPORTUNITY_MISCELLANEOUS_DETAILS,
  SET_UPLOAD_ATTACHMENT,
  GET_OPPORTUNITY_STAGE_DETAIL,
  GET_PROBABILITY_BY_STAGE,
  SET_OPPORTUNITY_EDIT_DETAIL,
  CLEAR_OPPORTUNITY_EDIT_DETAIL,
} from "../actions/actionTypes";

const initialState = {
  opportunityViewControlStructure: [],
  opportunityViewControlStructureFull: [],
  opportunityAddControlStructure: [],
  opportunityAddControlStructureFull: [],
  opportunityViewData: null,
  horizontalTimelineDetail: null,
  verticalTimelineDetail: null,
  opportunityDependentData: null,
  opportunityMiscellaneousDetail: null,
  opportunityAttachments: null,
  opportunityEditDetail: null,
  error: "",
};

const opportunityViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OPPORTUNITY_VIEW_FULL_CS: {
      const newState = {
        ...state,
        opportunityViewControlStructureFull: action.payload,
      };
      return newState;
    }
    case SET_OPPORTUNITY_VIEW_CS: {
      const newState = {
        ...state,
        opportunityViewControlStructure: action.payload,
      };

      return newState;
    }
    case SET_OPPORTUNITY_ADD_FULL_CS: {
      const newState = {
        ...state,
        opportunityAddControlStructureFull: action.payload,
      };
      return newState;
    }
    case SET_OPPORTUNITY_ADD_CS: {
      const newState = {
        ...state,
        opportunityAddControlStructure: action.payload,
      };

      return newState;
    }
    case GET_OPPORTUNITY_VIEW_DATA:
      return {
        ...state,
        opportunityViewData: action.payload,
        horizontalTimelineDetail: "",
        verticalTimelineDetail: "",
        opportunityDependentData: "",
        opportunityMiscellaneousDetail: "",
        opportunityAttachments: "",
        opportunityEditDetail: "",
        error: "",
      };
    case SET_OPPORTUNITY_VIEW_NEXT_OR_PREVIOUS_DATA:
      return {
        ...state,
        opportunityViewData: action.payload,
        horizontalTimelineDetail: "",
        verticalTimelineDetail: "",
        opportunityDependentData: "",
        opportunityMiscellaneousDetail: "",
        opportunityAttachments: "",
        opportunityEditDetail: "",
        error: "",
      };
    case GET_HORIZONTAL_TIMELINE:
      return {
        ...state,
        horizontalTimelineDetail: action.payload,
        opportunityEditDetail: "",
        error: "",
      };
    case GET_VERTICAL_TIMELINE:
      return {
        ...state,
        verticalTimelineDetail: action.payload,
        opportunityEditDetail: "",
        error: "",
      };
    case GET_OPPORTUNITY_STAGE_DETAIL:
      return {
        ...state,
        opportunityDependentData: action.payload,
        opportunityEditDetail: "",
        error: "",
      };
    case GET_OPPORTUNITY_ATTACHMENT_DETAILS:
      return {
        ...state,
        opportunityAttachments: action.payload,
        opportunityEditDetail: "",
        error: "",
      };
    case GET_OPPORTUNITY_MISCELLANEOUS_DETAILS:
      return {
        ...state,
        opportunityMiscellaneousDetail: action.payload,
        opportunityEditDetail: "",
        error: "",
      };
    case SET_OPPORTUNITY_EDIT_DETAIL:
      return {
        ...state,
        opportunityEditDetail: action.payload,
        error: "",
      };
    case CLEAR_OPPORTUNITY_EDIT_DETAIL:
      return {
        ...state,
        opportunityEditDetail: null,
        error: "",
      };
    default:
      return state;
  }
};

export default opportunityViewReducer;
