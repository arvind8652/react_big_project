import { apiRequestUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";

export const getRepositoryDataApi = () => {
  return Api.post(apiRequestUrls.getRepositoryData);
};
export const getQualificationStatusApi = () => {
  return Api.post(apiRequestUrls.getQualificationStatus);
};

export const getQualificationGraphApi = () => {
  return Api.post(apiRequestUrls.getProspectConvMonthlyTrend);
};

export const getInterestLevelCountApi = () => {
  return Api.post(apiRequestUrls.getInterestLevelCount);
};

export const getProspectSourceCountDataApi = () => {
  return Api.post(apiRequestUrls.getProspectSourceCountData);
};
export const getProspectCreationDataApi = () => {
  const postObject = { data: {} };
  return Api.post(apiRequestUrls.getProspectCreationData, postObject);
};
export const getLeadCreationDataApi = () => {
  const postObject = { data: {} };
  return Api.post(apiRequestUrls.getLeadCreationData, postObject);
};

export const getCampaignTypeApi = (plottingCategory) => {
  return Api.post(apiRequestUrls.getCampaignType + plottingCategory);
};

export const getDemographicDataApi = (distributionOption) => {
  return Api.post(apiRequestUrls.getDemographicData + distributionOption);
};

export const getActiveCampaignGraphApi = () => {
  return Api.post(apiRequestUrls.getActiveCampaignGraph);
};
export const getEnquiryGraphApi = () => {
  return Api.post(apiRequestUrls.getEnquiryGraph);
};

export const getRecentLeadApi = () => {
  return Api.post(apiRequestUrls.getRecentLead);
};
export const getRecentProspectApi = () => {
  return Api.post(apiRequestUrls.getRecentProspect);
};

export const getRecentCampaignApi = () => {
  return Api.post(apiRequestUrls.getRecentCampaign);
};
