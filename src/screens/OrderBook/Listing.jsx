import React, { useState, useEffect, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Tabs, Button, Popover } from 'antd';
import './OrderBook.scss';
// components
import InsideTabView from './InsideTabView';
import TopBar from '../../components/DashboardScreenTopbar/DashboardScreenTopbar';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';

// redux
import {
	OrderBookListData,
	OrderBookAdvancedFilter
} from '../../redux/actions/orderBookListAction';

const { TabPane } = Tabs;

export const ActiveTabContext = createContext('');

const Listing = ({ csObject, clientId, getCurrentDate, showCurrencySymbol, authorizeCode }) => {
	const history = useHistory();
	const [activeTab, setActiveTab] = useState(null);
	const [tabs, setTabs] = useState({});
	const [isLoadingData, setIsLoadingData] = useState(true);
	const [showLoader, setShowLoader] = useState(false);

	const generateTabs = () => {
		// generating data for tabs
		let formattedTabs = {};
		csObject?.AssetGroup?.dropDownValue
			?.filter((dropDownValue) => dropDownValue.displayValue !== 'Mutual Fund')
			.forEach((e) => {
				const tab = {
					[e.dataValue]: {
						title: e.displayValue,
						component: (
							<InsideTabView
								clientId={clientId}
								filterOptions={csObject?.OBFilterParam?.dropDownValue}
								sortOptions={csObject?.OBSortParam?.dropDownValue}
								OrderStages={csObject?.OrderStages?.dropDownValue}
								showCurrencySymbol={showCurrencySymbol}
								activeTab={activeTab}
								setBoolean={setIsLoadingData}
								showLoader={showLoader}
								authorizeCode={authorizeCode}
							/>
						)
					}
				};

				formattedTabs = {
					...formattedTabs,
					...tab
				};
			});

		return formattedTabs;
	};

	useEffect(() => {
		// setting tabs data
		setTabs(generateTabs());

		// setting active tab
		if (history.location.state?.activeTab) setActiveTab(history.location.state.activeTab);
		else setActiveTab(csObject?.AssetGroup?.dropDownValue[0]?.dataValue);
	}, [csObject]);

	useEffect(() => {
		if (csObject) setTabs(generateTabs());
	}, [showLoader, csObject]);

	const getOrderBookList = (assetGroup) => {
		const postObject = {
			data: {
				StartDate: '2019-12-12',
				// EndDate: "2021-12-12",
				// StartDate:getCurrentDate.slice(0,10),
				EndDate: getCurrentDate?.slice(0, 10),
				AssetGroup: assetGroup,
				CustomerId: clientId,
				Filterparam: '',
				Period: null,
				FromRowNumber: 0,
				RowSize: 25,
				clientId: clientId
			}
		};

		OrderBookListData(postObject).then((res) => {
			if (res) {
				setShowLoader(false);
			}
		});
		OrderBookAdvancedFilter(postObject);
	};

	// CALL GET API HERE, AFTER TAB CHANGE
	const handleTabChange = async (key) => {
		setActiveTab(key);
	};

	useEffect(() => {
		if (activeTab) {
			setShowLoader(true);
			getOrderBookList(activeTab);
		}
	}, [activeTab]);

	useEffect(() => {
		if (!isLoadingData) {
			setShowLoader(true);
			setIsLoadingData(true);
			getOrderBookList(activeTab);
		}
	}, [isLoadingData]);

	const handleArrow = () => {
		history.push('/dashboard');
	};

	const styles = {
		tabBarActive: {
			color: '#354081',
			fontSize: '18px'
		},
		tabBarNormal: {
			color: '#898EA9',
			fontSize: '18px'
		},
		activeTitle: {
			color: 'rgba(53, 64, 129, 1)',
			marginTop: '-20px',
			fontSize: '18px'
		},
		popOverContent: {
			border: '1px solid #5d6dd1',
			borderRadius: '8px',
			boxShadow: '2px 2px 2px rgba(53, 64, 129, 0.25)'
		}
	};

	const tobBarHandler = () => {
		if (authorizeModule(authorizeCode, CONSTANTS?.authorizeCode?.add)) {
			return (
				<TopBar
					showBackArrow={true}
					screenText='Order Book'
					submitBtnText='Add'
					onSubmit={() => {}}
					onArrowclick={handleArrow}
					RenderSubmit={
						<Popover
							placement='bottomLeft'
							content={
								activeTab === 'EQ' ? (
									<div className='popOverContent' style={{ marginTop: '10px' }}>
										<p
											onClick={() => {
												history.push({
													pathname: '/dashboard/orderBook/investment',
													state: { activeTab }
												});
											}}
											href={() => {}}
										>
											Reservation
										</p>
									</div>
								) : (
									<div className='popOverContent'>
										<p
											onClick={() => {
												history.push({
													pathname: '/dashboard/orderBook/OrderBookInput',
													state: { activeTab, buySell: 'BUY' }
												});
											}}
											href={() => {}}
										>
											Buy
										</p>
										<p
											onClick={() => {
												history.push({
													pathname: '/dashboard/orderBook/OrderBookInput',
													state: { activeTab, buySell: 'SELL' }
												});
											}}
											href={() => {}}
										>
											Sell
										</p>
										<p
											onClick={() => {
												history.push({
													pathname: '/dashboard/orderBook/investment',
													state: { activeTab }
												});
											}}
											href={() => {}}
										>
											Reservation
										</p>
									</div>
								)
							}
							trigger='click'
							overlayInnerStyle={styles.popOverContent}
							className='topbar-btn'
						>
							<Button>+ Add</Button>
						</Popover>
					}
				/>
			);
		} else {
			return <TopBar showBackArrow={true} screenText='Order Book' />;
		}
	};

	return (
		<>
			{tobBarHandler()}

			<p style={styles.activeTitle}>{tabs[activeTab]?.title}</p>
			<ActiveTabContext.Provider value={activeTab}>
				<Tabs activeKey={activeTab} onChange={(key) => handleTabChange(key)}>
					{Object.keys(tabs).map((tab) => {
						return (
							<TabPane
								tab={
									<span style={activeTab === tab ? styles.tabBarActive : styles.tabBarNormal}>
										{tabs[tab].title}
									</span>
								}
								key={tab}
							>
								{tabs[tab].component}
							</TabPane>
						);
					})}
				</Tabs>
			</ActiveTabContext.Provider>
		</>
	);
};

export default Listing;
