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
  SET_SECURITY_LIST,
  SET_EXPLORE_PRODUCT_LIST,
  SET_CRMHOME_CS,
} from "../actions/actionTypes";

const initialState = {
  userInfo: null,
  notes: null,
  topFeed: null,
  activity: null,
  investmentCart: null,
  topCustomers: null,
  openOrders: null,
  recentProspects: null,
  aumTrend: null,
  revenueTrend: null,
  relationshipTrend: null,
  expectedBusiness: null,
  trendingProducts: null,
  highValueDeals: null,
  investmentCartMandate: null,
  placedMandate: null,
  upcomingOrders: null,
  performance: null,
};

const crmHomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO_DATA:
    case SET_BRANCH_USER_INFO_DATA:
      return { ...state, userInfo: action.payload };
    case SET_NOTES_DATA:
      return { ...state, notes: action.payload };
    case SET_TOP_FEED_DATA:
      return { ...state, topFeed: action.payload };
    case SET_ACTIVITY_DATA:
      return { ...state, activity: action.payload };
    case SET_INVESTMENT_CART_DATA:
      return { ...state, investmentCart: action.payload };
    case SET_TOP_CUSTOMERS_DATA:
      return { ...state, topCustomers: action.payload };
    case SET_OPEN_ORDERS_DATA:
      return { ...state, openOrders: action.payload };
    case SET_RECENT_PROSPECTS_DATA:
      return { ...state, recentProspects: action.payload };
    case SET_AUM_TREND_DATA:
      return { ...state, aumTrend: action.payload };
    case SET_REVENUE_TREND_DATA:
      return { ...state, revenueTrend: action.payload };
    case SET_RELATIONSHIP_TREND_DATA:
      return { ...state, relationshipTrend: action.payload };
    case SET_EXPECTED_BUSINESS_DATA:
      return { ...state, expectedBusiness: action.payload };
    case SET_TRENDING_PRODUCTS_DATA:
      return { ...state, trendingProducts: action.payload };
    case SET_HIGH_VALUE_DEALS_DATA:
      return { ...state, highValueDeals: action.payload };
    case SET_INVESTMENT_CART_MANDATE_DATA:
      return { ...state, investmentCartMandate: action.payload };
    case SET_PLACED_MANDATE_DATA:
      return { ...state, placedMandate: action.payload };
    case SET_UPCOMING_ORDERS_DATA:
      return { ...state, upcomingOrders: action.payload };
    case SET_PERFORMANCE_DATA:
      return { ...state, performance: action.payload };
    case SET_SECURITY_LIST:
      return { ...state, securityList: action.payload };
    case SET_EXPLORE_PRODUCT_LIST:
      return { ...state, exploreProductList: action.payload };
    case SET_CRMHOME_CS:
      return { ...state, controlStructure: action.payload };

    default:
      return state;
  }
};

export default crmHomeReducer;
