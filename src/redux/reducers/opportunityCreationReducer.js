import {
  SET_OPPORTUNITY_CREATION_CS,
  SET_OPPORTUNITY_CREATION_FULL_CS,
  SET_OPPORTUNITY_CREATION_SUCCESS,
  SET_OPPORTUNITY_DEPENDANT_DATA_SUCCESS,
  GET_OPPORTUNITY_CREATION_PROBABILITY,
} from "../actions/actionTypes";

const initialState = {
  opportunityControlStructure: [],
  opportunityFullControlStructure: [],
  opportunityCreationSuccess: {},
  opportunityCreationProbabilitySuccess: {},
};

const opportunityCreationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OPPORTUNITY_CREATION_CS: {
      const newState = {
        ...state,
        opportunityControlStructure: action.payload,
      };

      return newState;
    }
    case SET_OPPORTUNITY_CREATION_SUCCESS: {
      const newState = {
        ...state,
        opportunityCreationSuccess: action.payload,
      };
      return newState;
    }
    case SET_OPPORTUNITY_DEPENDANT_DATA_SUCCESS: {
      const newState = {
        ...state,
        opportunityControlStructure: {
          ...state.opportunityControlStructure,
          ...action.payload,
        },
      };
      return newState;
    }
    case SET_OPPORTUNITY_CREATION_FULL_CS: {
      const newState = {
        ...state,
        opportunityFullControlStructure: action.payload,
      };
      return newState;
    }
    case GET_OPPORTUNITY_CREATION_PROBABILITY: {
      const newState = {
        ...state,
        opportunityCreationProbabilitySuccess: action.payload,
      };
      return newState;
    }
    default:
      return state;
  }
};

export default opportunityCreationReducer;
