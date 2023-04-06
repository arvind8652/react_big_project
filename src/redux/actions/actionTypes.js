export const CLEAR_REDUX_STORE = 'CLEAR_REDUX_STORE';

// global config action types
export const SET_CONFIG = 'SET_CONFIG';

// control structure action types
export const GET_CONTROL_STRUCTURE = 'GET_CONTROL_STRUCTURE';
export const SET_LOGIN_FORM_CS = 'SET_LOGIN_FORM_CS';
export const SET_OTP_REQUEST_FORM_CS = 'SET_OTP_REQUEST_FORM_CS';
export const SET_FORGOT_PASSWORD_FORM_CS = 'SET_FORGOT_PASSWORD_FORM_CS';

// auth action types
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_OTP_VERIFY_SUCCESS = 'USER_OTP_VERIFY_SUCCESS';
export const MENU_DETAILS = 'MENU_DETAILS';

// dashboard action types
export const SET_LEFT_PANEL_DATA = 'SET_LEFT_PANEL_DATA';
export const SET_CLIENT_LEFT_PANEL_DATA = 'SET_CLIENT_LEFT_PANEL_DATA';
export const SET_CHILD_MENU_FLAG = 'SET_CHILD_MENU_FLAG';

//Financial Planning CO action types
export const SET_FINANCIAL_PLANNING_CO_CS = 'SET_FINANCIAL_PLANNING_CO_CS';
export const SET_GET_GOAL = 'SET_GET_GOAL';
export const SET_FINANCIAL_PLANNING_GOAL_CO = 'SET_FINANCIAL_PLANNING_GOAL_CO';

// lead listing action types
export const SET_LEAD_LISTING_CS = 'SET_LEAD_LISTING_CS';
export const SET_LEAD_LISTING_DATA = 'SET_LEAD_LISTING_DATA';
export const SET_LEAD_ADVANCED_FILTER = 'SET_PROSPECT_LEAD_FILTER';

// Lead Creation Action
export const SET_LEAD_CREATION_CS = 'SET_LEAD_CREATION_CS';
export const SET_LEAD_CREATION_FULL_CS = 'SET_LEAD_CREATION_FULL_CS';
export const SET_LEAD_CREATION_SUCCESS = 'SET_LEAD_CREATION_SUCCESS';
export const SET_SOURCE_SUCCESS = 'SET_SOURCE_SUCCESS';
//Component Based Lead Create
export const SET_COMP_LEAD_CREATE_CS = 'SET_COMP_LEAD_CREATE_CS';

// Opportunity listing action types
export const SET_OPPORTUNITY_LISTING_CS = 'SET_OPPORTUNITY_LISTING_CS';
export const SET_OPPORTUNITY_LISTING_DATA = 'SET_OPPORTUNITY_LISTING_DATA';

// Lead View Action
export const GET_LEAD_VIEW_DATA = 'GET_LEAD_VIEW_DATA';
export const SET_LEAD_VIEW_NEXT_OR_PREVIOUS_DATA = 'SET_LEAD_VIEW_NEXT_OR_PREVIOUS_DATA';
export const GET_CUSTOMER_DETAIL = 'GET_CUSTOMER_DETAIL';
export const SET_LEAD_EDIT_DETAIL = 'SET_LEAD_EDIT_DETAIL';
export const CLEAR_LEAD_EDIT_DETAIL = 'CLEAR_LEAD_EDIT_DETAIL';

// Opportunity Create Action
export const SET_OPPORTUNITY_CREATION_CS = 'SET_OPPORTUNITY_CREATION_CS';
export const SET_OPPORTUNITY_CREATION_SUCCESS = 'SET_OPPORTUNITY_CREATION_SUCCESS';
export const SET_OPPORTUNITY_DEPENDANT_DATA_SUCCESS = 'SET_OPPORTUNITY_DEPENDANT_DATA_SUCCESS';
export const SET_OPPORTUNITY_CREATION_FULL_CS = 'SET_OPPORTUNITY_CREATION_FULL_CS';
export const GET_OPPORTUNITY_CREATION_PROBABILITY = 'GET_OPPORTUNITY_CREATION_PROBABILITY';

//Component Based Opportunity Create Module
export const SET_COMP_OPP_CREATE_CS = 'SET_COMP_OPP_CREATE_CS';

// Opportunity View Action types
export const SET_OPPORTUNITY_VIEW_CS = 'SET_OPPORTUNITY_VIEW_CS';
export const SET_OPPORTUNITY_VIEW_FULL_CS = 'SET_OPPORTUNITY_VIEW_FULL_CS';
export const SET_OPPORTUNITY_ADD_CS = 'SET_OPPORTUNITY_ADD_CS';
export const SET_OPPORTUNITY_ADD_FULL_CS = 'SET_OPPORTUNITY_ADD_FULL_CS';
export const GET_OPPORTUNITY_VIEW_DATA = 'GET_OPPORTUNITY_VIEW_DATA';
export const SET_OPPORTUNITY_VIEW_NEXT_OR_PREVIOUS_DATA =
	'SET_OPPORTUNITY_VIEW_NEXT_OR_PREVIOUS_DATA';
export const GET_HORIZONTAL_TIMELINE = 'GET_HORIZONTAL_TIMELINE';
export const GET_VERTICAL_TIMELINE = 'GET_VERTICAL_TIMELINE';
export const GET_OPPORTUNITY_ATTACHMENT_DETAILS = 'GET_OPPORTUNITY_ATTACHMENT_DETAILS';
export const GET_OPPORTUNITY_MISCELLANEOUS_DETAILS = 'GET_OPPORTUNITY_MISCELLANEOUS_DETAILS';
export const SET_UPLOAD_ATTACHMENT = 'SET_UPLOAD_ATTACHMENT';
export const GET_OPPORTUNITY_STAGE_DETAIL = 'GET_OPPORTUNITY_STAGE_DETAIL';
export const GET_PROBABILITY_BY_STAGE = 'GET_PROBABILITY_BY_STAGE';
export const SET_OPPORTUNITY_EDIT_DETAIL = 'SET_OPPORTUNITY_EDIT_DETAIL';
export const CLEAR_OPPORTUNITY_EDIT_DETAIL = 'CLEAR_OPPORTUNITY_EDIT_DETAIL';

// Opportunity Listing Action Types
export const SET_OPPORTUNITY_ADVANCED_FILTER = 'SET_OPPORTUNITY_ADVANCED_FILTER';

//Prospect Listing Action Types
export const SET_PROSPECT_LISTING_CS = 'SET_PROSPECT_LISTING_CS';
export const SET_PROSPECT_LISTING_DATA = 'SET_PROSPECT_LISTING_DATA';
export const SET_PROSPECT_ADVANCED_FILTER = 'SET_PROSPECT_ADVANCED_FILTER';

// Prospect View Action types
export const GET_PROSPECT360_VIEW_DATA = 'GET_PROSPECT360_VIEW_DATA';
export const GET_PROSPECT_VERTICAL_TIMELINE = 'GET_PROSPECT_VERTICAL_TIMELINE';
export const GET_PROSPECT_ATTACHMENT_DETAILS = 'GET_PROSPECT_ATTACHMENT_DETAILS';
export const GET_PROSPECT_MISCELLANEOUS_DETAILS = 'GET_PROSPECT_MISCELLANEOUS_DETAILS';
export const GET_PROSPECT_CUSTOMER_DETAIL = 'GET_PROSPECT_CUSTOMER_DETAIL';
export const GET_PROSPECT_OPPORUNTIY_DETAILS = 'GET_PROSPECT_OPPORUNTIY_DETAILS';
export const GET_PROSPECT_REALTION_DETAILS = 'GET_PROSPECT_REALTION_DETAILS';
export const GET_PROSPECT_INTERACTION_DETAILS = 'GET_PROSPECT_INTERACTION_DETAILS';
export const GET_PROSPECT_TASK_DETAILS = 'GET_PROSPECT_TASK_DETAILS';
export const GET_PROSPECT_NOTES_DETAILS = 'GET_PROSPECT_NOTES_DETAILS';
export const SET_PROSPECT_UPLOAD_ATTACHMENT = 'SET_PROSPECT_UPLOAD_ATTACHMENT';
export const SET_PROSPECT_EDIT_DETAIL = 'SET_PROSPECT_EDIT_DETAIL';
export const CLEAR_PROSPECT_EDIT_DETAIL = 'CLEAR_PROSPECT_EDIT_DETAIL';
export const GET_PROSPECT_CONVERSION_DEPENDANT_DATA = 'GET_PROSPECT_CONVERSION_DEPENDANT_DATA';

// prospect create actions
export const SET_PROSPECT_CREATE_CS = 'SET_PROSPECT_CREATE_CS ';

//interaction create actions
export const SET_INTERACTION_CREATE_CS = 'SET_INTERACTION_CREATE_CS';
export const SET_EXISTING_INTERACTION = 'SET_EXISTING_INTERACTION';

// Interaction View Action types
export const SET_INTERACTION_VIEW_CS = 'SET_INTERACTION_VIEW_CS';
export const SET_INTERACTION_VIEW_FULL_CS = 'SET_INTERACTION_VIEW_FULL_CS';
export const SET_INTERACTION_ADD_CS = 'SET_INTERACTION_ADD_CS';
export const SET_INTERACTION_ADD_FULL_CS = 'SET_INTERACTION_ADD_FULL_CS';
export const GET_INTERACTION_VIEW_DATA = 'GET_INTERACTION_VIEW_DATA';
export const GET_INTERACTION_VERTICAL_TIMELINE = 'GET_INTERACTION_VERTICAL_TIMELINE';
export const GET_INTERACTION_ATTACHMENT_DETAILS = 'GET_INTERACTION_ATTACHMENT_DETAILS';
export const GET_INTERACTION_MISCELLANEOUS_DETAILS = 'GET_INTERACTION_MISCELLANEOUS_DETAILS';
export const SET_INTERACTION_UPLOAD_ATTACHMENT = 'SET_INTERACTION_UPLOAD_ATTACHMENT';
export const GET_INTERACTION_HISTORY_DETAIL = 'GET_INTERACTION_HISTORY_DETAIL';
export const SET_INTERACTION_EDIT_DETAIL = 'SET_PROSPECT_EDIT_DETAIL';
export const CLEAR_INTERACTION_EDIT_DETAIL = 'CLEAR_PROSPECT_EDIT_DETAIL';

//Interaction and task Listing Action Types
export const SET_INTERACTION_LISTING_CS = 'SET_INTERACTION_LISTING_CS';
export const SET_INTERACTION_LISTING_DATA = 'SET_INTERACTION_LISTING_DATA';
//Customer Listing Action Types
export const SET_CUSTOMER_LISTING_CS = 'SET_CUSTOMER_LISTING_CS';
export const SET_CUSTOMER_LISTING_DATA = 'SET_CUSTOMER_LISTING_DATA';
export const SET_INTERACTION_ADVANCED_FILTER = 'SET_INTERACTION_ADVANCED_FILTER';

//Customer Onboarding Listing Action Types
export const SET_CUSTOMER_ONBOARDING_LISTING_CS = 'SET_CUSTOMER_ONBOARDING_LISTING_CS';
export const SET_CUSTOMER_ONBOARDING_LISTING_DATA = 'SET_CUSTOMER_ONBOARDING_LISTING_DATA';
//Customer Create Module
export const SET_CUSTOMER_CREATE_CS = 'SET_CUSTOMER_CREATE_CS';
export const CLEAR_CUSTOMER_EDIT_DETAIL = 'CLEAR_CUSTOMER_EDIT_DETAIL';
export const SET_TASK_LISTING_CS = 'SET_TASK_LISTING_CS';
export const SET_TASK_LISTING_DATA = 'SET_TASK_LISTING_DATA';
export const GET_ATTACHMENT_DETAILS = 'GET_ATTACHMENT_DETAILS';
export const GET_CUSTOMER_MISCELLANEOUS_DETAILS = 'GET_CUSTOMER_MISCELLANEOUS_DETAILS';
export const GET_DOCUMENT_DETAILS = 'GET_DOCUMENT_DETAILS';
export const GET_CUSTOMER_ONBOARDING_DATA = 'GET_CUSTOMER_ONBOARDING_DATA';
export const GET_PROSPECT_RELATION = 'GET_PROSPECT_RELATION';
export const GET_TIMELINE = 'GET_TIMELINE';
export const SET_ACCOUNT_LIST_CS = 'SET_ACCOUNT_LIST_CS';
export const SET_ASSET_CLASSWISE_DATA = 'SET_ASSET_CLASSWISE_DATA';
export const SET_ASSET_TYPEWISE = 'SET_ASSET_TYPEWISE';
export const SET_CUSTOMER_EDIT_DETAIL = 'SET_CUSTOMER_EDIT_DETAIL';
export const SET_HOLDING_AMOUNT = 'SET_HOLDING_AMOUNT';
export const SET_INVESTMENT_ALLOCATION = 'SET_INVESTMENT_ALLOCATION';
export const SET_ORDER_BOOK_CONTROL_STRUCTURE_DATA = 'SET_ORDER_BOOK_CONTROL_STRUCTURE_DATA';
export const SET_ORDER_BOOK_LISTING_DATA = 'SET_ORDER_BOOK_LISTING_DATA';
export const SET_ORDER_BOOK_ADVANCED_FILTER = 'SET_ORDER_BOOK_ADVANCED_FILTER';
export const SET_PORTFOLIO_HOLDINGS_CS = 'SET_PORTFOLIO_HOLDINGS_CS';
export const SET_TOP_HOLDING = 'SET_TOP_HOLDING';
export const SET_SECURITY_DETAIL = 'SET_SECURITY_DETAIL';
export const SET_STOCK_SECURITY_DETAIL = 'SET_STOCK_SECURITY_DETAIL';
export const SET_CUSTOMER_FORM_DATA = 'SET_CUSTOMER_FORM_DATA';
export const SET_RISK_PROFILE_QA_LIST = 'SET_RISK_PROFILE_QA_LIST';

//common
export const SET_DROPDOWN_VALUE = 'SET_DROPDOWN_VALUE';
export const SET_LP_CUSTOMER_INFO = 'SET_LP_CUSTOMER_INFO';

//Task View Action Types
export const SET_TASK_VIEW_CS = 'SET_TASK_VIEW_CS';
export const SET_TASK_VIEW_FULL_CS = 'SET_TASK_VIEW_FULL_CS';
export const SET_TASK_ADD_CS = 'SET_TASK_ADD_CS';
export const SET_TASK_ADD_FULL_CS = 'SET_TASK_ADD_FULL_CS';
export const GET_TASK_VIEW_DATA = 'GET_TASK_VIEW_DATA';
export const GET_TASK_ATTACHMENT_DETAILS = 'GET_TASK_ATTACHMENT_DETAILS';
export const GET_TASK_MISCELLANEOUS_DETAILS = 'GET_TASK_MISCELLANEOUS_DETAILS';
export const SET_TASK_UPLOAD_ATTACHMENT = 'SET_TASK_UPLOAD_ATTACHMENT';
export const GET_TASK_HISTORY_DETAIL = 'GET_TASK_HISTORY_DETAIL';
export const SET_TASK_EDIT_DETAIL = 'SET_PROSPECT_EDIT_DETAIL';
export const CLEAR_TASK_EDIT_DETAIL = 'CLEAR_PROSPECT_EDIT_DETAIL';

// Task Create Action
export const SET_TASK_CREATE_CS = 'SET_TASK_CREATE_CS';

// Account View
export const SET_ACCOUNT_DETAILS_DATA = 'SET_ACCOUNT_DETAILS_DATA';
export const SET_DOCUMENT_DETAILS_DATA = 'SET_DOCUMENT_DETAILS_DATA';
export const SET_TIMELINE_DETAILS_DATA = 'SET_TIMELINE_DETAILS_DATA';
export const SET_CUSTOMER_DATA = 'SET_CUSTOMER_DATA';
export const SET_ATTACHMENT_DATA = 'SET_ATTACHMENT_DATA';
export const SET_MISCELLANEOUS_DATA = 'SET_MISCELLANEOUS_DATA';

// Account Actions

// Order Listing
//export const SET_ORDER_BOOK_LISTING_DATA = "SET_ORDER_BOOK_LISTING_DATA";
//export const SET_ORDER_BOOK_CONTROL_STRUCTURE_DATA =  "SET_ORDER_BOOK_CONTROL_STRUCTURE_DATA";
//export const SET_TOP_HOLDING = "SET_TOP_HOLDING";

//Profile View Account
//export const GET_VERTICAL_TIMELINE = "GET_VERTICAL_TIMELINE";
//export const GET_ATTACHMENT_DETAILS = "GET_ATTACHMENT_DETAILS";
export const GET_COMMON_CUSTOMER_DETAILS = 'GET_COMMON_CUSTOMER_DETAILS';
export const GET_CUSTOMER_DETAILS = 'GET_CUSTOMER_DETAILS';
export const SET_CLIENT_RELATION = 'SET_CLIENT_RELATION';
export const GET_MISCELLANEOUS = 'GET_MISCELLANEOUS';
export const SET_DOWNLOAD_ATTACHMENTS = 'SET_DOWNLOAD_ATTACHMENTS';
export const SET_UPLOAD_FILES = 'SET_UPLOAD_FILES';
//export const GET_DOCUMENT_DETAILS = "GET_DOCUMENT_DETAILS";
export const GET_CLIENT_ACCOUNT_DETAILS_BY_ID = 'GET_CLIENT_ACCOUNT_DETAILS_BY_ID';
//export const SET_HOLDING_AMOUNT = "SET_HOLDING_AMOUNT";
//export const SET_ASSET_TYPEWISE = "SET_ASSET_TYPEWISE";
export const SET_ACCOUNT_LIST = 'SET_ACCOUNT_LIST';
export const SET_ACCOUNT_LISTING_CS = 'SET_ACCOUNT_LISTING_CS';
//export const SET_ACCOUNT_CREATE_CS = 'SET_ACCOUNT_CREATE_CS';
//export const SET_ACCOUNT_LIST = 'SET_ACCOUNT_LIST';
//export const SET_ACCOUNT_LIST = "SET_ACCOUNT_LIST";
export const SET_PROSPECT_RELATION = 'SET_PROSPECT_RELATION';
export const GET_ACCOUNT_DETAILS = 'GET_ACCOUNT_DETAILS';
//getProspectRelations

//Top Bar Search
export const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
//Document Manager

export const SET_DOCUMENT_MANAGER_DETAILS_DATA = 'SET_DOCUMENT_MANAGER_DETAILS_DATA';
export const SET_UPLOAD_DOCUMENT_TO_DB_DATA = 'SET_UPLOAD_DOCUMENT_TO_DB_DATA';
export const SET_DOCUMENT_FOR_DOWNLOAD_DATA = 'SET_DOCUMENT_FOR_DOWNLOAD_DATA';
export const SET_ADVANCED_FILTER_DETAILS_DATA = 'SET_ADVANCED_FILTER_DETAILS_DATA';
export const SET_CONTROL_STRUCTURE_DATA = 'SET_CONTROL_STRUCTURE_DATA';
export const SET_DOC_DEPENDENT_DATA = 'SET_DOC_DEPENDENT_DATA';

// Customer View Action Types

export const GET_CUSTOMER_VIEW_ONBOARDING_DATA = 'GET_CUSTOMER_VIEW_ONBOARDING_DATA';
export const GET_WORKFLOW_STATUS_DATA = 'GET_WORKFLOW_STATUS_DATA';

// TRADE BOOKLIST
export const SET_TRADE_BOOK_LIST_CS = 'SET_TRADE_BOOK_LIST_CS';
export const SET_TRADE_BOOK_LIST = 'SET_TRADE_BOOK_LIST';
export const SET_TRADE_BOOK_LIST_ADVANCED_FILTER = 'SET_TRADE_BOOK_LIST_ADVANCED_FILTER';

// TRADE BOOK VIEW
export const GET_TRADE_BOOK_VIEW_DETAILS = 'GET_TRADE_BOOK_VIEW_DETAILS';
export const GET_TRADE_BOOK_VIEW_VERTICAL_TIMELINE_DETAILS =
	'GET_TRADE_BOOK_VIEW_VERTICAL_TIMELINE_DETAILS';
export const SET_TRADE_BOOK_VIEW_DOCUMENT_DETAILS = 'SET_TRADE_BOOK_VIEW_DOCUMENT_DETAILS';
export const SET_TRADE_BOOK_VIEW_SECURITY_DETAILS = 'SET_TRADE_BOOK_VIEW_SECURITY_DETAILS';
export const SET_TRADE_BOOK_VIEW_ATTACHMENT_DETAILS = 'SET_TRADE_BOOK_VIEW_ATTACHMENT_DETAILS';

// ACCOUNT CREATE
export const SET_ACCOUNT_CREATE_CS = 'SET_ACCOUNT_CREATE_CS';
export const SET_ACCOUNT_DETAILS = 'SET_ACCOUNT_DETAILS';
export const SET_ACCOUNT_DETAILS_PROFILE = 'SET_ACCOUNT_DETAILS_PROFILE';

//CRM HOME
export const SET_USER_INFO_DATA = 'SET_USER_INFO_DATA';
export const SET_BRANCH_USER_INFO_DATA = 'SET_BRANCH_USER_INFO_DATA';
export const SET_NOTES_DATA = 'SET_NOTES_DATA';
export const SET_TOP_FEED_DATA = 'SET_TOP_FEED_DATA';
export const SET_ACTIVITY_DATA = 'SET_ACTIVITY_DATA';
export const SET_INVESTMENT_CART_DATA = 'SET_INVESTMENT_CART_DATA';
export const SET_TOP_CUSTOMERS_DATA = 'SET_TOP_CUSTOMERS_DATA';
export const SET_OPEN_ORDERS_DATA = 'SET_OPEN_ORDERS_DATA';
export const SET_RECENT_PROSPECTS_DATA = 'SET_RECENT_PROSPECTS_DATA';
export const SET_AUM_TREND_DATA = 'SET_AUM_TREND_DATA';
export const SET_REVENUE_TREND_DATA = 'SET_REVENUE_TREND_DATA';
export const SET_RELATIONSHIP_TREND_DATA = 'SET_RELATIONSHIP_TREND_DATA';
export const SET_EXPECTED_BUSINESS_DATA = 'SET_EXPECTED_BUSINESS_DATA';
export const SET_TRENDING_PRODUCTS_DATA = 'SET_TRENDING_PRODUCTS_DATA';
export const SET_HIGH_VALUE_DEALS_DATA = 'SET_HIGH_VALUE_DEALS_DATA';
export const SET_INVESTMENT_CART_MANDATE_DATA = 'SET_INVESTMENT_CART_MANDATE_DATA';
export const SET_PLACED_MANDATE_DATA = 'SET_PLACED_MANDATE_DATA';
export const SET_UPCOMING_ORDERS_DATA = 'SET_UPCOMING_ORDERS_DATA';
export const SET_PERFORMANCE_DATA = 'SET_PERFORMANCE_DATA';
export const SET_CRMHOME_CS = 'SET_CRMHOME_CS';
export const SET_SECURITY_LIST = 'SET_SECURITY_LIST';
export const SET_EXPLORE_PRODUCT_LIST = 'SET_EXPLORE_PRODUCT_LIST';

//CALENDAR
export const SET_CALENDAR_DETAILS = 'SET_CALENDAR_DETAILS';
export const SET_CALENDAR_EVENTS = 'SET_CALENDAR_EVENTS';

//NOTIFICATIONS
export const SET_TOPBAR_NOTIFICATIONS = 'SET_TOPBAR_NOTIFICATIONS';
export const GET_TOPBAR_NOTIFICATIONS = 'GET_TOPBAR_NOTIFICATIONS';
export const SET_QUICK_ADD_MENU_ITEMS = 'SET_QUICK_ADD_MENU_ITEMS';

//FAVOURITES
export const SET_FAVOURITES = 'SET_FAVOURITES';

// EXPLORE PRODUCTS
export const SET_EXPLORE_PRODUCTS_DETAILS = 'SET_EXPLORE_PRODUCTS_DETAILS';

//ACCOUNT DRILLDOWN
export const SET_PORTFOLIO_PERFORMANCE_BASED_ON_CAPITAL =
	'SET_PORTFOLIO_PERFORMANCE_BASED_ON_CAPITAL';
export const SET_PORTFOLIO_ALLOCATION_BASED_ON_ASSET_CLASS =
	'SET_PORTFOLIO_ALLOCATION_BASED_ON_ASSET_CLASS';
export const SET_ALLOCATION_TREND_DATA = 'SET_ALLOCATION_TREND_DATA';
export const SET_TOP_HOLDINGS = 'SET_TOP_HOLDINGS';
export const SET_WINNERS_AND_LAGGERS = 'SET_WINNERS_AND_LAGGERS';
export const SET_TOP_3_ACCOUNT_DATA = 'SET_TOP_3_ACCOUNT_DATA';
export const SET_ACCOUNT_DETAIL = 'SET_ACCOUNT_DETAIL';
export const SET_CAPITAL_INVESTED_GRAPH_DATA = 'SET_CAPITAL_INVESTED_GRAPH_DATA';
export const SET_INVESTMENT_VALUE_GRAPH_DATA = 'SET_INVESTMENT_VALUE_GRAPH_DATA';
export const SET_PORTFOLIO_ACTIVITY_GRAPH = 'SET_PORTFOLIO_ACTIVITY_GRAPH';
export const SET_RISK_PROFILE_DATA = 'SET_RISK_PROFILE_DATA';
export const SET_PORTFOLIO_DERIVATION_DATA = 'SET_PORTFOLIO_DERIVATION_DATA';
export const SET_ACCOUNTDRILLDOWN_LIST = 'SET_ACCOUNTDRILLDOWN_LIST';
export const SET_PORTFOLIO_PERFORMANCE_BASED_ON_BENCHMARK =
	'SET_PORTFOLIO_PERFORMANCE_BASED_ON_BENCHMARK';
export const SET_DEPENDENT_DATA_ACCOUNT_DRILLDOWN = 'SET_DEPENDENT_DATA_ACCOUNT_DRILLDOWN';
export const SET_ACCOUNT_DRILLDOWN_CONTROL_STRUCTURE = 'SET_ACCOUNT_DRILLDOWN_CONTROL_STRUCTURE';
export const SET_ASSET_TYPE_WISE_DATA = 'SET_ASSET_CLASSWISE_DATA';
//export const SET_EXPLORE_PRODUCTS_DETAILS = "SET_EXPLORE_PRODUCTS_DETAILS";
export const SET_EXPLORE_PRODUCTS_CONTROL_STRUCTURE = 'SET_EXPLORE_PRODUCTS_CONTROL_STRUCTURE';
export const SET_EXPLORE_PRODUCTS_ADVANCED_FILTER = 'SET_EXPLORE_PRODUCTS_ADVANCED_FILTER';
export const SET_EXPLORE_PRODUCTS_FILTERED = 'SET_EXPLORE_PRODUCTS_FILTERED';
export const SET_EXPLORE_PRODUCTS_ADV_CACHE = 'SET_EXPLORE_PRODUCTS_ADV_CACHE';

// PORTFOLIO OVERVIEW

// export const SET_CUSTOMER_INFO = 'SET_CUSTOMER_INFO';

// export const SET_INVESTMENT_ACCOUNT_DATA = 'SET_INVESTMENT_ACCOUNT_DATA';

export const SET_CUSTOMER_INFO = 'SET_CUSTOMER_INFO';
export const SET_INVESTMENT_ACCOUNT_DATA = 'SET_INVESTMENT_ACCOUNT_DATA';
export const SET_OPPORTUNITIES = 'SET_OPPORTUNITIES';
export const SET_NOTESDATA = 'SET_NOTESDATA';
export const SET_CALEDERDATA = 'SET_CALEDERDATA';
// export const SET_INVESTMENT_ACCOUNT_DATA = 'SET_INVESTMENT_ACCOUNT_DATA';

export const SET_PRIMARY_MARKET_CONTROL_STRUCTURE = 'SET_PRIMARY_MARKET_CONTROL_STRUCTURE';
export const SET_PRIMARY_ORDER = 'SET_PRIMARY_ORDER';
export const SET_PORTFOLIO_OVERVIEW_RISK_PROFILE_MODEL =
	'SET_PORTFOLIO_OVERVIEW_RISK_PROFILE_MODEL';
export const SET_PORTFOLIO_OVERVIEW_TRENDING_PRODUCTS = 'SET_PORTFOLIO_OVERVIEW_TRENDING_PRODUCTS';

// export const SET_PORTFOLIO_OVERVIEW_OPEN_ORDERS = 'SET_PORTFOLIO_OVERVIEW_OPEN_ORDERS';

// export const SET_PRIMARY_MARKET_CONTROL_STRUCTURE =
//   "SET_PRIMARY_MARKET_CONTROL_STRUCTURE";
// export const SET_PORTFOLIO_OVERVIEW_RISK_PROFILE_MODEL =
//   "SET_PORTFOLIO_OVERVIEW_RISK_PROFILE_MODEL";
// export const SET_PORTFOLIO_OVERVIEW_TRENDING_PRODUCTS =
//   "SET_PORTFOLIO_OVERVIEW_TRENDING_PRODUCTS";

// Customer Overview
export const SET_CUSTOMER_OVERVIEW_CONTROL_STRUCTURE = 'SET_CUSTOMER_OVERVIEW_CONTROL_STRUCTURE';
export const SET_CUSTOMER_PORTFOLIO = 'SET_CUSTOMER_PORTFOLIO';
export const SET_RECENT_TRENDS = 'SET_RECENT_TRENDS';
export const SET_RECENT_CONTRIBUTION = 'SET_RECENT_CONTRIBUTION';
export const SET_LARGE_WITHDRAWAL = 'SET_LARGE_WITHDRAWAL';
export const SET_OUTPERFORMERS = 'SET_OUTPERFORMERS';
export const SET_UNDERPERFORMERS = 'SET_UNDERPERFORMERS';
export const SET_DORMANT = 'SET_DORMANT';
export const SET_DEMOGRAPHICS = 'SET_DEMOGRAPHICS';
export const SET_RISK_DISTRIBUTION = 'SET_RISK_DISTRIBUTION';
export const SET_TOP_WALLET_CONTRIBUTORS = 'SET_TOP_WALLET_CONTRIBUTORS';
export const SET_TOP_REVENUE_CONTRIBUTORS = 'SET_TOP_REVENUE_CONTRIBUTORS';
export const SET_ASSET_ALLOCATION_ANOMALY = 'SET_ASSET_ALLOCATION_ANOMALY';
export const SET_BUSINESSTREND = 'SET_BUSINESSTREND';
export const SET_HELDAWAY_INVESTMENT = 'SET_HELDAWAY_INVESTMENT';

export const SET_PORTFOLIO_OVERVIEW_OPEN_ORDERS = 'SET_PORTFOLIO_OVERVIEW_OPEN_ORDERS';

// CLIENT STATEMENT REPORTS
export const SET_CLIENT_STATEMENT_CONTROL_STRUCTURE = 'SET_CLIENT_STATEMENT_CONTROL_STRUCTURE';
//SECURITY HOLDING REPORTS
export const SET_SECURITY_HOLDING_CONTROL_STRUCTURE = 'SET_SECURITY_HOLDING_CONTROL_STRUCTURE';
// HOLDING STATEMENT REPORTS
export const SET_HOLDING_STATEMENT_CONTROL_STRUCTURE = 'SET_HOLDING_STATEMENT_CONTROL_STRUCTURE';
export const SET_CUSTOMER_LIST_CONTROL_STRUCTURE = 'SET_CUSTOMER_LIST_CONTROL_STRUCTURE';
export const SET_DOCUMENT_STATUS_CONTROL_STRUCTURE = 'SET_DOCUMENT_STATUS_CONTROL_STRUCTURE';
export const SET_ORDER_STATUS_CONTROL_STRUCTURE = 'SET_ORDER_STATUS_CONTROL_STRUCTURE';
export const SET_TRANSACTION_STATEMENT_CONTROL_STRUCTURE =
	'SET_TRANSACTION_STATEMENT_CONTROL_STRUCTURE';
export const SET_WINNER_LAGGERS_CONTROL_STRUCTURE = 'SET_WINNER_LAGGERS_CONTROL_STRUCTURE';

export const SET_REPORT_MANAGER_CONTROL_STRUCTURE = 'SET_REPORT_MANAGER_CONTROL_STRUCTURE';

// COMMON CONSTANT REPORTS
export const SET_TABLE_DATA = 'SET_TABLE_DATA';
export const SET_FILTER_REPORT_MANAGER = 'SET_FILTER_REPORT_MANAGER';
export const SET_ADVANCED_FILTER_CONTROL_STRUCTURE = 'SET_ADVANCED_FILTER_CONTROL_STRUCTURE';

//SECONDARY MARKET
export const SET_CONTROL_STRUCTURE_SECONDARY_MARKET = 'SET_CONTROL_STRUCTURE_SECONDARY_MARKET';
export const SET_DEPENDENT_DATA_ACCOUNT = 'SET_DEPENDENT_DATA_ACCOUNT';
export const SET_DEPENDENT_DATA_BANK = 'SET_DEPENDENT_DATA_BANK';
export const SET_DEPENDENT_DATA_SECURITY = 'SET_DEPENDENT_DATA_SECURITY';
//PNB CONSTANTS
export const SET_SM_ORDER_DETAILS_BY_ID = 'SET_SM_ORDER_DETAILS_BY_ID';
export const SET_DEPT_SEC_MARKET_CS = 'SET_DEPT_SEC_MARKET_CS';
export const SET_SECONDARY_ORDER = 'SET_SECONDARY_ORDER';
export const SET_CUSTOMER_DATA_SEC = 'SET_CUSTOMER_DATA_SEC';
export const SET_CALCULATE_SM_ORDER = 'SET_CALCULATE_SM_ORDER';
export const SET_SM_CALCULATOR = 'SET_SM_CALCULATOR';
export const SET_SOF_FORM_DATA = 'SET_SOF_FORM_DATA';
export const SET_JOINT_ACCOUNT_DETAILS = 'SET_JOINT_ACCOUNT_DETAILS';

//TICKET SUPPORT
export const SET_TICKET_SUPPORT_CONTROL_STRUCTURE = 'SET_TICKET_SUPPORT_CONTROL_STRUCTURE';
export const SET_TICKET_SUPPORT_LISTING_DATA = 'SET_TICKET_SUPPORT_LISTING_DATA';
