import { apiRequestUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";

export const getCustomerListingCsApi = () => {
  return Api.get(apiRequestUrls.getCustomerListingCs);
};

export const getAccountDetailsApi = (ClientId) => {
  const postObject = {
    ClientID: ClientId,
  };
  return Api.post(apiRequestUrls.getAccountDetails, {
    data: postObject,
  });
};

export const getAllCustomersDataApi = (filters) => {
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
  return Api.post(apiRequestUrls.getAllCustomers, postObject);
};

export const getCustomerSourceDetailApi = (refId) => {
  return Api.get(
    apiRequestUrls.getCustomerSourceDetails + "RefType=" + "Customer" + "&Id=" + refId
    // apiRequestUrls.getProspectCustomerDetail + "RefType=Customer&Id=IDV051"
    //   "RefType=" +
    //   sourceType +
    //   "&Id=" +
    //   sourceValue
  );
};

export const addFavouriteCustomerApi = (refId, progName) => {
  const postObject = {
    data: {
      RefType: progName,
      RefID: refId,
      ProgName: progName,
    },
  };
  return Api.post(apiRequestUrls.postFeed, postObject);
};

export const upgradeDowngradeCustomer = (requestPayload) => {
  return Api.post(apiRequestUrls.upgradeDowngradeCustomerApi, {
    data: requestPayload,
  });
};

export const doRefreshClientApi = () => {
  return Api.post(apiRequestUrls.refreshCustomerlisting);
};
