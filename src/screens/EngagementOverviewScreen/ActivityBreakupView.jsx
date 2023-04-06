import { React, useEffect, useState } from 'react';
import { Column } from '@ant-design/charts';
import { Button, Card, Select, Col } from 'antd';

import axios from 'axios';
import './EngagementOverviewScreen.scss';
import {
	getInteractionBreakupGraphApi,
	getTaskBreakupGraphApi
} from '../../api/EngagementOverviewApi';
import { ScSelect } from '../../components/StyledComponents/formElements';
const { Option } = Select;
const ActivityBreakupView = () => {
	const [loading, setLoading] = useState();
	const [interactionData, setInteractionData] = useState();
	const [typeData, setTypeData] = useState();

	const [plottingCategory, setPlottingCategory] = useState('PURPOSE');
	const [plottingField, setPlottingField] = useState('interaction');

	useEffect(() => {
		axios
			.all([
				plottingField === 'interaction'
					? getInteractionBreakupGraphApi(plottingCategory)
					: getTaskBreakupGraphApi(plottingCategory)
			])
			.then(
				axios.spread((...responses) => {
					plottingField === 'interaction'
						? setInteractionData(responses[0].data)
						: setTypeData(responses[0].data);
				})
			)
			.catch((errors) => {
				// react on errors.
			})
			.finally(() => {
				setLoading(false);
			});
	}, [plottingField, plottingCategory]);

	class ChartModal {
		constructor(name, count, type) {
			this.name = name;
			this.count = count;
			this.type = type;
		}
	}

	const RenderCardHeader = () => {
		const options = [
			{ value: 'PURPOSE', label: 'Purpose' },
			{ value: 'TYPE', label: 'Type' },
			{ value: 'ENTITY', label: 'Entity' }
		];
		return (
			<>
				<h2 style={{ fontSize: '18px' }}>Activity Breakup</h2>
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
				interactionBtnMapping='interaction'
				taskBtnMapping='value'
			/>
			<div className='graph-section'>{config && <Column {...config} />}</div>
		</>
	);
	const RenderPlottingAttributeSelector = ({
		plottingField,
		setPlottingField,
		interactionBtnMapping,
		taskBtnMapping
	}) => {
		return (
			<div className='plot-attribute-selector'>
				<Button
					type='text'
					className={`option left ${plottingField === interactionBtnMapping && 'active'}`}
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

	let config;
	if (
		(plottingField === 'interaction' && interactionData && Array.isArray(interactionData)) ||
		(typeData && Array.isArray(typeData))
	) {
		var modifiedChartData = [];
		var data = plottingField === 'interaction' ? interactionData : typeData;
		for (var i = 0; i < data.length; i++) {
			// modifiedChartData.push(new ChartModal('Client', data[i].prospectCount, data[i].name));
			// modifiedChartData.push(new ChartModal('Prospect', data[i].clientCount, data[i].name));
			modifiedChartData.push(new ChartModal('Client', data[i].clientCount, data[i].name));
			modifiedChartData.push(new ChartModal('Prospect', data[i].prospectCount, data[i].name));
		}

		config = {
			appendPadding: 30,
			data: modifiedChartData,
			isGroup: true,
			xField: 'type',
			yField: 'count',
			seriesField: 'name',
			color: ['#5564C1', '#56B8BE'],
			label: false,
			legend: {
				layout: 'horizontal',
				position: 'bottom'
			},
			tooltip: {
				domStyles: {
					'g2-tooltip': {
						border: '1px solid #5d6dd1',
						boxSizing: 'border-box',
						boxShadow: '0px 4px 6px rgba(203, 214, 255, 0.25)',
						borderRadius: '16px'
					}
				}
			}
		};
	}

	return (
		<Card loading={loading} className='dist-card styled-border' title={<RenderCardHeader />}>
			<Col>
				<CardContent />
			</Col>
		</Card>
	);
};

export default ActivityBreakupView;
