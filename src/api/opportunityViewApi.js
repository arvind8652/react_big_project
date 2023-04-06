import { apiRequestUrls } from '../config/apiConfig';
import { Api } from '../services/apiService';

export const getOpportunityViewCsApi = () => {
	return Api.get(apiRequestUrls.getOpportunityViewCs);
};

export const getOpportunityAddCsApi = () => {
	return Api.get(apiRequestUrls.getOpportunityAddCs);
};

export const getOpportunityViewApi = (opportunityId) => {
	return Api.get(apiRequestUrls.getOpportunityView + opportunityId);
};

export const deleteOpportunityApi = (opportunityId) => {
	const postObject = {
		OpportunityID: [opportunityId]
	};

	return Api.post(apiRequestUrls.deleteOpportunity, {
		data: postObject
	});
};

export const getAttachmentDetailApi = (opportunityId) => {
	return Api.get(apiRequestUrls.getOpportunityAttachmentDetails + opportunityId);
};

export const getMiscellaneousDetailApi = (opportunityId) => {
	return Api.get(apiRequestUrls.getOpportunityMiscellaneousDetails + opportunityId);
};

export const getProbablityByStageApi = (stage) => {
	return Api.post(apiRequestUrls.getProbablityByStage + stage);
};

export const getHorizontalTimelineApi = (opportunityId) => {
	const opportunityID = {
		OpportunityId: opportunityId
	};
	const postObject = {
		Opportunity: opportunityID
	};

	return Api.post(apiRequestUrls.getHorizontalTimeline, {
		data: postObject
	});
};

export const getVerticalTimelineApi = (opportunityId) => {
	const opportunityID = {
		OpportunityId: opportunityId
	};
	const postObject = {
		Opportunity: opportunityID
	};

	return Api.post(apiRequestUrls.getOpportunityVerticalTimeline, {
		data: postObject
	});
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

export const updateOpportunityStageDetailApi = (stageDetail) => {
	const postObject = {
		Opportunity: stageDetail
	};

	return Api.post(apiRequestUrls.updateOpportunityStageDetail, {
		data: postObject
	});
};

export const getOpportunityDependentDataApi = (status) => {
	const postObject = {
		FieldListID: 20042,
		dependentValue: {
			FIELD1: status
		}
	};

	return Api.post(apiRequestUrls.getDependentData, {
		data: postObject
	});
};

export const postNotesOnOpportunityViewApi = (opportunityId, comment) => {
	const postObject = {
		note: {
			id: null,
			noteId: null,
			noteTitle: null,
			noteText: comment,
			isPin: false,
			isArchive: false,
			archiveDate: null,
			recType: null,
			version: null,
			inputtedBy: null,
			inputDateTime: null, //'2022-06-02T09:31:23.801Z',
			authorizedBy: null,
			authorizedDate: null, //'2022-06-02T09:31:23.801Z',
			authorizedRemarks: null,
			status: null,
			colVer: null,
			ProgName: 'OPPORTUNITYADD',
			notesDetails: [
				{
					id: null,
					noteId: null,
					refType: 'OPPORTUNITY',
					refId: opportunityId,
					recType: null,
					version: null,
					inputtedBy: null,
					inputDateTime: null, //'2022-06-02T09:31:23.801Z',
					authorizedBy: null,
					authorizedDate: null, //'2022-06-02T09:31:23.801Z',
					authorizedRemarks: null,
					status: null,
					profileImage: null,
					profileInitials: null,
					name: null
				}
			]
		}
	};

	return Api.post(apiRequestUrls.postNotesOnOpportunityView, {
		data: postObject
	});
};

export const getNotesOnOpportunityViewApi = (opportunityId) => {
	const postObject = {
		note: {
			noteId: null,
			refId: opportunityId,
			refType: 'OPPORTUNITY'
		}
	};

	return Api.post(apiRequestUrls.getNotesOnOpportunityView, { data: postObject });
};
export const getNextOrPreviousOpportunityViewApi = (filter) => {};
