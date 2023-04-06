import { apiRequestUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";

export const getLeadViewApi = (leadId) => {
  return Api.get(apiRequestUrls.getLeadView + leadId);
};

export const deleteLeadApi = (leadId) => {
  const postObject = {
    LeadId: [leadId],
  };
  return Api.post(apiRequestUrls.deleteLead, {
    data: postObject,
  });
};

export const upgradeLeadApi = (leadId) => {
  const postObject = {
    LeadId: [leadId],
  };
  return Api.post(apiRequestUrls.upgradeLead, {
    data: postObject,
  });
};

export const getNextOrPreviousLeadViewApi = (filters) => {
  const data = {
    Lead: {
      FirstName: (filters && filters.firstName) || "",
    },
    Filterparam: (filters && filters.filterParam) || null,
    Sorting: (filters && filters.sorting) || null,
    FromRowNumber: filters.FromRowNumber,
    RowSize: 1,
    Type: (filters && filters.type) || ["I", "C"],
    Category: (filters && filters.category) || null,
    Interestlevel: (filters && filters.InterestLevel) || null,
    RelationshipManager: (filters && filters.RelationshipManager) || null,
    Branch: (filters && filters.branch) || null,
  };
  const postObject = { data: data };
  return Api.post(apiRequestUrls.getNextOrPreviousLeadView, postObject);
};

export const getCustomerDetailApi = (leadData) => {
  return Api.get(
    // apiRequestUrls.getCustomerDetail + "RefType=Customer&Id=IDV051"
    apiRequestUrls.getCustomerDetail +
    "RefType=" +
    leadData.sourceType +
    "&Id=" +
    leadData.sourceValue
  );
};
