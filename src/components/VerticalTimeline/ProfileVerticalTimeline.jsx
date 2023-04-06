import { React, useEffect, useState, useRef } from 'react';
import { getDateFormat } from '../../utils/utils';

import './VerticalTimeline.scss';
import 'antd/dist/antd.css';
import { Button, Col, Timeline } from 'antd';
import {
	faCaretUp,
	faCaretDown,
	faHexagon,
	faHandshake,
	faCommentsAlt,
	faPhoneVolume
} from '@fortawesome/pro-solid-svg-icons';
import {
	faPencilAlt,
	faChevronDoubleDown,
	faChevronDoubleUp
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { faChevronUp, faChevronDown } from '@fortawesome/pro-light-svg-icons';

const defaultValue = [
	{
		inputDateTime: '2021-07-02T11:57:02.833',
		message: 'Stage changed to Proposal',
		type: 'CREATED'
	},
	{
		inputDateTime: '2021-07-02T11:57:02.833',
		message: 'Stage changed to Proposal',
		type: 'CREATED'
	}
];
const ProfileVerticalTimeline = ({ timelineData = defaultValue }) => {
	const [show, setShow] = useState(false);
	const TimelineUpdateIcon = () => (
		<div
			style={{
				backgroundColor: '#E5EBFF',
				padding: '6px',
				borderRadius: '50%'
			}}
		>
			<FontAwesomeIcon
				icon={faPencilAlt}
				className='opportunityViewBodyDetailIcon'
				style={{ color: '#696A91' }}
			/>
		</div>
	);

	const TimelineCreatedIcon = () => (
		<div
			style={{
				backgroundColor: '#05BC6A',
				padding: '6px',
				borderRadius: '50%'
			}}
		>
			<FontAwesomeIcon
				icon={faHexagon}
				className='opportunityViewBodyDetailIcon'
				style={{ color: 'white' }}
			/>
		</div>
	);

	const TimelineMeetingIcon = () => (
		<div
			style={{
				backgroundColor: '#05BC6A',
				padding: '6px',
				borderRadius: '50%'
			}}
		>
			<FontAwesomeIcon
				icon={faHandshake}
				className='opportunityViewBodyDetailIcon'
				style={{ color: 'white' }}
			/>
		</div>
	);

	const TimelineChatIcon = () => (
		<div
			style={{
				backgroundColor: '#05BC6A',
				padding: '6px',
				borderRadius: '50%'
			}}
		>
			<FontAwesomeIcon
				icon={faCommentsAlt}
				className='opportunityViewBodyDetailIcon'
				style={{ color: 'white' }}
			/>
		</div>
	);

	const TimelineCallIcon = () => (
		<div
			style={{
				backgroundColor: '#BC4705',
				padding: '6px',
				borderRadius: '50%'
			}}
		>
			<FontAwesomeIcon
				icon={faPhoneVolume}
				className='opportunityViewBodyDetailIcon'
				style={{ color: 'white' }}
			/>
		</div>
	);

	const LabelDiv = (label) => {
		return (
			// label && (
			<div style={{ marginRight: '25px', width: 'auto' }} className='verticalTimelineDetailText'>
				{label}
			</div>
			//   )
		);
	};

	if (!timelineData || timelineData.count === 0) {
		return (
			<Col className='opporunityDescriptionText' type='flex' align='middle' span={24}>
				No Records Found
			</Col>
		);
	}
	return (
		<div>
			<div className='opportunities-timeline' style={{ display: 'flex', justifyContent: 'start' }}>
				<Timeline mode='left' style={{ marginTop: '25px' }}>
					{(show ? timelineData : timelineData.slice(0, 4)).map((item, index) => {
						return (
							<Timeline.Item
								key={index}
								// className="opportunities-timeline-item"
								style={{ marginBottom: '15px' }}
								className='descriptionText'
								label={
									// <LabelDiv
									//     label={
									//         item.inputDateTime &&
									//         moment(item.inputDateTime).format(getDateFormat())
									//     }
									// />
									<span style={{ marginRight: '15px' }}>
										{moment(item.inputDateTime).format(getDateFormat())}
									</span>
								}
								dot={
									item.type === 'CREATED' ? (
										<TimelineCreatedIcon />
									) : item.type === 'UPDATED' ? (
										<TimelineUpdateIcon />
									) : item.type === 'MEETING' ? (
										<TimelineMeetingIcon />
									) : item.type === 'CHAT' ? (
										<TimelineChatIcon />
									) : (
										<TimelineCallIcon />
									)
								}
							>
								<div style={{ marginLeft: '45px' }}>
									{(item.stage || item.message) && (
										<>
											<span className='descriptionText'>
												{/* {moment(item.inputDateTime).format(getDateFormat())} */}{' '}
												<span style={{ marginLeft: '10px' }} className='descriptionText'>
													{item.message}
												</span>
											</span>
											<br />
										</>
									)}
								</div>
							</Timeline.Item>
						);
					})}
				</Timeline>
			</div>
			{timelineData.length > 4 ? (
				<div style={{ marginLeft: '11em' }}>
					<Button type='text' onClick={() => setShow(!show)}>
						{show ? (
							<FontAwesomeIcon
								icon={faChevronUp}
								className='opportunityViewBodyDetailIcon'
								style={{
									color: '#5D6DD1',
									marginRight: '5px'
								}}
							/>
						) : (
							<FontAwesomeIcon
								icon={faChevronDown}
								className='opportunityViewBodyDetailIcon'
								style={{
									marginRight: '5px',
									color: '#5D6DD1'
								}}
							/>
						)}
						<u style={{ color: '#5D6DD1' }} className='descriptionText'>
							{show ? 'Collapse' : 'See full'} timeline
						</u>
					</Button>
				</div>
			) : null}
		</div>
	);
};

export default ProfileVerticalTimeline;
