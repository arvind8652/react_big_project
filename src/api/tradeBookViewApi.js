import { apiRequestUrls } from "../config/apiConfig";
import { Api } from "../services/apiService";

export const getTradeBookViewDetails = (dealId, refType) => Api.post(apiRequestUrls.getTradeBookViewDetails(dealId, refType));

export const getTradeBookViewVerticalTimeline = (dealId, refType) => Api.post(apiRequestUrls.getTradeBookViewVerticalTimeline(dealId, refType));

export const getTradeBookViewSecurityDetails = (postObject) => Api.post(apiRequestUrls.getTradeBookViewSecurityDetails, postObject);

export const getTradeBookViewDocumentForDownload = (postObject) => Api.post(apiRequestUrls.getDocumentForDownload, postObject);

export const getTradeBookAttachmentDetails = (progName, recordID) => Api.get(apiRequestUrls.getAttachmentDetails(progName, recordID));