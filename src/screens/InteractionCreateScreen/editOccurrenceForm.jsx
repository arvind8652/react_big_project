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
import { RightOutlined } from '@ant-design/icons';
import '../../components/Forms/CustomerTypeFormCard/CustomerTypeFormCard.scss';
import './occurenceForm2.scss';
import { useEffect, useState } from 'react';
import CustomRecurrenceModal from './CustomRecurrence';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;

const { Title, Text } = Typography;

const timeFormat = 'HH:mm';

const EditOccurenceForm = ({
	// form,
	formData,
	onValuesChange,
	rules,
	ExistingData,
	csObject,
	singleOrMultiple,
	setInvitee,
	relationDetail,
	setRelationDetail
}) => {
	const [recurrenceModalOpen, setRecurrenceModalOpen] = useState(false);
	const [modalData, setModalData] = useState(null);
	const [showDeferredModal, setShowDeferredModal] = useState(false);
	const [radioValue, setRadioValue] = useState('selectedOccurence');
	const [arrayIndex, setArrayIndex] = useState(-1);
	const [hide, setHide] = useState(false);

	useEffect(() => {
		if (formData.RelationDetail) {
			//RESETTING START-TIME & END-TIME TO MOMENT OBJECT
			let relationData = formData.RelationDetail[0];

			setRelationDetail({
				...relationData,
				startTime: relationData?.startTime ? moment(relationData?.startTime, timeFormat) : null,
				endTime: relationData?.endTime ? moment(relationData?.endTime, timeFormat) : null,
				inviteeadd: relationData?.inviteeadd.map((e) => e.refID)
			});
		}
	}, [formData.RelationDetail]);

	const checkRelationDetail = (value) => {
		setHide(value);
		setRelationDetail({
			...relationDetail,
			isAllDay: value,
			startTime: null,
			endTime: null
		});
	};
	// const closeInteractionReasonDropdown = [
	//   {
	//     dataValue: "C",
	//     displayValue: "Close",
	//   },
	//   {
	//     dataValue: "D",
	//     displayValue: "Deferred",
	//   },
	// ];

	// const addNewRelationDetail = () => {
	//   var obj = {
	//     ////////////////////////////
	//     activityID: null,
	//     followUpId: null,
	//     FollowUpActivityStatus: "O",
	//     Reminder: "1D",
	//     interactionType: null,
	//     startDate: undefined,
	//     // moment(    //// useful for later work
	//     //   csObject?.StartDate &&
	//     //   csObject.StartDate.defaultvalue,
	//     //   "DD-MM-YYYY"
	//     // ),
	//     startTime: "12:00",
	//     endDate: undefined,
	//     // moment(
	//     //   csObject?.EndDate?.defaultvalue,
	//     //   "DD-MM-YYYY"
	//     // ),
	//     endTime: "12:30",
	//     isAllDay: false, //All Day
	//     reminder: "none",
	//     recurring: undefined,
	//     frequency: "none",
	//     FrequencyDays: undefined,
	//     occurrence: 1, //End After
	//     inviteeadd: undefined, //Invite
	//     repeatsNo: undefined, //Repeats Every (Numeric Input)
	//     repeatsFrequency: undefined, //Repeats Every (Occurrence)
	//     recurrenceEndDate: undefined, //End Date
	//     endsAfter: undefined, // End After
	//     allDays: false,
	//     weekDays: false,
	//     day: 0,
	//     dayName: null,
	//     week: null,
	//     month: 0,
	//     isEndDate: false,
	//     IsEndAfter: false,
	//     CustomEndDate: null,
	//     closeReason: null,
	//     remarks: null,
	//     IsAllOccurrence: false,
	//   };
	//   setRelationDetail([...relationDetail, obj]);
	// };
	// const setExistingDatatoFields = () => {
	//   var obj = {
	//     ////////////////////////////
	//     id: ExistingData?.id ? ExistingData.id : null,
	//     activityID: ExistingData?.activityID ? ExistingData.activityID : null,
	//     followUpId: ExistingData?.followUpID,
	//     refID: ExistingData?.refID ? ExistingData?.refID : null,
	//     FollowUpActivityStatus: ExistingData?.activityStatus
	//       ? ExistingData.activityStatus
	//       : null,
	//     activityStatus: ExistingData?.activityStatus
	//       ? ExistingData.activityStatus
	//       : null,
	//     reminder: ExistingData?.reminder ? ExistingData.reminder : "none",
	//     InteractionType: ExistingData?.interactionTypeName
	//       ? ExistingData.interactionTypeName
	//       : null,
	//     startDate: ExistingData?.startDate ? ExistingData.startDate : undefined,
	//     startTime: ExistingData?.startTime ? ExistingData.startTime : "12:00",
	//     endDate: ExistingData?.endDate ? ExistingData.endDate : undefined,
	//     endTime: ExistingData?.endTime ? ExistingData.endTime : "12:30",
	//     isAllDay: ExistingData?.isAllDay ? ExistingData.isAllDay : false, //All Day
	//     recurring: ExistingData?.recurring ? ExistingData.recurring : undefined,
	//     frequency: ExistingData?.frequency ? ExistingData.frequency : "none",
	//     FrequencyDays: ExistingData?.FrequencyDays
	//       ? ExistingData.FrequencyDays
	//       : undefined,
	//     occurrence: ExistingData?.occurrence ? ExistingData.occurrence : 1, //End After
	//     inviteeadd: ExistingData?.inviteeadd
	//       ? ExistingData.inviteeadd
	//       : undefined, //Invite
	//     repeatsNo: ExistingData?.repeatsNo ? ExistingData.repeatsNo : undefined, //Repeats Every (Numeric Input)
	//     repeatsFrequency: ExistingData?.repeatsFrequency
	//       ? ExistingData.repeatsFrequency
	//       : undefined, //Repeats Every (Occurrence)
	//     recurrenceEndDate: ExistingData?.recurrenceEndDate
	//       ? ExistingData.recurrenceEndDate
	//       : undefined, //End Date
	//     endsAfter: ExistingData?.endsAfter ? ExistingData.endsAfter : undefined, // End After
	//     allDays: ExistingData?.allDays ? ExistingData.allDays : false,
	//     weekDays: ExistingData?.weekDays ? ExistingData.weekDays : false,
	//     day: ExistingData?.day ? ExistingData.day : 0,
	//     dayName: ExistingData?.dayName ? ExistingData.dayName : null,
	//     week: ExistingData?.week ? ExistingData.week : null,
	//     month: ExistingData?.month ? ExistingData.month : 0,
	//     isEndDate: ExistingData?.isEndDate ? ExistingData.isEndDate : false,
	//     IsEndAfter: ExistingData?.IsEndAfter ? ExistingData.IsEndAfter : false,
	//     CustomEndDate: ExistingData?.CustomEndDate
	//       ? ExistingData.CustomEndDate
	//       : null,
	//     closeReason: ExistingData?.closeReason ? ExistingData.closeReason : null,
	//     remarks: ExistingData?.remarks ? ExistingData.remarks : null,
	//     IsAllOccurrence: ExistingData?.IsAllOccurrence
	//       ? ExistingData.IsAllOccurrence
	//       : false,
	//   };
	//   setRelationDetail([...relationDetail, obj]);
	// };

	// const checkRelationDetail = (index, value) => {
	//   setHide(value);
	//   setRelationDetail([
	//     ...relationDetail.slice(0, index),
	//     {
	//       ...relationDetail[index],
	//       isAllDay: value,
	//     },
	//     ...relationDetail.slice(index + 1),
	//   ]);
	// };
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

	const onChange = (value, key, idx) => {
		setRelationDetail((prevRelationDetail) => {
			return { ...prevRelationDetail, [key]: value };
		});
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
		onValuesChange({ ...formData, RelationDetail: relationDetail });
		form.setFieldsValue(relationDetail);
	}, [relationDetail]);

	// const onChange = (value, key, idx, data) => {
	//   const ObjectInvite = [];
	//   data?.forEach(({ value, children, prog_name }) => {
	//     ObjectInvite.push({
	//       RefID: value,
	//       RefType: children,
	//       prog_name: prog_name,
	//     });
	//   });
	//   setInvitee(ObjectInvite);
	//   console.log({ value });
	//   setRelationDetail((prevRelationDetail) => {
	//     const newObj = [...prevRelationDetail];
	//     newObj[idx] = { ...newObj[idx], [key]: value, SrlNo: idx + 1 };
	//     console.log({ newObj });
	//     return newObj;
	//   });
	// };

	// const onChange = (value, key, idx) => {
	//   setRelationDetail((prevRelationDetail) => {
	//     const newObj = [...prevRelationDetail];
	//     newObj[idx] = { ...newObj[idx], [key]: value, SrlNo: idx + 1 };
	//     return newObj;
	//   });
	// };

	// useEffect(() => {
	//   onValuesChange({ ...relationDetail[0], RelationDetail: relationDetail });
	// }, [relationDetail]);

	// useEffect(() => {
	//   setExistingDatatoFields();
	// }, []);

	const handleCloseInteractionFormChange = (values, index) => {
		if (values === 'D') {
			setShowDeferredModal(true);
		}
		onChange(values, 'closeReason');
		// setCloseInteractionFormDetail({
		//   ...closeInteractionFormDetail,
		//   ...values
		// })
	};

	const onFinish = (values) => {
		console.log('Received values of form:', values);
	};

	const closeDeferredModal = () => {
		setShowDeferredModal(false);
	};

	const selectOccurrenceToClose = () => {
		if (radioValue === 'allOccurences') {
			onChange(true, 'IsAllOccurrence');
		} else {
			onChange(false, 'IsAllOccurrence');
		}
		setShowDeferredModal(false);
	};

	const onRadioChange = (e) => {
		setRadioValue(e.target.value);
	};

	const timeManage = (time) => {
		let returnTime = moment(time.format());
		if (time?.minutes() > 30) {
			returnTime.add(1, 'h');
			returnTime.minutes(0);
		} else {
			returnTime?.minutes(30);
		}
		// return returnTime;
		onChange(returnTime, 'endTime', 0);
	};

	const changeFrequencyOnOccurance = (value) => {
		setRelationDetail({
			...relationDetail,
			frequency: value === 1 ? 'None' : null,
			frequencyName: value === 1 ? 'None' : null,
			occurrence: value
		});
	};

	const [form] = Form.useForm();

	return (
		<Card className='occurence-form' title='Occurrence'>
			<Form
				form={form}
				layout='vertical'
				initialValues={{ RelationDetail: [{}] }}
				onFinish={onFinish}
			>
				<div>
					<Row justify='space-between'>
						<Col className='gutter-row' span={8}>
							<Form.Item
								name='FollowUpActivityStatus'
								validateTrigger={['onChange', 'onBlur']}
								label={<div className='interaction-text'>Status</div>}
							>
								<Radio.Group
									size='large'
									defaultValue='O'
									buttonStyle='solid'
									onChange={(e) => onChange(e.target.value, 'FollowUpActivityStatus')}
									disabled={singleOrMultiple === 1 ? true : false}
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
								name='interactionType'
								label={<div className='interaction-text'>Interaction Type</div>}
								required
								rules={rules ? rules.interactiontype : []}
							>
								<Select
									// onChange={(value) => onChange(value, 'interactionType')}
									onChange={(e, value) => {
										onChange(value.children, 'interactionTypeName');
										onChange(value.value, 'interactionType');
									}}
									size='large'
									placeholder='Select option'
									mode='single'
									//value={formData.RelationDetail.InteractionType}
									filterOption={(input, opt) => {
										return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									showSearch
									disabled={singleOrMultiple === 1 ? true : false}
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
							{/* <Typography.Link
                                onClick={() => {
                                    // remove(name);
                                    // removeRelationDetail(0);
                                }}
                            >
                                <u>Remove</u>
                            </Typography.Link> */}
						</Col>
					</Row>
					<Row>
						<Col className='gutter-row' span={8}>
							<Row
								gutter={16}
								className='w-90'
								// justify="space-between"
							>
								<Col className='gutter-row' span={10}>
									{/* <div className='interaction-text'>Start</div> */}
									<Form.Item
										name='startDate'
										label={<div className='interaction-text'>Start</div>}
										required
										// disabled={singleOrMultiple === 1 ? true : false}
									>
										{' '}
										<DatePicker
											onChange={(value) => {
												onChange(moment(value), 'startDate');
												onChange(moment(value), 'endDate', 0);
											}}
											className='interaction-input-field'
											style={{
												width: '100%',
												height: '44px'
											}}
											size='large'
											// defaultValue={moment(ExistingData?.startDate)}
											value={relationDetail?.startDate ? moment(relationDetail.startDate) : null}
											disabled={singleOrMultiple === 1 ? true : false}
											format='DD-MM-YYYY'
											allowClear={false}
										/>
									</Form.Item>
								</Col>

								<Col
									className='gutter-row'
									span={7}
									// style={{ marginTop: 20 }}
								>
									<Form.Item
										name={'startTime'}
										className='timeManage'
										// rules={rules ? rules.starttime : []}
										label={<div className='interaction-text'>Start Time</div>}
										// style={{ marginTop: 20 }}
									>
										<TimePicker
											// value={moment(ExistingData?.startTime, timeFormat)}
											// value={
											//   ExistingData?.startTime
											//     ? moment(ExistingData?.startTime, timeFormat)
											//     : null
											// }
											value={relationDetail?.startTime ? relationDetail?.startTime : null}
											format={timeFormat}
											// required
											className='interaction-input-field'
											size='large'
											// style={{
											//   height: "44px",
											//   marginRight: 10,
											// }}
											onChange={(value) => {
												onChange(value, 'startTime', 0);
												// onChange(timeManage(value), 'endTime', 0);
												timeManage(value);
											}}
											disabled={hide}
										/>
									</Form.Item>
								</Col>
							</Row>
						</Col>
						{/* Start Time Ends */}

						{/* End Time Starts */}
						<Col className='gutter-row' span={8}>
							<Row
								gutter={16}
								className='w-90'
								// justify="space-between"
							>
								<Col className='gutter-row' span={10}>
									{/* <div className='interaction-text'>End</div> */}
									<Form.Item
										style={{ marginLeft: 20 }}
										name='endDate'
										label={<div className='interaction-text'>End</div>}
										required
									>
										{''}
										<DatePicker
											onChange={(value) => onChange(moment(value), 'endDate', 0)}
											className='interaction-input-field'
											style={{
												width: '100%',
												height: '44px'
											}}
											size='large'
											// defaultValue={moment(ExistingData?.endDate)}
											value={relationDetail?.endDate ? moment(relationDetail.endDate) : null}
											// value={relationDetail[index]?.startDate > moment(new Date(), "DD-MM-YYYY") ? relationDetail[index]?.startDate : moment(new Date(), "DD-MM-YYYY")}
											format='DD-MM-YYYY'
											disabled={singleOrMultiple === 1 ? true : false}
											disabledDate={(d) => {
												const myDate = new Date(relationDetail?.startDate);
												return !d || relationDetail?.startDate !== undefined
													? d.isBefore(myDate)
													: d.isBefore(new Date().setDate(new Date().getDate()));
											}}
											allowClear={false}
											// disabledDate={(d) =>
											//   !d || d.isBefore(new Date().setDate(new Date().getDate()))
											// }
										/>
									</Form.Item>
								</Col>
								<Col
									className='gutter-row'
									span={7}
									// style={{ marginTop: 21 }}
								>
									<Form.Item
										name={'endTime'}
										className='timeManage'
										// rules={rules ? rules.starttime : []}
										label={<div className='interaction-text'>End Time</div>}
										// style={{ marginTop: 20 }}
									>
										<TimePicker
											// value={moment(ExistingData?.endTime, timeFormat)}
											// value={
											//   ExistingData?.endTime
											//     ? moment(ExistingData?.endTime, timeFormat)
											//     : null
											// }
											value={relationDetail?.endTime ? relationDetail?.endTime : null}
											format={timeFormat}
											className='interaction-input-field'
											size='large'
											// style={{
											// 	height: '44px',
											// 	marginLeft: 10,
											// 	marginRight: 10
											// }}
											onChange={(value) => {
												onChange(value, 'endTime', 0);
											}}
											disabled={hide}
										/>
									</Form.Item>
								</Col>
							</Row>
						</Col>
						{/* End Time Ends */}
						{/* All Day Checkbox Starts */}
						<Col className='gutter-row' span={8}>
							<Form.Item name='isAllDay' style={{ marginTop: 25 }}>
								<Checkbox
									className='interaction-text'
									onChange={(e) => checkRelationDetail(e.target.checked)}
									disabled={singleOrMultiple === 1 ? true : false}
									checked={relationDetail?.isAllDay}
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
								name='reminder'
								style={{ marginRight: 20 }}
								label={<div className='interaction-text'>Reminder</div>}
							>
								<Select
									onChange={(value) => onChange(value, 'reminder', 0)}
									className='interaction-filter-dropdown'
									size='large'
									placeholder='Select option'
									mode='single'
									//value={formData.RelationDetail.Reminder}
									filterOption={(input, opt) => {
										return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									disabled={
										relationDetail?.FollowUpActivityStatus === 'C' || singleOrMultiple === 1
											? true
											: false
									}
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
								name='frequency'
								style={{ marginLeft: 20, marginRight: 20 }}
								label={<div className='interaction-text'>Recurring</div>}
								required={relationDetail?.occurrence > 1}
								rules={relationDetail?.occurrence > 1 && rules ? rules.frequency : []}
							>
								<Select
									onChange={(value) => {
										onChange(value, 'frequencyName', 0);
										onChange(value, 'frequency', 0);
									}}
									className='interaction-filter-dropdown'
									size='large'
									placeholder='None'
									onSelect={(val) => {
										if (val === 'Custom') {
											setArrayIndex(0);
											setRecurrenceModalOpen(true);
										}
									}}
									disabled={
										relationDetail?.FollowUpActivityStatus === 'C' || singleOrMultiple === 1
											? true
											: false
									}
								>
									{csObject?.Frequency &&
										csObject.Frequency.dropDownValue &&
										csObject.Frequency.dropDownValue.length > 0 &&
										csObject.Frequency.dropDownValue.map((item, index) => (
											<Option
												value={item.dataValue}
												key={index}
												disabled={
													(item.displayValue === 'None' && relationDetail?.occurrence > 1) ||
													(item.displayValue !== 'None' && relationDetail?.occurrence === 1)
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
								name='occurrence'
								label={<div className='interaction-text'>End After</div>}
							>
								<Row gutter={16}>
									<Col className='gutter-row' span={6}>
										<Input
											disabled={
												relationDetail?.FollowUpActivityStatus === 'C' || singleOrMultiple === 1
													? true
													: false
											}
											onChange={(evt) => {
												changeFrequencyOnOccurance(Number(evt.target.value));
												// onChange(evt.target.value, 'occurrence', 0)
											}}
											size='large'
											type='number'
											value={relationDetail?.occurrence}
											// defaultValue={ExistingData?.occurrence}
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
							<Form.Item name='inviteeadd' label={<div className='interaction-text'>Invite</div>}>
								<Select
									onChange={(value, data) => {
										onChange(value, 'inviteeadd', 0);
										forInviteOnChange(data);
									}}
									mode='multiple'
									className='interaction-filter-dropdown'
									allowClear
									style={{ width: '80%' }}
									size='large'
									placeholder='Search Name'
									disabled={singleOrMultiple === 1 ? true : false}
								>
									{csObject?.fInvitee &&
										csObject.fInvitee.lookupValue &&
										csObject.fInvitee.lookupValue.lookUpValues &&
										csObject.fInvitee.lookupValue.lookUpValues.length > 0 &&
										csObject.fInvitee.lookupValue.lookUpValues.map((item, index) => (
											<Option value={item.data_value} key={index} prog_name={item.prog_name}>
												{item.display_value}
											</Option>
										))}
								</Select>
							</Form.Item>
						</Col>
						{relationDetail?.FollowUpActivityStatus === 'C' && (
							<Col className='gutter-row' span={24}>
								<Col className='gutter-row' span={6}>
									<Form.Item label='Reason' name='closeReason'>
										<Select
											size='large'
											placeholder='Select option'
											style={{ width: '90%' }}
											onChange={(value) => {
												setArrayIndex(0);
												handleCloseInteractionFormChange(value, 0);
											}}
										>
											{csObject?.Activity_CloseReason &&
												csObject.Activity_CloseReason.dropDownValue &&
												csObject.Activity_CloseReason.dropDownValue.map((item, index) => (
													<Select.Option value={item.dataValue} key={index}>
														{item.displayValue}
													</Select.Option>
												))}
										</Select>
									</Form.Item>
								</Col>
								{/* <Row> */}
								<Col className='gutter-row' span={24}>
									<Form.Item label='Meeting Notes' name='remarks'>
										<TextArea
											rows={7}
											onChange={(evt) => onChange(evt.target.value, 'remarks', 0)}
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
			/>
		</Card>
	);
};

export default EditOccurenceForm;
