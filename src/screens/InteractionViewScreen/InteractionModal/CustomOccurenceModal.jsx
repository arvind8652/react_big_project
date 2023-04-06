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
import { getDateFormat } from '../../../utils/utils';

const { Option } = Select;

const radioStyle = {
	display: 'block',
	height: '30px',
	lineHeight: '30px'
};

const CustomRecurrenceModal = (props) => {
	const [period, setPeriod] = useState('1');

	const controlStructure = props.controlStructure;
	const controlStructureRules = props.controlStructureRules;

	const DaySelect = () => {
		return (
			<Form.Item style={{ margin: 0 }}>
				<Radio.Group defaultValue='AllDays'>
					<Radio style={radioStyle} value={'AllDays'}>
						All Days
					</Radio>
					<Radio style={radioStyle} value={'WeekDays'}>
						Week Days
					</Radio>
				</Radio.Group>
			</Form.Item>
		);
	};

	const WeekSelect = () => {
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

		return (
			<>
				{days.map((item, index) => (
					<Col span={6} key={index}>
						<Form.Item style={{ marginBottom: '10px' }}>
							<Checkbox>{item}</Checkbox>
						</Form.Item>
					</Col>
				))}{' '}
			</>
		);
	};

	const MonthSelect = () => {
		return (
			<Form.Item style={{ margin: 0 }}>
				<Radio.Group defaultValue='day-31'>
					<Radio style={radioStyle} value={'day-31'}>
						On Day
						<Select size='large' style={{ width: '90%' }} bordered={false} defaultValue='1'>
							{controlStructure.Day &&
								controlStructure.Day.dropDownValue &&
								controlStructure.Day.dropDownValue.length > 0 &&
								controlStructure.Day.dropDownValue.map((item, index) => (
									<Option value={item.dataValue} key={index}>
										{item.displayValue}
									</Option>
								))}
						</Select>
					</Radio>
					<Radio style={radioStyle}>
						<Row align='middle'>
							<Col>
								On
								<Select size='large' bordered={false} defaultValue='first'>
									{controlStructure.Week &&
										controlStructure.Week.dropDownValue &&
										controlStructure.Week.dropDownValue.length > 0 &&
										controlStructure.Week.dropDownValue.map((item, index) => (
											<Option value={item.dataValue} key={index}>
												{item.displayValue}
											</Option>
										))}
								</Select>
							</Col>
							<Col>
								<Select size='large' bordered={false} defaultValue='friday'>
									{controlStructure.DayName &&
										controlStructure.DayName.dropDownValue &&
										controlStructure.DayName.dropDownValue.length > 0 &&
										controlStructure.DayName.dropDownValue.map((item, index) => (
											<Option value={item.dataValue} key={index}>
												{item.displayValue}
											</Option>
										))}
								</Select>
							</Col>
						</Row>
					</Radio>
				</Radio.Group>
			</Form.Item>
		);
	};

	const YearSelect = () => {
		return (
			<Form.Item style={{ margin: 0 }}>
				<Radio.Group defaultValue='day-31'>
					<Radio style={radioStyle} value={'day-31'}>
						On Day
						<Select size='large' bordered={false} defaultValue='1'>
							{controlStructure.Day &&
								controlStructure.Day.dropDownValue &&
								controlStructure.Day.dropDownValue.length > 0 &&
								controlStructure.Day.dropDownValue.map((item, index) => (
									<Option value={item.dataValue} key={index}>
										{item.displayValue}
									</Option>
								))}
						</Select>
					</Radio>
					<Radio style={radioStyle}>
						<Row align='middle'>
							<Col>
								On
								<Select size='large' bordered={false} defaultValue='first'>
									{controlStructure.Week &&
										controlStructure.Week.dropDownValue &&
										controlStructure.Week.dropDownValue.length > 0 &&
										controlStructure.Week.dropDownValue.map((item, index) => (
											<Option value={item.dataValue} key={index}>
												{item.displayValue}
											</Option>
										))}
								</Select>
							</Col>
							<Col>
								<Select size='large' bordered={false} defaultValue='friday'>
									{controlStructure.DayName &&
										controlStructure.DayName.dropDownValue &&
										controlStructure.DayName.dropDownValue.length > 0 &&
										controlStructure.DayName.dropDownValue.map((item, index) => (
											<Option value={item.dataValue} key={index}>
												{item.displayValue}
											</Option>
										))}
								</Select>
							</Col>
							of
							<Col>
								<Select size='large' bordered={false} defaultValue='March'>
									{controlStructure.Month &&
										controlStructure.Month.dropDownValue &&
										controlStructure.Month.dropDownValue.length > 0 &&
										controlStructure.Month.dropDownValue.map((item, index) => (
											<Option value={item.dataValue} key={index}>
												{item.displayValue}
											</Option>
										))}
								</Select>
							</Col>
						</Row>
					</Radio>
				</Radio.Group>
			</Form.Item>
		);
	};

	const renderPeriod = {
		1: <DaySelect />,
		2: <WeekSelect />,
		3: <MonthSelect />,
		4: <YearSelect />
	};

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
							<Form.Item label='Start date'>
								<DatePicker
									size='large'
									style={{ width: '90%' }}
									defaultValue={moment(new Date(), getDateFormat())}
									format={getDateFormat()}
								/>
							</Form.Item>
						</Col>
						<Col span={4}>
							<Form.Item label='Start date' style={{ width: '90%' }}>
								<Input size='large' defaultValue='1' />
							</Form.Item>
						</Col>
						<Col span={20}>
							<Form.Item label=' ' style={{ width: '90%' }}>
								<Select defaultValue='1' size='large' onSelect={(val) => setPeriod(val)}>
									{controlStructure.RepeatsFrequency &&
										controlStructure.RepeatsFrequency.dropDownValue.length > 0 &&
										controlStructure.RepeatsFrequency.dropDownValue.map((item, index) => (
											<Option value={item.dataValue} key={index}>
												{item.displayValue}
											</Option>
										))}
								</Select>
							</Form.Item>
						</Col>
						{renderPeriod[`${period}`]}
						<Divider />
						<Col span={24}>
							<Form.Item style={{ margin: 0 }}>
								<Radio.Group style={{ width: '100%' }} defaultValue='no-end'>
									<Radio style={{ width: '100%' }} value={'end-date'}>
										End date
									</Radio>
									<Form.Item style={{ margin: 0, marginBottom: '14px' }}>
										<DatePicker
											size='large'
											style={{ width: '90%', marginLeft: '5%' }}
											format={getDateFormat()}
										/>
									</Form.Item>
									<Radio style={{ width: '100%' }} value={'end-after'}>
										End after
									</Radio>
									<Form.Item style={{ margin: 0 }}>
										<Input
											size='large'
											defaultValue='1'
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
						<Col span={24}>
							<Row justify='end'>
								<Button type='text' style={{ marginRight: '15px' }} onClick={props.modalClose}>
									Cancel
								</Button>
								<Button type='primary' htmlType='submit'>
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
