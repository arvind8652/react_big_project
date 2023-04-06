import { getCustomerListingCsApi, getAllCustomersDataApi } from '../../api/customerListingApi';
import { SET_CUSTOMER_LISTING_CS, SET_CUSTOMER_LISTING_DATA } from './actionTypes';

const setCustomerListingCs = (payload) => {
	return { type: SET_CUSTOMER_LISTING_CS, payload: payload };
};

const setCustomerListingData = (payload) => {
	return { type: SET_CUSTOMER_LISTING_DATA, payload: payload };
};

export const executeGetCustomerListingCs = () => {
	return (dispatch) => {
		getCustomerListingCsApi()
			.then((res) => {
				dispatch(setCustomerListingCs(res.data.csList));
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetAllCustomersData = (setLocalCustomerDatas, setLoading) => {
	return (dispatch) => {
		setLoading(true);
		getAllCustomersDataApi()
			.then((res) => {
				if (res.status === 200) {
					dispatch(setCustomerListingData(res.data));
					setLocalCustomerDatas(res.data.lstCustomerResponseModel);
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

export const getAllCustomersData = (setLocalCustomerDatas) => {
	return (dispatch) => {
		getAllCustomersDataApi()
			.then((res) => {
				if (res.status === 200) {
					dispatch(setCustomerListingData(res.data));
					setLocalCustomerDatas(res.data.lstCustomerResponseModel);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
