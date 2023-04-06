import {
	SET_PORTFOLIO_HOLDINGS_CS,
	SET_ASSET_CLASSWISE_DATA,
	SET_TOP_HOLDING,
	SET_HOLDING_AMOUNT,
	SET_ASSET_TYPEWISE,
	SET_INVESTMENT_ALLOCATION,
	SET_SECURITY_DETAIL,
	SET_STOCK_SECURITY_DETAIL
} from './actionTypes';
import {
	getPortfolioHoldingsCs,
	getAssetClasswiseData,
	getTopHolding,
	getInvestmentAllocation,
	getHoldingAmount,
	getAssettypeWise,
	getSecurityDetail,
	getStockSecurityDetail
} from '../../api/portfolioHoldingsApi';
import { store } from '../configureStore';

const setPortfolioHoldingsCs = (payload) => ({
	type: SET_PORTFOLIO_HOLDINGS_CS,
	payload
});

const setAssetClasswiseData = (payload) => ({
	type: SET_ASSET_CLASSWISE_DATA,
	payload
});

const setTopHolding = (payload) => ({
	type: SET_TOP_HOLDING,
	payload
});

const setHoldingAmount = (payload) => ({
	type: SET_HOLDING_AMOUNT,
	payload
});

const setAssettypeWise = (payload) => ({
	type: SET_ASSET_TYPEWISE,
	payload
});

const setInvestmentAllocation = (payload) => ({
	type: SET_INVESTMENT_ALLOCATION,
	payload
});

const setSecurityDetail = (payload) => ({
	type: SET_SECURITY_DETAIL,
	payload
});

const setStockSecurityDetail = (payload) => ({
	type: SET_STOCK_SECURITY_DETAIL,
	payload
});

export const executeGetPortfolioHoldingsCs = async () => {
	try {
		const response = await getPortfolioHoldingsCs();
		if (response.data) {
			store.dispatch(setPortfolioHoldingsCs(response.data));
		}
	} catch (error) {
		console.log('GET PORTFOLIO HOLDINGS CS ERROR', error);
	}
};

export const executeAssetClasswiseData = async (body) => {
	try {
		const response = await getAssetClasswiseData(body);
		if (response.data) {
			store.dispatch(setAssetClasswiseData(response.data));
		}
	} catch (error) {
		console.log('GET ASSET CLASSWISE DATA  ERROR', error);
	}
};

export const executeGetInvestmentAllocation = async (body) => {
	try {
		const response = await getInvestmentAllocation(body);
		if (response.data) {
			store.dispatch(setInvestmentAllocation(response.data));
		}
	} catch (error) {
		console.log(`${SET_INVESTMENT_ALLOCATION} ERROR`, error);
	}
};

export const executeGetTopHolding = async (body) => {
	try {
		const response = await getTopHolding(body);
		if (response.data) {
			store.dispatch(setTopHolding(response.data));
		}
	} catch (error) {
		console.log(`${SET_TOP_HOLDING} ERROR`, error);
	}
};

export const executeGetHoldingAmount = async (body) => {
	try {
		const response = await getHoldingAmount(body);
		if (response.data) {
			store.dispatch(setHoldingAmount(response.data));
		}
	} catch (error) {
		console.log(`${SET_HOLDING_AMOUNT} ERROR`, error);
	}
};

export const executeGetAssettypeWise = async (body) => {
	try {
		const response = await getAssettypeWise(body);
		if (response.data) {
			store.dispatch(setAssettypeWise(response.data));
		}
	} catch (error) {
		console.log(`${SET_ASSET_TYPEWISE} ERROR`, error);
	}
};

export const executeGetSecurityDetail = async (body) => {
	try {
		const response = await getSecurityDetail(body);
		if (response.data) {
			store.dispatch(setSecurityDetail(response.data));
		}
	} catch (error) {
		console.log(`${SET_ASSET_TYPEWISE} ERROR`, error);
	}
};

export const executeGetStockSecurityDetail = async (body) => {
	try {
		const response = await getStockSecurityDetail(body);
		if (response.data) {
			store.dispatch(setStockSecurityDetail(response.data));
		}
	} catch (error) {
		console.log(`${SET_ASSET_TYPEWISE} ERROR`, error);
	}
};
