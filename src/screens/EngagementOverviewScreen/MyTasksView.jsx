import { React, useEffect, useState } from 'react';
import { TinyArea } from '@ant-design/charts';
import { Card, Row, Col } from 'antd';
import { getMyTaskApi, getMyTaskGraphApi } from '../../api/EngagementOverviewApi';
import styled from 'styled-components';
import axios from 'axios';
import './EngagementOverviewScreen.scss';
import { theme } from '../../theme';
const MyTasksView = () => {
	const [loading, setLoading] = useState(true);
	const [taskData, setTaskData] = useState();
	const [taskGraphData, setTaskGraphData] = useState();

	useEffect(() => {
		axios
			.all([getMyTaskApi(), getMyTaskGraphApi()])
			.then(
				axios.spread((...responses) => {
					setTaskData(responses[0].data);
					setTaskGraphData(responses[1].data);
				})
			)
			.catch((errors) => {
				// react on errors.
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const TaskView = () => {
		let myTaskPlottingData;
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
					taskGraphData &&
					Array.isArray(taskGraphData) &&
					data[0] &&
					taskGraphData.length > 0 &&
					taskGraphData.filter((item, index) => index.toString() === data[0].title)[0]
				) {
					month = taskGraphData.filter((item, index) => index.toString() === data[0].title)[0]
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
		if (taskGraphData && taskGraphData !== null && Array.isArray(taskGraphData)) {
			myTaskPlottingData = taskGraphData.map(
				(item) => item !== null && item.count !== null && item.count
			);
		}

		var tinyAreaConfig = {
			width: 300,
			height: 72,
			smooth: true,
			data: myTaskPlottingData,
			color: '#792B80',
			areaStyle: { fill: '#FDE8FF' },
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
		return taskData && taskGraphData ? (
			<Col>
				<Row justify='space-between'>
					<Col>
						<div className='task-value' style={theme.primaryHeader}>
							{taskData.today}
						</div>
						<div className='title' style={theme.secondaryHeader}>{`Today's Tasks`}</div>
					</Col>
					<Col>
						<div className='task-value' style={theme.primaryHeader}>
							{taskData.totalActiveTask}
						</div>
						<div className='title' style={theme.secondaryHeader}>
							Total
						</div>
					</Col>
				</Row>
				<div className='graph-section'>
					<TinyArea {...tinyAreaConfig} />
				</div>
				<Row justify='space-between'>
					<Col>
						<div className='task-value-small' style={theme.primaryHeader}>
							{taskData.week}
						</div>
						<div className='sub-title' style={theme.secondaryHeader}>
							This Week
						</div>
					</Col>
					<Col>
						<div className='task-value-small' style={theme.primaryHeader}>
							{taskData.month}
						</div>
						<div className='sub-title' style={theme.secondaryHeader}>
							This Month
						</div>
					</Col>
					<Col>
						<div className='task-value-small' style={theme.primaryHeader}>
							{taskData.later}
						</div>
						<div className='sub-title' style={theme.secondaryHeader}>
							Later
						</div>
					</Col>
				</Row>
			</Col>
		) : (
			<div></div>
		);
	};

	return (
		<Card title='My Tasks' className='lead-repo-graph-card styled-border' loading={loading}>
			<TaskView />
		</Card>
	);
};

export default MyTasksView;
