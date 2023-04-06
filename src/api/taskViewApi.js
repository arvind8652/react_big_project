import { apiRequestUrls } from '../config/apiConfig';
import { Api } from '../services/apiService';

export const getTaskViewCsApi = () => {
	return Api.get(apiRequestUrls.getTaskViewCs);
};

export const getTaskAddCsApi = () => {
	return Api.get(apiRequestUrls.getTaskAddCs);
};

export const getTaskViewApi = (followUpId, id, activityID, isMultiOcurrance) => {
	return Api.get(
		apiRequestUrls.getTaskView +
			'followUpId=' +
			followUpId +
			'&Id=' +
			id +
			'&activityID=' +
			activityID +
			'&IsMultiOccurance=' +
			isMultiOcurrance
	);
};
export const deleteTaskApi = (id) => {
	const postObject = {
		id: [id]
	};
	return Api.post(apiRequestUrls.deleteTask, {
		data: postObject
	});
};

export const uploadTaskAttachmentApi = (attachmentdetails) => {
	return Api.post(apiRequestUrls.uploadTaskAttachment, {
		data: attachmentdetails
	});
};

export const downloadTaskAttachmentApi = (attachmentdetails) => {
	return Api.post(apiRequestUrls.downloadTaskAttachment, {
		data: attachmentdetails
	});
};
export const getTaskMiscellaneousDetailApi = (taskId) => {
	return Api.get(apiRequestUrls.getTaskMiscellaneousDetails + taskId);
};
export const getTaskAttachmentDetailApi = (taskId) => {
	return Api.get(apiRequestUrls.getTaskAttachmentDetails + taskId);
};

export const getTaskHistoryApi = (taskId) => {
	return Api.get(apiRequestUrls.getTaskHistory + taskId);
};

export const updateTaskCloseOccurrenceApi = (occurenceDetail) => {
	return Api.post(apiRequestUrls.updateTaskCloseOccurrence, {
		data: occurenceDetail
	});
};
