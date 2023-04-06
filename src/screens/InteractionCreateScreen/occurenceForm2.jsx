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
	Divider,
	Modal
} from 'antd';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUserPlus } from '@fortawesome/pro-light-svg-icons';
import { CONSTANTS } from '../../constants/constants';
import GenericCard from '../../components/GenericCard/GenericCard';
import { UserAddOutlined, RightOutlined } from '@ant-design/icons';
import '../../components/Forms/CustomerTypeFormCard/CustomerTypeFormCard.scss';
import { ScButtonText } from '../../components/StyledComponents/genericElements';
import './occurenceForm2.scss';
import { useEffect, useState } from 'react';
import CustomRecurrenceModal from './CustomRecurrence';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;

const { Title, Text, Link } = Typography;

const timeFormat = 'HH:mm';

const OccurenceForm2 = ({ form, formData, onValuesChange, rules, csObject, setInvitee }) => {
	let addRelation;
	const PrefixSelector = ({ name, onChange }) => (
		<Form.Item name={name || ''} noStyle>
			<Select
				style={{
					width: 80
				}}
				size='large'
				defaultValue='+91'
				onChange={onChange}
			>
				{csObject?.CountryCode?.lookupValue?.lookUpValues?.map((item) => (
					<Option key={item.Dailing_Code} value={item.Dailing_Code}>
						{item.Dialing_Code}
					</Option>
				))}
			</Select>
		</Form.Item>
	);

	const obj = {
		activityID: null,
		followUpId: null,
		FollowUpActivityStatus: 'O',
		Reminder: '1D',
		interactionType: null,
		startDate: undefined,
		// moment(    //// useful for later work
		//   csObject?.StartDate &&
		//   csObject.StartDate.defaultvalue,
		//   "DD-MM-YYYY"
		// ),
		// startTime: moment(new Date()).format("HH:mm"),
		startTime: null,
		endDate: undefined,
		// moment(
		//   csObject?.EndDate?.defaultvalue,
		//   "DD-MM-YYYY"
		// ),
		endTime: null,
		isAllDay: false, //All Day
		reminder: 'None',
		recurring: undefined,
		frequency: 'None',
		FrequencyDays: undefined,
		occurrence: 1, //End After
		inviteeadd: undefined, //Invite
		repeatsNo: undefined, //Repeats Every (Numeric Input)
		repeatsFrequency: undefined, //Repeats Every (Occurrence)
		recurrenceEndDate: undefined, //End Date
		endsAfter: undefined, // End After
		allDays: false,
		weekDays: false,
		day: 0,
		dayName: null,
		week: null,
		month: 0,
		isEndDate: false,
		IsEndAfter: false,
		CustomEndDate: null,
		closeReason: null,
		remarks: null,
		IsAllOccurrence: false
	};

	const [recurrenceModalOpen, setRecurrenceModalOpen] = useState(false);
	const [modalData, setModalData] = useState(null);
	const [relationDetail, setRelationDetail] = useState([obj]);
	const [hide, setHide] = useState(false);
	const [flag, setFlag] = useState(false);
	const [showDeferredModal, setShowDeferredModal] = useState(false);
	const [radioValue, setRadioValue] = useState('selectedOccurence');
	const [arrayIndex, setArrayIndex] = useState(-1);

	const closeInteractionReasonDropdown = [
		{
			dataValue: 'C',
			displayValue: 'Close'
		},
		{
			dataValue: 'D',
			displayValue: 'Deferred'
		}
	];
	const addNewRelationDetail = () => {
		setRelationDetail([...relationDetail, obj]);
	};

	const checkRelationDetail = (index, value) => {
		setHide(value);
		setRelationDetail([
			...relationDetail.slice(0, index),
			{
				...relationDetail[index],
				isAllDay: value,
				startTime: null,
				endTime: null
			},
			...relationDetail.slice(index + 1)
		]);
	};

	const timeManage = (time) => {
		let returnTime = moment(time.format());
		if (time?.minutes() > 30) {
			returnTime.add(1, 'h');
			returnTime.minutes(0);
		} else {
			returnTime?.minutes(30);
		}
		return returnTime;
	};

	const addMoreRelationDetail = (index) => {
		setRelationDetail([
			...relationDetail.slice(0, index),
			{
				...relationDetail[index],
				AddMore: true
			},
			...relationDetail.slice(index + 1)
		]);
	};

	const removeRelationDetail = (index) => {
		setRelationDetail([...relationDetail.slice(0, index), ...relationDetail.slice(index + 1)]);
	};

	// const onChange = (value, key, idx) => {
	//   setRelationDetail((prevRelationDetail) => {
	//     const newObj = [...prevRelationDetail];
	//     newObj[idx] = { ...newObj[idx], [key]: value, SrlNo: idx + 1 };
	//     return newObj;
	//   });

	//   if (value !== "Custom") setFlag(false);
	// };

	const onChange = (value, key, idx) => {
		setRelationDetail((prevRelationDetail) => {
			const newObj = [...prevRelationDetail];
			newObj[idx] = { ...newObj[idx], [key]: value, SrlNo: idx + 1 };
			return newObj;
		});

		if (value !== 'Custom') setFlag(false);
	};

	const forInviteOnChange = (data) => {
		const ObjectInvite = [];
		data?.forEach(({ value, children, prog_name }) => {
			ObjectInvite.push({
				RefID: value,
				RefType: children,
				prog_name: prog_name
			});
		});
		setInvitee(ObjectInvite);
	};
	useEffect(() => {
		onValuesChange({ RelationDetail: relationDetail });
	}, [relationDetail]);

	const handleCloseInteractionFormChange = (values, index) => {
		if (values === 'D') {
			setShowDeferredModal(true);
		}
		onChange(values, 'closeReason', index);
		// setCloseInteractionFormDetail({
		//   ...closeInteractionFormDetail,
		//   ...values
		// })
	};

	const onFinish = (values) => {};

	const closeDeferredModal = () => {
		setShowDeferredModal(false);
	};

	const selectOccurrenceToClose = () => {
		if (radioValue === 'allOccurences') {
			onChange(true, 'IsAllOccurrence', arrayIndex);
		} else {
			onChange(false, 'IsAllOccurrence', arrayIndex);
		}
		setShowDeferredModal(false);
	};

	const onRadioChange = (e) => {
		setRadioValue(e.target.value);
	};

	const changeFrequencyOnOccurance = (index, value) => {
		setRelationDetail([
			...relationDetail.slice(0, index),
			{
				...relationDetail[index],
				frequency: value === 1 ? 'None' : null,
				occurrence: value
			},
			...relationDetail.slice(index + 1)
		]);
	};

	return (
		<Card
			className='occurence-form'
			// style={{ marginBottom: 20 }}
			title='Occurrence'
			extra={
				// <ScButtonText
				// 	type='text'
				// 	color='#354081'
				// 	//className="addButtonAlign"
				// 	onClick={() => {
				// 		addRelation();
				// 		addNewRelationDetail();
				// 	}}
				// >
				// 	+ Add
				// </ScButtonText>
				<Typography.Title level={5}>
					<Typography.Link
						onClick={() => {
							addRelation();
							addNewRelationDetail();
						}}
					>
						+ Add
					</Typography.Link>
				</Typography.Title>
			}
		>
			<Form
				form={form}
				layout='vertical'
				initialValues={{ RelationDetail: [{}] }}
				onFinish={onFinish}
			>
				<Form.List name='RelationDetail'>
					{(fields, { add, remove }) => {
						addRelation = () => add();
						return fields.map(({ key, name, fieldKey, ...restField }, index) => {
							return (
								<div key={key}>
									<Row justify='space-between'>
										<Col className='gutter-row' span={8}>
											<Form.Item
												name={[name, 'FollowUpActivityStatus']}
												validateTrigger={['onChange', 'onBlur']}
												label={<div className='interaction-text'>Status</div>}
											>
												<Radio.Group
													size='large'
													defaultValue='O'
													buttonStyle='solid'
													onChange={(e) =>
														onChange(e.target.value, 'FollowUpActivityStatus', index)
													}
												>
													{csObject &&
														csObject.ActivityStatus &&
														csObject.ActivityStatus.dropDownValue.map((dataset) => (
															<Radio.Button
																value={dataset.dataValue}
																style={{ width: '50%' }}
																key={dataset.dataValue}
															>
																{dataset.displayValue}
															</Radio.Button>
														))}
												</Radio.Group>
											</Form.Item>
										</Col>
										{/* Status Selection section End */}

										{/* Interaction Type Starts */}
										<Col className='gutter-row' span={8}>
											{/* {formData.relations2 === "O" ? ( */}
											<Form.Item
												name={[name, 'interactionType']}
												label={<div className='interaction-text'>Interaction Type</div>}
												required
												rules={rules ? rules.interactiontype : []}
											>
												<Select
													onChange={(value) => onChange(value, 'interactionType', index)}
													size='large'
													placeholder='Select option'
													mode='single'
													//value={formData.RelationDetail.InteractionType}
													filterOption={(input, opt) => {
														return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
													}}
													showSearch
												>
													{csObject?.InteractionType &&
														csObject?.InteractionType?.dropDownValue &&
														csObject?.InteractionType?.dropDownValue.length > 0 &&
														csObject.InteractionType?.dropDownValue.map((item, index) => (
															<Option value={item.dataValue} key={index}>
																{item.displayValue}
															</Option>
														))}
												</Select>
											</Form.Item>
										</Col>
										<Col>
											<Typography.Link
												onClick={() => {
													remove(name);
													removeRelationDetail(index);
												}}
											>
												<u>Remove</u>
											</Typography.Link>
										</Col>
									</Row>
									<Row>
										<Col className='gutter-row' span={8}>
											<Row gutter={16} className='w-90' justify='space-between'>
												<Col className='gutter-row' span={16}>
													<Form.Item
														name={[name, 'startDate']}
														required
														label={<div className='interaction-text'>Start</div>}
													>
														<DatePicker
															onChange={
																(value) => {
																	onChange(moment(value), 'startDate', index);
																	onChange(moment(value), 'endDate', index);
																}
																// onChange(
																//   moment(value?.format("YYYY-MM-DD")),
																//   "startDate",
																//   index
																// )
															}
															// disabled={hide}
															className='interaction-input-field'
															style={{
																width: '100%',
																height: '44px'
															}}
															size='large'
															defaultValue={moment(new Date())}
															// defaultValue={moment(          // useful in future
															//   csObject?.StartDate &&
															//   csObject.StartDate.defaultvalue,
															//   "DD-MM-YYYY"
															// )}
															format='DD-MM-YYYY'
															allowClear={false}
														/>
													</Form.Item>
												</Col>
												{hide === true ? (
													<Col
														className='gutter-row'
														span={8}
														// style={{ marginTop: 36 }}
													>
														<Form.Item
															name={[name, 'startTime']}
															// rules={rules ? rules.starttime : []}
															label={<div className='interaction-text'>Start Time</div>}
														>
															<TimePicker
																value={moment(relationDetail[index].startTime)}
																// required
																format={timeFormat}
																className='interaction-input-field'
																size='large'
																onChange={(value) => {
																	onChange(value, 'startTime', index);
																	onChange(timeManage(value), 'endTime', index);
																}}
																disabled={hide}
															/>
														</Form.Item>
													</Col>
												) : (
													<Col
														className='gutter-row'
														span={8}
														// style={{ marginTop: 36 }}
													>
														<Form.Item
															name={[name, 'startTime']}
															rules={rules ? rules.starttime : []}
															label={<div className='interaction-text'>Start Time</div>}
														>
															<TimePicker
																value={moment(relationDetail[index].startTime)}
																required
																format={timeFormat}
																className='interaction-input-field'
																size='large'
																onChange={(value) => {
																	onChange(value, 'startTime', index);
																	onChange(timeManage(value), 'endTime', index);
																}}
																disabled={hide}
															/>
														</Form.Item>
													</Col>
												)}
											</Row>
										</Col>
										{/* Start Time Ends */}

										{/* End Time Starts */}
										<Col className='gutter-row' span={8}>
											<Row gutter={16} className='w-90' justify='space-between'>
												<Col className='gutter-row' span={16}>
													<Form.Item
														style={{ marginLeft: 20 }}
														name={[name, 'endDate']}
														required
														label={<div className='interaction-text'>End</div>}
													>
														<DatePicker
															onChange={(value) => onChange(moment(value), 'endDate', index)}
															// disabled={hide}
															className='interaction-input-field'
															style={{
																width: '100%',
																height: '44px'
															}}
															size='large'
															// defaultValue={moment(
															//   csObject?.EndDate?.defaultvalue,
															//   "DD-MM-YYYY"
															// )}
															defaultValue={moment(new Date())}
															value={
																relationDetail[index]?.startDate > moment(new Date())
																	? relationDetail[index]?.startDate
																	: moment(new Date())
															}
															format='DD-MM-YYYY'
															disabledDate={(d) => {
																const myDate = new Date(relationDetail[0]?.startDate);
																return !d || relationDetail[0]?.startDate !== undefined
																	? d.isBefore(myDate)
																	: d.isBefore(new Date().setDate(new Date().getDate()));
															}}
															allowClear={false}
															// disabledDate={(d) =>
															// 	!d || d.isBefore(new Date().setDate(new Date().getDate()))
															// }
														/>
													</Form.Item>
												</Col>
												{hide === true ? (
													<Col
														className='gutter-row'
														span={7}
														// style={{ marginTop: 36 }}
													>
														<Form.Item
															name={[name, 'endTime']}
															// rules={rules ? rules.endtime : []}
															label={<div className='interaction-text'>End Time</div>}
														>
															<TimePicker
																value={moment(relationDetail[index].endTime)}
																// required
																format={timeFormat}
																className='interaction-input-field'
																size='large'
																onChange={(value) => {
																	onChange(value, 'endTime', index);
																}}
																disabled={hide}
															/>
														</Form.Item>
													</Col>
												) : (
													<Col
														className='gutter-row'
														span={7}
														// style={{ marginTop: 36 }}
													>
														<Form.Item
															name={[name, 'endTime']}
															rules={rules ? rules.endtime : []}
															label={<div className='interaction-text'>End Time</div>}
														>
															<TimePicker
																value={moment(relationDetail[index].endTime)}
																required
																format={timeFormat}
																className='interaction-input-field'
																size='large'
																onChange={(value) => {
																	onChange(value, 'endTime', index);
																}}
																disabled={hide}
															/>
														</Form.Item>
													</Col>
												)}
											</Row>
										</Col>
										{/* End Time Ends */}
										{/* All Day Checkbox Starts */}
										<Col className='gutter-row' span={8}>
											<Form.Item name={[name, 'isAllDay']}>
												<Checkbox
													className='interaction-text'
													onChange={(e) => checkRelationDetail(index, e.target.checked)}
												>
													All Day
												</Checkbox>
											</Form.Item>
										</Col>
									</Row>
									<Row>
										{/* Reminder Section Starts */}
										<Col className='gutter-row' span={7}>
											<Form.Item
												name={[name, 'reminder']}
												style={{ marginRight: 20 }}
												label={<div className='interaction-text'>Reminder</div>}
											>
												<Select
													onChange={(value) => onChange(value, 'reminder', index)}
													className='interaction-filter-dropdown'
													size='large'
													placeholder='Select option'
													mode='single'
													// value={form}
													// value={formData.RelationDetail.Reminder}
													filterOption={(input, opt) => {
														return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
													}}
													disabled={relationDetail[index]?.FollowUpActivityStatus === 'C'}
												>
													{csObject?.Reminder &&
														csObject.Reminder.dropDownValue &&
														csObject.Reminder.dropDownValue.length > 0 &&
														csObject.Reminder.dropDownValue.map((item, index) => (
															<Option value={item.dataValue} key={index}>
																{item.displayValue}
															</Option>
														))}
												</Select>
											</Form.Item>
										</Col>
										{/* Reminder Section Ends */}

										{/* Recurring Section Starts */}
										<Col className='gutter-row' span={7}>
											<Form.Item
												name={[name, 'frequency']}
												style={{ marginLeft: 20, marginRight: 20 }}
												label={<div className='interaction-text'>Recurring</div>}
												required={relationDetail[index]?.occurrence > 1}
												rules={
													relationDetail[index]?.occurrence > 1 && rules ? rules.frequency : []
												}
											>
												<Select
													onChange={(value) => onChange(value, 'frequency', index)}
													className='interaction-filter-dropdown'
													size='large'
													placeholder='Select'
													//value={formData.RelationDetail.Reminder}
													onSelect={(val) => {
														if (val === 'Custom') {
															setArrayIndex(index);
															setRecurrenceModalOpen(true);
														}
													}}
													disabled={relationDetail[index]?.FollowUpActivityStatus === 'C'}
												>
													{csObject?.Frequency &&
														csObject.Frequency.dropDownValue &&
														csObject.Frequency.dropDownValue.length > 0 &&
														csObject.Frequency.dropDownValue.map((item, index) => (
															<Option
																value={item.dataValue}
																key={index}
																disabled={
																	(item.displayValue === 'None' &&
																		relationDetail?.[0]?.occurrence > 1) ||
																	(item.displayValue !== 'None' &&
																		relationDetail?.[0]?.occurrence === 1)
																}
															>
																{item.displayValue}
															</Option>
														))}
													<Option value='Custom'>
														<Row justify='space-between' align='middle'>
															Custom Recurrence <RightOutlined />
														</Row>
													</Option>
												</Select>
											</Form.Item>
										</Col>
										{/* Recurring Section Ends */}

										{/* End After Section Starts */}
										<Col className='gutter-row' span={8}>
											<Form.Item
												name={[name, 'occurrence']}
												label={<div className='interaction-text'>End After</div>}
												required
												rules={rules ? rules.occurrence : []}
												hidden={flag}
											>
												<Row gutter={16}>
													<Col className='gutter-row' span={6}>
														<Input
															disabled={relationDetail[index]?.FollowUpActivityStatus === 'C'}
															onChange={(evt) => {
																// onChange(evt.target.value, 'occurrence', index)
																changeFrequencyOnOccurance(index, Number(evt.target.value));
															}}
															size='large'
															type='number'
															defaultValue='1'
															min='1'
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
									</Row>
									<Row>
										{/* Invite Section Starts */}
										<Col className='gutter-row' span={24}>
											<Form.Item
												name={[name, 'inviteeadd']}
												label={<div className='interaction-text'>Invite</div>}
											>
												<Select
													onChange={(value, data) => {
														onChange(value, 'inviteeadd', index);
														forInviteOnChange(data);
													}}
													mode='multiple'
													className='interaction-filter-dropdown'
													allowClear
													style={{ width: '30%' }}
													size='large'
													placeholder='Search Name'
													//defaultValue={["a10", "c12"]}
												>
													{csObject?.fInvitee &&
														csObject.fInvitee.lookupValue &&
														csObject.fInvitee.lookupValue.lookUpValues &&
														csObject.fInvitee.lookupValue.lookUpValues.length > 0 &&
														csObject.fInvitee.lookupValue.lookUpValues.map((item, index) => (
															<Option
																value={item.data_value}
																key={index}
																prog_name={item.prog_name}
															>
																{item.display_value}
															</Option>
														))}
												</Select>
											</Form.Item>
										</Col>
										{relationDetail[index]?.FollowUpActivityStatus === 'C' && (
											<Col className='gutter-row' span={24}>
												<Col className='gutter-row' span={6}>
													<Form.Item label='Reason' name={[name, 'closeReason']}>
														<Select
															size='large'
															placeholder='Select option'
															style={{ width: '90%' }}
															onChange={(value) => {
																setArrayIndex(index);
																handleCloseInteractionFormChange(value, index);
															}}
														>
															{/* {csObject?.Activity_CloseReason &&
                                  csObject.Activity_CloseReason.dropDownValue &&
                                  csObject.Activity_CloseReason.dropDownValue.map(
                                    (item, index) => (
                                      <Select.Option value={item.data_value} key={index}>
                                        {item.display_value}
                                      </Select.Option>
                                    )
                                  )} */}
															{closeInteractionReasonDropdown.map((item, index) => (
																<Option value={item.dataValue} key={index}>
																	{item.displayValue}
																</Option>
															))}
														</Select>
													</Form.Item>
												</Col>
												{/* <Row> */}
												<Col className='gutter-row' span={24}>
													<Form.Item label='Meeting Notes' name={[name, 'remarks']}>
														<TextArea
															rows={7}
															onChange={(evt) => onChange(evt.target.value, 'remarks', index)}
															style={{ width: '80%' }}
														/>
													</Form.Item>
												</Col>
												{/* </Row> */}
											</Col>
										)}

										<Divider />
										{/* Invite Section Ends */}
									</Row>
								</div>
							);
						});
					}}
				</Form.List>
				<Modal
					visible={showDeferredModal}
					onCancel={closeDeferredModal}
					footer={null}
					width={700}
					centered
				>
					<div>
						<Title level={3} style={{ color: '#354081' }}>
							Close Interaction
						</Title>
						<Divider />
						<div className='deferred-modal-body'>
							Are you sure you want to Close the selected Interaction?
							<div className='modal-radio'>
								<Radio.Group onChange={onRadioChange} value={radioValue}>
									<Radio value='selectedOccurence' className='radio-style'>
										Selected Occurence
									</Radio>
									<Radio value='allOccurences' className='radio-style'>
										All Occurences
									</Radio>
								</Radio.Group>
							</div>
						</div>
						<Row justify='end'>
							<Button className='text-only-btn' key='back' type='text' onClick={closeDeferredModal}>
								Cancel
							</Button>
							<Button
								className='submit-btn'
								key='submit'
								type='primary'
								onClick={selectOccurrenceToClose}
							>
								Done
							</Button>
						</Row>
					</div>
				</Modal>
			</Form>

			<CustomRecurrenceModal
				onValuesChange={onChange}
				modal={recurrenceModalOpen}
				index={arrayIndex}
				modalClose={() => setRecurrenceModalOpen(false)}
				data={modalData}
				setData={(val) => setModalData(val)}
				setFlag={() => setFlag(true)}
			/>
		</Card>
	);
};

export default OccurenceForm2;
