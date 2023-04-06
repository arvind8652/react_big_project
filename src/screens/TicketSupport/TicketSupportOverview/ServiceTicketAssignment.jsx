import { RadialBar } from '@ant-design/charts';
import { Card, Col, Row, Typography } from 'antd';
import React from 'react';
import './ServiceTicketOverview.scss';
import { cardContent } from './ServiceTicketSection';

const { Text } = Typography;

const ServiceTicketAssignment = ({ supportTicketData = [] }) => {
	let data = supportTicketData?.ticketAssignment || [];

	const config = {
		data,
		xField: 'assignTo',
		yField: 'count',
		maxAngle: 270,
		radius: 0.8,
		innerRadius: 0.5,
		tooltip: {
			formatter: (datum) => {
				return {
					name: datum.assignTo,
					value: datum.count
				};
			}
		},
		colorField: 'star',
		color: ({ count }) => {
			if (count > 10000) {
				return '#36c361';
			} else if (count > 1000) {
				return '#2194ff';
			}

			return '#2194ff';
		}
	};
	return (
		<div>
			<Card
				className='dn-nc-mdd-graphs-ser styled-border service-ticket-assignment'
				style={{ height: '200px' }}
			>
				<Row className='left-border'>
					<Col className='ticket-header' span={16}>
						Ticket Assignment
					</Col>
					<Col>80 tickets needs your attention soon</Col>
				</Row>
				<Row style={cardContent}>
					{supportTicketData?.ticketAssignment?.map((e) => {
						return (
							<Col span={5} style={{ marginTop: '20px' }}>
								<Text style={{ color: 'gray' }}>{e?.assignTo}</Text>
								<br></br>
								<Text className='font-style'>{e?.count}</Text>
							</Col>
						);
					})}
					<Col span={4} style={{ height: '100px' }}>
						<RadialBar {...config} />
					</Col>
				</Row>
			</Card>
		</div>
	);
};

export default ServiceTicketAssignment;
