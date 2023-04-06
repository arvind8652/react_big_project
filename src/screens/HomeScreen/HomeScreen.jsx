import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import UserBanner from './UserBanner';
import PerformanceCard from './PerformanceCard';
import LeaderBoardCard from './LeaderBoardCard';
import NotesCard from './NotesCard';
import FeedsCard from './FeedsCard';
import { Row, Col, Space } from 'antd';
import EventsScreen from './EventsScreen';
import HighDealValues from './HighDealValues';
import TopCustomers from './TopCustomers';
import RecentProspects from './RecentProspects';
import { Column } from '@ant-design/charts';
import GenericCard from '../../components/GenericCard/GenericCard';
import BusinessTrendCard from './BusinessTrendCard';
import TopCustomersRemade from './TopCustomersRemade';
import Transaction from './Transaction';
import NumberFormat from '../../constants/NumberFormat';
import {
	executeGetUserInfoData,
	executeGetNotesData,
	executeGetTopFeedData,
	executeGetActivityData,
	executeGetInvestmentCartData,
	executeGetOpenOrdersData,
	executeGetAumTrendData,
	executeGetRevenueTrendData,
	executeGetRelationshipTrendData,
	executeGetExpectedBusinessData,
	executeGetExploreProduct,
	executeGetInvestmentCartMandateData,
	executeGetPlacedMandateData,
	executeGetUpcomingOrdersData,
	executeGetBranchUserInfo,
	executeGetCRMHomeControlStructure,
	executeGetSecurityListDetails
} from '../../redux/actions/crmHomeActions';
import GenericBSCart from './GenericBSCart';
import TrendingProducts from '../../components/PortfolioOverview/TrendingProducts';
import moment from 'moment';
import BackToTop from '../../components/BackToTop/BackToTop';
const HomeScreen = (props) => {
	const {
		executeGetUserInfoData,
		executeGetNotesData,
		executeGetTopFeedData,
		executeGetActivityData,
		executeGetInvestmentCartData,
		executeGetOpenOrdersData,
		executeGetAumTrendData,
		executeGetRevenueTrendData,
		executeGetRelationshipTrendData,
		allExpectedBusinessData,
		executeGetExpectedBusinessData,
		executeGetExploreProduct,
		executeGetCRMHomeControlStructure,
		executeGetSecurityListDetails,
		securityList,
		exploreProductList
	} = props;

	const [rmYN, setRmYN] = useState(sessionStorage.getItem('rmYN'));
	const [prevDate, setPrevDate] = useState(sessionStorage.getItem('prevDate'));

	const showTabs = true;

	const curDate = sessionStorage.getItem('curDate');

	const [chartData, setChartData] = useState([]);

	useEffect(() => {
		let chartDataResponse = [];
		if (allExpectedBusinessData) {
			chartDataResponse = allExpectedBusinessData?.map((item) => {
				return {
					month: item.category,
					// value: item.count,
					value: item.amount
				};
			});
			setChartData(chartDataResponse);
		}
	}, [allExpectedBusinessData]);

	const config = {
		data: chartData,
		xField: 'month',
		yField: 'value',
		label: null,
		// {
		// 	position: 'middle',
		// 	style: {
		// 		fill: '#FFFFFF',
		// 		opacity: 0.6
		// 	}
		// },
		// minColumnWidth: 20,
		// maxColumnWidth: 40,
		xAxis: {
			label: {
				autoHide: true,
				autoRotate: false
			}
		},

		tooltip: {
			// domStyles: { 'g2-tooltip-title': { display: 'none' } },
			formatter: (yField) => {
				const NewData = () => {
					return new Intl.NumberFormat({
						minimumFractionDigits: 0
					}).format(yField?.value);
				};
				return { name: 'value', value: NewData() };
			}
		}
	};

	const exploreProductReqObj = {
		ClientID: null,
		BusinessDate: curDate?.split('T')[0].trim(),
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
	};
	useEffect(() => {
		if (rmYN === 'N') {
			executeGetBranchUserInfo(prevDate);
		} else {
			executeGetUserInfoData(prevDate);
		}
		executeGetNotesData();
		executeGetTopFeedData();
		executeGetActivityData();
		executeGetInvestmentCartData();
		executeGetOpenOrdersData();
		executeGetAumTrendData(prevDate);
		executeGetRevenueTrendData(prevDate);
		executeGetRelationshipTrendData(prevDate);
		executeGetExpectedBusinessData(prevDate);
		executeGetExploreProduct(exploreProductReqObj);
		executeGetCRMHomeControlStructure();
	}, []);

	const investmentCartTabs = [
		{
			tab: 'Orders',
			key: 'tab1'
		},
		{
			tab: 'Mandates',
			key: 'tab2'
		}
	];

	useEffect(() => {
		if (exploreProductList) {
			const fetchSecurity = exploreProductList?.map((product) => product.security);
			executeGetSecurityListDetails(fetchSecurity);
		}
	}, [exploreProductList]);

	return (
		<>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Space direction='vertical'>
						<UserBanner />
					</Space>
				</Col>
			</Row>
			<Row gutter={[16, 16]}>
				<Col xxl={16} xl={16} lg={16} md={24} sm={24}>
					<Space direction='vertical'>
						{/* <Row gutter={[16, 16]}>
              {rmYN === "Y" ? (
                <>
                  <Col span={12}>
                    <PerformanceCard />
                  </Col>
                  <Col span={12}>
                    <LeaderBoardCard />
                  </Col>
                </>
              ) : (
                <>
                  <Col span={12}>
                    <TopCustomersRemade />
                  </Col>
                  <Col span={12}>
                    <HighDealValues />
                  </Col>
                </>
              )}
            </Row> */}
						{showTabs && (
							<Row gutter={[16, 16]}>
								{/* <Col span={12}>
                  <NotesCard />
                </Col> */}
								{/* <Col span={12}> */}
								<Col span={24}>
									<FeedsCard />
								</Col>
							</Row>
						)}
						{/* <Row gutter={[16, 16]}>
              <Col span={24}>
                <GenericCard header={"Investment Cart"} viewAll={true}>
                  <GenericBSCart tabs={investmentCartTabs} />
                </GenericCard>
              </Col>
            </Row> */}
						<Row gutter={[16, 16]}>
							{/* <Col span={24}>
                <Transaction />
              </Col> */}
						</Row>
						<Row gutter={[16, 16]}>
							<Col span={24}>
								<BusinessTrendCard />
							</Col>
						</Row>
						{showTabs && (
							<Row gutter={[16, 16]}>
								<Col span={24}>
									<GenericCard header='Expected Business'>
										<Column {...config} />
									</GenericCard>
								</Col>
							</Row>
						)}
						{showTabs && (
							<Row gutter={[16, 16]}>
								<Col span={24}>
									<TrendingProducts list={securityList ?? []} />
								</Col>
							</Row>
						)}
					</Space>
				</Col>

				<Col xxl={8} xl={8} lg={8} md={24} sm={24}>
					<Space direction='vertical'>
						<Row>
							<Col span={24}>
								<EventsScreen />
							</Col>
						</Row>
						{rmYN === 'Y' && (
							<>
								{/* <Row>
                  <Col span={24}>	
                    <HighDealValues />
                  </Col>
                </Row> */}
								<Row>
									<Col span={24}>
										<TopCustomersRemade />
									</Col>
								</Row>
							</>
						)}
						{showTabs && (
							<Row>
								<Col span={24}>
									<RecentProspects />
								</Col>
							</Row>
						)}
					</Space>
				</Col>
			</Row>
			<BackToTop />
		</>
	);
};
const mapStateToProps = (state) => {
	return {
		allUserInfoData: state.crmHome.userInfo,
		allNotesData: state.crmHome.notes,
		allTopFeedData: state.crmHome.topFeed,
		allActivityData: state.crmHome.activity,
		allInvestmentCartData: state.crmHome.investmentCart,
		allTopCustomersData: state.crmHome.topCustomers,
		allOpenOrdersData: state.crmHome.openOrders,
		allAumTrendData: state.crmHome.aumTrend,
		allRevenueTrendData: state.crmHome.revenueTrend,
		allRelationshipTrendData: state.crmHome.relationshipTrend,
		allExpectedBusinessData: state.crmHome.expectedBusiness,
		allTrendingProductsData: state.crmHome.trendingProducts,
		allHighValueDealsData: state.crmHome.highValueDeals,
		allInvestmentCartMandateData: state.crmHome.investmentCartMandate,
		allPlacedMandateData: state.crmHome.placedMandate,
		allUpcomingOrdersData: state.crmHome.upcomingOrders,
		allPerformanceData: state.crmHome.performance,
		securityList: state.crmHome.securityList,
		exploreProductList: state.crmHome.exploreProductList
	};
};
const mapDispatchToProps = {
	executeGetUserInfoData,
	executeGetNotesData,
	executeGetTopFeedData,
	executeGetActivityData,
	executeGetInvestmentCartData,
	executeGetOpenOrdersData,
	executeGetAumTrendData,
	executeGetRevenueTrendData,
	executeGetRelationshipTrendData,
	executeGetExpectedBusinessData,
	executeGetExploreProduct,
	executeGetInvestmentCartMandateData,
	executeGetPlacedMandateData,
	executeGetUpcomingOrdersData,
	executeGetCRMHomeControlStructure,
	executeGetSecurityListDetails
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
