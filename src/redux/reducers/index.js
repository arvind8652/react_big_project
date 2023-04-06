import { combineReducers } from 'redux';
import authReducer from './authReducer';
import controlStructureReducer from './controlStructureReducer';
import dashboardReducer from './dashboardReducer';
import leadCreationReducer from './leadCreationReducer';
import leadListingReducer from './leadListingReducer';
import leadViewReducer from './leadViewReducer';
import opportunityCreationReducer from './opportunityCreationReducer';
import opportunityListingReducer from './opportunityListingReducer';
import { USER_LOGOUT_SUCCESS, CLEAR_REDUX_STORE } from '../actions/actionTypes';
import opportunityViewReducer from './opportunityViewReducer';
import prospectListingReducer from './prospectListingReducer';
import prospectViewReducer from './prospectViewReducer';
import prospectCreateReducer from './prospectCreateReducer';
import interactionCreateReducer from './interactionCreateReducer';
import interactionViewReducer from './interactionViewReducer';
import interactionListingReducer from './interactionListingReducer';
import compLeadCreateReducer from './compLeadCreateReducer';
import customerListingReducer from './customerListingReducer';
import customerViewReducer from './customerViewReducer';
import compOppCreateReducer from './compOppCreateReducer';
import customerCreateReducer from './customerCreateReducer';
import customerOnboardingListingReducer from './customerOnboardingReducerListing';
import taskViewReducer from './taskViewReducer';
import taskListingReducer from './taskListingReducer';
import taskCreateReducer from './taskCreateReducer';
import commonReducer from './commonReducer';
import accountViewReducer from './accountViewReducer';
import accountCreateReducer from './accountCreateReducer';
import accountListReducer from './accountListReducer';
import documentManagerReducer from './documentManagerReducer';
import profileViewAccountReducer from './profileViewAccountReducer';
import topSearchMainReducer from './topSearchMainReducer';
import portfolioHoldingsReducer from './portfolioHoldingsReducer';
import tradeBookListReducer from './tradeBookListReducer';
import crmHomeReducer from './crmHomeReducer';
import tradeBookViewReducer from './tradeBookViewReducer';
import calendarReducer from './calendarReducer';
import topBarReducer from './topBarReducer';
import notificationsReducer from './notificationsReducer';
import favouritesReducer from './favouritesReducer';
import exploreProductsReducer from './exploreProductsReducer';
import accountDrilldownReducer from './accountDrilldownReducer';
import portfolioOverviewReducer from './portfolioOverviewReducer';
import primaryMarketReducer from './primaryMarketReducer';
import customerOverviewReducer from './customerOverviewReducer';
import reportsReducer from './reportsReducer/reportsReducer';
import pNBReducer from './pNBReducer';
import orderBookListingReducer from './orderBookListingReducer';
import createCustomerFormData from './customerFormDataReducer';
import getRiskProfileQaList from './riskProfileQAListReducer';
import financialPlanningCOReducer from './financialPlanningCOReducer';
import ticketSupportReducer from './ticketSupportReducer';
export const appReducer = combineReducers({
	common: commonReducer,
	auth: authReducer,
	controlStructure: controlStructureReducer,
	dashboard: dashboardReducer,
	leadCreation: leadCreationReducer,
	compLeadCreate: compLeadCreateReducer,
	leadListing: leadListingReducer,
	financialPlanningCO: financialPlanningCOReducer,
	leadView: leadViewReducer,
	opportunityCreation: opportunityCreationReducer,
	compOppCreate: compOppCreateReducer,
	opportunityView: opportunityViewReducer,
	opportunityListing: opportunityListingReducer,
	prospectListing: prospectListingReducer,
	prospectView: prospectViewReducer,
	prospectCreate: prospectCreateReducer,
	interactionCreate: interactionCreateReducer,
	interactionView: interactionViewReducer,
	interactionListing: interactionListingReducer,
	customerListing: customerListingReducer,
	customerView: customerViewReducer,
	customerCreate: customerCreateReducer,
	customerOnboardingListing: customerOnboardingListingReducer,
	customerCreateFormData: createCustomerFormData,
	riskProfileQa: getRiskProfileQaList,
	taskView: taskViewReducer,
	taskListing: taskListingReducer,
	taskCreate: taskCreateReducer,
	accountView: accountViewReducer,
	accountCreate: accountCreateReducer,
	accountList: accountListReducer,
	documentManager: documentManagerReducer,
	profileViewAccount: profileViewAccountReducer,
	portfolioHoldings: portfolioHoldingsReducer,
	tradeBookList: tradeBookListReducer,
	tradeBookView: tradeBookViewReducer,
	crmHome: crmHomeReducer,
	calendar: calendarReducer,
	topBar: topBarReducer,
	topSearchData: topSearchMainReducer,
	notifications: notificationsReducer,
	favouritesReducer: favouritesReducer,
	exploreProducts: exploreProductsReducer,
	accountDrilldown: accountDrilldownReducer,
	portfolioOverview: portfolioOverviewReducer,
	primaryMarketReducer,
	customerOverview: customerOverviewReducer,
	reportsData: reportsReducer,
	pNBData: pNBReducer,
	orderBook: orderBookListingReducer,
	ticketSupportReducer
});

export const rootReducer = (state, action) => {
	switch (action.type) {
		case CLEAR_REDUX_STORE:
			state = undefined;
			break;
		case USER_LOGOUT_SUCCESS:
			state = undefined;
			break;
		default:
			break;
	}
	return appReducer(state, action);
};
