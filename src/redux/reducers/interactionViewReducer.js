import {
  SET_INTERACTION_VIEW_CS,
  SET_INTERACTION_VIEW_FULL_CS,
  SET_INTERACTION_ADD_CS,
  SET_INTERACTION_ADD_FULL_CS,
  GET_INTERACTION_VIEW_DATA,
  GET_INTERACTION_VERTICAL_TIMELINE,
  GET_INTERACTION_ATTACHMENT_DETAILS,
  GET_INTERACTION_MISCELLANEOUS_DETAILS,
  SET_INTERACTION_UPLOAD_ATTACHMENT,
  GET_INTERACTION_HISTORY_DETAIL,
  SET_INTERACTION_EDIT_DETAIL,
  CLEAR_INTERACTION_EDIT_DETAIL,
} from "../actions/actionTypes";

const initialState = {
  interactionViewControlStructure: [],
  interactionViewControlStructureFull: [],
  interactionAddControlStructure: [],
  interactionAddControlStructureFull: [],
  interactionViewData: null,
  verticalTimelineDetail: null,
  interactionHistoryDetail: null,
  interactionMiscellaneousDetail: null,
  interactionAttachments: null,
  interactionEditDetail: null,
  error: "",
};

const interactionViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INTERACTION_VIEW_FULL_CS: {
      const newState = {
        ...state,
        interactionViewControlStructureFull: action.payload,
      };
      return newState;
    }
    case SET_INTERACTION_VIEW_CS: {
      const newState = {
        ...state,
        interactionViewControlStructure: action.payload,
      };

      return newState;
    }
    case SET_INTERACTION_ADD_FULL_CS: {
      const newState = {
        ...state,
        interactionAddControlStructureFull: action.payload,
      };
      return newState;
    }
    case SET_INTERACTION_ADD_CS: {
      const newState = {
        ...state,
        interactionAddControlStructure: action.payload,
      };

      return newState;
    }
    case GET_INTERACTION_VIEW_DATA:
      return {
        ...state,
        interactionViewData: action.payload,
        horizontalTimelineDetail: "",
        verticalTimelineDetail: "",
        interactionHistoryDetail: "",
        interactionMiscellaneousDetail: "",
        interactionAttachments: "",
        interactionEditDetail: "",
        error: "",
      };
    case GET_INTERACTION_VERTICAL_TIMELINE:
      return {
        ...state,
        verticalTimelineDetail: action.payload,
        interactionEditDetail: "",
        error: "",
      };
    case GET_INTERACTION_HISTORY_DETAIL:
      return {
        ...state,
        interactionHistoryDetail: action.payload,
        interactionEditDetail: "",
        error: "",
      };
    case GET_INTERACTION_ATTACHMENT_DETAILS:
      return {
        ...state,
        interactionAttachments: action.payload,
        interactionEditDetail: "",
        error: "",
      };
    case GET_INTERACTION_MISCELLANEOUS_DETAILS:
      return {
        ...state,
        interactionMiscellaneousDetail: action.payload,
        interactionEditDetail: "",
        error: "",
      };
    case SET_INTERACTION_EDIT_DETAIL:
      return {
        ...state,
        interactionEditDetail: action.payload,
        error: "",
      };
    case CLEAR_INTERACTION_EDIT_DETAIL:
      return {
        ...state,
        interactionEditDetail: null,
        error: "",
      };
    default:
      return state;
  }
};

export default interactionViewReducer;
