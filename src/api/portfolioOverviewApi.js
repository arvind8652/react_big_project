import { apiRequestUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";

export const getCustomerInfo = requestBody => Api.post(apiRequestUrls.getCustomerInfo, requestBody);

export const getInvestmentAccountData = requestBody => Api.post(apiRequestUrls.getInvestmentAccountData, requestBody);
// console.log("invested", getInvestmentAccountData);

export const getOpportunities = requestBody => Api.post(apiRequestUrls.getOpportunities, requestBody);

export const getNotesData = requestBody => Api.post(apiRequestUrls.getNotesData, requestBody);

export const getCalederData = requestBody => Api.post(apiRequestUrls.getCalederData, requestBody);

// export const getInvestmentAccountData = requestBody => Api.post(apiRequestUrls.getInvestmentAccountData, requestBody);

export const getRiskProfileModel = requestBody => Api.post(apiRequestUrls.getRiskProfileData, requestBody);

export const getExploreProductsDetails = postObject => Api.post(apiRequestUrls.getExploreProductsDetails, postObject);

export const getOpenOrders = postObject => Api.post(apiRequestUrls.getOpenOrdersData, postObject);
// console.log("Orders APi", getOpenOrders);