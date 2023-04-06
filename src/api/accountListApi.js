import { apiRequestUrls } from '../config/apiConfig';
import { Api } from '../services/apiService';

export const getAllPendingAccounts = () => Api.post(apiRequestUrls.getAllPendingAccounts);

export const getAccountListingCsApi = () => Api.get(apiRequestUrls.getAccountListingCs);

export const postAccountCs = (data) => Api.post(apiRequestUrls.postAccountCs, { data: data });

export const approveAccountApi = (requestPayload) => {
	return Api.post(apiRequestUrls.approveRejectAccounts, {
		data: requestPayload
	});
};

export const rejectAccountApi = (requestPayload) => {
	return Api.post(apiRequestUrls.approveRejectAccounts, {
		data: requestPayload
	});
};
