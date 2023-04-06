import { apiRequestUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";

export const getCustomerPortfolioDeatilsApi = () => {
  return Api.post(apiRequestUrls.getCustomerPortfolioData, {});
};

export const getRecentTrendsApi = () => {
  return Api.post(apiRequestUrls.getRecentTrends, {});
};
export const getLargeWithdrawalApi = () => {
  return Api.post(apiRequestUrls.getLargeWithdrawal, {});
};
export const getRecentContributionApi = () => {
  return Api.post(apiRequestUrls.getRecentContribution, {});
};
export const getRiskDistributionApi = (clientType) => {
  return Api.post(apiRequestUrls.getRiskDistribution(clientType));
};
export const getOutperformersApi = () => {
  return Api.post(apiRequestUrls.getOutperformers, {});
};

export const getUnderPerformersApi = () => {
  return Api.post(apiRequestUrls.getUnderPerformers, {});
};
export const getDormantApi = () => {
  return Api.post(apiRequestUrls.getDormant, {});
};
export const getTopWalletApi = () => {
  return Api.post(apiRequestUrls.getTopWallet, {});
};
export const getTopRevenueApi = () => {
  return Api.post(apiRequestUrls.getTopRevenue, {});
};

export const getAssetAnomolyApi = (requestObj) => {
  return Api.post(apiRequestUrls.getAssetAllocation, { data: requestObj });
};
export const getCustomerOverviewCS = () =>
  Api.get(apiRequestUrls.customerOverviewControlStructure);

export const getDemographicsApi = (clientType, fillterParam) =>
  Api.post(apiRequestUrls.getDemographics(clientType, fillterParam));
