import { apiRequestUrls, primaryMarketApiUrls, pNBApiUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";

export const getExploreProductCS = () => Api.get(primaryMarketApiUrls.primaryOrderControlStructure);

export const getExploreProduct = (expProdReqData) =>
  Api.post(primaryMarketApiUrls.getPrimaryMarketExploreProductData, {
    data: expProdReqData,
  });

export const getOrderDetails = (orderId) =>
  Api.post(primaryMarketApiUrls.getPrimaryMarketOrderDetails, {
    data: { RefID: orderId },
  });

export const updateWorkflowForOrder = (updateObject, marketType) => {
  if (marketType === "Primary") {
    return Api.post(primaryMarketApiUrls.updateWorkFlowLogForPMDeal, {
      data: updateObject,
    });
  } else if (marketType === "Secondary") {
    return Api.post(pNBApiUrls.insertUpdateWorkFlowLogForSMDeal, {
      data: updateObject,
    });
  }
};

const defaultDeleteDefaultObj = [""];
export const deleteWorkflowOrder = (orderIdArray = defaultDeleteDefaultObj, refType) =>
  Api.post(primaryMarketApiUrls.deleteWorkFlowOrder, {
    data: { lstRefID: orderIdArray, refType: refType, reason: "1", remarks: "Test" },
  });

export const getOrderAttachmentDetails = (progName, recordID) =>
  Api.get(apiRequestUrls.getAttachmentDetails(progName, recordID));

export const getCustomerDetails = (RefType, Id, Scheme) =>
  Api.get(primaryMarketApiUrls.getCustomerDetailInPM(RefType, Id, Scheme));

export const getDocumentDetails = (documentRequestObject) => {
  return Api.post(apiRequestUrls.getDocumentDetails, {
    data: documentRequestObject,
  });
};
export const placeOrder = (postData) => Api.post(primaryMarketApiUrls.postPrimaryOrder, postData);

export const getClientAddressDetails = (postData) => Api.post(primaryMarketApiUrls.getClientAddressDetails, postData);

export const getDefaultBankAccountAndCustodian = (postData) =>
  Api.post(primaryMarketApiUrls.getDefaultBankAccountAndCustodian, postData);
