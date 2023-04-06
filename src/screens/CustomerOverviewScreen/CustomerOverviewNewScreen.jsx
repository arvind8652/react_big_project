import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import CustomerPortfolioCard from './component/CustomerPortfolioCard';
import RecentTrendsCard from './component/RecentTrendsCard';
import PerformanceCard from './component/PerformanceCard';
import DemographicCard from './component/DemographicCard';
import RiskDistribution from './component/RiskDistribution';
import AssetAllocationAnomalyCard from './component/AssetAllocationAnomaly';
import TopWalletContributorsCard from './component/TopWalletContributorsCard';
// import TopRevenueContributorsCard from './component/TopRevenueContributorsCard';
import BusinessTrendCard from '../HomeScreen/BusinessTrendCard';
import { getCustomerPortfolioDeatilsApi, getTopRevenueApi } from '../../api/customerOverviewApi';
import { executeCustomerOverviewCS } from '../../redux/actions/customerOverviewAction';
import { generateCsObject } from '../../utils/utils';
import BackToTop from '../../components/BackToTop/BackToTop';

const CustomerOverviewNewScreen = (props) => {
	const { leftPanel } = props;
	let authorizeCode = '';
	leftPanel &&
		leftPanel.map((menu) => {
			menu.subMenu.map((subMenu) => {
				if (subMenu.subMenuId == 'CUSTOVERVIEW') authorizeCode = subMenu.authorizeCode;
			});
		});
	const { controlStructure } = props;
	const rmYN = sessionStorage.getItem('rmYN');
	const styleSet = {
		cardStyle: {
			margin: '12px 0px'
		}
	};
	const [customerOverview, setCustomerOverview] = useState({});

	const [topRevenue, setTopRevenue] = useState({});
	const [controlStructureData, setControlStructureData] = useState([]);
	useEffect(() => {
		getApiResponse();
	}, []);

	const createCustomerList = (resp) => {
		let managedList = [];
		let lostList = [];
		if (resp.status === 200) {
			if (Object.keys(resp.data).length > 0) {
				if (resp?.data?.managed.length) {
					resp?.data?.managed.map((ele) => {
						managedList.push(ele.clientCount);
					});
				}
				if (resp?.data?.lost.length) {
					resp?.data?.lost.map((ele) => {
						lostList.push(ele.clientCount);
					});
				}
			}
			return { ...resp.data, managedList, lostList };
		}
	};

	const getApiResponse = async () => {
		try {
			await executeCustomerOverviewCS();
			setCustomerOverview(createCustomerList(await getCustomerPortfolioDeatilsApi()));

			setState(setTopRevenue, await getTopRevenueApi());
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		// formatting cs object
		let newCs = [];
		controlStructure?.csList?.forEach((item, idx) => {
			newCs[idx] = generateCsObject(item?.controlStructureField);
		});
		setControlStructureData(newCs);
	}, [controlStructure]);

	const setState = (funName, resp) => {
		try {
			if (resp.status) {
				funName(resp.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Row style={{ marginBottom: '12px' }} gutter={[16, 16]}>
				<Col span={12} style={{ padding: '1px 18px 15px 15px' }}>
					<CustomerPortfolioCard portFolioData={customerOverview} />
				</Col>
				<Col
					span={11}
					style={{
						padding: '0px 0px 0px 30px'
					}}
				>
					<RecentTrendsCard authorizeCode={authorizeCode} />
				</Col>
			</Row>

			<Row gutter={[16, 16]}>
				<Col
					span={24}
					style={{
						padding: '24px 18px 30px 16px'
					}}
				>
					<PerformanceCard />
				</Col>
			</Row>

			<Row style={styleSet.cardStyle} gutter={[16, 16]}>
				{/* <Row style={styleSet.cardStyle}> */}
				<Col span={16}>
					<Row style={styleSet.cardStyle} gutter={[16, 16]}>
						<Col
							span={12}
							style={{
								padding: '9px 18px 30px 0px'
							}}
						>
							<DemographicCard
								controlStructure={
									controlStructureData[0]?.Demographics ? controlStructureData[0]?.Demographics : []
								}
							/>
						</Col>
						<Col span={12}>
							<RiskDistribution />
						</Col>
					</Row>
					<Row style={styleSet.cardStyle} gutter={[16, 16]}>
						<Col
							span={24}
							style={{
								padding: '9px 0px 30px 0px'
							}}
						>
							<AssetAllocationAnomalyCard
								controlStructure={
									controlStructureData[0]?.AssetGroup ? controlStructureData[0]?.AssetGroup : []
								}
								riskModel={
									controlStructureData[0]?.RiskModel ? controlStructureData[0]?.RiskModel : []
								}
							/>
						</Col>
					</Row>
					<Row style={{ marginTop: '12px' }} gutter={[16, 16]}>
						<Col span={24}>
							<BusinessTrendCard />
						</Col>
					</Row>
				</Col>
				<Col span={8}>
					<Row style={{ marginBottom: '12px', marginTop: '12px' }} gutter={[16, 16]}>
						<Col span={24}>
							<TopWalletContributorsCard authorizeCode={authorizeCode} />
						</Col>
					</Row>
					{/* can be used in the future
            {rmYN === "Y" && (
              <Row>
                <Col span={24}>
                  <TopRevenueContributorsCard topRevenue={topRevenue} />
                </Col>
              </Row>
            )} */}
				</Col>
				{/* </Row> */}
			</Row>
			<BackToTop/>
			
		</>
	);
};

function mapStateToProps(state) {
	return {
		controlStructure: state?.customerOverview?.controlStructure,
		leftPanel: state.dashboard.leftPanel
	};
}

export default connect(mapStateToProps)(CustomerOverviewNewScreen);
