import { React, useEffect, useState } from 'react';
// import { Area } from "@antv/g2plot";
import { Area } from '@ant-design/charts';
import { Button, Card, Select, Row, Col } from 'antd';

import axios from 'axios';
import './EngagementOverviewScreen.scss';
import { getTrendExecutedApi, getTrendPlannedApi } from '../../api/EngagementOverviewApi';
import { ScSelect } from '../../components/StyledComponents/formElements';
import styled from 'styled-components';
import moment from 'moment';

const { Option } = Select;
const ActivityTrendView = () => {
	const [loading, setLoading] = useState();
	const [executedData, setExecutedData] = useState();
	const [plannedData, setPlannedData] = useState();

	const [plottingCategory, setPlottingCategory] = useState('Executed');
	const [plottingField, setPlottingField] = useState('all');
	let config;

	useEffect(() => {
		if (plottingCategory === 'Executed') {
			axios
				.all([getTrendExecutedApi(plottingCategory), getTrendPlannedApi(plottingCategory)])
				.then(
					axios.spread((...responses) => {
						setExecutedData(responses[0].data);
						setPlannedData(responses[1].data);
					})
				)
				.catch((errors) => {
					// react on errors.
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [plottingCategory, plottingField]);

	const RenderCardHeader = () => {
		const options = [
			{ value: 'Executed', label: 'Executed' },
			{ value: 'Planned', label: 'Planned' }
		];
		return (
			<>
				<h2 style={{ fontSize: '18px' }}>Activity Trend</h2>
				<RenderPlottingCategorySelector
					options={options}
					plottingCategory={plottingCategory}
					setPlottingCategory={setPlottingCategory}
				/>
			</>
		);
	};
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

	const CardContent = () => (
		<>
			<RenderPlottingAttributeSelector
				plottingField={plottingField}
				setPlottingField={setPlottingField}
				allBtnMapping='all'
				interactionBtnMapping='interaction'
				taskBtnMapping='value'
			/>
			<div className='graph-section'>{<Area {...config} />}</div>
		</>
	);
	const RenderPlottingAttributeSelector = ({
		plottingField,
		setPlottingField,
		allBtnMapping,
		interactionBtnMapping,
		taskBtnMapping
	}) => {
		return (
			<div className='plot-attribute-selector'>
				<Button
					type='text'
					className={`option left ${plottingField === allBtnMapping && 'active'}`}
					onClick={(e) => {
						setPlottingField(allBtnMapping);
					}}
				>
					All
				</Button>
				<Button
					type='text'
					className={`option right ${plottingField === interactionBtnMapping && 'active'}`}
					onClick={(e) => {
						setPlottingField(interactionBtnMapping);
					}}
				>
					Interaction
				</Button>
				<Button
					type='text'
					className={`option right ${plottingField === taskBtnMapping && 'active'}`}
					onClick={(e) => {
						setPlottingField(taskBtnMapping);
					}}
				>
					Task
				</Button>
			</div>
		);
	};

	if (
		(executedData || plannedData) &&
		(Array.isArray(executedData) || Array.isArray(plannedData))
	) {
		let data;
		const RenderTooltip = (data) => {
			const TooltipWrapper = styled.div`
				min-width: 200px;
				padding: 5px;
			`;
			const TooltipAttribute = styled(Row)`
				margin: 6px 0;
			`;

			const AllActivitiesAttr = () => (
				<TooltipAttribute align='top' justify='space-between'>
					<Col span={9}>
						<span>
							<Row justify='space-between' align='middle' style={{ width: '100%' }}>
								<div>All Activities: </div>
								<div>:</div>
							</Row>
						</span>
					</Col>
					<Col span={14}>
						<strong>{data[0] && data[0].value}</strong>
					</Col>
				</TooltipAttribute>
			);

			const InteractionAttr = () => (
				<TooltipAttribute align='top' justify='space-between'>
					<Col span={9}>
						<span>
							<Row justify='space-between' align='middle' style={{ width: '100%' }}>
								<div>Interaction: </div>
								<div>:</div>
							</Row>
						</span>
					</Col>
					<Col span={14}>
						<strong>{data[1] && data[1].value}</strong>
					</Col>
				</TooltipAttribute>
			);

			const TaskAttr = () => (
				<TooltipAttribute align='top' justify='space-between'>
					<Col span={9}>
						<span>
							<Row justify='space-between' align='middle' style={{ width: '100%' }}>
								<div>Task: </div>
								<div>:</div>
							</Row>
						</span>
					</Col>
					<Col span={14}>
						<strong>{data[2] && data[2].value}</strong>
					</Col>
				</TooltipAttribute>
			);
			const DateAttr = () => {
				return (
					<TooltipAttribute align='top' justify='space-between'>
						<Col span={9}>
							<span>
								<Row justify='space-between' align='middle' style={{ width: '100%' }}>
									<div>Date</div>
									<div>:</div>
								</Row>
							</span>
						</Col>
						<Col span={14}>
							<strong>{data[0] && moment(data[0].title).format('DD MMM YYYY')}</strong>
						</Col>
					</TooltipAttribute>
				);
			};
			return (
				<TooltipWrapper>
					<AllActivitiesAttr />
					<InteractionAttr />
					<TaskAttr />
					<DateAttr />
				</TooltipWrapper>
			);
		};
		if (plottingCategory === 'Executed') {
			data = executedData;
		} else {
			data = plannedData;
		}
		if (plottingField === 'all') {
			data = data;
		} else if (plottingField === 'interaction') {
			data = data.filter((data) => data.name === 'InteractionCount');
		} else {
			data = data.filter((data) => data.name === 'Task');
		}

		config = {
			data: data,
			xField: 'duration',
			yField: 'count',
			seriesField: 'name',
			label: false,
			color: ['#792B80', '#56B8BE', '#5564C1'],
			areaStyle: { fillOpacity: 0.3 },
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
	return (
		<Card loading={loading} className='dist-card styled-border' title={<RenderCardHeader />}>
			{(executedData || plannedData) && <Col>{<CardContent />}</Col>}
		</Card>
	);
};

export default ActivityTrendView;
