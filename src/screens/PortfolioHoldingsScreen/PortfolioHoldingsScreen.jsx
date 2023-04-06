// in-built imports
import React, { useEffect, useState } from 'react';

// external imports
import { Tabs } from 'antd';

// internal imports
import ConsolidatedPortfolio from '../../components/MutualFundsTab/ConsolidatedPortfolio';
import PortfolioHoldingTable from '../../components/PortfolioHoldingTable/PortfolioHoldingTable';
//import { DOC_DATA } from "../DocumentManagerScreen/DocConstant";
import PortfolioHoldingSubTable from '../../components/PortfolioHoldingTable/PortfolioHoldingSubTable';

import StockHoldingSubTable from '../../components/PortfolioHoldingTable/StockHoldingSubTable';
import OverViewTab from './PortfolioHoldingsOverview/OverviewTab';
import TopBarHeader from '../../components/TopBarHeader/TopBarHeader';
//import FiltersPanel from "../../components/FilterPanel/FilterPanel";
import { exportJSON, generateCsObject } from '../../utils/utils';
import {
	executeAssetClasswiseData,
	executeGetAssettypeWise,
	executeGetHoldingAmount,
	executeGetInvestmentAllocation,
	executeGetPortfolioHoldingsCs,
	executeGetTopHolding,
	executeGetSecurityDetail,
	executeGetStockSecurityDetail
} from '../../redux/actions/portfolioHoldingsAction';
import moment from 'moment';
import FiltersPanel from '../../components/FilterPanel/FilterPanel';
import PortfolioHoldingsFilter from '../../components/PortfolioHoldingFilter/PortfolioHoldingFilter';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PortfolioHoldingTableTab from './PortfolioHoldingTableTab';
const { TabPane } = Tabs;

const PortfolioHoldingsScreen = ({
	securityDetail,
	stockSecurityDetail,
	selectedSecurity,
	customerInfo
}) => {
	const [prevDate, setPrevDate] = useState(sessionStorage.getItem('prevDate'));
	const [userID, setUserID] = useState(sessionStorage.getItem('userID'));
	const location = useLocation();
	const [currentTab, setCurrentTab] = useState('overview');
	const defaultBody = {
		userID: userID,
		businessDate: moment(prevDate).format('YYYY-MM-DD'),
		CustomerID: customerInfo?.customerCode,
		assetTab: 'ORD'
	};

	const [body, setBody] = useState(defaultBody);
	function callback(key) {
		setCurrentTab(key);
	}

	useEffect(() => {
		executeGetPortfolioHoldingsCs();
		executeAssetClasswiseData(body);
		executeGetTopHolding(body);
		executeGetInvestmentAllocation(body);
		executeGetHoldingAmount(body);
		executeGetAssettypeWise(body);
		executeGetSecurityDetail(defaultBody);
	}, []);

	const getUpdatedBody = () => {
		let assetTabValue;
		switch (currentTab) {
			case 'stocks':
				assetTabValue = 'ORD';
				break;
			case 'mutualFunds':
				assetTabValue = 'MFU';
				break;
			case 'bonds':
				assetTabValue = 'BND';
				break;
			default:
				assetTabValue = 'ORD';
				break;
		}
		setBody({ ...body, assetTab: assetTabValue });
		return { ...body, assetTab: assetTabValue };
	};
	useEffect(() => {
		executeGetSecurityDetail(getUpdatedBody());
	}, [currentTab]);

	return (
		<>
			<TopBarHeader headerName={'Portfolio Holdings'} />
			<Tabs defaultActiveKey='1' onChange={callback}>
				<TabPane tab='Overview' key='overview'>
					<OverViewTab />
				</TabPane>

				<TabPane tab='Stocks' key='stocks'>
					<PortfolioHoldingTableTab
						apiData={securityDetail}
						apiRequestData={body}
						modalTitle={'Stocks Holdings'}
					/>
				</TabPane>

				<TabPane tab='Mutual Funds' key='mutualFunds'>
					<PortfolioHoldingTableTab
						apiData={securityDetail}
						apiRequestData={body}
						modalTitle={'Mutual Funds Portfolio Holdings'}
					/>
				</TabPane>

				<TabPane tab='Bonds' key='bonds'>
					<PortfolioHoldingTableTab
						apiData={securityDetail}
						apiRequestData={body}
						modalTitle={'Bonds Holdings'}
					/>
				</TabPane>
				{/* <TabPane tab="Deposits" key="deposits">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Real Estate" key="realEstate">
          Content of Pane 3
        </TabPane>
        <TabPane tab="Insurance" key="insurance">
          Content of Pane 1
        </TabPane>
        <TabPane tab="Miscellaneous" key="miscellaneous">
          Content of Tab Pane 2
        </TabPane> */}
			</Tabs>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		controlStructure: state.portfolioHoldings.controlStructure,
		securityDetail: state.portfolioHoldings.securityDetail?.securityDetail,
		stockSecurityDetail: state.portfolioHoldings.stockSecurityDetail?.securityDetail,
		customerInfo: state.common.customerInfo
	};
};
const mapDispatchToProps = {
	// executeGetCustomerOnboardingListingCs,
	// executeGetAllCustomerOnboardingData,
	// executeGetAllPendingAccounts,
};
export default connect(mapStateToProps, mapDispatchToProps)(PortfolioHoldingsScreen);
