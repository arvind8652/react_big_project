import { useState, useEffect } from 'react';
import { Col, Row, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/pro-light-svg-icons';
import { Scatter } from '@ant-design/charts';
import styled from 'styled-components';
import { ScModal } from '../../components/StyledComponents/genericElements';
import NumberFormat from '../../constants/NumberFormat';
import AvatarLogo from '../../components/Avatar/AvatarLogo';
import { AvatarSize } from '../../constants/AvatarSize';
import { getAgingAnalysisApi } from '../../api/opportunityOverviewApi';

const RenderAgingAnalysisCard = (props) => {
	const [ageingAnalysisGraphData, setAgingAnalysisGraphData] = useState();
	const [showModal, setShowModal] = useState(false);
	useEffect(() => {
		getAgingAnalysisApi().then((res) => {
			setAgingAnalysisGraphData(res.data);
		});
	}, []);
	const toggleShowModal = () => {
		setShowModal(!showModal);
	};
	let config;
	const RenderTooltip = (data) => {
		const TooltipWrapper = styled.div`
			min-width: 272px;
			padding: 5px;
		`;
		const TooltipAttribute = styled(Row)`
			margin: 6px 0;
		`;
		const ProbabilityAttr = () => (
			<TooltipAttribute align='top' justify='space-between'>
				<Col span={13}>
					<span>
						<Row justify='space-between' align='middle' style={{ width: '100%' }}>
							<div>Probability</div>
							<div>:</div>
						</Row>
					</span>
				</Col>
				<Col span={10}>
					<strong>{data.probability}</strong>
				</Col>
			</TooltipAttribute>
		);
		const AgeAttr = () => (
			<TooltipAttribute align='top' justify='space-between'>
				<Col span={13}>
					<span>
						<Row justify='space-between' align='middle' style={{ width: '100%' }}>
							<div>Age</div>
							<div>:</div>
						</Row>
					</span>
				</Col>
				<Col span={10}>
					<strong>{data.agingDays} days</strong>
				</Col>
			</TooltipAttribute>
		);
		const OpportunityTypeAttr = () => (
			<TooltipAttribute align='top' justify='space-between'>
				<Col span={13}>
					<span>
						<Row justify='space-between' align='middle' style={{ width: '100%' }}>
							<div>Opportunity Type</div>
							<div>:</div>
						</Row>
					</span>
				</Col>
				<Col span={10}>
					<strong>{data.opportunityType}</strong>
				</Col>
			</TooltipAttribute>
		);
		const ValueAttr = () => (
			<TooltipAttribute align='top' justify='space-between'>
				<Col span={13}>
					<span>
						<Row justify='space-between' align='middle' style={{ width: '100%' }}>
							<div>Value</div>
							<div>:</div>
						</Row>
					</span>
				</Col>
				<Col span={10}>
					{/* <strong>{"₱"} */}
					<strong>
						{data?.currencySymbol}
						{NumberFormat(props.authData, data.targetAmount)}
					</strong>
				</Col>
			</TooltipAttribute>
		);
		const ClientProspectProfileAttr = () => (
			<TooltipAttribute align='top' justify='space-between'>
				<Col span={13}>
					<span>
						<Row justify='space-between' align='middle' style={{ width: '100%' }}>
							<div>Client / Prospect</div>
							<div>:</div>
						</Row>
					</span>
				</Col>
				<Col span={10}>
					<Row align='middle' justify='space-between' className='profile'>
						<Col span={6}>
							<AvatarLogo
								imgsrc={data.profileImage}
								profileName={data.ProfileInitial}
								avatarSize={AvatarSize.xs}
								style={{
									color: '#f56a00',
									backgroundColor: '#fde3cf'
								}}
							/>
						</Col>
						<Col span={16} className='profile-details'>
							<strong>{data.clientProspectName}</strong>
							<div className='profile-tag'>
								{data.tagName.charAt(0).toUpperCase() + data.tagName.substring(1).toLowerCase()}
							</div>
						</Col>
					</Row>
				</Col>
			</TooltipAttribute>
		);
		return (
			<TooltipWrapper>
				<ProbabilityAttr />
				<AgeAttr />
				<OpportunityTypeAttr />
				<ValueAttr />
				<ClientProspectProfileAttr />
			</TooltipWrapper>
		);
	};
	if (ageingAnalysisGraphData && Array.isArray(ageingAnalysisGraphData)) {
		config = {
			appendPadding: 30,
			data: ageingAnalysisGraphData,
			xField: 'agingDays',
			yField: 'probability',
			colorField: 'opportunityType',
			color: ['#5564C1', '#792B80', '#56B8BE'],
			sizeField: 'targetAmount',
			size: [4, 25],
			shape: 'circle',
			xAxis: {
				min: 0,
				tickCount: 5,
				grid: { line: { style: { stroke: '#aaa', lineDash: [4, 4] } } },
				line: { style: { stroke: '#aaa', lineDash: [4, 4] } },
				label: {
					formatter: (val) => {
						return val !== '0' ? val + ' days' : val;
					}
				},
				hideFirstLine: true,
				hideLastLine: true
			},
			yAxis: {
				min: 0,
				max: 100,
				tickInterval: 20,
				grid: { line: { style: { stroke: '#aaa', lineDash: [4, 4] } } },
				line: { style: { stroke: '#aaa', lineDash: [4, 4] } },
				hideFirstLine: true,
				hideLastLine: true
			},
			tooltip: {
				showCrosshairs: true,
				showTitle: false,
				showMarkers: false,
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
			quadrant: {
				xBaseline: 0,
				yBaseline: 0,
				lineStyle: {
					stroke: '#ffffff'
				}
			},
			legend: {
				flipPage: false
			}
		};
	}
	const CardTitle = () => {
		return (
			<Row
				align='middle'
				justify='space-around'
				style={{ width: '25%', padding: '0 12px' }}
				onClick={() => {
					toggleShowModal();
				}}
			>
				<Col span={21}>Ageing Analysis</Col>
				{!showModal && (
					<Col span={2}>
						<FontAwesomeIcon icon={faExternalLink} />
					</Col>
				)}
			</Row>
		);
	};
	const RenderAgeingAnalysisModal = () => (
		<ScModal
			title={<CardTitle />}
			visible={showModal}
			onCancel={toggleShowModal}
			onOk={toggleShowModal}
			footer={null}
			width='70vw'
			borderRadius='16px'
			centered
		>
			{ageingAnalysisGraphData && <Scatter {...config} />}
		</ScModal>
	);
	return (
		<div>
			<RenderAgeingAnalysisModal />
			<Card loading={!ageingAnalysisGraphData} className='styled-border' title={<CardTitle />}>
				{ageingAnalysisGraphData && <Scatter {...config} />}
			</Card>
		</div>
	);
};

export default RenderAgingAnalysisCard;
