import {
  SET_LEAD_CREATION_CS,
  SET_LEAD_CREATION_SUCCESS,
  SET_SOURCE_SUCCESS,
  SET_LEAD_CREATION_FULL_CS,
} from "../actions/actionTypes";

const initialState = {
  leadControlStructure: [],
  leadControlStructureFull: [],
  leadCreationSuccess: {},
};

const leadCreationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEAD_CREATION_CS: {
      const newState = {
        ...state,
        leadControlStructure: action.payload,
      };

      return newState;
    }
    case SET_LEAD_CREATION_SUCCESS: {
      const newState = {
        ...state,
        leadCreationSuccess: action.payload,
      };
      return newState;
    }
    case SET_LEAD_CREATION_FULL_CS: {
      const newState = {
        ...state,
        leadControlStructureFull: action.payload,
      };
      return newState;
    }
    case SET_SOURCE_SUCCESS: {
      const newState = {
        ...state,
        leadControlStructure: {
          ...state.leadControlStructure,
          ...action.payload,
        },
      };
      return newState;
    }
    default:
      return state;
  }
};

export default leadCreationReducer;
