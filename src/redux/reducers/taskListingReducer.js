import {
    SET_TASK_LISTING_DATA,
    SET_TASK_LISTING_CS,
  } from "../actions/actionTypes";
  
  const initialState = {
    controlStructure: "",
    allTask: "",
  };
  
  const taskListingReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_TASK_LISTING_DATA:
        return { ...state, allTask: action.payload };
      case SET_TASK_LISTING_CS:
        return { ...state, controlStructure: action.payload };
      default:
        return state;
    }
  };
  
  export default taskListingReducer;
  