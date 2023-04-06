import TopBar from '../../components/TopBar/TopBar';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import LeadCreationScreen from '../../screens/LeadCreationScreen/LeadCreationScreen';
import LeadListingScreen from '../../screens/LeadListingScreen/LeadListingScreen';
import LeadViewScreen from '../../screens/LeadViewScreen/LeadViewScreen';
import OpportunityListingScreen from '../../screens/OpportunityListingScreen/OpportunityListingScreen';
import OpportunityViewScreen from '../../screens/OpportunityViewScreen/OpportunityViewScreen';
import OpportunityCreateScreen from '../../screens/OpportunityCreateScreen/OpportunityCreateScreen';
import OpportunityOverviewScreen from '../../screens/OpportunityOverviewScreen/OpportunityOverviewScreen';
import OpportunityListingScreenCard from '../../screens/OpportunityListingScreen/OpportunityListingScreenCard';
import ProspectViewScreen from '../../screens/ProspectViewScreen/ProspectViewScreen';
import ProspectListingScreen from '../../screens/ProspectListingScreen/ProspectListingScreen';
import ProspectOverviewScreen from '../../screens/ProspectOverviewScreen/ProspectOverviewScreen';
import ProspectCreateScreen from '../../screens/ProspectCreateScreen/ProspectCreateScreen';
import InteractionCreateScreen from '../../screens/InteractionCreateScreen/InteractionCreateScreen';
import InteractionViewScreen from '../../screens/InteractionViewScreen/InteractionViewScreen';
import InteractionListingScreen from '../../screens/InteractionListingScreen/InteractionListingScreen';
import CompLeadCreateScreen from '../../screens/CompLeadCreateScreen/CompLeadCreateScreen';
import CustomerListingScreen from '../../screens/CustomerListingScreen/CustomerListingScreen';
import CustomerCreateScreen from '../../screens/CustomerCreateScreen/CustomerCreateScreen';
import CustomerOnboardingListingScreen from '../../screens/CustomerOnboardingListingScreen/CustomerOnboardingListingScreen';
import CompOpportunityCreateScreen from '../../screens/CompOpportunityCreateScreen/CompOpportunityCreateScreen';
import TaskViewScreen from '../../screens/TaskViewScreen/TaskViewScreen';
import TaskListingScreen from '../../screens/TaskListingScreen/TaskListingScreen';
import EngagementOverviewScreen from '../../screens/EngagementOverviewScreen/EngagementOverviewScreen';
import TaskCreateScreen from '../../screens/TaskCreateScreen/TaskCreateScreen';
import CustomerOverviewScreen from '../../screens/CustomerOverviewScreen/CustomerOverviewScreen';
import AccountViewScreen from '../../screens/AccountViewScreen/AccountViewScreen';
import CustomerViewScreen from '../../screens/CustomerViewScreen/CustomerViewScreen';
import ProfileViewAccount from '../../screens/ProfileViewAccount/ProfileViewAccount';
import DocumentManagerScreen from '../../screens/DocumentManagerScreen/DocumentManagerScreen';

import PortfolioHoldingsScreen from '../../screens/PortfolioHoldingsScreen/PortfolioHoldingsScreen';
import OrderBookScreen from '../../screens/OrderBook/OrderBookScreen';
import AccountCreateScreen from '../../screens/AccountCreateScreen/AccountCreateScreen';
import AccountListingScreen from '../../screens/AccountListingScreen/AccountListingScreen';
import OrderbookInputScreen from '../../screens/OrderbookInputScreen/OrderbookInputScreen';
import InvestmentOrderScreen from '../../screens/DebtSecondaryOrderBook/InvestmentOrderScreen';

import OrderBookEquityViewScreen from '../../screens/OrderBookScreen/OrderBookEquityViewScreen';
import OrderBookMutualFundViewScreen from '../../screens/OrderBookMutualFundViewScreen/OrderBookMutualFundViewScreen';

import CustomerTradeBookListing from '../../screens/Customer360Screen/CustomerTradeBookListing';
import CustomerTradeBookView from '../../screens/Customer360Screen/CustomerTradeBookView';

import TransactionTradeBookListing from '../../screens/TransactionTradeBookScreen/TransactionTradeBookListing';
import TransactionTradeBookView from '../../screens/TransactionTradeBookScreen/TransactionTradeBookView';

import TopSearchMain from '../../components/TopBarSearch/TopSearchMain';

import CalendarScreen from '../../screens/CalendarScreen/CalendarScreen';
import RMExploreProduct from '../../screens/RMExploreProduct/RMExploreProduct';
import CustomerExploreProduct from '../../screens/CustomerExploreProduct/CustomerExploreProduct';
import PortfolioOverviewScreen from '../../screens/PortfolioOverviewScreen/PortfolioOverviewScreen';
import FeedScreen from '../../screens/FeedScreen/FeedList';
import AccountDrilldownScreen from '../../screens/AccountDrilldownScreen/AccountDrilldownScreen';
import ReportsManagerMain from '../../screens/Reports Manager/ReportsManagerMain';

import InvestmentOrder from '../../screens/PrimaryMarket/InvestmentOrder';
import PMInputScreen from '../../screens/PrimaryMarket/PMInputScreen';
import OrderBook360 from '../../screens/PrimaryMarket/OrderBook360';
import CustomerOverviewNewScreen from '../../screens/CustomerOverviewScreen/CustomerOverviewNewScreen';
import DeptSecCustomerView from '../../screens/DeptSecCustomerView/DeptSecCustomerView';
import WealthManagementOnboardingForm from '../../screens/WealthManagementOnboardingForm/WealthManagementOnboardingForm';
import TestingComponent from '../../TestingComponent';
import ExploreProduct from '../../screens/ExploreProducts/ExploreProduct';
import TicketSupportCreateScreen from '../../screens/TicketSupport/TicketSupportCreate/TicketSupportCreateScreen';
import TicketSupportListing from '../../screens/TicketSupport/TicketSupportListing/TicketSupportListingScreen';
import SeviceTicketOverview from '../../screens/TicketSupport/TicketSupportOverview/SeviceTicketOverview';
// import NewCsafPdf from '../../components/Forms/RiskProfileFormCard/newCsafPdf';

export const routes_dashboard = [
	// {
	// 	path: '/newCsafPdf',
	// 	exact: true,
	// 	component: NewCsafPdf
	// },
	{
		path: '/',
		exact: true,
		component: HomeScreen
		// props: { screen: "login" },
	},
	{
		path: '/path-two',
		exact: false,
		component: TopBar
		// props: { screen: "forgotPassword" },
	},
	{
		path: '/TicketSupport/TicketSupportCreateScreen',
		exact: false,
		component: TicketSupportCreateScreen
	},
	{
		path: '/home',
		exact: true,
		component: HomeScreen
	},
	{
		path: '/testing',
		exact: true,
		component: TestingComponent
	},

	{
		path: '/wealthManagementOnboardingForm',
		exact: false,
		component: WealthManagementOnboardingForm
	},

	{
		path: '/leadCreate',
		exact: false,
		component: LeadCreationScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyLead/leadCreate',
		exact: false,
		component: CompLeadCreateScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyLead',
		exact: true,
		component: LeadListingScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyLead/leadView',
		exact: false,
		component: LeadViewScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyOpportunity',
		exact: true,
		component: OpportunityListingScreen
		//props: { screen: "sessionExpiry" },
	},
	{
		path: '/opportunityOverview',
		exact: false,
		component: OpportunityOverviewScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/Profile',
		exact: false,
		component: ProfileViewAccount
		// props: { screen: "sessionExpiry" },
	},

	{
		path: '/ReportManager/TransactionReport',
		exact: false,
		component: ReportsManagerMain
	},

	{
		path: '/ReportManager/CustomerReport',
		exact: false,
		component: ReportsManagerMain
	},
	{
		path: '/ReportManager/PortFolioReport',
		exact: false,
		component: ReportsManagerMain
	},

	{
		path: '/ReportManager/CustomerStatement',
		exact: false,
		component: ReportsManagerMain
	},
	{
		path: '/TopSearchMain',
		exact: false,
		component: TopSearchMain
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyCustomer/Onboarding',
		exact: true,
		component: CustomerOnboardingListingScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/CustomerOverview',
		exact: false,
		component: CustomerOverviewScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyCustomer/MyCustomerOverview',
		exact: false,
		// component: CustomerOverviewScreen,
		component: CustomerOverviewNewScreen
	},
	///MyCustomer/Onboarding
	{
		path: '/OpportunityCardView',
		exact: false,
		component: OpportunityListingScreenCard
		//props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyOpportunity/OpportunityCreate',
		exact: true,
		component: CompOpportunityCreateScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyOpportunity/OpportunityView',
		exact: false,
		component: OpportunityViewScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/OpportunityCreate',
		exact: true,
		component: OpportunityCreateScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyProspect/ProspectView',
		exact: false,
		component: ProspectViewScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyProspect',
		exact: true,
		component: ProspectListingScreen
		//props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyAccount',
		exact: true,
		component: AccountListingScreen
		// component: AccountCreateScreen,
		//props: { screen: "sessionExpiry" },
	},
	{
		path: '/AccountCreate',
		exact: true,
		component: AccountCreateScreen
		//props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyAccount/AccountEdit',
		exact: true,
		component: AccountCreateScreen
		//props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyAccount/accountView',
		exact: true,
		component: AccountViewScreen
		//props: { screen: "sessionExpiry" },
	},
	{
		path: '/documentManager',
		exact: true,
		component: DocumentManagerScreen
		//props: { screen: "sessionExpiry" },
	},
	{
		path: '/orderBook',
		exact: true,
		component: OrderBookScreen
		//props: { screen: "sessionExpiry" },
	},
	{
		path: '/',
		exact: true,
		component: HomeScreen
		// props: { screen: "login" },
	},
	{
		path: '/path-two',
		exact: false,
		component: TopBar
		// props: { screen: "forgotPassword" },
	},
	{
		path: '/home',
		exact: true,
		component: HomeScreen
	},
	{
		path: '/leadCreate',
		exact: false,
		component: LeadCreationScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyLead/leadCreate',
		exact: false,
		component: CompLeadCreateScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyLead',
		exact: true,
		component: LeadListingScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyLead/leadView',
		exact: false,
		component: LeadViewScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyOpportunity',
		exact: true,
		component: OpportunityListingScreen
		//props: { screen: "sessionExpiry" },
	},
	{
		path: '/opportunityOverview',
		exact: false,
		component: OpportunityOverviewScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/Profile',
		exact: false,
		component: ProfileViewAccount
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/TopSearchMain',
		exact: false,
		component: TopSearchMain
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyCustomer/Onboarding',
		exact: true,
		component: CustomerOnboardingListingScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/CustomerView',
		exact: false,
		component: CustomerOverviewNewScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyCustomer/MyCustomerOverview',
		exact: false,
		component: CustomerOverviewScreen
	},
	///MyCustomer/Onboarding
	{
		path: '/OpportunityCardView',
		exact: false,
		component: OpportunityListingScreenCard
		//props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyOpportunity/OpportunityCreate',
		exact: true,
		component: CompOpportunityCreateScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyOpportunity/OpportunityView',
		exact: false,
		component: OpportunityViewScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/OpportunityCreate',
		exact: true,
		component: OpportunityCreateScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyProspect/ProspectView',
		exact: false,
		component: ProspectViewScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyProspect',
		exact: true,
		component: ProspectListingScreen
		//props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyAccount',
		exact: true,
		component: AccountListingScreen
		// component: AccountCreateScreen,
		//props: { screen: "sessionExpiry" },
	},
	{
		path: '/AccountCreate',
		exact: true,
		component: AccountCreateScreen
		//props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyAccount/AccountEdit',
		exact: true,
		component: AccountCreateScreen
		//props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyAccount/accountView',
		exact: true,
		component: AccountViewScreen
		//props: { screen: "sessionExpiry" },
	},
	{
		path: '/documentManager',
		exact: true,
		component: DocumentManagerScreen
		//props: { screen: "sessionExpiry" },
	},
	{
		path: '/orderBook',
		exact: true,
		component: OrderBookScreen
		//props: { screen: "sessionExpiry" },
	},

	{
		path: '/orderBook/OrderBookInput',
		exact: false,
		component: OrderbookInputScreen
		//props: { screen: "sessionExpiry" },
	},
	{
		path: '/LeadProspectOverview',
		exact: false,
		component: ProspectOverviewScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyProspect/ProspectCreate',
		exact: false,
		component: ProspectCreateScreen
		// props: { screen: "sessionExpiry" },
	},
	//My Interaction
	{
		path: '/MyInteractions/InteractionCreate',
		exact: true,
		component: InteractionCreateScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyInteractions/InteractionView',
		exact: false,
		component: InteractionViewScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyInteractions',
		exact: true,
		component: InteractionListingScreen
		//props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyCustomers',
		exact: true,
		component: CustomerListingScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyCustomer/Onboarding/CustomerView',
		exact: false,
		component: CustomerViewScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyCustomers/CustomerCreate',
		exact: true,
		component: CustomerCreateScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyCustomers/CustomerEdit',
		exact: true,
		component: CustomerCreateScreen
		// props: { screen: "sessionExpiry" },
	},

	{
		path: '/TaskBoard',
		exact: true,
		component: TaskListingScreen
	},
	{
		path: '/CustomerOnboardingListing',
		exact: true,
		component: CustomerOnboardingListingScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyCustomers/CustomerCreate',
		exact: true,
		component: ProspectCreateScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/TaskBoard/TaskView',
		exact: false,
		component: TaskViewScreen
	},
	{
		path: '/EngagementOverview',
		exact: false,
		component: EngagementOverviewScreen
	},
	{
		path: '/TaskBoard/TaskCreate',
		exact: true,
		component: TaskCreateScreen
	},
	{
		path: '/PortfolioHoldings',
		exact: true,
		component: PortfolioHoldingsScreen
	},
	{
		path: '/OrderBook/Equity',
		exact: true,
		component: OrderBookEquityViewScreen
	},
	{
		path: '/PortfolioOverview',
		exact: true,
		component: PortfolioOverviewScreen
	},
	{
		path: '/OrderBook/MutualFund',
		exact: true,
		component: OrderBookMutualFundViewScreen
	},
	{
		path: '/CustomerTradeBook/listing',
		exact: true,
		component: CustomerTradeBookListing
	},
	{
		path: '/CustomerTradeBook/view',
		exact: true,
		component: CustomerTradeBookView
	},
	{
		path: '/TradeBook/listing',
		exact: true,
		component: TransactionTradeBookListing
	},
	{
		path: '/TradeBook/view',
		exact: true,
		component: TransactionTradeBookView
	},
	{
		path: '/Calendar',
		exact: true,
		component: CalendarScreen
	},
	{
		path: '/RM/ExploreProducts',
		exact: true,
		component: RMExploreProduct
	},

	{
		// path: '/Customer/ExploreProduct',
		path: '/ExploreProducts',
		exact: true,
		component: CustomerExploreProduct
	},
	{
		// path: '/Customer/ExploreProduct',
		path: '/expProd',
		exact: true,
		component: ExploreProduct
	},
	{
		path: '/Feed',
		exact: true,
		component: FeedScreen
	},
	{
		path: '/orderBook/investment',
		exact: true,
		component: PMInputScreen
	},
	{
		path: '/OrderBook/OrderView',
		exact: true,
		component: OrderBook360
	},
	{
		path: '/OrderBook/DebtSecondary/InvestmentOrder',
		exact: true,
		component: InvestmentOrderScreen
	},
	{
		path: '/TaskBoard',
		exact: true,
		component: TaskListingScreen
	},
	{
		path: '/CustomerOnboardingListing',
		exact: true,
		component: CustomerOnboardingListingScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/MyCustomers/CustomerCreate',
		exact: true,
		component: ProspectCreateScreen
		// props: { screen: "sessionExpiry" },
	},
	{
		path: '/TaskBoard/TaskView',
		exact: false,
		component: TaskViewScreen
	},
	{
		path: '/EngagementOverview',
		exact: false,
		component: EngagementOverviewScreen
	},
	{
		path: '/TaskBoard/TaskCreate',
		exact: true,
		component: TaskCreateScreen
	},
	{
		path: '/PortfolioHoldings',
		exact: true,
		component: PortfolioHoldingsScreen
	},
	{
		path: '/OrderBook/Equity',
		exact: true,
		component: OrderBookEquityViewScreen
	},
	{
		path: '/PortfolioOverview',
		exact: true,
		component: PortfolioOverviewScreen
	},
	{
		path: '/OrderBook/MutualFund',
		exact: true,
		component: OrderBookMutualFundViewScreen
	},
	{
		path: '/CustomerTradeBook/listing',
		exact: true,
		component: CustomerTradeBookListing
	},
	{
		path: '/CustomerTradeBook/view',
		exact: true,
		component: CustomerTradeBookView
	},
	{
		path: '/TradeBook/listing',
		exact: true,
		component: TransactionTradeBookListing
	},
	{
		path: '/TradeBook/view',
		exact: true,
		component: TransactionTradeBookView
	},
	{
		path: '/Calendar',
		exact: true,
		component: CalendarScreen
	},
	{
		path: '/Feed',
		exact: true,
		component: FeedScreen
	},
	// {
	//   path: "/Notification",
	//   exact: true,
	//   component: Notification
	// }
	{
		path: '/AccountDrilldown',
		exact: true,
		component: AccountDrilldownScreen
	},
	{
		path: '/OrderBook/InvestmentOrder',
		exact: true,
		component: InvestmentOrder
	},
	{
		path: '/OrderBook/OrderView',
		exact: true,
		component: OrderBook360
	},
	{
		path: '/OrderBook/OrderBookView',
		exact: true,
		component: DeptSecCustomerView
	},
	{
		// path: '/RM/ServiceTicket',
		path: '/TicketSupport',
		exact: true,
		component: TicketSupportListing
	},
	{
		path: '/RM/SeviceTicketOverview',
		exact: false,
		component: SeviceTicketOverview
	}
];
