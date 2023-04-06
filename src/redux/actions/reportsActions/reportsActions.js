import {
  postSaveReportManager,
  getTableReportManager,
  postArchiveReportManager,
  postDeleteReportManager,
  postRegenerateReportManager,
  getFilterReportManager,
  getAdvancedFilter,
  getClientStatementCS,
  getSecurityHoldingCS,
  getCustomerListCS,
  getDocumentStatusCS,
  getOrderStatusCS,
  getTransactionStatementCS,
  getWinnerLaggersCS,
  getHoldingStatementCS,
  getReportManagerControlStructure,
  getReportManagerDependentData,
  getLeftPanelData
} from "../../../api/reportsApi/reportsApi";
import { store } from "../../configureStore";
import {
  SET_CLIENT_STATEMENT_CONTROL_STRUCTURE,
  SET_HOLDING_STATEMENT_CONTROL_STRUCTURE,
  SET_SECURITY_HOLDING_CONTROL_STRUCTURE,
  SET_DOCUMENT_STATUS_CONTROL_STRUCTURE,
  SET_ORDER_STATUS_CONTROL_STRUCTURE,
  SET_CUSTOMER_LIST_CONTROL_STRUCTURE,
  SET_TRANSACTION_STATEMENT_CONTROL_STRUCTURE,
  SET_WINNER_LAGGERS_CONTROL_STRUCTURE,
  SET_TABLE_DATA,
  SET_FILTER_REPORT_MANAGER,
  SET_ADVANCED_FILTER_CONTROL_STRUCTURE,
  SET_REPORT_MANAGER_CONTROL_STRUCTURE
} from "../actionTypes";

// common actions
const setGetFilterReportManager = (payload) => ({
  type: SET_FILTER_REPORT_MANAGER,
  payload,
});

const setTableReportManager = (payload) => ({
  type: SET_TABLE_DATA,
  payload,
});

const setAdvancedFilter = (payload) => ({
  type: SET_ADVANCED_FILTER_CONTROL_STRUCTURE,
  payload,
});

//client statement action
const setReportManagerControlStructure = (payload) => ({
  type: SET_REPORT_MANAGER_CONTROL_STRUCTURE,
  payload,
});

//client statement action
const setClientStatementControlStructure = (payload) => ({
  type: SET_CLIENT_STATEMENT_CONTROL_STRUCTURE,
  payload,
});

//holding statement action
const setHoldingStatementControlStructure = (payload) => ({
  type: SET_HOLDING_STATEMENT_CONTROL_STRUCTURE,
  payload,
});

const setSecurityHoldingControlStructure = (payload) => ({
  type: SET_SECURITY_HOLDING_CONTROL_STRUCTURE,
  payload,
});
const setCustomerListControlStructure = (payload) => ({
  type: SET_CUSTOMER_LIST_CONTROL_STRUCTURE,
  payload,
});
const setDocumentStatusControlStructure = (payload) => ({
  type: SET_DOCUMENT_STATUS_CONTROL_STRUCTURE,
  payload,
});
const setOrderStatusControlStructure = (payload) => ({
  type: SET_ORDER_STATUS_CONTROL_STRUCTURE,
  payload,
});
const setTransactionStatementControlStructure = (payload) => ({
  type: SET_TRANSACTION_STATEMENT_CONTROL_STRUCTURE,
  payload,
});

const setWinnerLaggersControlStructure = (payload) => ({
  type: SET_WINNER_LAGGERS_CONTROL_STRUCTURE,
  payload,
});

//common functions
export const executeGetFilterReportManager = async () => {
  try {
    const response = await getFilterReportManager();
    if (response.data) {
      store.dispatch(setGetFilterReportManager(response?.data));
    }
  } catch (error) {
    console.log("GET CLIENT STATEMENT CS ERROR", error);
  }
};


export const executeTableReportManager = async (setLoading) => {
  try {
    setLoading(true);
    const resp = await getTableReportManager();
    if (resp.data) {
      store.dispatch(setTableReportManager(resp?.data));
    }
  } catch (error) {
    console.log("GET TABLE RECORD ERROR", error);
  } finally {
    setLoading(false);
  }
};

export const executePostSaveReportManager = async (postObject) => {
  try {
    const response = await postSaveReportManager(postObject);
    return response;
  } catch (error) {
    console.log("POST SAVE REPORT MANAGER ERROR", error);
  }
};

export const executePostRegenerateReportManager = async (postObject) => {

  const postRegenerateData = {
    data: { QueueIds: postObject, Status: "REGENERATE" },
  };
  try {
    const response = await postRegenerateReportManager(postRegenerateData);
    return response;
  } catch (error) {
    console.log("POST REGENERATE REPORT MANAGER ERROR", error);
  }
};

export const executePostArchiveReportManager = async (postObject) => {
  const postArchiveData = {
    data: { QueueIds: postObject, Status: "ARCHIVE" },
  };
  try {
    const response = await postArchiveReportManager(postArchiveData);
    return response;
  } catch (error) {
    console.log("POST ARCHIVE REPORT MANAGER ERROR", error);
  }
};

export const executePostDeleteReportManager = async (postObject) => {
  const postDeleteData = {
    data: {
      QueueIds: postObject,
      Status: "DELETE",
    },
  };
  try {
    const response = await postDeleteReportManager(postDeleteData);
    return response;
  } catch (error) {
    console.log("POST DELETE REPORT MANAGER ERROR", error);
  }
};

export const executeGetAdvancedFilter = async () => {
  try {
    const resp = await getAdvancedFilter();
    if (resp.data) {
      store.dispatch(setAdvancedFilter(resp?.data));
    }
  } catch (error) {
    console.log("GET ADVANCED FILTER RECORD ERROR", error);
  }
};

//client statement functions
export const executeGetReportManagerCS = async (progName, setLoading) => {
  try {
    setLoading(true)
    const response = await getReportManagerControlStructure(progName);
    if (response.data) {
      store.dispatch(setReportManagerControlStructure(response?.data));
    }
  } catch (error) {
    console.log("GET Control Structure ERROR", error);
  }
  finally {
    setLoading(false)
  }
};

//client statement functions
export const executeGetClientStatementCS = async () => {
  try {
    const response = await getClientStatementCS();
    if (response.data) {
      store.dispatch(setClientStatementControlStructure(response?.data));
    }
  } catch (error) {
    console.log("GET CLIENT STATEMENT CS ERROR", error);
  }
};
//Holding statement functions
export const executeGetHoldingStatementCS = async () => {
  try {
    const response = await getHoldingStatementCS();
    if (response.data) {
      store.dispatch(setHoldingStatementControlStructure(response?.data));
    }
  } catch (error) {
    console.log("GET HOLDING STATEMENT CS ERROR", error);
  }
};
//Security Holding functions
export const executeGetSecurityHoldingCS = async () => {
  try {
    const response = await getSecurityHoldingCS();
    if (response.data) {
      store.dispatch(setSecurityHoldingControlStructure(response?.data));
    }
  } catch (error) {
    console.log("GET SECURITY HOLDING CS ERROR", error);
  }
};

export const executeGetCustomerListCS = async () => {
  try {
    const response = await getCustomerListCS();
    if (response.data) {
      store.dispatch(setCustomerListControlStructure(response?.data));
    }
  } catch (error) {
    console.log("GET CUSTOMER LIST CS ERROR", error);
  }
};
export const executeGetDocumentStatusCS = async () => {
  try {
    const response = await getDocumentStatusCS();
    if (response.data) {
      store.dispatch(setDocumentStatusControlStructure(response?.data));
    }
  } catch (error) {
    console.log("GET DOCUMENT STATUS CS ERROR", error);
  }
};

export const executeGetOrderStatusCS = async () => {
  try {
    const response = await getOrderStatusCS();
    if (response.data) {
      store.dispatch(setOrderStatusControlStructure(response?.data));
    }
  } catch (error) {
    console.log("GET ORDER STATUS CS ERROR", error);
  }
};

export const executeGetTransactionStatementCS = async () => {
  try {
    const response = await getTransactionStatementCS();
    if (response.data) {
      store.dispatch(setTransactionStatementControlStructure(response?.data));
    }
  } catch (error) {
    console.log("GET TRANSACTION STATEMENT CS ERROR", error);
  }
};

export const executeGetWinnerLaggersCS = async () => {
  try {
    const response = await getWinnerLaggersCS();
    if (response.data) {
      store.dispatch(setWinnerLaggersControlStructure(response?.data));
    }
  } catch (error) {
    console.log("GET WINNER LAGGERS CS ERROR", error);
  }
};



export const getReportDependentDataApi = async (fieldListID, dependentValue) => {
  const postObject = {
    data: {
      fieldListID: fieldListID,
      progName: null,
      dependentValue: dependentValue
    },
  };
  try {
    const response = await getReportManagerDependentData(postObject);
    return response;
  } catch (error) {
    console.log("DEPENDENT CONTROL ERROR", error);
  }
  // return Api.post(apiRequestUrls.getReportManagerDependentData, postObject);
};


export const executeGetLeftPanelData = async () => {
  try {
    const response = await getLeftPanelData();
    return response;
  }
  catch (error) {
    console.log("LEFT PANEL DATA ERROR", error);
  }
}
