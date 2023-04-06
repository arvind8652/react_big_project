import {
	SET_PORTFOLIO_PERFORMANCE_BASED_ON_CAPITAL,
	SET_PORTFOLIO_ALLOCATION_BASED_ON_ASSET_CLASS,
	SET_ALLOCATION_TREND_DATA,
	SET_TOP_HOLDINGS,
	SET_WINNERS_AND_LAGGERS,
	SET_TOP_3_ACCOUNT_DATA,
	SET_ACCOUNT_DETAIL,
	SET_CAPITAL_INVESTED_GRAPH_DATA,
	SET_INVESTMENT_VALUE_GRAPH_DATA,
	SET_PORTFOLIO_ACTIVITY_GRAPH,
	SET_RISK_PROFILE_DATA,
	SET_PORTFOLIO_DERIVATION_DATA,
	SET_ACCOUNTDRILLDOWN_LIST,
	SET_PORTFOLIO_PERFORMANCE_BASED_ON_BENCHMARK,
	SET_DEPENDENT_DATA_ACCOUNT_DRILLDOWN,
	SET_ACCOUNT_DRILLDOWN_CONTROL_STRUCTURE,
	SET_ASSET_TYPE_WISE_DATA
} from '../actions/actionTypes';

const initialState = {
	portfolioPerformanceBasedOnCapital: null,
	portfolioAllocationBasedOnAssetClass: null,
	allocationTrendData: null,
	topHoldings: null,
	winnersAndLaggers: null,
	top3AccountData: null,
	accountDetail: null,
	capitalInvestedGraphData: null,
	investmentValueGraphData: null,
	portfolioActivityGraph: null,
	riskProfileData: null,
	portfolioDerivationData: null,
	accountList: null,
	portfolioPerformanceBasedOnBenchmark: null,
	dependentDataAccountDrilldown: null,
	controlStructure: null,
	assetTypeWise: null
};

const accountDrilldownReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_PORTFOLIO_PERFORMANCE_BASED_ON_CAPITAL:
			return { ...state, portfolioPerformanceBasedOnCapital: action.payload };
		case SET_PORTFOLIO_ALLOCATION_BASED_ON_ASSET_CLASS:
			return { ...state, portfolioAllocationBasedOnAssetClass: action.payload };
		case SET_ALLOCATION_TREND_DATA:
			return { ...state, allocationTrendData: action.payload };
		case SET_TOP_HOLDINGS:
			return { ...state, topHoldings: action.payload };
		case SET_WINNERS_AND_LAGGERS:
			return { ...state, winnersAndLaggers: action.payload };
		case SET_TOP_3_ACCOUNT_DATA:
			return { ...state, top3AccountData: action.payload };
		case SET_ACCOUNT_DETAIL:
			return { ...state, accountDetail: action.payload };
		case SET_CAPITAL_INVESTED_GRAPH_DATA:
			return { ...state, capitalInvestedGraphData: action.payload };
		case SET_INVESTMENT_VALUE_GRAPH_DATA:
			return { ...state, investmentValueGraphData: action.payload };
		case SET_PORTFOLIO_ACTIVITY_GRAPH:
			return { ...state, portfolioActivityGraph: action.payload };
		case SET_RISK_PROFILE_DATA:
			return { ...state, riskProfileData: action.payload };
		case SET_PORTFOLIO_DERIVATION_DATA:
			return { ...state, portfolioDerivationData: action.payload };
		case SET_ACCOUNTDRILLDOWN_LIST:
			return { ...state, accountList: action.payload };
		case SET_PORTFOLIO_PERFORMANCE_BASED_ON_BENCHMARK:
			return { ...state, portfolioPerformanceBasedOnBenchmark: action.payload };
		case SET_DEPENDENT_DATA_ACCOUNT_DRILLDOWN:
			return { ...state, dependentDataAccountDrilldown: action.payload };
		case SET_ACCOUNT_DRILLDOWN_CONTROL_STRUCTURE:
			return { ...state, controlStructure: action.payload };
		case SET_ASSET_TYPE_WISE_DATA:
			return { ...state, assetTypeWise: action.payload };
		default:
			return state;
	}
};

export default accountDrilldownReducer;
