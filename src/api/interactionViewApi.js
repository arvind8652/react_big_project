import { apiRequestUrls } from '../config/apiConfig';
import { CONSTANTS } from '../constants/constants';
import { Api } from '../services/apiService';

export const getInteractionViewCsApi = () => {
	return Api.get(apiRequestUrls.getInteractionViewCs);
};

export const getInteractionAddCsApi = () => {
	return Api.get(apiRequestUrls.getInteractionAddCs);
};

export const getInteractionViewApi = (interactionId, id, activityID, isMultiOcurrance) => {
	return Api.get(
		apiRequestUrls.getInteractionView +
			'followUpID=' +
			interactionId +
			'&Id=' +
			id +
			'&activityID=' +
			activityID +
			'&IsMultiOccurance=' +
			isMultiOcurrance
	);
};

export const deleteInteractionApi = (interactionId) => {
	const postObject = {
		followUpID: interactionId
	};
	return Api.post(apiRequestUrls.deleteInteraction, {
		data: postObject
	});
};
export const deleteInteractionApiwithId = (interactionId) => {
	const postObject = {
		id: [interactionId]
	};
	return Api.post(apiRequestUrls.deleteInteraction, {
		data: postObject
	});
};

export const getAttachmentDetailApi = (interactionId) => {
	return Api.get(
		apiRequestUrls.getAttachmentDetails(CONSTANTS.progNames.INTERACTIONADD, interactionId)
	);
};

export const getMiscellaneousDetailApi = (interactionId) => {
	return Api.get(
		apiRequestUrls.getInteractionMiscellaneousDetails +
			'RefId=' +
			interactionId +
			'&progName=ACTIVITYADD'
	);
};

export const getInteractionVerticalTimelineApi = (interactionId) => {
	return Api.post(apiRequestUrls.getVerticalTimeline + interactionId);
};

export const uploadAttachmentApi = (attachmentDetails) => {
	return Api.post(apiRequestUrls.uploadAttachment, {
		data: attachmentDetails
	});
};

export const downloadAttachmentApi = (attachmentDetails) => {
	return Api.post(apiRequestUrls.downloadAttachment, {
		data: attachmentDetails
	});
};

export const getInteractionHistoryApi = (interactionId) => {
	return Api.get(apiRequestUrls.getInteractionHistory + interactionId);
};

export const updateCloseOccurrenceApi = (occurenceDetail) => {
	return Api.post(apiRequestUrls.updateInteractionCloseOccurrence, {
		data: occurenceDetail
	});
};
export const postInteractionOccureanceApi = (formData) => {
	return Api.post(apiRequestUrls.postOccurrence, { data: formData });
};
