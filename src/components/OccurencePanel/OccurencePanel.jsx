import {
	Form,
	Input,
	Button,
	Card,
	Select,
	DatePicker,
	TimePicker,
	Radio,
	Checkbox,
	Row,
	Col,
	Typography,
	Divider
} from 'antd';

import { UserAddOutlined, RightOutlined } from '@ant-design/icons';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';

const { Option } = Select;

const { Title, Text, Link } = Typography;

const OccurencePanel = (props) => {
	const children = [];
	const styleSet = {
		datePicker: {
			width: '100%',
			height: '44px'
		}
	};
	for (let i = 10; i < 36; i++) {
		children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
	}

	function handleChange(value) {
		console.log(`selected ${value}`);
	}
	return (
		<>
			<Form
				className='occurence-form'
				layout='vertical'
				form={props.form}
				initialValues={props.formData}
				onValuesChange={props.onValuesChange}
			>
				<Form.List name='relations'>
					{(fields, { add, remove }) => (
						<>
							<Card
								className='interaction-occ-card-type'
								title='Occurence'
								extra={
									<Button
										type='text'
										onClick={() => {
											add();
										}}
									>
										Add&nbsp; <FontAwesomeIcon icon={faPlus} />
									</Button>
								}
							>
								{fields.map((field) => (
									<Row gutter={16} key={field.key}>
										<Col className='gutter-row' span={8}>
											<Form.Item
												name='status'
												validateTrigger={['onChange', 'onBlur']}
												label={<div className='interaction-text'>Select</div>}
											>
												<Radio.Group
													value={props.formData.relations.ActivityStatus}
													size='large'
													style={{ width: '70%' }}
												>
													{props.csObject &&
														props.csObject.ActivityStatus &&
														props.csObject.ActivityStatus.dropDownValue.map((radioOption) => (
															<Radio.Button
																style={{ width: '50%' }}
																className={`interaction-radio-field ${
																	props.formData.relations.ActivityStatus === radioOption.dataValue
																		? 'active'
																		: ''
																}`}
																value={radioOption.dataValue}
																key={radioOption.dataValue}
															>
																{radioOption.displayValue}
															</Radio.Button>
														))}
												</Radio.Group>
											</Form.Item>
										</Col>
										<Col className='gutter-row' span={8}>
											{props.formData.relations.ActivityStatus === 'O' ? (
												<Form.Item
													name='interactionType'
													label={<div className='interaction-text'>Interaction Type</div>}
												>
													<Select
														className='interaction-filter-dropdown'
														size='large'
														placeholder='Select option'
														mode='single'
														value={props.formData.relations.InteractionType}
														filterOption={(input, opt) => {
															return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
														}}
														showSearch
													>
														{props.csObject.InteractionType &&
															props.csObject.InteractionType.dropDownValue &&
															props.csObject.InteractionType.dropDownValue.length > 0 &&
															props.csObject.InteractionType.dropDownValue.map((item, index) => (
																<Option value={item.dataValue} key={index}>
																	{item.displayValue}
																</Option>
															))}
													</Select>
												</Form.Item>
											) : (
												<Form.Item
													name='closeReason'
													label={<div className='interaction-text'>Close Reason</div>}
												>
													<Select
														className='interaction-filter-dropdown'
														size='large'
														placeholder='Select option'
														mode='single'
														value={props.formData.relations.InteractionType}
														filterOption={(input, opt) => {
															return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
														}}
														showSearch
													>
														{props.csObject.Activity_CloseReason &&
															props.csObject.Activity_CloseReason.dropDownValue &&
															props.csObject.Activity_CloseReason.dropDownValue.length > 0 &&
															props.csObject.Activity_CloseReason.dropDownValue.map(
																(item, index) => (
																	<Option value={item.dataValue} key={index}>
																		{item.displayValue}
																	</Option>
																)
															)}
													</Select>
												</Form.Item>
											)}
										</Col>
										<Col className='gutter-row' span={8} justify='end'>
											<Row gutter={16} justify='end'>
												<Link
													type='link'
													onClick={() => {
														remove(field.name);
													}}
												>
													<u className='interaction-text'>Remove</u>
												</Link>
											</Row>
										</Col>
										<Col className='gutter-row' span={8}>
											<Form.Item
												name='startDate'
												label={<div className='interaction-text'>Start</div>}
											>
												<Row gutter={16} className='w-90' justify='space-between'>
													<Col className='gutter-row' span={16}>
														<DatePicker
															className='interaction-input-field'
															style={styleSet.datePicker}
															size='large'
															defaultValue={moment(
																props.csObject.StartDate && props.csObject.StartDate.defaultvalue,
																'DD-MM-YYYY'
															)}
															format='DD-MM-YYYY'
															disabledDate={(d) =>
																!d || d.isAfter(new Date().setDate(new Date().getDate()))
															}
														/>
													</Col>
													<Col className='gutter-row' span={7}>
														<TimePicker
															className='interaction-input-field'
															size='large'
															defaultValue={moment('12:00', 'HH:mm')}
															format='HH:mm'
														/>
													</Col>
												</Row>
											</Form.Item>
										</Col>
										<Col className='gutter-row' span={8}>
											<Form.Item name='endDate' label={<div className='interaction-text'>End</div>}>
												<Row gutter={16} className='w-90' justify='space-between'>
													<Col className='gutter-row' span={16}>
														<DatePicker
															className='interaction-input-field'
															style={{
																width: '100%',
																height: '44px'
															}}
															size='large'
															defaultValue={moment(
																props.csObject.EndDate.defaultvalue,
																'DD-MM-YYYY'
															)}
															format='DD-MM-YYYY'
															disabledDate={(d) =>
																!d || d.isBefore(new Date().setDate(new Date().getDate()))
															}
														/>
													</Col>
													<Col className='gutter-row' span={7}>
														<TimePicker
															className='interaction-input-field'
															size='large'
															defaultValue={moment('12:30', 'HH:mm')}
															format='HH:mm'
														/>
													</Col>
												</Row>
											</Form.Item>
										</Col>
										<Col className='gutter-row' span={8}>
											<Form.Item label='isAllDay'>
												<Checkbox className='interaction-text'>All Day</Checkbox>
											</Form.Item>
										</Col>
										<Col className='gutter-row' span={8}>
											<Form.Item
												name='reminder'
												label={<div className='interaction-text'>Reminder</div>}
											>
												<Select
													className='interaction-filter-dropdown'
													size='large'
													placeholder='Select option'
													mode='single'
													value={props.formData.relations.Reminder}
													filterOption={(input, opt) => {
														return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
													}}
													showSearch
												>
													{props.csObject.Reminder &&
														props.csObject.Reminder.dropDownValue &&
														props.csObject.Reminder.dropDownValue.length > 0 &&
														props.csObject.Reminder.dropDownValue.map((item, index) => (
															<Option value={item.dataValue} key={index}>
																{item.displayValue}
															</Option>
														))}
												</Select>
											</Form.Item>
										</Col>
										<Col className='gutter-row' span={8}>
											<Form.Item
												name='recurring'
												label={<div className='interaction-text'>Recurring</div>}
											>
												<Select
													className='interaction-filter-dropdown'
													size='large'
													placeholder='None'
													value={props.formData.relations.Reminder}
													onSelect={(val) => {
														if (val === 'Custom') {
															props.setRecurrenceModalOpen(true);
														}
													}}
												>
													{props.csObject.Frequency &&
														props.csObject.Frequency.dropDownValue &&
														props.csObject.Frequency.dropDownValue.length > 0 &&
														props.csObject.Frequency.dropDownValue.map((item, index) => (
															<Option value={item.dataValue} key={index}>
																{item.displayValue}
															</Option>
														))}
													{/* <Option value="Custom">
                              <Row
                                gutter={16}
                                justify="space-between"
                                align="middle"
                              >
                                {props.csObject.Reminder.dropDownValue.displayValue}{" "}
                                <RightOutlined />
                              </Row>
                            </Option> */}
												</Select>
											</Form.Item>
										</Col>
										<Col className='gutter-row' span={8}>
											<Form.Item
												name='occurrence'
												label={<div className='interaction-text'>End After</div>}
											>
												<Row gutter={16}>
													<Col className='gutter-row' span={6}>
														<Input
															size='large'
															defaultValue='1'
															className='interaction-input-field'
														/>
													</Col>
													<Col className='gutter-row' span={18}>
														<Text className='interaction-text'>Occurance(s)</Text>
													</Col>
												</Row>
											</Form.Item>
										</Col>
										<Col className='gutter-row' span={24}>
											<Form.Item
												name='invite'
												label={<div className='interaction-text'>Invite</div>}
											>
												<Select
													mode='multiple'
													// className="interaction-filter-dropdown"
													allowClear
													style={{ width: '100%' }}
													size='large'
													placeholder='None'
													defaultValue={['a10', 'c12']}
													onChange={handleChange}
												>
													{children}
												</Select>
											</Form.Item>
										</Col>
										<Divider />
									</Row>
								))}
							</Card>
						</>
					)}
				</Form.List>
			</Form>
		</>
	);
};

export default OccurencePanel;
