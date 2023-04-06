import { apiRequestUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";

// export const getOpportunityViewCsApi = () => {
//   return Api.get(apiRequestUrls.getOpportunityViewCs);
// };

export const getMyActivityApi = () => {
  return Api.post(apiRequestUrls.getActivities);
};

export const getMyActivityGraphApi = () => {
  return Api.post(apiRequestUrls.getActivityGraph);
};

export const getMyTaskApi = () => {
  return Api.post(apiRequestUrls.getTasks);
};

export const getMyTaskGraphApi = () => {
  return Api.post(apiRequestUrls.getTasksGraph);
};

export const getActivityInteractionApi = () => {
  return Api.post(apiRequestUrls.getActivityInteraction);
};

export const getActivityInteractionGraphApi = () => {
  return Api.post(apiRequestUrls.getActivityInteractionGraph);
};

export const getActivityInteractionTypeApi = () => {
  return Api.post(apiRequestUrls.getActivityInteractionType);
};

export const getInteractionBreakupGraphApi = (type) => {
  return Api.post(apiRequestUrls.getInteractionBreakupGraph + type);
};

export const getTaskBreakupGraphApi = (type) => {
  return Api.post(apiRequestUrls.getTaskBreakupGraph + type);
};

export const getOpenIntegrationApi = () => {
  return Api.post(apiRequestUrls.getOpenIntegrationData);
};

export const getOpenTaskApi = () => {
  return Api.post(apiRequestUrls.getOpenTaskData);
};

export const getTrendExecutedApi = () => {
  return Api.post(apiRequestUrls.getTrendExecuted);
};

export const getTrendPlannedApi = () => {
  return Api.post(apiRequestUrls.getTrendPlanned);
};
