import {
	getDependentDataApi,
	getTicketSupportCreateCs,
	postTicketCreateApi
} from '../../api/ticketSupportCreateApi';
import { store } from '../configureStore';
import { SET_TICKET_SUPPORT_CONTROL_STRUCTURE } from './actionTypes';

const setTicketSupportCs = (payload) => ({
	type: SET_TICKET_SUPPORT_CONTROL_STRUCTURE,
	payload
});
export const executeControlStructure = async (postObject) => {
	try {
		const response = await getTicketSupportCreateCs(postObject);
		if (response.data) {
			let returnData = response.data?.csList;
			store.dispatch(setTicketSupportCs(returnData));
			return returnData;
		}
	} catch (error) {
		console.log('CONTROL STRUCTURE ERROR', error);
	}
};

export const executePostTicketSupportData = async (postData) => {
	let postObj = {
		data: postData
	};
	return await postTicketCreateApi(postObj);
};

export const executeDependentDataApi = async (fieldListID, dependentValue) => {
	const postObject = {
		data: {
			fieldListID: fieldListID,
			// progName: null,
			progName: 'SERVICETKT',
			dependentValue: dependentValue
		}
	};
	try {
		const response = await getDependentDataApi(postObject);
		return response;
	} catch (error) {
		console.log('DEPENDENT CONTROL ERROR', error);
	}
};
