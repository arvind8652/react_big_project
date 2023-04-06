
import { getCustomerInfo, getInvestmentAccountData,  getOpportunities,getCalederData} from '../../api/portfolioOverviewApi';

import {  getRiskProfileModel, getExploreProductsDetails, getOpenOrders,getNotesData } from '../../api/portfolioOverviewApi';
import { getSecurityListDetails } from '../../api/commonApi'


import { store } from "../configureStore";


import { SET_CUSTOMER_INFO, SET_INVESTMENT_ACCOUNT_DATA, SET_OPPORTUNITIES, SET_CALEDERDATA} from './actionTypes';
import { SET_PORTFOLIO_OVERVIEW_RISK_PROFILE_MODEL, SET_PORTFOLIO_OVERVIEW_TRENDING_PRODUCTS, SET_OPEN_ORDERS_DATA,SET_NOTESDATA} from './actionTypes';


const setCustomerInfo = payload => ({
    type: SET_CUSTOMER_INFO,
    payload: payload,
});

const setCalederData = payload => ({
    type: SET_CALEDERDATA,
    payload: payload,
});


const setInvestmentAccountData = payload => ({
    type: SET_INVESTMENT_ACCOUNT_DATA,
    payload,
});


const setOpportunities = payload => ({
    type: SET_OPPORTUNITIES,
    payload ,
})

const setNotesData = payload => ({
    type: SET_NOTESDATA,
    payload ,
})

const setRiskProfileModel = payload => ({
    type: SET_PORTFOLIO_OVERVIEW_RISK_PROFILE_MODEL,
    payload,
});

export const setOpenOrders = payload => ({
    type: SET_OPEN_ORDERS_DATA,
    payload,
});

export const setExploreProductsDetails = payload => ({
    type: SET_PORTFOLIO_OVERVIEW_TRENDING_PRODUCTS,
    payload,
});


export const executeGetCustomerInfo = async (requestBody) => {
    try {
        const response = await getCustomerInfo(requestBody);
        store.dispatch(setCustomerInfo(response?.data));
    } catch (error) {
        console.log('GET CUSTOMER INFO ERROR', error);
    }
};


export const executeGetInvestmentAccountData = async (requestBody) => {
    try {
        const response = await getInvestmentAccountData(requestBody);
        store.dispatch(setInvestmentAccountData(response?.data));
    } catch (error) {
        console.log('GET INVESTMENT ACCOUNT DATA ERROR', error);
    }
};

export const executeGetOpportunity = async (requestBody) => {
    try {
        const response = await getOpportunities(requestBody);
        store.dispatch(setOpportunities(response?.data));
    } catch (error) {
        console.log('SET_OPPORTUNITIES', error)
    }
}

export const executeGetCalederData = async (requestBody) => {
    try {
        const response = await getCalederData(requestBody);
        store.dispatch(setCalederData(response?.data));
    
    } catch (error) {
        console.log('SET_CALEDERDATA', error)
    }
}

export const executeGetNotesData = async (requestBody) => {
    try {
        const response = await getNotesData(requestBody);
        store.dispatch(setNotesData(response?.data));
    } catch (error) {
        console.log('SET_NOTESDATA', error)
    }
}

export const executeGetRiskProfileModel = async (requestBody) => {
    try {
        const response = await getRiskProfileModel(requestBody);
        store.dispatch(setRiskProfileModel(response?.data));
    } catch (error) {
        console.log('GET PORTFOLIO OVERVIEW RISK PROFILE MODEL DATA', error);
    }
};

export const executeGetOpenOrders = async (postObject) => {
    try {
        const response = await getOpenOrders(postObject);
        store.dispatch(setOpenOrders(response?.data))
    } catch (error) {
        console.log('GET OPEN ORDERS ERROR', error);
    }
};

const getSecurityPostObject = array => {
    return (
        {
            data: {
                security: array?.map(e => e?.security)
            }
        }
    )
};

const getCombinedSecurityWithDetails = (detailsList, securityList) => detailsList?.map((e, idx) => {
    let newSecurity = securityList[idx] ?? {};
    return {
        ...e,
        ...newSecurity,
    };
});

export const executeGetExploreProductsDetails = async (postObject) => {
    try {
        const responseWithDetails = await getExploreProductsDetails(postObject);

        const responseWithSecurities = await getSecurityListDetails(getSecurityPostObject(responseWithDetails.data));

        const combinedData = getCombinedSecurityWithDetails(responseWithDetails.data, responseWithSecurities.data);

        store.dispatch(setExploreProductsDetails(combinedData));


    } catch (error) {
        console.log('GET EXPLORE PRODUCT DETAILS ERROR', error);
    }
};


