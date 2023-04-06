import React, { useState } from 'react';
import {
	Modal,
	Typography,
	Row,
	Col,
	Form,
	DatePicker,
	Checkbox,
	Input,
	Select,
	Radio,
	Divider,
	Button
} from 'antd';
import moment from 'moment';
import { getDateFormat } from '../../utils/utils';
import './CustomRecurrence.scss';

const { Option } = Select;

const radioStyle = {
	display: 'block',
	height: '30px',
	lineHeight: '30px'
};

const _DateSelect = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
	28, 29, 30, 31
];
const _WeekSelect = ['First', 'Second', 'Third', 'Fourth'];
const _WeekDaySelect = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
];
const _MonthSelect = [
	{ label: 'January', value: 1 },
	{ label: 'February', value: 2 },
	{ label: 'March', value: 3 },
	{ label: 'April', value: 4 },
	{ label: 'May', value: 5 },
	{ label: 'June', value: 6 },
	{ label: 'July', value: 7 },
	{ label: 'August', value: 8 },
	{ label: 'September', value: 9 },
	{ label: 'October', value: 10 },
	{ label: 'November', value: 11 },
	{ label: 'December', value: 12 }
];
var StatusOfChecked = '0000000';

const WeekSelect = ({ handleOnValuesChange }) => {
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	function replaceChar(origString, replaceChar, index) {
		let newStringArray = origString.split('');
		newStringArray[index] = replaceChar;
		let newString = newStringArray.join('');
		return newString;
	}

	const checkSelectedWeekDay = (evt, index) => {
		if (evt) {
			StatusOfChecked = replaceChar(StatusOfChecked, '1', index);
		} else {
			replaceChar(StatusOfChecked, '0', index);
		}
		handleOnValuesChange('allDay', false);
		handleOnValuesChange('weekDays', false);
		handleOnValuesChange('FrequencyDays', StatusOfChecked);
	};

	return (
		<>
			{days.map((item, index) => (
				<Col span={6} key={index}>
					<Form.Item name='FrequencyDays' style={{ marginBottom: '10px' }}>
						<Checkbox
							onChange={(evt) => {
								if (evt.target.checked) {
									checkSelectedWeekDay(evt.target.checked, index);
								}
							}}
						>
							{item}
						</Checkbox>
					</Form.Item>
				</Col>
			))}{' '}
		</>
	);
};
const DaySelect = ({ handleOnValuesChange }) => {
	const passtheCheckedValue = (value) => {
		handleOnValuesChange('FrequencyDays', '0000000');
		if (value === 'allDay') {
			handleOnValuesChange('allDay', true);
			handleOnValuesChange('weekDays', false);
		} else {
			handleOnValuesChange('allDay', false);
			handleOnValuesChange('weekDays', true);
		}
	};

	return (
		<Form.Item name='' style={{ margin: 0 }}>
			<Radio.Group
				onChange={(val) => {
					passtheCheckedValue(val.target.value);
				}}
				defaultValue='allDay'
			>
				<Radio style={radioStyle} value={'allDay'}>
					All Days
				</Radio>
				<Radio style={radioStyle} value={'weekDays'}>
					Week Days
				</Radio>
			</Radio.Group>
		</Form.Item>
	);
};

const EndDateSection = ({ handleOnValuesChange }) => {
	const [radioEndDate, setRadioEndDate] = useState('isEndDate');
	const checkEndDate = (value) => {
		setRadioEndDate(value);
		if (value === 'isEndDate') {
			handleOnValuesChange('isEndDate', true);
			handleOnValuesChange('IsEndAfter', false);
			handleOnValuesChange('time', null);
		} else {
			handleOnValuesChange('isEndDate', false);
			handleOnValuesChange('IsEndAfter', true);
			handleOnValuesChange('CustomEndDate', null);
		}
	};
	return (
		<Col span={24}>
			<Form.Item name='' style={{ margin: 0 }}>
				<Radio.Group
					onChange={(val) => {
						checkEndDate(val.target.value);
					}}
					style={{ width: '100%' }}
					defaultValue='isEndDate'
				>
					{/* <Radio
          style={{ ...radioStyle, marginBottom: "14px" }}
          value={"no-end"}
        >
          No End date
        </Radio> */}
					<Radio style={{ width: '100%' }} value={'isEndDate'}>
						End date
					</Radio>
					<Form.Item name='CustomEndDate' style={{ margin: 0, marginBottom: '14px' }}>
						<DatePicker
							onChange={(value) =>
								handleOnValuesChange('CustomEndDate', moment(value?.format('YYYY-MM-DD')))
							}
							size='large'
							style={{ width: '90%', marginLeft: '5%' }}
							format={getDateFormat()}
							disabled={radioEndDate === '' || radioEndDate === 'IsEndAfter'}
						/>
					</Form.Item>
					<Radio style={{ width: '100%' }} value={'IsEndAfter'}>
						End after
					</Radio>
					<Form.Item name='time' style={{ margin: 0 }}>
						<Input
							onChange={(evt) => handleOnValuesChange('time', evt.target.value)}
							size='large'
							defaultValue='1'
							disabled={radioEndDate === '' || radioEndDate === 'isEndDate'}
							style={{
								width: '25%',
								marginLeft: '5%',
								marginRight: '10px'
							}}
						/>
						<Typography.Text>Occurance(s)</Typography.Text>
					</Form.Item>
				</Radio.Group>
			</Form.Item>
		</Col>
	);
};

const MonthSelect = ({ handleOnValuesChange }) => {
	const [radioMonthSelect, setRadioMonthSelect] = useState('');
	const resetDataOnSwitchRadio = (value) => {
		setRadioMonthSelect(value);
		if (value === 'option1') {
			handleOnValuesChange('week', null);
			handleOnValuesChange('dayName', null);
		} else {
			handleOnValuesChange('day', 0);
		}
	};
	return (
		<Form.Item name='' style={{ margin: 0 }}>
			<Radio.Group defaultValue='option1' onChange={(e) => resetDataOnSwitchRadio(e.target.value)}>
				<Row>
					{' '}
					<Radio style={radioStyle} value={'option1'}>
						On Day
					</Radio>
					<Form.Item
						name='day'
						style={{
							width: '35%',
							marginRight: 5,
							marginTop: 2,
							border: 0,
							boxShadow: 'none'
						}}
					>
						<Select
							defaultValue={31}
							size='small'
							onChange={(value) => handleOnValuesChange('day', value)}
							disabled={radioMonthSelect === '' || radioMonthSelect === 'option2'}
						>
							{_DateSelect.map((province) => (
								<Option key={province}>{province}</Option>
							))}
						</Select>
					</Form.Item>
				</Row>

				<Row style={{ width: '150%' }}>
					{' '}
					<Radio span={2} style={radioStyle} value={'option2'}>
						On
					</Radio>
					<Form.Item
						name='week'
						style={{
							width: '30%',
							marginRight: 5,
							marginTop: 2,
							border: 0,
							boxShadow: 'none'
						}}
					>
						<Select
							defaultValue='First'
							size='small'
							span={3}
							onChange={(value) => handleOnValuesChange('week', value)}
							disabled={radioMonthSelect === '' || radioMonthSelect === 'option1'}
						>
							{_WeekSelect.map((province) => (
								<Option key={province}>{province}</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						name='dayName'
						style={{
							width: '35%',
							marginRight: 5,
							marginTop: 2,
							border: 0,
							boxShadow: 'none'
						}}
					>
						<Select
							defaultValue='Monday'
							size='small'
							span={4}
							onChange={(value) => handleOnValuesChange('dayName', value)}
							disabled={radioMonthSelect === '' || radioMonthSelect === 'option1'}
						>
							{_WeekDaySelect.map((province) => (
								<Option key={province}>{province}</Option>
							))}
						</Select>
					</Form.Item>
				</Row>
			</Radio.Group>
		</Form.Item>
	);
};
const YearSelect = ({ handleOnValuesChange }) => {
	const [radioYearSelect, setRadioYearSelect] = useState('');
	const resetDataOnSwitchRadio = (value) => {
		setRadioYearSelect(value);
		if (value === 'option3') {
			handleOnValuesChange('week', null);
			handleOnValuesChange('dayName', null);
			// handleOnValuesChange('month', 0);
		} else {
			handleOnValuesChange('day', 0);
		}
	};
	return (
		<Form.Item style={{ margin: 0 }}>
			<Radio.Group defaultValue='option3' onChange={(e) => resetDataOnSwitchRadio(e.target.value)}>
				<Row>
					{' '}
					<Radio style={radioStyle} value={'option3'}>
						On
					</Radio>
					<Form.Item
						name='month'
						style={{
							width: '35%',
							marginLeft: 5,
							marginRight: 5,
							marginTop: 2,
							border: 0,
							boxShadow: 'none'
						}}
					>
						<Select
							className='noBorderOnDropDown'
							defaultValue='12'
							size='small'
							onChange={(value) => handleOnValuesChange('month', value)}
							disabled={radioYearSelect === '' || radioYearSelect === 'option4'}
						>
							{_MonthSelect.map((option, index) => (
								<Select.Option key={index} value={option.value}>
									{option.label}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						name='day'
						style={{
							width: '35%',
							marginRight: 5,
							marginTop: 2,
							border: 0,
							boxShadow: 'none'
						}}
					>
						<Select
							defaultValue={31}
							size='small'
							onChange={(value) => handleOnValuesChange('day', value)}
							disabled={radioYearSelect === '' || radioYearSelect === 'option4'}
						>
							{_DateSelect.map((province) => (
								<Option key={province}>{province}</Option>
							))}
						</Select>
					</Form.Item>
				</Row>
				<Row style={{ width: '150%' }}>
					{' '}
					<Radio span={2} style={radioStyle} value={'option4'}>
						On
					</Radio>
					<Form.Item
						name='week'
						style={{
							width: '20%',
							marginRight: 5,
							marginTop: 2,
							border: 0,
							boxShadow: 'none'
						}}
					>
						<Select
							defaultValue='First'
							size='small'
							span={3}
							onChange={(value) => handleOnValuesChange('week', value)}
							disabled={radioYearSelect === '' || radioYearSelect === 'option3'}
						>
							{_WeekSelect.map((province) => (
								<Option key={province}>{province}</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						name='dayName'
						style={{
							width: '25%',
							marginRight: 5,
							marginTop: 2,
							border: 0,
							boxShadow: 'none'
						}}
					>
						<Select
							defaultValue='Monday'
							size='small'
							span={4}
							onChange={(value) => handleOnValuesChange('dayName', value)}
							disabled={radioYearSelect === '' || radioYearSelect === 'option3'}
						>
							{_WeekDaySelect.map((province) => (
								<Option key={province}>{province}</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						name='month'
						style={{
							width: '25%',
							marginLeft: 5,
							marginTop: 2,
							border: 0,
							boxShadow: 'none'
						}}
					>
						<Select
							className='noBorderOnDropDown'
							defaultValue='12'
							size='small'
							onChange={(value) => handleOnValuesChange('month', value)}
							disabled={radioYearSelect === '' || radioYearSelect === 'option3'}
						>
							{_MonthSelect.map((option, index) => (
								<Select.Option key={index} value={option.value}>
									{option.label}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
				</Row>
			</Radio.Group>
		</Form.Item>
	);
};

const CustomRecurrenceModal = (props) => {
	const [period, setPeriod] = useState('week');

	const handleOnValuesChange = (key, value) => {
		props.onValuesChange(value, key, props.index);
	};

	const switchFrequency = (key, value) => {
		handleOnValuesChange(key, value);

		handleOnValuesChange('allDays', false);
		handleOnValuesChange('weekDays', false);
		handleOnValuesChange('week', null);
		handleOnValuesChange('dayName', null);
		handleOnValuesChange('day', 0);
		handleOnValuesChange('month', 0);
		handleOnValuesChange('FrequencyDays', '0000000');
	};

	// const controlStructure = props.controlStructureAdd;

	const renderObj = {
		day: <DaySelect handleOnValuesChange={handleOnValuesChange} />,
		week: <WeekSelect handleOnValuesChange={handleOnValuesChange} />,
		month: <MonthSelect handleOnValuesChange={handleOnValuesChange} />,
		year: <YearSelect handleOnValuesChange={handleOnValuesChange} />
	};

	function disabledPastDate(current) {
		// Can not select days after today and today
		return current && current < moment().startOf('day');
	}

	function disabledFutureDate(current) {
		// Can not select days after today and today
		return current && current > moment().endOf('day');
	}

	return (
		<>
			<Modal
				centered
				visible={props.modal}
				onCancel={props.modalClose}
				footer={null}
				className='occurence-modal'
				width={480}
			>
				<Form
					layout='vertical'
					form={props.form}
					onValuesChange={props.onValuesChange}
					initialValues={props.formData}
					onFinish={(e) => {
						props.modalClose();
					}}
				>
					<Typography.Title level={3}>Custom Recurrence</Typography.Title>
					<Row>
						<Col span={24}>
							<Form.Item name='StartDate' label='Start date'>
								<DatePicker
									onChange={(value) =>
										handleOnValuesChange('StartDate', moment(value?.format('YYYY-MM-DD')))
									}
									size='large'
									style={{ width: '90%' }}
									defaultValue={moment(new Date(), getDateFormat())}
									disabledDate={disabledPastDate}
									format={getDateFormat()}
								/>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item label='Repeat Every' name='repeatsNo' style={{ width: '90%' }}>
								<Input
									size='large'
									onChange={(evt) => handleOnValuesChange('repeatsNo', evt.target.value)}
									defaultValue='1'
								/>
							</Form.Item>
						</Col>
						<Col span={18}>
							<Form.Item label=' ' name='repeatsFrequency' style={{ width: '90%', marginTop: 2 }}>
								<Select
									onChange={(value) => switchFrequency('repeatsFrequency', value)}
									defaultValue='week'
									size='large'
									onSelect={(val) => setPeriod(val)}
								>
									<Option value='day'>Day</Option>
									<Option value='week'>Week</Option>
									<Option value='month'>Month</Option>
									<Option value='year'>Year</Option>
								</Select>
							</Form.Item>
						</Col>
						{renderObj[`${period}`]}
						<Divider />
						<EndDateSection handleOnValuesChange={handleOnValuesChange} />
						<Col span={24}>
							<Row justify='end'>
								<Button type='text' style={{ marginRight: '15px' }} onClick={props.modalClose}>
									Cancel
								</Button>
								<Button
									type='primary'
									onClick={props.setFlag}
									className='topbar-btn'
									htmlType='submit'
								>
									Done
								</Button>
							</Row>
						</Col>
					</Row>
				</Form>
			</Modal>
		</>
	);
};
export default CustomRecurrenceModal;
