import { apiRequestUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";

export const getPasswordPolicyInfoApi = () => {
  return Api.get(apiRequestUrls.getGuidelines);
};

export const loginApi = (data) => {
  return Api.post(apiRequestUrls.authenticateUser, {
    data: data,
  });
};

export const verifyOtpApi = (data) => {
  const postObject = { ProgName: "Login", otp: data.otp, UserID: data.userId };
  return Api.post(apiRequestUrls.authenticatePostLogin, {
    data: postObject,
  });
};
export const getOtpRequestFormCsApi = () => {
  return Api.get(apiRequestUrls.otpRequestFormCs);
};

export const forgotPasswordApi = (data) => {
  const postObject = { UserId: data.userId, EmailId: data.email };
  return Api.post(apiRequestUrls.forgotPassword, { data: postObject });
};

export const resetPasswordApi = (data) => {
  const postObject = {
    UserId: data.userId,
    OTP: data.otp,
    NewPaswd: data.newPassword,
    ConfirmPaswd: data.confirmPassword,
  };
  return Api.post(apiRequestUrls.userPasswordRequest, { data: postObject });
};

export const logoutApi = () => {
  return Api.post(apiRequestUrls.logout);
};
