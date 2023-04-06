import { apiRequestUrls } from '../config/apiConfig';
import { Api } from '../services/apiService';

export const getTaskListingCsApi = () => {
	return Api.get(apiRequestUrls.getTaskListingCs);
};

export const getAllTaskDataApi = (startDate, endDate) => {
	const postObject = {
		data: {
			taskScheduler: {},
			activityNature: 'T',
			followUpActivityStatus: endDate ? 'C' : 'O',
			startDate: startDate ? startDate : null,
			endDate: endDate ? endDate : null
		}
	};
	return Api.post(apiRequestUrls.getAllTask, postObject);
};

export const deleteSelectedTaskApi = (TaskIdArray) => {
	const postObject = {
		data: {
			id: TaskIdArray
		}
	};
	return Api.post(apiRequestUrls.deleteSelectedTask, postObject);
};

export const deleteSelectedTaskApiwithAllOccurrence = (TaskIdArray) => {
	const postObject = {
		data: {
			followUpID: TaskIdArray
		}
	};
	return Api.post(apiRequestUrls.deleteSelectedTask, postObject);
};
