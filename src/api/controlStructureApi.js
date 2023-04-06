import { Api } from "../services/apiService";
import { apiRequestUrls } from "../config/apiConfig";

export const getControlStructure = (progName) => {
  return Api.get(apiRequestUrls.getControlStructureApiUrl(progName));
};

export const getDependentDataApi = (payload) => {
  let pData = {
    data: payload,
  };
  return Api.post(apiRequestUrls.getDependentData, pData);
};
