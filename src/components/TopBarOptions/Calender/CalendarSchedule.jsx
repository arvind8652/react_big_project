import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import moment from 'moment';
import { Col, Row, Badge, Divider } from 'antd';
import { groupBy, tConvert } from '../../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBirthdayCake,
	faEnvelopeSquare,
	faPhoneAlt,
	faComment,
	faFile
} from '@fortawesome/pro-light-svg-icons';

export const CalendarSchedule = ({ calendarList = [], selectedDate }) => {
	const [today, setToday] = useState(new Date().toDateString());
	const [tomorrow, setTomorrow] = useState('');

	useEffect(() => {
		let todayDate = new Date();
		let tomo = new Date(todayDate);
		tomo.setDate(tomo.getDate() + 1);
		let checkingTomorrow = new Date(tomo).toDateString();
		setTomorrow(checkingTomorrow);
	});

	const renderBadgeIcon = (iconType) => {
		switch (iconType) {
			case 'C':
				return <FontAwesomeIcon icon={faPhoneAlt} style={{ fontSize: '14px' }} />;
			case 'CH':
				return <FontAwesomeIcon icon={faComment} style={{ fontSize: '14px' }} />;
			case 'E':
				return <FontAwesomeIcon icon={faEnvelopeSquare} style={{ fontSize: '14px' }} />;
			case 'M':
				return <FontAwesomeIcon icon={faComment} style={{ fontSize: '14px' }} />;
			case 'BIRTHDAY':
				return <FontAwesomeIcon icon={faBirthdayCake} style={{ fontSize: '14px' }} />;
			case 'DOCUMENTEXPIRY':
				return <FontAwesomeIcon icon={faFile} style={{ fontSize: '14px' }} />;
			default:
				return;
		}
	};
	const renderInteractionType = (interactionType) => {
		switch (interactionType) {
			case 'C':
				return 'Call ';
			case 'CH':
				return 'Chat ';
			case 'E':
				return 'Email ';
			case 'M':
				return 'Meeting ';
			case 'BIRTHDAY':
				return 'Birthday';
			case 'DOCUMENTEXPIRY':
				return 'Expiry';
			default:
				return;
		}
	};

	const renderTableRow = (sortedList) => {
		return sortedList.map((ele) => {
			return (
				<div>
					<Row gutter={16}>
						<Col span={6}>
							<span className='item'>{ele.isAllDay ? 'All Day' : tConvert(ele.startTime)}</span>
						</Col>
						<Col span={2}>
							<span>{''}</span>
						</Col>
						<Col span={16}>
							<Badge className={today ? 'badge-today' : 'badge-tomorrow'}>
								{renderBadgeIcon(ele.interactionType)}
								<span style={{ fontSize: '14px', marginLeft: '2px', paddingLeft: '5px' }}>
									{ele.interactionType === 'BIRTHDAY'
										? ele.clientName + "'s " + renderInteractionType(ele.interactionType)
										: renderInteractionType(ele.interactionType) + ' with ' + ele.clientName}
								</span>
							</Badge>
						</Col>
					</Row>
				</div>
			);
		});
	};

	const renderTableBody = (calenderData) => {
		let list = [];
		list = groupBy(calenderData, (ins) => new Date(ins.nextRunDate).toDateString());

		return Object.keys(list).map((key) => {
			let sortedList = [];
			let newList = [];
			if (list[key] && list[key].length) {
				sortedList = list[key].sort(
					(a, b) => new Date(b['nextRunDate']) - new Date(a['nextRunDate'])
				);

				newList = sortedList.map((data) => {
					return data.startDate;
				});

				return (
					<React.Fragment>
						<h4 className='item-heading'>
							{today === moment(newList[0])._d.toDateString()
								? 'Today'
								: tomorrow === moment(newList[0])._d.toDateString()
								? 'Tomorrow'
								: null}{' '}
							{moment(newList[0])._d.toDateString()}
						</h4>
						{renderTableRow(sortedList)}
						<Divider />
					</React.Fragment>
				);
			}
		});
	};

	return <div>{renderTableBody(calendarList)}</div>;
};
