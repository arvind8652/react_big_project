import {
	getExploreProductCS,
	getCustomerDetails,
	placeOrder,
	getClientAddressDetails,
	getDefaultBankAccountAndCustodian,
	getExploreProduct
} from "../../api/primaryMarketApi";

import {
	getClientInfo,
	getClientAccounts,
	getSecuritiesForIssuer,
	getSecurityListDetails,
	getDependentLocationDataApi,
	getCreditAccounts,
} from "../../api/commonApi";

import { store } from "../configureStore";

import { SET_PRIMARY_MARKET_CONTROL_STRUCTURE, SET_PRIMARY_ORDER, SET_CUSTOMER_DATA } from "./actionTypes";

const setPrimaryMarketCs = (payload) => ({
	type: SET_PRIMARY_MARKET_CONTROL_STRUCTURE,
	payload,
});

export const setPrimaryOrder = (payload) => ({
	type: SET_PRIMARY_ORDER,
	payload,
});

export const setCustomerDetails = (payload) => ({
	type: SET_CUSTOMER_DATA,
	payload,
});

export const executeControlStructure = async (postObject) => {
	try {
		const response = await getExploreProductCS(postObject);
		if (response.data) {
			let returnData = response.data?.csList[0]?.controlStructureField;
			store.dispatch(setPrimaryMarketCs(returnData));
			return returnData;
		}
	} catch (error) {
		console.log("POST WATCH LIST ERROR", error);
	}
};


export const executeExploreProduct = async (postObject) => {
	try {
		const response = await getExploreProduct(postObject);
		if (response.data) {
			return response.data;
		}
	} catch (error) {
		console.log("Explore Product", error);
	}
};



export const executeGetClientInfo = async () => await getClientInfo({ params: {} });

export const executeGetClientAccounts = async (client_id) => (await getClientAccounts(client_id)).data.lookUpValues;

export const executeGetSecuritiesForIssuer = async (issuerId, asset_group) =>
	(await getSecuritiesForIssuer(issuerId, asset_group)).data.lookUpValues;

export const executeGetCreditAccounts = async (schemeId) => (await getCreditAccounts(schemeId)).data;

export const executeGetSecurityCard = async (securityId, schemeId, marketAccess, clientId) => {
	let postObj;
	if (marketAccess) {
		postObj = {
			data: {
				security: [securityId],
				scheme: schemeId,
				marketAccess: marketAccess,
				clientId: clientId,
			},
		};
	} else {
		postObj = {
			data: {
				security: [securityId],
				scheme: schemeId,
			},
		};
	}

	return await (
		await getSecurityListDetails(postObj)
	).data;
};

export const executeGetDependentLocationDataApi = async (value, mode) =>
	(await getDependentLocationDataApi(value, mode)).data.lookUpValues;

export const executeGetCustomerDetails = async (selectedCustomerId) => {
	let response = await getCustomerDetails("Customer", selectedCustomerId);
	store.dispatch(setCustomerDetails(await response.data));
	return await response.data;
};

export const executePlaceOrder = async (postData) => {
	let postObj = {
		data: postData,
	};

	return await placeOrder(postObj);
};

export const executeGetClientAddressDetails = async (clientId, selectedOption) => {
	let postObj = {
		data: {
			ClientId: clientId,
			MailingAddress: selectedOption,
		},
	};
	return await (
		await getClientAddressDetails(postObj)
	).data;
};

export const executeGetDefaultBankAccountAndCustodian = async (scheme, security) => {
	const postObject = {
		data: {
			ProgName: "ORDERPRADD",
			Scheme: scheme,
			TranType: "PMIPO",
			Security: security,
		},
	};

	return await getDefaultBankAccountAndCustodian(postObject);
};
