import { useState } from 'react';
import { Timeline, Button, Typography, Space, Col } from 'antd';
import moment from 'moment';
import { getDateFormat } from '../../../utils/utils';
import './CardView.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPhoneAlt,
	faBullseyeArrow,
	faPaperclip,
	faCircle,
	faUserFriends,
	faUserCowboy,
	faTasks,
	faChevronDoubleUp,
	faChevronDoubleDown,
	faChevronUp,
	faChevronDown,
	faCommentDots,
	faHexagon,
	faEnvelope,
	faVideo
} from '@fortawesome/pro-regular-svg-icons';
import { faPencilAlt } from '@fortawesome/pro-solid-svg-icons';

const TimelineGreenIcon = (props) => (
	<div style={{ backgroundColor: '#05BC6A', padding: '6px', borderRadius: '50%' }}>
		<FontAwesomeIcon icon={props.icon} style={{ color: 'white', fontSize: '14px' }} />
	</div>
);

const TimelineRedIcon = (props) => (
	<div style={{ backgroundColor: '#BC4705', padding: '6px', borderRadius: '50%' }}>
		<FontAwesomeIcon icon={props.icon} style={{ color: 'white', fontSize: '14px' }} />
	</div>
);

const TimelineRegularIcon = (props) => (
	<div
		style={{
			backgroundColor: '#E5EBFF',
			padding: '6px',
			borderRadius: '50%'
		}}
	>
		<FontAwesomeIcon icon={props.icon} style={{ color: '#696A91', fontSize: '14px' }} />
	</div>
);

const LabelDiv = (props) => <div style={{ marginRight: '15px' }}>{props.label}</div>;

const VerticalTimelineCardView = (props) => {
	const [show, setShow] = useState(false);

	const TimelineList = props.data;

	const interactions = {
		CHAT: faCommentDots,
		Interaction_call: faPhoneAlt,
		Interaction_meeting: faVideo,
		Interaction_mail: faEnvelope,
		Interaction_others: faHexagon
	};

	if (!TimelineList || TimelineList.count === 0) {
		return (
			<Col type='flex' align='middle' span={24} className='prospectDescriptionText'>
				No Records Found
			</Col>
		);
	}

	return (
		<div>
			<div className='opportunities-timeline' style={{ display: 'flex', justifyContent: 'start' }}>
				<Timeline mode='left' style={{ marginTop: '25px' }}>
					{(show ? TimelineList : TimelineList.slice(0, 5)).map((item, index) => {
						return (
							<Timeline.Item
								key={index}
								label={<LabelDiv label={moment(item.actionDate).format(getDateFormat())} />}
								dot={
									item.stage === 'Upgrade' ? (
										<TimelineGreenIcon icon={faChevronDoubleUp} />
									) : item.stage === 'Downgrade' ? (
										<TimelineRedIcon icon={faChevronDoubleDown} />
									) : item.stage === 'Create' ? (
										<TimelineGreenIcon icon={faCircle} />
									) : (
										<TimelineRegularIcon
											icon={
												item.stage === 'Lead'
													? faUserFriends
													: item.stage === 'Prospect'
													? faUserCowboy
													: item.stage === 'Opportunity'
													? faBullseyeArrow
													: item.stage === 'Attach'
													? faPaperclip
													: item.stage === 'Edit'
													? faPencilAlt
													: item.stage === 'Task'
													? faTasks
													: item.stage === 'Interaction' &&
													  interactions[item.verticalGraphData.interactionType]
											}
										/>
									)
								}
							>
								<Space direction='vertical'>
									<Typography.Text>
										<strong>{item.verticalGraphData.messageLine1}</strong>
									</Typography.Text>
									<Typography.Text>{item.verticalGraphData.messageLine2}</Typography.Text>
								</Space>
							</Timeline.Item>
						);
					})}
				</Timeline>
			</div>
			{TimelineList.length > 5 ? (
				<div style={{ marginLeft: '11em' }}>
					<Button type='text' onClick={() => setShow(!show)}>
						{show ? (
							<FontAwesomeIcon
								icon={faChevronUp}
								style={{ fontSize: '14px', marginRight: '5px' }}
							/>
						) : (
							<FontAwesomeIcon
								icon={faChevronDown}
								style={{ fontSize: '14px', marginRight: '5px' }}
							/>
						)}
						<u>{show ? 'Collapse' : 'See full'} timeline</u>
					</Button>
				</div>
			) : TimelineList.length === 0 ? (
				<Col type='flex' align='middle' span={24} className='prospectDescriptionText'>
					No Records Found
				</Col>
			) : null}
		</div>
	);
};

export default VerticalTimelineCardView;
