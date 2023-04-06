import {
	getCustomerOnboardingApi,
	getWorkflowStatusApi,
	getTimelineApi,
	getCustomerMiscellaneousApi,
	getProspectRelationsApi,
	getAttachmentDetailApi
} from '../../api/customerViewApi';
import {
	GET_CUSTOMER_VIEW_ONBOARDING_DATA,
	GET_WORKFLOW_STATUS_DATA,
	GET_TIMELINE,
	GET_ATTACHMENT_DETAILS,
	GET_CUSTOMER_MISCELLANEOUS_DETAILS,
	GET_PROSPECT_RELATION
} from './actionTypes';
import { store } from '../configureStore';

const getCustomerOnboardingData = (payload) => {
	return { type: GET_CUSTOMER_VIEW_ONBOARDING_DATA, payload: payload };
};

const getWorkflowStatusData = (payload) => {
	return { type: GET_WORKFLOW_STATUS_DATA, payload: payload };
};

const getTimelineData = (payload) => {
	return { type: GET_TIMELINE, payload: payload };
};

const getProspectRelationData = (payload) => {
	return { type: GET_PROSPECT_RELATION, payload: payload };
};

const getAttachmentDetailsData = (payload) => {
	return { type: GET_ATTACHMENT_DETAILS, payload: payload };
};

const getCustomerMiscellaneousData = (payload) => {
	return { type: GET_CUSTOMER_MISCELLANEOUS_DETAILS, payload: payload };
};

// const updateObj = (data) => {
// 	const newArr = data.map((ele) => ({
// 		...ele,
// 		stage: ele.stageName,
// 		stageMessages: ele.remarks,
// 		inputDateTime: ele.lastUpdated,
// 		stageStatus: ele.status
// 	}));
// 	return newArr;
// };
const updateHorizontalObj = (data) => {
	const newArr = data.horizontalTimeline.map((ele) => ({
		...ele,
		stage: ele.stageName,
		craetiondate: ele.lastUpdated,
		inputDateTime: ele.lastUpdated
	}));
	let tempObj = data.customerDetails;
	const customer = {
		...tempObj,
		fullName: tempObj.name,
		permCityName: tempObj.city
	};
	let finalObj = { ...data, horizontalTimeline: newArr };

	return finalObj;
};

const profileRelationDetail = (prospectRelations) => {

	//let accountData = prospectRelations;
	let filteredData1 = prospectRelations && prospectRelations.filter((item) => item.isCustomer === true);
	let filteredData2 = prospectRelations && prospectRelations.filter((item) => item.isCustomer === false);

	let d1 =
		filteredData1 &&
		filteredData1.map((item) => {
			return {
				//relation: item.relation,
				dateOfBirth: item.dob,
				fullName: item.relationName,
				email: item.email,
				contactNumber: item.mobile,
				// name: item.relationName,
				name: item.name,
				family: item.familyName,
				id: item.recordId,
				tagName: item.customerCategory,
				profileImage: item.profileImage,
				profileInitial: item.profileInitial,
				relation: item.relation,
				contactNumber: item.mobile
			};
		});
	let d2 =
		filteredData2 &&
		filteredData2.map((item) => {
			return {
				relation: item.relation,
				dateOfBirth: item.dob,
				fullName: item.relationName,
				email: item.email,
				contactNumber: item.mobile,
				dialCode: item.dialCode
			};
		});
	return { ...prospectRelations, relationDetailData: d1, relationDetailfalseData: d2 };
};

export const customerDetailsAllApi = async (customerId) => {
	let promises = [
		executeGetCustomerOnboardingData(customerId),
		executeGetWorkflowStatusData(customerId),
		executeGetTimelineData(customerId),
		executeGetProspectRelationData(customerId),
		executeGetAttachmentDetail(customerId),
		executeGetCustomerMiscellaneousData(customerId)
	];
	const data = await Promise.all(promises);
	return data
};

export const executeGetCustomerOnboardingData = (customerId) => {
	getCustomerOnboardingApi(customerId)
		.then((res) => {
			if (res.status === 200) {
				store.dispatch(getCustomerOnboardingData(res.data));
			}
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			console.log('CustomerOnboarding Action called');
		});
};

export const executeGetWorkflowStatusData = (customerId) => {
	getWorkflowStatusApi(customerId)
		.then((res) => {
			if (res.status === 200) {
				// let finalObj = updateHorizontalObj(res.data);
				store.dispatch(getWorkflowStatusData(res.data));
			}
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			console.log('called workflow');
		});
};

export const executeGetTimelineData = (customerId) => {
	getTimelineApi(customerId)
		.then((res) => {
			if (res.status === 200) {
				store.dispatch(getTimelineData(res.data));
			}
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			console.log('called timeline');
		});
};

export const executeGetProspectRelationData = (customerId) => {
	getProspectRelationsApi(customerId)
		.then((res) => {
			if (res.status === 200) {
				let finalObj3 = profileRelationDetail(res.data);
				store.dispatch(getProspectRelationData(finalObj3));
			}
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			console.log('called prospect relation');
		});
};

export const executeGetAttachmentDetail = (customerId) => {
	getAttachmentDetailApi(customerId)
		.then((res) => {
			if (res.status === 200) {
				store.dispatch(getAttachmentDetailsData(res.data));
			}
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			console.log('called attachment details');
		});
};

export const executeGetCustomerMiscellaneousData = (customerId) => {
	getCustomerMiscellaneousApi(customerId)
		.then((res) => {
			if (res.status === 200) {
				store.dispatch(getCustomerMiscellaneousData(res.data));
			}
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			console.log('Called Miscellaneous');
		});
};

export const excecuteGetDocumentDetail = async (body) => {
	console.log('nothing');
};
