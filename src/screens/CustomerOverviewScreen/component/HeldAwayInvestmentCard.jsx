// in-built imports
import React, { useState } from 'react';

// external imports
import { Tabs } from 'antd';
import GenericCard from '../../../components/GenericCard/GenericCard';
import moment from 'moment';
import { faChartLineDown, faSackDollar } from '@fortawesome/pro-regular-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeldAwayInvestmentCardData from './HeldAwayInvestmentCardData';

const { TabPane } = Tabs;

const HeldAwayInvestmentCard = ({
	securityDetail,
	stockSecurityDetail,
	selectedSecurity,
	customerInfo
}) => {
	const prevDate = sessionStorage.getItem('prevDate');
	const userID = sessionStorage.getItem('userID');
	const [currentTab, setCurrentTab] = useState('overview');
	const defaultBody = {
		userID: userID,
		businessDate: moment(prevDate).format('YYYY-MM-DD'),
		CustomerID: customerInfo?.customerCode,
		assetTab: 'ORD'
	};

	//   const [body, setBody] = useState(defaultBody);
	function callback(key) {
		setCurrentTab(key);
	}

	return (
		<>
			<GenericCard header={'Held Away Investment'}>
				{/* <TopBarHeader headerName={"Portfolio Holdings"} /> */}
				<Tabs defaultActiveKey='1' onChange={callback}>
					<TabPane
						// tab="High"
						tab={
							<span>
								<FontAwesomeIcon
									// size="2x"
									icon={faSackDollar}
									style={{ marginRight: '25px' }}
								/>
								High
							</span>
						}
						key='high'
					>
						<HeldAwayInvestmentCardData />
					</TabPane>

					<TabPane
						tab={
							<span>
								<FontAwesomeIcon
									// size="2x"
									icon={faSackDollar}
									style={{ marginRight: '25px' }}
								/>
								Stocks
							</span>
						}
						key='stocks'
					>
						<HeldAwayInvestmentCardData />
					</TabPane>

					<TabPane
						tab={
							<span>
								<FontAwesomeIcon icon={faChartLine} style={{ marginRight: '25px' }} />
								Mutual Funds
							</span>
						}
						key='mutualFunds'
					>
						<HeldAwayInvestmentCardData />
					</TabPane>

					<TabPane
						tab={
							<span>
								<FontAwesomeIcon icon={faChartLineDown} style={{ marginRight: '25px' }} />
								Bonds
							</span>
						}
						key='bonds'
					>
						<HeldAwayInvestmentCardData />
					</TabPane>
				</Tabs>
			</GenericCard>
		</>
	);
};
export default HeldAwayInvestmentCard;
