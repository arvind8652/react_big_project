import { React, useState, useEffect } from 'react';
import { getDateFormat } from '../../utils/utils';
import { connect } from 'react-redux';
import moment from 'moment';

import './VerticalTimeline.scss';
import { Timeline } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronDoubleDown,
	faChevronDoubleUp,
	faCheck,
	faAngleDoubleUp
} from '@fortawesome/pro-regular-svg-icons';
import { FileDoneOutlined, ClockCircleOutlined } from '@ant-design/icons';

const defaultValue = [
	[
		{
			id: null,
			inputDateTime: '2021-01-05T00:00:00',
			reftype: null,
			firstName: null,
			createdMessages: null,
			message: 'Order Confirmed',
			version: null,
			type: null,
			amount: null
		},
		{
			id: null,
			inputDateTime: '2021-01-05T00:00:00',
			reftype: null,
			firstName: null,
			createdMessages: null,
			message: 'Order Proccessed',
			version: null,
			type: null,
			amount: null
		},
		{
			id: null,
			inputDateTime: '2021-01-05T00:00:00',
			reftype: null,
			firstName: null,
			createdMessages: null,
			message: 'Order Authorized',
			version: null,
			type: null,
			amount: null
		},
		{
			id: null,
			inputDateTime: '2021-01-05T00:00:00',
			reftype: null,
			firstName: null,
			createdMessages: null,
			message: 'Disclaimer Accepted',
			version: null,
			type: null,
			amount: null
		},
		{
			id: null,
			inputDateTime: '2021-01-05T00:00:00',
			reftype: null,
			firstName: null,
			createdMessages: null,
			message: 'Order Placed',
			version: null,
			type: 'Buy',
			amount: 150000
		}
	]
];

const styles = {
	timelineSection: { fontSize: '1rem', marginLeft: '0.5em', marginBottom: '0' },
	messageOne: { color: '#696A91' },
	messageTwo: { color: 'rgba(34, 39, 71, 1)', fontWeight: '600' }
};

const GenerateDotIcon = ({ type }) => {
	const styleBase = { borderRadius: '50%' };
	const styleMain = {
		backgroundColor: '#D9DFFF',
		color: '#354081',
		width: '1.75rem',
		height: '1.75rem'
	};
	const styleFavicon = {
		fontSize: '1.45rem',
		padding: '0.45rem'
	};
	const styleAntD = {
		fontSize: '0.75rem',
		paddingTop: '0.4rem'
	};
	switch (type) {
		case 'Confirmed':
			return (
				<FontAwesomeIcon
					icon={faCheck}
					style={{
						...styleBase,
						fontSize: '1.75rem',
						padding: '0.5rem',
						backgroundColor: 'green',
						color: 'white'
					}}
				/>
			);
		case 'Proccessed':
		case 'Accepted':
			return (
				<FontAwesomeIcon
					icon={faAngleDoubleUp}
					style={{ ...styleBase, ...styleFavicon, ...styleMain }}
				/>
			);
		case 'Authorized':
			return <FileDoneOutlined style={{ ...styleAntD, ...styleBase, ...styleMain }} />;
		case 'Placed':
			return <div style={{ ...styleAntD, ...styleBase, ...styleMain }}>BG</div>;
		default:
			return <ClockCircleOutlined style={{ ...styleAntD, ...styleBase }} />;
	}
};

const OrderVerticalTimeline = ({ timelineData = defaultValue }) => {
	const [isExpanded, toggleExpanded] = useState(true);
	const [timelineRef, setTimelineRef] = useState();

	useEffect(() => {
		setTimelineRef(document.querySelector('.verticalTimeline'));
	}, []);

	const expandTheTimeline = () => {
		toggleExpanded(!isExpanded);

		isExpanded ? (timelineRef.style.height = 'max-content') : (timelineRef.style.height = '200px');
	};

	return (
		<div>
			<Timeline
				mode={'left'}
				style={{
					width: '42vw',
					paddingTop: '2.2em',
					height: '200px',
					overflow: 'hidden'
				}}
				className='verticalTimeline'
			>
				{timelineData.map((eachTime) => {
					let message = eachTime.message.split(' ');
					return (
						<Timeline.Item
							label={
								<span
									style={{
										fontSize: '1rem',
										marginRight: '1em',
										color: '#696A91'
									}}
								>
									{moment(eachTime.inputDateTime).format(getDateFormat())}
								</span>
							}
							dot={<GenerateDotIcon type={message[1]} />}
							style={{ paddingLeft: '0' }}
						>
							<>
								<p style={styles.timelineSection}>
									<span style={styles.messageOne}>{message[0]}</span>{' '}
									<span style={styles.messageTwo}>{message[1]}</span>
								</p>
								{eachTime.type && eachTime.amount ? (
									<p style={styles.timelineSection}>
										<span style={styles.messageOne}>Type</span>{' '}
										<span style={styles.messageTwo}>{eachTime.type}</span> |{' '}
										<span style={styles.messageOne}>Amount</span>{' '}
										<span style={styles.messageTwo}>${eachTime.amount}</span>
									</p>
								) : (
									''
								)}
							</>
						</Timeline.Item>
					);
				})}
			</Timeline>
			<p
				style={{
					texDecorationLine: 'underline',
					color: '#5D6DD1',
					marginLeft: '14vw'
				}}
				onClick={() => {
					expandTheTimeline();
				}}
			>
				{isExpanded ? (
					<>
						<FontAwesomeIcon icon={faChevronDoubleDown} style={{ position: 'absolute' }} />
						<span style={{ paddingLeft: '20px' }}>Expand Timeline</span>
					</>
				) : (
					<>
						<FontAwesomeIcon icon={faChevronDoubleUp} style={{ position: 'absolute' }} />
						<span style={{ paddingLeft: '20px' }}>Contract Timeline</span>
					</>
				)}
			</p>
		</div>
	);
};

const mapStateToProps = (state) => ({
	timelineData: state.tradeBookView.tradeBookViewVerticalTimelineDetails
});

export default connect(mapStateToProps)(OrderVerticalTimeline);
