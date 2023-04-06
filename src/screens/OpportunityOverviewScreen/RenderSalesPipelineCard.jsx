import { useState, useEffect } from 'react';
import { Col, Row, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/pro-light-svg-icons';
import { Funnel } from '@ant-design/charts';
import styled from 'styled-components';
import { ScModal, ScRow } from '../../components/StyledComponents/genericElements';
import { getSalesPipelineApi } from '../../api/opportunityOverviewApi';
import PlottingAttributeSelector from '../../components/PlottingAttributeSelector/PlottingAttributeSelector';
import NumberFormat from '../../constants/NumberFormat';

const RenderSalesPipelineCard = (props) => {
	const [loading, setLoading] = useState(true);
	const [salesPipelineData, setSalesPipelineData] = useState();
	const [plottingField, setPlottingField] = useState('targetAmount');
	const [showModal, setShowModal] = useState(false);
	const toggleShowModal = () => {
		setShowModal(!showModal);
	};
	let config;
	useEffect(() => {
		getSalesPipelineApi().then((res) => {
			setSalesPipelineData(res.data);
			setLoading(false);
		});
	}, []);
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
					<TooltipAttribute align='middle' justify='space-between' key={item.value}>
						<Col span={13}>
							<span>
								<Row justify='space-between' align='middle'>
									<Col span={23}>
										{/* <Row
                    justify="space-between"
                    align="middle"
                    style={{ width: "100%" }}
                  > */}
										<div>{item.name}</div>
										{/* </Row> */}
									</Col>
									<Col span={1}>:</Col>
								</Row>
							</span>
						</Col>
						<Col span={10}>
							{/* <strong>{"₱"} */}
							<strong>
								{item.data.currencySymbol}
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
				{plottingField === 'targetAmount' ? <ValueAttr /> : <CountAttr />}
			</TooltipWrapper>
		);
	};
	if (salesPipelineData && Array.isArray(salesPipelineData) && salesPipelineData.length > 0) {
		config = {
			autoFit: true,
			appendPadding: [10, 0, 0, 0],
			data: salesPipelineData.length > 0 ? salesPipelineData : [{}],
			xField: 'stage',
			yField: plottingField,
			color: ['#5564C1', '#70C6CB', '#354081', '#56B8BE'],
			legend: false,
			dynamicHeight: true,
			conversionTag: false,
			// conversionTag: {
			//   offsetX: 10,
			//   offsetY: 0,
			//   formatter: (data) => data.stage,
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
			},
			// tooltip: {
			//   domStyles: {
			//     "g2-tooltip": {
			//       border: "1px solid #5d6dd1",
			//       boxSizing: "border-box",
			//       boxShadow: "0px 4px 6px rgba(203, 214, 255, 0.25)",
			//       borderRadius: "16px",
			//     },
			//   },
			//   formatter: (data) => {
			//     return {
			//       name: data.stage,
			//       value:
			//         plottingField === "targetAmount"
			//           ? currencyFormatter(data.targetAmount, "US")
			//           : data.opporCount,
			//     };
			//   },
			// },
			label: {
				formatter: (data) =>
					plottingField === 'targetAmount'
						? NumberFormat(props.authData, data.targetAmount)
						: data.opporCount
			}
		};
	}
	const CardTitle = () => {
		return (
			<ScRow
				height='100%'
				width='100%'
				align='middle'
				justify='space-between'
				style={{ width: '50%', padding: '0 12px' }}
				onClick={() => {
					toggleShowModal();
				}}
			>
				<Col span={21}>Sales Pipeline</Col>
				{!showModal && (
					<Col span={2}>
						<FontAwesomeIcon icon={faExternalLink} />
					</Col>
				)}
			</ScRow>
		);
	};
	const CardContent = () => (
		<>
			<PlottingAttributeSelector
				plottingField={plottingField}
				setPlottingField={setPlottingField}
				valueBtnText='Value'
				countBtnText='Count'
				valueBtnMapping='targetAmount'
				countBtnMapping='opporCount'
			/>
			{salesPipelineData && config && <Funnel {...config} />}
		</>
	);
	const RenderSalesPipelineModal = () => (
		<ScModal
			title={<CardTitle />}
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
		<div>
			<RenderSalesPipelineModal />
			<Card title={<CardTitle />} className='styled-border' loading={loading}>
				<CardContent />
			</Card>
		</div>
	);
};

export default RenderSalesPipelineCard;
