import AuthScreen from '../../screens/AuthScreen/AuthScreen';
import DashboardScreen from '../../screens/DashboardScreen/DashboardScreen';
import ImaCsaf from '../../screens/PdfForms/Trusts/ImaCsaf';
import RiskDisclosure from '../../screens/PdfForms/Trusts/RiskDisclosure';
import SMCalculatorScreen from '../../screens/SMCalculatorPDF/SMCalculatorScreen';
import SingleSignOn from '../../screens/SSO/Sso';
import TestingComponent from '../../TestingComponent';
import Cis from '../../screens/PdfForms/Leasing/CisCorporate/CisCorporate';
import OpeningsFormMmp from '../../screens/PdfForms/Leasing/CisCorporate/OpeningFormsMmp';
import TicketSupportListing from '../../screens/TicketSupport/TicketSupportListing/TicketSupportListingScreen';
import NewCsafPdf from '../../components/Forms/RiskProfileFormCard/NewCsafPdf';
// import csafPdf from '../../screens/PdfForms/csafPdfNew';

// import CasfPdf from "../../components/Forms/RiskProfileFormCard/CsafPdf";
// import ReportsManagerMain from "../../screens/Reports Manager/ReportsManagerMain";
// import SofForm from "../../screens/OrderbookInputScreen/SofForm";

const authRoutes = [
	{
		path: '/login',
		exact: false,
		component: AuthScreen,
		props: { screen: 'login' }
	},
	{
		path: '/sso',
		exact: false,
		component: SingleSignOn
	},

	{
		path: '/forgotPassword',
		exact: true,
		component: AuthScreen,
		props: { screen: 'forgotPassword' }
	},
	{
		path: '/resetPassword',
		exact: true,
		component: AuthScreen,
		props: { screen: 'resetPassword' }
	},
	{
		path: '/sessionExpiry',
		exact: true,
		component: AuthScreen,
		props: { screen: 'sessionExpiry' }
	},
	{
		path: '/noInternet',
		exact: true,
		component: AuthScreen,
		props: { screen: 'noInternet' }
	},
	{
		path: '/smCalculator',
		exact: true,
		component: SMCalculatorScreen
	},
	{
		path: '/testing',
		exact: true,
		component: TestingComponent
	},
	{
		path: '/ImaCsaf',
		exact: true,
		component: ImaCsaf
	},
	{
		path: '/RiskDisclosure',
		exact: true,
		component: RiskDisclosure
	},
	{
		path: '/Cis',
		exact: true,
		component: Cis
	},
	{
		path: '/OpeningsFormMmp',
		exact: true,
		component: OpeningsFormMmp
	},
	// {
	//   path: "/SofForm",
	//   exact: true,
	//   component: SofForm,
	// },
	// {
	//   path: "/SofForm",
	//   exact: true,
	//   component: SofForm,
	//   props: { screen: "SofForm" },
	// },
	// {
	// 	path: "/csafPdf",
	// 	exact: true,
	// 	component: CasfPdf,
	// 	props: { screen: "csafPdf" },
	// },
	{
		path: '/newCsafPdf',
		exact: true,
		component: NewCsafPdf
		// props: { screen: 'csafPdf' }
	},
	{
		path: '/ticketSupport',
		exact: true,
		component: TicketSupportListing
		// props: { screen: 'csafPdf' }
	}
];

const appRoutes = [
	{
		path: '/dashboard',
		exact: false,
		component: DashboardScreen
	}
];

export const main_routes = [...authRoutes, ...appRoutes];
