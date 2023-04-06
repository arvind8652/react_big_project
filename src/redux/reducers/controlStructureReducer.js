import {
  SET_LOGIN_FORM_CS,
  SET_OTP_REQUEST_FORM_CS,
  SET_FORGOT_PASSWORD_FORM_CS,
} from "../actions/actionTypes";

const initialState = {
  loginForm: "",
  otpRequestForm: "",
  forgotPasswordForm: "",
};

const controlStructureReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_FORM_CS:
      return { ...state, loginForm: action.payload };
    case SET_OTP_REQUEST_FORM_CS:
      return { ...state, otpRequestForm: action.payload };
    case SET_FORGOT_PASSWORD_FORM_CS:
      return { ...state, forgotPasswordForm: action.payload };
    default:
      return state;
  }
};

export default controlStructureReducer;
