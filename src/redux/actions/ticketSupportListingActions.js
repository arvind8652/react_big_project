import { getAllTicketSupportListingDataApi } from '../../api/ticketSupportListingApi';
import { store } from '../configureStore';
import { SET_TICKET_SUPPORT_LISTING_DATA } from './actionTypes';

const setTicketSupportListingData = (payload) => ({
	type: SET_TICKET_SUPPORT_LISTING_DATA,
	payload
});

export const executeAllTicketSupportListingDataApi = async () => {
	let postData = {
		data: { Prospect: { Interestlevel: null, Type: null, Category: null, Source: null } }
	};
	try {
		const response = await getAllTicketSupportListingDataApi(postData);
		if (response.data) {
			let returnData = response.data;
			store.dispatch(setTicketSupportListingData(returnData));
			return returnData;
		}
	} catch (error) {
		console.log('TICKET SUPPORT LISTING ERROR', error);
	}
};
