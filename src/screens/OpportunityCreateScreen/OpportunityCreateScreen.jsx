import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './OpportunityCreateScreen.scss';
import {
	Form,
	Input,
	Button,
	Card,
	Select,
	Upload,
	DatePicker,
	Radio,
	Row,
	Col,
	Modal
} from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { CONSTANTS } from '../../constants/constants';
import {
	getOpportunityAddCs,
	postNewOpportunity,
	getOpportunityDependantData
} from '../../redux/actions/opportunityCreateActions';
import { createValidators } from '../../utils/utils';
import { faChevronLeft, faInbox, faPlus } from '@fortawesome/pro-regular-svg-icons';
import SuccessModal from '../../components/SuccessModal/SuccessModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generateCsObject } from '../../utils/utils';
import { getOpportunityProbabilityApi } from '../../api/opportunityCreateApi';

const OpportunityCreateScreen = (props) => {
	const {
		getOpportunityAddCs,
		controlStructure,
		postNewOpportunity,
		getOpportunityDependantData,
		fullControlStructure,
		initialValue,
		opportunityView
	} = props;
	const dateFormatList = ['DD-MM-YYYY', 'DD-MM-YY'];

	const [form] = Form.useForm();
	const { Option } = Select;
	const { Dragger } = Upload;
	const { TextArea } = Input;
	const [loading, setLoading] = useState(true);
	const [statusMessage, setStatusMessage] = useState('Added Opportunity Successfully!');
	const [startDateDv, setStartDateDv] = useState(
		moment(controlStructure.StartDate && controlStructure.StartDate.defaultvalue, dateFormatList[0])
	);
	const [status, setStatus] = useState('Open');
	const [activeStatus, setActiveStatus] = useState(true);
	const [opportunityType, setOpportunityType] = useState();
	const [miscellaneousFieldName, setMiscellaneousFieldName] = useState();
	const [prefferedT, setPrefferedT] = useState();

	const [prefferedC, setPrefferedC] = useState(
		controlStructure.PreferredCurrency && controlStructure.PreferredCurrency.defaultvalue
	);
	const [probability, setProbability] = useState();
	const [activeStageDisplayValue, setActiveStageDisplayValue] = useState();
	const [userType, setUserType] = useState('PROSPECTADD');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isMiscModalVisible, setIsMiscModalVisible] = useState(false);
	const [opportunityCreationRules, setOpportunityCreationRules] = useState();
	const filterCs =
		fullControlStructure && fullControlStructure[2]
			? generateCsObject(fullControlStructure[2].controlStructureField)
			: [];
	const [profileImage, setProfileImage] = useState([
		{
			FileDescription: '',
			FileName: '',
			FileSize: '',
			Mimetype: '',
			FileString: '',
			AttachmentFor: '',
			SessionId: ''
		}
	]);

	const handleChange = (selectedOption) => {
		setMiscellaneousFieldName(selectedOption);
	};
	const showModal = () => {
		setIsMiscModalVisible(true);
	};
	const showSuccessModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	const imageRequest = ({ file, onSuccess }) => {
		let base = new FileReader();
		base.readAsDataURL(file);
		base.onload = (e) => {
			let image = [
				{
					FileDescription: '',
					FileName: file.name,
					FileSize: JSON.stringify(file.size),
					Mimetype: file.type,
					FileString: e.target.result,
					AttachmentFor: 'Profile Photo',
					SessionId: ''
				}
			];
			setProfileImage(image);
		};
		setTimeout(() => {
			onSuccess('ok');
		}, 1000);
	};
	function onStageChange(e) {
		setStatus(e.target.value);
		// onOpportunityisOpen(status);
		form.setFieldsValue({ Stage: '' });
		status === 'Open' ? setActiveStatus(true) : setActiveStatus(false);
	}
	const currentStageValue = (e) => {
		setActiveStageDisplayValue(e);
	};

	const onUserType = (e) => {
		setUserType(e.target.value);
		onUserTypeChange(userType);
		form.setFieldsValue({ RefID: '', RelationshipManager: '', Branch: '' });
	};
	const onOpportunityisOpen = (value) => {
		let payload = {
			FieldListID: 20042,
			dependentValue: { FIELD1: value }
		};
		getOpportunityDependantData(payload, 'Stage');
	};
	useEffect(() => {
		onOpportunityisOpen(status);
	}, [status]);
	const onChange = (e) => {
		setStatus(e.target.value);
	};

	const handleOk = () => {
		setIsModalVisible(false);
		history.goBack();
	};
	const handleMiscOk = () => {
		setIsMiscModalVisible(false);
	};
	const onFinish = (value) => {
		let payload = {
			Opportunity: {
				Id: null,
				OpportunityId: null,
				RefType: value.RefType ? value.RefType : '',
				RefID: value.RefID ? value.RefID : '',
				RelationshipManager: value.RelationshipManager ? value.RelationshipManager : '',
				OpportunityName: value.OpportunityName ? value.OpportunityName : '',
				IsOpen: activeStatus,
				OpportunityType: value.OpportunityType ? value.OpportunityType : '',
				ProductOrService: value.ProductOrService ? value.ProductOrService : '',
				DueDate: value.DueDate ? moment(value.DueDate).toISOString() : '',

				CreationDate: startDateDv,

				TargetAmount: value.TargetAmount ? value.TargetAmount : '',
				PreferredCurrency: prefferedC,
				Stage: value.Stage ? value.Stage : '',
				Probability: probability,
				Amount: null,
				Age: null,
				UpdatedTime: null,
				UpdatedBy: null,
				Remark: value.Remark ? value.Remark : '',
				RecType: null,
				Version: null,
				InputtedBy: null,
				InputDateTime: null,
				AuthorizedBy: null,
				AuthorizedDate: null,
				AuthorizedRemarks: null,
				Status: null,
				CloseDate: value.DueDate ? moment(value.DueDate).toISOString() : '',
				CloseReason: value.CloseReason ? value.CloseReason : '',
				AttachMisc: {
					SessionID: null,
					progName: 'OPPORTUNITYADD'
				},
				RefTypeProspect: null,
				RefTypeNew: null,
				TargetAmountMin: null,
				TargetAmountMax: null,
				Month: null,
				CustProspectName: null,
				OpporCount: null,
				Branch: value.Branch ? value.Branch : '',
				StartDate: null
			},
			Misc: {
				Miscellaneous: [
					{
						Type: 'Field1',
						Miscellaneous: 'P'
					},
					{
						Type: 'Field2',
						Miscellaneous: 'L'
					},
					{
						Type: 'Field3',
						Miscellaneous: 'Text value for field3'
					},
					{
						Type: 'Field4',
						MiscellaneousDate: '2020-01-01'
					},
					{
						Type: 'Field5',
						MiscellaneousNumeric: '3'
					}
				],
				progName: 'OPPORTUNITYADD',
				SessionID: null,
				RefId: null
			},
			Attachment: profileImage
		};

		postNewOpportunity(payload);
		showSuccessModal();
	};
	const onUserTypeChange = (value) => {
		let payload = {
			FieldListID: 5,
			progName: 'OPPORTUNITYADD',
			dependentValue: { RefType: value }
		};
		getOpportunityDependantData(payload, 'RefID');
	};
	const onOpportunityChange = (value) => {
		setOpportunityType(value);
		let payload = {
			FieldListID: 10032,
			progName: 'OPPORTUNITYADD',
			dependentValue: { product_type: value }
		};
		getOpportunityDependantData(payload, 'ProductOrService');
		form.setFieldsValue({ ProductOrService: '' });
	};
	const onCurrencyChange = (e) => {
		setPrefferedC(e);
	};

	useEffect(() => {
		getOpportunityAddCs();
		setLoading(false);
	}, []);

	useEffect(() => {
		getOpportunityProbabilityApi(activeStageDisplayValue).then((res) => {
			setProbability(res.data);
			setLoading(false);
		});
	}, [activeStageDisplayValue]);
	useEffect(() => {
		if (
			fullControlStructure &&
			fullControlStructure[1] &&
			fullControlStructure[1].controlStructureField
		) {
			setOpportunityCreationRules(createValidators(fullControlStructure[1].controlStructureField));
			setLoading(false);
		}
	}, [fullControlStructure]);
	useEffect(() => {
		onOpportunityisOpen(status);
		setLoading(false);
	}, [status]);
	useEffect(() => {
		onUserTypeChange(userType);
		setLoading(false);
	}, [userType]);

	const history = useHistory();
	function refreshPage() {
		window.location.reload();
	}
	return (
		<div className='opportunity-create-container'>
			{refreshPage}
			<Form
				name='opportunityCreateForm'
				className='form'
				form={form}
				initialValues={
					opportunityView &&
					opportunityView.opportunityEditDetail &&
					opportunityView.opportunityEditDetail.RefType &&
					opportunityView.opportunityEditDetail.isOpen &&
					opportunityView.opportunityEditDetail.CreationDate &&
					opportunityView.opportunityEditDetail.PreferredCurrency
						? initialValue
						: {
								...initialValue,
								RefType: userType,
								isOpen: activeStatus,
								CreationDate: startDateDv,
								PreferredCurrency: prefferedC
						  }
				}
				layout='vertical'
				onFinish={onFinish}
			>
				<div className='opportunity-header'>
					<Row justify='space-around'>
						<Col>
							<FontAwesomeIcon
								icon={faChevronLeft}
								className='chevron-left'
								onClick={() => history.goBack()}
							/>
						</Col>
						<Col span={17}>
							<Row className='opportunity-title'>{CONSTANTS.opportunityCreate.headerTitle}</Row>
						</Col>
						<Col span={6}>
							<Row align='center' className='opportunity-buttons'>
								<Form.Item>
									<Button className='opportunity-cancel' onClick={() => history.goBack()}>
										{CONSTANTS.opportunityCreate.cancel}
									</Button>
									<Button className='opportunity-onSave' htmlType='submit'>
										{CONSTANTS.opportunityCreate.save}
									</Button>
									<Modal visible={isModalVisible} onOk={handleOk}>
										<SuccessModal message={statusMessage} />
									</Modal>
								</Form.Item>
							</Row>
						</Col>
					</Row>
				</div>
				<div className='opportunity-type'>
					<Card
						className='opportunity-card-type'
						title={
							<div className='opportunity-title'>
								{CONSTANTS.opportunityCreate.clientOrProspect}
							</div>
						}
					>
						<Row gutter={16}>
							<Col span={24} className='gutter-row'>
								<Form.Item
									name='RefType'
									rules={opportunityCreationRules ? opportunityCreationRules.reftype : []}
								>
									<Radio.Group defaultValue={userType} onChange={onUserType}>
										<Radio.Button
											value='PROSPECTADD'
											className={`opp-radio-field ${userType === 'PROSPECTADD' && 'active'}`}
										>
											Prospect
										</Radio.Button>
										<Radio.Button
											value='CLIENTADD'
											className={`opp-radio-field ${userType === 'CLIENTADD' && 'active'}`}
										>
											Client
										</Radio.Button>
									</Radio.Group>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col className='gutter-row' span={8}>
								<Form.Item
									name='RefID'
									label={<div className='opportunity-text'>{CONSTANTS.opportunityCreate.name}</div>}
									rules={opportunityCreationRules ? opportunityCreationRules.refid : []}
								>
									<Select
										className='opportunity-filter-dropdown'
										size='large'
										mode='single'
										placeholder='Select Option'
										value={[]}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{controlStructure.RefID &&
											controlStructure.RefID.lookUpValues &&
											controlStructure.RefID.lookUpValues.length > 0 &&
											controlStructure.RefID.lookUpValues.map((item, index) => (
												<Option value={item.CustomerID} key={index}>
													{item.Name}
												</Option>
											))}
									</Select>
								</Form.Item>
							</Col>
							<Col span={8} className='gutter-row'>
								<Form.Item
									name='RelationshipManager'
									label={
										<div className='opportunity-text'>
											{CONSTANTS.opportunityCreate.relationshipManager}
										</div>
									}
									rules={
										opportunityCreationRules ? opportunityCreationRules.relationshipmanager : []
									}
								>
									<Select
										className='opportunity-filter-dropdown'
										size='large'
										mode='single'
										placeholder='Select Option'
										value={[]}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{controlStructure.RelationshipManager &&
											controlStructure.RelationshipManager.lookupValue &&
											controlStructure.RelationshipManager.lookupValue.lookUpValues &&
											controlStructure.RelationshipManager.lookupValue.lookUpValues.map(
												(item, index) => (
													<Option value={item.ID} key={index}>
														{item.Name}
													</Option>
												)
											)}
									</Select>
								</Form.Item>
							</Col>
							<Col span={8} className='gutter-row'>
								<Form.Item
									name='Branch'
									label={
										<div className='opportunity-text'>{CONSTANTS.opportunityCreate.branch}</div>
									}
									rules={opportunityCreationRules ? opportunityCreationRules.branch : []}
								>
									<Select
										className='opportunity-filter-dropdown'
										size='large'
										mode='single'
										placeholder='Select Option'
										value={[]}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{controlStructure.Branch &&
											controlStructure.Branch.lookupValue &&
											controlStructure.Branch.lookupValue.lookUpValues &&
											controlStructure.Branch.lookupValue.lookUpValues.map((item, index) => (
												<Option value={item.Unit_Hierarchy} key={index}>
													{item.NAME}
												</Option>
											))}
									</Select>
								</Form.Item>
							</Col>
						</Row>
					</Card>
				</div>

				<Card
					loading={loading}
					title={
						<div className='opportunity-title'>
							{CONSTANTS.opportunityCreate.opportunityDetails.title}
						</div>
					}
					className='opportunity-card-type'
				>
					<Row gutter={16}>
						<Col className='gutter-row' span={8}>
							<Form.Item
								name='OpportunityName'
								label={<div>{CONSTANTS.opportunityCreate.opportunityDetails.opportunityName}</div>}
								rules={opportunityCreationRules ? opportunityCreationRules.opportunityname : []}
							>
								<Input className='opportunity-input-field' type='text' placeholder='Type in name' />
							</Form.Item>
						</Col>
						<Col className='gutter-row' span={8}>
							<Form.Item
								label={<div className='opportunity-text'>Opportunity Type</div>}
								name='OpportunityType'
								required
								rules={opportunityCreationRules ? opportunityCreationRules.opportunitytype : []}
							>
								<Select
									className='opportunity-filter-dropdown'
									placeholder='Select Type'
									onChange={onOpportunityChange}
									size='large'
									mode='single'
									value={[]}
									filterOption={(input, opt) => {
										return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									showSearch
								>
									{controlStructure.OpportunityType &&
										controlStructure.OpportunityType.dropDownValue.length > 0 &&
										controlStructure.OpportunityType.dropDownValue.map((item, index) => (
											<Option value={item.dataValue} key={index}>
												{item.displayValue}
											</Option>
										))}
								</Select>
							</Form.Item>
						</Col>
						<Col className='gutter-row' span={8}>
							<Form.Item
								label={
									<div className='opportunity-text'>
										{CONSTANTS.opportunityCreate.opportunityDetails.productOrService}
									</div>
								}
								name='ProductOrService'
								rules={opportunityCreationRules ? opportunityCreationRules.product : []}
							>
								<Select
									className='opportunity-filter-dropdown'
									placeholder='Select Type'
									size='large'
									mode='single'
									value={[]}
									filterOption={(input, opt) => {
										return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									showSearch
								>
									{controlStructure.ProductOrService &&
										controlStructure.ProductOrService.lookUpValues &&
										controlStructure.ProductOrService.lookUpValues.length > 0 &&
										controlStructure.ProductOrService.lookUpValues.map((item, index) => (
											<Option value={item.product_id} key={index}>
												{item.name}
											</Option>
										))}
								</Select>
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={16}>
						<Col span={16} className='gutter-row'>
							<Form.Item
								name='isOpen'
								label={
									<div className='opportunity-text'>
										{CONSTANTS.opportunityCreate.opportunityDetails.status}
									</div>
								}
								rules={opportunityCreationRules ? opportunityCreationRules.isopen : []}
							>
								<Radio.Group onChange={onStageChange} defaultvalue='Open'>
									<Radio.Button
										value='Open'
										className={`opp-radio-field ${status === 'Open' && 'active'}`}
									>
										{CONSTANTS.opportunityCreate.opportunityDetails.open}
									</Radio.Button>
									<Radio.Button
										value='Close'
										className={`opp-radio-field ${status === 'Close' && 'active'}`}
									>
										{CONSTANTS.opportunityCreate.opportunityDetails.close}
									</Radio.Button>
								</Radio.Group>
							</Form.Item>
						</Col>
						<Col span={8} className='gutter-row'>
							<Form.Item
								name='CreationDate'
								label={
									<div className='opportunity-text'>
										{CONSTANTS.opportunityCreate.opportunityDetails.startDate}
									</div>
								}
								rules={opportunityCreationRules ? opportunityCreationRules.creationdate : []}
							>
								<DatePicker
									onChange={(e) => {
										setStartDateDv(e);
									}}
									style={{
										width: '100%',
										height: '44px'
									}}
									size='large'
									defaultValue={startDateDv}
									format={dateFormatList}
									disabledDate={(d) => !d || d.isAfter(new Date().setDate(new Date().getDate()))}
								/>
							</Form.Item>
						</Col>
					</Row>
					{status === 'Open' ? (
						<Row gutter={16}>
							<Col className='gutter-row' span={6}>
								<Form.Item
									label={
										<div className='opportunity-text'>
											{CONSTANTS.opportunityCreate.opportunityDetails.stage}
										</div>
									}
									name='Stage'
									rules={opportunityCreationRules ? opportunityCreationRules.stage : []}
								>
									<Select
										className='opportunity-filter-dropdown'
										onChange={currentStageValue}
										size='large'
										mode='single'
										placeholder='Select Option'
										value={[]}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{controlStructure.Stage &&
											controlStructure.Stage.lookUpValues &&
											controlStructure.Stage.lookUpValues.length > 0 &&
											controlStructure.Stage.lookUpValues.map((item, index) => (
												<Option value={item.data_value} key={index}>
													{item.display_value}
												</Option>
											))}
									</Select>
								</Form.Item>
							</Col>
							<Col className='gutter-row' span={2}>
								<Form.Item
									name='Probability'
									label={
										<div className='opportunity-text'>
											{CONSTANTS.opportunityCreate.opportunityDetails.probability}
										</div>
									}
									rules={opportunityCreationRules ? opportunityCreationRules.probability : []}
								>
									<Input
										className='opportunity-input-field'
										size='large'
										placeholder={probability}
										defaultValue={probability}
										disabled
									/>
								</Form.Item>
							</Col>
							<Col className='gutter-row' span={8}>
								<Form.Item
									name='TargetAmount'
									label={
										<div className='opportunity-text'>
											{CONSTANTS.opportunityCreate.opportunityDetails.targetAmount}
										</div>
									}
									rules={opportunityCreationRules ? opportunityCreationRules.targetamount : []}
								>
									<Row>
										<Col span={6}>
											<Select
												// style={{ width: "120px" }}
												// className="lead-select"
												onSelect={(value) => setPrefferedC(value)}
												// defaultValue={prefferedC}
												size='large'
												mode='single'
												// value={[]}
												filterOption={(input, opt) => {
													return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
												}}
												showSearch
											>
												{controlStructure.PreferredCurrency &&
													controlStructure.PreferredCurrency.dropDownValue &&
													controlStructure.PreferredCurrency.dropDownValue.map((item, index) => (
														<Option value={item.dataValue} key={index}>
															{item.dataValue}
														</Option>
													))}
											</Select>
										</Col>
										<Col span={18}>
											<Input className='opportunity-input-field quantity' type='number' />
										</Col>
									</Row>
								</Form.Item>
							</Col>
							<Col className='gutter-row' span={8}>
								<Form.Item
									name='DueDate'
									label={
										<div className='opportunity-text'>
											{CONSTANTS.opportunityCreate.opportunityDetails.expectedDate}
										</div>
									}
									rules={opportunityCreationRules ? opportunityCreationRules.duedate : []}
								>
									<DatePicker
										style={{
											width: '100%',
											height: '44px'
										}}
										format={dateFormatList}
										disabledDate={(d) => !d || d.isBefore(new Date().setDate(new Date().getDate()))}
									/>
								</Form.Item>
							</Col>
						</Row>
					) : (
						<Row gutter={16}>
							<Col className='gutter-row' span={6}>
								<Form.Item
									label={
										<div className='opportunity-text'>
											{CONSTANTS.opportunityCreate.opportunityDetails.stage}
										</div>
									}
									name='Stage'
									rules={opportunityCreationRules ? opportunityCreationRules.stage : []}
								>
									<Select
										className='opportunity-filter-dropdown'
										onChange={currentStageValue}
										size='large'
										mode='single'
										placeholder='Select Option'
										value={[]}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{controlStructure.Stage &&
											controlStructure.Stage.lookUpValues &&
											controlStructure.Stage.lookUpValues.length > 0 &&
											controlStructure.Stage.lookUpValues.map((item, index) => (
												<Option value={item.data_value} key={index}>
													{item.display_value}
												</Option>
											))}
									</Select>
								</Form.Item>
							</Col>
							{activeStageDisplayValue === 'WON' ? (
								<>
									<Col className='gutter-row' span={2}>
										<Form.Item
											name='Probability'
											label={
												<div className='opportunity-text'>
													{CONSTANTS.opportunityCreate.opportunityDetails.probability}
												</div>
											}
											rules={opportunityCreationRules ? opportunityCreationRules.probability : []}
										>
											<Input
												className='opportunity-input-field'
												size='large'
												placeholder={probability}
												defaultValue={probability}
												disabled
											/>
										</Form.Item>
									</Col>
									<Col className='gutter-row' span={8}>
										<Form.Item
											name='TargetAmount'
											label={
												<div className='opportunity-text'>
													{CONSTANTS.opportunityCreate.opportunityDetails.closureAmount}
												</div>
											}
											rules={opportunityCreationRules ? opportunityCreationRules.targetamount : []}
										>
											<Row>
												<Col span={6}>
													<Select
														// style={{ width: "120px" }}
														// className="lead-select"
														onSelect={(value) => setPrefferedC(value)}
														// defaultValue={prefferedC}
														size='large'
														mode='single'
														// value={[]}
														filterOption={(input, opt) => {
															return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
														}}
														showSearch
													>
														{controlStructure.PreferredCurrency &&
															controlStructure.PreferredCurrency.dropDownValue &&
															controlStructure.PreferredCurrency.dropDownValue.map(
																(item, index) => (
																	<Option value={item.dataValue} key={index}>
																		{item.dataValue}
																	</Option>
																)
															)}
													</Select>
												</Col>
												<Col span={16}>
													<Input className='opportunity-input-field quantity' type='number' />
												</Col>
											</Row>
										</Form.Item>
									</Col>
									<Col className='gutter-row' span={8}>
										<Form.Item
											name='CloseDate'
											label={
												<div className='opportunity-text'>
													{CONSTANTS.opportunityCreate.opportunityDetails.closureDate}
												</div>
											}
											rules={opportunityCreationRules ? opportunityCreationRules.closedate : []}
										>
											<DatePicker
												style={{
													width: '100%',
													height: '44px'
												}}
												format={dateFormatList}
												disabledDate={(d) =>
													!d || d.isAfter(new Date().setDate(new Date().getDate()))
												}
											/>
										</Form.Item>
									</Col>
								</>
							) : (
								<>
									<Col className='gutter-row' span={2}>
										<Form.Item
											name='Probability'
											label={
												<div className='opportunity-text'>
													{CONSTANTS.opportunityCreate.opportunityDetails.probability}
												</div>
											}
											rules={opportunityCreationRules ? opportunityCreationRules.probability : []}
										>
											<Input
												className='opportunity-input-field'
												size='large'
												placeholder={probability}
												defaultValue={probability}
												disabled
											/>
										</Form.Item>
									</Col>
									<Col className='gutter-row' span={8}>
										<Form.Item
											name='CloseReason'
											label={<div className='opportunity-text'>Reason</div>}
											rules={opportunityCreationRules ? opportunityCreationRules.closereason : []}
										>
											<Select
												className='opportunity-filter-dropdown'
												size='large'
												mode='single'
												placeholder='Select Option'
												value={[]}
												filterOption={(input, opt) => {
													return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
												}}
												showSearch
											>
												{controlStructure.CloseReason &&
													controlStructure.CloseReason.dropDownValue &&
													controlStructure.CloseReason.dropDownValue.length > 0 &&
													controlStructure.CloseReason.dropDownValue.map((item, index) => (
														<Option value={item.dataValue} key={index}>
															{item.displayValue}
														</Option>
													))}
											</Select>
										</Form.Item>
									</Col>
								</>
							)}
						</Row>
					)}
					<Row gutter={16}>
						<Col className='gutter-row' span={16}>
							<Form.Item
								name='Remark'
								label={
									<div className='opportunity-text'>
										{CONSTANTS.opportunityCreate.opportunityDetails.remarks}
									</div>
								}
								rules={opportunityCreationRules ? opportunityCreationRules.remark : []}
							>
								<TextArea rows={4} />
							</Form.Item>
						</Col>
					</Row>
				</Card>
				<Card
					title={<div className='opportunity-title'>{CONSTANTS.opportunityCreate.attachment}</div>}
					className='opportunity-card-type'
				>
					<Row gutter={16}>
						<Col className='gutter-row' span={24}>
							<Dragger customRequest={imageRequest} multiple={false}>
								<p className='ant-upload-drag-icon'>
									<FontAwesomeIcon icon={faInbox} size='3x' style={{ color: '#939DD4' }} />
								</p>
								<p className='ant-upload-text'>{CONSTANTS.opportunityCreate.text}</p>
								<p className='ant-upload-hint'>{CONSTANTS.opportunityCreate.subText}</p>
							</Dragger>
						</Col>
					</Row>
				</Card>
				<Card className='opportunity-card-type'>
					<Row>
						<Col span={16}>{CONSTANTS.opportunityCreate.miscellaneous.header}</Col>
						<Col span={8} align='right'>
							<Button onClick={showModal} className='opportunity-add'>
								<FontAwesomeIcon icon={faPlus} style={{ marginRight: 8 }} />
								{CONSTANTS.opportunityCreate.miscellaneous.add}
							</Button>
							<Modal
								title={CONSTANTS.opportunityCreate.miscellaneous.modalTitle}
								visible={isMiscModalVisible}
								onOk={handleMiscOk}
								onCancel={handleCancel}
							>
								<Row gutter={16}>
									<Col span={12}>
										<Form.Item label='Field Name' name='Type'>
											<Select
												className='opportunity-filter-dropdown'
												placeholder='Select Type'
												value={[]}
												onChange={handleChange}
												size='large'
												mode='single'
												filterOption={(input, opt) => {
													return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
												}}
												showSearch
											>
												<Option value='Field1'>Hobby</Option>
												<Option value='Field2'>Occupation</Option>
												<Option value='Field3'>Text Value</Option>
												<Option value='Field4'>Date Value</Option>
												<Option value='Field5'>Numeric Value</Option>
												<Option value='Field6'>AutoComplete Value</Option>
											</Select>
										</Form.Item>
									</Col>
									<Col span={12}>
										<Form.Item
											label={miscellaneousFieldName === 'Field1' ? 'Hobby' : ''}
											name='Miscellaneous'
										>
											<Select
												className='opportunity-filter-dropdown'
												placeholder='Select Type'
												size='large'
												mode='single'
												value={[]}
												filterOption={(input, opt) => {
													return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
												}}
												showSearch
											>
												{miscellaneousFieldName === 'Field1' &&
													filterCs.Field1 &&
													filterCs.Field1.dropDownValue.length > 0 &&
													filterCs.Field1.dropDownValue.map((item, index) => (
														<Option value={item.dataValue} key={index}>
															{item.displayValue}
														</Option>
													))}
											</Select>
										</Form.Item>
									</Col>
								</Row>

								<Row gutter={16}>
									<Col span={12}>
										<Form.Item label='Field Name' name='Type'>
											<Select
												className='opportunity-filter-dropdown'
												placeholder='Select Type'
												value={[]}
												onChange={handleChange}
												size='large'
												mode='single'
												filterOption={(input, opt) => {
													return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
												}}
												showSearch
											>
												<Option value='Field1'>Hobby</Option>
												<Option value='Field2'>Occupation</Option>
												<Option value='Field3'>Text Value</Option>
												<Option value='Field4'>Date Value</Option>
												<Option value='Field5'>Numeric Value</Option>
												<Option value='Field6'>AutoComplete Value</Option>
											</Select>
										</Form.Item>
									</Col>
									<Col span={12}>
										<Form.Item
											label={miscellaneousFieldName === 'Field2' ? 'Occupation' : ''}
											name='Miscellaneous'
										>
											<Select
												className='opportunity-filter-dropdown'
												placeholder='Select Type'
												size='large'
												mode='single'
												value={[]}
												filterOption={(input, opt) => {
													return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
												}}
												showSearch
											>
												{miscellaneousFieldName === 'Field2' &&
													filterCs.Field2 &&
													filterCs.Field2.dropDownValue.length > 0 &&
													filterCs.Field2.dropDownValue.map((item, index) => (
														<Option value={item.dataValue} key={index}>
															{item.displayValue}
														</Option>
													))}
											</Select>
										</Form.Item>
									</Col>
								</Row>

								<Row gutter={16}>
									<Col span={12}>
										<Form.Item label='Field Name' name='Type'>
											<Select
												className='opportunity-filter-dropdown'
												placeholder='Select Type'
												value={[]}
												onChange={handleChange}
												size='large'
												mode='single'
												filterOption={(input, opt) => {
													return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
												}}
												showSearch
											>
												<Option value='Field1'>Hobby</Option>
												<Option value='Field2'>Occupation</Option>
												<Option value='Field3'>Text Value</Option>
												<Option value='Field4'>Date Value</Option>
												<Option value='Field5'>Numeric Value</Option>
												<Option value='Field6'>AutoComplete Value</Option>
											</Select>
										</Form.Item>
									</Col>
									<Col span={12}>
										<Form.Item
											name='Miscellaneous'
											label={miscellaneousFieldName === 'Field3' ? 'Text Value' : ''}
										>
											<Input className='opportunity-input-field' type='text' />
										</Form.Item>
									</Col>
								</Row>
								<Row gutter={16}>
									<Col span={12}>
										{/* <Form.Item label="Field Name" name="MiscellaneousField"> */}
										{/* <Select
                        className="opportunity-filter-dropdown"
                        placeholder="Select Type"
                        value={[]}
                        onChange={handleChange}
                      >
                        <Option value="Field1">Hobby</Option>
                        <Option value="Field2">Occupation</Option>
                        <Option value="Field3">Text Value</Option>
                        <Option value="Field4">Date Value</Option>
                        <Option value="Field5">Numeric Value</Option>
                        <Option value="Field6">AutoComplete Value</Option>
                      </Select> */}
										{/* </Form.Item> */}
									</Col>
									<Col span={12}>
										<Form.Item
											name='MiscellaneousDate'
											label={miscellaneousFieldName === 'Field4' ? 'Date Value' : ''}
										>
											<DatePicker
												style={{
													width: '100%',
													height: '44px'
												}}
												format={dateFormatList}
												onChange={onChange}
												disabledDate={(d) =>
													!d || d.isAfter(new Date().setDate(new Date().getDate()))
												}
											/>
										</Form.Item>
									</Col>
								</Row>

								<Row gutter={16}>
									<Col span={12}>
										{/* <Form.Item label="Field Name" name="MiscellaneousField">
                      <Select
                        className="opportunity-filter-dropdown"
                        placeholder="Select Type"
                        value={[]}
                        onChange={handleChange}
                      >
                        <Option value="Field1">Hobby</Option>
                        <Option value="Field2">Occupation</Option>
                        <Option value="Field3">Text Value</Option>
                        <Option value="Field4">Date Value</Option>
                        <Option value="Field5">Numeric Value</Option>
                        <Option value="Field6">AutoComplete Value</Option>
                      </Select>
                    </Form.Item> */}
									</Col>
									<Col span={12}>
										<Form.Item
											name='MiscellaneousNumeric'
											label={miscellaneousFieldName === 'Field5' ? 'Numeric Value' : ''}
										>
											<Input className='opportunity-input-field' type='text' />
										</Form.Item>
									</Col>
								</Row>
								<Row gutter={16}>
									<Col span={12}>
										{/* <Form.Item label="Field Name" name="MiscellaneousField">
                      <Select
                        className="opportunity-filter-dropdown"
                        placeholder="Select Type"
                        value={[]}
                        onChange={handleChange}
                      >
                        <Option value="Field1">Hobby</Option>
                        <Option value="Field2">Occupation</Option>
                        <Option value="Field3">Text Value</Option>
                        <Option value="Field4">Date Value</Option>
                        <Option value="Field5">Numeric Value</Option>
                        <Option value="Field6">AutoComplete Value</Option>
                      </Select>
                    </Form.Item> */}
									</Col>
									<Col span={12}>
										<Form.Item
											name='Field6'
											label={miscellaneousFieldName === 'Field6' ? 'Autocomplete Value' : ''}
										>
											<Select
												className='opportunity-filter-dropdown'
												size='large'
												mode='single'
												placeholder='Select Option'
												value={[]}
												filterOption={(input, opt) => {
													return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
												}}
												showSearch
											>
												{miscellaneousFieldName === 'Field6' &&
													filterCs.Field6 &&
													filterCs.Field6.lookupValue &&
													filterCs.Field6.lookupValue.lookUpValues &&
													filterCs.Field6.lookupValue.lookUpValues.map((item, index) => (
														<Option value={item.industry} key={index}>
															{item.name}
														</Option>
													))}
											</Select>
										</Form.Item>
									</Col>
								</Row>
							</Modal>
						</Col>
					</Row>
				</Card>
			</Form>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		opportunityCreation: (state && state.opportunityCreation) || '',
		controlStructure:
			(state &&
				state.opportunityCreation &&
				state.opportunityCreation.opportunityControlStructure) ||
			'',
		fullControlStructure:
			(state &&
				state.opportunityCreation &&
				state.opportunityCreation.opportunityFullControlStructure) ||
			'',
		initialValue:
			(state && state.opportunityView && state.opportunityView.opportunityEditDetail) || ''
	};
};
const mapDispatchToProps = {
	getOpportunityAddCs,
	postNewOpportunity,
	getOpportunityDependantData
};
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityCreateScreen);
