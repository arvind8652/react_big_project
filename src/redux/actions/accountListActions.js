import { SET_ACCOUNT_LIST, SET_ACCOUNT_LISTING_CS } from './actionTypes';
import { getAllPendingAccounts, getAccountListingCsApi } from '../../api/accountListApi';
import { store } from '../configureStore';

const setAccountList = (payload) => ({
	type: SET_ACCOUNT_LIST,
	payload
});

const setAccountListingCs = (payload) => {
	return { type: SET_ACCOUNT_LISTING_CS, payload: payload };
};

export const executeGetAllPendingAccounts = (setLocalAccountData, setLoading) => {
	return (dispatch) => {
		setLoading(true);
		getAllPendingAccounts()
			.then((res) => {
				if (res.status === 200) {
					dispatch(setAccountList(res.data));
					setLocalAccountData(res.data.accountResponseModel);
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

export const executeAccountListingCs = () => {
	return (dispatch) => {
		getAccountListingCsApi()
			.then((res) => {
				dispatch(setAccountListingCs(res.data.csList));
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
