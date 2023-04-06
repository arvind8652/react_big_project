import { React, useEffect, useState } from 'react';
import { TinyArea } from '@ant-design/charts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEnvelope,
	faPhoneAlt,
	faCommentLines,
	faComments
} from '@fortawesome/pro-light-svg-icons';
import { Card, Row, Col } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import './EngagementOverviewScreen.scss';
import {
	getActivityInteractionApi,
	getActivityInteractionGraphApi,
	getActivityInteractionTypeApi
} from '../../api/EngagementOverviewApi';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';

const ActiveInteractionView = () => {
	const [loading, setLoading] = useState(true);
	const [activeInteractions, setActiveInteractions] = useState();
	const [interactionGraph, setInteractionGraph] = useState();
	const [interactionType, setInteractionType] = useState();

	useEffect(() => {
		axios
			.all([
				getActivityInteractionApi(),
				getActivityInteractionGraphApi(),
				getActivityInteractionTypeApi()
			])
			.then(
				axios.spread((...responses) => {
					setActiveInteractions(responses[0].data);
					setInteractionGraph(responses[1].data);
					setInteractionType(responses[2].data);
				})
			)
			.catch((errors) => {
				// react on errors.
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const RenderTypeView = (data, index) => {
		return index <= 3 ? (
			<Col span={12}>
				<Row className='card-section' style={theme.secondaryHeader} Today>
					{
						<div className='logo'>
							{data.name === 'Call' ? (
								<FontAwesomeIcon icon={faPhoneAlt} />
							) : data.name === 'Email' ? (
								<FontAwesomeIcon icon={faEnvelope} />
							) : data.name === 'Meeting' ? (
								<FontAwesomeIcon icon={faPhoneAlt} />
							) : data.name === 'Chat' ? (
								<FontAwesomeIcon icon={faCommentLines} />
							) : (
								<FontAwesomeIcon icon={faComments} />
							)}
						</div>
					}
					<Col>
						<div className='count-value'>{data.count}</div>
						<div className='name-value'>{data.name}</div>
					</Col>
				</Row>
			</Col>
		) : (
			<div></div>
		);
	};

	const InteractionView = () => {
		let interactionPlottingData;
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
					interactionGraph &&
					Array.isArray(interactionGraph) &&
					data[0] &&
					interactionGraph.length > 0 &&
					interactionGraph.filter((item, index) => index.toString() === data[0].title)[0]
				) {
					month = interactionGraph.filter((item, index) => index.toString() === data[0].title)[0]
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
		if (interactionGraph && interactionGraph !== null && Array.isArray(interactionGraph)) {
			interactionPlottingData = interactionGraph.map(
				(item) => item !== null && item.count !== null && item.count
			);
		}

		var tinyAreaConfig = {
			width: 300,
			height: 72,
			smooth: true,
			data: interactionPlottingData,
			color: '#792B80',
			areaStyle: { fill: '#d6e3fd' },
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
		return activeInteractions && interactionGraph && interactionType ? (
			<Col className='col-contents'>
				<Row justify='space-between'>
					<Col>
						<div className='task-value' style={theme.primaryHeader}>
							{activeInteractions.todaysInteractionCount}
						</div>
						<div className='title' style={theme.secondaryHeader}>{`Today's Interaction`}</div>
					</Col>
					<Col>
						<div className='task-value' style={theme.primaryHeader}>
							{activeInteractions.totalInteractionCount}
						</div>
						<div className='title' style={theme.secondaryHeader}>
							Total
						</div>
					</Col>
				</Row>
				<div className='graph-section'>
					<TinyArea {...tinyAreaConfig} />
				</div>
				<div className='subtitle' style={theme.secondaryHeader}>
					You execute average of {activeInteractions.avgInteractionCount} interactions every month
				</div>
				<div style={{ marginTop: '20px', marginLeft: '5px', marginRight: '5px' }}>
					<Row gutter={[8, 8]}>
						{interactionType.map((data, index) => {
							if (index < 3) {
								return RenderTypeView(data, index);
							} else {
								var next = interactionType[index + 1];
								if (next) {
									data.count = data.count + next.count;
									data.name = 'Others';
									return RenderTypeView(data, index);
								} else {
									data.name = 'Others';
									return RenderTypeView(data, index);
								}
							}
						})}
					</Row>
				</div>
			</Col>
		) : (
			<div></div>
		);
	};

	return (
		<Card
			loading={loading}
			className='dist-card styled-border'
			style={{ height: 580 }}
			title='Active Interaction'
		>
			<InteractionView />
		</Card>
	);
};

export default ActiveInteractionView;
