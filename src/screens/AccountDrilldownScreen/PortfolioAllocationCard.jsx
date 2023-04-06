import React, { useEffect, useState } from 'react';
import GenericCard from '../../components/GenericCard/GenericCard';
import { Pie, Bar } from '@ant-design/charts';
import { theme } from '../../theme';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import moment from 'moment';
const PortfolioAllocationCard = ({
	allPortfolioAllocationBasedOnAssetClass,
	controlStructure,
	allAssetTypeWiseData,
	authData,
	selectedType = 'Asset Class'
}) => {
	const { TabPane } = Tabs;

	const [tabs, setTabs] = useState([
		{
			tab: 'tab1',
			key: 'tab1'
		},
		{
			tab: 'tab2',
			key: 'tab2'
		},
		{
			tab: 'tab3',
			key: 'tab3'
		}
	]);

	const menuList = controlStructure?.dropDownValue?.map((option, index) => {
		return {
			id: index,
			menuName: option.displayValue
		};
	});

	const lstAssetGrp = allPortfolioAllocationBasedOnAssetClass?.lstAssetGrp.map((item) => {
		return {
			type: item.displayName,
			value: item.calculatedPercentage
		};
	});

	const lstAssetType = allPortfolioAllocationBasedOnAssetClass?.lstAssetType.map((item) => {
		return {
			type: item.displayName,
			value: item.calculatedPercentage
		};
	});

	let currentTab = [];
	useEffect(() => {
		switch (selectedType) {
			case 'Equity':
				currentTab = [
					{
						tab: 'Sector',
						key: 'sector',
						chartData: allAssetTypeWiseData?.portfolioDetail?.eqAllocSectorWise
					},
					{
						tab: 'Market Capitalization',
						key: 'marketCapitalization',
						chartData: allAssetTypeWiseData?.portfolioDetail?.eqAllocCapitalWise
					}
				];
				break;
			case 'Mutual Funds':
				currentTab = [
					{
						tab: 'Category',
						key: 'category',
						chartData: allAssetTypeWiseData?.portfolioDetail?.mfAllocCategoryWise
					},
					{
						tab: 'Fund Manager',
						key: 'fundManager',
						chartData: allAssetTypeWiseData?.portfolioDetail?.mfAllocIssuerWise
					}
				];

				break;
			case 'Fixed Income':
				currentTab = [
					{
						tab: 'Portfolio Duration',
						key: 'portfolioDuration',
						chartData: allAssetTypeWiseData?.portfolioDetail?.fiAllocDurationWise
					},
					{
						tab: 'Distribution',
						key: 'distribution',
						chartData: allAssetTypeWiseData?.portfolioDetail?.fiAllocAssetTypeWise
					}
				];

				break;
			default:
				break;
		}

		setTabs(currentTab);
	}, [selectedType, controlStructure]);

	const data = [
		{
			type: 'Mutual Funds',
			value: 27
		},
		{
			type: 'Stocks',
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

	const config1 = {
		appendPadding: 10,
		data: lstAssetGrp ? lstAssetGrp : data,
		angleField: 'value',
		colorField: 'type',
		// radius: 1,
		innerRadius: 0.6,
		xField: 'type',
		yField: 'value',
		seriesField: 'type',
		radius: 0.9,
		legend: { position: 'bottom' }
	};

	const config2 = {
		appendPadding: 10,
		data: lstAssetType ? lstAssetType : data,
		angleField: 'value',
		colorField: 'type',
		radius: 0.7,
		legend: { position: 'bottom' }
	};

	const barData = [
		{
			name: 'Metal',
			value: 38
		},
		{
			name: 'Media',
			value: 52
		},
		{
			name: 'Pharmaceutical',
			value: 61
		},
		{
			name: 'IT',
			value: 145
		},
		{
			name: 'FMCG',
			value: 48
		},
		{
			name: 'Auto',
			value: 38
		},
		{
			name: 'Industrial',
			value: 38
		},
		{
			name: 'Banking',
			value: 38
		},
		{
			name: 'Oil and Gas',
			value: 38
		}
	];

	const pieData = [
		{
			type: 'Large Capital',
			value: 27
		},
		{
			type: 'Medium Capital',
			value: 25
		},
		{
			type: 'Small Capital',
			value: 18
		}
	];

	const barConfig = {
		data: tabs[0]?.chartData ? tabs[0].chartData : [],
		xField: 'value',
		yField: 'name',
		legend: { position: 'top-left' },
		barBackground: { style: { fill: 'rgba(0,0,0,0.1)' } },
		interactions: [
			{
				type: 'active-region',
				enable: false
			}
		],
		tooltip: {
			// domStyles: { 'g2-tooltip-title': { display: 'none' } },
			formatter: (xField) => {
				const NewData = () => {
					return new Intl.NumberFormat(authData == 'INDIAN' ? 'en-IN' : 'en-US', {
						minimumFractionDigits: 0
					}).format(xField?.value);
				};
				return { name: 'value', value: NewData() };
			}
		}
	};

	const pieConfig = {
		appendPadding: 10,
		data: tabs[1]?.chartData ? tabs[1].chartData : [],
		angleField: 'value',
		colorField: 'name',
		radius: 1,
		innerRadius: 0.8,
		label: false,
		interactions: false,
		statistic: false
	};

	function callback(key) {
		console.log(key);
	}

	return (
		<GenericCard
			header={'Portfolio Allocation'}
			menuFlag={2}
			menuList={menuList}
			dropdownKey={'portfolioAllocation'}
		>
			{selectedType === 'Asset Class' && (
				<div style={theme.justifySBetween}>
					<Pie {...config1} />
					<Pie {...config2} />
				</div>
			)}
			{tabs.length ? (
				<Tabs defaultActiveKey={tabs[0].key} onChange={callback}>
					<TabPane tab={tabs[0].tab} key={tabs[0].key}>
						<Bar {...barConfig} />
					</TabPane>
					<TabPane tab={tabs[1].tab} key={tabs[1].key}>
						<Pie {...pieConfig} />
					</TabPane>
				</Tabs>
			) : (
				''
			)}
		</GenericCard>
	);
};

const mapStateToProps = (state) => {
	return {
		allPortfolioAllocationBasedOnAssetClass:
			state.accountDrilldown?.portfolioAllocationBasedOnAssetClass,
		controlStructure: state.accountDrilldown?.controlStructure?.csList[0].controlStructureField[1],
		allAssetTypeWiseData: state.accountDrilldown?.assetTypeWise,
		selectedType: state.common.dropdownKeys?.portfolioAllocation,
		authData:
			state &&
			state.auth &&
			state.auth.user &&
			state.auth.user.configResponse[0] &&
			state.auth.user.configResponse[0].value2
	};
};

export default connect(mapStateToProps)(PortfolioAllocationCard);
