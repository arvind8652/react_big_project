import {
  getDocumentManagerDetailsApi,
  getUploadDocumentToDBApi,
  getDocumentForDownloadApi,
  getAdvancedFilterApi,
  getControlStructureApi,
} from "../../api/documentManagerApi";
import {
  SET_DOCUMENT_MANAGER_DETAILS_DATA,
  SET_ADVANCED_FILTER_DETAILS_DATA,
  SET_CONTROL_STRUCTURE_DATA,
  SET_DOC_DEPENDENT_DATA,
} from "./actionTypes";
import { store } from "../configureStore";
import { getDependentDataApi } from "../../api/controlStructureApi";

const setData = (action, payload) => {
  return { type: action, payload: payload };
};

const addKeyInDocObj = (doc) => {
  let docList = doc.map((ele) => {
    ele.key = ele.documentId;
    return ele;
  });
  return docList;
};

export const documentManagerAllApi = async () => {
  let promises = [
    getAdvancedFilter(),
    getControlStructure(),
    getDependentData(),
  ];
  const data = await Promise.all(promises);
  return false;
};
export const documentManagerDetailsData = async () => {
  try {
    let resp = await getDocumentManagerDetailsApi();
    let docObj = await addKeyInDocObj(resp.data);
    store.dispatch(setData(SET_DOCUMENT_MANAGER_DETAILS_DATA, docObj));
    return false;
  } catch (error) {
    console.log(error);
  }
};
export const getUploadDocumentToDB = async (payload) => {
  try {
    let resp = await getUploadDocumentToDBApi(payload);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
export const getDocumentForDownload = (postdata) => {
  let resp = "";
  getDocumentForDownloadApi(postdata)
    .then((res) => {
      resp = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return resp;
};
export const getAdvancedFilter = () => {
  getAdvancedFilterApi()
    .then((res) => {
      store.dispatch(setData(SET_ADVANCED_FILTER_DETAILS_DATA, res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getControlStructure = () => {
  getControlStructureApi()
    .then((res) => {
      store.dispatch(setData(SET_CONTROL_STRUCTURE_DATA, res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getDependentData = async (documentsetupid) => {
  let payload = {
    FieldListID: 20066,
    dependentValue: {
      documentsetupid: documentsetupid ? documentsetupid : "KYCPROCESS",
    },
  };
  let response = await getDependentDataApi(payload);
  store.dispatch(setData(SET_DOC_DEPENDENT_DATA, response.data));
  return response;
};
