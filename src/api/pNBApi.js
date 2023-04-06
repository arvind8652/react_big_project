import { apiRequestUrls, primaryMarketApiUrls, pNBApiUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";

export const getSMOrderDetailsByID = (refID) => {
  const postObject = {
    data: {
      RefID: refID,
    },
  };
  return Api.post(apiRequestUrls.getSMOrderDetailsByID, postObject);
};

export const deleteSMOrder = (postObject) => {
  return Api.post(apiRequestUrls.deleteSMOrder, {
    data: postObject,
  });
};

export const getExploreProductCS = () => Api.get(apiRequestUrls.deptSecyOrderControlStructure);

export const getCustomerDetails = (RefType, Id, scheme) =>
  Api.get(apiRequestUrls.getCustomerDetailInSM(RefType, Id, scheme));

export const getJointHolderDetails = (Scheme) => Api.post(apiRequestUrls.getJointAccountHolderName(Scheme));

export const placeOrder = (postData) => Api.post(apiRequestUrls.postSecondaryMarketOrder, postData);

export const calculateSMOrderDetails = (postData) => Api.post(apiRequestUrls.calculateSMOrderDetails, postData);

export const getPMOrderDeals = (postData) => Api.post(apiRequestUrls.getDependentData, postData);
