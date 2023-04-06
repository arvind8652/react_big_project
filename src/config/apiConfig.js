import { CONSTANTS } from '../constants/constants';
import dynamicConfig from './dynamicConfig';

const baseUrl = dynamicConfig.baseUrl;

const controlStructureBaseUrl = 'ControlStructure/GetControlStructure?prog_name=';
const getControlStructureApiUrl = (progName) => baseUrl + controlStructureBaseUrl + progName;

const reportsManagerApiUrls = {
	//common api
	getFilterReportManager: getControlStructureApiUrl(CONSTANTS.progNames.REPORTMANAGER),
	getTableReportManager: baseUrl + 'Order/ReportManager/GetReportManagerDetails',
	postSaveReportManager: baseUrl + 'Order/ReportManager/PostReportManager',
	postArchiveReportManager: baseUrl + 'Order/ReportManager/PostReportManagerUpdate',
	postDeleteReportManager: baseUrl + 'Order/ReportManager/PostReportManagerUpdate',
	postRegenerateReportManager: baseUrl + 'Order/ReportManager/PostReportManagerUpdate',
	getAdvancedFilter: baseUrl + 'Order/ReportManager/GetAdvancedFilter',
	postDownloadReportManager: baseUrl + 'Order/ReportManager/DownloadFile',

	//client statment api
	getClientStatementControlStructure: getControlStructureApiUrl(
		CONSTANTS.progNames.CLIENTSTATEMENT
	),

	getReportManagerCS: (progName) => {
		return getControlStructureApiUrl(progName);
	},

	getSecurityHoldingControlStructure: getControlStructureApiUrl(
		CONSTANTS.progNames.SECURITYHOLDING
	),

	getHoldingStatementControlStructure: getControlStructureApiUrl(CONSTANTS.progNames.HOLDINGST),

	getCustomerListControlStructure: getControlStructureApiUrl(CONSTANTS.progNames.CUSTOMERLIST),
	getDocumentStatusControlStructure: getControlStructureApiUrl(CONSTANTS.progNames.DOCUMENTSTATUS),
	getOrderStatusControlStructure: getControlStructureApiUrl(CONSTANTS.progNames.ORDERSTATUS),
	getTransactionStatementControlStructure: getControlStructureApiUrl(
		CONSTANTS.progNames.TRANSACTIONSTATEMENT
	),
	getWinnerLaggersControlStructure: getControlStructureApiUrl(CONSTANTS.progNames.WINNERLAGGERS)
};

const commonApiUrls = {
	getConfig: baseUrl + 'Users/GetConfig',
	getDependentData: baseUrl + 'Common/GetDependentData',
	getDependentDataOGT: baseUrl + 'Common/GetDependentDataOGT',
	getRmUserData: baseUrl + 'Common/GetBranchRmUser',
	getAttachmentDetails: (progName, recordId) => {
		return `${baseUrl}Common/GetAttachmentDetails?progName=${progName}&recordId=${recordId}`;
	},
	getMiscellaneousDetails: (progName, recordId) => {
		return `${baseUrl}Common/GetMiscellaneous?progName=${progName}&RefId=${recordId}`;
	},
	downloadAttachment: baseUrl + 'common/DownloadAttachments',
	getSecurityListDetails: baseUrl + 'Common/GetSecurityListDetails',
	getClientInfo: baseUrl + 'Common/GetClientInfo'
};
const controlStructureApiUrls = {
	getControlStructureApiUrl: (progName) => baseUrl + controlStructureBaseUrl + progName
};
const authApiUrls = {
	authenticateUser: baseUrl + 'Users/authenticate',
	authenticatePostLogin: baseUrl + 'Users/AuthenticatePostLogin',
	forgotPassword: baseUrl + 'Users/ForgotPassword',
	userPasswordRequest: baseUrl + 'Users/UserPasswordRequest',
	getGuidelines: baseUrl + 'Users/GetGuidelines?Language=EN',
	logout: baseUrl + 'Users/logout',
	otpRequestFormCs: getControlStructureApiUrl(CONSTANTS.progNames.AUTHPOSTLOGIN),
	singleSignOn: (userId, authcode) =>
		`${baseUrl}Users/authenticatebySingleSignOn?UserID=${userId}&authcode=${authcode}`,
	encryptedString: (userName, authID) =>
		`${baseUrl}Users/EncryptString?info=${userName}&authcode=${authID}`
};
const dashboardApiUrls = {
	getLeftPanel: baseUrl + 'Home/GetLeftPane',
	getClientLeftPanel: baseUrl + 'Home/GetClientLeftPanel?ClientID='
};
const financialPlanningCOUrls = {
	getFinancialPlanningCs: getControlStructureApiUrl(CONSTANTS.progNames.FINGOAL),
	getFinancialGoalApi: baseUrl + 'FP/FinancialPlanning/GetGoal',
	getCalculateApi: baseUrl + 'FP/FinancialPlanning/PostFinancialPlanning',
	getFinancialPlanningGoalsCO:
		baseUrl + 'FP/FinancialPlanning/GetFinancialGoalsForPortfolioOverview',
	financialPlanningDelete: baseUrl + 'FP/FinancialPlanning/DeleteFinGoal',
	financialPlanningEdit: baseUrl + 'FP/FinancialPlanning/GetFinancialGoalDetailsById',
	getIPSPDF: baseUrl + 'FP/FinancialPlanning/GetIPSPDF'
};
const ticketSupportCreationUrls = {
	getTicketSupportCreateCs: baseUrl + controlStructureBaseUrl + 'SERVICETKT',
	postTicketCreate: baseUrl + 'ServiceTicket/PostServiceTicket',
	getTicketSupoortOverview: baseUrl + 'ServiceTicket/ServiceTicketDetails'
};
const ticketSupportListingUrls = {
	getAllTicketSupportListingData: baseUrl + 'ServiceTicket/GetServiceTicketList'
};
const leadlistingApiUrls = {
	getLeadListingCs: getControlStructureApiUrl(CONSTANTS.progNames.LEADLIST),
	getAllLeads: baseUrl + 'Lead/GetAllLead',
	upgradeSelectedLeads: baseUrl + 'Lead/UpGrade',
	deleteSelectedLeads: baseUrl + 'Lead/Delete',
	assignSelecetedLeads: baseUrl + 'Lead/AssignTo',
	upgradeSelectedLeadCategory: baseUrl + 'Lead/UpGradeCategory',
	getLeadAdvFilter: baseUrl + 'Lead/GetAdvancedFilter'
};
const leadCreationUrls = {
	getLeadCreationCs: baseUrl + controlStructureBaseUrl + 'LEADADD',
	// getLeadCreationCs: getControlStructureApiUrl(CONSTANTS.progNames.LEADADD),
	postLead: baseUrl + 'Lead/PostLead'
};
const leadViewApiUrls = {
	getLeadView: baseUrl + 'Lead/GetLeadById?LeadId=',
	getNextOrPreviousLeadView: baseUrl + 'Lead/GetNavigation',
	deleteLead: baseUrl + 'Lead/Delete',
	upgradeLead: baseUrl + 'Lead/Upgrade',
	getCustomerDetail: baseUrl + 'common/GetCustomerDetail?'
};
const opportunityCreateApiUrls = {
	getOpportunityCreateCs: getControlStructureApiUrl(CONSTANTS.progNames.OPPORTUNITYADD),
	postOpportunity: baseUrl + 'Opportunity/PostOpportunity',
	getOpportunityCreationProbability: baseUrl + 'Opportunity/GetProbablityByStage?stage='
};
const opportunitylisitngApiUrls = {
	getOpportunityListingCs: getControlStructureApiUrl(CONSTANTS.progNames.OPPORTUNITYLIST),
	getAllOpportunity: baseUrl + 'Opportunity/GetAllOpportunity',
	changeOpportunitySTatus: baseUrl + 'Opportunity/ChangeOpportunityStatus',
	deleteSelectedOpportunity: baseUrl + 'Opportunity/Delete',
	assignFavoriteOpportunity: baseUrl + 'FeedReviewed/PostFeed',
	getOpportunityAdvFilter: baseUrl + 'Opportunity/GetAdvancedFilter'
};
const opportunityOverviewApiUrls = {
	getConStrikeRate: baseUrl + 'OpportunityView/GetConStrikeRate',
	getCurrPipeline: baseUrl + 'OpportunityView/GetCurrPipeline',
	getNearClosure: baseUrl + 'OpportunityView/GetNearClosure',
	getMissedDuedate: baseUrl + 'OpportunityView/GetMissedDuedate',
	getMovedUp: baseUrl + 'OpportunityView/GetMovedUp',
	getMovedDown: baseUrl + 'OpportunityView/GetMovedDown',
	getDueNow: baseUrl + 'OpportunityView/GetDueNow',
	getHighValueDeal: baseUrl + 'OpportunityView/GetHighValueDeal',
	getRecentCon: baseUrl + 'OpportunityView/GetRecentCon',
	getRecentMissed: baseUrl + 'OpportunityView/GetRecentMissed',
	getOpporBreakup: `${baseUrl}OpportunityView/GetOpporBreakup`,
	getAgingAnalysis: baseUrl + 'OpportunityView/GetAgingAnalysis',
	getSalesPipeline: baseUrl + 'OpportunityView/GetSalesPipeline',
	getExpectedCon: baseUrl + 'OpportunityView/GetExpectedCon',
	getConversionTrend: baseUrl + 'OpportunityView/GetConversionTrend',
	getOpporDistribution: `${baseUrl}OpportunityView/GetOpporDistribution`
};
const opportunityViewApiUrls = {
	getOpportunityViewCs: getControlStructureApiUrl(CONSTANTS.progNames.OPPORTUNITYVIEW),
	getOpportunityAddCs: getControlStructureApiUrl(CONSTANTS.progNames.OPPORTUNITYADD),
	getOpportunityView: baseUrl + 'Opportunity/GetOpportunityById?OpportunityId=',
	getHorizontalTimeline: baseUrl + 'Opportunity/HorizontalTimeline',
	getOpportunityVerticalTimeline: baseUrl + 'Opportunity/VerticalTimeline',
	getOpportunityAttachmentDetails:
		baseUrl + 'Common/GetAttachmentDetails?progName=OPPORTUNITYADD&recordId=',
	getOpportunityMiscellaneousDetails:
		baseUrl + 'Common/GetMiscellaneous?progName=OPPORTUNITYADD&RefId=',
	uploadAttachment: baseUrl + 'Common/UploadFiles',
	deleteOpportunity: baseUrl + 'Opportunity/Delete',
	updateOpportunityStageDetail: baseUrl + 'Opportunity/UpdateStage',
	postOpportunityClosedMissed: baseUrl + 'Opportunity/PostClosedMissed',
	getProbablityByStage: baseUrl + 'Opportunity/GetProbablityByStage?stage=',
	postNotesOnOpportunityView: baseUrl + 'Notes/PostNote',
	getNotesOnOpportunityView: baseUrl + 'Notes/GetNotesList'
};
const prospectlistingApiUrls = {
	getProspectListingCs: baseUrl + controlStructureBaseUrl + CONSTANTS.progNames.PROSPECTLIST,
	getAllProspect: baseUrl + 'Prospect/GetAllProspect',
	downgradeSelectedProspect: baseUrl + 'Prospect/DownGrade',
	deleteSelectedProspect: baseUrl + 'Prospect/Delete',
	assignFavoriteProspect: baseUrl + 'FeedReviewed/PostFeed',
	upgradeProspect: baseUrl + 'Prospect/UpGradeCategory',
	getProspectAdvFilter: baseUrl + 'Prospect/GetAdvancedFilter',
	postConvertProspectToClient: baseUrl + 'Prospect/AssignToRM'
};

const prospectsViewApiUrls = {
	getProspects360View: baseUrl + 'Prospect360View/ProspectDetails',
	getProspectCustomerDetail: baseUrl + 'common/GetCustomerDetail?',
	getProspectVerticalTimeline: baseUrl + 'Prospect360View/VerticalTimeline',
	uploadProspectAttachment: baseUrl + 'common/UploadFiles',
	getHorizontalGraph: baseUrl + 'Prospect360View/HorizontalGraph',
	getHorizontalGraphClick: baseUrl + 'Prospect360View/HorizontalGraphClick',
	getProspectMiscellaneous: baseUrl + 'Common/GetMiscellaneous?progName=PROSPECTADD&RefId=',
	getProspectRelations: baseUrl + 'Prospect360View/ProspectRelations',
	getProspectOpportunity: baseUrl + 'Prospect360View/ProspectOpportunity',
	getProspectInteraction: baseUrl + 'Prospect360View/ProspectInteraction',
	getProspectTask: baseUrl + 'Prospect360View/ProspectTask',
	getProspectNotes: baseUrl + 'Prospect360View/ProspectNotes',
	downGradeProspect: baseUrl + 'Prospect360View/ProspectDownGrade',
	deleteProspect: baseUrl + 'Prospect360View/ProspectDelete',
	getProspectAttachmentDetails:
		baseUrl + 'Common/GetAttachmentDetails?progName=PROSPECTADD&recordId=',
	postConvertProspectToCustomer: baseUrl + 'Prospect360View/PostProspectMapToCustomer'
};
const prospectsOverviewApiUrls = {
	getRepositoryData: baseUrl + 'Prospect/GetRepositoryData',
	getQualificationStatus: baseUrl + 'Prospect/GetQualificationStatus',
	getInterestLevelCount: baseUrl + 'Prospect/GetInterestLevelCount',
	getProspectConvMonthlyTrend: baseUrl + 'Prospect/GetProspectConvMonthlyTrend',
	getDemographicData: baseUrl + 'Prospect/GetDemographicData?DType=',
	getProspectSourceCountData: baseUrl + 'Prospect/GetProspectSourceCount',
	getProspectCreationData: baseUrl + 'Prospect/GetProspectCreationTrend',
	getLeadCreationData: baseUrl + 'Prospect/GetLeadCreationTrend',
	getCampaignType: baseUrl + 'Prospect/GetCampaignType?DType=',
	getActiveCampaignGraph: baseUrl + 'Prospect/GetActiveCampaignGraph',
	getEnquiryGraph: baseUrl + 'Prospect/GetEnquiryGraph',
	getRecentLead: baseUrl + 'Prospect/GetOverviewRecentLead',
	getRecentProspect: baseUrl + 'Prospect/GetOverviewRecentProspect',
	getRecentCampaign: baseUrl + 'Prospect/GetRecentCampaign'
};
const prospectCreateApiUrls = {
	getProspectCreateCs: getControlStructureApiUrl(CONSTANTS.progNames.PROSPECTADD),
	postProspect: baseUrl + 'Prospect/PostProspect'
};
//My Interactions
const interactionCreateApiUrls = {
	getInteractionCreateCs: getControlStructureApiUrl(CONSTANTS.progNames.INTERACTIONADD),
	postInteraction: baseUrl + 'Interaction/PostInteraction',
	getExistingInteraction: baseUrl + 'Interaction/GetInteractionHistory?RefType='
};
const interactionViewApiUrls = {
	getInteractionViewCs: getControlStructureApiUrl(CONSTANTS.progNames.INTERACTIONVIEW),
	getInteractionAddCs: getControlStructureApiUrl(CONSTANTS.progNames.INTERACTIONADD),
	getInteractionView: baseUrl + 'Interaction/GetInteractionById?',
	getVerticalTimeline: baseUrl + 'Interaction/GetTimeline?RefID=',
	// getAttachmentDetails:
	// baseUrl + "Common/GetAttachmentDetails?progName=INTERACTIONADD&recordId=",
	getInteractionMiscellaneousDetails: baseUrl + 'Common/GetMiscellaneous?',
	uploadAttachment: baseUrl + 'Common/UploadFiles',
	deleteInteraction: baseUrl + 'Interaction/Delete',
	updateInteractionCloseOccurrence: baseUrl + 'Interaction/UpdateCloseOccurrence',
	getInteractionHistory:
		baseUrl + 'Interaction/GetInteractionHistory?RefType=PROSPECTADD&followUpId=',
	postOccurrence: baseUrl + 'Interaction/PostOccurrence'
};

const interactionlistingApiUrls = {
	getInteractionListingCs: getControlStructureApiUrl(CONSTANTS.progNames.INTERACTIONLIST),
	getAllInteraction: baseUrl + 'Interaction/GetAllInteraction',
	deleteSelectedInteraction: baseUrl + 'Interaction/Delete',
	getInteractionAdvFilter: baseUrl + 'Interaction/GetAdvancedFilter'
};

const tasklistingApiUrls = {
	getTaskListingCs: getControlStructureApiUrl(CONSTANTS.progNames.TASKLIST),
	getAllTask: baseUrl + 'Interaction/GetAllInteraction',
	deleteSelectedTask: baseUrl + 'Interaction/Delete'
};

const customerListingApiUrls = {
	getCustomerListingCs: getControlStructureApiUrl(CONSTANTS.progNames.MYCUSTOMERS),
	getAllCustomers: baseUrl + 'Order/Customer/GetAllCustomers',
	getAccountDetails: baseUrl + 'Order/Customer/GetAccountDetails',
	getCustomerSourceDetails: baseUrl + 'common/GetCustomerDetail?',
	postFeed: baseUrl + 'FeedReviewed/PostFeed',
	upgradeDowngradeCustomerApi: baseUrl + 'Order/Customer/InsertUpdateWorkFlowLog',
	refreshCustomerlisting: baseUrl + 'Order/Customer/RefreshClientCache'
};

const customerOnboardingLisitinApiUrls = {
	getCustomerOnboardingListingCs: getControlStructureApiUrl(
		CONSTANTS.progNames.CUSTOMERONBOARDINGLIST
	),
	getAllCustomersOnboarding: baseUrl + 'Order/Customer/GetOnBoardingCustomers',
	assignSelectedCustomerOnboarding: baseUrl + 'Order/Customer/AssignTo',
	terminateCustomerOnboarding: baseUrl + 'Order/Customer/TerminateClient'
};

const customerCreateApiUrls = {
	getCustomerCreateCs: getControlStructureApiUrl(CONSTANTS.progNames.CLIENTREQADD),
	postCustomer: baseUrl + 'Order/Customer/PostClient',
	createNewFamilyName: baseUrl + 'Order/Customer/PostFamilyName',
	getDocumentDetails: baseUrl + 'Order/Customer/GetDocumentDetails',
	getQuestionAnswerList: baseUrl + 'Order/AccountDrilldown/GetQuestionsAnswersList',
	calculateScore: baseUrl + 'Order/AccountDrilldown/CalculateScoreAndRecommendedCategory',
	isHeadOfTheFamily: baseUrl + 'Order/Customer/IsHeadOfFamilyExists',
	getCustomerDetailsForCustomer: baseUrl + 'Order/Customer/GetCustomerDetails',
	getMiscellaneousDetailsForCustomer: baseUrl + 'Prospect360View/ProspectMiscellaneous',
	getRelationshipDetails: baseUrl + 'Prospect360View/ProspectRelations',
	getCifValidation: baseUrl + 'Order/Customer/CheckClientCIF'
};

const customerViewApiUrls = {
	getCustomerOnboardingView: baseUrl + 'Order/Customer/GetCustomerOnboarding',
	getWorkflowStatus: baseUrl + 'Order/Customer/GetWorkflowStatus',
	getCustomerViewTimeline: baseUrl + 'Order/Customer/GetTimeline',
	getCustomerMiscellaneous: baseUrl + 'Common/GetMiscellaneous?progName=CLIENTREQADD&RefId=',
	getCustomerViewProspectRelations: baseUrl + 'Prospect360View/ProspectRelations',
	getCustomerAttachmentDetails:
		baseUrl + 'Common/GetAttachmentDetails?progName=CLIENTREQADD&recordId=',
	getProspectAttachmentDetails:
		baseUrl + 'Common/GetAttachmentDetails?progName=PROSPECTADD&recordId=',
	downloadAttachments: baseUrl + 'common/DownloadAttachments',
	uploadFiles: baseUrl + 'common/UploadFiles',
	GetDocumentDetails: baseUrl + 'Order/Customer/GetDocumentDetails',
	DeleteClient: baseUrl + 'Order/Customer/DeleteClient',
	approveRejectCustomers: baseUrl + 'Order/Customer/InsertUpdateWorkFlowLog',
	terminateCustomer: baseUrl + 'Order/Customer/Terminate',
	upgradeOrDownGradeCustomer: baseUrl + 'Order/Customer/UpgradeDowngrade'
};

const taskViewApiUrls = {
	getTaskViewCs: getControlStructureApiUrl(CONSTANTS.progNames.TASKVIEW),
	getTaskAddCs: getControlStructureApiUrl(CONSTANTS.progNames.TASKADD),
	getTaskView: baseUrl + 'Interaction/GetInteractionById?',
	getTaskMiscellaneousDetails: baseUrl + 'Common/GetMiscellaneous?progName=TASKBOARD&RefId=',
	getTaskAttachmentDetails: baseUrl + 'Common/GetAttachmentDetails?progName=TASKBOARD&recordId=',
	uploadTaskAttachment: baseUrl + 'Common/UploadFiles',
	downloadTaskAttachment: baseUrl + 'Common/DownloadAttachments',
	deleteTask: baseUrl + 'Interaction/delete',
	updateTaskCloseOccurrence: baseUrl + 'Interaction/UpdateCloseOccurrence',
	getTaskHistory: baseUrl + 'Interaction/GetInteractionHistory?RefType=PROSPECTADD&followUpId='
};

const engagementApiUrls = {
	getActivities: baseUrl + 'InteractionOverview/MyActivities',
	getTasks: baseUrl + 'InteractionOverview/ActiveTasks',
	getActivityGraph: baseUrl + 'InteractionOverview/ActivityGraph',
	getTasksGraph: baseUrl + 'InteractionOverview/ActiveTasksGraph',
	getActivityInteraction: baseUrl + 'InteractionOverview/ActiveInteractions',
	getActivityInteractionGraph: baseUrl + 'InteractionOverview/ActiveInteractionsGraph',
	getActivityInteractionType: baseUrl + 'InteractionOverview/ActiveInteractionsType',
	getInteractionBreakupGraph: baseUrl + 'InteractionOverview/InteractionBreakupGraph?Dropdown=',
	getTaskBreakupGraph: baseUrl + 'InteractionOverview/TaskBreakupGraph?Dropdown=',
	getOpenIntegrationData: baseUrl + 'InteractionOverview/OpenInteractions',
	getOpenTaskData: baseUrl + 'InteractionOverview/OpenTasks',
	getTrendExecuted: baseUrl + 'InteractionOverview/ActivityTrendExecuted',
	getTrendPlanned: baseUrl + 'InteractionOverview/ActivityTrendPlanned'
};

const taskCreateApiUrls = {
	getTaskCreateCs: getControlStructureApiUrl(CONSTANTS.progNames.TASKADD),
	postTask: baseUrl + 'Task/PostTask'
};

// const accountViewApiUrls = {
//   getAccountDetailsData:
//     baseUrl + "Order/AccountCreation/GetAccountDetailsByID",
//   getDocumentDetails: baseUrl + "Order/Customer/GetDocumentDetails",
//   getTimelineData: baseUrl + "Order/Customer/GetTimeline",
// };

const accountCreateApiUrls = {
	getAccountCreateCs: getControlStructureApiUrl(CONSTANTS.progNames.ACCOUNTREQADD),
	postAccountCs: baseUrl + 'Order/AccountCreation/PostAccount',
	getAccountBasedAccess: baseUrl + 'Order/AccountCreation/AccountBasedAccess',
	getRiskProfileQA: baseUrl + 'Order/AccountDrilldown/GetQuestionsAnswersList',
	getAccountDetailsForAccountEdit: baseUrl + 'Order/AccountCreation/GetAccountDetailsByID',
	getAccountDetailsForProfileAccountEdit:
		baseUrl + 'Order/AccountCreation/GetClientAccountDetailsByID',
	getAccountNameValidation: baseUrl + 'Order/AccountCreation/CheckAccountName',
	getOwnershipDetails: baseUrl + 'Order/AccountCreation/GetAccountDetailsByClientId'
};

const tradeBookListApiUrls = {
	getTradeBookListCs: getControlStructureApiUrl(CONSTANTS.progNames.TRADEBOOKLIST),
	getTradeBookList: baseUrl + 'Order/Transactions/GetTradeBookList',
	getAdvancedFilterTradeBook: baseUrl + 'Order/Transactions/GetAdvancedFilter',
	imagesUrl: baseUrl + 'images/'
};

const tradeBookViewApiUrls = {
	// getTradeBookDetails: baseUrl + "Order/Transactions/GetTradeBookDetails?",
	// getVerticalTimeline: baseUrl + "Order/Transactions/GetVerticalTimeline?",
	getTradeBookViewSecurityDetails: baseUrl + `Common/GetSecurityListDetails`,
	getTradeBookViewDetails: (dealId, refType) => {
		return baseUrl + `Order/Transactions/GetTradeBookDetails?dealId=${dealId}&refType=${refType}`;
	},
	getTradeBookViewVerticalTimeline: (dealId, refType) => {
		return baseUrl + `Order/Transactions/GetVerticalTimeline?dealId=${dealId}&refType=${refType}`;
	}
};

const accountViewApiUrls = {
	getAccountDetailsData: baseUrl + 'Order/AccountCreation/GetAccountDetailsByID',
	getDocumentDetails: baseUrl + 'Order/Customer/GetDocumentDetails',
	getTimelineData: baseUrl + 'Order/Customer/GetTimeline',
	getAttachmentDetils: baseUrl + 'Common/GetAttachmentDetails?progName=ACCOUNTREQADD&recordId=',
	getAccountMiscellaneous: baseUrl + 'Common/GetMiscellaneous?progName=ACCOUNTREQADD&RefId=',
	accountStatusUpdate: baseUrl + 'Order/AccountCreation/InsertUpdateWorkFlowLogForAccount',
	deleteAccount: baseUrl + 'Order/AccountCreation/DeleteAccount',
	AccountProfileImage: (refId) => {
		return baseUrl + `common/GetProfileImage?RefId=${refId}&RefType=CLIENTADD`;
	}
};

const portfolioHoldingsApiUrls = {
	getPortfolioHoldingsCs: getControlStructureApiUrl(CONSTANTS.progNames.POHOLDING),
	getAssetClasswiseData: baseUrl + 'Order/PortfolioHolding/Assetclasswisedata',
	getTopHolding: baseUrl + 'Order/PortfolioHolding/TopHolding',
	getInvestmentAllocation: baseUrl + 'Order/PortfolioHolding/InvestmentAllocation',
	getHoldingAmount: baseUrl + 'Order/PortfolioHolding/HoldingAmount',
	getAssettypeWise: baseUrl + 'Order/PortfolioHolding/AssettypeWise',
	getSecurityDetail: baseUrl + 'Order/PortfolioHolding/GetSecurityDetail',
	getStockSecurityDetail: baseUrl + 'Order/PortfolioHolding/GetSecurityDetail'
};

const profileViewAccountApiUrls = {
	getProfileVerticalTimeline: baseUrl + 'Order/Customer/GetVerticalTimeline?ClientID=',
	getProfileAttachmentDetails:
		baseUrl + 'Common/GetAttachmentDetails?progName=ACCOUNTADD&recordId=',
	getProspectRelations: baseUrl + 'Prospect360View/ProspectRelations',
	clientRelations: baseUrl + 'Order/Customer/ClientRelations?ClientID=',
	getCustomerDetails: baseUrl + 'Order/Customer/GetCustomerDetails',
	getProfileMiscellaneous: baseUrl + 'Common/GetMiscellaneous?progName=ACCOUNTADD&RefId=',
	downloadAttachments: baseUrl + 'common/DownloadAttachments',
	uploadFiles: baseUrl + 'common/UploadFiles',
	getDocumentDetails: baseUrl + 'Order/Customer/GetDocumentDetails',
	getCommonCustomerDetails: baseUrl + 'common/GetCustomerDetail?RefType=Customer&Id=',
	getClientAccountDetailsByID: baseUrl + 'Order/AccountCreation/GetClientAccountDetailsByID',
	getAccountDetails: baseUrl + 'Order/Customer/GetAccountDetails'
};
const topSearchMainApiUrls = {
	getSearchResults: baseUrl + 'Home/GetSearchResults'
};

const accountListApiUrls = {
	getAllPendingAccounts: baseUrl + 'Order/AccountCreation/GetAllPendingAccounts',
	// approveRejectAccounts: baseUrl + 'Order/Customer/InsertUpdateWorkFlowLog',
	approveRejectAccounts: baseUrl + 'Order/AccountCreation/InsertUpdateWorkFlowLogForAccount',
	getAccountListingCs: getControlStructureApiUrl(CONSTANTS.progNames.ACCOUNTLIST)
};

// const documentManagerApiUrls = {
//   getDocumentManagerDetailsData:
//     baseUrl + "Order/Customer/GetDocumentManagerDetails",
//   getUploadDocumentToDB: baseUrl + "Order/Customer/UploadDocumentToDB",
//   getDocumentForDownload: baseUrl + "Order/Customer/GetDocumentForDownload",
//   getAdvancedFilter: baseUrl + "Order/Customer/GetAdvancedFilter",
//   getControlStructure: getControlStructureApiUrl(CONSTANTS.progNames.DOCUMENTS),
// };

const documentManagerApiUrls = {
	getDocumentManagerDetailsData: baseUrl + 'Order/Customer/GetDocumentManagerDetails',
	getUploadDocumentToDB: baseUrl + 'Order/Customer/UploadDocumentToDB',
	getDocumentForDownload: baseUrl + 'Order/Customer/GetDocumentForDownload',
	getDocAdvancedFilter: baseUrl + 'Order/Customer/GetAdvancedFilter',
	getControlStructure: getControlStructureApiUrl(CONSTANTS.progNames.DOCUMENTS)
};

const crmHomeApiUrls = {
	getUserInfoData: baseUrl + 'Home/UserInfo',
	getBranchUserInfoData: baseUrl + 'Home/BranchUserInfo',
	getNotesData: baseUrl + 'Home/Notes',
	getTopFeedData: baseUrl + 'Home/TopFeed',
	getActivityData: baseUrl + 'Home/ActivitySchedule',
	getInvestmentCartData: baseUrl + 'Home/InvestmentCart',
	getTopCustomersData: baseUrl + 'Home/TopCustomers',
	getOpenOrdersData: baseUrl + 'Home/OpenOrders',
	getRecentProspectsData: baseUrl + 'Home/RecentProspects',
	getAumTrendData: baseUrl + 'Home/AumTrend',
	getRevenueTrendData: baseUrl + 'Home/RevenueTrend',
	getRelationshipTrendData: baseUrl + 'Home/RelationshipTrend',
	getExpectedBusinessData: baseUrl + 'Home/ExpectedBusiness',
	getTrendingProductsData: baseUrl + 'Home/OutPerformer',
	getHighValueDealsData: baseUrl + 'OpportunityView/GetHighValueDeal',
	getInvestmentCartMandateData: baseUrl + 'Home/InvestmentCartMandate',
	getPlacedMandatesData: baseUrl + 'Home/PlacedMandates',
	getUpcomingOrdersData: baseUrl + 'Home/UpcomingOrders',
	getPerformanceData: baseUrl + 'Home/Performance',
	getCRMHomeCS: baseUrl + 'ControlStructure/GetControlStructure?prog_name=HOMEPAGE',
	getSecurityList: baseUrl + 'Common/GetSecurityListDetails'
};

const calerderDataApi = {
	getCalederData: baseUrl + 'Home/GetTopBarCalendarData'
};

const calendarApiUrls = {
	getCalendarDetails: baseUrl + 'Calendar/GetCalendar',
	getCalendarEvents: baseUrl + 'Calendar/GetCalendarEventList'
};

const notificationApiUrls = {
	getNotifications: baseUrl + 'Home/GetNotifications',
	updateNotificationStatus: baseUrl + 'Home/UpdateNotificationStatus'
};

const topBarApiUrls = {
	getQuickAddMenuItems: baseUrl + 'Home/GetQuickAddMenuItems',
	getFavourites: baseUrl + 'Home/GetTopBarFavorites'
};

const exploreProductsApiUrls = {
	getExploreProductsDetails: baseUrl + 'Order/ExploreProduct/ExploreProductsDtls',
	postWatchList: baseUrl + 'Order/ExploreProduct/PostWatchList',
	getExpProdControlStructure: getControlStructureApiUrl(CONSTANTS.progNames.EXPLOREPRODUCT),
	getExpProdAdvancedFilter: baseUrl + 'Order/ExploreProduct/GetAdvancedFilter'
};

const accountDrilldownApiUrls = {
	getPortfolioPerformanceBasedOnCapital:
		baseUrl + 'Order/AccountDrilldown/GetPortfolioPerformanceBasedOnCapital',
	getPortfolioAllocationBasedOnAssetClass:
		baseUrl + 'Order/AccountDrilldown/GetPortfolioAllocationBasedOnAssetClass',
	getAllocationTrendData: baseUrl + 'Order/AccountDrilldown/GetAllocationTrendData',
	getTopHoldings: baseUrl + 'Order/AccountDrilldown/GetTopHoldings',
	getWinnersAndLaggers: baseUrl + 'Order/AccountDrilldown/GetWinnersAndLagers',
	getTop3AccountData: baseUrl + 'Order/AccountDrilldown/GetTop3AccountData',
	getAccountDetail: baseUrl + 'Order/AccountDrilldown/GetAccountDetail',
	getCapitalInvestedGraphData: baseUrl + 'Order/AccountDrilldown/GetCapitalInvestedGraphData',
	getInvestmentValueGraphData: baseUrl + 'Order/AccountDrilldown/GetInvestmentValueGraphData',
	getPortfolioActivityGraph: baseUrl + 'Order/AccountDrilldown/GetPortfolioActivityGraph',
	getRiskProfileData: baseUrl + 'Order/AccountDrilldown/GetRiskProfileData',
	getPortfolioDerivationData: baseUrl + 'Order/AccountDrilldown/GetPortfolioDeviationData',
	getAccountList: baseUrl + 'Order/AccountDrilldown/GetAccountList',
	getPortfolioPerformanceBasedOnBenchmark:
		baseUrl + 'Order/AccountDrilldown/GetPortfolioPerformanceBasedOnBenchmark',
	getDependentDataAccountDrilldown: baseUrl + 'common/GetDependentData',
	getAccountDrilldownControlStructure: getControlStructureApiUrl(CONSTANTS.progNames.ACCDRILLDOWN),
	getAssetTypeWiseData: baseUrl + 'Order/PortfolioHolding/AssettypeWise'
};

const portfolioOverviewApiUrls = {
	getCustomerInfo: `${baseUrl}Order/PortfolioOverview/GetCustomerInfo`,
	getAccountList: `${baseUrl}Order/PortfolioOverview/GetAccountList`,
	getRiskProfileModel: `${baseUrl}Order/PortfolioOverview/GetRiskProfileModel`,
	getInvestmentAccountData: `${baseUrl}Order/PortfolioOverview/GetinvestmentAccountData`,
	getOpportunities: `${baseUrl}Order/PortfolioOverview/GetOpportunities`,
	getInvestmentCartOrders: `${baseUrl}Order/OrderCart/GetInvestmentCartOrders`
	// getOpenOrdersData1: `${baseUrl}Home/OpenOrders`,
};

const ORDER_BOOK = `${baseUrl}Order/OrderBook/`;

export const primaryMarketApiUrls = {
	primaryOrderControlStructure: getControlStructureApiUrl(CONSTANTS.progNames.ORDERPRADD),
	postPrimaryOrder: `${ORDER_BOOK}PostPrimaryOrder`,
	getPrimaryMarketOrderDetails: `${ORDER_BOOK}GetPMOrderDetailsByID`,
	updateWorkFlowLogForPMDeal: `${ORDER_BOOK}InsertUpdateWorkFlowLogForPMDeal`,
	deleteWorkFlowOrder: `${ORDER_BOOK}DeletePMOrder`,
	getCustomerDetailInPM: (RefType, Id, Scheme) =>
		`${baseUrl}common/GetCustomerDetail?RefType=${RefType}&Id=${Id}&Scheme=${Scheme}`,
	getClientAddressDetails: `${ORDER_BOOK}GetClientAddressDetails`,
	getDefaultBankAccountAndCustodian: `${ORDER_BOOK}GetDefaultBankAccountAndCustodian`,
	getPrimaryMarketExploreProductData: `${ORDER_BOOK}GetExploreData`
};

const customerOverviewUrl = `${baseUrl}Order/ClientOverview/`;
const customerOverviewApiUrls = {
	customerOverviewControlStructure: getControlStructureApiUrl(CONSTANTS.progNames.CLIENTOVERVIEW),
	getCustomerPortfolioData: `${customerOverviewUrl}CustomerPortfolio`,
	getRecentTrends: `${customerOverviewUrl}RecentTrends`,
	getLargeWithdrawal: `${customerOverviewUrl}LargeWithdrawal`,
	getRecentContribution: `${customerOverviewUrl}RecentContribution`,
	getOutperformers: `${customerOverviewUrl}Outperformers`,
	getUnderPerformers: `${customerOverviewUrl}Underperformers`,
	getDormant: `${customerOverviewUrl}Dormant`,
	getTopWallet: `${customerOverviewUrl}TopWallet`,
	getTopRevenue: `${customerOverviewUrl}TopRevenue`,
	getAssetAllocation: `${customerOverviewUrl}AssetAllocation`,
	getRiskDistribution: (clientType) => {
		return `${customerOverviewUrl}RiskDistribution?ClientType=${clientType}`;
	},
	getDemographics: (clientType, fillterParam) => {
		return `${customerOverviewUrl}Demographics?ClientType=${clientType}&Filterparam=${fillterParam}`;
	}
};

const secondaryMarketApiUrls = {
	getControlStructureSecondaryMarket: getControlStructureApiUrl(CONSTANTS.progNames.ORDERSECADD),
	getDependentDataSecondaryMarket: baseUrl + 'common/GetDependentData',
	getDocumentDetailsSecondaryMarket: baseUrl + 'Order/Customer/GetDocumentDetails',
	getClientInfoSecondaryMarket: baseUrl + 'Common/GetClientInfo',
	getCustomerDetailSecondaryMarket:
		baseUrl + 'common/GetCustomerDetail?RefType=Customer&Id=ANDREWC',
	getXIRROrYieldCalculation: baseUrl + 'Order/OrderBook/XIRROrYieldCalculation',
	getSecurityListDetailsSecondaryMarket: baseUrl + 'Common/GetSecurityListDetails'
};

export const pNBApiUrls = {
	getSMOrderDetailsByID: `${baseUrl}Order/OrderBook/GetSMOrderDetailsByID`,
	deleteSMOrder: `${baseUrl}Order/OrderBook/DeleteSMOrder`,
	deptSecyOrderControlStructure: getControlStructureApiUrl(CONSTANTS.progNames.ORDERSMADD),
	getCustomerDetailInSM: (RefType, Id, Scheme) =>
		`${baseUrl}common/GetCustomerDetail?RefType=${RefType}&Id=${Id}&Scheme=${Scheme}`,
	getJointAccountHolderName: (Scheme) => `${baseUrl}common/GetJointHolderNames?Scheme=${Scheme}`,
	insertUpdateWorkFlowLogForSMDeal: `${ORDER_BOOK}InsertUpdateWorkFlowLogForSMDeal`,
	calculateSMOrderDetails: `${ORDER_BOOK}CalculateSMOrder`,
	postSecondaryMarketOrder: `${ORDER_BOOK}PostSecondaryMarketOrder`
};

export const orderBookListApiUrls = {
	orderBookCS: getControlStructureApiUrl(CONSTANTS.progNames.ORDERBOOKLIST),
	orderBookAdvanceFilter: `${baseUrl}Order/OrderBook/GetAdvancedFilter`,
	getOrderBookList: `${baseUrl}Order/OrderBook/GetOrderBookList`
};

export const apiRequestUrls = {
	...controlStructureApiUrls,
	...authApiUrls,
	...dashboardApiUrls,
	...commonApiUrls,
	...financialPlanningCOUrls,
	...ticketSupportCreationUrls,
	...ticketSupportListingUrls,
	...leadlistingApiUrls,
	...leadCreationUrls,
	...leadViewApiUrls,
	...opportunityCreateApiUrls,
	...opportunityOverviewApiUrls,
	...opportunitylisitngApiUrls,
	...opportunityViewApiUrls,
	...prospectlistingApiUrls,
	...prospectsViewApiUrls,
	...prospectsOverviewApiUrls,
	...prospectCreateApiUrls,
	...interactionCreateApiUrls,
	...interactionViewApiUrls,
	...interactionlistingApiUrls,
	...customerListingApiUrls,
	...customerOnboardingLisitinApiUrls,
	...customerCreateApiUrls,
	...customerViewApiUrls,
	...taskViewApiUrls,
	...engagementApiUrls,
	...tasklistingApiUrls,
	...taskCreateApiUrls,
	...accountViewApiUrls,
	...accountCreateApiUrls,
	...accountListApiUrls,
	...portfolioHoldingsApiUrls,
	...profileViewAccountApiUrls,
	//...orderBookListApiUrls,
	//...documentManagerApiUrls,
	...accountViewApiUrls,
	...documentManagerApiUrls,
	...tradeBookListApiUrls,
	...tradeBookViewApiUrls,
	...crmHomeApiUrls,
	...calendarApiUrls,
	...calerderDataApi,
	...notificationApiUrls,
	...topBarApiUrls,
	...topSearchMainApiUrls,
	...exploreProductsApiUrls,
	...accountDrilldownApiUrls,
	...exploreProductsApiUrls,
	...portfolioOverviewApiUrls,
	...customerOverviewApiUrls,
	...reportsManagerApiUrls,
	...pNBApiUrls,
	...secondaryMarketApiUrls
};
