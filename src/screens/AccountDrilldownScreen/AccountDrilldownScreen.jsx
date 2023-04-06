import React, { useEffect, useState } from 'react';
import RiskProfile from '../../components/RiskProfile/AccountDrilldownRiskProfile';
import { Row, Col, Input, Space, Card } from 'antd';
import BackToTop from '../../components/BackToTop/BackToTop';
import GenericCard from '../../components/GenericCard/GenericCard';
import { Area, Column } from '@ant-design/charts';
import HoldingCard from '../PortfolioHoldingsScreen/PortfolioHoldingsOverview/HoldingCard';
import TopHoldings from './TopHoldings';
import UserBanner from './UserBanner';
import PortfolioPerformance from '../../components/PortfolioOverview/PortfolioPerformance';
import AccountDrilldownVerticalTimeline from './AccountDrilldownVerticalTimeline';
import AccountDrilldownHeader from './AccountDrilldownHeader';
import moment from 'moment';

import {
	executeGetPortfolioAllocationBasedOnAssetClass,
	setPortfolioAllocationBasedOnAssetClass,
	executeGetAllocationTrendData,
	// executeGetTopHoldings,
	executeGetWinnersAndLaggers,
	executeGetTop3AccountData,
	// executeGetAccountDetail,
	executeGetCapitalInvestedGraphData,
	executeGetInvestmentValueGraphData,
	executeGetPortfolioActivityGraph,
	setPortfolioActivityGraph,
	executeGetRiskProfileData,
	setRiskProfileData,
	executeGetPortfolioDerivationData,
	executeGetAccountList,
	executeGetDependentDataAccountDrilldown,
	executeGetAccountDrilldownControlStructure,
	executeGetAssetTypeWiseData,
	setAssetTypeWiseData
} from '../../redux/actions/accountDrilldownActions';
import { connect } from 'react-redux';
import PortfolioAllocationCard from './PortfolioAllocationCard';
import PortfolioDeviation from './PortfolioDeviation';

const styleSet = {
	cardStyle: {
		margin: '12px 0px'
	},
	redBorder: '1px solid red',
	errorMsg: { float: 'left', color: 'red', marginTop: 10, paddingLeft: '24px' }
};
const AccountDrilldownScreen = (props) => {
	const {
		allPortfolioAllocationBasedOnAssetClass,
		executeGetPortfolioAllocationBasedOnAssetClass,
		setPortfolioAllocationBasedOnAssetClass,
		allAllocationTrendData,
		executeGetAllocationTrendData,
		allTopHoldings,
		// executeGetTopHoldings,
		allWinnersAndLaggers,
		executeGetWinnersAndLaggers,
		allTop3AccountData,
		executeGetTop3AccountData,
		allAccountDetail,
		// executeGetAccountDetail,
		allCapitalInvestedGraphData,
		executeGetCapitalInvestedGraphData,
		allInvestmentValueGraphData,
		executeGetInvestmentValueGraphData,
		allPortfolioActivityGraph,
		executeGetPortfolioActivityGraph,
		setPortfolioActivityGraph,
		allRiskProfileData,
		executeGetRiskProfileData,
		setRiskProfileData,
		allPortfolioDerivationData,
		executeGetPortfolioDerivationData,
		allAccountList,
		executeGetAccountList,
		allDependentDataAccountDrilldown,
		executeGetDependentDataAccountDrilldown,
		controlStructure,
		executeGetAccountDrilldownControlStructure,
		allAssetTypeWiseData,
		executeGetAssetTypeWiseData,
		setAssetTypeWiseData,
		getCurrentDate,
		getCurrentDate2,
		customer,
		authData
	} = props;
	useEffect(() => {
		// executeGetPortfolioAllocationBasedOnAssetClass();
		// executeGetAllocationTrendData();
		// executeGetTopHoldings();
		executeGetWinnersAndLaggers();
		executeGetTop3AccountData();
		// executeGetAccountDetail();
		// executeGetCapitalInvestedGraphData();
		// executeGetInvestmentValueGraphData();
		// executeGetPortfolioActivityGraph();
		// executeGetRiskProfileData();
		executeGetPortfolioDerivationData();
		executeGetAccountList(moment(getCurrentDate2).format('YYYY-MM-DD'), customer);
		executeGetDependentDataAccountDrilldown();
		executeGetAccountDrilldownControlStructure();
		// executeGetAssetTypeWiseData();
	}, []);

	// useEffect(() => {
	//   executeGetAccountList(moment(getCurrentDate).format('YYYY-MM-DD'), customer);
	// }, [getCurrentDate])

	const handleApiCall = (clinetId, scheme, bdate) => {
		executeGetPortfolioAllocationBasedOnAssetClass(clinetId, scheme, bdate);
		executeGetAllocationTrendData(clinetId, scheme, bdate);
		executeGetRiskProfileData(clinetId, scheme, bdate);
		executeGetPortfolioActivityGraph(clinetId, scheme, bdate);
		executeGetAssetTypeWiseData(clinetId, scheme, bdate);
	};
	const clearData = () => {
		// executeGetPortfolioAllocationBasedOnAssetClass();
		// executeGetAssetTypeWiseData();
		//executeGetAllocationTrendData();
		// executeGetRiskProfileData();
		// executeGetPortfolioActivityGraph()
		setPortfolioAllocationBasedOnAssetClass(null);
		setAssetTypeWiseData(null);
		setPortfolioActivityGraph(null);
		setRiskProfileData(null);
		setCombinedArray([]);
	};

	var data = [
		{
			type: '分类一',
			value: 27
		},
		{
			type: '分类二',
			value: 25
		},
		{
			type: '分类三',
			value: 18
		},
		{
			type: '分类四',
			value: 15
		},
		{
			type: '分类五',
			value: 10
		},
		{
			type: '其他',
			value: 5
		}
	];

	var colData = [
		{
			name: 'London',
			月份: 'Mar.',
			月均降雨量: 39.3
		},
		{
			name: 'London',
			月份: 'Apr.',
			月均降雨量: 81.4
		},
		{
			name: 'London',
			月份: 'May',
			月均降雨量: 47
		},
		{
			name: 'London',
			月份: 'Jun.',
			月均降雨量: 20.3
		},
		{
			name: 'London',
			月份: 'Jul.',
			月均降雨量: 24
		},
		{
			name: 'London',
			月份: 'Aug.',
			月均降雨量: 35.6
		},

		{
			name: 'Berlin',
			月份: 'Mar.',
			月均降雨量: 34.5
		},
		{
			name: 'Berlin',
			月份: 'Apr.',
			月均降雨量: 99.7
		},
		{
			name: 'Berlin',
			月份: 'May',
			月均降雨量: 52.6
		},
		{
			name: 'Berlin',
			月份: 'Jun.',
			月均降雨量: 35.5
		},
		{
			name: 'Berlin',
			月份: 'Jul.',
			月均降雨量: 37.4
		},
		{
			name: 'Berlin',
			月份: 'Aug.',
			月均降雨量: 42.4
		}
	];
	var config3 = {
		data: colData,
		isGroup: true,
		xField: '月份',
		yField: '月均降雨量',
		seriesField: 'name',
		minColumnWidth: 20,
		maxColumnWidth: 20,
		dodgePadding: 8,
		label: {
			position: 'middle',
			layout: [
				{ type: 'interval-adjust-position' },
				{ type: 'interval-hide-overlap' },
				{ type: 'adjust-color' }
			]
		}
	};

	const [combinedArray, setCombinedArray] = useState([]);
	const [custName, setCustName] = useState('');

	const dummyChartData = [
		{
			date: '1850',
			value: 0,
			name: 'Liquid fuel'
		},
		{
			date: '1850',
			value: 54,
			name: 'Solid fuel'
		},
		{
			date: '1850',
			value: 0,
			name: 'Gas fuel'
		},
		{
			date: '1851',
			value: 0,
			name: 'Liquid fuel'
		},
		{
			date: '1851',
			value: 54,
			name: 'Solid fuel'
		},
		{
			date: '1851',
			value: 0,
			name: 'Gas fuel'
		},
		{
			date: '1852',
			value: 0,
			name: 'Liquid fuel'
		},
		{
			date: '1852',
			value: 57,
			name: 'Solid fuel'
		},
		{
			date: '1852',
			value: 0,
			name: 'Gas fuel'
		},
		{
			date: '1853',
			value: 0,
			name: 'Liquid fuel'
		},
		{
			date: '1853',
			value: 59,
			name: 'Solid fuel'
		},
		{
			date: '1853',
			value: 0,
			name: 'Gas fuel'
		},
		{
			date: '1854',
			value: 0,
			name: 'Liquid fuel'
		},
		{
			date: '1854',
			value: 69,
			name: 'Solid fuel'
		},
		{
			date: '1854',
			value: 0,
			name: 'Gas fuel'
		},
		{
			date: '1855',
			value: 0,
			name: 'Liquid fuel'
		},
		{
			date: '1855',
			value: 71,
			name: 'Solid fuel'
		},
		{
			date: '1855',
			value: 0,
			name: 'Gas fuel'
		},
		{
			date: '1856',
			value: 0,
			name: 'Liquid fuel'
		},
		{
			date: '1856',
			value: 76,
			name: 'Solid fuel'
		},
		{
			date: '1856',
			value: 0,
			name: 'Gas fuel'
		},
		{
			date: '1857',
			value: 0,
			name: 'Liquid fuel'
		},
		{
			date: '1857',
			value: 77,
			name: 'Solid fuel'
		},
		{
			date: '1857',
			value: 0,
			name: 'Gas fuel'
		},
		{
			date: '1858',
			value: 0,
			name: 'Liquid fuel'
		},
		{
			date: '1858',
			value: 78,
			name: 'Solid fuel'
		},
		{
			date: '1858',
			value: 0,
			name: 'Gas fuel'
		},
		{
			date: '1859',
			value: 0,
			name: 'Liquid fuel'
		},
		{
			date: '1859',
			value: 83,
			name: 'Solid fuel'
		},
		{
			date: '1859',
			value: 0,
			name: 'Gas fuel'
		},
		{
			date: '1860',
			value: 0,
			name: 'Liquid fuel'
		},
		{
			date: '1860',
			value: 91,
			name: 'Solid fuel'
		},
		{
			date: '1860',
			value: 0,
			name: 'Gas fuel'
		},
		{
			date: '1861',
			value: 0,
			name: 'Liquid fuel'
		},
		{
			date: '1861',
			value: 95,
			name: 'Solid fuel'
		},
		{
			date: '1861',
			value: 0,
			name: 'Gas fuel'
		},
		{
			date: '1862',
			value: 0,
			name: 'Liquid fuel'
		},
		{
			date: '1862',
			value: 96,
			name: 'Solid fuel'
		},
		{
			date: '1862',
			value: 0,
			name: 'Gas fuel'
		},
		{
			date: '1863',
			value: 0,
			name: 'Liquid fuel'
		},
		{
			date: '1863',
			value: 103,
			name: 'Solid fuel'
		},
		{
			date: '1863',
			value: 0,
			name: 'Gas fuel'
		},
		{
			date: '1864',
			value: 0,
			name: 'Liquid fuel'
		},
		{
			date: '1864',
			value: 112,
			name: 'Solid fuel'
		},
		{
			date: '1864',
			value: 0,
			name: 'Gas fuel'
		},
		{
			date: '1865',
			value: 0,
			name: 'Liquid fuel'
		},
		{
			date: '1946',
			value: 875,
			name: 'Solid fuel'
		},
		{
			date: '1946',
			value: 61,
			name: 'Gas fuel'
		},
		{
			date: '1947',
			value: 322,
			name: 'Liquid fuel'
		}
	];

	var dataStore = [];

	useEffect(() => {
		if (allAllocationTrendData) {
			dataStore.push(
				...allAllocationTrendData?.lstEquity,
				...allAllocationTrendData?.lstFixedIncome,
				...allAllocationTrendData?.lstMFU
			);
			setCombinedArray(dataStore);
		}
	}, [allAllocationTrendData]);

	const handleCustomerName = (customerName) => {
		setCustName(customerName);
	};

	var config = {
		data: combinedArray ? combinedArray : [],
		xField: 'date',
		yField: 'value',
		seriesField: 'name',
		color: ['#5564C1', '#56B8BE', '#792B80'],
		xAxis: {
			type: 'time',
			mask: 'MMM'
		},
		yAxis: {
			label: {
				formatter: function formatter(v) {
					return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
						return ''.concat(s, ',');
					});
				}
			}
		},
		legend: { position: 'bottom' },
		smooth: true
	};

	const styleSet = {
		holdingCards: {
			padding: '12px',
			borderBottom: '1px solid #CBD6FF'
		}
	};

	const [noTitleKey, setNoTitleKey] = useState('Winners');

	const onTabChange = (key) => {
		setNoTitleKey(key);
	};
	const tabListNoTitle = [
		{
			key: 'Winners',
			tab: 'Winners'
		},
		{
			key: 'Laggers',
			tab: 'Laggers'
		}
	];
	const contentListNoTitle = {
		Winners: (
			<Col span={24}>
				{/* <GenericCard header={"Top Holdings"} viewAll={true}> */}
				{allWinnersAndLaggers && (
					<div>
						{allWinnersAndLaggers?.lstWinners?.slice(0, 4).map((data) => (
							<div style={styleSet.holdingCards}>
								<HoldingCard HoldingCardData={data} />
							</div>
						))}
					</div>
				)}
				{/* </GenericCard> */}
			</Col>
		),
		Laggers: (
			<Col span={24}>
				{/* <GenericCard header={"Top Holdings"} viewAll={true}> */}
				{allWinnersAndLaggers && (
					<div>
						{allWinnersAndLaggers?.lstLagers?.slice(0, 4).map((data) => (
							<div style={styleSet.holdingCards}>
								<HoldingCard HoldingCardData={data} />
							</div>
						))}
					</div>
				)}
				{/* </GenericCard> */}
			</Col>
		)
	};

	return (
		<>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<AccountDrilldownHeader custName={custName} />
				</Col>
			</Row>
			<Row gutter={[16, 16]}>
				<Col xxl={24} xl={24} lg={24} md={24} sm={24}>
					<UserBanner
						onSelectCustomerName={handleCustomerName}
						handleApiCall={handleApiCall}
						clearData={clearData}
						// allAccount={allAccountList}
						//  bannerData = {allAccountDetail}
						//  investmentValueGraphData = {allInvestmentValueGraphData}
						//  capitalInvestedGraphData = {allCapitalInvestedGraphData}
						//  riskProfileData = {allRiskProfileData}
					/>
				</Col>
			</Row>
			<Row gutter={[16, 16]}>
				<Col xxl={16} xl={24} lg={24} md={24} sm={24}>
					<Space direction='vertical'>
						<Row gutter={[16, 16]}>
							{/* <Col span={24} style={{ marginTop: "15px" }}>
                <PortfolioPerformance />
              </Col> */}
						</Row>
						<Row gutter={[16, 16]}>
							<Col span={24} style={styleSet.cardStyle}>
								<PortfolioAllocationCard />
							</Col>
						</Row>
						{/* <Row gutter={[16, 16]}>
              <Col span={24} style={styleSet.cardStyle}>
                <PortfolioDeviation />
              </Col>
            </Row> */}
						<Row gutter={[16, 16]}>
							<Col span={24} style={styleSet.cardStyle}>
								{combinedArray && (
									<GenericCard header={'Allocation Trend'}>
										<Area {...config} />
									</GenericCard>
								)}
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							<Col span={24}>
								<RiskProfile riskProfileData={allRiskProfileData}></RiskProfile>
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							<BackToTop />
						</Row>
					</Space>
				</Col>

				<Col xxl={8} xl={24} lg={24} md={24} sm={24}>
					<Space direction='vertical'>
						<Row>
							<Col span={24}>
								<GenericCard header={'Timeline'} viewAll={false}>
									<AccountDrilldownVerticalTimeline timelineData={allPortfolioActivityGraph} />
								</GenericCard>
							</Col>
						</Row>
						<>
							<Row>
								<Col span={24}>
									{/* <GenericCard header={"Top Holdings"} viewAll={true}> */}
									{allTopHoldings && (
										<GenericCard header={'Top Holdings'}>
											{allTopHoldings?.lstTopHoldings?.slice(0, 4).map((data) => (
												<div style={styleSet.holdingCards}>
													{/* <HoldingCard HoldingCardData={data} /> */}
													<TopHoldings HoldingCardData={data} authData={authData} />
												</div>
											))}
										</GenericCard>
									)}
									{/* </GenericCard> */}
								</Col>
							</Row>
							{/* <Row>
                <Card
                  className="opportunityViewCardDetail"
                  bordered={false}
                  style={{ width: "100%" }}
                  tabList={tabListNoTitle}
                  activeTabKey={noTitleKey}
                  onTabChange={(key) => onTabChange(key)}
                >
                  {contentListNoTitle[noTitleKey]}
                </Card>
              </Row> */}
						</>
					</Space>
				</Col>
			</Row>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		allPortfolioAllocationBasedOnAssetClass:
			state.accountDrilldown?.portfolioAllocationBasedOnAssetClass,
		allAllocationTrendData: state.accountDrilldown?.allocationTrendData,
		allTopHoldings: state.accountDrilldown?.topHoldings,
		allWinnersAndLaggers: state.accountDrilldown?.winnersAndLaggers,
		allTop3AccountData: state.accountDrilldown?.top3AccountData,
		allAccountDetail: state.accountDrilldown?.accountDetail?.accountDrilldownDetail?.mainScreenData,
		allCapitalInvestedGraphData: state.accountDrilldown?.capitalInvestedGraphData,
		allInvestmentValueGraphData: state.accountDrilldown?.investmentValueGraphData,
		allPortfolioActivityGraph: state.accountDrilldown?.portfolioActivityGraph,
		allRiskProfileData: state.accountDrilldown?.riskProfileData?.riskProfileModel,
		allPortfolioDerivationData: state.accountDrilldown?.portfolioDerivationData,
		allAccountList: state.accountDrilldown?.accountList,
		allPortfolioAllocationBasedOnBenchmark:
			state.accountDrilldown?.portfolioPerformanceBasedOnBenchmark,
		allDependentDataAccountDrilldown: state.accountDrilldown?.dependentDataAccountDrilldown,
		controlStructure: state.accountDrilldown?.controlStructure,
		allAssetTypeWiseData: state.accountDrilldown?.assetTypeWise,
		customer: state.common.customerInfo.customerCode,
		getCurrentDate1: state.auth.user.curDate,
		getCurrentDate2: state.auth.user.prevDate,
		authData:
			state &&
			state.auth &&
			state.auth.user &&
			state.auth.user.configResponse[0] &&
			state.auth.user.configResponse[0].value2
	};
};

const mapDispatchToProps = {
	executeGetPortfolioAllocationBasedOnAssetClass,
	executeGetAllocationTrendData,
	// executeGetTopHoldings,
	executeGetWinnersAndLaggers,
	executeGetTop3AccountData,
	// executeGetAccountDetail,
	executeGetCapitalInvestedGraphData,
	executeGetInvestmentValueGraphData,
	executeGetPortfolioActivityGraph,
	executeGetRiskProfileData,
	executeGetPortfolioDerivationData,
	executeGetAccountList,
	executeGetDependentDataAccountDrilldown,
	executeGetAccountDrilldownControlStructure,
	executeGetAssetTypeWiseData,
	setAssetTypeWiseData,
	setPortfolioActivityGraph,
	setPortfolioAllocationBasedOnAssetClass,
	setRiskProfileData
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountDrilldownScreen);
