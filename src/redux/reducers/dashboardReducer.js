import {
  SET_LEFT_PANEL_DATA,
  SET_CLIENT_LEFT_PANEL_DATA,
  SET_CHILD_MENU_FLAG,
} from "../actions/actionTypes";

const intialState = {
  leftPanel: "",
  leftPanelBottomNav: "",
  childMenuFlag: false,
};

const dashboardReducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_LEFT_PANEL_DATA:
      return {
        ...state,
        leftPanel: action.payload.leftMenu,
        leftPanelBottomNav: action.payload.leftMenuBottomNav[0],
      };
    case SET_CLIENT_LEFT_PANEL_DATA:
      return {
        ...state,
        leftPanel: action.payload.leftMenu,
        leftPanelBottomNav: action.payload.leftMenuBottomNav[0],
      };
    case SET_CHILD_MENU_FLAG:
      return {
        ...state,
        childMenuFlag: action.payload,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
