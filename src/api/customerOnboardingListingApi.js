import { apiRequestUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";

export const getCustomerOnboardingListingCsApi = () => {
  return Api.get(apiRequestUrls.getCustomerOnboardingListingCs);
};

export const getAllCustomerOnboardingDataApi = () => {
  return Api.post(apiRequestUrls.getAllCustomersOnboarding);
};

export const terminateCustomerOnboardingApi = (leadIdArray) => {
  const postObject = {
    data: {
      lstRefID: leadIdArray,
    },
  };
  return Api.post(apiRequestUrls.terminateCustomerOnboarding, postObject);
};
// export const terminateCustomerOnboardingApi = ( payload) => {
// 	return Api.post(apiRequestUrls.terminateCustomerOnboarding, {
// 		data: payload
// 		// data: requestPayload
// 	});
// };

export const assignSelectedCustomerOnboardingApi = (customerCode, relationshipManager, assignReason, branchName) => {
  const postObject = {
    data: {
      customercode: customerCode,
      RelationshipManager: relationshipManager,
      AssignReason: assignReason ? assignReason : " ",
      Branch: branchName ? branchName : " ",
    },
  };
  return Api.post(apiRequestUrls.assignSelectedCustomerOnboarding, postObject);
};

export const getDependentDataCustomerOnboarding = (postObject) => {
  return Api.post(apiRequestUrls.getDependentData, { data: postObject });
};
