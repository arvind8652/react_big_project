import PortfolioOverviewProfile from '../../components/PortfolioOverview/PortfolioOverviewProfile';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Space } from 'antd';
import 'antd/dist/antd.css';
import UserBanner from '../../components/PortfolioOverview/UserBanner';
import InvestmentAccount from '../../components/PortfolioOverview/InvestmentAccount';
import PortfolioPerformance from '../../components/PortfolioOverview/PortfolioPerformance';
import InvestmentCart from '../../components/PortfolioOverview/InvestmentCart';
import Transaction from '../../components/PortfolioOverview/Transaction';
import TrendingProducts from '../../components/PortfolioOverview/TrendingProducts';
// import EventsScreen from "../../components/PortfolioOverview/EventScreen";
import Opportunities from '../../components/PortfolioOverview/Opportunities';
// import RiskProfile from "../../components/RiskProfile/RiskProfile";
import RiskProfile from '../../components/RiskProfile/AccountDrilldownRiskProfile';
import NotesCard from '../HomeScreen/NotesCard';
import moment from 'moment';
// import TopCustomers from "../HomeScreen/TopCustomers"
import PortfolioOverviewLink from './PortfolioOverviewLink';
import OtherRelation from '../../components/PortfolioOverview/OtherRelation';
import BackToTop from '../../components/BackToTop/BackToTop';
import FinancialPlanningCard from '../FinancialPlanningCO/FinancialPlanningCard';

import {
	executeGetCustomerInfo,
	executeGetInvestmentAccountData,
	executeGetOpportunity,
	executeGetNotesData
} from '../../redux/actions/portfolioOverviewActions';

import { executeGetPortfolioActivityData } from '../../redux/actions/crmHomeActions';

import {
	executeGetRiskProfileModel,
	executeGetExploreProductsDetails,
	executeGetOpenOrders
} from '../../redux/actions/portfolioOverviewActions';

import { connect } from 'react-redux';
import EventsScreen from '../HomeScreen/EventsScreen';

// import {moment} from 'moment'

const PortfolioOverviewScreen = ({
	customerInfo = {},
	getCurrentDate,
	customer,
	openOrders = {},
	investmentAccountData = {},
	opportunities = {},
	notesData = {},
	riskProfileModel = {},
	trendingProducts = [],
	executeGetPortfolioActivityData
}) => {
	// states
	const [rmYN, setRmYN] = useState(sessionStorage.getItem('rmYN'));
	let bdate = moment(getCurrentDate).format('YYYY-MM-DD');

	const [order, setorder] = useState();

	const [scheme, setScheme] = useState(null);

	const handlescheme = (langValue) => {
		setScheme(langValue);
	};
	useEffect(() => {
		// risk profile
		if (scheme) {
			const riskProfileModelRequestObject = {
				data: {
					CustomerID: customer,
					BusinessDate: bdate,
					Scheme: scheme
				}
			};
			executeGetRiskProfileModel(riskProfileModelRequestObject);
		}
	}, [scheme]);

	useEffect(() => {
		const openOrdersRequestObject = {
			data: {
				ClientID: customer,
				BusinessDate: bdate
			}
		};
		executeGetOpenOrders(openOrdersRequestObject);
	}, []);

	useEffect(() => {
		const customerRequestBody = {
			data: {
				CustomerID: customer,
				BusinessDate: bdate
			}
		};
		executeGetCustomerInfo(customerRequestBody);
		executeGetPortfolioActivityData(bdate, customer);

		// investment account
		const investmentAccountDataRequestBody = {
			data: {
				CustomerID: customer,
				BusinessDate: bdate,
				Scheme: scheme
			}
		};
		executeGetInvestmentAccountData(investmentAccountDataRequestBody);

		const opportunitiesRequestBody = {
			data: {
				CustomerID: 'ANDREWC',
				BusinessDate: '2020-01-15'
			}
		};
		executeGetOpportunity(opportunitiesRequestBody);

		const notesDateRequestBody = {
			data: {
				ClientID: 'IDV046',
				businessDate: '2020-12-06'
			}
		};
		executeGetNotesData(notesDateRequestBody);

		// trending products
		const trendingProductsRequestObject = {
			data: {
				ClientID: 'JOHN',
				BusinessDate: '2021-06-02',
				Filter: 'UG',
				AssetGroup: 'Trending',
				MarketCapMin: null,
				MarketCapMax: null,
				PerformanceMin: null,
				PerformanceMax: null,
				DownsideRiskMin: null,
				DownsideRiskMax: null,
				iskScoreMin: null,
				RiskScoreMax: null,
				subfilter: ''
			}
		};
		executeGetExploreProductsDetails(trendingProductsRequestObject);
	}, []);

	const apiSecurityList = trendingProducts?.map((security) => {
		const data = security.security;
		return {
			name: data ? data.securityName : 'Alexandra Romus',
			id: data ? data.isinCode : 'BDO1928345',
			tagName: data ? data.fundType : 'Equity',
			secondaryTag: data ? data.assetGroup : 'Mutual fund',
			value: data ? data.latestPrice : '21',
			risk: data ? data.riskCategory : 'Moderate',
			score: data ? data.riskScore : '5',
			category: data ? data.category : 'Multi Cap',
			sector: data ? data.sector : 'Industrial',
			lastUpdate: data ? moment(data.lastUpdate).format('DD MMM YYYY') : '21 June 2020',
			fund: data ? `${data.fund}%` : '25%',
			sp: data ? `${data.securityProduct}%` : '21%',
			alpha: data?.alpha ? `${data.alpha}%` : '8%',
			downsideRisk: data ? `${data.downsideRisk}%` : '2.5%',
			categoryName: data ? data.isinCode : 'Trending',
			currency: data ? data.currencySymbol : '$',
			isGraph: data ? data.isGraph : true,
			interestRate: data ? data.interestRate : 4.1,
			minTenure: data ? data.minTenure : 36,
			maxTenure: data ? data.maxTenure : 48,
			minInvestMent: data ? data.minInvestMent : 10000,
			currentVTM: data ? data.currentVTM : 25,
			payout: data ? data.payout : 'Cumulative',
			graphData: data ? data.graphDetails : [0, 1000, 240, 340, 839, 810, 850]
		};
	});

	return (
		<>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<PortfolioOverviewLink />
				</Col>
			</Row>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Space direction='vertical' size={16}>
						<UserBanner customerInfo={customerInfo} />
					</Space>
				</Col>
			</Row>
			<Row gutter={[16, 16]}>
				{/* <Col xxl={16} xl={24} lg={24} md={24} sm={24}> */}
				<Col span={24}>
					<Space direction='vertical' size={16}>
						<Row gutter={[16, 16]}>
							<Col span={24} style={{ marginTop: '15px' }}>
								<InvestmentAccount
									InvestmentAccount={investmentAccountData}
									onSelectSchemes={handlescheme}
								/>
							</Col>
						</Row>
						{/* <Row gutter={[16, 16]}> */}
						{/* <Col span={12}> */}
						{/* <NotesCard /> */}
						{/* </Col> */}
						{/* <Col span={24}><PortfolioPerformance /></Col> */}
						{/* </Row> */}
						{/* <Row gutter={[16, 16]}> */}
						{/* <Col span={24}><InvestmentCart /></Col> */}
						{/* </Row> */}
						{/* <Row gutter={[16, 16]}> */}
						{/* <Col span={24}>
                <Transaction Transaction={openOrders} />
              </Col> */}
						{/* </Row> */}
						<Row gutter={[16, 16]}>
							<Col span={24}>
								<RiskProfile riskProfileData={riskProfileModel?.riskProfileModel} />
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							<Col span={24}>
								{/* <TrendingProducts list={apiSecurityList} /> */}
								{/* Financial Planning commented component */}
								<FinancialPlanningCard customer={customer} />
							</Col>
						</Row>
					</Space>
				</Col>

				<Col xxl={8} xl={24} lg={24} md={24} sm={24}>
					<Space direction='vertical' size={16}>
						<Row gutter={[16, 16]}>
							<Col span={24}>
								<EventsScreen />
							</Col>
						</Row>
						{rmYN === 'Y' && (
							<>
								<Row gutter={[16, 16]}>
									<Col span={24}>{/* <Opportunities opportunities ={opportunities} /> */}</Col>
								</Row>
								<Row gutter={[16, 16]}>
									<Col span={24}>
										{/* <NotesCard notesData={notesData} /> */}

										{/* <TopCustomers /> */}
									</Col>
								</Row>
							</>
						)}
						<Row>
							<Col span={24}>
								{/* <OtherRelation /> */}
								{/* <RecentProspects /> */}
							</Col>
						</Row>
					</Space>
				</Col>
			</Row>
			<BackToTop />
		</>
	);
};

function mapStateToProps(state) {
	return {
		customerInfo: state?.portfolioOverview?.customerInfo,
		investmentAccountData: state?.portfolioOverview?.investmentAccountData,
		opportunities: state?.portfolioOverview?.opportunities,
		notesData: state?.portfolioOverview?.notesData,
		openOrders: state?.portfolioOverview?.openOrders,
		customer: state.common.customerInfo.customerCode,
		getCurrentDate: state.auth.user.prevDate,
		riskProfileModel: state?.portfolioOverview?.riskProfileModel,
		trendingProducts: state?.portfolioOverview?.trendingProducts
	};
}

const mapDispatchToProps = {
	executeGetPortfolioActivityData
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioOverviewScreen);
