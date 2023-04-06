import { SET_CUSTOMER_CREATE_CS, SET_CUSTOMER_FORM_DATA, SET_RISK_PROFILE_QA_LIST } from "./actionTypes";
import { getCustomerCreateCs } from "../../api/customerCreateApi";
import { store } from "../configureStore";

const setCustomerCreateCs = (payload) => {
  return { type: SET_CUSTOMER_CREATE_CS, payload: payload };
};
export const executeGetCustomerCreateCs = () => {
  getCustomerCreateCs()
    .then((res) => {
      res.data && store.dispatch(setCustomerCreateCs(res.data.csList));
    })
    .catch((err) => {
      console.log("GET CUSTOMER CREATE CS ERROR: ", err);
    });
};
const setCustomerFormData = (payload) => {
  return { type: SET_CUSTOMER_FORM_DATA, payload: payload };
};
export const setCreateCustomerData = (payload) => {
  return () => {
    store.dispatch(setCustomerFormData(payload));
  }
};

const setRiskProfileQAList = (payload) => {
  return { type: SET_RISK_PROFILE_QA_LIST, payload: payload };
};
export const setRiskProfileData = (payload) => {
  store.dispatch(setRiskProfileQAList(payload));
};
