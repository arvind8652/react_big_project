import { React, useEffect, useState, useRef } from 'react';
import { getDateFormat } from '../../utils/utils';

import '../../components/VerticalTimeline/VerticalTimeline.scss';
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
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const defaultValue = [
	{
		date: '2021-07-16T11:56:42.267',
		status: 'C',
		formType: 'Modificaiton',
		description: 'Bought 100 Units',
		userName: 'Branch User',
		roleName: 'Branch User',
		remarks: null,
		action: 'M'
	},
	{
		date: null,
		status: 'P',
		formType: 'ApproveReject',
		description: 'Sold 100 Units',
		userName: null,
		roleName: 'Branch Manager',
		remarks: null,
		action: null
	}
];
const AccountDrilldownVerticalTimeline = ({ timelineData = defaultValue }) => {
	const [show, setShow] = useState(false);
	const TimelineUpdateIcon = () => (
		<div
			style={{
				backgroundColor: '#E5EBFF',
				padding: '6px',
				borderRadius: '50%'
			}}
		>
			<CheckCircleOutlined />
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
			<CloseCircleOutlined style={{ color: 'white' }} />
			{/* <FontAwesomeIcon
                icon={faHandshake}
                className="opportunityViewBodyDetailIcon"
                style={{ color: "white" }}
            /> */}
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
			<div style={{ marginLeft: '-40%' }}>
				<Timeline mode='left' style={{ marginTop: '25px' }}>
					{(show ? timelineData : timelineData.slice(0, 4)).map((item, index) => {
						return (
							<Timeline.Item
								key={index}
								label={
									<span style={{ marginRight: '15%' }}>
										{moment(item.date).format(getDateFormat())}
									</span>
								}
								dot={
									item.action === 'A' ? (
										<TimelineCreatedIcon />
									) : item.action === 'R' ? (
										<TimelineMeetingIcon />
									) : item.action === 'C' ? (
										<TimelineUpgradeIcon />
									) : item.action === 'M' ? (
										<TimelineChatIcon />
									) : (
										<TimelineUpdateIcon />
									)
								}
							>
								<div style={{ marginLeft: '45px' }}>
									{(item.description || item.message) && (
										<>
											<span className='descriptionText'>
												{' '}
												<span className='descriptionText'>{item.description}</span>
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

export default AccountDrilldownVerticalTimeline;
