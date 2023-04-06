import {
  SET_INTERACTION_CREATE_CS,
  SET_EXISTING_INTERACTION,
} from "../actions/actionTypes";

const initialState = {
  controlStructure: "",
};

const interactionCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INTERACTION_CREATE_CS:
      return { ...state, controlStructure: action.payload };
    default:
      return state;
    case SET_EXISTING_INTERACTION:
      return {
        ...state,
        existingInteraction: action.payload,
      };
  }
};

export default interactionCreateReducer;
