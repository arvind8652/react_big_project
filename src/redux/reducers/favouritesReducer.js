import {
    SET_FAVOURITES
  } from "../actions/actionTypes";
  
  const initialState = {
    PROSPECTADD: [],
    CLIENTADD: [],
    OPPORTUNITYADD : [],
    SECURITY : []
  };
  
  const favouritesReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_FAVOURITES:
        return { ...state, [action.refType]: action.payload };
      default:
        return state;
    }
  };
  
  export default favouritesReducer;
  