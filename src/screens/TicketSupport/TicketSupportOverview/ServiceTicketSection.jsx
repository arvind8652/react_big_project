import { RadialBar } from '@ant-design/charts';
import { Card, Col, Row, Typography } from 'antd';
import React from 'react';
import './ServiceTicketOverview.scss';
const { Text } = Typography;
export const cardContent = {
	marginTop: '20px',
	padding: '6px'
};
const ServiceTicketSection = ({ supportTicketData }) => {
	let queriesData = supportTicketData?.serviceTickes?.find((o) => o?.serviceType === 'Query');
	let requestData = supportTicketData?.serviceTickes?.find((o) => o?.serviceType === 'Request');
	let complaintData = supportTicketData?.serviceTickes?.find((o) => o?.serviceType === 'Complaint');

	const sum = (data, service) => {
		return Object.values(data ?? {})
			?.filter((item) => item !== service)
			?.reduce((accumulator, value) => {
				return accumulator + value;
			}, 0);
	};

	const filteredQueriesDataSum = Object.values(queriesData ?? {})
		?.filter((item) => item !== 'Query')
		?.reduce((accumulator, value) => {
			return accumulator + value;
		}, 0);
	const filteredRequestDataSum = Object.values(requestData ?? {})
		?.filter((item) => item !== 'Request')
		?.reduce((accumulator, value) => {
			return accumulator + value;
		}, 0);
	const filteredComplaintDataSum = Object.values(complaintData ?? {})
		?.filter((item) => item !== 'Complaint')
		?.reduce((accumulator, value) => {
			return accumulator + value;
		}, 0);

	let filteredQueriesDataSumPer =
		(filteredQueriesDataSum * 100) /
		(filteredQueriesDataSum + filteredRequestDataSum + filteredComplaintDataSum);

	let filteredRequestDataSumPer =
		(filteredRequestDataSum * 100) /
		(filteredQueriesDataSum + filteredRequestDataSum + filteredComplaintDataSum);

	let filteredComplaintDataSumPer =
		(filteredComplaintDataSum * 100) /
		(filteredQueriesDataSum + filteredRequestDataSum + filteredComplaintDataSum);

	let totalPer =
		((queriesData?.closed + requestData?.closed + complaintData?.closed) * 100) /
		(filteredQueriesDataSum + filteredRequestDataSum + filteredComplaintDataSum);

	const data = [
		{
			name: 'Query',
			star: filteredQueriesDataSumPer
		},
		{
			name: 'Req',
			star: filteredRequestDataSumPer
		},
		{
			name: 'Complaint',
			star: filteredComplaintDataSumPer
		}
	];

	const config = {
		data,
		xField: 'name',
		yField: 'star',
		maxAngle: 280,
		radius: 0.8,
		innerRadius: 0.4,
		tooltip: {
			formatter: (datum) => {
				return {
					name: datum.name,
					value: datum.star
				};
			}
		},
		colorField: 'star',
		color: ({ star }) => {
			if (star > 10000) {
				return '#36c361';
			} else if (star > 1000) {
				return '#2194ff';
			}

			return '#2194ff';
		}
	};
	return (
		<div>
			<Card
				className='dn-nc-mdd-graphs-ser styled-border service-ticket-section'
				style={{ height: '200px' }}
			>
				<Row className='left-border'>
					<Col className='ticket-header' span={16}>
						Service Tickets
					</Col>
					<Col>{Math.round(totalPer)}% tickets needs your attention soon</Col>
				</Row>
				<Row style={cardContent}>
					<Col span={5} className='border-right'>
						<Text style={{ color: 'gray' }}>Query</Text>
						<br></br>
						<Text className='font-style'>{sum(queriesData, 'Query')}</Text>
						<Text style={{ color: 'gray', marginLeft: '5px' }}>
							{Math.round(filteredQueriesDataSumPer)}%
						</Text>
					</Col>
					<Col span={6} className='border-right'>
						<Text style={{ color: 'gray' }}>Request</Text>
						<br></br>
						<Text className='font-style'>{sum(requestData, 'Request')}</Text>
						<Text style={{ color: 'gray', marginLeft: '10px' }}>
							{Math.round(filteredRequestDataSumPer)}%
						</Text>
					</Col>
					<Col span={6} style={{ marginTop: '20px' }}>
						<Text style={{ color: 'gray' }}>Complaint</Text>
						<br></br>
						<Text className='font-style'>{sum(complaintData, 'Complaint')}</Text>
						<Text style={{ color: 'gray', marginLeft: '10px' }}>
							{Math.round(filteredComplaintDataSumPer)}%
						</Text>
					</Col>
					<Col span={6} style={{ height: '100px' }}>
						<RadialBar {...config} />
					</Col>
				</Row>
			</Card>
		</div>
	);
};

export default ServiceTicketSection;
