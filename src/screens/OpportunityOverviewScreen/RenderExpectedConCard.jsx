import { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import { TinyArea } from '@ant-design/charts';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import { getCurrPipelineApi, getExpectedConApi } from '../../api/opportunityOverviewApi';
import NumberFormat from '../../constants/NumberFormat';
import { theme } from '../../theme';

const RenderExpectedConCard = (props) => {
	const [loading, setLoading] = useState(true);
	const [expectedConData, setExpectedConData] = useState();
	const [currPipelineData, setCurrPipelineData] = useState();
	const [expectedConGraphConfig, setExpectedConGraphConfig] = useState({});

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
							<div>Value</div>
							<div>:</div>
						</Row>
					</span>
				</Col>
				<Col span={14}>
					<strong>{'₱'} </strong> {data && NumberFormat(props.authData, data.value)}
				</Col>
			</TooltipAttribute>
		);
		const DateAttr = () => {
			let month;
			if (
				expectedConData &&
				Array.isArray(expectedConData) &&
				expectedConData.length > 0
				// expectedConData.filter(
				//   (item) => item.targetAmount.toString() === data.value
				// )[0]
			) {
				month = moment(
					expectedConData.filter((item, index) => index.toString() === data.title)[0].dueDate
				).format('Do MMM YY');
			}
			return (
				<TooltipAttribute align='top' justify='space-between'>
					<Col span={9}>
						<span>
							<Row justify='space-between' align='middle' style={{ width: '100%' }}>
								<div>Due Date</div>
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
				<DateAttr />
			</TooltipWrapper>
		);
	};

	useEffect(() => {
		axios
			.all([getExpectedConApi(), getCurrPipelineApi()])
			.then(
				axios.spread((...responses) => {
					setExpectedConData(
						responses[0].data.sort((a, b) => {
							return new Date(a.dueDate) - new Date(b.dueDate);
						})
					);
					setCurrPipelineData(responses[1].data);
					// use/access the results
				})
			)
			.catch((errors) => {
				// react on errors.
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		if (expectedConData && expectedConData !== null && Array.isArray(expectedConData)) {
			setExpectedConGraphConfig({
				width: '100%',
				height: 72,
				data: expectedConData.map(
					(item) => item !== null && item.targetAmount !== null && item.targetAmount
				),
				smooth: true,
				// areaStyle: function areaStyle() {
				//   return { fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff" };
				// },
				// xField: "month",
				// yField: "investamount",
				// xAxis: { tickCount: 5 },
				tooltip: {
					customContent: (title, data) => {
						return data && Array.isArray(data) && data.length > 0 ? RenderTooltip(data[0]) : null;
					}
				}
			});
		}
	}, [expectedConData]);

	return (
		<Card
			title={<div>Expected Conversion</div>}
			className='ec-graph-card styled-border'
			loading={loading}
		>
			{!loading && currPipelineData && (
				<>
					<div className='amount' style={theme.primaryHeader}>
						{/* {"₱"} */}
						{currPipelineData?.currencySymbol}
						{currPipelineData &&
							currPipelineData !== null &&
							currPipelineData.targetAmount !== null &&
							NumberFormat(props.authData, currPipelineData.targetAmount)}
					</div>
					<div className='title' style={theme.secondaryHeader}>
						Current Pipeline Value
					</div>
					<div className='graph-section'>
						{expectedConData && <TinyArea {...expectedConGraphConfig} />}
					</div>
					<div className='total-opportunities'>
						<span style={theme.primaryHeader}>{currPipelineData.totaloppor}</span>{' '}
						<div style={theme.secondaryHeader}>Opportunities</div>
					</div>
					<div className='subtitle' style={theme.secondaryHeader}>
						You are expecting {/* {"₱"} */}
						{currPipelineData?.currencySymbol}
						{currPipelineData &&
							currPipelineData.subheading &&
							currPipelineData.subheading !== null &&
							NumberFormat(props.authData, currPipelineData.subheading)}{' '}
						in next 6 months
					</div>
				</>
			)}
		</Card>
	);
};

export default RenderExpectedConCard;
