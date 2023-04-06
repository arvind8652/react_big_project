import {
  SET_PORTFOLIO_HOLDINGS_CS,
  SET_ASSET_CLASSWISE_DATA,
  SET_TOP_HOLDING,
  SET_HOLDING_AMOUNT,
  SET_ASSET_TYPEWISE,
  SET_INVESTMENT_ALLOCATION,
  SET_SECURITY_DETAIL,
  SET_STOCK_SECURITY_DETAIL,
} from "../actions/actionTypes";

const initialState = {
  controlStructure: "",
  assetClasswiseData: "",
  topHoldingData: "",
  holdingAmountData: "",
  assetTypewiseData: "",
  investmentAllocationData: "",
};

const portfolioHoldingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PORTFOLIO_HOLDINGS_CS:
      return {
        ...state,
        controlStructure: action.payload,
      };
    case SET_ASSET_CLASSWISE_DATA:
      return {
        ...state,
        assetClasswiseData: action.payload,
      };
    case SET_TOP_HOLDING:
      return {
        ...state,
        topHoldingData: action.payload,
      };
    case SET_HOLDING_AMOUNT:
      return {
        ...state,
        holdingAmountData: action.payload,
      };
    case SET_ASSET_TYPEWISE:
      return {
        ...state,
        assetTypewiseData: action.payload,
      };
    case SET_INVESTMENT_ALLOCATION:
      return {
        ...state,
        investmentAllocationData: action.payload,
      };
    case SET_SECURITY_DETAIL:
      return {
        ...state,
        securityDetail: action.payload,
      };
    case SET_STOCK_SECURITY_DETAIL:
      return {
        ...state,
        stockSecurityDetail: action.payload,
      };
    default:
      return state;
  }
};

export default portfolioHoldingsReducer;
