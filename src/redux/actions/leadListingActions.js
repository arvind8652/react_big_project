import { getAllLeadsDataApi, getLeadListingCsApi, getLeadAdvancedFilterApi } from "../../api/leadListingApi";
import { SET_LEAD_LISTING_CS, SET_LEAD_LISTING_DATA, SET_LEAD_ADVANCED_FILTER } from "./actionTypes";
import { store } from "../configureStore";

const setData = (action, payload) => {
  return { type: action, payload: payload };
};

const setLeadListingCs = (payload) => {
  return { type: SET_LEAD_LISTING_CS, payload: payload };
};
const setLeadListingData = (payload) => {
  return { type: SET_LEAD_LISTING_DATA, payload: payload };
};

export const executeGetLeadListingCs = () => {
  return (dispatch) => {
    getLeadListingCsApi()
      .then((res) => {
        dispatch(setLeadListingCs(res.data.csList));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const executeGetAllLeadsData = (filters, setAllLeadData, allLeadData, fromRowNumber, setLoading) => {
  return (dispatch) => {
    getAllLeadsDataApi(filters, fromRowNumber)
      .then((res) => {
        if (res.status === 200) {
          // dispatch(setLeadListingData(res.data));
          setLoading(false);
          if (!fromRowNumber) {
            dispatch(setLeadListingData(res.data));
            setAllLeadData(res.data.leadListResponseModel);
          } else {
            setAllLeadData([...allLeadData, ...res.data.leadListResponseModel]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const executeGetLeadAdvancedFilter = async () => {
  try {
    const response = await getLeadAdvancedFilterApi();
    if (response.data) {
      store.dispatch(setData(SET_LEAD_ADVANCED_FILTER, response.data));
    }
  } catch (error) {
    console.log("GET LEAD ADVANCED FILTER ERROR", error);
  }
};
