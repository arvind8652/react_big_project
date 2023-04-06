import { apiRequestUrls } from '../config/apiConfig';
import { Api } from '../services/apiService';

export const getPortfolioHoldingsCs = () => Api.get(apiRequestUrls.getPortfolioHoldingsCs);

export const getAssetClasswiseData = (postBody) => {
	return Api.post(apiRequestUrls.getAssetClasswiseData, { data: postBody });
};

export const getTopHolding = (postBody) => {
	return Api.post(apiRequestUrls.getTopHolding, { data: postBody });
};

export const getSecurityDetail = (postBody) => {
	return Api.post(apiRequestUrls.getSecurityDetail, { data: postBody });
};

export const getStockSecurityDetail = (postBody) => {
	return Api.post(apiRequestUrls.getSecurityDetail, { data: postBody });
};

export const getInvestmentAllocation = (postBody) => {
	return Api.post(apiRequestUrls.getInvestmentAllocation, { data: postBody });
};

export const getHoldingAmount = (postBody) => {
	return Api.post(apiRequestUrls.getHoldingAmount, { data: postBody });
};

export const getAssettypeWise = (postBody) => {
	return Api.post(apiRequestUrls.getAssettypeWise, { data: postBody });
};
