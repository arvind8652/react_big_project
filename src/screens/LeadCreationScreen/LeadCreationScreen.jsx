import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './leadCreation.scss';
import { Form, Input, Button, Card, Select, Upload, Radio, Row, Col, Modal } from 'antd';
import moment from 'moment';
import SuccessModal from '../../components/SuccessModal/SuccessModal';

import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import { CONSTANTS } from '../../constants/constants';
import { getLeadAddCs, postNewLead, getSource } from '../../redux/actions/leadCreationActions';
import { createValidators } from '../../utils/utils';
import PerosnalDetails from './PersonalDetails';
import ContactDetails from './ContactDetails';
import SourceDetails from './SourceDetails';

const LeadCreationScreen = (props) => {
	const {
		getLeadAddCs,
		controlStructure,
		postNewLead,
		getSource,
		fullControlStructure,
		initialValue,
		leadView
	} = props;

	const [form] = Form.useForm();
	const [leadType, setLeadType] = useState('I');
	const [countryCodeC, setCountryCodeC] = useState('');
	const [countryCodeA, setCountryCodeA] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [nationality, setNationality] = useState(
		controlStructure.Nationality && controlStructure.Nationality.defaultvalue
	);
	const [gender, setGender] = useState(
		controlStructure.Gender && controlStructure.Gender.dropDownValue[0].dataValue
	);
	const [statusMessage, setStatusMessage] = useState('Added Lead Successfully!');
	const [sourceSelected, setSourceSelected] = useState(true);
	const [sourceTypeSelected, setSourceTypeSelected] = useState(true);
	const [countrySelected, setCountrySelected] = useState(true);
	const [stateSelected, setStateSelected] = useState(true);
	const [profileImage, setProfileImage] = useState([
		{
			RefType: null,
			RefId: null,
			FileDescription: '',
			FileName: '',
			FileSize: '',
			Mimetype: '',
			FileString: '',
			AttachmentFor: '',
			SessionId: ''
		}
	]);
	const [leadCreationRules, setLeadCreationRules] = useState();
	const { Option } = Select;
	const { Dragger } = Upload;
	const { TextArea } = Input;
	const history = useHistory();
	const plainOptions = ['Whatsapp', 'Viber'];

	useEffect(() => {
		getLeadAddCs();
	}, []);

	useEffect(() => {
		if (
			fullControlStructure &&
			fullControlStructure[0] &&
			fullControlStructure[0].controlStructureField
		) {
			setLeadCreationRules(createValidators(fullControlStructure[0].controlStructureField));
		}
	}, [fullControlStructure]);
	const onLeadChange = (e) => {
		setLeadType(e.target.value);
	};
	const onFinish = (value) => {
		let payload = {
			Lead: {
				Id: null,
				LeadId: null,
				RelationshipManager: value.RelationshipManager ? value.RelationshipManager : '',
				RefId: null,
				LeadStatus: null,
				Region: null,
				Type: leadType,
				Salutation: value.Salutation ? value.Salutation : '',
				FirstName: value.FirstName ? value.FirstName : '',
				MiddleName: value.MiddleName ? value.MiddleName : '',
				LastName: value.LastName ? value.LastName : '',
				DateofBirthCorp: value.DateofBirthCorp ? moment(value.DateofBirthCorp).toISOString() : '',
				Category: value.Category ? value.Category : '',
				Nationality: nationality,
				Gender: gender,
				Mobile: value.Mobile ? value.Mobile : '',
				AlternateNumber: value.AlternateNumber ? value.AlternateNumber : '',
				Email: value.Email ? value.Email : '',
				Address: null,
				Country: value.Country ? value.Country : '',
				State: value.State ? value.State : '',
				City: value.City ? value.City : '',
				ZipCode: value.ZipCode ? value.ZipCode : '',
				Branch: value.Branch ? value.Branch : '',
				Source: value.Source ? value.Source : '',
				SourceType: value.SourceType ? value.SourceType : '',
				SourceValue: value.SourceValue ? value.SourceValue : '',
				QualificationStatus: 'N',
				InterestLevel: value.InterestLevel ? value.InterestLevel : '',
				PreferredCurrency: null,
				Remark: null,
				IsFavourite: null,
				ReasonCreateRecord: null,
				ConversionDate: null,
				ReasonUpdateStatus: null,
				RecType: null,
				Version: null,
				AuthorizedRemarks: null,
				Status: null,
				AttachMisc: {
					SessionID: null,
					progName: 'LEADADD'
				},
				SocialList: [
					{
						Id: null,
						RefType: '',
						RefId: null,
						SocialMediaType: 'WhatsApp',
						SocialMediaValue: value.SocialType === 'WhatsaApp' ? value.Mobile : '',
						SrlNo: 1,
						RecType: null,
						Version: null,
						AuthorizedRemarks: null,
						Status: null
					},
					{
						Id: null,
						RefType: '',
						RefId: null,
						SocialMediaType: 'Twitter',
						SocialMediaValue: value.Twitter ? value.Twitter : '',
						SrlNo: 1,
						RecType: null,
						Version: null,
						AuthorizedRemarks: null,
						Status: null
					},
					{
						Id: null,
						RefType: '',
						RefId: null,
						SocialMediaType: 'LinkedIn',
						SocialMediaValue: value.LinkedIn ? value.LinkedIn : '',
						SrlNo: 1,
						RecType: null,
						Version: null,
						AuthorizedRemarks: null,
						Status: null
					},
					{
						Id: null,
						RefType: '',
						RefId: null,
						SocialMediaType: 'Skype',
						SocialMediaValue: value.SocialType === 'Skype' ? value.Mobile : '',

						SrlNo: 1,
						RecType: null,
						Version: null,
						AuthorizedRemarks: null,
						Status: null
					},
					{
						Id: null,
						RefType: '',
						RefId: null,
						SocialMediaType: 'Viber',
						SocialMediaValue: value.SocialType === 'Viber' ? value.Mobile : '',
						SrlNo: 1,
						RecType: null,
						Version: null,
						AuthorizedRemarks: null,
						Status: null
					},
					{
						Id: null,
						RefType: '',
						RefId: null,
						SocialMediaType: 'Facebook',
						SocialMediaValue: value.Facebook ? value.Facebook : '',
						SrlNo: 1,
						RecType: null,
						Version: null,
						AuthorizedRemarks: null,
						Status: null
					}
				],
				InputDateTime: null,
				IsActive: true,
				ConversationDate: null,
				ReferenceName: null,
				DialCode: countryCodeC,
				AlternateDialCode: countryCodeA
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
			progName: 'LEADADD',
			SessionID: null,
			RefId: null,
			Attach: null,
			Attachment: profileImage
		};
		postNewLead(payload);
		showModal();
		// <SuccessModal message={statusMessage} />;
		// history.push("MyLead");
	};
	const onTypeChange = (value) => {
		let payload = {
			FieldListID: 10,
			dependentValue: { prog_name: value }
		};
		getSource(payload, 'SourceName');
		form.setFieldsValue({ SourceValue: '' });
		setSourceTypeSelected(false);
	};
	const onSourceChange = (value) => {
		let payload = {
			FieldListID: 2,
			dependentValue: { chk_condn: value }
		};
		getSource(payload, 'SourceType');
		form.setFieldsValue({ SourceType: '', SourceValue: '' });
		setSourceSelected(false);
	};
	const onCountryChange = (value) => {
		let payload = {
			FieldListID: 20043,
			progName: 'PROSPECTADD',
			dependentValue: { chk_condn: value }
		};
		getSource(payload, 'State');
		form.setFieldsValue({ State: '', City: '' });
		setCountrySelected(false);
	};
	const onStateChange = (value) => {
		let payload = {
			FieldListID: 20044,
			progName: 'PROSPECTADD',
			dependentValue: { chk_condn: value }
		};
		getSource(payload, 'City');
		form.setFieldsValue({ City: '' });
		setStateSelected(false);
	};
	const imageRequest = ({ file, onSuccess }) => {
		let base = new FileReader();
		base.readAsDataURL(file);
		base.onload = (e) => {
			let image = [
				{
					RefType: null,
					RefId: null,
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
			// history.push("MyLead");
		};
		setTimeout(() => {
			onSuccess('ok');
		}, 1000);
	};
	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
		history.push('MyLead');
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	const prefixSelector = (
		<Form.Item name='prefix' rules={leadCreationRules ? leadCreationRules.dialcode : []}>
			<Select
				// style={{ width: "120px" }}
				// className="lead-select"
				onChange={(value) => setCountryCodeC(value)}
				defaultValue={initialValue && initialValue.DialCode ? initialValue.DialCode : ''}
				size='large'
				mode='single'
				value={countryCodeC}
				filterOption={(input, opt) => {
					return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
				}}
				showSearch
			>
				{controlStructure.CountryCode &&
					controlStructure.CountryCode.lookupValue &&
					controlStructure.CountryCode.lookupValue.lookUpValues &&
					controlStructure.CountryCode.lookupValue.lookUpValues.map((item, index) => (
						<Option value={item.Dialing_Code} key={index}>
							{item.Dialing_Code}
						</Option>
					))}
			</Select>
		</Form.Item>
	);
	function refreshPage() {
		window.location.reload();
	}
	const styleSet = {
		cardStyle: {
			marginBottom: '15px',
			marginTop: '15px'
		}
	};
	return (
		<div className='main'>
			{refreshPage}
			<Form
				name='leadDetailsForm'
				className='form'
				form={form}
				initialValues={
					leadView.leadEditDetail &&
					leadView.leadEditDetail.Nationality &&
					leadView.leadEditDetail.Type &&
					leadView.leadEditDetail.Gender
						? initialValue
						: {
								...initialValue,
								Nationality: nationality,
								Type: leadType,
								Gender: gender
						  }
				}
				layout='vertical'
				onFinish={onFinish}
			>
				<div className='header'>
					<Row justify='space-around'>
						<Col>
							<FontAwesomeIcon
								icon={faChevronLeft}
								className='chevron-left'
								onClick={() => history.goBack()}
							/>
						</Col>
						<Col span={17}>
							<Row className='title'>{CONSTANTS.leadCreate.headerTitle}</Row>
							<Row className='subTitle'>{CONSTANTS.leadCreate.subTitle}</Row>
						</Col>
						<Col span={6}>
							<Row align='center' className='buttons'>
								<Form.Item>
									<Button type='text' className='cancel' onClick={() => history.push('MyLead')}>
										{CONSTANTS.leadCreate.cancel}
									</Button>
									<Button
										type='text'
										className='onSave'
										htmlType='submit'
										// onClick={showModal}
									>
										{CONSTANTS.leadCreate.save}
									</Button>
									<Modal visible={isModalVisible} onOk={handleOk}>
										<SuccessModal message={statusMessage} />
									</Modal>
								</Form.Item>
							</Row>
						</Col>
					</Row>
				</div>
				<div className='LeadType'>
					<Card className='CardType'>
						<Form.Item
							name='Type'
							label={<div className='lead-text'>{CONSTANTS.leadCreate.leadType.title}</div>}
							rules={leadCreationRules ? leadCreationRules.type : []}
						>
							<Radio.Group
								onChange={onLeadChange}
								defaultValue={controlStructure.Type && controlStructure.Type.dropDownValue[0]}
							>
								{controlStructure.Type &&
									controlStructure.Type.dropDownValue.length > 0 &&
									controlStructure.Type.dropDownValue.map((item) => (
										<Radio.Button
											value={item.dataValue}
											// className="header-button"
											className={`radio-field ${leadType === item.dataValue && 'active'}`}
											key='button'
										>
											{item.displayValue}
										</Radio.Button>
									))}
							</Radio.Group>
						</Form.Item>
					</Card>
				</div>
				<div style={styleSet.cardStyle}>
					<PerosnalDetails props={props} />
				</div>
				<div style={styleSet.cardStyle}>
					<ContactDetails props={props} />
				</div>
				<div style={styleSet.cardStyle}>
					<SourceDetails props={props} />
				</div>
				<Card
					title={
						<div className='lead-title'>
							{CONSTANTS.leadCreate.relationshipManagerDetails.title}
						</div>
					}
					className='CardType'
				>
					<Row gutter={16}>
						<Col className='gutter-row' span={8}>
							<Form.Item
								name='RelationshipManager'
								label={
									<div className='lead-text'>
										{CONSTANTS.leadCreate.relationshipManagerDetails.relationshipManager}
									</div>
								}
								rules={leadCreationRules ? leadCreationRules.relationshipmanager : []}
							>
								<Select
									className='lead-select'
									size='large'
									mode='single'
									placeholder='Select Option'
									// defaultValue={
									//   controlStructure.RelationshipManager &&
									//   controlStructure.RelationshipManager.defaultvalue
									//     ? controlStructure.RelationshipManager.defaultvalue
									//     : ""
									// }
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
						<Col className='gutter-row' span={8}>
							<Form.Item
								name='Branch'
								label={
									<div className='lead-text'>
										{CONSTANTS.leadCreate.relationshipManagerDetails.branch}
									</div>
								}
								rules={leadCreationRules ? leadCreationRules.branch : []}
							>
								<Select
									className='lead-select'
									size='large'
									mode='single'
									placeholder='Select Option'
									// defaultValue={
									//   controlStructure.branch &&
									//   controlStructure.branch.defaultvalue
									//     ? controlStructure.branch.defaultvalue
									//     : ""
									// }
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
			</Form>
		</div>
	);
};

const mapStateToProps = (state) => {
	const { leadCreation, leadView } = state;
	const controlStructure = leadCreation.leadControlStructure;
	const initialValue = leadView.leadEditDetail;
	const fullControlStructure = leadCreation.leadControlStructureFull;
	return {
		leadCreation,
		controlStructure,
		fullControlStructure,
		state,
		initialValue,
		leadView
	};
};

const mapDispatchToProps = {
	getLeadAddCs,
	postNewLead,
	getSource
};

export default connect(mapStateToProps, mapDispatchToProps)(LeadCreationScreen);
