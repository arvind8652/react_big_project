import {
	getAccountDetailsApi,
	getAttchementDataApi,
	getMiscellaneousDataApi,
	getTimelineDetailsApi,
	updateAccountStatusApi
} from '../../api/accountViewApi';
import {
	SET_ACCOUNT_DETAILS_DATA,
	SET_ATTACHMENT_DATA,
	SET_TIMELINE_DETAILS_DATA,
	SET_MISCELLANEOUS_DATA
} from './actionTypes';
import { store } from '../configureStore';
import { getCustomerDetailApi } from '../../api/leadViewApi';

const setData = (action, payload) => {
	return { type: action, payload: payload };
};

const updateObj = (data) => {
	const newArr = data.map((ele) => ({
		...ele,
		stage: ele.stageName,
		stageMessages: ele.remarks,
		inputDateTime: ele.lastUpdated,
		stageStatus: ele.status
	}));
	return newArr;
};

const updateHorizontalObj = (data) => {
	const newArr = data?.horizontalTimeline?.map((ele) => ({
		...ele,
		stage: ele?.stageName,
		craetiondate: ele?.lastUpdated,
		inputDateTime: ele?.lastUpdated
	}));
	let tempObj = data?.customerDetails;
	const customer = {
		...tempObj,
		fullName: tempObj?.name,
		permCityName: tempObj?.city
	};
	let finalObj = { ...data, horizontalTimeline: newArr };

	return finalObj;
};

export const accountDetailsAllApi = async (accoundID) => {
	let promises = [
		accountDetailsData(accoundID),
		getTimelineDetails(accoundID),
		getAttchementData(accoundID),
		getMiscellaneousData(accoundID)
	];
	const data = await Promise.all(promises);
};

export const accountDetailsData = (accoundID) => {
	getAccountDetailsApi(accoundID)
		.then((res) => {
			let finalObj = updateHorizontalObj(res.data);
			store.dispatch(setData(SET_ACCOUNT_DETAILS_DATA, finalObj));
		})
		.catch((err) => {
			console.log(err);
		});
};

export const getTimelineDetails = (accoundID) => {
	getTimelineDetailsApi(accoundID)
		.then((res) => {
			let resp = updateObj(res.data);
			store.dispatch(setData(SET_TIMELINE_DETAILS_DATA, resp));
		})
		.catch((err) => {
			console.log(err);
		});
};

export const getAttchementData = (attechmentId) => {
	getAttchementDataApi(attechmentId)
		.then((res) => {
			store.dispatch(setData(SET_ATTACHMENT_DATA, res.data));
		})
		.catch((err) => {
			console.log(err);
		});
};

export const getMiscellaneousData = (attechmentId) => {
	getMiscellaneousDataApi(attechmentId)
		.then((res) => {
			store.dispatch(setData(SET_MISCELLANEOUS_DATA, res.data));
		})
		.catch((err) => {
			console.log(err);
		});
};

export const updateAccountStatus = async (payload) => {
	try {
		let resp = await updateAccountStatusApi(payload);
		return resp.data;
	} catch (error) {
		console.log(error);
	}
};
