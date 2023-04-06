import { apiRequestUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";

export const getLeadListingCsApi = () => {
  return Api.get(apiRequestUrls.getLeadListingCs);
};

export const getAllLeadsDataApi = (filters, fromRowNumber) => {
  const postObject = {
    data: {
      Lead: {
        FirstName: (filters && filters.firstName) || "",
      },
      Filterparam: (filters && filters.filterParam) || null,
      Sorting: (filters && filters.sorting) || null,
      FromRowNumber: 0,
      RowSize: 150,
      Type: filters && filters.type && filters.type.length > 0 ? filters.type : ["I", "C"],
      Category: filters && filters.category && filters.category.length > 0 ? filters.category : null,
      Source: filters && filters.source && filters.source.length > 0 ? filters.source : null,
      Interestlevel:
        filters && filters.interestLevel && filters.interestLevel.length > 0 ? filters.interestLevel : null,
      RelationshipManager:
        filters && filters.relationshipManager && filters.relationshipManager.length > 0
          ? filters.relationshipManager
          : null,
      Branch: filters && filters.branch && filters.branch.length > 0 ? filters.branch : null,
    },
  };
  return Api.post(apiRequestUrls.getAllLeads, postObject);
};

export const upgradeSelectedLeadsApi = (leadIdArray) => {
  const postObject = {
    data: {
      LeadId: leadIdArray,
    },
  };
  return Api.post(apiRequestUrls.upgradeSelectedLeads, postObject);
};

export const upgradeCategorySelectedLeadApi = (postData) => {
  return Api.post(apiRequestUrls.upgradeSelectedLeadCategory, { data: postData });
};

export const deleteSelectedLeadsApi = (leadIdArray) => {
  const postObject = {
    data: {
      LeadId: leadIdArray,
    },
  };
  return Api.post(apiRequestUrls.deleteSelectedLeads, postObject);
};

export const assignSelectedLeadsApi = (leadIdArray, relationshipManager) => {
  const postObject = {
    data: {
      Leadassign: {
        LeadID: leadIdArray,
        RelationshipManager: relationshipManager,
      },
    },
  };
  return Api.post(apiRequestUrls.assignSelecetedLeads, postObject);
};

export const getLeadAdvancedFilterApi = () => Api.post(apiRequestUrls.getLeadAdvFilter);
