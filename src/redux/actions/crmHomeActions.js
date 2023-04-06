import {
	getUserInfoData,
	getNotesData,
	getTopFeedData,
	getActivityData,
	getActivityPortfolioData,
	getInvestmentCartData,
	getTopCustomersData,
	getOpenOrdersData,
	getRecentProspectsData,
	getAumTrendData,
	getRevenueTrendData,
	getRelationshipTrendData,
	getExpectedBusinessData,
	getTrendingProductsData,
	getHighValueDealsData,
	getInvestmentCartMandateData,
	getPlacedMandateData,
	getUpcomingOrdersData,
	getPerformanceData,
	getBranchUserInfo,
	getCRMHomeControlStructure,
	getSecurityListDetails,
	getExploreProduct
} from '../../api/crmHomeApi.js';

import {
	SET_USER_INFO_DATA,
	SET_NOTES_DATA,
	SET_TOP_FEED_DATA,
	SET_ACTIVITY_DATA,
	SET_INVESTMENT_CART_DATA,
	SET_TOP_CUSTOMERS_DATA,
	SET_OPEN_ORDERS_DATA,
	SET_RECENT_PROSPECTS_DATA,
	SET_AUM_TREND_DATA,
	SET_REVENUE_TREND_DATA,
	SET_RELATIONSHIP_TREND_DATA,
	SET_EXPECTED_BUSINESS_DATA,
	SET_TRENDING_PRODUCTS_DATA,
	SET_HIGH_VALUE_DEALS_DATA,
	SET_INVESTMENT_CART_MANDATE_DATA,
	SET_PLACED_MANDATE_DATA,
	SET_UPCOMING_ORDERS_DATA,
	SET_PERFORMANCE_DATA,
	SET_BRANCH_USER_INFO_DATA,
	SET_CRMHOME_CS,
	SET_SECURITY_LIST,
	SET_EXPLORE_PRODUCT_LIST
} from './actionTypes';

import { store } from '../configureStore';
import { getPortfolioActivityGraph } from '../../api/accountDrilldownApi.js';

export const setUserInfoData = (payload) => {
	return { type: SET_USER_INFO_DATA, payload: payload };
};

export const setBranchUserInfo = (payload) => {
	return { type: SET_BRANCH_USER_INFO_DATA, payload: payload };
};

export const setNotesData = (payload) => {
	return { type: SET_NOTES_DATA, payload: payload };
};

export const setTopFeedData = (payload) => {
	return { type: SET_TOP_FEED_DATA, payload: payload };
};

export const setActivityData = (payload) => {
	return { type: SET_ACTIVITY_DATA, payload: payload };
};

export const setInvestmentCartData = (payload) => {
	return { type: SET_INVESTMENT_CART_DATA, payload: payload };
};

export const setTopCustomersData = (payload) => {
	return { type: SET_TOP_CUSTOMERS_DATA, payload: payload };
};

export const setOpenOrdersData = (payload) => {
	return { type: SET_OPEN_ORDERS_DATA, payload: payload };
};

export const setRecentProspectsData = (payload) => {
	return { type: SET_RECENT_PROSPECTS_DATA, payload: payload };
};

export const setAumTrendData = (payload) => {
	return { type: SET_AUM_TREND_DATA, payload: payload };
};

export const setRevenueTrendData = (payload) => {
	return { type: SET_REVENUE_TREND_DATA, payload: payload };
};

export const setRelationshipTrendData = (payload) => {
	return { type: SET_RELATIONSHIP_TREND_DATA, payload: payload };
};

export const setExpectedBusinessData = (payload) => {
	return { type: SET_EXPECTED_BUSINESS_DATA, payload: payload };
};

export const setTrendingProductsData = (payload) => {
	return { type: SET_TRENDING_PRODUCTS_DATA, payload: payload };
};

export const setHighValueDealsData = (payload) => {
	return { type: SET_HIGH_VALUE_DEALS_DATA, payload: payload };
};

export const setInvestmentCartMandateData = (payload) => {
	return { type: SET_INVESTMENT_CART_MANDATE_DATA, payload: payload };
};

export const setPlacedMandateData = (payload) => {
	return { type: SET_PLACED_MANDATE_DATA, payload: payload };
};

export const setUpcomingOrdersData = (payload) => {
	return { type: SET_UPCOMING_ORDERS_DATA, payload: payload };
};

export const setPerformanceData = (payload) => {
	return { type: SET_PERFORMANCE_DATA, payload: payload };
};

export const setCRMHomeControlStructure = (payload) => {
	return { type: SET_CRMHOME_CS, payload: payload };
};

export const setSecurityListDetails = (payload) => {
	return { type: SET_SECURITY_LIST, payload: payload };
};

export const setExploreProduct = (payload) => {
	return { type: SET_EXPLORE_PRODUCT_LIST, payload: payload };
};

export const executeGetUserInfoData = (prevDate) => {
	return (dispatch) => {
		getUserInfoData(prevDate)
			.then((res) => {
				if (res.status === 200) {
					dispatch(setUserInfoData(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetBranchUserInfo = async (prevDate) => {
	try {
		const response = await getBranchUserInfo(prevDate);
		if (response.data) {
			store.dispatch(setBranchUserInfo(response.data));
		}
	} catch (error) {
		console.log('executeGetBranchUserInfo ERROR', error);
	}
};

export const executeGetNotesData = () => {
	return (dispatch) => {
		getNotesData()
			.then((res) => {
				if (res.status === 200) {
					dispatch(setNotesData(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetTopFeedData = () => {
	return (dispatch) => {
		getTopFeedData()
			.then((res) => {
				if (res.status === 200) {
					dispatch(setTopFeedData(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetActivityData = () => {
	return (dispatch) => {
		getActivityData()
			.then((res) => {
				if (res.status === 200) {
					dispatch(setActivityData(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetPortfolioActivityData = (bdate, clientId) => {
	return (dispatch) => {
		getActivityPortfolioData(bdate, clientId)
			.then((res) => {
				if (res.status === 200) {
					dispatch(setActivityData(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetInvestmentCartData = () => {
	return (dispatch) => {
		getInvestmentCartData()
			.then((res) => {
				if (res.status === 200) {
					dispatch(setInvestmentCartData(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetTopCustomersData = (prevDate) => {
	return (dispatch) => {
		getTopCustomersData(prevDate)
			.then((res) => {
				if (res.status === 200) {
					dispatch(setTopCustomersData(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetOpenOrdersData = () => {
	return (dispatch) => {
		getOpenOrdersData()
			.then((res) => {
				if (res.status === 200) {
					dispatch(setOpenOrdersData(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetRecentProspectsData = () => {
	return (dispatch) => {
		getRecentProspectsData()
			.then((res) => {
				if (res.status === 200) {
					dispatch(setRecentProspectsData(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetAumTrendData = (date) => {
	return (dispatch) => {
		getAumTrendData(date)
			.then((res) => {
				if (res.status === 200) {
					dispatch(setAumTrendData(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetRevenueTrendData = (date) => {
	return (dispatch) => {
		getRevenueTrendData(date)
			.then((res) => {
				if (res.status === 200) {
					dispatch(setRevenueTrendData(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetRelationshipTrendData = (date) => {
	return (dispatch) => {
		getRelationshipTrendData(date)
			.then((res) => {
				if (res.status === 200) {
					dispatch(setRelationshipTrendData(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetExpectedBusinessData = (prevDate) => {
	return (dispatch) => {
		getExpectedBusinessData(prevDate)
			.then((res) => {
				if (res.status === 200) {
					dispatch(setExpectedBusinessData(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetTrendingProductsData = (prevDate) => {
	return (dispatch) => {
		getTrendingProductsData(prevDate)
			.then((res) => {
				if (res.status === 200) {
					dispatch(setTrendingProductsData(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetHighValueDealsData = () => {
	return (dispatch) => {
		getHighValueDealsData()
			.then((res) => {
				if (res.status === 200) {
					dispatch(setHighValueDealsData(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetInvestmentCartMandateData = () => {
	return (dispatch) => {
		getInvestmentCartMandateData()
			.then((res) => {
				if (res.status === 200) {
					dispatch(setInvestmentCartMandateData(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetPlacedMandateData = () => {
	return (dispatch) => {
		getPlacedMandateData()
			.then((res) => {
				if (res.status === 200) {
					dispatch(setPlacedMandateData(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetUpcomingOrdersData = () => {
	return (dispatch) => {
		getUpcomingOrdersData()
			.then((res) => {
				if (res.status === 200) {
					dispatch(setUpcomingOrdersData(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetPerformanceData = (type, businessDate) => {
	return (dispatch) => {
		getPerformanceData(type, businessDate)
			.then((res) => {
				if (res.status === 200) {
					dispatch(setPerformanceData(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetCRMHomeControlStructure = () => {
	return (dispatch) => {
		getCRMHomeControlStructure()
			.then((res) => {
				if (res.status === 200) {
					dispatch(setCRMHomeControlStructure(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetSecurityListDetails = (fetchSecurity) => {
	return (dispatch) => {
		getSecurityListDetails(fetchSecurity)
			.then((res) => {
				if (res.status === 200) {
					dispatch(setSecurityListDetails(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const executeGetExploreProduct = (exploreProductReqObj) => {
	return (dispatch) => {
		getExploreProduct(exploreProductReqObj)
			.then((res) => {
				if (res.status === 200) {
					dispatch(setExploreProduct(res.data));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
