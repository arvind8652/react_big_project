import { getControlStructure } from "../../api/controlStructureApi";
import { CONSTANTS } from "../../constants/constants";
import {
  SET_LOGIN_FORM_CS,
  SET_FORGOT_PASSWORD_FORM_CS,
  SET_OTP_REQUEST_FORM_CS,
} from "./actionTypes";

const setLoginFormControlStructure = (payload) => {
  return { type: SET_LOGIN_FORM_CS, payload: payload };
};
const setOtpRequestFormControlStructure = (payload) => {
  return { type: SET_OTP_REQUEST_FORM_CS, payload: payload };
};

const setForgotPasswordFormControlStructure = (payload) => {
  return { type: SET_FORGOT_PASSWORD_FORM_CS, payload: payload };
};

export const executeGetControlStructure = (progName) => {
  return async (dispatch) => {
    try {
      let response = await getControlStructure(progName);
      switch (progName) {
        case CONSTANTS.progNames.LOGIN_N:
          dispatch(
            setLoginFormControlStructure(
              response.data.csList[0].controlStructureField
            )
          );
          break;
        case CONSTANTS.progNames.FORGOTPASSWORD:
          dispatch(
            setForgotPasswordFormControlStructure(
              response.data.csList[0].controlStructureField
            )
          );
          break;
        case CONSTANTS.progNames.AUTHPOSTLOGIN:
          dispatch(
            setOtpRequestFormControlStructure(
              response.data.csList[0].controlStructureField
            )
          );
          break;

        default:
          break;
      }
    } catch (error) {
      console.log("getcontrolstructureerror ", error);
    }
  };
};
