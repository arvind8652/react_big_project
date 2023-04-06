import { useState } from 'react';
import { Timeline, Button, Typography, Space, Col } from 'antd';
import moment from 'moment';
import { getDateFormat } from '../../../utils/utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPhoneAlt,
	faChevronUp,
	faChevronDown,
	faCommentDots,
	faHexagon,
	faEnvelope,
	faVideo
} from '@fortawesome/pro-regular-svg-icons';

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

const InteractionVerticalTimelineCardView = (props) => {
	const [show, setShow] = useState(false);

	const TimelineList = props.data;

	const interactionType = {
		Chat: faCommentDots,
		Call: faPhoneAlt,
		Video: faVideo,
		Email: faEnvelope,
		Others: faHexagon
	};

	return (
		<div>
			<div className='opportunities-timeline' style={{ display: 'flex', justifyContent: 'start' }}>
				<Timeline mode='left' style={{ marginTop: '25px' }}>
					{(show ? TimelineList : TimelineList.slice(0, 5)).map((item, index) => {
						return (
							<Timeline.Item
								key={index}
								label={<LabelDiv label={moment(item.inputDateTime).format(getDateFormat())} />}
								dot={<TimelineRegularIcon icon={interactionType[item.interactionType]} />}
							>
								<Space direction='vertical'>
									<Typography.Text>
										<strong>{item.subject}</strong>
									</Typography.Text>
									<Typography.Text>
										{item.opportunity} | {item.purpose}
									</Typography.Text>
								</Space>
							</Timeline.Item>
						);
					})}
				</Timeline>
			</div>
			{TimelineList.length > 4 ? (
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
				<Col type='flex' align='middle' span={24}>
					No Records Found
				</Col>
			) : null}
		</div>
	);
};

export default InteractionVerticalTimelineCardView;
