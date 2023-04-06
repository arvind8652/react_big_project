import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Badge, Divider, Menu, Dropdown } from 'antd';
import { faExchange } from '@fortawesome/pro-light-svg-icons';
import 'antd/dist/antd.css';
import { DualAxes } from '@ant-design/charts';
import GenericCard from '../../components/GenericCard/GenericCard';
import '../../components/PortfolioOverview/App.scss';
import ColorWithLabel from '../LabelTypes/ColorWithLabel';
import { palette, fontSet, avatar, theme } from '../../theme';
import TypoGraphy from '../TypoGraphy/TypoGraphy';
import { connect } from 'react-redux';
import moment from 'moment';
import {
	executeGetPortfolioPerformanceBasedOnCapital,
	executeGetPortfolioPerformanceBasedOnBenchmark
} from '../../redux/actions/accountDrilldownActions';
import RupeeOrNonRupee from '../RupeeOrNonRupee/RupeeOrNonRupee';
const PortfolioPerformance = ({
	controlStructure,
	allPortfolioAllocationBasedOnBenchmark,
	allPortfolioPerformanceBasedOnCapital,
	executeGetPortfolioPerformanceBasedOnCapital,
	executeGetPortfolioPerformanceBasedOnBenchmark,
	selectedType = 'Benchmark'
}) => {
	var data = [
		{
			month: 'Jun',
			Recommended: 2500
		},
		{
			month: 'Jul',
			Recommended: 4900
		},
		{
			month: 'Aug',
			Recommended: 5200
		},
		{
			month: 'Sep',
			Recommended: 10000,
			Date: '12 Aug 2020'
		},
		{
			month: 'Oct',
			Recommended: 8000,
			Date: '29 Sep 2020'
		},
		{
			month: 'Nov',
			Recommended: 8200,
			Date: '15 Oct 2020'
		}
	];

	var data1 = [
		{
			month: 'Jun',
			Actual: 300
		},
		{
			month: 'Jul',
			Actual: 500
		},
		{
			month: 'Aug',
			Actual: 500
		},
		{
			month: 'Sep',
			Actual: 800
		},
		{
			month: 'Oct',
			Actual: 6000
		},
		{
			month: 'Nov',
			Actual: 620
		}
	];

	const [selectedPeriod, setSelectedPeriod] = useState('3 M');
	const [benchmarkData, setBenchmarkData] = useState();
	const [capitalData, setCapitalData] = useState();
	const [recommandedData, setRecommandedData] = useState(data);
	const [actualData, setActualData] = useState(data1);

	useEffect(() => {
		const requestObject = {
			CustomerID: 'ANDREWC',
			Scheme: 'ANDREW',
			BusinessDate: '2020-01-15',
			Period: selectedPeriod
		};
		executeGetPortfolioPerformanceBasedOnBenchmark(requestObject);
		executeGetPortfolioPerformanceBasedOnCapital(requestObject);
	}, [selectedPeriod, selectedType]);

	useEffect(() => {
		let recommanded = [];
		let actual = [];
		switch (selectedType) {
			case 'Benchmark':
				{
					setBenchmarkData({
						portfolioReturn: allPortfolioAllocationBasedOnBenchmark?.portfolioReturn,
						benchmarkReturn: allPortfolioAllocationBasedOnBenchmark?.benchmarkReturn,
						benchmarkValue: allPortfolioAllocationBasedOnBenchmark?.benchmarkValue,
						portfolioValue: allPortfolioAllocationBasedOnBenchmark?.portfolioValue,
						income: allPortfolioAllocationBasedOnBenchmark?.income,
						alpha: allPortfolioAllocationBasedOnBenchmark?.alpha,
						currency: allPortfolioAllocationBasedOnBenchmark?.currencySymbol
					});

					if (allPortfolioPerformanceBasedOnCapital !== null)
						recommanded = allPortfolioAllocationBasedOnBenchmark.lstMarketValueofBenchmark.map(
							(item) => {
								return {
									month: moment(item.date).format('MMM'),
									Recommended: item.value
								};
							}
						);
					if (allPortfolioPerformanceBasedOnCapital !== null)
						actual = allPortfolioAllocationBasedOnBenchmark.lstMarketValueofAccount.map((item) => {
							return {
								month: moment(item.date).format('MMM'),
								Actual: item.value
							};
						});

					setRecommandedData(recommanded);
					setActualData(actual);
				}

				break;
			case 'Capital':
				{
					setCapitalData({
						openingBalance: allPortfolioPerformanceBasedOnCapital?.openingBalance,
						netCapitalInflow: allPortfolioPerformanceBasedOnCapital?.netCapitalInflow,
						income: allPortfolioPerformanceBasedOnCapital?.income,
						portfolioValue: allPortfolioPerformanceBasedOnCapital?.portfolioValue,
						portfolioReturn: allPortfolioPerformanceBasedOnCapital?.portfolioReturn,
						alpha: allPortfolioPerformanceBasedOnCapital?.alpha,
						currency: allPortfolioPerformanceBasedOnCapital?.currencySymbol
					});

					recommanded = allPortfolioPerformanceBasedOnCapital.lstCapitalInvested.map((item) => {
						return {
							month: moment(item.date).format('MMM'),
							Recommended: item.value
						};
					});

					actual = allPortfolioPerformanceBasedOnCapital.lstMarketValue.map((item) => {
						return {
							month: moment(item.date).format('MMM'),
							Actual: item.value
						};
					});

					setRecommandedData(recommanded);
					setActualData(actual);
				}
				break;

			default:
				console.log('Loop failed');
				break;
		}
	}, [
		selectedPeriod,
		allPortfolioAllocationBasedOnBenchmark,
		allPortfolioPerformanceBasedOnCapital
	]);

	const styleSet = {
		container: {
			fontSize: fontSet.body.xxlarge,
			color: palette.text.success
		}
	};
	const menuList = controlStructure?.dropDownValue?.map((option, index) => {
		return {
			id: index,
			menuName: option.displayValue
		};
	});

	var config = {
		// data: [data, data, data],
		xField: 'month',
		yField: ['Recommended', 'Actual'],
		data: [recommandedData, actualData],

		geometryOptions: [
			{
				geometry: 'line',
				color: '#5B8FF9'
			},
			{
				geometry: 'line',
				color: '#5AD8A6'
			}
		]
	};
	const defaultDropdown = [
		{
			id: 0,
			menuName: 'Benchmark',
			data: {}
		},
		{
			id: 1,
			menuName: 'Capital',
			data: {}
		}
	];

	const updatePeriod = (period) => {
		setSelectedPeriod(period);
	};

	return (
		<>
			<GenericCard
				header={'Portfolio Performance'}
				menuFlag={2}
				menuList={menuList}
				dropdownKey={'portfolioPerformance'}
			>
				<Row>
					<Col span={22}>
						<Badge
							className={selectedPeriod === '3 M' ? 'portfolio-badge1' : 'portfolio-badge'}
							onClick={() => {
								updatePeriod('3 M');
							}}
						>
							{'3 M'}
						</Badge>
						<Badge
							className={selectedPeriod === '6 M' ? 'portfolio-badge1' : 'portfolio-badge'}
							onClick={() => {
								updatePeriod('6 M');
							}}
						>
							{'6 M'}
						</Badge>
						<Badge
							className={selectedPeriod === '1 Y' ? 'portfolio-badge1' : 'portfolio-badge'}
							onClick={() => {
								updatePeriod('1 Y');
							}}
						>
							{'1 Y'}
						</Badge>
						<Badge
							className={selectedPeriod === '3 Y' ? 'portfolio-badge1' : 'portfolio-badge'}
							onClick={() => {
								updatePeriod('3 Y');
							}}
						>
							{'3 Y'}
						</Badge>
						<Badge
							className={selectedPeriod === '5 Y' ? 'portfolio-badge1' : 'portfolio-badge'}
							onClick={() => {
								updatePeriod('5 Y');
							}}
						>
							{'5 Y'}
						</Badge>
						<Badge
							className={selectedPeriod === 'Max' ? 'portfolio-badge1' : 'portfolio-badge'}
							onClick={() => {
								updatePeriod('Max');
							}}
						>
							{'Max'}
						</Badge>
					</Col>

					<Col span={2}>
						<TypoGraphy label={'Alpha'}>
							<div style={styleSet.container}>
								{selectedType === 'Benchmark' ? benchmarkData?.alpha : capitalData?.alpha}%
							</div>
						</TypoGraphy>
					</Col>
				</Row>
				<DualAxes {...config} />
				<Row style={{ marginTop: '20px' }}>
					<span style={{ marginLeft: '30%' }}>
						<ColorWithLabel
							color={'#5B8FF9'}
							label={'Recommended'}
							//key={index}
						/>
					</span>
					<span style={{ marginLeft: '10%' }}>
						<ColorWithLabel
							color={'#5AD8A6'}
							label={'Actual Allocation'}
							//key={index}
						/>
					</span>
				</Row>
				<Divider />

				{selectedType === 'Benchmark' ? (
					//Benchmark Container
					<>
						<Row>
							<Col span={12}>
								<div style={theme.justify}>
									<div>
										<TypoGraphy label={'Porfolio Return'}>
											{benchmarkData?.currency}{' '}
											<RupeeOrNonRupee amount={benchmarkData?.portfolioReturn} />
										</TypoGraphy>
									</div>
									<div>
										<TypoGraphy label={'Porfolio Value'}>
											{benchmarkData?.portfolioValue}%
										</TypoGraphy>
									</div>
								</div>
							</Col>
							<Col span={12}>
								<div style={theme.justify}>
									<div>
										<TypoGraphy label={'Benchmark Value'}>
											{benchmarkData?.currency}{' '}
											<RupeeOrNonRupee amount={benchmarkData?.benchmarkValue} />
										</TypoGraphy>
									</div>
									<div>
										<TypoGraphy label={'Benchmark Return'}>
											{benchmarkData?.benchmarkReturn}%
										</TypoGraphy>
									</div>
								</div>
							</Col>
						</Row>
					</>
				) : (
					//Capital Container
					<>
						<Row>
							<Col span={12}>
								<div style={theme.justify}>
									<div>
										<TypoGraphy label={'Opening Balance'}>
											{capitalData?.openingBalance}%
										</TypoGraphy>
									</div>
									<div>
										<TypoGraphy label={'Net Inflow'}>
											{capitalData?.currency} {capitalData?.netCapitalInflow}
										</TypoGraphy>
									</div>
								</div>
							</Col>
							<Col span={12}>
								<div style={theme.justify}>
									<div>
										<TypoGraphy label={'Income & Gain'}>
											{capitalData?.currency} {capitalData?.income}
										</TypoGraphy>
									</div>
									<div>
										<TypoGraphy label={'Porfolio Return'}>
											{capitalData?.currency} {capitalData?.portfolioValue}{' '}
											{capitalData?.portfolioReturn}%
										</TypoGraphy>
									</div>
								</div>
							</Col>
						</Row>
					</>
				)}
			</GenericCard>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		allPortfolioAllocationBasedOnBenchmark:
			state.accountDrilldown?.portfolioPerformanceBasedOnBenchmark,
		allPortfolioPerformanceBasedOnCapital:
			state.accountDrilldown?.portfolioPerformanceBasedOnCapital,
		controlStructure: state.accountDrilldown?.controlStructure?.csList[0].controlStructureField[0],
		selectedType: state.common.dropdownKeys?.portfolioPerformance
	};
};

const mapDispatchToProps = {
	executeGetPortfolioPerformanceBasedOnBenchmark,
	executeGetPortfolioPerformanceBasedOnCapital
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioPerformance);
