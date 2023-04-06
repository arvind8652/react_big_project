import { React, useEffect, useState, useRef } from 'react';
import { getDateFormat } from '../../utils/utils';

import './VerticalTimeline.scss';
import 'antd/dist/antd.css';
import { Button, Col, Timeline } from 'antd';
import { faCaretUp, faCaretDown } from '@fortawesome/pro-solid-svg-icons';
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
		createdMessages: null,
		dueDate: null,
		dueDateMessages: null,
		inputDateTime: '2021-07-02T11:57:02.833',
		probability: null,
		stage: 'Proposal',
		stageMessages: 'Stage changed to Proposal',
		stageStatus: 'Upgrade',
		targetAmount: null,
		targetAmountMessages: null,
		targetAmountStatus: null
	},
	{
		createdMessages: null,
		dueDate: null,
		dueDateMessages: null,
		inputDateTime: '2021-07-02T11:57:02.833',
		probability: null,
		stage: 'Proposal',
		stageMessages: 'Stage changed to Proposal',
		stageStatus: 'Upgrade',
		targetAmount: null,
		targetAmountMessages: null,
		targetAmountStatus: null
	}
];
const VerticalTimeline = ({ timelineData = defaultValue }) => {
	const [show, setShow] = useState(false);
	const TimelineEditIcon = () => (
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

	const TimelineUpgradeIcon = () => (
		<div
			style={{
				backgroundColor: '#05BC6A',
				padding: '6px',
				borderRadius: '50%'
			}}
		>
			<FontAwesomeIcon
				icon={faChevronDoubleUp}
				className='opportunityViewBodyDetailIcon'
				style={{ color: 'white' }}
			/>
		</div>
	);

	const TimelineDowngradeIcon = () => (
		<div
			style={{
				backgroundColor: '#BC4705',
				padding: '6px',
				borderRadius: '50%'
			}}
		>
			<FontAwesomeIcon
				icon={faChevronDoubleDown}
				className='opportunityViewBodyDetailIcon'
				style={{ color: 'white' }}
			/>
		</div>
	);

	const LabelDiv = (label) => {
		return (
			// label && (
			<div style={{ marginRight: '15px', width: 'auto' }} className='verticalTimelineDetailText'>
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
								className='opportunities-timeline-item'
								style={{ marginBottom: '15px' }}
								//   label={
								//     <LabelDiv
								//       label={
								//        )
								//       }
								//     />
								//   }
								label={' test'}
								dot={
									item.stageStatus === 'Edit' ? (
										<TimelineEditIcon />
									) : item.stageStatus === 'Downgrade' ? (
										<TimelineDowngradeIcon />
									) : (
										<TimelineUpgradeIcon />
									)
								}
							>
								<div style={{ marginLeft: '10px' }}>
									{(item.stage || item.stageMessages) && (
										<>
											<span className='descriptionText'>
												{item.stageMessages} <span className='detailText'>{item.stage}</span>
											</span>
											<br />
										</>
									)}
									{(item.targetAmount || item.targetAmountMessages) && (
										<>
											<span className='descriptionText'>
												{item.targetAmountMessages}{' '}
												<span className='detailText'>${item.targetAmount + ' '}</span>
												{item.targetAmountStatus === 'Upgrade' ? (
													<FontAwesomeIcon icon={faCaretUp} style={{ color: '#05BC6A' }} />
												) : (
													<FontAwesomeIcon icon={faCaretDown} style={{ color: '#BC4705' }} />
												)}
											</span>
											<br />
										</>
									)}
									{item.createdMessages ? (
										<>
											<span className='descriptionText'>{item.createdMessages}</span>
										</>
									) : (
										(item.dueDate || item.dueDateMessages) && (
											<>
												<span className='descriptionText'>
													{item.dueDateMessages}{' '}
													<span className='detailText'>
														{item.dueDate && moment(item.dueDate).format(getDateFormat())}
													</span>
												</span>
											</>
										)
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

export default VerticalTimeline;
