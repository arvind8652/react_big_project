import { apiRequestUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";

export const getConStrikeRateApi = () => {
  return Api.post(apiRequestUrls.getConStrikeRate);
};
export const getCurrPipelineApi = () => {
  const postObject = { data: {} };
  return Api.post(apiRequestUrls.getCurrPipeline, postObject);
};
export const getNearClosureApi = () => {
  const postObject = {
    data: {
      IsSummary: false,
    },
  };
  return Api.post(apiRequestUrls.getNearClosure, postObject);
};
export const getMissedDuedateApi = () => {
  const postObject = {
    data: {
      IsSummary: false,
    },
  };
  return Api.post(apiRequestUrls.getMissedDuedate, postObject);
};
export const getMovedUpApi = () => {
  const postObject = {
    data: {
      IsSummary: false,
    },
  };
  return Api.post(apiRequestUrls.getMovedUp, postObject);
};
export const getMovedDownApi = () => {
  const postObject = {
    data: {
      IsSummary: false,
    },
  };
  return Api.post(apiRequestUrls.getMovedDown, postObject);
};
export const getDueNowApi = () => {
  const postObject = {
    data: {
      IsSummary: false,
    },
  };
  return Api.post(apiRequestUrls.getDueNow, postObject);
};
export const getHighValueDealApi = () => {
  const postObject = {
  //   data: {
  //     IsSummary: false,
  //   },
  };
  return Api.post(apiRequestUrls.getHighValueDeal, postObject);
  // return Api.post(apiRequestUrls.getHighValueDeal);
};
export const getRecentConApi = () => {
  const postObject = {
    data: {
      IsSummary: false,
    },
  };
  return Api.post(apiRequestUrls.getRecentCon, postObject);
};
export const getRecentMissedApi = () => {
  const postObject = {
    data: {
      IsSummary: false,
    },
  };
  return Api.post(apiRequestUrls.getRecentMissed, postObject);
};
export const getOpporBreakupApi = (filterProp) => {
  const postObject = { data: {"FilterParam": filterProp} };
  return Api.post(apiRequestUrls.getOpporBreakup, postObject);
};
export const getAgingAnalysisApi = () => {
  const postObject = { data: {} };
  return Api.post(apiRequestUrls.getAgingAnalysis, postObject);
};
export const getSalesPipelineApi = () => {
  const postObject = { data: {} };
  return Api.post(apiRequestUrls.getSalesPipeline, postObject);
};
export const getExpectedConApi = () => {
  const postObject = {
    data: {
      isSummary: false,

      // FromDate:
      //   new Date().getFullYear() +
      //   "-" +
      //   (new Date().getMonth() + 1 < 10
      //     ? "0" + (new Date().getMonth() + 1)
      //     : new Date().getMonth() + 1) +
      //   "-" +
      //   new Date().getDate(),
    },
  };
  return Api.post(apiRequestUrls.getExpectedCon, postObject);
};
export const getConversionTrendApi = () => {
  const postObject = {
    data: {
      FromDate:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1) +
        "-" +
        new Date().getDate(),
    },
  };
  return Api.post(apiRequestUrls.getConversionTrend, postObject);
};
export const getOpporDistributionApi = (oppDistributionProp) => {
   const postObject = { data: {"FilterParam": oppDistributionProp} };
  return Api.post(apiRequestUrls.getOpporDistribution, postObject);
};
