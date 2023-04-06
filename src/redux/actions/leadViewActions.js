import {
  getLeadViewApi,
  getNextOrPreviousLeadViewApi,
  getCustomerDetailApi,
} from "../../api/leadViewApi";
import {
  GET_LEAD_VIEW_DATA,
  SET_LEAD_VIEW_NEXT_OR_PREVIOUS_DATA,
  GET_CUSTOMER_DETAIL,
  SET_LEAD_EDIT_DETAIL,
  CLEAR_LEAD_EDIT_DETAIL,
} from "./actionTypes";

export const clearLeadEdit = () => {
  return { type: CLEAR_LEAD_EDIT_DETAIL };
};

const getLeadViewData = (payload) => {
  return { type: GET_LEAD_VIEW_DATA, payload: payload };
};

const setLeadViewNextOrPreviousData = (payload) => {
  return { type: SET_LEAD_VIEW_NEXT_OR_PREVIOUS_DATA, payload: payload };
};

const getLeadViewCustomerDetail = (payload) => {
  return { type: GET_CUSTOMER_DETAIL, payload: payload };
};

const saveLeadEditViewDetail = (payload) => {
  return { type: SET_LEAD_EDIT_DETAIL, payload: payload };
};

export const excecuteGetLeadView = (leadId, setErrorMsg) => {
  return (dispatch) => {
    setErrorMsg("");
    getLeadViewApi(leadId)
      .then((res) => {
        if (res.status === 200) {
          dispatch(executeGetCustomerDetail(res.data.lead));
          // executeGetCustomerDetail(res.data.lead);
          dispatch(getLeadViewData(res.data));
        } else {
          setErrorMsg(res.data.message);
        }
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  };
};

export const executeLeadViewNextOrPreviousData = (filters, setErrorMsg) => {
  return (dispatch) => {
    getNextOrPreviousLeadViewApi(filters)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setLeadViewNextOrPreviousData(res.data));
        } else {
          setErrorMsg(res.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const executeGetCustomerDetail = (leadData) => {
  return (dispatch) => {
    getCustomerDetailApi(leadData)
      .then((res) => {
        dispatch(getLeadViewCustomerDetail(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const executeSaveLeadEditDetail = (leadEditDetail) => {
  return (dispatch) => {
    dispatch(saveLeadEditViewDetail(leadEditDetail));
  };
};
