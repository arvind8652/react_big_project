import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect, useState } from 'react';
import { getCalederDataApi } from '../../api/calederApi';

const localizer = momentLocalizer(moment);
const dummyData = [
	{
		id: 11867,
		activityId: 'INGLOBAL2021100136',
		followUpActivityId: 'FTGLOBAL2021100182',
		isAllDay: false,
		interactionType: 'C',
		nextRunDate: '2021-06-10T00:00:00',
		startTime: '2021-06-10T15:49:55',
		endTime: '2021-06-10T15:49:55',
		activityNature: 'I',
		subject: 'ssss',
		refType: 'CLIENTADD',
		refId: 'IDV046',
		clientName: 'AHMAD HISHAM KAMARUDDIN',
		dateofBirth: '1955-07-04T00:00:00',
		emailAddress: ''
	},

	{
		id: 0,
		activityId: 'PSGLOBAL2021100288',
		followUpActivityId: 'PSGLOBAL2021100288',
		isAllDay: true,
		interactionType: 'BIRTHDAY',
		nextRunDate: '2021-08-26T15:08:31.3892446+05:30',
		startTime: '',
		endTime: '',
		activityNature: 'BIRTHDAY',
		subject: 'BIRTHDAY',
		refType: 'PROSPECTADD',
		refId: 'PSGLOBAL2021100288',
		clientName: 'Gene Ramos',
		dateofBirth: '2021-08-26T13:00:00',
		emailAddress: 'rolland.gene@live.com'
	}
];

const CustomBigCalendar = () => {
	const [calederList, setCalenderList] = useState([]);
	useEffect(() => {
		let calendarDate = moment().startOf('month').format('YYYY-MM-DD');
		let requestObj = { CalendarDate: calendarDate };
		// let calederDate = moment().toDate(); //moment().format("YYYY-MM-DD");
		// let requestObj = { CalendarDate: calederDate };
		getCalendardata(requestObj);
	}, []);

	const getCalendardata = async (payload) => {
		try {
			let resp = await getCalederDataApi(payload);
			if (resp.data && resp.data.length > 0) {
				setCalenderList(resp.data);
			}
		} catch (error) {
			console.log('error', error);
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
		}
	};

	const eventList = calederList.map((item) => {
		return {
			title:
				item.interactionType == 'BIRTHDAY'
					? item.clientName + "'s " + renderInteractionType(item.interactionType)
					: renderInteractionType(item.interactionType) + 'with ' + item.clientName,
			start: moment(item.startDate).toDate(),
			end: moment(item.endDate).toDate(),
			allDay: item.isAllDay
			// resource: any,
		};
	});

	const getData = async (payload, dafaultView, action) => {
		if (action !== 'DATE') {
			if (dafaultView == 'month') {
				let calendarDate = moment(payload).format('YYYY-MM-01');
				let requestObj = { CalendarDate: calendarDate };
				getCalendardata(requestObj);
			}
			if (dafaultView == 'week') {
				var calendarDate = moment(payload).add('week').startOf('week').format('YYYY-MM-DD');
				let requestObj = { CalendarDate: calendarDate };
				getCalendardata(requestObj);
			}
			if (dafaultView == 'day') {
				let calendarDate = moment(payload).format('YYYY-MM-DD');
				let requestObj = { CalendarDate: calendarDate };
				getCalendardata(requestObj);
			}
		}
	};

	return (
		<div className='App'>
			<Calendar
				onNavigate={(date, defaultView, action) => {
					getData(date, defaultView, action);
				}}
				localizer={localizer}
				defaultDate={new Date()}
				defaultView='month'
				events={eventList}
				style={{ height: '100vh' }}
			/>
		</div>
	);
};

export default CustomBigCalendar;
