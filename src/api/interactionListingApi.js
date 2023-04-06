import { apiRequestUrls } from '../config/apiConfig';
import { Api } from '../services/apiService';

export const getInteractionListingCsApi = () => {
	return Api.get(apiRequestUrls.getInteractionListingCs);
};

export const getAllInteractionDataApi = (startDate, endDate) => {
	const postObject = {
		data: {
			taskScheduler: {},
			activityNature: 'I',
			followUpActivityStatus: endDate ? 'C' : 'O',
			startDate: startDate ? startDate : null,
			endDate: endDate ? endDate : null
		}
	};
	return Api.post(apiRequestUrls.getAllInteraction, postObject);
};
export const getInteractionAdvancedFilterApi = (type) => {
	const postObject = {
		data: {
			taskScheduler: {},
			activityNature: type,
			followUpActivityStatus: 'O',
			startDate: null,
			endDate: null
		}
	};
	return Api.post(apiRequestUrls.getInteractionAdvFilter, postObject);
};

export const deleteSelectedInteractionApi = (InteractionIdArray) => {
	const postObject = {
		data: {
			id: InteractionIdArray
		}
	};
	return Api.post(apiRequestUrls.deleteSelectedInteraction, postObject);
};

export const deleteSelectedInteractionApiwithAllOccurrence = (InteractionIdArray) => {
	const postObject = {
		data: {
			followUpID: InteractionIdArray
		}
	};
	return Api.post(apiRequestUrls.deleteSelectedInteraction, postObject);
};
