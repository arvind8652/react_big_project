import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Avatar, Button, Card, Col, Popover, Row, Select, Tabs } from 'antd';
import { Area, TinyArea, Scatter, Bullet, Column, Funnel, Pie } from '@ant-design/charts';
import {
	getAgingAnalysisApi,
	getConStrikeRateApi,
	getConversionTrendApi,
	getCurrPipelineApi,
	getDueNowApi,
	getExpectedConApi,
	getHighValueDealApi,
	getMissedDuedateApi,
	getMovedDownApi,
	getMovedUpApi,
	getNearClosureApi,
	getOpporBreakupApi,
	getOpporDistributionApi,
	getRecentConApi,
	getRecentMissedApi,
	getSalesPipelineApi
} from '../../api/opportunityOverviewApi';
import './CustomerOverviewScreen.scss';
import GenericTinyColumnChart from '../../components/Graphs/GenericTinyColumnChart/GenericTinyColumnChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faClock,
	faEllipsisHAlt,
	faExternalLink,
	faMinusCircle,
	faSignOut,
	faSpinner
} from '@fortawesome/pro-light-svg-icons';
import {
	faAngleDoubleDown,
	faAngleDoubleUp,
	faCalendarTimes,
	faThumbsDown,
	faThumbsUp,
	faCloudMeatball,
	faStar
} from '@fortawesome/pro-regular-svg-icons';
import axios from 'axios';
import moment from 'moment';
import { checkValidGraphData, currencyFormatter, exportJSON, kFormatter } from '../../utils/utils';
import {
	ScButtonText,
	ScModal,
	ScRate,
	ScRow,
	ScScrollableDiv
} from '../../components/StyledComponents/genericElements';
import { ScSelect } from '../../components/StyledComponents/formElements';
import { CONSTANTS } from '../../constants/constants';
import { useHistory, useRouteMatch } from 'react-router-dom';
import OpportunityListingScreen from '../OpportunityListingScreen/OpportunityListingScreen';
import PlottingAttributeSelector from '../../components/PlottingAttributeSelector/PlottingAttributeSelector';
import styled from 'styled-components';
import { faDownload } from '@fortawesome/pro-solid-svg-icons';
import { addFavouriteOpportunityApi } from '../../api/opportunityListingApi';
import HeldAwayInvestment from '../../components/HeldAwayInvestement/HeldAwayInvestment';
import HeldAwayInvestmentData from '../../components/HeldAwayInvestement/HeldAwayInvestmentData';
import { AvatarSize } from '../../constants/AvatarSize';
import AvatarLogo from '../../components/Avatar/AvatarLogo';
const { Option } = Select;
const { TabPane } = Tabs;

const RenderOpportunityAmountStats = ({ opporCount, amount, text }) => {
	return (
		<div className='oppor-amount-stats-container'>
			<div className='stats'>
				<div className='opportunity-count'>{opporCount}</div>
				&nbsp;<span>/</span>&nbsp;
				<div className='target-amount'>{amount && currencyFormatter(amount, 'en-US')}</div>
			</div>
			<div className='text'>{text}</div>
		</div>
	);
};
// const RenderOpportunityListModal = ({ visible, tableData }) => {
//   const miniComponentData = {
//     tableData: tableData,
//   };
//   return (
//     <ScModal visible={visible} width="80vw" height="75vh">
//       <OpportunityListingScreen
//         miniComponentData={miniComponentData}
//         miniMode={true}
//       />
//     </ScModal>
//   );
// };
const OpporOverviewDetailsModal = ({ visible, onClose, title, getData, data, mode }) => {
	const miniComponentData = {
		getData: getData,
		tableData: data ? (mode === 'chart' ? data.opportunity : data) : []
	};
	const TopBand = ({ data }) => {
		const TopBandContainer = styled(Row)`
			background: #f0f2fb;
			width: 100%;
			height: 100px;
			border-radius: 8px;
			margin: ${(props) => props.margin || '0px'};
		`;
		const TopBandCol = styled(Col)`
			height: 100%;
			top: 50%;
			transform: translateY(-35%);
		`;
		const Metrics = styled(Row)`
			font-family: Open Sans;
			font-weight: 600;
			font-size: ${(props) => props.fontSize || '28px'};
			line-height: 49px;
			text-align: center;
			color: ${(props) => props.color || '#222747'};
			transform: ${(props) => props.transform};
		`;
		const Text = styled(Row)`
			/* width: 100%; */
			position: ${(props) => props.position};
			left: ${(props) => props.left};
			transform: ${(props) => props.transform};
			font-family: Open Sans;
			font-size: ${(props) => props.fontSize || '18px'};
			line-height: 20px;
			color: #696a91;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: unset;
		`;
		const TopBandElement = ({ data, mode, position }) => (
			<TopBandContainer
				// margin={position === "left" ? "0 10px 0 0" : " 0 0 0 10px"}
				align='middle'
				justify='space-around'
			>
				<TopBandCol span={8}>
					{/* <div> */}
					<Metrics justify='center'>
						{data &&
							(mode === 'count' ? data.totaloppor : currencyFormatter(data.targetAmount, 'US'))}
					</Metrics>
					<Text position='absolute' transform='translateX(-50%)' left='50%'>
						{mode === 'count' ? 'Count' : 'Value'}
					</Text>
					{/* </div> */}
				</TopBandCol>
				<TopBandCol span={8}>
					<Row align='middle' justify='space-between' style={{ width: '100%' }}>
						<Col span={12}>
							<Metrics
								fontSize='110%'
								transform='scale(1, 1.5);'
								color={() => {
									let returnColor = '#222747';
									switch (title) {
										case 'Recent Contribution':
											mode === 'count'
												? data.topBandOpporCount > 0
													? (returnColor = '#56B8BE')
													: (returnColor = '#BE5C56')
												: data.topBandTargetamountPer > 0
												? (returnColor = '#56B8BE')
												: (returnColor = '#BE5C56');
											break;
										case 'Large Withdrawal':
											mode === 'count'
												? data.topBandOpporCount > 0
													? (returnColor = '#BE5C56')
													: (returnColor = '#56B8BE')
												: data.topBandTargetamountPer > 0
												? (returnColor = '#BE5C56')
												: (returnColor = '#56B8BE');
											break;
										case 'Outperformers':
											mode === 'count'
												? data.topBandOpporCount > 0
													? (returnColor = '#56B8BE')
													: (returnColor = '#BE5C56')
												: data.topBandTargetamountPer > 0
												? (returnColor = '#56B8BE')
												: (returnColor = '#BE5C56');
											break;
										case 'Underperformers':
											mode === 'count'
												? data.topBandOpporCount > 0
													? (returnColor = '#56B8BE')
													: (returnColor = '#BE5C56')
												: data.topBandTargetamountPer > 0
												? (returnColor = '#56B8BE')
												: (returnColor = '#BE5C56');
											break;
										case 'Dormant':
											mode === 'count'
												? data.topBandOpporCount > 0
													? (returnColor = '#BE5C56')
													: (returnColor = '#56B8BE')
												: data.topBandTargetamountPer > 0
												? (returnColor = '#BE5C56')
												: (returnColor = '#56B8BE');
											break;
										default:
											break;
									}
									return returnColor;
								}}
							>
								{`${
									mode === 'count'
										? data.topBandOpporCount > 0
											? `+${
													data.topBandOpporCount % 1 !== 0
														? data.topBandOpporCount.toFixed(2)
														: data.topBandOpporCount
											  }`
											: `${
													data.topBandOpporCount % 1 !== 0
														? data.topBandOpporCount.toFixed(2)
														: data.topBandOpporCount
											  }`
										: data.topBandTargetamountPer !== null
										? data.topBandTargetamountPer > 0
											? `+${
													data.topBandTargetamountPer % 1 !== 0
														? data.topBandTargetamountPer.toFixed(2)
														: data.topBandTargetamountPer
											  }`
											: `${
													data.topBandTargetamountPer % 1 !== 0
														? data.topBandTargetamountPer.toFixed(2)
														: data.topBandTargetamountPer
											  }`
										: ''
								}`}
								{mode === 'count'
									? data.topBandOpporCount && data.topBandOpporCount !== null
										? '%'
										: null
									: data.topBandTargetamountPer && data.topBandTargetamountPer !== null
									? '%'
									: null}
							</Metrics>
						</Col>
						<Col span={12}>
							<Text fontSize='14px'>Since</Text>
							<Text fontSize='14px'>{data.month}</Text>
						</Col>
					</Row>
					<Text>Performance</Text>
				</TopBandCol>
			</TopBandContainer>
		);
		return (
			<ScRow align='middle' justify='space-between' margin='0 0 24px 0'>
				<Col span={11}>
					<TopBandElement data={data} mode='count' position='left' />
				</Col>
				<Col span={11}>
					<TopBandElement data={data} mode='value' position='right' />
				</Col>
			</ScRow>
		);
	};
	const downloadRecords = () => {
		const downloadData =
			miniComponentData &&
			miniComponentData.tableData &&
			miniComponentData.tableData.length > 0 &&
			miniComponentData.tableData.map((opp, index) => ({
				'Sr.No': index + 1,
				Opportunity: opp.opportunityName,
				Currency: opp.currencySymbol,
				Target: opp.targetAmount,
				'Due Date': moment(opp.dueDate).format('DD-MMM-YYYY'),
				Stage: opp.stage,
				'Client/Prospect Name': opp.clientProspectName,
				Type: opp.refType === 'PROSPECTADD' ? 'Prospect' : 'Client'
			}));

		exportJSON(downloadData, title);
	};
	return (
		<ScModal
			visible={visible}
			onCancel={onClose}
			title={title}
			footer={null}
			width='70vw'
			// height="75vh"
			borderRadius='16px'
			centered
		>
			{mode === 'chart' && <TopBand data={data} />}
			<ScScrollableDiv
				height={mode === 'chart' ? '364px' : '90%'}
				maxHeight='500px'
				margin='0 0 48px 0'
			>
				{miniComponentData.tableData &&
				Array.isArray(miniComponentData.tableData) &&
				miniComponentData.tableData.length > 0 ? (
					<OpportunityListingScreen miniComponentData={miniComponentData} miniMode={true} />
				) : (
					'No Record Found'
				)}
			</ScScrollableDiv>

			<ScButtonText
				type='text'
				margin='18px 0 0 auto'
				padding='4px 15px'
				position='absolute'
				bottom='20px'
				right='0px'
				left='auto'
				color='#354081'
				onClick={() => {
					downloadRecords();
				}}
			>
				<FontAwesomeIcon icon={faDownload} />
				&nbsp;&nbsp;Download report
			</ScButtonText>
		</ScModal>
	);
};
const CustomerOverviewScreen = () => {
	const { path } = useRouteMatch();
	const history = useHistory();

	/* Held Away Investment Drop Down List */
	const RenderPlottingCategorySelector = ({ options, plottingCategory, setPlottingCategory }) => {
		return (
			<ScSelect
				className='plotting-category-select'
				value={plottingCategory}
				onSelect={(e) => {
					setPlottingCategory(e);
				}}
			>
				{options.map((option) => (
					<Option value={option.value}>{option.label}</Option>
				))}
			</ScSelect>
		);
	};
	const RenderRecentTrendCard = () => {
		const [loading, setLoading] = useState(true);
		const [conStrikeRateData, setConStrikeRateData] = useState();
		let conStrikeRatePlottingData;
		let conRateGraphConfig;
		let conMissGraphConfig;
		useEffect(() => {
			getConStrikeRateApi().then((res) => {
				setConStrikeRateData(res.data);
				setLoading(false);
			});
		}, []);
		const RenderTooltip = (data) => {
			const TooltipWrapper = styled.div`
				min-width: 156px;
				padding: 5px;
			`;
			const TooltipAttribute = styled(Row)`
				margin: 6px 0;
			`;
			const ValueAttr = () => (
				<TooltipAttribute align='top' justify='space-between'>
					<Col span={9}>
						<span>
							<Row justify='space-between' align='middle' style={{ width: '100%' }}>
								<div>Value</div>
								<div>:</div>
							</Row>
						</span>
					</Col>
					<Col span={14}>
						<strong>{data && currencyFormatter(data.value, 'US')}</strong>
					</Col>
				</TooltipAttribute>
			);
			const DateAttr = () => {
				let date;
				if (
					conStrikeRateData &&
					conStrikeRateData.graphData &&
					Array.isArray(conStrikeRateData.graphData) &&
					conStrikeRateData.graphData.length > 0 &&
					conStrikeRateData.graphData.filter((item, index) => index.toString() === data.title)[0]
				) {
					date = moment(
						conStrikeRateData.graphData.filter((item, index) => index.toString() === data.title)[0]
							.date
					).format('Do MMM YY');
				}
				return (
					<TooltipAttribute align='top' justify='space-between'>
						<Col span={9}>
							<span>
								<Row justify='space-between' align='middle' style={{ width: '100%' }}>
									<div>Due Date</div>
									<div>:</div>
								</Row>
							</span>
						</Col>
						<Col span={14}>
							<strong>{date}</strong>
						</Col>
					</TooltipAttribute>
				);
			};
			return (
				<TooltipWrapper>
					<ValueAttr />
					<DateAttr />
				</TooltipWrapper>
			);
		};
		if (conStrikeRateData && conStrikeRateData !== null) {
			// conStrikeRateData.graphData =
			//   conStrikeRateData.graphData !== null &&
			//   conStrikeRateData.graphData.sort((a, b) => {
			//     return new Date(a.date) - new Date(b.date);
			//   });
			conStrikeRatePlottingData =
				conStrikeRateData.graphData &&
				conStrikeRateData.graphData.map((item) => {
					return item.investamount;
				});
			if (conStrikeRatePlottingData) {
				conRateGraphConfig = {
					width: 300,
					height: 72,
					data: conStrikeRatePlottingData,
					lineStyle: { stroke: '#354081' },
					smooth: true,
					// areaStyle: function areaStyle() {
					//   return { fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff" };
					// },
					// xField: "month",
					// yField: "investamount",
					// xAxis: { tickCount: 5 },
					tooltip: {
						customContent: (title, data) => {
							return data && Array.isArray(data) && data.length > 0 ? RenderTooltip(data[0]) : null;
						}
					}
					// point: {
					//   // color: "black",
					//   size: 1,
					//   interactions: [{ type: "element-active" }],
					//   state: {
					//     //active
					//     active: {
					//       style: {
					//         fill: "#354081",
					//       },
					//     },
					//   },
					// },
				};
			}
			conStrikeRateData['bulletMeasureField'] = [
				conStrikeRateData.totalHitper,
				conStrikeRateData.totalMissper
			];
			conStrikeRateData['bulletRangeField'] = [0, 50, 100];
			conStrikeRateData['bulletTargetField'] = 0;
			conMissGraphConfig = {
				height: 16,
				data: [conStrikeRateData],
				measureField: 'bulletMeasureField',
				rangeField: 'bulletRangeField',
				targetField: 'bulletTargetField',
				// xField: 'title',
				color: {
					range: ['#ffffff', '#ffffff', '#ffffff'],
					measure: ['#56B8BE', '#792B80']
				},
				label: {
					measure: {
						position: 'middle',
						style: {
							fill: '#fff'
						},
						formatter: (val) => {
							return val.bulletMeasureField ? val.bulletMeasureField + ' %' : null;
						}
					}
				},
				xAxis: {
					line: null,
					label: null
				},

				yAxis: false,
				tooltip: {
					showMarkers: false,
					showContent: false
					// shared: true,
				}
			};
		}
		const RenderAssetManagement = () => (
			<div className='conversion-won'>
				<div className='won-amount'>{currencyFormatter(conStrikeRateData.wonAmount, 'en-US')}</div>
				<div className='title'>Asset Under Management</div>
				<div className='graph-section'>
					{conRateGraphConfig && <TinyArea {...conRateGraphConfig} />}
				</div>
				<div className='subtitle'>
					You manage $75,000 average per customer
					{/* You missed&nbsp;
          {conStrikeRateData &&
            conStrikeRateData.subheadingWon &&
            conStrikeRateData.subheadingWon.toFixed(2)}{" "}
          to get 1 business */}
				</div>
			</div>
		);
		const RenderMovedUp = () => {
			const [movedUpData, setMovedUpData] = useState();
			const [showDetailModal, setShowDetailModal] = useState(false);
			const toggleDetailsModal = () => {
				setShowDetailModal(!showDetailModal);
			};
			const getMovedUpData = () => {
				getMovedUpApi().then((res) => {
					setMovedUpData(res.data);
				});
			};
			useEffect(() => {
				getMovedUpData();
			}, []);
			return movedUpData && movedUpData !== null ? (
				<>
					<OpporOverviewDetailsModal
						visible={showDetailModal}
						onClose={toggleDetailsModal}
						title='Recent Contribution'
						getData={getMovedUpData}
						data={movedUpData}
						mode='chart'
					/>
					<Row align='middle' justify='center' className='moved-up' onClick={toggleDetailsModal}>
						<Col span={6}>
							<div className='moved-up-icon'>
								<FontAwesomeIcon icon={faAngleDoubleUp} size='2x' color='#56B8BE' />
							</div>
						</Col>
						<Col span={16}>
							{movedUpData && movedUpData !== null && (
								<RenderOpportunityAmountStats
									opporCount={movedUpData.totaloppor}
									amount={movedUpData.targetAmount}
									text='Recent Contribution'
								/>
							)}
						</Col>
					</Row>
				</>
			) : (
				'No Data Found'
			);
		};
		const RenderMovedDown = () => {
			const [movedDownData, setMovedDownData] = useState();
			const [showDetailModal, setShowDetailModal] = useState(false);
			const toggleDetailsModal = () => {
				setShowDetailModal(!showDetailModal);
			};
			const getMovedDownData = () => {
				getMovedDownApi().then((res) => {
					setMovedDownData(res.data);
				});
			};
			useEffect(() => {
				getMovedDownData();
			}, []);
			return movedDownData && movedDownData !== null ? (
				<>
					<OpporOverviewDetailsModal
						visible={showDetailModal}
						onClose={toggleDetailsModal}
						title='Large Withdrawal'
						getData={getMovedDownData}
						data={movedDownData}
						mode='chart'
					/>
					<Row align='middle' justify='center' className='moved-down' onClick={toggleDetailsModal}>
						<Col span={6}>
							<div className='moved-down-icon'>
								<FontAwesomeIcon icon={faSignOut} size='2x' color='#BE5C56' />
							</div>
						</Col>
						<Col span={16}>
							{movedDownData && movedDownData !== null && (
								<RenderOpportunityAmountStats
									opporCount={movedDownData.totaloppor}
									amount={movedDownData.targetAmount}
									text='Large Withdrawal'
								/>
							)}
						</Col>
					</Row>
				</>
			) : (
				'No Data Found'
			);
		};
		const RenderRevenue = () => (
			<div className='conversion-won'>
				<div className='won-amount'>{currencyFormatter(conStrikeRateData.wonAmount, 'en-US')}</div>
				<div className='title'>Revenue</div>
				<div className='graph-section'>
					{conRateGraphConfig && <TinyArea {...conRateGraphConfig} />}
				</div>
				<div className='subtitle'>
					You earn $12,000 average per customer
					{/* You missed&nbsp;
          {conStrikeRateData &&
            conStrikeRateData.subheadingWon &&
            conStrikeRateData.subheadingWon.toFixed(2)}{" "}
          to get 1 business */}
				</div>
			</div>
			//   <div className="conversion-missed">
			//     <div className="miss-amount">
			//       {currencyFormatter(conStrikeRateData.missAmount, "en-US")}
			//     </div>
			//     <div className="title">Revenue</div>
			//     <div className="thumbs">
			//       <div className="thumbs-up">
			//         <FontAwesomeIcon
			//           className="icon"
			//           icon={faThumbsUp}
			//           size="2x"
			//           color="#56B8BE"
			//         />
			//         <div className="hit-stats">
			//           <div>{conStrikeRateData.totalHit}</div>
			//           <span>Hits</span>
			//         </div>
			//       </div>
			//       <div className="thumbs-down">
			//         <FontAwesomeIcon
			//           className="icon"
			//           icon={faThumbsDown}
			//           size="2x"
			//           color="#792B80"
			//         />
			//         <div className="miss-stats">
			//           <div>{conStrikeRateData.totalMiss}</div>
			//           <span>Miss</span>
			//         </div>
			//       </div>
			//     </div>
			//     <div>{conMissGraphConfig && <Bullet {...conMissGraphConfig} />}</div>
			//     <div className="subtitle">
			//       You missed&nbsp;
			//       {conStrikeRateData &&
			//         conStrikeRateData.subheadingMiss &&
			//         conStrikeRateData.subheadingMiss.toFixed(2)}{" "}
			//       opportunities to get one
			//     </div>
			//   </div>
		);
		return (
			<Card title={<div>Recent Trends</div>} className='csr-card' loading={loading}>
				{conStrikeRateData && conStrikeRateData !== null && (
					<Row align='middle' justify='space-between' className='csr-section'>
						<Col span={7} style={{ height: '100%' }}>
							<RenderAssetManagement />
						</Col>
						<Col span={9}>
							<Row align='middle' justify='center' className='conversion-stats'>
								<Row align='middle' justify='center' style={{ width: '100%' }}>
									<RenderMovedUp />
								</Row>
								<Row align='middle' justify='center' style={{ width: '100%' }}>
									<RenderMovedDown />
								</Row>
							</Row>
						</Col>
						<Col span={8}>
							<RenderRevenue />
						</Col>
					</Row>
				)}
			</Card>
		);
	};

	const RenderCustomerPortfolioCard = () => {
		const [loading, setLoading] = useState(true);
		const [expectedConData, setExpectedConData] = useState();
		const [currPipelineData, setCurrPipelineData] = useState();
		let expectedConPlottingData;
		let expectedConGraphConfig;
		const RenderTooltip = (data) => {
			const TooltipWrapper = styled.div`
				min-width: 156px;
				padding: 5px;
			`;
			const TooltipAttribute = styled(Row)`
				margin: 6px 0;
			`;
			const ValueAttr = () => (
				<TooltipAttribute align='top' justify='space-between'>
					<Col span={9}>
						<span>
							<Row justify='space-between' align='middle' style={{ width: '100%' }}>
								<div>Value</div>
								<div>:</div>
							</Row>
						</span>
					</Col>
					<Col span={14}>
						<strong>{data && currencyFormatter(data.value, 'US')}</strong>
					</Col>
				</TooltipAttribute>
			);
			const DateAttr = () => {
				let month;
				if (
					expectedConData &&
					Array.isArray(expectedConData) &&
					expectedConData.length > 0
					// expectedConData.filter(
					//   (item) => item.targetAmount.toString() === data.value
					// )[0]
				) {
					month = moment(
						expectedConData.filter((item, index) => index.toString() === data.title)[0].dueDate
					).format('Do MMM YY');
				}
				return (
					<TooltipAttribute align='top' justify='space-between'>
						<Col span={9}>
							<span>
								<Row justify='space-between' align='middle' style={{ width: '100%' }}>
									<div>Due Date</div>
									<div>:</div>
								</Row>
							</span>
						</Col>
						<Col span={14}>
							<strong>{month}</strong>
						</Col>
					</TooltipAttribute>
				);
			};
			return (
				<TooltipWrapper>
					<ValueAttr />
					<DateAttr />
				</TooltipWrapper>
			);
		};

		useEffect(() => {
			axios
				.all([getExpectedConApi(), getCurrPipelineApi()])
				.then(
					axios.spread((...responses) => {
						setExpectedConData(
							responses[0].data.sort((a, b) => {
								return new Date(a.dueDate) - new Date(b.dueDate);
							})
						);
						setCurrPipelineData(responses[1].data);
						// use/access the results
					})
				)
				.catch((errors) => {
					// react on errors.
				})
				.finally(() => {
					setLoading(false);
				});
		}, []);

		if (expectedConData && expectedConData !== null && Array.isArray(expectedConData)) {
			expectedConPlottingData = expectedConData.map(
				(item) => item !== null && item.targetAmount !== null && item.targetAmount
			);
			expectedConGraphConfig = {
				width: '100%',
				height: 72,
				data: expectedConPlottingData,
				smooth: true,
				// areaStyle: function areaStyle() {
				//   return { fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff" };
				// },
				// xField: "month",
				// yField: "investamount",
				// xAxis: { tickCount: 5 },
				tooltip: {
					customContent: (title, data) => {
						return data && Array.isArray(data) && data.length > 0 ? RenderTooltip(data[0]) : null;
					}
				}
			};
		}

		const [dueNowData, setDueNowData] = useState();
		const [showDetailModal, setShowDetailModal] = useState(false);
		const getData = () => {
			getDueNowApi().then((res) => {
				setDueNowData(res.data);
			});
		};
		useEffect(() => {
			getData();
		}, []);
		let dueNowPlottingData;
		if (dueNowData) {
			dueNowPlottingData =
				dueNowData.graphData &&
				dueNowData.graphData !== null &&
				Array.isArray(dueNowData.graphData) &&
				dueNowData.graphData.map((item) => item.opporCount);
		}

		const [missedDueDateData, setMissedDueDateData] = useState();

		const getData2 = () => {
			getMissedDuedateApi().then((res) => {
				setMissedDueDateData(res.data);
			});
		};
		useEffect(() => {
			getData2();
		}, []);

		const missedDueDatePlottingData =
			missedDueDateData &&
			missedDueDateData.graphData &&
			missedDueDateData.graphData.map((item) => item.opporCount);

		return (
			<Card title={<div>Customer Portfolio</div>} className='ec-graph-card' loading={loading}>
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'space-between'
					}}
				>
					<span>
						<p style={{ fontSize: '20px', fontWeight: 'bold', color: '#5564C1' }}>20</p>
						<div className='title'>Managed</div>
					</span>
					<span style={{ width: '80%', textAlign: 'center' }}>
						{dueNowData ? (
							<Col>
								<GenericTinyColumnChart
									graphData={dueNowData.graphData}
									plottingData={dueNowPlottingData}
								/>
							</Col>
						) : (
							'No Data Found'
						)}
					</span>
				</div>
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'space-between',
						marginTop: '30px'
					}}
				>
					<span>
						<p style={{ fontSize: '20px', fontWeight: 'bold', color: '#BE5C56' }}>48</p>
						<div className='title'>Lost</div>
					</span>
					<span style={{ width: '80%', textAlign: 'center' }}>
						{missedDueDateData ? (
							<Col>
								<GenericTinyColumnChart
									graphData={missedDueDateData.graphData}
									plottingData={missedDueDatePlottingData}
									lostData='lostData'
								/>
							</Col>
						) : (
							'No Data Found'
						)}
					</span>
				</div>
			</Card>
		);
	};

	const RenderDueNowCardSection = () => {
		const [dueNowData, setDueNowData] = useState();
		const [showDetailModal, setShowDetailModal] = useState(false);
		const getData = () => {
			getDueNowApi().then((res) => {
				setDueNowData(res.data);
			});
		};
		useEffect(() => {
			getData();
		}, []);
		let dueNowPlottingData;
		const toggleDetailsModal = () => {
			setShowDetailModal(!showDetailModal);
		};
		if (dueNowData) {
			dueNowPlottingData =
				dueNowData.graphData &&
				dueNowData.graphData !== null &&
				Array.isArray(dueNowData.graphData) &&
				dueNowData.graphData.map((item) => item.opporCount);
		}
		if (!dueNowData || dueNowData === null) return <>No Data Found</>;
		return (
			<>
				<OpporOverviewDetailsModal
					visible={showDetailModal}
					onClose={toggleDetailsModal}
					title='Outperformers'
					getData={getData}
					data={dueNowData}
					mode='chart'
				/>
				{dueNowData ? (
					<Row align='middle' justify='space-around' className='card-section'>
						<Row
							align='middle'
							onClick={() => {
								toggleDetailsModal();
							}}
						>
							<Col className='logo eaecf8'>
								<FontAwesomeIcon icon={faAngleDoubleUp} size='2x' color='#354081' />
							</Col>
							<Col>
								<RenderOpportunityAmountStats
									opporCount={dueNowData.totaloppor}
									amount={dueNowData.targetAmount}
									text='Outperformers'
								/>
							</Col>
						</Row>
						<Col>
							<GenericTinyColumnChart
								graphData={dueNowData.graphData}
								plottingData={dueNowPlottingData}
							/>
						</Col>
					</Row>
				) : (
					'No Data Found'
				)}
			</>
		);
	};
	const RenderNearClosureCardSection = () => {
		const [nearClosureData, setNearClosureData] = useState();
		const [showDetailModal, setShowDetailModal] = useState(false);
		const getData = () => {
			getNearClosureApi().then((res) => {
				setNearClosureData(res.data);
			});
		};
		useEffect(() => {
			getData();
		}, []);
		const toggleDetailsModal = () => {
			setShowDetailModal(!showDetailModal);
		};
		const nearClosurePlottingData =
			nearClosureData &&
			nearClosureData.graphData &&
			nearClosureData.graphData.map((item) => item.opporCount);
		if (!nearClosureData || nearClosureData === null) return <>No Data Found</>;
		return (
			<>
				<OpporOverviewDetailsModal
					visible={showDetailModal}
					onClose={toggleDetailsModal}
					title='Underperformers'
					getData={getData}
					data={nearClosureData}
					mode='chart'
				/>
				{nearClosureData ? (
					<Row className='card-section'>
						<Row
							align='middle'
							onClick={() => {
								toggleDetailsModal();
							}}
						>
							<Col className='logo e4fdff'>
								<FontAwesomeIcon icon={faAngleDoubleDown} size='2x' color='#BE5C56' />
							</Col>
							<Col>
								<RenderOpportunityAmountStats
									opporCount={nearClosureData.totaloppor}
									amount={nearClosureData.targetAmount}
									text='Underperformers'
								/>
							</Col>
						</Row>
						<Col>
							<GenericTinyColumnChart
								graphData={nearClosureData.graphData}
								plottingData={nearClosurePlottingData}
							/>
						</Col>
					</Row>
				) : (
					'No Data Found'
				)}
			</>
		);
	};
	const RenderMissedDuedateCardSection = () => {
		const [missedDueDateData, setMissedDueDateData] = useState();
		const [showDetailModal, setShowDetailModal] = useState(false);
		const getData = () => {
			getMissedDuedateApi().then((res) => {
				setMissedDueDateData(res.data);
			});
		};
		useEffect(() => {
			getData();
		}, []);
		const toggleDetailsModal = () => {
			setShowDetailModal(!showDetailModal);
		};
		const missedDueDatePlottingData =
			missedDueDateData &&
			missedDueDateData.graphData &&
			missedDueDateData.graphData.map((item) => item.opporCount);
		if (!missedDueDateData || missedDueDateData === null) return <>No Data Found</>;
		return (
			<>
				<OpporOverviewDetailsModal
					visible={showDetailModal}
					onClose={toggleDetailsModal}
					title='Dormant'
					getData={getData}
					data={missedDueDateData}
					mode='chart'
				/>
				{missedDueDateData ? (
					<Row className='card-section'>
						<Row
							align='middle'
							onClick={() => {
								toggleDetailsModal();
							}}
						>
							<Col className='logo eaecf8'>
								<FontAwesomeIcon icon={faMinusCircle} size='2x' color='#354081' />
							</Col>
							<Col>
								<RenderOpportunityAmountStats
									opporCount={missedDueDateData.totaloppor}
									amount={missedDueDateData.targetAmount}
									text='Dormant'
								/>
							</Col>
						</Row>{' '}
						<Col>
							<GenericTinyColumnChart
								graphData={missedDueDateData.graphData}
								plottingData={missedDueDatePlottingData}
							/>
						</Col>
					</Row>
				) : (
					'No Data Found'
				)}
			</>
		);
	};
	const RenderDistributionCard = () => {
		const [distributionData, setDistributionData] = useState();
		const [plottingCategory, setPlottingCategory] = useState('opporstagedistribution');
		const [plottingField, setPlottingField] = useState('value');
		const [showModal, setShowModal] = useState(false);
		const toggleShowModal = () => {
			setShowModal(!showModal);
		};

		useEffect(() => {
			getOpporDistributionApi(plottingField === 'value' ? 'Value' : 'Count')
				.then((res) => {
					setDistributionData(res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}, [plottingField]);
		let config;
		const RenderTooltip = (data) => {
			const TooltipWrapper = styled.div`
				min-width: 82px;
				width: ${(props) => props.width};
				padding: 5px;
			`;
			const TooltipAttribute = styled(Row)`
				margin: 6px 0;
			`;
			const ValueAttr = () => {
				let name;
				switch (plottingCategory) {
					case 'opporstagedistribution':
						name = data.opportunityStage;
						break;
					case 'opporentitydistribution':
						name = data.entityType;
						break;
					case 'opportypedistribution':
						name = data.opportunityType;
						break;
					default:
						break;
				}
				return (
					<>
						<TooltipAttribute align='top' justify='space-between'>
							<Col span={18}>
								<span>
									<Row justify='space-between' align='middle' style={{ width: '100%' }}>
										<div>{name}</div>
										<div>:</div>
									</Row>
								</span>
							</Col>
							<Col span={5}>
								<strong>{data && data.value + '%'}</strong>
							</Col>
						</TooltipAttribute>
						{plottingField === 'value' && <Row>({currencyFormatter(data.targetAmount, 'US')})</Row>}
					</>
				);
			};
			const CountAttr = () => {
				let name;
				switch (plottingCategory) {
					case 'opporstagedistribution':
						name = data.opportunityStage;
						break;
					case 'opporentitydistribution':
						name = data.entityType;
						break;
					case 'opportypedistribution':
						name = data.opportunityType;
						break;
					default:
						break;
				}
				return (
					<>
						<TooltipAttribute align='top' justify='space-between'>
							<Col span={18}>
								<span>
									<Row justify='space-between' align='middle' style={{ width: '100%' }}>
										<div>{name}</div>
										<div>:</div>
									</Row>
								</span>
							</Col>
							<Col span={5}>
								<strong>{data.valuePercentage}</strong>
							</Col>
						</TooltipAttribute>
						<Row>({data.opporCount})</Row>
					</>
				);
			};
			return (
				<TooltipWrapper width='178px'>
					<strong>{data[0] && data[0].title}</strong>
					{plottingField === 'value' ? <ValueAttr /> : <CountAttr />}
				</TooltipWrapper>
			);
		};
		if (
			distributionData &&
			distributionData[plottingCategory] &&
			Array.isArray(distributionData[plottingCategory])
		) {
			config = {
				// width: 548,
				// height: 380,
				appendPadding: 10,
				data: [
					{
						type: 'Doctor',
						value: 27
					},
					{
						type: 'Baker',
						value: 25
					},
					{
						type: 'Lawyer',
						value: 23
					},
					{
						type: 'Others',
						value: 25
					}
				],
				angleField: 'value',
				colorField: 'type',
				color: ['#5564C1', '#56B8BE', '#792B80', '#898EA9'],
				radius: 1,
				innerRadius: 0.7,
				label: null,
				legend: {
					layout: 'horizontal',
					maxWidth: 400,
					maxheight: 400,
					position: 'bottom',
					flipPage: false,
					// itemHeight: 150,
					itemName: {
						style: {
							fontSize: 12
						}
					}
				},
				interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
				tooltip: {
					domStyles: {
						'g2-tooltip': {
							border: '1px solid #5d6dd1',
							boxSizing: 'border-box',
							boxShadow: '0px 4px 6px rgba(203, 214, 255, 0.25)',
							borderRadius: '16px'
						}
					},
					formatter: (data) => {
						return {
							name: data.opportunityStage,
							value: plottingField === 'value' ? data.value + '%' : data.opporCount
						};
					},
					customContent: (title, data) => {
						return data && Array.isArray(data) && data.length > 0
							? RenderTooltip(data[0].data)
							: null;
					}
				},
				statistic: null
			};
		}
		const RenderCardHeader = () => {
			const options = [
				{ value: 'opporstagedistribution', label: 'Stage' },
				{ value: 'opporentitydistribution', label: 'Entity' },
				{ value: 'opportypedistribution', label: 'Type' }
			];
			return (
				<Row align='middle' justify='space-between'>
					<Col
						span={10}
						onClick={() => {
							toggleShowModal();
						}}
					>
						<Row align='middle' justify='start'>
							<Col span={18}>Demographics</Col>
							{!showModal && (
								<Col span={1}>
									<FontAwesomeIcon icon={faExternalLink} />
								</Col>
							)}
						</Row>
					</Col>
					<Col span={13}>
						<Row align='middle' justify='end'>
							<RenderPlottingCategorySelector
								options={options}
								plottingCategory={plottingCategory}
								setPlottingCategory={setPlottingCategory}
							/>
						</Row>
					</Col>
				</Row>
			);
		};
		const CardContent = () => (
			<>
				<PlottingAttributeSelector
					plottingField={plottingField}
					setPlottingField={setPlottingField}
					valueBtnText='Value'
					countBtnText='Count'
					valueBtnMapping='value'
					countBtnMapping='opporCount'
				/>
				<div className='graph-section'>{distributionData && config && <Pie {...config} />}</div>
			</>
		);
		const RenderDistributionModal = () => (
			<ScModal
				title={<RenderCardHeader />}
				visible={showModal}
				onCancel={toggleShowModal}
				onOk={toggleShowModal}
				footer={null}
				width='50vw'
				borderRadius='16px'
				centered
			>
				<CardContent />
			</ScModal>
		);
		return (
			<>
				<RenderDistributionModal />
				<Card loading={!distributionData} className='dist-card' title={<RenderCardHeader />}>
					<CardContent />
				</Card>
			</>
		);
	};
	const RenderSalesPipelineCard = () => {
		const [distributionData, setDistributionData] = useState();
		const [plottingCategory, setPlottingCategory] = useState('opporstagedistribution');
		const [plottingField, setPlottingField] = useState('value');
		const [showModal, setShowModal] = useState(false);
		const toggleShowModal = () => {
			setShowModal(!showModal);
		};

		useEffect(() => {
			getOpporDistributionApi(plottingField === 'value' ? 'Value' : 'Count')
				.then((res) => {
					setDistributionData(res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}, [plottingField]);
		let config;
		const RenderTooltip = (data) => {
			const TooltipWrapper = styled.div`
				min-width: 82px;
				width: ${(props) => props.width};
				padding: 5px;
			`;
			const TooltipAttribute = styled(Row)`
				margin: 6px 0;
			`;
			const ValueAttr = () => {
				let name;
				switch (plottingCategory) {
					case 'opporstagedistribution':
						name = data.opportunityStage;
						break;
					case 'opporentitydistribution':
						name = data.entityType;
						break;
					case 'opportypedistribution':
						name = data.opportunityType;
						break;
					default:
						break;
				}
				return (
					<>
						<TooltipAttribute align='top' justify='space-between'>
							<Col span={18}>
								<span>
									<Row justify='space-between' align='middle' style={{ width: '100%' }}>
										<div>{name}</div>
										<div>:</div>
									</Row>
								</span>
							</Col>
							<Col span={5}>
								<strong>{data && data.value + '%'}</strong>
							</Col>
						</TooltipAttribute>
						{plottingField === 'value' && <Row>({currencyFormatter(data.targetAmount, 'US')})</Row>}
					</>
				);
			};
			const CountAttr = () => {
				let name;
				switch (plottingCategory) {
					case 'opporstagedistribution':
						name = data.opportunityStage;
						break;
					case 'opporentitydistribution':
						name = data.entityType;
						break;
					case 'opportypedistribution':
						name = data.opportunityType;
						break;
					default:
						break;
				}
				return (
					<>
						<TooltipAttribute align='top' justify='space-between'>
							<Col span={18}>
								<span>
									<Row justify='space-between' align='middle' style={{ width: '100%' }}>
										<div>{name}</div>
										<div>:</div>
									</Row>
								</span>
							</Col>
							<Col span={5}>
								<strong>{data.valuePercentage}</strong>
							</Col>
						</TooltipAttribute>
						<Row>({data.opporCount})</Row>
					</>
				);
			};
			return (
				<TooltipWrapper width='178px'>
					<strong>{data[0] && data[0].title}</strong>
					{plottingField === 'value' ? <ValueAttr /> : <CountAttr />}
				</TooltipWrapper>
			);
		};
		if (
			distributionData &&
			distributionData[plottingCategory] &&
			Array.isArray(distributionData[plottingCategory])
		) {
			config = {
				// width: 548,
				// height: 380,
				appendPadding: 10,
				data: [
					{
						type: 'Risk Averse',
						value: 27
					},
					{
						type: 'Conservative',
						value: 25
					},
					{
						type: 'Moderate',
						value: 23
					},
					{
						type: 'Aggressive',
						value: 25
					}
				],
				angleField: 'value',
				colorField: 'type',
				color: ['#5564C1', '#56B8BE', '#792B80', '#898EA9'],
				radius: 1,
				innerRadius: 0.7,
				label: null,
				legend: {
					layout: 'horizontal',
					maxWidth: 400,
					maxheight: 400,
					position: 'bottom',
					flipPage: false,
					// itemHeight: 150,
					itemName: {
						style: {
							fontSize: 12
						}
					}
				},
				interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
				tooltip: {
					domStyles: {
						'g2-tooltip': {
							border: '1px solid #5d6dd1',
							boxSizing: 'border-box',
							boxShadow: '0px 4px 6px rgba(203, 214, 255, 0.25)',
							borderRadius: '16px'
						}
					},
					formatter: (data) => {
						return {
							name: data.opportunityStage,
							value: plottingField === 'value' ? data.value + '%' : data.opporCount
						};
					},
					customContent: (title, data) => {
						return data && Array.isArray(data) && data.length > 0
							? RenderTooltip(data[0].data)
							: null;
					}
				},
				statistic: null
			};
		}
		const RenderCardHeader = () => {
			const options = [
				{ value: 'opporstagedistribution', label: 'Stage' },
				{ value: 'opporentitydistribution', label: 'Entity' },
				{ value: 'opportypedistribution', label: 'Type' }
			];
			return (
				<Row align='middle' justify='space-between'>
					<Col
						span={10}
						onClick={() => {
							toggleShowModal();
						}}
					>
						<Row align='middle' justify='start'>
							<Col span={18}>Risk Distribution</Col>
							{!showModal && (
								<Col span={1}>
									<FontAwesomeIcon icon={faExternalLink} />
								</Col>
							)}
						</Row>
					</Col>
					<Col span={13}>
						<Row align='middle' justify='end'>
							<RenderPlottingCategorySelector
								options={options}
								plottingCategory={plottingCategory}
								setPlottingCategory={setPlottingCategory}
							/>
						</Row>
					</Col>
				</Row>
			);
		};
		const CardContent = () => (
			<>
				<PlottingAttributeSelector
					plottingField={plottingField}
					setPlottingField={setPlottingField}
					valueBtnText='Value'
					countBtnText='Count'
					valueBtnMapping='value'
					countBtnMapping='opporCount'
				/>
				<div className='graph-section'>{distributionData && config && <Pie {...config} />}</div>
			</>
		);
		const RenderDistributionModal = () => (
			<ScModal
				title={<RenderCardHeader />}
				visible={showModal}
				onCancel={toggleShowModal}
				onOk={toggleShowModal}
				footer={null}
				width='50vw'
				borderRadius='16px'
				centered
			>
				<CardContent />
			</ScModal>
		);
		return (
			<>
				<RenderDistributionModal />
				<Card loading={!distributionData} className='dist-card' title={<RenderCardHeader />}>
					<CardContent />
				</Card>
			</>
		);
	};
	const RenderOpporBreakupCard = () => {
		const [showModal, setShowModal] = useState(false);
		const [obData, setObData] = useState();
		const [loading, setLoading] = useState(true);
		const [plottingCategory, setPlottingCategory] = useState('opporstagebreakup');
		const [plottingField, setPlottingField] = useState('targetAmount');
		let config;
		useEffect(() => {
			getOpporBreakupApi(plottingField === 'targetAmount' ? 'Value' : 'Count').then((res) => {
				setObData(res.data);
				setLoading(false);
			});
		}, [plottingField]);
		const RenderTooltip = (data) => {
			const TooltipWrapper = styled.div`
				min-width: 210px;
				padding: 5px;
			`;
			const TooltipAttribute = styled(Row)`
				margin: 6px 0;
			`;
			const ValueAttr = () => (
				<>
					{data.map((item) => (
						<TooltipAttribute align='top' justify='space-between'>
							<Col span={10}>
								<span>
									<Row justify='space-between' align='middle' style={{ width: '100%' }}>
										<div>{item.name}</div>
										<div>:</div>
									</Row>
								</span>
							</Col>
							<Col span={13}>
								<strong>{item && currencyFormatter(item.value, 'US')}</strong>
							</Col>
						</TooltipAttribute>
					))}
				</>
			);
			const CountAttr = () => (
				<>
					{data.map((item) => (
						<TooltipAttribute align='top' justify='space-between'>
							<Col span={17}>
								<span>
									<Row justify='space-between' align='middle' style={{ width: '100%' }}>
										<div>{item.name}</div>
										<div>:</div>
									</Row>
								</span>
							</Col>
							<Col span={5}>
								<strong>{item.value}</strong>
							</Col>
						</TooltipAttribute>
					))}
				</>
			);
			return (
				<TooltipWrapper>
					<strong>{data[0] && data[0].title}</strong>
					{plottingField === 'targetAmount' ? <ValueAttr /> : <CountAttr />}
				</TooltipWrapper>
			);
		};
		if (obData && Array.isArray(obData[plottingCategory]) && obData[plottingCategory].length > 0) {
			config = {
				appendPadding: 30,
				data: obData[plottingCategory],
				isGroup: true,
				xField: plottingCategory === 'opporstagebreakup' ? 'opporStage' : 'opporType',
				yField: plottingField,
				seriesField: 'refType',
				color: ['#5564C1', '#56B8BE'],
				label: false,
				legend: {
					layout: 'horizontal',
					position: 'bottom'
				},
				tooltip: {
					// showTitle: false,
					// showMarkers: false,
					domStyles: {
						'g2-tooltip': {
							border: '1px solid #5d6dd1',
							boxSizing: 'border-box',
							boxShadow: '0px 4px 6px rgba(203, 214, 255, 0.25)',
							borderRadius: '16px'
						}
					},
					customContent: (title, data) => {
						return data ? RenderTooltip(data) : null;
					}
				}
			};
		}

		const toggleShowModal = () => {
			setShowModal(!showModal);
		};
		const RenderCardHeader = () => {
			const options = [
				{ value: 'opporstagebreakup', label: 'Stage' },
				{ value: 'opportypebreakup', label: 'Type' }
			];
			return (
				<Row align='middle' justify='space-between' style={{ width: '100%', padding: '0 12px' }}>
					<Col
						onClick={() => {
							toggleShowModal();
						}}
					>
						<Row align='middle' justify='space-between'>
							<Col span={22}>Opportunity Breakup</Col>
							{!showModal && (
								<Col span={1}>
									<FontAwesomeIcon icon={faExternalLink} />
								</Col>
							)}
						</Row>
					</Col>
					<Col>
						<RenderPlottingCategorySelector
							options={options}
							plottingCategory={plottingCategory}
							setPlottingCategory={setPlottingCategory}
						/>
					</Col>
				</Row>
			);
		};
		const CardContent = () => {
			return (
				<>
					<PlottingAttributeSelector
						plottingField={plottingField}
						setPlottingField={setPlottingField}
						valueBtnText='Value'
						countBtnText='Count'
						valueBtnMapping='targetAmount'
						countBtnMapping='opporCount'
					/>
					<div className='graph'>{config && <Column {...config} />}</div>
				</>
			);
		};
		const RenderOpporBreakupModal = () => (
			<ScModal
				title={<RenderCardHeader />}
				visible={showModal}
				onCancel={toggleShowModal}
				onOk={toggleShowModal}
				footer={null}
				width='70vw'
				borderRadius='16px'
				centered
			>
				{obData && <CardContent />}
			</ScModal>
		);
		return (
			<div>
				<RenderOpporBreakupModal />
				<Card title={<RenderCardHeader />} loading={loading || !config}>
					{obData && <CardContent />}
				</Card>
			</div>
		);
	};
	const RenderAgingAnalysisCard = () => {
		const [ageingAnalysisGraphData, setAgingAnalysisGraphData] = useState();
		const [showModal, setShowModal] = useState(false);
		useEffect(() => {
			getAgingAnalysisApi().then((res) => {
				setAgingAnalysisGraphData(res.data);
			});
		}, []);
		const toggleShowModal = () => {
			setShowModal(!showModal);
		};
		let config;
		const RenderTooltip = (data) => {
			const TooltipWrapper = styled.div`
				min-width: 272px;
				padding: 5px;
			`;
			const TooltipAttribute = styled(Row)`
				margin: 6px 0;
			`;
			const ProbabilityAttr = () => (
				<TooltipAttribute align='top' justify='space-between'>
					<Col span={13}>
						<span>
							<Row justify='space-between' align='middle' style={{ width: '100%' }}>
								<div>Probability</div>
								<div>:</div>
							</Row>
						</span>
					</Col>
					<Col span={10}>
						<strong>{data.probability}</strong>
					</Col>
				</TooltipAttribute>
			);
			const AgeAttr = () => (
				<TooltipAttribute align='top' justify='space-between'>
					<Col span={13}>
						<span>
							<Row justify='space-between' align='middle' style={{ width: '100%' }}>
								<div>Age</div>
								<div>:</div>
							</Row>
						</span>
					</Col>
					<Col span={10}>
						<strong>{data.agingDays} days</strong>
					</Col>
				</TooltipAttribute>
			);
			const OpportunityTypeAttr = () => (
				<TooltipAttribute align='top' justify='space-between'>
					<Col span={13}>
						<span>
							<Row justify='space-between' align='middle' style={{ width: '100%' }}>
								<div>Opportunity Type</div>
								<div>:</div>
							</Row>
						</span>
					</Col>
					<Col span={10}>
						<strong>{data.opportunityType}</strong>
					</Col>
				</TooltipAttribute>
			);
			const ValueAttr = () => (
				<TooltipAttribute align='top' justify='space-between'>
					<Col span={13}>
						<span>
							<Row justify='space-between' align='middle' style={{ width: '100%' }}>
								<div>Value</div>
								<div>:</div>
							</Row>
						</span>
					</Col>
					<Col span={10}>
						<strong>{currencyFormatter(data.targetAmount, 'US')}</strong>
					</Col>
				</TooltipAttribute>
			);
			const ClientProspectProfileAttr = () => (
				<TooltipAttribute align='top' justify='space-between'>
					<Col span={13}>
						<span>
							<Row justify='space-between' align='middle' style={{ width: '100%' }}>
								<div>Client / Prospect</div>
								<div>:</div>
							</Row>
						</span>
					</Col>
					<Col span={10}>
						<Row align='middle' justify='space-between' className='profile'>
							<Col span={6}>
								<AvatarLogo
									imgsrc={data.profileImage}
									profileName={data.profileInitial}
									avatarSize={AvatarSize.xs}
								/>
								{/* <Avatar
                  size={32}
                  className="avatar"
                  style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  icon={
                    data.profileImage ? (
                      <img src={`${data.profileImage}`} alt="img" />
                    ) : (
                      <div>{data.profileInitial}</div>
                    )
                  }
                /> */}
							</Col>
							<Col span={16} className='profile-details'>
								<strong>{data.clientProspectName}</strong>
								<div className='profile-tag'>
									{data.tagName.charAt(0).toUpperCase() + data.tagName.substring(1).toLowerCase()}
								</div>
							</Col>
						</Row>
					</Col>
				</TooltipAttribute>
			);
			return (
				<TooltipWrapper>
					<ProbabilityAttr />
					<AgeAttr />
					<OpportunityTypeAttr />
					<ValueAttr />
					<ClientProspectProfileAttr />
				</TooltipWrapper>
			);
		};

		config = {
			appendPadding: 30,
			data: [
				{
					'H/A': 'A',
					Team: 'Torino',
					'xG conceded': 0.62,
					'Shot conceded': 10,
					Result: 'Debt Fund'
				},
				{
					'H/A': 'H',
					Team: 'Atalanta',
					'xG conceded': 2.35,
					'Shot conceded': 23,
					Result: 'Mutual Fund'
				},
				{
					'H/A': 'A',
					Team: 'Milan',
					'xG conceded': 1.89,
					'Shot conceded': 26,
					Result: 'Stocks'
				},
				{
					'H/A': 'H',
					Team: 'Chievo',
					'xG conceded': 1.4,
					'Shot conceded': 13,
					Result: 'Mutual Fund'
				},
				{
					'H/A': 'A',
					Team: 'Bologna',
					'xG conceded': 1.02,
					'Shot conceded': 11,
					Result: 'Stocks'
				},
				{
					'H/A': 'H',
					Team: 'Frosinone',
					'xG conceded': 0.56,
					'Shot conceded': 11,
					Result: 'Debt Fund'
				},
				{
					'H/A': 'H',
					Team: 'Lazio',
					'xG conceded': 1.01,
					'Shot conceded': 16,
					Result: 'Debt Fund'
				},
				{
					'H/A': 'A',
					Team: 'Empoli',
					'xG conceded': 1.56,
					'Shot conceded': 20,
					Result: 'Debt Fund'
				},
				{
					'H/A': 'H',
					Team: 'Spal',
					'xG conceded': 1.8,
					'Shot conceded': 6,
					Result: 'Stocks'
				},
				{
					'H/A': 'A',
					Team: 'Napoli',
					'xG conceded': 2.49,
					'Shot conceded': 26,
					Result: 'Mutual Fund'
				},
				{
					'H/A': 'A',
					Team: 'Fiorentina',
					'xG conceded': 1.3,
					'Shot conceded': 14,
					Result: 'Mutual Fund'
				},
				{
					'H/A': 'H',
					Team: 'Sampdoria',
					'xG conceded': 1.2,
					'Shot conceded': 8,
					Result: 'Debt Fund'
				},
				{
					'H/A': 'A',
					Team: 'Udinese',
					'xG conceded': 1.22,
					'Shot conceded': 9,
					Result: 'Stocks'
				},
				{
					'H/A': 'H',
					Team: 'Inter',
					'xG conceded': 2.68,
					'Shot conceded': 17,
					Result: 'Mutual Fund'
				},
				{
					'H/A': 'A',
					Team: 'Cagliari',
					'xG conceded': 2.1,
					'Shot conceded': 16,
					Result: 'Mutual Fund'
				},
				{
					'H/A': 'H',
					Team: 'Genoa',
					'xG conceded': 1.84,
					'Shot conceded': 15,
					Result: 'Debt Fund'
				},
				{
					'H/A': 'A',
					Team: 'Juventus',
					'xG conceded': 2.12,
					'Shot conceded': 20,
					Result: 'Stocks'
				},
				{
					'H/A': 'H',
					Team: 'Sassuolo',
					'xG conceded': 0.72,
					'Shot conceded': 10,
					Result: 'Debt Fund'
				},
				{
					'H/A': 'A',
					Team: 'Parma',
					'xG conceded': 0.58,
					'Shot conceded': 6,
					Result: 'Debt Fund'
				},
				{
					'H/A': 'H',
					Team: 'Torino',
					'xG conceded': 1.87,
					'Shot conceded': 10,
					Result: 'Debt Fund'
				},
				{
					'H/A': 'A',
					Team: 'Atalanta',
					'xG conceded': 2.68,
					'Shot conceded': 23,
					Result: 'Mutual Fund'
				},
				{
					'H/A': 'H',
					Team: 'Milan',
					'xG conceded': 0.85,
					'Shot conceded': 8,
					Result: 'Mutual Fund'
				},
				{
					'H/A': 'A',
					Team: 'Chievo',
					'xG conceded': 0.84,
					'Shot conceded': 16,
					Result: 'Debt Fund'
				},
				{
					'H/A': 'H',
					Team: 'Bologna',
					'xG conceded': 2.69,
					'Shot conceded': 20,
					Result: 'Debt Fund'
				},
				{
					'H/A': 'A',
					Team: 'Frosinone',
					'xG conceded': 1.51,
					'Shot conceded': 11,
					Result: 'Debt Fund'
				},
				{
					'H/A': 'A',
					Team: 'Lazio',
					'xG conceded': 1.77,
					'Shot conceded': 13,
					Result: 'Stocks'
				},
				{
					'H/A': 'H',
					Team: 'Empoli',
					'xG conceded': 0.14,
					'Shot conceded': 5,
					Result: 'Debt Fund'
				},
				{
					'H/A': 'A',
					Team: 'Real Madrid',
					'xG conceded': 3.58,
					'Shot conceded': 30,
					Result: 'Stocks'
				},
				{
					'H/A': 'H',
					Team: 'Viktoria Plzen',
					'xG conceded': 0.33,
					'Shot conceded': 7,
					Result: 'Debt Fund'
				},
				{
					'H/A': 'H',
					Team: 'CSKA Moscow',
					'xG conceded': 0.73,
					'Shot conceded': 13,
					Result: 'Debt Fund'
				},
				{
					'H/A': 'A',
					Team: 'CSKA Moscow',
					'xG conceded': 1.1,
					'Shot conceded': 14,
					Result: 'Debt Fund'
				},
				{
					'H/A': 'H',
					Team: 'Real Madrid',
					'xG conceded': 1.87,
					'Shot conceded': 12,
					Result: 'Stocks'
				},
				{
					'H/A': 'A',
					Team: 'Viktoria Plzen',
					'xG conceded': 1.85,
					'Shot conceded': 13,
					Result: 'Stocks'
				},
				{
					'H/A': 'A',
					Team: 'Porto',
					'xG conceded': 3.71,
					'Shot conceded': 31,
					Result: 'Stocks'
				},
				{
					'H/A': 'H',
					Team: 'Porto',
					'xG conceded': 0.56,
					'Shot conceded': 7,
					Result: 'Debt Fund'
				}
			],
			xField: 'xG conceded',
			yField: 'Shot conceded',
			colorField: 'Result',
			color: ['#5564C1', '#56B8BE', '#792B80', '#898EA9'],
			size: 10,
			shape: 'circle',
			pointStyle: {
				fillOpacity: 1
			},
			yAxis: {
				nice: true,
				line: {
					style: {
						stroke: '#aaa'
					}
				}
			},
			xAxis: {
				grid: {
					line: {
						style: {
							stroke: '#eee'
						}
					}
				},
				line: {
					style: {
						stroke: '#aaa'
					}
				}
			}
		};
		const CardTitle = () => {
			return (
				<Row
					align='middle'
					justify='space-around'
					style={{ width: '25%', padding: '0 12px' }}
					onClick={() => {
						toggleShowModal();
					}}
				>
					<Col span={21}>Asset Allocation Anomaly</Col>
					{!showModal && (
						<Col span={2}>
							<FontAwesomeIcon icon={faExternalLink} />
						</Col>
					)}
				</Row>
			);
		};
		const RenderAgeingAnalysisModal = () => (
			<ScModal
				title={<CardTitle />}
				visible={showModal}
				onCancel={toggleShowModal}
				onOk={toggleShowModal}
				footer={null}
				width='70vw'
				borderRadius='16px'
				centered
			>
				{<Scatter {...config} />}
			</ScModal>
		);
		return (
			<div>
				<RenderAgeingAnalysisModal />
				<Card loading={!ageingAnalysisGraphData} title={<CardTitle />}>
					{ageingAnalysisGraphData && <Scatter {...config} />}
				</Card>
			</div>
		);
	};

	/* Business Trend Graph */
	const RenderBusinessTrendGraph = () => {
		const [showModal, setShowModal] = useState(false);
		const [conversionTrendData, setConversionTrendData] = useState();
		const [plottingCategory, setPlottingCategory] = useState('expected');
		const [plottingField, setPlottingField] = useState('value');
		const [loading, setLoading] = useState(true);
		useEffect(() => {
			setLoading(true);
			plottingCategory === 'expected' &&
				getConversionTrendApi()
					.then((res) => {
						setConversionTrendData(res.data);
					})
					.catch((err) => {
						console.log(err);
					})
					.finally(() => {
						setLoading(false);
					});
			plottingCategory === 'historic' &&
				getConStrikeRateApi()
					.then((res) => setConversionTrendData(res.data.graphData))
					.catch((err) => {
						console.log(err);
					})
					.finally(() => {
						setLoading(false);
					});
			setPlottingField('value');
		}, [plottingCategory]);
		let config;
		const toggleShowModal = () => {
			setShowModal(!showModal);
		};
		if (conversionTrendData && conversionTrendData.length > 0 && !loading) {
			const getYField = () => {
				if (plottingCategory === 'expected') {
					if (plottingField === 'value') return 'targetAmount';
					else return 'opporCount';
				} else {
					if (plottingField === 'value') return 'investamount';
					else return 'opporCount';
				}
			};
			const RenderTooltip = (data) => {
				const TooltipWrapper = styled.div`
					min-width: 148px;
					padding: 5px;
				`;
				const TooltipAttribute = styled(Row)`
					margin: 6px 0;
				`;
				const ValueAttr = () => (
					<TooltipAttribute align='top' justify='space-between'>
						<Col span={8}>
							<span>
								<Row justify='space-between' align='middle' style={{ width: '100%' }}>
									<div>Value</div>
									<div>:</div>
								</Row>
							</span>
						</Col>
						<Col span={14}>
							<strong>
								{currencyFormatter(
									plottingCategory === 'expected' ? data.targetAmount : data.investamount,
									'US'
								)}
							</strong>
						</Col>
					</TooltipAttribute>
				);
				const CountAttr = () => (
					<TooltipAttribute align='top' justify='space-between'>
						<Col span={8}>
							<span>
								<Row justify='space-between' align='middle' style={{ width: '100%' }}>
									<div>Count</div>
									<div>:</div>
								</Row>
							</span>
						</Col>
						<Col span={14}>
							<strong>{data.opporCount}</strong>
						</Col>
					</TooltipAttribute>
				);
				const DateAttr = () => (
					<TooltipAttribute align='top' justify='space-between'>
						<Col span={8}>
							<span>
								<Row justify='space-between' align='middle' style={{ width: '100%' }}>
									<div>Date</div>
									<div>:</div>
								</Row>
							</span>
						</Col>
						<Col span={14}>
							<strong>
								{moment(plottingCategory === 'expected' ? data.dueDate : data.date).format(
									'DD MMM YYYY'
								)}
							</strong>
						</Col>
					</TooltipAttribute>
				);
				return (
					<TooltipWrapper>
						{plottingField === 'value' ? <ValueAttr /> : <CountAttr />}
						<DateAttr />
					</TooltipWrapper>
				);
			};
			config = {
				appendPadding: 30,
				smooth: true,
				data: conversionTrendData,
				xField: plottingCategory === 'expected' ? 'dueDate' : 'date',
				yField: getYField(),
				point: {
					// color: "black",
					style: { fill: '#56B8BE' },
					interactions: [{ type: 'element-active' }],
					state: {
						// inactive
						default: {
							style: {
								fill: '#56B8BE'
							}
						},
						//active
						active: {
							style: {
								fill: '#56B8BE'
							}
						}
					}
				},
				color: 'transparent',
				lineStyle: { file: 'transparent', stroke: 'transparent' },
				xAxis: {
					// tickCount: 5,
					grid: { line: { style: { stroke: '#aaa', lineDash: [4, 4] } } },
					line: { style: { stroke: '#aaa', lineDash: [4, 4] } },
					label: {
						formatter: (text) => {
							return moment(text).format('MMM');
						}
					}
				},
				yAxis: {
					label: {
						grid: { line: { style: { stroke: '#56B8BE', lineDash: [4, 4] } } },
						line: { style: { stroke: '#56B8BE', lineDash: [4, 4] } },
						formatter: (val) => {
							return val ? (plottingField === 'value' ? '$ ' + kFormatter(val) : val) : null;
						}
					}
				},
				tooltip: {
					showTitle: false,
					// showMarkers: false,
					domStyles: {
						'g2-tooltip': {
							border: '1px solid #5d6dd1',
							boxSizing: 'border-box',
							boxShadow: '0px 4px 6px rgba(203, 214, 255, 0.25)',
							borderRadius: '16px'
						}
					},
					customContent: (title, data) => {
						return data[0] ? RenderTooltip(data[0].data) : null;
					}
				},
				areaStyle: function areaStyle() {
					return {
						fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff'
					};
				}
			};
		}
		const RenderCardHeader = () => {
			/* Will need to make changes later here */
			const options = [
				{ value: 'historic', label: 'AUM' },
				{ value: 'expected', label: 'NIA' }
			];
			return (
				<Row align='middle' justify='space-between' style={{ width: '100%', padding: '0 12px' }}>
					<Col
						onClick={() => {
							toggleShowModal();
						}}
					>
						<Row align='middle' justify='space-between'>
							<Col span={22}>Business Trend</Col>
							{!showModal && (
								<Col span={1}>
									<FontAwesomeIcon icon={faExternalLink} />
								</Col>
							)}
						</Row>
					</Col>
					<Col>
						<RenderPlottingCategorySelector
							options={options}
							plottingCategory={plottingCategory}
							setPlottingCategory={setPlottingCategory}
						/>
					</Col>
				</Row>
			);
		};
		const CardContent = () => <>{conversionTrendData && config && <Area {...config} />}</>;
		const RenderConversionTrendModal = () => (
			<ScModal
				title={<RenderCardHeader />}
				visible={showModal}
				onCancel={toggleShowModal}
				onOk={toggleShowModal}
				footer={null}
				width='70vw'
				padding='0 24px 72px'
				borderRadius='16px'
				centered
			>
				<CardContent />
			</ScModal>
		);
		return (
			<div>
				<RenderConversionTrendModal />
				<Card loading={loading} title={<RenderCardHeader />}>
					<CardContent />
				</Card>
			</div>
		);
	};
	/* Business Trend Graph End */

	const RenderConversionTrendCard = () => {
		const [showModal, setShowModal] = useState(false);
		const [conversionTrendData, setConversionTrendData] = useState();
		const [plottingCategory, setPlottingCategory] = useState('expected');
		const [plottingField, setPlottingField] = useState('value');
		const [loading, setLoading] = useState(true);
		useEffect(() => {
			setLoading(true);
			plottingCategory === 'expected' &&
				getConversionTrendApi()
					.then((res) => {
						setConversionTrendData(res.data);
					})
					.catch((err) => {
						console.log(err);
					})
					.finally(() => {
						setLoading(false);
					});
			plottingCategory === 'historic' &&
				getConStrikeRateApi()
					.then((res) => setConversionTrendData(res.data.graphData))
					.catch((err) => {
						console.log(err);
					})
					.finally(() => {
						setLoading(false);
					});
			setPlottingField('value');
		}, [plottingCategory]);
		let config;
		const toggleShowModal = () => {
			setShowModal(!showModal);
		};
		if (conversionTrendData && conversionTrendData.length > 0 && !loading) {
			const getYField = () => {
				if (plottingCategory === 'expected') {
					if (plottingField === 'value') return 'targetAmount';
					else return 'opporCount';
				} else {
					if (plottingField === 'value') return 'investamount';
					else return 'opporCount';
				}
			};
			const RenderTooltip = (data) => {
				const TooltipWrapper = styled.div`
					min-width: 148px;
					padding: 5px;
				`;
				const TooltipAttribute = styled(Row)`
					margin: 6px 0;
				`;
				const ValueAttr = () => (
					<TooltipAttribute align='top' justify='space-between'>
						<Col span={8}>
							<span>
								<Row justify='space-between' align='middle' style={{ width: '100%' }}>
									<div>Value</div>
									<div>:</div>
								</Row>
							</span>
						</Col>
						<Col span={14}>
							<strong>
								{currencyFormatter(
									plottingCategory === 'expected' ? data.targetAmount : data.investamount,
									'US'
								)}
							</strong>
						</Col>
					</TooltipAttribute>
				);
				const CountAttr = () => (
					<TooltipAttribute align='top' justify='space-between'>
						<Col span={8}>
							<span>
								<Row justify='space-between' align='middle' style={{ width: '100%' }}>
									<div>Count</div>
									<div>:</div>
								</Row>
							</span>
						</Col>
						<Col span={14}>
							<strong>{data.opporCount}</strong>
						</Col>
					</TooltipAttribute>
				);
				const DateAttr = () => (
					<TooltipAttribute align='top' justify='space-between'>
						<Col span={8}>
							<span>
								<Row justify='space-between' align='middle' style={{ width: '100%' }}>
									<div>Date</div>
									<div>:</div>
								</Row>
							</span>
						</Col>
						<Col span={14}>
							<strong>
								{moment(plottingCategory === 'expected' ? data.dueDate : data.date).format(
									'DD MMM YYYY'
								)}
							</strong>
						</Col>
					</TooltipAttribute>
				);
				return (
					<TooltipWrapper>
						{plottingField === 'value' ? <ValueAttr /> : <CountAttr />}
						<DateAttr />
					</TooltipWrapper>
				);
			};
			config = {
				appendPadding: 30,
				smooth: true,
				data: conversionTrendData,
				xField: plottingCategory === 'expected' ? 'dueDate' : 'date',
				yField: getYField(),
				point: {
					// color: "black",
					style: { fill: '#56B8BE' },
					interactions: [{ type: 'element-active' }],
					state: {
						// inactive
						default: {
							style: {
								fill: '#56B8BE'
							}
						},
						//active
						active: {
							style: {
								fill: '#56B8BE'
							}
						}
					}
				},
				color: '#56B8BE',
				lineStyle: { file: '#56B8BE', stroke: '#56B8BE' },
				xAxis: {
					// tickCount: 5,
					grid: { line: { style: { stroke: '#aaa', lineDash: [4, 4] } } },
					line: { style: { stroke: '#aaa', lineDash: [4, 4] } },
					label: {
						formatter: (text) => {
							return moment(text).format('Do MMM YY');
						}
					}
				},
				yAxis: {
					label: {
						grid: { line: { style: { stroke: '#56B8BE', lineDash: [4, 4] } } },
						line: { style: { stroke: '#56B8BE', lineDash: [4, 4] } },
						formatter: (val) => {
							return val ? (plottingField === 'value' ? '$ ' + kFormatter(val) : val) : null;
						}
					}
				},
				tooltip: {
					showTitle: false,
					// showMarkers: false,
					domStyles: {
						'g2-tooltip': {
							border: '1px solid #5d6dd1',
							boxSizing: 'border-box',
							boxShadow: '0px 4px 6px rgba(203, 214, 255, 0.25)',
							borderRadius: '16px'
						}
					},
					customContent: (title, data) => {
						return data[0] ? RenderTooltip(data[0].data) : null;
					}
				},
				areaStyle: function areaStyle() {
					return {
						fill: 'l(270) 0:#ffffff 0.5:#56B8BE 1:#56B8BE'
					};
				}
			};
		}
		const RenderCardHeader = () => {
			const options = [
				{ value: 'expected', label: 'High' },
				{ value: 'low', label: 'Low' },
				{ value: 'increasing', label: 'Increasing' },
				{ value: 'decreasing', label: 'Decreasing' }
			];
			return (
				<Row align='middle' justify='space-between' style={{ width: '100%', padding: '0 12px' }}>
					<Col
						onClick={() => {
							toggleShowModal();
						}}
					>
						<Row align='middle' justify='space-between'>
							<Col span={22}>Held Away Investment</Col>
							{!showModal && (
								<Col span={1}>
									<FontAwesomeIcon icon={faExternalLink} />
								</Col>
							)}
						</Row>
					</Col>
					<Col>
						<RenderPlottingCategorySelector
							options={options}
							plottingCategory={plottingCategory}
							setPlottingCategory={setPlottingCategory}
						/>
					</Col>
				</Row>
			);
		};

		const CardContent = () => (
			<>
				{/* <PlottingAttributeSelector
          plottingField={plottingField}
          setPlottingField={setPlottingField}
          valueBtnText="Value"
          countBtnText="Count"
          
          valueBtnMapping="value"
          countBtnMapping="opporCount" 
        />
        {conversionTrendData && config && <Area {...config} />} */}

				{/* Changes made by Pranav Pawar on 30th May 2021, 03:12 PM */}
				<HeldAwayInvestment
					plottingField={plottingField}
					setPlottingField={setPlottingField}
					highBtnText='High'
					lowBtnText='Low'
					increaseBtnText='Increase'
					decreaseBtnText='Decrease'
					highBtnMapping='highValue'
					lowBtnMapping='lowValue'
					increaseBtnMapping='increaseValue'
					decreaseBtnMapping='decreaseValue'
				/>
				{conversionTrendData && config && <HeldAwayInvestmentData />}
			</>
		);
		const RenderConversionTrendModal = () => (
			<ScModal
				title={<RenderCardHeader />}
				visible={showModal}
				onCancel={toggleShowModal}
				onOk={toggleShowModal}
				footer={null}
				width='70vw'
				padding='0 24px 72px'
				borderRadius='16px'
				centered
			>
				<CardContent />
			</ScModal>
		);
		return (
			<div>
				<RenderConversionTrendModal />
				<Card loading={loading} title={<RenderCardHeader />}>
					<CardContent />
				</Card>
			</div>
		);
	};
	// table renders
	const RenderMiniOpportunityTableSection = ({ data, getData }) => {
		// NOT USED
		const RenderMoreOptions = ({ record }) => {
			const onMoreMenuSelect = (task) => {
				let toObject;
				switch (task) {
					case 'Create New Opportunity':
						toObject = {
							pathname: `MyOpportunity/OpportunityCreate`,
							// state: { screen: "list", data: dataObject, mode: "create" },
							state: {
								screen: 'list',
								data: record.opportunityId,
								mode: 'create'
							}
						};
						history.push(toObject);
						break;
					default:
						break;
				}
			};
			const content = () => (
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					{CONSTANTS.threeDotMenus.opportunity.map(
						(option, index) =>
							!['Modify', 'Closed Won', 'Closed Missed'].includes(option) && (
								<div key={index} className='row-action-option'>
									<span
										onClick={(e) => {
											onMoreMenuSelect(e.target.innerHTML);
										}}
									>
										{option}
									</span>
								</div>
							)
					)}
				</div>
			);
			return (
				<div
					className='col-more'
					// onClick={(e) => {
					//   e.stopPropagation();
					// }}
				>
					<Popover
						placement='bottomLeft'
						content={content}
						overlayClassName='opportunity-listing-actions-popover'
					>
						<FontAwesomeIcon icon={faEllipsisHAlt} size='2x' className='row-actions-menu-icon' />
					</Popover>
				</div>
			);
		};
		// NOT USED
		const RenderFavourite = ({ record }) => {
			const toggleFavourite = () => {
				addFavouriteOpportunityApi(record.opportunityId, CONSTANTS.progNames.OPPORTUNITYADD)
					.then((res) => {})
					.catch((err) => {
						console.log('EEROR: ', err);
					})
					.finally(() => {
						getData();
					});
			};
			return (
				<div
					onClick={() => {
						toggleFavourite();
					}}
				>
					<ScRate allowHalf={false} count={1} value={record.isFavourite} />
				</div>
			);
		};
		const RenderClientProspectProfile = ({ record }) => (
			<div className='profile'>
				<div>
					<AvatarLogo
						imgsrc={record.profileImage}
						profileName={record.profileInitial}
						avatarSize={AvatarSize.medium}
					/>
					{/* <Avatar
            size={80}
            className="avatar"
            style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
            icon={
              record.profileImage ? (
                <img src={`${record.profileImage}`} alt="img" />
              ) : (
                <div>{record.profileInitial}</div>
              )
            }
          /> */}
				</div>
				<div className='profile-details'>
					<div>{record.clientProspectName}</div>
					<div className='profile-tag'>
						{record.tagName &&
							record.tagName.charAt(0).toUpperCase() + record.tagName.substring(1).toLowerCase()}
					</div>
				</div>
			</div>
		);
		const RenderRow = ({ record, index }) => {
			const viewRecord = () => {
				const opportunityIds = data && data.map((item) => item.opportunityId);
				const idx =
					data &&
					[
						...data.map((item, index) => {
							if (item.opportunityId === record.opportunityId) {
								return index;
							} else return null;
						})
					].filter((item) => item !== null);
				const toObject = {
					pathname: `MyOpportunity/OpportunityView`,
					state: {
						opportunityIds: opportunityIds,
						rowIndex: idx[0],
						miniMode: true
					}
				};
				history.push(toObject);
			};
			return (
				<div
					className={`record ${index === 0 ? 'first' : index === 2 ? 'last' : ''}`}
					onClick={() => {
						viewRecord();
					}}
				>
					<Row align='middle' justify='space-between' className='header'>
						<Col span={32} className='opportunity-title'>
							<AvatarLogo imgsrc={''} profileName={'P'} avatarSize={AvatarSize.small} />
							{/* <Avatar size={60}> P </Avatar>  */}
							Peter Dudchenko &nbsp; <FontAwesomeIcon icon={faStar} color='#354081' />{' '}
							<FontAwesomeIcon icon={faEllipsisHAlt} color='#354081' />
						</Col>
						{/* <Col span={6}>
              <Row align="middle" justify="end">
                <Col>
                <RenderFavourite record={record} />
                </Col>
                <Col>
                  <RenderMoreOptions record={record} />
                </Col>
              </Row>
            </Col> */}
					</Row>
					<div className='target-amount' style={{ paddingLeft: '68px' }}>
						$ 450,000
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						$ 450,000
					</div>
					<div className='stage-status' style={{ paddingLeft: '68px' }}>
						<span>
							AUM
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							Revenue
						</span>
					</div>
				</div>
			);
		};
		return (
			<div className='mini-table'>
				{data &&
					Array.isArray(data) &&
					data.map((record, index) => {
						return index < 3 ? <RenderRow record={record} index={index} /> : null;
					})}
			</div>
		);
	};
	const RenderRecentConCardSection = ({ loading, setLoading }) => {
		const [recentConData, setRecentConData] = useState();
		const [showModal, setShowModal] = useState(false);
		const toggleModal = () => {
			setShowModal(!showModal);
		};
		const getData = () => {
			getRecentConApi().then((res) => {
				setRecentConData(res.data);
				setLoading(false);
			});
		};
		useEffect(() => {
			// setLoading(true);
			getData();
		}, []);
		return (
			<>
				{recentConData && (
					<OpporOverviewDetailsModal
						title='Recent Conversion'
						visible={showModal}
						onClose={toggleModal}
						getData={getData}
						data={recentConData.opportunity}
						mode='table'
					/>
				)}
				{recentConData && (
					<RenderMiniOpportunityTableSection data={recentConData.opportunity} getData={getData} />
				)}

				<ScButtonText
					type='text'
					onClick={toggleModal}
					left='auto'
					right='0px'
					bottom='5px'
					margin='0 0 0 auto'
					padding='4px 15px'
					position='absolute'
					fontSize='12px'
				>
					View More
				</ScButtonText>
			</>
		);
	};
	const RenderMissesCardSection = ({ loading, setLoading }) => {
		const [recentMissesData, setRecentMissesData] = useState();
		const [showModal, setShowModal] = useState(false);
		const toggleModal = () => {
			setShowModal(!showModal);
		};
		const getData = () => {
			getRecentMissedApi().then((res) => {
				setRecentMissesData(res.data);
				setLoading(false);
			});
		};
		useEffect(() => {
			// setLoading(true);
			getData();
		}, []);
		return (
			<>
				{recentMissesData && (
					<OpporOverviewDetailsModal
						title='Misses'
						visible={showModal}
						onClose={toggleModal}
						getData={getData}
						data={recentMissesData.opportunity}
						mode='table'
					/>
				)}
				{recentMissesData && (
					<RenderMiniOpportunityTableSection
						data={recentMissesData.opportunity}
						getData={getData}
						setLoading={setLoading}
					/>
				)}
				<ScButtonText
					type='text'
					onClick={toggleModal}
					left='auto'
					right='0px'
					bottom='5px'
					margin='0 0 0 auto'
					padding='4px 15px'
					position='absolute'
					fontSize='12px'
				>
					View More
				</ScButtonText>
			</>
		);
	};
	const RenderHeaderTabs = ({ tabs, activeTab, setActiveTab }) => {
		const handleTabChange = (key) => {
			setActiveTab(key);
		};
		return (
			<Tabs activeKey={activeTab} onChange={handleTabChange}>
				{tabs.map((tab, index) => {
					return <TabPane tab={<div>{tab.title}</div>} key={index} />;
				})}
			</Tabs>
		);
	};
	const RenderHighValueDealCards = () => {
		const [highValueDealsData, setHighValueDealsData] = useState();
		const [loading, setLoading] = useState(true);
		const [showModal, setShowModal] = useState(false);
		const [plottingField, setPlottingField] = useState('all');
		const getData = () => {
			getHighValueDealApi().then((res) => {
				setHighValueDealsData(res.data);
				setLoading(false);
			});
		};
		useEffect(() => {
			getData();
		}, []);
		const toggleModal = () => {
			setShowModal(!showModal);
		};
		const CardTitle = () => {
			return (
				<ScRow align='middle' justify='space-between' width='100%'>
					<Col span={12}>Top Wallet Contributors</Col>
					<Col span={11}>
						{/* <ScRow align="middle" justify="end"> */}
						<Row align='middle' justify='end'>
							<PlottingAttributeSelector
								plottingField={plottingField}
								setPlottingField={setPlottingField}
								valueBtnText='All'
								countBtnText='Open'
								valueBtnMapping='all'
								countBtnMapping='open'
							/>
						</Row>
						{/* </ScRow> */}
					</Col>
				</ScRow>
			);
		};

		return (
			<div>
				{highValueDealsData && (
					<OpporOverviewDetailsModal
						title='High Value Deals'
						visible={showModal}
						onClose={toggleModal}
						getData={getData}
						data={
							plottingField === 'open'
								? highValueDealsData.opportunity.filter((item) => item.openOrClosed === 'OPEN')
								: highValueDealsData.opportunity
						}
						mode='table'
					/>
				)}
				<Card className='rc-m-d-card' loading={loading} title={<CardTitle />}>
					{highValueDealsData && (
						<RenderMiniOpportunityTableSection
							data={
								plottingField === 'open'
									? highValueDealsData.opportunity.filter((item) => item.openOrClosed === 'OPEN')
									: highValueDealsData.opportunity
							}
							getData={getData}
							// setLoading={setLoading}
						/>
					)}
					<ScButtonText
						type='text'
						onClick={toggleModal}
						left='auto'
						right='0px'
						bottom='5px'
						margin='0 0 0 auto'
						padding='4px 15px'
						position='absolute'
						fontSize='12px'
					>
						View More
					</ScButtonText>
				</Card>
			</div>
		);
	};
	const RenderHighValueDealCard = () => {
		const [highValueDealsData, setHighValueDealsData] = useState();
		const [loading, setLoading] = useState(true);
		const [showModal, setShowModal] = useState(false);
		const [plottingField, setPlottingField] = useState('all');
		const getData = () => {
			getHighValueDealApi().then((res) => {
				setHighValueDealsData(res.data);
				setLoading(false);
			});
		};
		useEffect(() => {
			getData();
		}, []);
		const toggleModal = () => {
			setShowModal(!showModal);
		};
		const CardTitle = () => {
			return (
				<ScRow align='middle' justify='space-between' width='100%'>
					<Col span={12}>Top Revenue Contributors</Col>
					<Col span={11}>
						{/* <ScRow align="middle" justify="end"> */}
						<Row align='middle' justify='end'>
							<PlottingAttributeSelector
								plottingField={plottingField}
								setPlottingField={setPlottingField}
								valueBtnText='All'
								countBtnText='Open'
								valueBtnMapping='all'
								countBtnMapping='open'
							/>
						</Row>
						{/* </ScRow> */}
					</Col>
				</ScRow>
			);
		};

		return (
			<div>
				{highValueDealsData && (
					<OpporOverviewDetailsModal
						title='High Value Deals'
						visible={showModal}
						onClose={toggleModal}
						getData={getData}
						data={
							plottingField === 'open'
								? highValueDealsData.opportunity.filter((item) => item.openOrClosed === 'OPEN')
								: highValueDealsData.opportunity
						}
						mode='table'
					/>
				)}
				<Card className='rc-m-d-card' loading={loading} title={<CardTitle />}>
					{highValueDealsData && (
						<RenderMiniOpportunityTableSection
							data={
								plottingField === 'open'
									? highValueDealsData.opportunity.filter((item) => item.openOrClosed === 'OPEN')
									: highValueDealsData.opportunity
							}
							getData={getData}
							// setLoading={setLoading}
						/>
					)}
					<ScButtonText
						type='text'
						onClick={toggleModal}
						left='auto'
						right='0px'
						bottom='5px'
						margin='0 0 0 auto'
						padding='4px 15px'
						position='absolute'
						fontSize='12px'
					>
						View More
					</ScButtonText>
				</Card>
			</div>
		);
	};
	return (
		<div>
			<Row gutter={[16, 16]}>
				{/* //Customer Portfolio */}
				<Col span={6}>
					<RenderCustomerPortfolioCard />
				</Col>
				{/* //Recent Trends */}
				<Col span={18}>
					<RenderRecentTrendCard />
				</Col>
			</Row>
			<Row gutter={[16, 16]}>
				{/* //Performance Analysis */}
				<Col span={24}>
					<Card className='dn-nc-mdd-graphs'>
						<Row align='middle' justify='space-between'>
							<Col>
								<RenderDueNowCardSection />
							</Col>
							<Col>
								<RenderNearClosureCardSection />
							</Col>
							<Col>
								<RenderMissedDuedateCardSection />
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
			<Row gutter={[16, 16]}>
				{/* //Charts */}
				<Col span={16}>
					<Row gutter={[16, 16]}>
						<Col span={12}>
							<RenderDistributionCard />
						</Col>
						<Col span={12}>
							<RenderSalesPipelineCard />
						</Col>
					</Row>
					<Row gutter={[16, 16]}>
						<Col span={24}>
							<RenderAgingAnalysisCard />
						</Col>
					</Row>
					<Row gutter={[16, 16]}>
						<Col span={24}>
							<RenderBusinessTrendGraph />
						</Col>
					</Row>
					<Row gutter={[16, 16]}>
						<Col span={24}>
							<RenderConversionTrendCard />
						</Col>
					</Row>
				</Col>
				{/* //Event List */}
				<Col span={8}>
					<Row gutter={[16, 16]}>
						<Col span={24}>
							<RenderHighValueDealCards />
						</Col>
					</Row>
					<Row gutter={[16, 16]}>
						<Col span={24}>
							<RenderHighValueDealCard />
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	);
};

export default CustomerOverviewScreen;
