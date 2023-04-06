import { apiRequestUrls } from '../config/apiConfig';
import { Api } from '../services/apiService';

export const getTicketSupportCreateCs = () => Api.get(apiRequestUrls.getTicketSupportCreateCs);

export const postTicketCreateApi = (postData) =>
	Api.post(apiRequestUrls.postTicketCreate, postData);

export const getTicketSupportOverview = () => {
	return Api.post(apiRequestUrls.getTicketSupoortOverview);
};

export const getDependentDataApi = (postObject) =>
	Api.post(apiRequestUrls.getDependentData, postObject);
