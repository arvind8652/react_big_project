import { apiRequestUrls } from '../config/apiConfig';
import { CONSTANTS } from '../constants/constants';
import { Api } from '../services/apiService';

export const getCustomerOnboardingApi = (customerId) => {
	const postObject = {
		refType: 'CLIENTREQADD',
		refID: customerId
	};
	return Api.post(apiRequestUrls.getCustomerOnboardingView, {
		data: postObject
	});
};

export const getWorkflowStatusApi = (customerId) => {
	const postObject = {
		refType: 'CLIENTREQADD',
		refID: customerId
	};
	return Api.post(apiRequestUrls.getWorkflowStatus, {
		data: postObject
	});
};

export const getTimelineApi = (customerId) => {
	const postObject = {
		refType: 'CLIENTREQADD',
		refID: customerId
	};
	return Api.post(apiRequestUrls.getCustomerViewTimeline, {
		data: postObject
	});
};

export const getCustomerMiscellaneousApi = (RefId) => {
	return Api.get(apiRequestUrls.getCustomerMiscellaneous + RefId);
};

export const getProspectRelationsApi = (customerId, refType = 'CLIENTREQADD') => {
	const postObject = {
		refID: customerId,
		refType: refType
	};
	return Api.post(apiRequestUrls.getCustomerViewProspectRelations, {
		data: postObject
	});
};

export const getAttachmentDetailApi = (customerId) => {
	return Api.get(apiRequestUrls.getCustomerAttachmentDetails + customerId);
};
export const getProspectAttachmentDetailApi = (prospectId) => {
	return Api.get(apiRequestUrls.getProspectAttachmentDetails + prospectId);
};

export const downloadAttachmentApi = (attachmentDetails) => {
	return Api.post(apiRequestUrls.downloadAttachments, {
		data: attachmentDetails
	});
};

export const uploadAttachmentApi = (attachmentDetails) => {
	return Api.post(apiRequestUrls.uploadFiles, {
		data: attachmentDetails
	});
};

// export const deleteClientApi = (customerId) => {
// 	const postObject = {
// 		lstRefID: [ customerId ]
// 	};
// 	return Api.post(apiRequestUrls.DeleteClient, {
// 		data: postObject
// 	});
// };

export const deleteClientApi = (postObject) => {
	return Api.post(apiRequestUrls.DeleteClient, {
		data: postObject
	});
};

export const approveRejectCustomer = (requestPayload) => {
	return Api.post(apiRequestUrls.approveRejectCustomers, {
		data: requestPayload
	});
};
export const terminateCustomer = (requestPayload) => {
	return Api.post(apiRequestUrls.terminateCustomer, {
		data: requestPayload
	});
};
export const upgradeOrDownGradeCustomer = (requestPayload) => {
	return Api.post(apiRequestUrls.upgradeOrDownGradeCustomer, {
		data: requestPayload
	});
};

export const getNextOrPreviousCustomerViewApi = (filter) => {};
