import { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Row } from 'antd';
import Col from 'antd/es/grid/col';
import styled from 'styled-components';
import PlottingAttributeSelector from '../../components/PlottingAttributeSelector/PlottingAttributeSelector';
import { ScModal } from '../../components/StyledComponents/genericElements';
import RenderPlottingCategorySelector from './RenderPlottingCategorySelector';
import { faExternalLink } from '@fortawesome/pro-light-svg-icons';

import { getOpporDistributionApi } from '../../api/opportunityOverviewApi';
import NumberFormat from '../../constants/NumberFormat';

const RenderDistributionCard = (props) => {
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
				console.error(error);
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
					{plottingField === 'value' && (
						<Row>( {NumberFormat(props.authData, data.targetAmount)})</Row>
					)}
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
			data: distributionData[plottingCategory],
			angleField: 'value',
			colorField:
				plottingCategory === 'opporstagedistribution'
					? 'opportunityStage'
					: plottingCategory === 'opporentitydistribution'
					? 'entityType'
					: 'opportunityType',
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
						<Col span={18}>Distribution</Col>
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
			<Card
				loading={!distributionData}
				className='dist-card styled-border'
				title={<RenderCardHeader />}
			>
				<CardContent />
			</Card>
		</>
	);
};

export default RenderDistributionCard;
