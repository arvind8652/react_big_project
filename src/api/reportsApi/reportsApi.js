import { apiRequestUrls } from "../../config/apiConfig";
import { Api } from "../../services/apiService";

//common apis
export const getTableReportManager = (postObject) =>
  Api.post(apiRequestUrls.getTableReportManager, postObject);
export const postSaveReportManager = (postObject) =>
  Api.post(apiRequestUrls.postSaveReportManager, postObject);
export const postArchiveReportManager = (postObject) =>
  Api.post(apiRequestUrls.postArchiveReportManager, postObject);

export const postDeleteReportManager = (postObject) =>
  Api.post(apiRequestUrls.postDeleteReportManager, postObject);

export const postRegenerateReportManager = (postObject) =>
  Api.post(apiRequestUrls.postRegenerateReportManager, postObject);

export const getFilterReportManager = () =>
  Api.get(apiRequestUrls.getFilterReportManager);
export const getAdvancedFilter = (postObject) =>
  Api.post(apiRequestUrls.getAdvancedFilter, postObject);
export const postDownloadReportManager = postObject => Api.post(apiRequestUrls.postDownloadReportManager, postObject);

//client statement api
// export const getClientStatementCS = () => Api.get(apiRequestUrls.getClientStatementControlStructure(progName));

export const getReportManagerControlStructure = (progName) =>
  Api.get(apiRequestUrls.getReportManagerCS(progName));


export const getReportManagerDependentData = postObject => Api.post(apiRequestUrls.getDependentData, postObject);


export const getLeftPanelData = () => {
  return Api.get(apiRequestUrls.getLeftPanel);
};


export const getClientStatementCS = () =>
  Api.get(apiRequestUrls.getClientStatementControlStructure);

//Security Holding api
export const getSecurityHoldingCS = () =>
  Api.get(apiRequestUrls.getSecurityHoldingControlStructure);

export const getHoldingStatementCS = () =>
  Api.get(apiRequestUrls.getHoldingStatementControlStructure);
export const getCustomerListCS = () =>
  Api.get(apiRequestUrls.getCustomerListControlStructure);

export const getDocumentStatusCS = () =>
  Api.get(apiRequestUrls.getDocumentStatusControlStructure);
export const getOrderStatusCS = () =>
  Api.get(apiRequestUrls.getOrderStatusControlStructure);

export const getTransactionStatementCS = () =>
  Api.get(apiRequestUrls.getTransactionStatementControlStructure);

export const getWinnerLaggersCS = () =>
  Api.get(apiRequestUrls.getWinnerLaggersControlStructure);
