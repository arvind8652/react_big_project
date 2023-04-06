import { apiRequestUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";

export const getProspectListingCsApi = () => {
  return Api.get(apiRequestUrls.getProspectListingCs);
};

export const postConvertProspectToClientApi = (payload) => {
  return Api.post(apiRequestUrls.postConvertProspectToClient, {
    data: payload,
  });
};

export const getAllProspectDataApi = (filters) => {
  const postObject = {
    data: {
      Prospect: {
        Interestlevel: (filters && filters.Interestlevel) || null,
        Type: (filters && filters.type) || null,
        Category: (filters && filters.category) || null,
        Source: (filters && filters.source) || null,
      },
    },
  };
  return Api.post(apiRequestUrls.getAllProspect, postObject);
};

export const getProspectAdvancedFilterApi = () =>
  Api.post(apiRequestUrls.getProspectAdvFilter);

export const deleteSelectedProspectApi = (ProspectIdArray) => {
  const postObject = {
    data: {
      ProspectID: ProspectIdArray,
    },
  };
  return Api.post(apiRequestUrls.deleteSelectedProspect, postObject);
};

export const movedownSelectedProspectApi = (ProspectIdArray) => {
  const postObject = {
    data: {
      ProspectID: ProspectIdArray,
    },
  };
  return Api.post(apiRequestUrls.downgradeSelectedProspect, postObject);
};
export const upgradeSelectedProspectApi = (postData) => {
  return Api.post(apiRequestUrls.upgradeProspect, { data: postData });
};

export const addFavouriteProspectApi = (refId, progName) => {
  const postObject = {
    data: {
      RefType: progName,
      RefID: refId,
      ProgName: progName,
    },
  };
  return Api.post(apiRequestUrls.assignFavoriteProspect, postObject);
};
