import {
  getProspectListingCsApi,
  getAllProspectDataApi,
  getProspectAdvancedFilterApi,
} from "../../api/prospectListingApi";
import {
  SET_PROSPECT_LISTING_CS,
  SET_PROSPECT_LISTING_DATA,
  SET_PROSPECT_ADVANCED_FILTER,
} from "./actionTypes";
import { store } from "../configureStore";

const setData = (action, payload) => {
  return { type: action, payload: payload };
};
const setProspectListingCs = (payload) => {
  return { type: SET_PROSPECT_LISTING_CS, payload: payload };
};

const setProspectListingData = (payload) => {
  return { type: SET_PROSPECT_LISTING_DATA, payload: payload };
};

export const executeGetProspectListingCs = () => {
  return (dispatch) => {
    getProspectListingCsApi()
      .then((res) => {
        dispatch(setProspectListingCs(res.data.csList));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const executeGetProspectAdvancedFilter = async () => {
  try {
    const response = await getProspectAdvancedFilterApi();
    if (response.data) {
      store.dispatch(setData(SET_PROSPECT_ADVANCED_FILTER, response.data));
    }
  } catch (error) {
    console.log("GET PROSPECT ADVANCED FILTER ERROR", error);
  }
};

export const executeGetAllProspectData = (setLocalProspectData, setLoading) => {
  return (dispatch) => {
    setLoading(true);
    getAllProspectDataApi()
      .then((res) => {
        if (res.status === 200) {
          dispatch(setProspectListingData(res.data));
          setLocalProspectData(res.data.prospectListResponseModel);
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
