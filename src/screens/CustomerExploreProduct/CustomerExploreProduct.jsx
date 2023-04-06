import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

// components
import { InsideTabView } from '../../components/ExploreProduct/index';
import TopBar from '../../components/DashboardScreenTopbar/DashboardScreenTopbar';

// scss
import './CustomerExploreProduct.scss';

// external
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import { useHistory } from 'react-router-dom';

// internal
import { generateCsObject } from '../../utils/utils';
import {
	executeGetExploreProductsDetails,
	executeGetExploreProductCS,
	executeGetExploreProductAdvancedFilter
} from '../../redux/actions/exploreProductsActions';
import {
	bondOptions,
	mutualFundsOptions,
	otherOptions,
	stocksOptions,
	trendingOptionsObject,
	singleTrendingOption
} from '../../components/ExploreProduct/filterButtonOptions';

const { TabPane } = Tabs;

const CustomerExploreProduct = ({ customerCode, type, cs }) => {
	// For Customer User type = customer
	// For RM User type = rm

	// states
	const [activeTab, setActiveTab] = useState(null);
	const [csObject, setCsObject] = useState([]);
	const [loading, setLoading] = useState(false);

	//refs
	const newTrendingOptions = useRef(trendingOptionsObject);
	const tableInfo = useRef({
		pageNum: 1,
		pageSize: 3
	});

	// variables
	const history = useHistory();
	const isCustomerUser = type === 'customer';
	const clientId = customerCode || null;
	const commonProps = {
		isCustomerUser,
		clientId,
		loading,
		pageSize: tableInfo?.current?.pageSize
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
		}
	};

	const selectProperButtonOptions = (tabName) => {
		switch (tabName) {
			case 'Trending':
				return newTrendingOptions.current;
			case 'EQ':
				return stocksOptions;
			case 'MM':
				return otherOptions;
			case 'MF':
				return mutualFundsOptions;
			case 'DB':
				return bondOptions;
			case 'others':
				return otherOptions;
			default:
				return [];
		}
	};

	const hasBestMatchButton = () => newTrendingOptions.current.some((e) => e.label === 'Best Match');

	const businessDate = useSelector((state) => state.auth.user.curDate);
	console.log(businessDate);

	const getPostObject = () => {
		return {
			data: {
				ClientID: isCustomerUser ? clientId : null,
				BusinessDate: businessDate,
				Filter: 'UG', // currently not used
				AssetGroup: activeTab,
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
	};

	const isArray = (data) => Array.isArray(data);

	useEffect(() => {
		executeGetExploreProductCS();
	}, []);

	useEffect(() => {
		// formatting cs object
		let newCs = [];
		cs?.csList?.forEach((item, idx) => {
			newCs[idx] = generateCsObject(item?.controlStructureField);
		});

		newCs[0]?.AssetGroup?.dropDownValue?.splice(0, 1);

		// add extra filter button when type is customer
		if (!hasBestMatchButton()) {
			newTrendingOptions?.current?.unshift(singleTrendingOption);
		}

		// addding extra trending tab
		if (isArray(newCs)) {
			if (newCs[0]?.AssetGroup?.dropDownValue?.some((e) => e?.dataValue !== 'Trending')) {
				newCs[0]?.AssetGroup?.dropDownValue?.unshift({
					dataValue: 'Trending',
					displayValue: 'Trending'
				});
			}
		}

		const defaultTabName = newCs[0]?.AssetGroup?.defaultvalue;
		setActiveTab(defaultTabName);

		setCsObject(newCs);

		return () => {
			if (hasBestMatchButton()) {
				newTrendingOptions?.current?.shift();
			}
		};
	}, [cs]);

	const getStartIndex = () =>
		tableInfo.current.pageNum * tableInfo.current.pageSize - tableInfo.current.pageSize;

	const getEndIndex = () => tableInfo.current.pageNum * tableInfo.current.pageSize;

	const onChange = ({ current, pageSize }) => {
		tableInfo.current = { pageNum: current, pageSize: pageSize };
		executeGetExploreProductsDetails(getPostObject(), setLoading);
	};

	useEffect(() => {
		executeGetExploreProductsDetails(getPostObject(), setLoading);
		executeGetExploreProductAdvancedFilter(activeTab);
	}, [activeTab, businessDate]);

	return (
		<>
			<TopBar
				showBackArrow={false}
				onCancel={() => history.goBack()}
				// breadCrumb={getBreadCrumbs()}
				screenText='Explore Products'
			/>
			<Tabs
				// defaultActiveKey={trendingTab.key}
				activeKey={activeTab}
				onChange={setActiveTab}
			>
				{csObject[0]?.AssetGroup?.dropDownValue?.map(function (eachTab) {
					return (
						<TabPane
							tab={
								<span
									style={
										activeTab === eachTab?.tabLabel ? styles.tabBarActive : styles.tabBarNormal
									}
								>
									{eachTab?.displayValue}
								</span>
							}
							key={eachTab?.dataValue}
						>
							<InsideTabView
								tabName={eachTab?.displayValue}
								tabData={eachTab?.dataValue}
								buttonOptions={selectProperButtonOptions(eachTab?.dataValue)}
								onChange={onChange}
								getStartIndex={getStartIndex}
								getEndIndex={getEndIndex}
								setLoading={setLoading}
								{...commonProps}
							/>
						</TabPane>
					);
				})}
			</Tabs>
		</>
	);
};

function mapStateToProps(state) {
	return {
		customerCode: state?.common?.customerInfo?.customerCode,
		type: state?.common?.customerInfo?.type,
		cs: state?.exploreProducts?.exploreProductsControlStructure
	};
}

export default connect(mapStateToProps)(CustomerExploreProduct);
