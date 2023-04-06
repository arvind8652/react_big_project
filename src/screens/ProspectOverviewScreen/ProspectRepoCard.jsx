import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { TinyArea, Bullet, RingProgress } from '@ant-design/charts';
import './prospectOverviewScreen.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake } from '@fortawesome/pro-light-svg-icons';
import { faClipboardCheck } from '@fortawesome/pro-regular-svg-icons';
import { faHotjar } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import {
	getRepositoryDataApi,
	getQualificationStatusApi,
	getQualificationGraphApi,
	getInterestLevelCountApi
} from '../../api/prospectOverviewApi';

import styled from 'styled-components';
import { theme } from '../../theme';

const ProspectRepoCard = () => {
	const [loading, setLoading] = useState(true);
	const [prospectRepoData, setProspectRepoData] = useState();
	const [qualificationData, setQualificationData] = useState();
	const [qualificationGraph, setQualificationGraph] = useState();
	const [interestLevelCount, setInterestLevelCount] = useState();
	var qualificationPlottingData =
		qualificationGraph && qualificationGraph.map((item) => item.convertQualifyCount);
	const percentageValue =
		prospectRepoData &&
		prospectRepoData.prospectCount /
			(prospectRepoData.prospectCount + prospectRepoData.convertProspectCustomer);
	var config = {
		height: 170,
		width: 300,
		autoFit: false,
		percent: percentageValue,
		color: ['#5B8FF9', '#E8EDF3']
	};
	var tinyAreaConfig = {
		width: 300,
		height: 72,
		data: qualificationPlottingData,
		smooth: true,
		areaStyle: { fill: '#d6e3fd' },
		// point: {
		//   size: 0.5,
		//   shape: "circle",
		//   style: {
		//     fill: "white",
		//     stroke: "#5B8FF9",
		//     lineWidth: 2,
		//   },
		// },
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
							<div>Qualified</div>
							<div>:</div>
						</Row>
					</span>
				</Col>
				<Col span={14}>
					<strong>{data[0] && data[0].value + ' Prospects'}</strong>
				</Col>
			</TooltipAttribute>
		);
		const MonthAttr = () => {
			let month;
			if (
				qualificationGraph &&
				Array.isArray(qualificationGraph) &&
				data[0] &&
				qualificationGraph.length > 0 &&
				qualificationGraph.filter((item, index) => index.toString() === data[0].title)[0]
			) {
				month = qualificationGraph.filter((item, index) => index.toString() === data[0].title)[0]
					.month;
			}
			return (
				<TooltipAttribute align='top' justify='space-between'>
					<Col span={9}>
						<span>
							<Row justify='space-between' align='middle' style={{ width: '100%' }}>
								<div>Month</div>
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
				<MonthAttr />
			</TooltipWrapper>
		);
	};
	if (interestLevelCount) {
		interestLevelCount['bulletMeasureField'] = [
			interestLevelCount.hotPercent,
			interestLevelCount.coldPercent
		];
		interestLevelCount['bulletRangeField'] = [0, 50, 100];
		interestLevelCount['bulletTargetField'] = 0;
		var hotColdGraphConfig = {
			height: 16,
			data: [interestLevelCount],
			measureField: 'bulletMeasureField',
			rangeField: 'bulletRangeField',
			targetField: 'bulletTargetField',
			// xField: 'title',
			color: {
				range: ['#ffffff', '#ffffff', '#ffffff'],
				measure: ['#792B80', '#56B8BE']
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

	useEffect(() => {
		axios
			.all([
				getRepositoryDataApi(),
				getQualificationStatusApi(),
				getQualificationGraphApi(),
				getInterestLevelCountApi()
			])
			.then(
				axios.spread((...responses) => {
					setProspectRepoData(responses[0].data);
					setQualificationData(responses[1].data);
					setQualificationGraph(responses[2].data);
					setInterestLevelCount(responses[3].data);
				})
			)
			.catch((errors) => {
				// react on errors.
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	const ProspectsDetails = () => {
		return prospectRepoData ? (
			<div className='prospect-details'>
				<div className='graph-converted-open col-contents styled-move'>
					<div className='group-text'>
						<div className='converted-prospect-count' style={theme.primaryHeader}>
							{prospectRepoData.convertProspectCustomer}
						</div>
						<div className='title' style={theme.secondaryHeader}>
							{' '}
							Converted
						</div>
					</div>
					<div className='group-text'>
						<div className='open-prospect-count' style={theme.primaryHeader}>
							{prospectRepoData.prospectCount}
						</div>
						<div className='title' style={theme.secondaryHeader}>
							{' '}
							Open
						</div>
					</div>
				</div>
			</div>
		) : (
			<div></div>
		);
	};

	const QualificationDetails = () => {
		return qualificationData ? (
			<div className='qualification-details'>
				<div className='upper-det'>
					<div className='col-contents'>
						<div className='qualified-status' style={theme.primaryHeader}>
							<FontAwesomeIcon
								// className="icon"
								icon={faClipboardCheck}
								size='1.5px'
								color='#56B8BE'
							/>{' '}
							{qualificationData.qualifyCount} / {qualificationData.nonQualifyCount}
						</div>
						<div className='title' style={theme.secondaryHeader}>
							Qualified
						</div>
					</div>
					<div className='col-contents'>
						<div className='percent' style={theme.primaryHeader}>
							{qualificationData.percent}%
						</div>
					</div>
				</div>
				<div className='graph-section'>
					<TinyArea {...tinyAreaConfig} />
				</div>
				<div className='subtitle subtitle-styled' style={theme.secondaryHeader}>
					You qualify minimum {prospectRepoData.convertQualifyCount} Prospects Monthly
				</div>
			</div>
		) : (
			<div></div>
		);
	};

	const InterestLevelDetails = () => {
		const totalProspects =
			interestLevelCount && interestLevelCount.hotCount + interestLevelCount.coldCount;
		const hotColdRatio = interestLevelCount.hotCount / interestLevelCount.coldCount;
		return interestLevelCount ? (
			<div className='interest-level-details'>
				<div className='qualified-count' style={theme.primaryHeader}>
					{totalProspects}
				</div>
				<div className='title' style={theme.secondaryHeader}>
					Total Prospects
				</div>
				<div className='weather'>
					<div className='hot-icon'>
						<FontAwesomeIcon
							//  className='icon'
							style={{ margin: '0 12px 0 0' }}
							icon={faHotjar}
							size='2x'
							color='#EF7C5B'
						/>
						<div className='hot-stats'>
							<div style={theme.primaryHeader}>{interestLevelCount.hotCount}</div>
							<span style={theme.secondaryHeader}>Hot</span>
						</div>
					</div>
					<div className='cold-icon'>
						<FontAwesomeIcon
							// className='icon'
							style={{ margin: '0 12px 0 0' }}
							icon={faSnowflake}
							size='2x'
							color='#56B8BE'
						/>
						<div className='cold-stats'>
							<div style={theme.primaryHeader}>{interestLevelCount.coldCount}</div>
							<span style={theme.secondaryHeader}>Cold</span>
						</div>
					</div>
				</div>
				<div>
					<Bullet {...hotColdGraphConfig} />
				</div>
				{/* Changed by Pranav Pawar by backend change request */}
				{/* <div className="subtitle">
          You missed {interestLevelCount.value}
          opportunities to get one
        </div> */}
				<div className='subtitle' style={theme.secondaryHeader}>
					Hot prospects {hotColdRatio <= 1 ? 'is' : 'are'} {Number(hotColdRatio).toFixed(2)}{' '}
					{hotColdRatio <= 1 ? 'time' : 'times'} of cold ones
				</div>
			</div>
		) : (
			<div></div>
		);
	};
	return (
		<Card
			title='Prospect Repository'
			className='prospect-repo-card styled-border'
			loading={loading}
		>
			<Row gutter={16}>
				<Col span={8}>
					<div className='prospect-section col-contents'>
						<div className='upgraded-open-graph  row-contents'>
							<RingProgress {...config} />
							<ProspectsDetails />
						</div>
						<div className='subtitle' style={theme.secondaryHeader}>
							You convert {prospectRepoData && prospectRepoData.averageProspectConversion} prospects
							per month
						</div>
					</div>
				</Col>

				<Col span={8}>
					<div className='qualification-section'>
						<QualificationDetails />
					</div>
				</Col>
				<Col span={8}>
					<InterestLevelDetails />
				</Col>
			</Row>
		</Card>
	);
};

export default ProspectRepoCard;
