import {
  getCustomerOnboardingListingCsApi,
  getAllCustomerOnboardingDataApi,
} from "../../api/customerOnboardingListingApi";
import { SET_CUSTOMER_ONBOARDING_LISTING_CS, SET_CUSTOMER_ONBOARDING_LISTING_DATA } from "./actionTypes";

const setCustomerOnboardingListingCs = (payload) => {
  return { type: SET_CUSTOMER_ONBOARDING_LISTING_CS, payload: payload };
};

const setCustomerOnboardingListingData = (payload) => {
  return { type: SET_CUSTOMER_ONBOARDING_LISTING_DATA, payload: payload };
};

export const executeGetCustomerOnboardingListingCs = () => {
  return (dispatch) => {
    getCustomerOnboardingListingCsApi()
      .then((res) => {
        dispatch(setCustomerOnboardingListingCs(res.data.csList));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const executeGetAllCustomerOnboardingData = (setLocalCustomerOnboardingData, setLoading) => {
  return (dispatch) => {
    setLoading(true);
    getAllCustomerOnboardingDataApi()
      .then((res) => {
        if (res.status === 200) {
          dispatch(setCustomerOnboardingListingData(res.data));
          setLocalCustomerOnboardingData(res.data.lstOnboardingResponse);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
};
