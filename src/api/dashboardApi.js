import { apiRequestUrls } from '../config/apiConfig';
import { Api } from '../services/apiService';

export const getLeftPanelData = () => {
	return Api.get(apiRequestUrls.getLeftPanel);
};

export const getClientLeftPanelData = (ClientID) => {
	const postObject = {
		data: {}
	};
	return Api.get(apiRequestUrls.getClientLeftPanel + ClientID, postObject);
};
