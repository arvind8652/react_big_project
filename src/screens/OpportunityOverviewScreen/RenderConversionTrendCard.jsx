import { useState, useEffect } from 'react';
import { Col, Row, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/pro-light-svg-icons';
import { Area } from '@ant-design/charts';
import styled from 'styled-components';
import moment from 'moment';
import { ScModal } from '../../components/StyledComponents/genericElements';
import NumberFormat from '../../constants/NumberFormat';
import { kFormatter } from '../../utils/utils';
import { getConStrikeRateApi, getConversionTrendApi } from '../../api/opportunityOverviewApi';
import RenderPlottingCategorySelector from './RenderPlottingCategorySelector';
import PlottingAttributeSelector from '../../components/PlottingAttributeSelector/PlottingAttributeSelector';

const RenderConversionTrendCard = (props) => {
	const [showModal, setShowModal] = useState(false);
	const [conversionTrendData, setConversionTrendData] = useState();
	const [plottingCategory, setPlottingCategory] = useState('expected');
	const [plottingField, setPlottingField] = useState('value');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		plottingCategory === 'expected' &&
			getConversionTrendApi()
				.then((res) => {
					setConversionTrendData(res.data);
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => {
					setLoading(false);
				});

		plottingCategory === 'historic' &&
			getConStrikeRateApi()
				.then((res) => setConversionTrendData(res.data.graphData))
				.catch((err) => {
					console.log(err);
				})
				.finally(() => {
					setLoading(false);
				});
		setPlottingField('value');
	}, [plottingCategory]);

	let config;
	const toggleShowModal = () => {
		setShowModal(!showModal);
	};
	if (conversionTrendData && conversionTrendData.length > 0 && !loading) {
		const getYField = () => {
			if (plottingCategory === 'expected') {
				if (plottingField === 'value') return 'targetAmount';
				else return 'opporCount';
			} else {
				if (plottingField === 'value') return 'investamount';
				else return 'opporCount';
			}
		};
		const RenderTooltip = (data) => {
			const TooltipWrapper = styled.div`
				min-width: 148px;
				padding: 5px;
			`;
			const TooltipAttribute = styled(Row)`
				margin: 6px 0;
			`;
			const ValueAttr = () => (
				<TooltipAttribute align='top' justify='space-between'>
					<Col span={8}>
						<span>
							<Row justify='space-between' align='middle' style={{ width: '100%' }}>
								<div>Value</div>
								<div>:</div>
							</Row>
						</span>
					</Col>
					<Col span={14}>
						{/* <strong>{"₱"} */}
						<strong>
							{data?.currencySymbol}
							{plottingCategory === 'expected'
								? NumberFormat(props.authData, data.targetAmount)
								: NumberFormat(props.authData, data.investamount)}
						</strong>
					</Col>
				</TooltipAttribute>
			);
			const CountAttr = () => (
				<TooltipAttribute align='top' justify='space-between'>
					<Col span={8}>
						<span>
							<Row justify='space-between' align='middle' style={{ width: '100%' }}>
								<div>Count</div>
								<div>:</div>
							</Row>
						</span>
					</Col>
					<Col span={14}>
						<strong>{data.opporCount}</strong>
					</Col>
				</TooltipAttribute>
			);
			const DateAttr = () => (
				<TooltipAttribute align='top' justify='space-between'>
					<Col span={8}>
						<span>
							<Row justify='space-between' align='middle' style={{ width: '100%' }}>
								<div>Date</div>
								<div>:</div>
							</Row>
						</span>
					</Col>
					<Col span={14}>
						<strong>
							{moment(plottingCategory === 'expected' ? data.dueDate : data.date).format(
								'DD MMM YYYY'
							)}
						</strong>
					</Col>
				</TooltipAttribute>
			);
			return (
				<TooltipWrapper>
					{plottingField === 'value' ? <ValueAttr /> : <CountAttr />}
					<DateAttr />
				</TooltipWrapper>
			);
		};
		config = {
			appendPadding: 30,
			smooth: true,
			data: conversionTrendData,
			xField: plottingCategory === 'expected' ? 'dueDate' : 'date',
			yField: getYField(),
			point: {
				// color: "black",
				style: { fill: '#56B8BE' },
				interactions: [{ type: 'element-active' }],
				state: {
					// inactive
					default: {
						style: {
							fill: '#56B8BE'
						}
					},
					//active
					active: {
						style: {
							fill: '#56B8BE'
						}
					}
				}
			},
			color: '#56B8BE',
			lineStyle: { file: '#56B8BE', stroke: '#56B8BE' },
			xAxis: {
				// tickCount: 5,
				grid: { line: { style: { stroke: '#aaa', lineDash: [4, 4] } } },
				line: { style: { stroke: '#aaa', lineDash: [4, 4] } },
				label: {
					formatter: (text) => {
						return moment(text).format('Do MMM YY');
					}
				}
			},
			yAxis: {
				label: {
					grid: { line: { style: { stroke: '#56B8BE', lineDash: [4, 4] } } },
					line: { style: { stroke: '#56B8BE', lineDash: [4, 4] } },
					formatter: (val) => {
						return val ? (plottingField === 'value' ? '$ ' + kFormatter(val) : val) : null;
					}
				}
			},
			tooltip: {
				showTitle: false,
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
					return data[0] ? RenderTooltip(data[0].data) : null;
				}
			},
			areaStyle: function areaStyle() {
				return {
					fill: 'l(270) 0:#ffffff 0.5:#56B8BE 1:#56B8BE'
				};
			}
		};
	}
	const RenderCardHeader = () => {
		const options = [
			{ value: 'expected', label: 'Expected' },
			{ value: 'historic', label: 'Historic' }
		];
		return (
			<Row align='middle' justify='space-between' style={{ width: '100%', padding: '0 12px' }}>
				<Col
					onClick={() => {
						toggleShowModal();
					}}
				>
					<Row align='middle' justify='space-between'>
						<Col span={22}>Conversion Trend</Col>
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
			{conversionTrendData && config && <Area {...config} />}
		</>
	);
	const RenderConversionTrendModal = () => (
		<ScModal
			title={<RenderCardHeader />}
			visible={showModal}
			onCancel={toggleShowModal}
			onOk={toggleShowModal}
			footer={null}
			width='70vw'
			padding='0 24px 72px'
			borderRadius='16px'
			centered
		>
			<CardContent />
		</ScModal>
	);
	return (
		<div>
			<RenderConversionTrendModal />
			<Card loading={loading} title={<RenderCardHeader />} className='styled-border'>
				<CardContent />
			</Card>
		</div>
	);
};

export default RenderConversionTrendCard;
