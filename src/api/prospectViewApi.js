import { apiRequestUrls } from "../config/apiConfig";
import { CONSTANTS } from "../constants/constants";
import { Api } from "../services/apiService";

export const getProspects360ViewApi = (refId) => {
  const postObject = {
    RefID: refId,
    RefType: "PROSPECTADD",
  };
    
  return Api.post(apiRequestUrls.getProspects360View, {
    data: postObject,
  });
};

export const deleteProspectApi = (prospectId) => {
  const postObject = {
    ProspectID: [prospectId],
  };
    
  return Api.post(apiRequestUrls.deleteProspect, {
    data: postObject,
  });
};

export const downgradeProspectApi = (prospectId) => { 
  const postObject = {
    ProspectID: [prospectId],
  };
    
  return Api.post(apiRequestUrls.downGradeProspect, {
    data: postObject,
  });
};

export const getAttachmentDetailApi = (prospectId) => {
  return Api.get(apiRequestUrls.getProspectAttachmentDetails + prospectId);
};

export const getMiscellaneousDetailApi = (prospectId) => {
  return Api.get(apiRequestUrls.getProspectMiscellaneous + prospectId);
};

export const getProspectRelationsApi = (prospectId) => {
  const postObject = {
    RefID: prospectId,
    RefType: "PROSPECTADD",
  };
    
  return Api.post(apiRequestUrls.getProspectRelations, {
    data: postObject,
  });
};

export const getProspectOpportunityApi = (prospectId) => {
  const postObject = {
    RefID: prospectId,
    RefType: "PROSPECTADD",
  };
    
  return Api.post(apiRequestUrls.getProspectOpportunity, {
    data: postObject,
  });
};

export const getProspectInteractionApi = (prospectId) => {
  const postObject = {
    RefID: prospectId,
    RefType: "PROSPECTADD",
  };
    
  return Api.post(apiRequestUrls.getProspectInteraction, {
    data: postObject,
  });
};

export const getProspectTaskApi = (prospectId) => {
  const postObject = {
    RefID: prospectId,
    RefType: "PROSPECTADD",
  };
    
  return Api.post(apiRequestUrls.getProspectTask, {
    data: postObject,
  });
};

export const getProspectNotesApi = (prospectId) => {
  const postObject = {
    RefID: prospectId,
    RefType: "PROSPECTADD",
  };
    
  return Api.post(apiRequestUrls.getProspectNotes, {
    data: postObject,
  });
};

export const getProspectVerticalTimelineApi = (prospectId) => {
  const postObject = {
    RefID: prospectId,
    RefType: "PROSPECTADD",
  };
    
  return Api.post(apiRequestUrls.getProspectVerticalTimeline, {
    data: postObject,
  });
};

export const uploadAttachmentApi = (attachmentDetails) => {
  return Api.post(apiRequestUrls.uploadProspectAttachment, {
    data: attachmentDetails,
  });
};

export const downloadAttachmentApi = (attachmentDetails) => {
  return Api.post(apiRequestUrls.downloadProspectAttachment, {
    data: attachmentDetails,
  });
};

export const getCustomerDetailApi = (sourceType, sourceValue) => {
  return Api.get(
    apiRequestUrls.getProspectCustomerDetail +
    "RefType=" +
    sourceType +
    "&Id=" +
    sourceValue
    // apiRequestUrls.getProspectCustomerDetail + "RefType=Customer&Id=IDV051"
    //   "RefType=" +
    //   sourceType +
    //   "&Id=" +
    //   sourceValue
  );
};

export const postConvertProspectToCustomer = (requestPayload) => {
  return Api.post(apiRequestUrls.postConvertProspectToCustomer, {
    data: requestPayload
  });
};

export const getNextOrPreviousOpportunityViewApi = (filter) => { };
