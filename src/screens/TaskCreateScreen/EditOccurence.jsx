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
import '../InteractionCreateScreen/occurenceForm2.scss';
import { useEffect, useState } from 'react';
import CustomRecurrenceModal from '../InteractionCreateScreen/CustomRecurrence';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;

const { Title, Text } = Typography;

const timeFormat = 'HH:mm';

const EditOccurence = ({
	formData,
	onValuesChange,
	rules,
	csObject,
	controlstruct,
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
			// setHide(relationData?.isAllDay);
			setRelationDetail({
				...relationData,
				startTime: relationData?.startTime ? moment(relationData.startTime, timeFormat) : null,
				endTime: relationData?.endTime ? moment(relationData.endTime, timeFormat) : null,
				inviteeadd: relationData?.inviteeadd?.map((e) => e?.refID)
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

	const onChange = (value, key, idx) => {
		setRelationDetail((prevRelationDetail) => {
			return { ...prevRelationDetail, [key]: value };
		});
	};

	const changeFrequencyOnOccurance = (value) => {
		setRelationDetail({
			...relationDetail,
			frequency: value === 1 ? 'None' : null,
			frequencyName: value === 1 ? 'None' : null,
			occurrence: value
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
		// onValuesChange({
		//   ...formData,
		//   RelationDetail: [relationDetail],
		//   checkEditOccurrence: true,
		// });
		form.setFieldsValue(relationDetail);
	}, [relationDetail]);

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
		// let returnTime = time;
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

	const [form] = Form.useForm();

	return (
		<Card className='occurence-form' style={{ marginBottom: 20 }} title='Occurrence'>
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
									// disabled={true}
									disabled={singleOrMultiple === 1 ? true : false}
								>
									{csObject &&
										csObject.ActivityStatus &&
										csObject.ActivityStatus.dropDownValue.map((dataset) => (
											<Radio.Button
												value={dataset.dataValue}
												style={{ width: '50%' }}
												// className={`opp-radio-field ${dataset.dataValue === "O" && "active"}`}
												key={dataset.value}
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
								label={<div className='interaction-text'>Task Type</div>}
								required
								rules={rules ? rules.interactiontype : []}
							>
								<Select
									onChange={(e, value) => {
										onChange(value.children, 'interactionTypeName');
										onChange(value.value, 'interactionType');
									}}
									size='large'
									placeholder='Select option'
									mode='single'
									// value={formData.interactionType}
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
							<Row gutter={16} className='w-90' justify='space-between'>
								<Col className='gutter-row' span={16}>
									{/* <div className='interaction-text'>Start</div> */}
									<Form.Item
										name='startDate'
										label={<div className='interaction-text'>Start</div>}
										required
									>
										{''}
										<DatePicker
											onChange={(value) => {
												onChange(moment(value)?.format('YYYY-MM-DD'), 'startDate');
												onChange(moment(value)?.format('YYYY-MM-DD'), 'endDate', 0);
											}}
											className='interaction-input-field'
											style={{
												width: '100%',
												height: '44px'
											}}
											size='large'
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
									// style={{ marginTop: 36 }}
								>
									<Form.Item
										name='startTime'
										rules={relationDetail?.isAllDay ? [] : rules ? rules?.starttime : []}
										label={<div className='interaction-text'>Start Time</div>}
									>
										<TimePicker
											value={relationDetail?.startTime ? relationDetail.startTime : null}
											format={timeFormat}
											className='interaction-input-field'
											size='large'
											style={{
												height: '44px',
												marginRight: 10
											}}
											onChange={(value) => {
												onChange(value, 'startTime', 0);
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
							<Row gutter={16} className='w-90' justify='space-between'>
								<Col className='gutter-row' span={16}>
									{/* <div className='interaction-text'>End</div> */}
									<Form.Item
										style={{ marginLeft: 20 }}
										name='endDate'
										label={<div className='interaction-text'>End</div>}
										required
									>
										{''}
										<DatePicker
											onChange={(value) =>
												onChange(moment(value)?.format('YYYY-MM-DD'), 'endDate', 0)
											}
											className='interaction-input-field'
											style={{
												width: '100%',
												height: '44px'
											}}
											size='large'
											value={relationDetail?.endDate ? moment(relationDetail.endDate) : null}
											// value={relationDetail[index]?.startDate > moment(new Date(), "DD-MM-YYYY") ? relationDetail[index]?.startDate : moment(new Date(), "DD-MM-YYYY")}
											format='DD-MM-YYYY'
											// disabledDate={(d) => !d || d.isBefore(new Date().setDate(new Date().getDate()))}
											disabledDate={(d) => {
												const myDate = new Date(relationDetail?.startDate);
												return !d || relationDetail?.startDate !== undefined
													? d.isBefore(myDate)
													: d.isBefore(new Date().setDate(new Date().getDate()));
											}}
											disabled={singleOrMultiple === 1 ? true : false}
											allowClear={false}
										/>
									</Form.Item>
								</Col>
								<Col
									className='gutter-row'
									span={7}
									// style={{ marginTop: 36 }}
								>
									<Form.Item
										name='endTime'
										rules={relationDetail?.isAllDay ? [] : rules ? rules?.endtime : []}
										label={<div className='interaction-text'>End Time</div>}
									>
										<TimePicker
											value={relationDetail?.endTime ? relationDetail.endTime : null}
											format={timeFormat}
											className='interaction-input-field'
											size='large'
											style={{
												height: '44px',
												marginLeft: 10,
												marginRight: 10
											}}
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
							<Form.Item
								name='isAllDay'
								// style={{ marginTop: 25 }}
								style={{ marginLeft: 20 }}
							>
								<Checkbox
									className='interaction-text'
									onChange={(e) => checkRelationDetail(e.target.checked)}
									disabled={singleOrMultiple === 1 ? true : false}
									checked={relationDetail?.isAllDay}
									// defaultChecked={true}
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
								// rules={relationDetail?.occurrence > 1 && rules ? rules.recurring : []}
								// rules={rules.recurring}
								rules={[
									{
										required: true,
										message: 'Recurring cannot be empty'
									}
								]}
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
											onChange={(evt) => changeFrequencyOnOccurance(Number(evt.target.value))}
											size='large'
											type='number'
											value={relationDetail?.occurrence}
											className='interaction-input-field'
										/>
									</Col>
									<Col className='gutter-row' span={18}>
										<Text className='interaction-text'>Occurrence(s)</Text>
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
								name='inviteeadd'
								label={<div className='interaction-text'>Assign to</div>}
							>
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
									{controlstruct?.Invitee &&
										controlstruct.Invitee.lookupValue &&
										controlstruct.Invitee.lookupValue.lookUpValues &&
										controlstruct.Invitee.lookupValue.lookUpValues.length > 0 &&
										controlstruct.Invitee.lookupValue.lookUpValues.map((item, index) => (
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
														{console.log(item)}
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
							Close Task
						</Title>
						<Divider />
						<div className='deferred-modal-body'>
							Are you sure you want to Close the selected Task?
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

export default EditOccurence;
