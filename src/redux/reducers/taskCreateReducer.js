import { SET_TASK_CREATE_CS } from "../actions/actionTypes";

const initialState = {
  controlStructure: "",
};
const taskCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASK_CREATE_CS:
      return { ...state, controlStructure: action.payload };
    default:
      return state;
  }
};

export default taskCreateReducer;
