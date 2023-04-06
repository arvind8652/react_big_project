import { useState, useEffect } from 'react';
import { Badge, Card, Col, Row, Typography } from 'antd';
import { Bullet } from '@ant-design/charts';
import abc from './abc.json';
import './ServiceTicketOverview.scss';

const { Text } = Typography;
const RequestSection = ({ supportTicketData = [] }) => {
	const [queriesData, setQueriesData] = useState(supportTicketData);
	let conMissGraphConfig;

	let average =
		(supportTicketData?.open + supportTicketData?.overDue + supportTicketData?.closed + 0) / 100;

	queriesData['bulletMeasureField'] = [
		supportTicketData?.open / average,
		supportTicketData?.overDue / average,
		supportTicketData?.closed / average,
		0 / average
	];
	queriesData['bulletRangeField'] = [0, 50, 100];
	queriesData['bulletTargetField'] = 0;

	conMissGraphConfig = {
		height: 16,
		padding: 6,
		data: [queriesData],
		measureField: 'bulletMeasureField',
		rangeField: 'bulletRangeField',
		targetField: 'bulletTargetField',
		// xField: 'title',
		color: {
			range: ['#ffffff', '#ffffff', '#ffffff'],
			measure: ['#FFFF00', '#FF0000', '#32CD32', '#808080']
		},
		label: {
			measure: {
				position: 'middle',
				style: {
					fill: '#fff'
				},
				formatter: (val) => {
					return null;
				}
			}
		},
		xAxis: {
			line: null,
			label: null
		},

		yAxis: false,
		tooltip: {
			showMarkers: false,
			showContent: false
			// shared: true,
		}
	};

	return (
		<div>
			<Card className='dn-nc-mdd-graphs-ser request-section' style={{ height: '200px' }}>
				{/* <Row align='middle' justify='space-between'> */}
				<Row className='left-border'>
					<Col className='ticket-header' span={12}>
						Request
					</Col>
				</Row>
				<Row style={{ marginTop: '40px', padding: '10px' }}>
					<Col span={6} className='dot-text-alignment'>
						<Badge color='#FFFF00' className='dot-alignment' />
						<Col className='text-alignment'>
							<Text>Open</Text>
							<Text className='text-style'>{supportTicketData?.open}</Text>
						</Col>
					</Col>
					<Col span={6} className='dot-text-alignment'>
						<Badge color='#FF0000' className='dot-alignment' />
						<Col className='text-alignment'>
							<Text>overdue</Text>
							<Text className='text-style'>{supportTicketData?.overDue}</Text>
						</Col>
					</Col>
					<Col span={6} className='dot-text-alignment'>
						<Badge color='#32CD32' className='dot-alignment' />
						<Col className='text-alignment'>
							<Text>closed</Text>
							<Text className='text-style'>{supportTicketData?.closed}</Text>
						</Col>
					</Col>
					{/* <Col span={6} className='dot-text-alignment'>
						<Badge color='#808080' />
						<Col className='text-alignment'>
							<Text>deffered</Text>
							<Text className='text-style'>{supportTicketData?.deffered ?? 0}</Text>
						</Col>
					</Col> */}
				</Row>
				<Row style={{ marginTop: '20px' }}>
					<Col style={{ height: '100px' }}>
						<div>{conMissGraphConfig && <Bullet {...conMissGraphConfig} />}</div>
					</Col>
				</Row>
			</Card>
		</div>
	);
};

export default RequestSection;
