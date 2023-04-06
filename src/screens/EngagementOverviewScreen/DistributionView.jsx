import { React, useEffect, useState } from 'react';
import { Pie } from '@ant-design/charts';
import { Card, Select, Row, Col, Button } from 'antd';
import {
	getInteractionBreakupGraphApi,
	getTaskBreakupGraphApi
} from '../../api/EngagementOverviewApi';
import { ScModal } from '../../components/StyledComponents/genericElements';
import { ScSelect } from '../../components/StyledComponents/formElements';
import axios from 'axios';
import { theme } from '../../theme';
const { Option } = Select;
const DistributionView = () => {
	const [loading, setLoading] = useState(true);
	const [interactionData, setInteractionData] = useState();
	const [typeData, setTypeData] = useState();
	const [plottingCategory, setPlottingCategory] = useState('PURPOSE');
	const [plottingField, setPlottingField] = useState('interaction');
	const [showModal, setShowModal] = useState(false);
	const toggleShowModal = () => {
		setShowModal(!showModal);
	};

	useEffect(() => {
		axios
			.all([
				getInteractionBreakupGraphApi(plottingCategory),
				getTaskBreakupGraphApi(plottingCategory)
			])
			.then(
				axios.spread((...responses) => {
					setInteractionData(responses[0].data);
					setTypeData(responses[1].data);
				})
			)
			.catch((errors) => {
				// react on errors.
			})
			.finally(() => {
				setLoading(false);
			});
	}, [plottingCategory, plottingField]);

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

	const RenderCardHeader = () => {
		const options = [
			{ value: 'PURPOSE', label: 'Purpose' },
			{ value: 'TYPE', label: 'Type' },
			{ value: 'ENTITY', label: 'Entity' }
		];
		return (
			<Row align='middle' justify='space-between'>
				<Col
					onClick={() => {
						toggleShowModal();
					}}
				>
					<h3 style={{ fontSize: '18px' }}> Distribution </h3>
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
			<RenderPlottingAttributeSelector
				plottingField={plottingField}
				setPlottingField={setPlottingField}
				interactionBtnMapping='interaction'
				taskBtnMapping='task'
			/>
			<div className='graph-section'>
				{interactionData && typeData && config && <Pie {...config} />}
			</div>
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
	let config;
	if (interactionData && typeData && Array.isArray(interactionData) && Array.isArray(typeData)) {
		config = {
			// width: 548,
			height: 350,
			appendPadding: 10,
			data: plottingField == 'interaction' ? interactionData : typeData,
			angleField: 'totalCount',
			colorField: 'name',
			color: ['#5564C1', '#56B8BE', '#792B80', '#898EA9'],
			radius: 1,
			innerRadius: 0.7,
			label: null,
			tooltip: {
				domStyles: {
					'g2-tooltip': {
						border: '1px solid #5d6dd1',
						boxSizing: 'border-box',
						boxShadow: '0px 4px 6px rgba(203, 214, 255, 0.25)',
						borderRadius: '16px'
					}
				}
			},
			legend: {
				// layout: "horizontal",
				// maxWidth: 400,
				// maxheight: 400,
				position: 'bottom',
				itemName: {
					style: {
						fontSize: 13
					}
				}
			},
			interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
			statistic: null
		};
	}
	return (
		<>
			<RenderDistributionModal />
			<Card
				loading={!interactionData && !typeData}
				className='dist-card styled-border'
				title={<RenderCardHeader />}
			>
				<CardContent />
			</Card>
		</>
	);
};

export default DistributionView;
