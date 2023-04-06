import { React, useEffect, useState } from 'react';
import { TinyArea, RingProgress } from '@ant-design/charts';
import { Card, Row, Col } from 'antd';

import axios from 'axios';
import styled from 'styled-components';
import './EngagementOverviewScreen.scss';
import { getMyActivityApi, getMyActivityGraphApi } from '../../api/EngagementOverviewApi';
import { theme } from '../../theme';
const MyActivitiesView = () => {
	const [loading, setLoading] = useState(true);
	const [myActivitiesData, setMyActivitiesData] = useState();
	const [myActivitiesGraph, setMyActivitiesGraph] = useState();
	const interactionPercentageValue =
		myActivitiesData &&
		myActivitiesData.openInteractionCount /
			(myActivitiesData.openInteractionCount + myActivitiesData.closedInteractionCount);
	const taskPercentageValue =
		myActivitiesData &&
		myActivitiesData.openTaskCount /
			(myActivitiesData.openTaskCount + myActivitiesData.closedTaskCount);

	var configInteraction = {
		height: 107,
		width: 107,
		autoFit: false,
		percent: interactionPercentageValue || 0,
		color: ['#5564C1', '#E8EDF3']
	};

	var configTask = {
		height: 107,
		width: 107,
		autoFit: false,
		percent: taskPercentageValue || 0,
		color: ['#792B80', '#E8EDF3']
	};

	useEffect(() => {
		axios
			.all([getMyActivityApi(), getMyActivityGraphApi()])
			.then(
				axios.spread((...responses) => {
					setMyActivitiesData(responses[0].data);
					setMyActivitiesGraph(responses[1].data);
				})
			)
			.catch((errors) => {
				// react on errors.
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	const InteractionDetails = () => {
		return myActivitiesData ? (
			<div className='prospect-details'>
				<div className='graph-converted-open col-contents'>
					<div className='group-text'>
						<div className='open-prospect-count' style={theme.primaryHeader}>
							{myActivitiesData.openInteractionCount}
						</div>
						<div className='title' style={theme.secondaryHeader}>
							{' '}
							Open
						</div>
					</div>
					<div className='group-text'>
						<div className='converted-prospect-count' style={theme.primaryHeader}>
							{myActivitiesData.closedInteractionCount}
						</div>
						<div className='title' style={theme.secondaryHeader}>
							{' '}
							Closed
						</div>
					</div>
				</div>
			</div>
		) : (
			<div></div>
		);
	};

	const TasksDetails = () => {
		return myActivitiesData ? (
			<div className='prospect-details'>
				<div className='graph-converted-open col-contents'>
					<div className='group-text'>
						<div className='open-task-count' style={theme.primaryHeader}>
							{myActivitiesData.openTaskCount}
						</div>
						<div className='title' style={theme.secondaryHeader}>
							{' '}
							Open
						</div>
					</div>
					<div className='group-text'>
						<div className='converted-task-count' style={theme.primaryHeader}>
							{myActivitiesData.closedTaskCount}
						</div>
						<div className='title' style={theme.secondaryHeader}>
							{' '}
							Closed
						</div>
					</div>
				</div>
			</div>
		) : (
			<div></div>
		);
	};

	const TotalActionView = () => {
		let myActivityPlottingData;
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
								<div>Count</div>
								<div>:</div>
							</Row>
						</span>
					</Col>
					<Col span={14}>
						<strong>{data[0] && data[0].value}</strong>
					</Col>
				</TooltipAttribute>
			);
			const MonthAttr = () => {
				let month;
				if (
					myActivitiesGraph &&
					Array.isArray(myActivitiesGraph) &&
					data[0] &&
					myActivitiesGraph.length > 0 &&
					myActivitiesGraph.filter((item, index) => index.toString() === data[0].title)[0]
				) {
					month = myActivitiesGraph.filter((item, index) => index.toString() === data[0].title)[0]
						.duration;
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
		if (myActivitiesGraph && myActivitiesGraph !== null && Array.isArray(myActivitiesGraph)) {
			myActivityPlottingData = myActivitiesGraph.map(
				(item) => item !== null && item.count !== null && item.count
			);
		}
		var tinyAreaConfig = {
			width: 300,
			height: 100,
			smooth: true,
			data: myActivityPlottingData,
			color: '#354081',
			areaStyle: { fill: '#EAECF8' },
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
		return myActivitiesData && myActivitiesGraph ? (
			<div className='qualification-details'>
				<div className='upper-det'>
					<div className='col-contents'>
						<div className='qualified-status' style={theme.primaryHeader}>
							{myActivitiesData.totalActivityCount}
						</div>
						<div className='title' style={theme.secondaryHeader}>
							Total Activities
						</div>
					</div>
				</div>
				<div className='graph-section'>
					<TinyArea {...tinyAreaConfig} />
				</div>
				<div className='subtitle' style={theme.secondaryHeader}>
					{myActivitiesData.todayActivityCount} Activities today
				</div>
			</div>
		) : (
			<div></div>
		);
	};

	return (
		<Card title='My Activities' className='prospect-repo-card styled-border' loading={loading}>
			<Row gutter={16}>
				<Col span={8}>
					<div className='qualification-section'>
						<TotalActionView />
					</div>
				</Col>
				<Col span={8}>
					<div className='prospect-section col-contents'>
						<div className='upgraded-open-graph  row-contents'>
							<RingProgress {...configInteraction} />
							<InteractionDetails />
						</div>
						<div className='subtitle' style={theme.secondaryHeader}>
							You have {myActivitiesData && myActivitiesData.interactionPerEntity} interaction per
							Entity
						</div>
					</div>
				</Col>
				<Col span={8}>
					<div className='prospect-section col-contents'>
						<div className='upgraded-open-graph  row-contents'>
							<RingProgress {...configTask} />
							<TasksDetails />
						</div>
						<div className='subtitle' style={theme.secondaryHeader}>
							You have {myActivitiesData && myActivitiesData.taskPerEntity} task per Entity
						</div>
					</div>
				</Col>
			</Row>
		</Card>
	);
};
export default MyActivitiesView;
