import {
  SET_CUSTOMER_OVERVIEW_CONTROL_STRUCTURE,
  SET_CUSTOMER_PORTFOLIO,
  SET_RECENT_TRENDS,
  SET_RECENT_CONTRIBUTION,
  SET_LARGE_WITHDRAWAL,
  SET_OUTPERFORMERS,
  SET_UNDERPERFORMERS,
  SET_DORMANT,
  SET_DEMOGRAPHICS,
  SET_RISK_DISTRIBUTION,
  SET_TOP_WALLET_CONTRIBUTORS,
  SET_TOP_REVENUE_CONTRIBUTORS,
  SET_ASSET_ALLOCATION_ANOMALY,
  SET_BUSINESSTREND,
  SET_HELDAWAY_INVESTMENT,
} from "../actions/actionTypes";

const initialState = {
  controlStructure: "",
  customerPortfolio: "",
  recentTrends: "",
  recentContribution: "",
  largeWithdrawal: "",
  outperformers: "",
  underperformers: "",
  dormant: "",
  demographics: "",
  riskDistribution: "",
  topWalletContributors: "",
  topRevenueContributors: "",
  assetAllocationAnomaly: "",
  businessTrend: "",
  heldAwayInvestment: "",
};

const customerOverviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CUSTOMER_OVERVIEW_CONTROL_STRUCTURE:
      return { ...state, controlStructure: action.payload };
    case SET_CUSTOMER_PORTFOLIO:
      return { ...state, customerPortfolio: action.payload };
    case SET_RECENT_TRENDS:
      return { ...state, recentTrends: action.payload };
    case SET_RECENT_CONTRIBUTION:
      return { ...state, recentContribution: action.payload };
    case SET_LARGE_WITHDRAWAL:
      return { ...state, largeWithdrawal: action.payload };
    case SET_OUTPERFORMERS:
      return { ...state, outperformers: action.payload };
    case SET_UNDERPERFORMERS:
      return { ...state, underperformers: action.payload };
    case SET_DORMANT:
      return { ...state, dormant: action.payload };
    case SET_DEMOGRAPHICS:
      return { ...state, demographics: action.payload };
    case SET_RISK_DISTRIBUTION:
      return { ...state, riskDistribution: action.payload };
    case SET_TOP_WALLET_CONTRIBUTORS:
      return { ...state, topWalletContributors: action.payload };
    case SET_TOP_REVENUE_CONTRIBUTORS:
      return { ...state, topRevenueContributors: action.payload };
    case SET_ASSET_ALLOCATION_ANOMALY:
      return { ...state, assetAllocationAnomaly: action.payload };
    case SET_BUSINESSTREND:
      return { ...state, businessTrend: action.payload };
    case SET_HELDAWAY_INVESTMENT:
      return { ...state, heldAwayInvestment: action.payload };
    default:
      return state;
  }
};

export default customerOverviewReducer;
