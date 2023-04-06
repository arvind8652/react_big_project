import { apiRequestUrls } from '../config/apiConfig';
import { Api } from '../services/apiService';

export const getUserInfoData = (bDate) => {
	const postObject = {
		data: {
			businessDate: bDate
		}
	};
	return Api.post(apiRequestUrls.getUserInfoData, postObject);
};

export const getBranchUserInfo = (bDate) => {
	const postObject = {
		data: {
			businessDate: bDate
		}
	};
	return Api.post(apiRequestUrls.getBranchUserInfoData, postObject);
};

export const getNotesData = (bDate) => {
	const postObject = {
		data: {
			businessDate: bDate
		}
	};
	return Api.post(apiRequestUrls.getNotesData, postObject);
};

export const getTopFeedData = (bDate) => {
	const postObject = {
		data: {
			businessDate: bDate
		}
	};
	return Api.post(apiRequestUrls.getTopFeedData, postObject);
};

export const getActivityData = (bDate) => {
	const postObject = {
		data: {
			businessDate: '2020-12-06'
		}
	};
	return Api.post(apiRequestUrls.getActivityData, postObject);
};

export const getActivityPortfolioData = (bDate, clientId) => {
	const postObject = {
		data: {
			businessDate: bDate,
			clientId: clientId
		}
	};
	return Api.post(apiRequestUrls.getActivityData, postObject);
};

export const getInvestmentCartData = (bDate) => {
	const postObject = {
		data: {
			businessDate: bDate
		}
	};
	return Api.post(apiRequestUrls.getInvestmentCartData, postObject);
};

export const getTopCustomersData = (bDate) => {
	const postObject = {
		data: {
			businessDate: bDate
		}
	};
	return Api.post(apiRequestUrls.getTopCustomersData, postObject);
};

export const getOpenOrdersData = (bDate) => {
	const postObject = {
		data: {
			businessDate: bDate
			// businessDate: "2020-12-06",
		}
	};
	return Api.post(apiRequestUrls.getOpenOrdersData, postObject);
};

export const getRecentProspectsData = (bDate) => {
	const postObject = {
		data: {
			businessDate: bDate
		}
	};
	return Api.post(apiRequestUrls.getRecentProspectsData, postObject);
};

export const getAumTrendData = (bDate) => {
	const postObject = {
		data: {
			businessDate: bDate
		}
	};
	return Api.post(apiRequestUrls.getAumTrendData, postObject);
};

export const getRevenueTrendData = (bDate) => {
	const postObject = {
		data: {
			businessDate: bDate
		}
	};
	return Api.post(apiRequestUrls.getRevenueTrendData, postObject);
};

export const getRelationshipTrendData = (bDate) => {
	const postObject = {
		data: {
			businessDate: bDate
		}
	};
	return Api.post(apiRequestUrls.getRelationshipTrendData, postObject);
};

export const getExpectedBusinessData = (bDate) => {
	const postObject = {
		data: {
			businessDate: bDate
		}
	};
	return Api.post(apiRequestUrls.getExpectedBusinessData, postObject);
};

export const getTrendingProductsData = (bDate) => {
	const postObject = {
		data: {
			businessDate: bDate
		}
	};
	return Api.post(apiRequestUrls.getTrendingProductsData, postObject);
};

export const getHighValueDealsData = () => {
	return Api.post(apiRequestUrls.getHighValueDealsData);
};

export const getInvestmentCartMandateData = (bDate) => {
	const postObject = {
		data: {
			businessDate: bDate
		}
	};
	return Api.post(apiRequestUrls.getInvestmentCartMandateData, postObject);
};

export const getPlacedMandateData = (bDate) => {
	const postObject = {
		data: {
			businessDate: bDate
		}
	};
	return Api.post(apiRequestUrls.getPlacedMandatesData, postObject);
};

export const getUpcomingOrdersData = (bDate) => {
	const postObject = {
		data: {
			businessDate: bDate
		}
	};
	return Api.post(apiRequestUrls.getUpcomingOrdersData, postObject);
};

export const getPerformanceData = (type, businessDate) => {
	const postObject = {
		data: {
			businessDate: businessDate,
			period: type
		}
	};
	return Api.post(apiRequestUrls.getPerformanceData, postObject);
};

export const getCRMHomeControlStructure = () => {
	return Api.get(apiRequestUrls.getCRMHomeCS);
};

export const getSecurityListDetails = (securityList) => {
	const postObject = {
		data: {
			security: securityList
		}
	};
	return Api.post(apiRequestUrls.getSecurityList, postObject);
};

export const getExploreProduct = (exploreProductReqObj) => {
	const postObject = {
		data: {
			...exploreProductReqObj
		}
	};
	return Api.post(apiRequestUrls.getExploreProductsDetails, postObject);
};
