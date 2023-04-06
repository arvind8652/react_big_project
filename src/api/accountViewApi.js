import { apiRequestUrls } from '../config/apiConfig';
import { Api } from '../services/apiService';

export const getAccountDetailsApi = (accoundID) => {
	const postObject = {
		refID: accoundID
	};
	return Api.post(apiRequestUrls.getAccountDetailsData, {
		data: postObject
	});
};

export const getDocumentDetailsApi = (accoundID) => {
	const postObject = {
		AccountNature: 'AR',
		AccountClassification: 'CB',
		AccountType: 'DB',
		RefID: accoundID
	};
	return Api.post(apiRequestUrls.getDocumentDetails, {
		data: postObject
	});
};

export const getTimelineDetailsApi = (accoundID) => {
	const postObject = {
		refType: 'ACCOUNTREQADD',
		refID: accoundID
	};
	return Api.post(apiRequestUrls.getTimelineData, {
		data: postObject
	});
};

export const getAttchementDataApi = (attechmentId) => {
	return Api.get(apiRequestUrls.getAttachmentDetils + attechmentId);
};

export const getMiscellaneousDataApi = (attechmentId) => {
	return Api.get(apiRequestUrls.getAccountMiscellaneous + attechmentId);
};

export const updateAccountStatusApi = (postObject) => {
	return Api.post(apiRequestUrls.accountStatusUpdate, {
		data: postObject
	});
};

// export const deleteAccountApi = (postObject) => {
//   return Api.post(apiRequestUrls.deleteAccount, {
//     data: postObject,
//   });
// };

export const deleteAccountApi = (payload) => {
	return Api.post(apiRequestUrls.deleteAccount, {
		data: payload
	});
};

export const profileImageApi = (accoundID) => {
	return Api.post(apiRequestUrls.AccountProfileImage(accoundID));
};

export const getOwnershipDetails = (ClientId) => {
	const postObject = {
		data: {
			ClientId: ClientId
		}
	};

	return Api.post(apiRequestUrls.getOwnershipDetails, postObject);
};
