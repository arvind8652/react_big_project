import {
	Form,
	Avatar,
	Input,
	Button,
	Card,
	Select,
	Radio,
	Row,
	Col,
	Typography,
	Space
} from 'antd';
import './interactionCreate.scss';
import { useState, useEffect } from 'react';
import {
	getDependentProspectClientDataApi,
	getDependentOppNameDataApi
} from '../../../src/api/commonApi';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker, TimePicker, Checkbox, Divider } from 'antd';
import moment from 'moment';
const { Option } = Select;
const { Text } = Typography;

const { Title, Link } = Typography;

const ClientProspectDetailsForm2 = (props) => {
	const [nameDropdown, setNameDropdown] = useState([]);
	const [oppNameDropdown, setOppNameDropdown] = useState([]);

	useEffect(() => {
		getDependentProspectClientDataApi(props.formData.refType)
			.then((res) => {
				res.data.returnColumn === 'CustomerID' &&
					setNameDropdown(res && res.data && res.data.lookUpValues);
				props.form.setFieldsValue({
					refID: '',
					relationshipManager: '',
					branch: '',
					opportunity: ''
				});
				props.formData.refID = '';
				props.formData.relationshipManager = '';
				props.formData.branch = '';
				props.formData.opportunityName = '';
			})
			.catch((err) => {
				console.log(err);
			});
	}, [props.formData.refType]);

	useEffect(() => {
		getDependentOppNameDataApi(props.formData.refType)
			.then((res) => {
				res.data.returnColumn === 'opportunityname' && setOppNameDropdown(res.data.lookUpValues);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [props.formData.refType]);

	const clearValues = () => {
		props.form.setFieldsValue({
			refID: '',
			relationshipManager: '',
			branch: ''
		});
	};

	return (
		<Form
			className='clientProspect-form'
			form={props.form}
			layout='vertical'
			initialValues={props.formData}
			onValuesChange={props.onValuesChange}
		>
			<Form.List name='relations'>
				{(fields, { add, remove }) => (
					<>
						<Card
							className='interaction-card-type'
							title='Client / Prospect Details'
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
									{/* Status Selection section Start */}
									<Col className='gutter-row' span={8}>
										<Form.Item
											name='relations2'
											validateTrigger={['onChange', 'onBlur']}
											label={<div className='interaction-text'>Status</div>}
										>
											<Radio.Group
												size='large'
												style={{ width: '70%' }}
												onChange={clearValues}
												value={props.formData.relations2}
											>
												<Radio.Button
													value='O'
													className={`interaction-radio-field ${
														props.formData.relations2 === 'O' && 'active'
													}`}
												>
													Open
												</Radio.Button>
												<Radio.Button
													value='C'
													className={`interaction-radio-field ${
														props.formData.relations2 === 'C' && 'active'
													}`}
												>
													Closed
												</Radio.Button>
												{/* {
                                props.csObject &&
                                props.csObject.ActivityStatus && 
                                props.csObject.ActivityStatus.dropDownValue.map(
                                    (radioOption) => (
                                        <Radio.Button
                                   style={{ width: "50%" }}
                                   className={`interaction-radio-field ${
                                     props.formData.relations.ActivityStatus  ===
                                     radioOption.dataValue
                                       ? "active"
                                       : ""
                                   }`}
                                   value={radioOption.dataValue}
                                 ></Radio.Button>
                                <>
                                <Radio.Button
                    value="PROSPECTADD"
                    className={`interaction-radio-field ${props.formData.relations.ActivityStatus === radioOption.dataValue ? "active" : ""
                      }`}
                  >
                    {props.formData.relations.ActivityStatus == "O" ? 'Open' : "Closed"}
                  </Radio.Button> */}
												{/* <Radio.Button
                    value="CLIENTADD"
                    className={`interaction-radio-field ${props.formData.relations.ActivityStatus === "C" && "active"
                      }`}
                  >
                    Closed
                  </Radio.Button> 
                                </>
                                    )
                                )
                            } */}
											</Radio.Group>
										</Form.Item>
									</Col>
									{/* Status Selection section End */}

									{/* Interaction Type Starts */}
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
												>
													{props.csObject.Activity_CloseReason &&
														props.csObject.Activity_CloseReason.dropDownValue &&
														props.csObject.Activity_CloseReason.dropDownValue.length > 0 &&
														props.csObject.Activity_CloseReason.dropDownValue.map((item, index) => (
															<Option value={item.dataValue} key={index}>
																{item.displayValue}
															</Option>
														))}
												</Select>
											</Form.Item>
										)}
									</Col>
									{/* Interaction Type Ends */}

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

									{/* Start Time Starts */}
									<Col className='gutter-row' span={8}>
										<Form.Item
											name='startDate'
											label={<div className='interaction-text'>Start</div>}
										>
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
									{/* Start Time Ends */}

									{/* End Time Starts */}
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
														defaultValue={moment(props.csObject.EndDate.defaultvalue, 'DD-MM-YYYY')}
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
									{/* End Time Ends */}

									{/* All Day Checkbox Starts */}
									<Col className='gutter-row' span={8}>
										<Form.Item>
											<Checkbox className='interaction-text'>All Day</Checkbox>
										</Form.Item>
									</Col>
									{/* All Day Checkbox Ends */}

									{/* Reminder Section Starts */}
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
												// value={props.form}
												// value={props.formData.relations.Reminder}
												filterOption={(input, opt) => {
													return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
												}}
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
									{/* Reminder Section Ends */}

									{/* Recurring Section Starts */}
									<Col className='gutter-row' span={8}>
										<Form.Item
											name='recurring'
											label={<div className='interaction-text'>Recurring</div>}
										>
											<Select
												className='interaction-filter-dropdown'
												size='large'
												placeholder='None'
												//value={props.formData.relations.Reminder}
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
												<Option value='Custom'>
													<Row gutter={16} justify='space-between' align='middle'>
														{props.csObject.Reminder.dropDownValue.displayValue}{' '}
														{/* <RightOutlined /> */}
													</Row>
												</Option>
											</Select>
										</Form.Item>
									</Col>
									{/* Recurring Section Ends */}

									{/* End After Section Starts */}
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
									{/* End After Section Ends */}

									{/* Invite Section Starts */}
									<Col className='gutter-row' span={24}>
										<Form.Item name='invite' label={<div className='interaction-text'>Invite</div>}>
											<Select
												mode='multiple'
												className='interaction-filter-dropdown'
												allowClear
												style={{ width: '100%' }}
												size='large'
												placeholder='Search Name'
												//defaultValue={["a10", "c12"]}
												//onChange={handleChange}
											>
												{props.csObject.fInvitee &&
													props.csObject.fInvitee.lookupValue &&
													props.csObject.fInvitee.lookupValue.lookUpValues &&
													props.csObject.fInvitee.lookupValue.lookUpValues.length > 0 &&
													props.csObject.fInvitee.lookupValue.lookUpValues.map((item, index) => (
														<Option value={item.data_value} key={index}>
															{item.display_value}
														</Option>
													))}
											</Select>
										</Form.Item>
									</Col>
									<Divider />
									{/* Invite Section Ends */}
								</Row>
							))}
						</Card>
					</>
				)}
			</Form.List>
		</Form>
	);
};

export default ClientProspectDetailsForm2;
