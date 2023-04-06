import { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Bullet } from '@ant-design/charts';
import { faAngleDoubleDown, faThumbsDown, faThumbsUp } from '@fortawesome/pro-regular-svg-icons';
import styled from 'styled-components';
import moment from 'moment';
import { getConStrikeRateApi, getMovedDownApi } from '../../api/opportunityOverviewApi';
import RenderConversionWon from './RenderConversionWon';
import RenderMovedUp from './RenderMovedUp';
import NumberFormat from '../../constants/NumberFormat';
import OpporOverviewDetailsModal from './OpporOverviewDetailsModal';
import RenderOpportunityAmountStats from './RenderOpportunityAmountStats';
import { theme } from '../../theme';

const RenderConStrikeRateCard = (props) => {
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
					{/* <strong>{data && <RupeeOrNonRupee amount={data.value} /> }</strong> */}
					{NumberFormat(props.authData, data.value)}
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

				tooltip: {
					customContent: (title, data) => {
						return data && Array.isArray(data) && data.length > 0 ? RenderTooltip(data[0]) : null;
					}
				}
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
					title='Moved Down'
					getData={getMovedDownData}
					data={movedDownData}
					mode='chart'
				/>
				<Row align='middle' justify='center' className='moved-down' onClick={toggleDetailsModal}>
					<Col span={6}>
						<div className='moved-down-icon'>
							<FontAwesomeIcon icon={faAngleDoubleDown} size='2x' color='#BE5C56' />
						</div>
					</Col>
					<Col span={16}>
						{movedDownData && movedDownData !== null && (
							<RenderOpportunityAmountStats
								opporCount={movedDownData.totaloppor}
								amount={movedDownData.targetAmount}
								text='Moved Down'
								authData={props.authData}
							/>
						)}
					</Col>
				</Row>
			</>
		) : (
			'No Data Found'
		);
	};
	const RenderConversionMissed = () => (
		<div className='conversion-missed'>
			<div className='miss-amount' style={theme.primaryHeader}>
				{/* {"₱"}{NumberFormat(props.authData,conStrikeRateData.missAmount)} */}
				{conStrikeRateData?.currencySymbol}
				{NumberFormat(props.authData, conStrikeRateData.missAmount)}
			</div>
			<div className='title' style={theme.secondaryHeader}>
				Conversion Missed
			</div>
			<div className='thumbs'>
				<div className='thumbs-up'>
					<FontAwesomeIcon className='icon' icon={faThumbsUp} size='2x' color='#56B8BE' />
					<div className='hit-stats'>
						<div style={theme.primaryHeader}>{conStrikeRateData.totalHit}</div>
						<span style={theme.secondaryHeader}>Hits</span>
					</div>
				</div>
				<div className='thumbs-down'>
					<FontAwesomeIcon className='icon' icon={faThumbsDown} size='2x' color='#792B80' />
					<div className='miss-stats'>
						<div style={theme.primaryHeader}>{conStrikeRateData.totalMiss}</div>
						<span style={theme.secondaryHeader}>Miss</span>
					</div>
				</div>
			</div>
			<div>{conMissGraphConfig && <Bullet {...conMissGraphConfig} />}</div>
			<div className='subtitle' style={theme.secondaryHeader}>
				You missed&nbsp;
				{conStrikeRateData &&
					conStrikeRateData.subheadingMiss &&
					conStrikeRateData.subheadingMiss.toFixed(2)}{' '}
				opportunities to get one
			</div>
		</div>
	);
	return (
		<Card
			title={<div>Conversion Strike Rate</div>}
			className='csr-card styled-border'
			loading={loading}
		>
			{conStrikeRateData && conStrikeRateData !== null && (
				<Row align='middle' justify='space-between' className='csr-section'>
					<Col span={7} style={{ height: '100%' }}>
						<RenderConversionWon
							conStrikeRateData={conStrikeRateData}
							conRateGraphConfig={conRateGraphConfig}
						/>
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
						<RenderConversionMissed />
					</Col>
				</Row>
			)}
		</Card>
	);
};

export default RenderConStrikeRateCard;
