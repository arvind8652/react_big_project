import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';

// components
import { InsideTabView } from '../../components/ExploreProduct/index';
import TopBar from '../../components/DashboardScreenTopbar/DashboardScreenTopbar';

// scss
import './RMExploreProduct.scss';

// external
import { Tabs } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

// internal
import { generateCsObject } from '../../utils/utils';
import {
	executeGetExploreProductsDetails,
	executeGetExploreProductCS,
	executeGetExploreProductAdvancedFilter
} from '../../redux/actions/exploreProductsActions';
import {
	otherOptions,
	trendingOptionsObject,
	singleTrendingOption
} from '../../components/ExploreProduct/filterButtonOptions';
import BackToTop from '../../components/BackToTop/BackToTop';

const { TabPane } = Tabs;

export const RMExploreProduct = ({ leftPanel }) => {
	// states
	const [activeTab, setActiveTab] = useState('Trending');
	const [loading, setLoading] = useState(false);
	const [detailsLoading, setDetailsLoading] = useState(false);
	const [trendingOptions, setTrendingOptions] = useState(trendingOptionsObject);
	const [mutualFundsOptions, setMutualFundsOptions] = useState([]);
	const [dynamicFilterButtons, setDynamicFilterButtons] = useState([]);

	const [assetGroupObj, setAssetGroupObj] = useState([
		{
			dataValue: 'Trending',
			displayValue: 'Trending'
		}
	]);
	let authorizeCode = '';
	leftPanel &&
		leftPanel.map((menu) => {
			menu.subMenu.map((subMenu) => {
				if (subMenu.subMenuId == 'EXPLOREPRDS') authorizeCode = subMenu.authorizeCode;
			});
		});

	useEffect(() => {
		executeGetExploreProductCS().then((csObject) => {
			let newCs = [];

			if (csObject) {
				csObject?.csList?.forEach((item, idx) => {
					newCs[idx] = generateCsObject(item?.controlStructureField);
				});
				let newMutualFundOptions = newCs[0].SECURED_TYPE.dropDownValue.map((each) => {
					return {
						iconName: 'faChartLine',
						label: each.displayValue,
						value: each.dataValue
					};
				});
				setDynamicFilterButtons(
					newCs[0].assetype.lookupValue.lookUpValues.map((each) => {
						return {
							label: each.AssetTypeName,
							value: each.AssetType,
							assetGroup: each.AssetGroup
						};
					})
				);
				setMutualFundsOptions(newMutualFundOptions);

				if (assetGroupObj.length === 1)
					setAssetGroupObj([...assetGroupObj, ...newCs[0]?.AssetGroup?.dropDownValue]);
			}
		});
		if (isCustomerUser) {
			setTrendingOptions([...trendingOptions, singleTrendingOption]);
		}
	}, []);

	const getPostObject = () => {
		return {
			data: {
				ClientID: isCustomerUser ? clientId : null,
				BusinessDate: businessDate,
				Filter: 'UG',
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

	useEffect(() => {
		// executeGetExploreProductsDetails(getPostObject(), setDetailsLoading);
		// executeGetExploreProductAdvancedFilter(activeTab);
		callRefreshApis();
	}, [activeTab]);

	const callRefreshApis = () => {
		executeGetExploreProductsDetails(getPostObject(), setDetailsLoading);
		executeGetExploreProductAdvancedFilter(activeTab);
	};

	//refs
	const tableInfo = useRef({
		pageNum: 1,
		pageSize: 3
	});

	// variables
	const history = useHistory();
	const location = useLocation();
	const isCustomerUser = location?.state?.type === 'customer';
	const clientId = location?.state?.clientId || null;

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
	const filterButtons = (tabName) =>
		dynamicFilterButtons.filter((each) => each.assetGroup === tabName);

	const selectProperButtonOptions = (tabName) => {
		switch (tabName) {
			case 'Trending':
				return trendingOptions;
			case 'EQ':
			case 'MM':
			case 'DB':
				return filterButtons(tabName);
			case 'MF':
				return mutualFundsOptions;
			case 'others':
				return otherOptions;
			default:
				return [];
		}
	};

	const businessDate = useSelector((state) => state.auth.user.curDate);

	return (
		<>
			<TopBar
				showBackArrow={false}
				onCancel={() => history.goBack()}
				screenText='Explore Products'
			/>
			<Tabs activeKey={activeTab} onChange={setActiveTab} defaultActiveKey='DB'>
				{assetGroupObj?.map((eachTab) => {
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
								isCustomerUser={isCustomerUser}
								clientId={clientId}
								buttonOptions={selectProperButtonOptions(eachTab?.dataValue)}
								loading={loading}
								setLoading={setLoading}
								detailsLoading={detailsLoading}
								tabData={eachTab?.dataValue}
								tabName={eachTab?.displayValue}
								authorizeCode={authorizeCode}
								callRefreshApis={callRefreshApis}
							/>
						</TabPane>
					);
				})}
			</Tabs>
			<BackToTop />
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		leftPanel: state.dashboard.leftPanel
	};
};

export default connect(mapStateToProps)(RMExploreProduct);
