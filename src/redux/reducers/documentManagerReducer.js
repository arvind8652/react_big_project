import {
  SET_DOCUMENT_MANAGER_DETAILS_DATA,
  SET_UPLOAD_DOCUMENT_TO_DB_DATA,
  SET_DOCUMENT_FOR_DOWNLOAD_DATA,
  SET_ADVANCED_FILTER_DETAILS_DATA,
  SET_CONTROL_STRUCTURE_DATA,
  SET_DOC_DEPENDENT_DATA,
} from "../actions/actionTypes";

const initialState = {
  documentManagerDetails: "",
  uploadDocumentToDB: "",
  documentForDownload: "",
  advancedFilter: "",
  controlStructure: "",
  dependentData: "",
};

const documentManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DOCUMENT_MANAGER_DETAILS_DATA:
      return { ...state, documentManagerDetails: action.payload };
    case SET_UPLOAD_DOCUMENT_TO_DB_DATA:
      return { ...state, uploadDocumentToDB: action.payload };
    case SET_DOCUMENT_FOR_DOWNLOAD_DATA:
      return { ...state, documentForDownload: action.payload };
    case SET_ADVANCED_FILTER_DETAILS_DATA:
      return { ...state, advancedFilter: action.payload };
    case SET_CONTROL_STRUCTURE_DATA:
      return { ...state, controlStructure: action.payload };
    case SET_DOC_DEPENDENT_DATA:
      return { ...state, dependentData: action.payload };
    default:
      return state;
  }
};

export default documentManagerReducer;
