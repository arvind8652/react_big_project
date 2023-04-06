import { useEffect, useState } from 'react';
import './ServiceTicketOverview.scss';
import { Card, Row, Col } from 'antd';
import Canvas from './Canvas';
import ServiceTicketSection from './ServiceTicketSection';
import ServiceTicketAssignment from './ServiceTicketAssignment';
import QueriesSection from './QueriesSection';
import RequestSection from './RequestSection';
import ComplaintsSection from './ComplaintsSection';
import { getTicketSupportOverview } from '../../../api/ticketSupportCreateApi';
import abc from './abc.json';
const SeviceTicketOverview = (props) => {
	const [loading, setLoading] = useState(true);
	const [supportTicketData, setsupportTicketData] = useState([]);

	// TASKS OBJECT API RESPONSE
	const tasks = {
		overdue: supportTicketData?.tickesDue?.overdue,
		daily: supportTicketData?.tickesDue?.today,
		weekly: supportTicketData?.tickesDue?.week,
		monthly: supportTicketData?.tickesDue?.month,
		yearly: supportTicketData?.tickesDue?.overdue
	};

	useEffect(() => {
		getTicketSupportOverview().then((res) => {
			setsupportTicketData(res.data);
			setLoading(false);
		});
	}, []);

	// MIN SIZE OF RADIUS & MAX SIZE OF RADIUS
	const sizes = {
		lowest: 18,
		highest: 30
	};

	// INIT MIN-MAX
	const [minMax, setMinMax] = useState({
		min: 99999,
		max: 0
	});

	// FINDS MIN & MAX of GRAPH - PENDING
	const calcMinMax = () => {
		Object.values(tasks).map((each) => {
			if (minMax.min > each) setMinMax({ ...minMax, min: each });
			if (minMax.max < each) setMinMax({ ...minMax, max: each });
		});
	};

	useEffect(() => {
		// MUST CALL TO CALC IN USE EFFECT
		calcMinMax();
	}, [tasks]);

	// FIND SCALING FACTOR
	const calcMapSize = (current) => {
		if (current === minMax.max) return sizes.highest;
		if (current === minMax.min) return sizes.lowest;

		let perDot = (current * 100) / minMax.max / 100;
		let gap = sizes.highest - sizes.lowest;

		return sizes.lowest + gap * perDot;
	};

	const draw = (ctx, color, canvas, count) => {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.fillStyle = '#000000';
		ctx.beginPath();
		/* ctx.arc(x, y, radius, startAngle, endAngle[, counterclockwise] */
		ctx.arc(41, 30, calcMapSize(count), 0, 2 * Math.PI);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.font = '1.25rem Comic Sans MS';
		ctx.fillStyle = 'white';
		ctx.textBaseline = 'middle';
		ctx.textAlign = 'center';
		ctx.direction = 'rtl';
		ctx.fillText(count, canvas.width / 2, canvas.height / 2);
	};

	const renderCircle =
		tasks &&
		Object.keys(tasks).map((each) => (
			<Canvas key={each} draw={draw} each={each} tasks={tasks} minMax={minMax} />
		));

	const ticketHeader = (
		<div className='ticket_header'>
			<span className='ticket_due'>Tickets Due</span>
			<br />
			<span className='ticket_count'>
				{supportTicketData?.tickesDue?.total} tickets needs your attention soon
			</span>
		</div>
	);

	return (
		<div>
			<Row justify='space-between'>
				<Col span={8}>
					<ServiceTicketSection supportTicketData={supportTicketData} />
				</Col>
				<Col span={8}>
					<div className='sevice-ticketoverview'>
						<Card className='main' title={ticketHeader}>
							{renderCircle}
						</Card>
					</div>
				</Col>
				<Col span={8}>
					<ServiceTicketAssignment supportTicketData={supportTicketData} />
				</Col>
			</Row>

			<Row justify='space-between'>
				<Col span={8}>
					<QueriesSection
						supportTicketData={supportTicketData?.serviceTickes?.find(
							(o) => o?.serviceType === 'Query'
						)}
					/>
				</Col>
				<Col span={8}>
					<RequestSection
						supportTicketData={supportTicketData?.serviceTickes?.find(
							(o) => o?.serviceType === 'Request'
						)}
					/>
				</Col>
				<Col span={8}>
					<ComplaintsSection
						supportTicketData={supportTicketData?.serviceTickes?.find(
							(o) => o?.serviceType === 'Complaint'
						)}
					/>
				</Col>
			</Row>
		</div>
	);
};

export default SeviceTicketOverview;
