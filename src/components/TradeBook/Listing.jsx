import React, { useState, useEffect, createContext } from 'react';
import { Tabs } from 'antd';

//Custom SCSS
import './TradeBook.scss';

// components
import InsideTabView from './InsideTabView';

// redux
import {
	executeGetTradeBookList,
	executeGetTradeBookListAdvancedFilter
} from '../../redux/actions/tradeBookListActions';

const { TabPane } = Tabs;

export const ActiveTabContext = createContext('');

const Listing = ({ csObject, tradeBookType, clientId, showCurrencySymbol }) => {
	const [activeTab, setActiveTab] = useState('');
	const [tabs, setTabs] = useState({});
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
								tradeBookType={tradeBookType}
								clientId={clientId}
								filterOptions={csObject?.TRADEBOOKLISTPARAM?.dropDownValue}
								sortOptions={csObject?.TRADEBOOKSORTPARAM?.dropDownValue}
								showCurrencySymbol={showCurrencySymbol}
								showLoader={showLoader}
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
		setActiveTab(csObject?.AssetGroup?.dropDownValue[0]?.dataValue);

		// getting list based on default active tab
		getTradeBookList(csObject?.AssetGroup?.dropDownValue[0]?.dataValue);

		// getting advanced filter based on default active tab
		getAdvanceFilter(csObject?.AssetGroup?.dropDownValue[0]?.dataValue);
	}, [csObject]);

	useEffect(() => {
		if (csObject) setTabs(generateTabs());
	}, [showLoader, csObject]);

	const getTradeBookList = (assetGroup) => {
		const postObject = {
			data: {
				Deal: {
					AssetGroup: assetGroup
				},
				CustomerId: tradeBookType === 'CustomerTradeBook' ? clientId : null,
				// AssetGroup: assetGroup,
				Period: null,
				FromRowNumber: 0,
				RowSize: 25,
				Filterparam: null,
				Sorting: null,
				Scheme: null,
				Security: null,
				AssetType: null,
				CounterParty: null,
				TranType: null,
				Status: null,
				TransactionValueMin: null,
				TransactionValueMax: null,
				StartDate: null,
				EndDate: null
			}
		};
		if (postObject.data.Deal.AssetGroup) {
			executeGetTradeBookList(postObject).then((res) => {
				if (res) {
					setShowLoader(false);
				}
			});
			// executeGetTradeBookListAdvancedFilter(postObject);
		}
	};

	const getAdvanceFilter = (assetGroup) => {
		const postObject = {
			data: {
				clientId: null,
				AssetGroup: assetGroup
			}
		};

		if (postObject.data.AssetGroup) {
			executeGetTradeBookListAdvancedFilter(postObject);
		}
	};

	// CALL GET API HERE, AFTER TAB CHANGE
	const handleTabChange = async (key) => {
		setActiveTab(key);
	};

	useEffect(() => {
		if (activeTab) {
			setShowLoader(true);
			getTradeBookList(activeTab);
			getAdvanceFilter(activeTab);
		}
	}, [activeTab]);

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
		}
	};

	return (
		<>
			<div className='dashboard-topbar-container'>
				<div>Trade Book</div>
			</div>
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
