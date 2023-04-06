import {
  getOpportunityListingCsApi,
  getAllOpportunityDataApi,
  getOpportunityAdvancedFilterApi,

} from "../../api/opportunityListingApi";
import {
  SET_OPPORTUNITY_LISTING_CS,
  SET_OPPORTUNITY_LISTING_DATA,
  SET_OPPORTUNITY_ADVANCED_FILTER
} from "./actionTypes";
import { store } from "../configureStore";

const setData = (action, payload) => {
  return { type: action, payload: payload };
};

const setOpportunityListingCs = (payload) => {
  return { type: SET_OPPORTUNITY_LISTING_CS, payload: payload };
};

const setOpportunityListingData = (payload) => {
  return { type: SET_OPPORTUNITY_LISTING_DATA, payload: payload };
};

export const executeGetOpportunityListingCs = () => {
  return (dispatch) => {
    getOpportunityListingCsApi()
      .then((res) => {
        dispatch(setOpportunityListingCs(res.data.csList));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const executeGetOpportunityAdvancedFilter = async () => {
  try {
    const response = await getOpportunityAdvancedFilterApi();
    if (response.data) {
      store.dispatch(setData(SET_OPPORTUNITY_ADVANCED_FILTER, response.data));
    }
  } catch (error) {
    console.log("GET OPPORTUNITY ADVANCED FILTER ERROR", error);
  }
};

export const executeGetAllOpportunityData = (
  setLocalOpportunityData,
  setLoading
) => {
  return (dispatch) => {
    setLoading(true);
    getAllOpportunityDataApi()
      .then((res) => {
        if (res.status === 200) {
          dispatch(setOpportunityListingData(res.data));
          setLocalOpportunityData(res.data.opportunityListResponse);
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
