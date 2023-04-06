import React, { useEffect, useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import moment from 'moment';
import { sortBykey } from '../../../utils/utils';
import { getCalederDataApi } from '../../../api/calederApi';
import { CalendarSchedule } from './CalendarSchedule';

export const Schedule = () => {
	const [calendarList, setCalendarList] = useState([]);
	const [eventList, setEventList] = useState([]);
	const [selectedDate, setSelectedDate] = useState(moment);

	useEffect(() => {
		let today = moment().format('YYYY-MM-DD');
		let requestObj = { CalendarDate: today };
		getCalederdata(requestObj);
	}, []);

	const getCalederdata = async (payload) => {
		try {
			let resp = await getCalederDataApi(payload);
			if (resp.data && resp.data.length > 0) setCalendarList(sortBykey(resp.data, 'nextRunDate'));
		} catch (error) {
			console.log('error', error);
		}
	};

	const setEventListFunc = () => {
		let eventArray = [];
		// This piece of code can be used in future
		eventArray = calendarList
			.filter(
				(ins) => new Date(ins.nextRunDate).toDateString() >= new Date(selectedDate).toDateString()
			)
			.reverse();
		setEventList(eventArray);
	};
	useEffect(() => {
		setEventListFunc();
	}, [calendarList]);

	return (
		<div>
			<CalendarSchedule calendarList={eventList} selectedDate={selectedDate} />
		</div>
	);
};
