import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import moment from 'moment';
import { Divider, Col, Row, Calendar, Select } from 'antd';
import { CalederBadge } from './CalederBadge';
import { getCalederDataApi } from '../../../api/calederApi';
import { sortBykey } from '../../../utils/utils';

export const Month = () => {
	const [selectedDate, setSelectedDate] = useState(moment);
	const [calendarList, setCalendarList] = useState([]);
	const [eventList, setEventList] = useState([]);
	const [selectedMonth, setSelectedMonth] = useState(-1);
	const [selectedYear, setSelectedYear] = useState(0);
	useEffect(() => {
		let calendarDate = moment().startOf('month').format('YYYY-MM-DD');
		let requestObj = { CalendarDate: calendarDate };
		getCalederdata(requestObj);
	}, []);
	useEffect(() => {
		if (selectedDate) {
			let calendarDate = moment(selectedDate).format('YYYY-MM-DD');
			let requestObj = { CalendarDate: calendarDate };
			getCalederdata(requestObj);
		}
	}, [selectedDate]);

	const getCalederdata = async (payload) => {
		try {
			let resp = await getCalederDataApi(payload);
			if (resp.data && resp.data.length > 0) setCalendarList(sortBykey(resp.data, 'nextRunDate'));
		} catch (error) {}
	};
	const setEventListFunc = () => {
		let eventArray = [];
		// This piece of code can be used in future
		//eventArray = calendarList.filter((ins) => new Date(ins.nextRunDate).toDateString() !== new Date(selectedDate).toDateString());
		eventArray = calendarList;
		setEventList(eventArray);
	};
	useEffect(() => {
		setEventListFunc();
	}, [selectedDate, calendarList]);

	const onChangeDate = (value) => {
		setSelectedDate(value);
	};
	useEffect(() => {
		// Specify how to clean up after this effect:
		// setSelectedDate(moment)
		let month = 0;
		let monthAdd = selectedMonth + 1;
		if (monthAdd < 10) {
			month = '0' + monthAdd;
		}
		if (selectedYear > 0 && selectedMonth > -1) {
			let requestObj = {
				CalendarDate: selectedYear.toString() + '-' + month.toString() + '-01'
			};
			getCalederdata(requestObj);
		}
	}, [selectedMonth, selectedYear]);

	return (
		<div>
			<div>
				<Calendar
					fullscreen={false}
					headerRender={({ value, onChange }) => {
						const start = 0;
						const end = 12;
						const monthOptions = [];
						const current = value.clone();
						const localeData = value.localeData();
						const months = [];
						for (let i = 0; i < 12; i++) {
							current.month(i);
							months.push(localeData.monthsShort(current));
						}
						for (let index = start; index < end; index++) {
							monthOptions.push(
								<Select.Option className='month-item' key={`${index}`}>
									{months[index]}
								</Select.Option>
							);
						}
						const month = value.month();
						setSelectedMonth(month);
						const year = value.year();
						setSelectedYear(year);
						const options = [];
						for (let i = year - 10; i < year + 10; i += 1) {
							options.push(
								<Select.Option key={i} value={i} className='year-item'>
									{i}
								</Select.Option>
							);
						}
						return (
							<div style={{ padding: 8 }}>
								<Row gutter={8}>
									{/* <Col sm={12}></Col> */}
									<Col span={24} align='right'>
										<Select
											style={{ marginRight: '3%' }}
											size='small'
											dropdownMatchSelectWidth={false}
											value={String(selectedMonth)}
											onChange={(selectedMonth) => {
												const newValue = value.clone();
												newValue.month(parseInt(selectedMonth, 10));
												onChange(newValue);
											}}
										>
											{monthOptions}
										</Select>
										{/* </Col>
                                    <Col align="right"> */}
										<Select
											size='small'
											dropdownMatchSelectWidth={false}
											className='my-year-select'
											onChange={(newYear) => {
												const now = value.clone().year(newYear);
												onChange(now);
											}}
											value={String(selectedYear)}
										>
											{options}
										</Select>
									</Col>
								</Row>
							</div>
						);
					}}
					value={selectedDate}
					onChange={onChangeDate}
				/>
			</div>
			<Divider />
			<CalederBadge calendarList={eventList} selectedDate={selectedDate} />
		</div>
	);
};
