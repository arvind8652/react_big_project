import { useState, useEffect } from 'react';
import { Col, Row, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/pro-light-svg-icons';
import { Column } from '@ant-design/charts';
import styled from 'styled-components';
import { ScModal } from '../../components/StyledComponents/genericElements';
import PlottingAttributeSelector from '../../components/PlottingAttributeSelector/PlottingAttributeSelector';
import NumberFormat from '../../constants/NumberFormat';
import { getOpporBreakupApi } from '../../api/opportunityOverviewApi';
import RenderPlottingCategorySelector from './RenderPlottingCategorySelector';

const RenderOpporBreakupCard = (props) => {
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
					<TooltipAttribute align='top' justify='space-between' key={item.value}>
						<Col span={10}>
							<span>
								<Row justify='space-between' align='middle' style={{ width: '100%' }}>
									<div>{item.name}</div>
									<div>:</div>
								</Row>
							</span>
						</Col>
						<Col span={13}>
							{/* <strong>{"₱"} */}
							<strong>
								{obData?.currencySymbol}
								{NumberFormat(props.authData, item.value)}
							</strong>
						</Col>
					</TooltipAttribute>
				))}
			</>
		);
		const CountAttr = () => (
			<>
				{data.map((item) => (
					<TooltipAttribute align='top' justify='space-between' key={item.value}>
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
			<Card title={<RenderCardHeader />} className='styled-border' loading={loading || !config}>
				{obData && <CardContent />}
			</Card>
		</div>
	);
};

export default RenderOpporBreakupCard;
