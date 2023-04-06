import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_OTP_VERIFY_SUCCESS,
  MENU_DETAILS,
} from "../actions/actionTypes";

const initialState = {
  user: "",
  error: "",
  isLoggedIn: false,
  menuDetails: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      if (action.payload.authenticateType === "OTP") {
        return { ...state, user: action.payload, error: "", isLoggedIn: false };
      } else {
        return { ...state, user: action.payload, error: "", isLoggedIn: true };
      }
    case USER_OTP_VERIFY_SUCCESS:
      let newUserObj = state.user;
      newUserObj.token = action.payload.token;
      return { ...state, user: newUserObj, error: "", isLoggedIn: true };
    case USER_LOGIN_FAILURE:
      return { ...state, user: "", error: action.payload };

    case MENU_DETAILS:
      return { ...state, menuDetails: action.payload };

    default:
      return state;
  }
};

export default authReducer;
