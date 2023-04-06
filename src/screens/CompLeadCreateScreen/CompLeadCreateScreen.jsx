import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './CompLeadCreateScreen.scss';
import { Form, Button, Alert } from 'antd';
import BackToTop from '../../components/BackToTop/BackToTop';

import { connect } from 'react-redux';
import { postCompLeadApi } from '../../api/leadCreationApi';
import { executeGetLeadCreateCs } from '../../redux/actions/compLeadCreateAction';
import { createValidators, generateCsObject, getBase64 } from '../../utils/utils';
import moment from 'moment';
import { getLeadViewApi } from '../../api/leadViewApi';
import DashboardScreenTopbar from '../../components/DashboardScreenTopbar/DashboardScreenTopbar';
import ContactDetailsWithoutMapForm from '../../components/Forms/ContactDetailsWithoutMapForm/ContactDetailsWithoutMapForm';
import LeadTypeFormCard from '../../components/Forms/LeadTypeFormCard/LeadTypeFormCard';
import RelationshipManagerDetailsFormCard from '../../components/Forms/RelationshipManagerDetailsFormCard/RelationshipManagerDetailsFormCard';
import ProfileDetailsFormCard from '../../components/Forms/ProfileDetailsFormCard/ProfileDetailsFormCard';
import CorporateCompanyDetailsFormCard from '../../components/Forms/CorporateCompanyDetailsFormCard/CorporateCompanyDetailsFormCard';
import ExtraSourceDetailsFormCard from '../../components/Forms/ExtraSourceDetFormCard/ExtraSourceDetFormCard';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import Modal from 'antd/lib/modal/Modal';
import FailModal from '../../components/Modal/FailModal/FailModal';
import { CONSTANTS } from '../../constants/constants';

const CompLeadCreateScreen = (props) => {
	const { cs, user } = props;
	const [form] = Form.useForm();
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showFailModal, setShowFailModal] = useState(false);
	const [errorArray, setErrorArray] = useState([]);
	const [requiredFiled, setRequiredFiled] = useState(false);
	const history = useHistory();
	const location = useLocation();
	let screen;
	let data;
	let mode;
	let filters;
	let rowNumber;
	if (location && location.state) {
		screen = location.state.screen;
		data = location.state.data;
		mode = location.state.mode;
		filters = location.state.filters;
		rowNumber = location.state.rowNumber;
	}
	useEffect(() => {
		executeGetLeadCreateCs();
	}, []);
	let rules = [];
	let csObject = [];
	cs &&
		cs !== '' &&
		cs.length > 0 &&
		cs.forEach((s, index) => {
			rules[index] = createValidators(s.controlStructureField, form);
			csObject[index] = generateCsObject(s.controlStructureField);
		});
	const handleFormSubmit = () => {
		form
			.validateFields()
			.then((res) => {
				postCompLeadApi(leadFormData)
					.then((res) => {
						if (res.data.success) {
							setShowSuccessModal(true);
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
			})
			.catch((err) => {
				setRequiredFiled(true);
			});
	};
	const [leadFormData, setLeadFormData] = useState({});

	const handleLeadFormData = () => {
		setLeadFormData({
			relationshipManager:
				data && data.lead && data.lead.relationshipManager
					? data.lead.relationshipManager
					: user?.rmYN === 'Y'
					? user.userID
					: undefined,
			leadId: data && data.lead && data.lead.leadId ? data.lead.leadId : null,
			refId: data && data.lead && data.lead.refId ? data.lead.refId : undefined,
			individualSalutation:
				data && data.lead && data.lead.salutation ? data.lead.salutation : undefined,
			individualFirstName:
				data && data.lead && data.lead.type === 'I' && data.lead.firstName
					? data.lead.firstName
					: undefined,
			individualMiddleName:
				data && data.lead && data.lead.type === 'I' && data.lead.middleName
					? data.lead.middleName
					: undefined,
			individualLastName:
				data && data.lead && data.lead.type === 'I' && data.lead.lastName
					? data.lead.lastName
					: undefined,
			profileImageString:
				data && data.lead && data.lead.profileImage
					? `data:image/jpeg;base64,${data.lead.profileImage}`
					: undefined,
			individualDob:
				data && data.lead && data.lead.type === 'I' && data.lead.dateofBirthCorp
					? moment(data.lead.dateofBirthCorp)
					: undefined,
			individualCategory:
				data && data.lead && data.lead.type === 'I' && data.lead.category
					? data.lead.category
					: undefined,
			individualNationality:
				data && data.lead && data.lead.type === 'I' && data.lead.nationality
					? data.lead.nationality
					: (cs &&
							cs.length > 0 &&
							cs[0].controlStructureField
								.map((item) => {
									if (item.keyField === 'Nationality') {
										return item.defaultvalue;
									}
									return undefined;
								})
								.filter((item) => item !== undefined)[0]) ||
					  undefined,
			individualGender:
				data && data.lead && data.lead.type === 'I' && data.lead.gender
					? data.lead.gender
					: undefined,
			corporateCompanyName:
				data && data.lead && data.lead.type === 'C' && data.lead.firstName
					? data.lead.firstName
					: undefined,
			corporateContactPerson:
				data && data.lead && data.lead.type === 'C' && data.lead.middleName
					? data.lead.middleName
					: undefined,
			corporateContactPersonDetails:
				data && data.lead && data.lead.type === 'C' && data.lead.lastName
					? data.lead.lastName
					: undefined,
			corporateDoi:
				data && data.lead && data.lead.type === 'C' && data.lead.dateofBirthCorp
					? moment(data.lead.dateofBirthCorp)
					: undefined,
			corporateCategory:
				data && data.lead && data.lead.type === 'C' && data.lead.category
					? data.lead.category
					: undefined,
			corporateNationality:
				data && data.lead && data.lead.type === 'C' && data.lead.nationality
					? data.lead.nationality
					: (cs &&
							cs.length > 0 &&
							cs[0].controlStructureField
								.map((item) => {
									if (item.keyField === 'Nationality') {
										return item.defaultvalue;
									}
									return undefined;
								})
								.filter((item) => item !== undefined)[0]) ||
					  undefined,
			countryCode:
				data && data.lead && data.lead.DialCode
					? data.lead.DialCode
					: user?.rmYN === 'Y'
					? '+63'
					: undefined,
			altCountryCode:
				data && data.lead && data.lead.AlternateDialCode ? data.lead.AlternateDialCode : undefined,
			leadType: data && data.lead && data.lead.type ? data.lead.type : 'I',
			contact: data && data.lead && data.lead.mobile ? data.lead.mobile : undefined,
			alternateContact:
				data && data.lead && data.lead.alternateNumber ? data.lead.alternateNumber : undefined,
			emailId: data && data.lead && data.lead.email ? data.lead.email : undefined,
			socialType:
				data && data.socialList
					? data.socialList.WhatsApp && data.socialList.Viber
						? ['WhatsApp', 'Viber']
						: data.socialList.WhatsApp
						? 'WhatsApp'
						: data.socialList.Viber
						? 'Viber'
						: undefined
					: undefined,
			whatsApp:
				data && data.socialList && data.socialList.WhatsApp ? data.socialList.WhatsApp : undefined,
			viber: data && data.socialList && data.socialList.Viber ? data.socialList.Viber : undefined,
			address: data && data.lead && data.lead.address ? data.lead.address : undefined,
			country: data && data.lead && data.lead.country ? data.lead.country : undefined,
			state: data && data.lead && data.lead.state ? data.lead.state : undefined,
			city: data && data.lead && data.lead.city ? data.lead.city : undefined,
			twitter:
				data && data.socialList && data.socialList.Twitter ? data.socialList.Twitter : undefined,
			facebook:
				data && data.socialList && data.socialList.Facebook ? data.socialList.Facebook : undefined,
			linkedin:
				data && data.socialList && data.socialList.LinkedIn ? data.socialList.LinkedIn : undefined,
			zipCode: data && data.lead && data.lead.zipCode ? data.lead.zipCode : undefined,
			branchName:
				data && data.lead && data.lead.branch
					? data.lead.branch
					: user?.rmYN === 'Y'
					? user.branch
					: undefined,
			source: data && data.lead && data.lead.source ? data.lead.source : undefined,
			sourceType: data && data.lead && data.lead.sourceType ? data.lead.sourceType : undefined,
			sourceName: data && data.lead && data.lead.sourceValue ? data.lead.sourceValue : undefined,
			sourcedBy: data && data.lead && data.lead.sourcedBy ? data.lead.sourcedBy : undefined,
			InterestLevel:
				data && data.lead && data.lead.interestlevelName ? data.lead.interestlevelName : undefined,
			preferredCurrency:
				data && data.lead && data.lead.preferredCurrency ? data.lead.preferredCurrency : undefined,
			remark: data && data.lead && data.lead.remark ? data.lead.remark : undefined,
			attachments: [],
			miscellaneous: undefined
		});
	};

	useEffect(() => {
		handleLeadFormData();
	}, [cs]);

	const [editingData, setEditingData] = useState();

	useEffect(() => {
		if (screen && data) {
			if (screen === 'view') {
				data &&
					data &&
					data.lead &&
					setLeadFormData({
						relationshipManager: data.lead.relationshipManager
							? data.lead.relationshipManager
							: undefined,
						leadId: data.lead.leadId ? data.lead.leadId : null,
						refId: data.lead.refId ? data.lead.refId : undefined,
						individualSalutation: data.lead.salutation ? data.lead.salutation : undefined,
						individualFirstName:
							data.lead.type === 'I' && data.lead.firstName ? data.lead.firstName : undefined,
						individualMiddleName:
							data && data.lead && data.lead.type === 'I' && data.lead.middleName
								? data.lead.middleName
								: undefined,
						individualLastName:
							data.lead.type === 'I' && data.lead.lastName ? data.lead.lastName : undefined,
						profileImageString: data.lead.profileImage
							? `data:image/jpeg;base64,${data.lead.profileImage}`
							: undefined,
						individualDob:
							data && data.lead && data.lead.type === 'I' && data.lead.dateofBirthCorp
								? moment(data.lead.dateofBirthCorp)
								: undefined,
						individualCategory:
							data.lead.type === 'I' && data.lead.category ? data.lead.category : undefined,
						individualNationality:
							data && data.lead && data.lead.type === 'I' && data.lead.nationality
								? data.lead.nationality
								: (cs &&
										cs.length > 0 &&
										cs[0].controlStructureField
											.map((item) => {
												if (item.keyField === 'Nationality') {
													return item.defaultvalue;
												}
												return undefined;
											})
											.filter((item) => item !== undefined)[0]) ||
								  undefined,
						individualGender:
							data.lead.type === 'I' && data.lead.gender ? data.lead.gender : undefined,
						corporateCompanyName:
							data.lead.type === 'C' && data.lead.firstName ? data.lead.firstName : undefined,
						corporateContactPerson:
							data && data.lead && data.lead.type === 'C' && data.lead.middleName
								? data.lead.middleName
								: undefined,
						corporateContactPersonDetails:
							data.lead.type === 'C' && data.lead.lastName ? data.lead.lastName : undefined,
						corporateDoi:
							data && data.lead && data.lead.type === 'C' && data.lead.dateofBirthCorp
								? moment(data.lead.dateofBirthCorp)
								: undefined,
						corporateCategory:
							data.lead.type === 'C' && data.lead.category ? data.lead.category : undefined,
						corporateNationality:
							data && data.lead && data.lead.type === 'C' && data.lead.nationality
								? data.lead.nationality
								: (cs &&
										cs.length > 0 &&
										cs[0].controlStructureField
											.map((item) => {
												if (item.keyField === 'Nationality') {
													return item.defaultvalue;
												}
												return undefined;
											})
											.filter((item) => item !== undefined)[0]) ||
								  undefined,
						countryCode: data.lead.dialCode ? data.lead.dialCode : undefined,
						altCountryCode: data.lead.alternateDialCode ? data.lead.alternateDialCode : undefined,
						leadType: data.lead.type ? data.lead.type : 'I',
						contact: data.lead.mobile ? data.lead.mobile : undefined,
						alternateContact: data.lead.alternateNumber ? data.lead.alternateNumber : undefined,
						emailId: data.lead.email ? data.lead.email : undefined,
						socialType:
							data && data.socialList
								? data.socialList.WhatsApp && data.socialList.Viber
									? ['WhatsApp', 'Viber']
									: data.socialList.WhatsApp
									? 'WhatsApp'
									: data.socialList.Viber
									? 'Viber'
									: undefined
								: undefined,
						whatsApp:
							data && data.socialList && data.socialList.WhatsApp
								? data.socialList.WhatsApp
								: undefined,
						viber:
							data && data.socialList && data.socialList.Viber ? data.socialList.Viber : undefined,
						address: data.lead.address ? data.lead.address : undefined,
						country: data.lead.country ? data.lead.country : undefined,
						state: data.lead.state ? data.lead.state : undefined,
						city: data.lead.city ? data.lead.city : undefined,
						twitter: data.socialList.Twitter ? data.socialList.Twitter : undefined,
						facebook: data.socialList.Facebook ? data.socialList.Facebook : undefined,
						linkedin: data.socialList.LinkedIn ? data.socialList.LinkedIn : undefined,
						zipCode: data.lead.zipCode ? data.lead.zipCode : undefined,
						branchName: data.lead.branch ? data.lead.branch : undefined,
						source: data.lead.source ? data.lead.source : undefined,
						sourceType: data.lead.sourceType ? data.lead.sourceType : undefined,
						sourceName: data.lead.sourceValue ? data.lead.sourceValue : undefined,
						InterestLevel: data.lead.interestlevel ? data.lead.interestlevel : undefined,
						preferredCurrency: data.lead.preferredCurrency
							? data.lead.preferredCurrency
							: undefined,
						remark: data.lead.remark ? data.lead.remark : undefined,
						attachments: [],
						miscellaneous: undefined
					});
			} else {
				getLeadViewApi(data).then((res) => {
					res.data && editingData === undefined && setEditingData(res.data);
					editingData &&
						editingData.lead &&
						editingData.socialList &&
						setLeadFormData({
							relationshipManager: editingData.lead.relationshipManager
								? editingData.lead.relationshipManager
								: undefined,
							leadId: editingData.lead.leadId ? editingData.lead.leadId : null,
							refId: editingData.lead.refId ? editingData.lead.refId : undefined,
							individualSalutation:
								editingData.lead.type === 'I' && editingData.lead.salutation
									? editingData.lead.salutation
									: undefined,
							individualFirstName:
								editingData.lead.type === 'I' && editingData.lead.firstName
									? editingData.lead.firstName
									: undefined,
							individualMiddleName:
								editingData.lead.type === 'I' && editingData.lead.middleName
									? editingData.lead.middleName
									: undefined,
							individualLastName:
								editingData.lead.type === 'I' && editingData.lead.lastName
									? editingData.lead.lastName
									: undefined,
							profileImageString: editingData.lead.profileImage
								? `data:image/jpeg;base64,${editingData.lead.profileImage}`
								: undefined,
							individualDob:
								editingData.lead.type === 'I' && editingData.lead.dateofBirthCorp
									? moment(editingData.lead.dateofBirthCorp)
									: undefined,
							individualCategory:
								editingData.lead.type === 'I' && editingData.lead.category
									? editingData.lead.category
									: undefined,
							individualNationality:
								editingData.lead.type === 'I' && editingData.lead.nationality
									? editingData.lead.nationality
									: (cs &&
											cs.length > 0 &&
											cs[0].controlStructureField
												.map((item) => {
													if (item.keyField === 'Nationality') {
														return item.defaultvalue;
													}
													return undefined;
												})
												.filter((item) => item !== undefined)[0]) ||
									  undefined,
							individualGender:
								editingData.lead.type === 'I' && editingData.lead.gender
									? editingData.lead.gender
									: undefined,
							corporateCompanyName:
								editingData.lead.type === 'C' && editingData.lead.firstName
									? editingData.lead.firstName
									: undefined,
							corporateContactPerson:
								editingData.lead.type === 'C' && editingData.lead.middleName
									? editingData.lead.middleName
									: undefined,
							corporateContactPersonDetails:
								editingData.lead.type === 'C' && editingData.lead.lastName
									? editingData.lead.lastName
									: undefined,
							corporateDoi:
								editingData.lead.type === 'C' && editingData.lead.dateofBirthCorp
									? moment(editingData.lead.dateofBirthCorp)
									: undefined,
							corporateCategory:
								editingData.lead.type === 'C' && editingData.lead.category
									? editingData.lead.category
									: undefined,
							corporateNationality:
								editingData.lead.type === 'C' && editingData.lead.nationality
									? editingData.lead.nationality
									: (cs &&
											cs.length > 0 &&
											cs[0].controlStructureField
												.map((item) => {
													if (item.keyField === 'Nationality') {
														return item.defaultvalue;
													}
													return undefined;
												})
												.filter((item) => item !== undefined)[0]) ||
									  undefined,
							countryCode: editingData.lead.dialCode ? editingData.lead.dialCode : undefined,
							altCountryCode: editingData.lead.alternateDialCode
								? editingData.lead.alternateDialCode
								: undefined,
							leadType: editingData.lead ? editingData.lead.type : 'I',
							contact: editingData.lead.mobile ? editingData.lead.mobile : undefined,
							alternateContact: editingData.lead.alternateNumber
								? editingData.lead.alternateNumber
								: undefined,
							emailId: editingData.lead.email ? editingData.lead.email : undefined,
							socialType:
								editingData && editingData.socialList
									? editingData.socialList.WhatsApp && editingData.socialList.Viber
										? ['WhatsApp', 'Viber']
										: editingData.socialList.WhatsApp
										? 'WhatsApp'
										: editingData.socialList.Viber
										? 'Viber'
										: undefined
									: undefined,
							whatsApp: editingData.socialList.WhatsApp
								? editingData.socialList.WhatsApp
								: undefined,
							viber: editingData.socialList.Viber ? editingData.socialList.Viber : undefined,
							address: editingData.lead.address ? editingData.lead.address : undefined,
							country: editingData.lead.country ? editingData.lead.country : undefined,
							state: editingData.lead.state ? editingData.lead.state : undefined,
							city: editingData.lead.city ? editingData.lead.city : undefined,
							twitter: editingData.socialList.Twitter ? editingData.socialList.Twitter : undefined,
							facebook: editingData.socialList.Facebook
								? editingData.socialList.Facebook
								: undefined,
							linkedin: editingData.socialList.LinkedIn
								? editingData.socialList.LinkedIn
								: undefined,
							zipCode: editingData.lead.zipCode ? editingData.lead.zipCode : undefined,
							branchName: editingData.lead.branch ? editingData.lead.branch : undefined,
							source: editingData.lead.source ? editingData.lead.source : undefined,
							sourceType: editingData.lead.sourceType ? editingData.lead.sourceType : undefined,
							sourceName: editingData.lead.sourceValue ? editingData.lead.sourceValue : undefined,
							SourcedBy: editingData.lead.SourcedBy ? editingData.lead.SourcedBy : undefined,
							InterestLevel: editingData.lead.interestlevel
								? editingData.lead.interestlevel
								: undefined,
							Suffix: editingData.lead.Suffix ? editingData.lead.Suffix : undefined,
							preferredCurrency: editingData.lead.preferredCurrency
								? editingData.lead.preferredCurrency
								: undefined,
							remark: editingData.lead.remark ? editingData.lead.remark : undefined,
							attachments: [],
							miscellaneous: undefined
						});
				});
			}
		}
	}, [form, editingData]);

	form.setFieldsValue(leadFormData);

	// useEffect(() => {
	//   if (user?.rmYN) {
	//     setLeadFormData({
	//       ...leadFormData,
	//       relationshipManager: user.userID,
	//       branchName: user.branch,
	//     });
	//   }
	// }, [csObject.Branch, user]);

	const handleLeadFormChange = (values) => {
		setLeadFormData({
			...leadFormData,
			...values
		});

		if (!values.profileImage) {
			setLeadFormData({
				...leadFormData,
				...values
			});
		}
		if (values.profileImage) {
			let pImg = values.profileImage;
			pImg.file &&
				pImg.file.originFileObj &&
				getBase64(pImg.file.originFileObj, (imageUrl) => {
					setLeadFormData({
						...leadFormData,
						...values,
						profileImageString: imageUrl,
						profileImageAttachment: {
							refType: null,
							refId: null,
							fileDescription: 'Profile_Photo',
							fileName: pImg.file.originFileObj.name,
							fileSize: (pImg.file.originFileObj.size / 1024).toString() + 'KB',
							mimeType: pImg.file.originFileObj.type,
							fileString: imageUrl && imageUrl.split(',')[1],
							attachmentFor: 'Profile_Photo',
							sessionId: ''
						}
					});
				});
		}
	};

	const handleFailModalOkOrCancel = () => {
		setShowFailModal(false);
	};
	const handleFormSubmitIfOk = (overwrite) => {
		form
			.validateFields()
			.then((res) => {
				postCompLeadApi(leadFormData, overwrite)
					.then((res) => {
						if (res.data) {
							setShowFailModal(false);
							setShowSuccessModal(true);
						}
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				setRequiredFiled(true);
			});
	};

	const onAlertClose = () => {
		setRequiredFiled(false);
	};
	return (
		<div className='lead-create-container'>
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
				<SuccessModal message='Action Updated Successfully' />
			</Modal>
			<FailModal
				visible={showFailModal}
				onOk={() => {
					handleFormSubmitIfOk(true);
				}}
				onCancel={handleFailModalOkOrCancel}
				errorArray={errorArray}
			/>
			<DashboardScreenTopbar
				screenText={mode && mode === 'edit' ? 'Edit Lead' : 'Create Lead'}
				breadCrumb='My Leads'
				cancelBtnText='Cancel'
				submitBtnText='Save'
				onSubmit={handleFormSubmit}
				onCancel={() => {
					if (screen === 'view') {
						const toObject = {
							pathname: `/dashboard/MyLead/leadView`,
							state: {
								leadId: leadFormData.leadId,
								rowNumber: rowNumber,
								filters: filters
							}
						};
						history.push(toObject);
					} else {
						history.goBack();
					}
				}}
			/>
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
			<div className='parent-form-container'>
				<LeadTypeFormCard
					form={form}
					formData={leadFormData}
					onValuesChange={handleLeadFormChange}
					rules={rules.length > 0 ? rules[0] : undefined}
					csObject={csObject[0]}
				/>
				{leadFormData.leadType === 'I' ? (
					<ProfileDetailsFormCard
						form={form}
						formData={leadFormData}
						onValuesChange={handleLeadFormChange}
						rules={rules.length > 0 ? rules[0] : undefined}
						csObject={csObject[0]}
					/>
				) : (
					<CorporateCompanyDetailsFormCard
						form={form}
						formData={leadFormData}
						onValuesChange={handleLeadFormChange}
						rules={rules.length > 0 ? rules[0] : undefined}
						csObject={csObject[0]}
					/>
				)}
				<ContactDetailsWithoutMapForm
					form={form}
					formData={leadFormData}
					onValuesChange={handleLeadFormChange}
					rules={rules.length > 0 ? rules[0] : undefined}
					csObject={csObject[0]}
					mode={mode}
				/>

				<ExtraSourceDetailsFormCard
					form={form}
					formData={leadFormData}
					onValuesChange={handleLeadFormChange}
					rules={rules.length > 0 ? rules[0] : undefined}
					csObject={csObject[0]}
				/>
				<RelationshipManagerDetailsFormCard
					form={form}
					formData={leadFormData}
					user={user}
					onValuesChange={handleLeadFormChange}
					rules={rules.length > 0 ? rules[0] : undefined}
					csObject={csObject[0]}
				/>
				<BackToTop />
			</div>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		cs: state.compLeadCreate.controlStructure,
		user: state.auth.user
	};
};

const mapDispatchToProps = {
	executeGetLeadCreateCs
};

export default connect(mapStateToProps, mapDispatchToProps)(CompLeadCreateScreen);
