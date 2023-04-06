import { apiRequestUrls } from '../config/apiConfig';
import { Api } from '../services/apiService';

export const getCalendarDetails = () => {
	const postObject = {
		data: {}
	};
	return Api.post(apiRequestUrls.getCalendarDetails, postObject);
};

export const getCalendarEvents = () => {
	const postObject = {
		data: {}
	};
	return Api.post(apiRequestUrls.getCalendarEvents, postObject);
};
