import { apiRequestUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";

export const getDocumentManagerDetailsApi = () => {
  const postObject = {
    // RefID: "AC2021100081",
  };
  return Api.post(apiRequestUrls.getDocumentManagerDetailsData, {
    data: postObject,
  });
};

export const getUploadDocumentToDBApi = (postObject) => {
  return Api.post(apiRequestUrls.getUploadDocumentToDB, {
    data: postObject,
  });
};

export const getDocumentForDownloadApi = (postObject) => {
  return Api.post(apiRequestUrls.getDocumentForDownload, {
    data: postObject,
  });
};

export const getAdvancedFilterApi = () => {
  const postObject = {};
  return Api.post(apiRequestUrls.getDocAdvancedFilter, {
    data: postObject,
  });
};

export const getControlStructureApi = () => {
  return Api.get(apiRequestUrls.getControlStructure);
};
