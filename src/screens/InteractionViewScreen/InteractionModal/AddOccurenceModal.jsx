import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
	Modal,
	Row,
	Col,
	Form,
	Typography,
	Divider,
	Radio,
	Select,
	DatePicker,
	Button,
	TimePicker,
	Checkbox,
	Input,
	Alert
} from 'antd';
import SuccessModal from '../../../components/SuccessModal/SuccessModal';
import FailModal from '../../../components/Modal/FailModal/FailModal';
import CustomRecurrenceModal from './CustomOccurenceModal';
import { connect } from 'react-redux';
import TextArea from 'antd/lib/input/TextArea';

import moment from 'moment';
import { postInteractionOccureanceApi } from '../../../api/interactionViewApi';
import { excecuteGetInteractionView } from '../../../redux/actions/interactionViewActions';
import { CONSTANTS } from '../../../constants/constants';

const { Option } = Select;

const { Title, Text } = Typography;

const AddOccurenceModal = (props) => {
	const { status } = props;
	const interactionDetails = props.interactionDetails.taskScheduler;
	const controlStructure = props.controlStructureAdd;
	const controlStructureRules = props.controlStructureAddRules;
	const [form] = Form.useForm();
	const [recurrenceModalOpen, setRecurrenceModalOpen] = useState(false);
	const [modalData, setModalData] = useState(null);
	const [errorMsg, setErrorMsg] = useState('');
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showFailModal, setShowFailModal] = useState(false);
	const [showDeferredModal, setShowDeferredModal] = useState(false);
	const [errorArray, setErrorArray] = useState([]);
	const [requiredFiled, setRequiredFiled] = useState(false);
	const [radioValue, setRadioValue] = useState('selectedOccurence');
	const [addOccurenceFormData, setAddOccurenceFormData] = useState({
		activityID: '',
		followUpId: '',
		// startDate: moment(controlStructure?.StartDate?.defaultvalue, 'DD/MM/YYYY'),
		// endDate: moment(controlStructure?.EndDate?.defaultvalue, 'DD/MM/YYYY'),
		startDate: moment(moment(new Date())),
		endDate: moment(moment(new Date())),
		followUpActivityStatus: (status && status.toUpperCase()) || 'O',
		StartTime: moment('12:00', 'HH:mm'),
		EndTime: moment('12:00', 'HH:mm'),
		occurrence: 1,
		isAllDay: false,
		InteractionType: undefined,
		closeReason: undefined,
		frequency: undefined,
		repeatsNo: undefined,
		repeatsFrequency: undefined,
		FrequencyDays: undefined,
		remarks: undefined,
		IsAllOccurrence: false,
		time: undefined,
		invitee: [],
		inviteeadd: [
			{
				refType: '',
				refID: '',
				prog_name: null,
				purpose: null
			}
		]
	});
	const history = useHistory();

	const handleAddOccurenceFormData = (values) => {
		setAddOccurenceFormData({
			...addOccurenceFormData,
			...values
		});
	};

	const onAlertClose = () => {
		setRequiredFiled(false);
	};

	const saveAddOccurenceFormData = () => {
		let formData = {};
		let startDate = moment(addOccurenceFormData.startDate).format('YYYY-MM-DD');
		let endDate = moment(addOccurenceFormData.endDate).format('YYYY-MM-DD');
		let startTime = moment(addOccurenceFormData.StartTime).format('HH:MM');
		let endTime = moment(addOccurenceFormData.EndTime).format('HH:MM');
		formData.activityID = interactionDetails.activityID;
		formData.followUpId = interactionDetails.followUpId;
		formData.startDate = startDate;
		formData.endDate = endDate;
		formData.isAllDay = addOccurenceFormData.isAllDay;
		formData.frequency = addOccurenceFormData.Frequency;
		formData.occurrence = addOccurenceFormData.occurrence;
		formData.followUpActivityStatus = addOccurenceFormData.followUpActivityStatus;
		formData.invitee = addOccurenceFormData.invitee;
		formData.inviteeadd = addOccurenceFormData.inviteeadd;
		formData.closeReason = addOccurenceFormData.closeReason;
		formData.remarks = addOccurenceFormData.remarks;
		formData.IsAllOccurrence = addOccurenceFormData.IsAllOccurrence;
		if (addOccurenceFormData.followUpActivityStatus === 'O') {
			formData.InteractionType = addOccurenceFormData.InteractionType;
		} else {
			formData.closeReason = addOccurenceFormData.closeReason;
		}
		if (!addOccurenceFormData.isAllDay) {
			formData.StartTime = startTime;
			formData.EndTime = endTime;
		}
		form
			.validateFields()
			.then((res) => {
				postInteractionOccureanceApi(formData)
					.then((res) => {
						if (res.data.success) {
							setShowSuccessModal(true);
							console.log('CALLED FROM HERE');
							props.excecuteGetInteractionView(
								interactionDetails.followUpId,
								interactionDetails.id,
								setErrorMsg
							);
						} else {
							setErrorArray([
								{
									message: res.data.message
								}
							]);
							setShowFailModal(true);
						}
					})
					.catch((err) => {
						console.log(err);
					});
				props.setModal(false);
			})
			.catch((err) => {
				setRequiredFiled(true);
			});
	};
	const handleStartDateChange = (date) => {
		setAddOccurenceFormData({
			...addOccurenceFormData,
			startDate: date
		});
	};
	const handleEndDateChange = (date) => {
		setAddOccurenceFormData({
			...addOccurenceFormData,
			endDate: date
		});
	};
	const handleEndTimeChage = (time) => {
		setAddOccurenceFormData({
			...addOccurenceFormData,
			EndTime: time
		});
	};
	const handleStartTimeChage = (time) => {
		setAddOccurenceFormData({
			...addOccurenceFormData,
			StartTime: time
		});
	};
	const handleOccurenceChange = (e) => {
		setAddOccurenceFormData({
			...addOccurenceFormData,
			occurrence: e.target.value
		});
	};
	const handleCloseInteractionFormChange = (values, index) => {
		if (values === 'D') {
			setShowDeferredModal(true);
		}
		setAddOccurenceFormData({
			...addOccurenceFormData,
			closeReason: values
		});
	};
	const handleremarksChange = (e) => {
		setAddOccurenceFormData({
			...addOccurenceFormData,
			remarks: e.target.value
		});
	};
	const onRadioChange = (e) => {
		setRadioValue(e.target.value);
	};
	const closeDeferredModal = () => {
		setShowDeferredModal(false);
	};
	const selectOccurrenceToClose = () => {
		if (radioValue === 'allOccurences') {
			setAddOccurenceFormData({
				...addOccurenceFormData,
				IsAllOccurrence: true
			});
		} else {
			setAddOccurenceFormData({
				...addOccurenceFormData,
				IsAllOccurrence: false
			});
		}
		setShowDeferredModal(false);
	};
	const handleFailModalOkOrCancel = () => {
		setShowFailModal(false);
	};

	return (
		<>
			<Modal
				visible={showSuccessModal}
				closable={false}
				footer={[
					<Button
						onClick={() => {
							setShowSuccessModal(false);
							history.goBack();
						}}
					>
						OK
					</Button>
				]}
				centered
			>
				<SuccessModal message='Action Completed Successfully' />
			</Modal>
			<FailModal
				visible={showFailModal}
				onOk={handleFailModalOkOrCancel}
				onCancel={handleFailModalOkOrCancel}
				errorArray={errorArray}
			/>
			<Modal
				centered
				visible={props.modal}
				onCancel={() => props.setModal(false)}
				footer={null}
				className='update-stage-modal'
				width={900}
			>
				<div>
					<Title level={3} style={{ color: '#354081' }}>
						Add Occurence
					</Title>
					<Divider />
					<Form
						layout='vertical'
						form={form}
						onValuesChange={handleAddOccurenceFormData}
						initialValues={addOccurenceFormData}
					>
						<Row>
							<Col span={8}>
								<Form.Item
									label='Status'
									name='followUpActivityStatus'
									validateTrigger={['onChange', 'onBlur']}
									rules={controlStructureRules ? controlStructureRules.status : []}
								>
									<Radio.Group
										value={addOccurenceFormData.followUpActivityStatus}
										size='large'
										style={{ width: '70%' }}
									>
										{controlStructure &&
											controlStructure.ActivityStatus &&
											controlStructure.ActivityStatus.dropDownValue.map((radioOption) => (
												<Radio.Button
													style={{ width: '50%' }}
													className={`addInteraction-radio-field ${
														addOccurenceFormData.followUpActivityStatus === radioOption.dataValue
															? 'active'
															: ''
													}`}
													value={radioOption.dataValue}
												>
													{radioOption.displayValue}
												</Radio.Button>
											))}
									</Radio.Group>
								</Form.Item>
							</Col>
							<Col span={8}>
								{/* {addOccurenceFormData.followUpActivityStatus === "O" ? ( */}
								<Form.Item
									name='InteractionType'
									required
									rules={[{ required: true, message: 'Please input your InteractionType!' }]}
									// rules={
									//   controlStructureRules ? controlStructureRules.InteractionType : []
									// }
									label='Interaction Type'
								>
									<Select
										className='interaction-filter-dropdown'
										size='large'
										placeholder='Select option'
										mode='single'
										value={addOccurenceFormData.InteractionType}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{controlStructure.InteractionType &&
											controlStructure.InteractionType.dropDownValue &&
											controlStructure.InteractionType.dropDownValue.length > 0 &&
											controlStructure.InteractionType.dropDownValue.map((item, index) => (
												<Option value={item.dataValue} key={index}>
													{item.displayValue}
												</Option>
											))}
									</Select>
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={8}>
								<Form.Item name='startDate' label='Start'>
									<Row style={{ width: '90%' }} justify='space-between'>
										<Col span={16}>
											<DatePicker
												size='large'
												style={{ width: '100%' }}
												defaultValue={addOccurenceFormData.startDate}
												onChange={handleStartDateChange}
												format='DD-MM-YYYY'
												disabledDate={(d) =>
													!d || d.isAfter(new Date().setDate(new Date().getDate()))
												}
											/>
										</Col>
										<Col span={8}>
											<TimePicker
												size='large'
												value={addOccurenceFormData.StartTime}
												format='HH:mm'
												onChange={handleStartTimeChage}
												disabled={addOccurenceFormData.isAllDay}
											/>
										</Col>
									</Row>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item name='end' label='End'>
									<Row style={{ width: '90%' }} justify='space-between'>
										<Col span={16}>
											<DatePicker
												size='large'
												style={{ width: '100%' }}
												defaultValue={addOccurenceFormData.endDate}
												onChange={handleEndDateChange}
												format='DD-MM-YYYY'
												disabledDate={(d) =>
													!d || d.isAfter(new Date().setDate(new Date().getDate()))
												}
											/>
										</Col>
										<Col span={8}>
											<TimePicker
												size='large'
												value={addOccurenceFormData.EndTime}
												format='HH:mm'
												disabled={addOccurenceFormData.isAllDay}
												onChange={handleEndTimeChage}
											/>
										</Col>
									</Row>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label=' '>
									<Checkbox
										isChecked={addOccurenceFormData.isAllDay}
										onChange={() =>
											handleAddOccurenceFormData({ isAllDay: !addOccurenceFormData.isAllDay })
										}
									>
										All Day
									</Checkbox>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item
									name='reminder'
									required
									rules={[{ required: true, message: 'Please input your Reminder!' }]}
									// rules={
									//   controlStructureRules ? controlStructureRules.Reminder : []
									// }
									label='Reminder'
								>
									<Select
										size='large'
										placeholder='Select option'
										value={addOccurenceFormData.Reminder}
										style={{ width: '90%' }}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{controlStructure.Reminder &&
											controlStructure.Reminder.dropDownValue.length > 0 &&
											controlStructure.Reminder.dropDownValue.map((item, index) => (
												<Option value={item.dataValue} key={index}>
													{item.displayValue}
												</Option>
											))}
									</Select>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item
									name='Frequency'
									required
									rules={[{ required: true, message: 'Please input your Frequency!' }]}
									// rules={
									//   controlStructureRules ? controlStructureRules.Frequency : []
									// }
									label='Recurring'
								>
									<Select
										size='large'
										placeholder='Select option'
										style={{ width: '90%' }}
										onSelect={(val) => {
											if (val === 'Custom') {
												setRecurrenceModalOpen(true);
											}
										}}
										value={addOccurenceFormData.Reminder}
									>
										{controlStructure.Frequency &&
											controlStructure.Frequency.dropDownValue.length > 0 &&
											controlStructure.Frequency.dropDownValue.map((item, index) => (
												<Option value={item.dataValue} key={index}>
													{item.displayValue}
												</Option>
											))}
										<Option value={'Custom'}>Custom</Option>
									</Select>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label='End after' name='occurence'>
									<Input
										size='large'
										value={addOccurenceFormData.occurrence}
										style={{ width: '96px', marginRight: '10px' }}
										onChange={handleOccurenceChange}
									/>
									<Text>Occurence(s)</Text>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label='Invitees' name='invitee'>
									<Select
										mode='multiple'
										size='large'
										placeholder='Search by name'
										style={{ width: '90%' }}
										allowClear
									>
										{controlStructure.fInvitee &&
											controlStructure.fInvitee.lookupValue &&
											controlStructure.fInvitee.lookupValue.lookUpValues.length > 0 &&
											controlStructure.fInvitee.lookupValue.lookUpValues.map((item, index) => (
												<Option value={item.data_value} key={index}>
													{item.display_value}
												</Option>
											))}
									</Select>
								</Form.Item>
							</Col>
							{addOccurenceFormData.followUpActivityStatus === 'C' && (
								<Col className='gutter-row' span={24}>
									<Col className='gutter-row' span={6}>
										<Form.Item label='Reason' name='closeReason'>
											<Select
												size='large'
												placeholder='Select option'
												style={{ width: '90%' }}
												onChange={(value) => {
													handleCloseInteractionFormChange(value);
												}}
											>
												{controlStructure?.Activity_CloseReason &&
													controlStructure.Activity_CloseReason.dropDownValue &&
													controlStructure.Activity_CloseReason.dropDownValue.map((item, index) => {
														return (
															<Select.Option value={item.dataValue} key={index}>
																{item.displayValue}
															</Select.Option>
														);
													})}
											</Select>
										</Form.Item>
									</Col>
									{/* <Row> */}
									<Col className='gutter-row' span={24}>
										<Form.Item label='Meeting Notes' name='remarks'>
											<TextArea rows={7} onChange={handleremarksChange} style={{ width: '80%' }} />
										</Form.Item>
									</Col>
								</Col>
							)}
						</Row>
						<Row justify='end'>
							<Button
								type='text'
								style={{ marginRight: '15px' }}
								onClick={() => props.setModal(false)}
							>
								Cancel
							</Button>
							<Button type='primary' htmlType='submit' onClick={() => saveAddOccurenceFormData()}>
								Done
							</Button>
						</Row>
					</Form>
				</div>
			</Modal>
			{requiredFiled ? (
				<Alert
					message='Error'
					description={CONSTANTS.requiredFieldGenericMessage}
					type='error'
					closable
					onClose={setTimeout(() => {
						onAlertClose();
					}, 5000)}
				/>
			) : (
				''
			)}
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

			<CustomRecurrenceModal
				modal={recurrenceModalOpen}
				form={form}
				formData={addOccurenceFormData}
				onValuesChange={handleAddOccurenceFormData}
				controlStructure={controlStructure}
				controlStructureRules={controlStructureRules}
				modalClose={() => setRecurrenceModalOpen(false)}
				data={modalData}
				setData={(val) => setModalData(val)}
			/>
		</>
	);
};
const mapDispatchToProps = {
	excecuteGetInteractionView
};
export default connect(null, mapDispatchToProps)(AddOccurenceModal);
