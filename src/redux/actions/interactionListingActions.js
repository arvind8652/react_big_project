import {
	getInteractionListingCsApi,
	getAllInteractionDataApi,
	getInteractionAdvancedFilterApi
} from '../../api/interactionListingApi';
import {
	SET_INTERACTION_LISTING_CS,
	SET_INTERACTION_LISTING_DATA,
	SET_INTERACTION_ADVANCED_FILTER
} from './actionTypes';
import { store } from '../configureStore';

const setData = (action, payload) => {
	return { type: action, payload: payload };
};

const setInteractionListingCs = (payload) => {
	return { type: SET_INTERACTION_LISTING_CS, payload: payload };
};

const setInteractionListingData = (payload) => {
	return { type: SET_INTERACTION_LISTING_DATA, payload: payload };
};

export const executeGetInteractionAdvancedFilter = async (type) => {
	try {
		const response = await getInteractionAdvancedFilterApi(type);
		if (response.data) {
			store.dispatch(setData(SET_INTERACTION_ADVANCED_FILTER, response.data));
		}
	} catch (error) {
		console.log('GET INTERACTION ADVANCED FILTER ERROR', error);
	}
};

export const executeGetInteractionListingCs = () => {
	return (dispatch) => {
		getInteractionListingCsApi()
			.then((res) => {
				dispatch(setInteractionListingCs(res.data.csList));
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetAllInteractionData = (
	setLocalInteractionData,
	setLoading,
	startDate = null,
	endDate = null
) => {
	return (dispatch) => {
		setLoading(true);
		getAllInteractionDataApi(startDate, endDate)
			.then((res) => {
				if (res.status === 200) {
					dispatch(setInteractionListingData(res.data));
					setLocalInteractionData(res.data.taskListResponseModel);
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};
};
