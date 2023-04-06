import React, { useEffect, useState } from 'react';
import './prospectCreateScreen.scss';
import { Form, Button, Alert, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Schema from 'async-validator';
import moment from 'moment';
import { createValidators, generateCsObject, getBase64, getDateFormat } from '../../utils/utils';
import { executeGetProspectCreateCs } from '../../redux/actions/prospectCreateActions';
import { connect } from 'react-redux';
import { postProspectApi } from '../../api/prospectCreateApi';
import ProspectTypeFormCard from '../../components/Forms/ProspectTypeFormCard/ProspectTypeFormCard';
import ProfileDetailsFormCard from '../../components/Forms/ProfileDetailsFormCard/ProfileDetailsFormCard';
import CorporateCompanyDetailsFormCard from '../../components/Forms/CorporateCompanyDetailsFormCard/CorporateCompanyDetailsFormCard';
import ContactDetailsFormCard from '../../components/Forms/ContactDetailsFormCard/ContactDetailsFormCard';
import SourceDetailsFormCard from '../../components/Forms/SourceDetailsFormCard/SourceDetailsFormCard';
import OtherDetailsFormCard from '../../components/Forms/OtherDetailsFormCard/OtherDetailsFormCard';
// import KycValidationDetails from "../../components/Forms/CustomerKYCDetailsFormCard/CustomerKYCDetailsFormCard";
import RelationshipManagerDetailsFormCard from '../../components/Forms/RelationshipManagerDetailsFormCard/RelationshipManagerDetailsFormCard';
import DocumentsDetail from '../../components/Forms/CustomerDocumentsDetailFormCard/CustomerDocumentsDetailFormCard';
import MiscellaneousFormCard from '../../components/Forms/MiscellaneousFormCard/MiscellaneousFormCard';
import DashboardScreenTopbar from '../../components/DashboardScreenTopbar/DashboardScreenTopbar';
import { useHistory, useLocation } from 'react-router-dom';
import { excecuteGetProspect360View } from '../../redux/actions/prospectViewActions';
import {
	getProspects360ViewApi,
	getProspectRelationsApi,
	getAttachmentDetailApi
} from '../../api/prospectViewApi';
import {
	getQuestionAnswerList,
	postCustomerApi,
	getCustomerDetails,
	getMiscellaneousDetailsForCustomer,
	getAttachmentDetailsForCustomer
} from '../../api/customerCreateApi';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import Modal from 'antd/lib/modal/Modal';
import FailModal from '../../components/Modal/FailModal/FailModal';
import RelationDetailsFormCard from '../../components/Forms/RelationDetailsFormCard/RelationDetailsFormCard';
import axios from 'axios';
import { faSpinnerThird } from '@fortawesome/pro-light-svg-icons';
// import UploadByFormat from "../../components/UploadByFormat/UploadByFormat";
import AttachmentUploadModal from '../../components/AttachmentPannel/AttachmentUploadModal';
import { CONSTANTS } from '../../constants/constants';
import BackToTop from '../../components/BackToTop/BackToTop';
import KycValidationDetails from './ProspectKycDetails';
import RiskProfileFormCard from '../../components/Forms/RiskProfileFormCard/RiskProfileFormCard';

// Schema.warning = (msg, msg2) => {}

// Main Function
const ProspectCreateScreen = (props) => {
	const { user, cs } = props;
	const location = useLocation();
	let screen;
	let data;
	let action;
	let prospectIds;
	let rowIndex;
	if (location && location.state) {
		screen = location.state.screen;
		data = location.state.data;
		action = location.state.action;
		prospectIds = location.state.prospectIds;
		rowIndex = location.state.rowIndex;
	}

	const [prospectFormData, setProspectFormData] = useState({
		countryCode: '+63',
		altCountryCode: '+63',
		prospectType: 'I',
		title: '',
		placeHolder: 'Select',
		titleCondition: 'M',
		reference: 'C',
		event: location.state?.action === 'edit' ? 'M' : ' ',
		socialList: {
			dialCode: '+63',
			alternateDialCode: '+63'
		},
		nationality: 'PH',
		country: 'PH',
		// country: '',
		mailCountry: 'PH',
		permCountry: 'PH',
		currency: 'PHP',
		status: 'Active',
		relationshipManager: user?.rmYN === 'Y' ? user.userID : null,
		branchName: user?.rmYN === 'Y' ? user.branch : null,
		relationDetail: [],
		isSecuritySuitability: true,
		sourcedBy: user?.userRole === 'BU' ? 'BR' : undefined,
		refType: location?.state?.refType
	});

	const [attachmentsModalDataArray, setAttachmentsModalDataArray] = useState([]);
	const [filenames, setFilenames] = useState([]);
	const [requiredFiled, setRequiredFiled] = useState(false);
	const [riskProfileQA, setRiskProfileQA] = useState();
	const [loading, setLoading] = useState(false);

	// ----------------------------start for document detail validation-------------------------
	const [documentRequiredField, setDocumentRequiredField] = useState({
		mandatoryCount: 0,
		required: false,
		showAlertMessage: false
	});
	const [editAttachments, setEditAttachmnts] = useState([]);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showFailModal, setShowFailModal] = useState(false);
	const [errorArray, setErrorArray] = useState([]);
	const history = useHistory();
	const [form] = Form.useForm();
	const [formModal] = Form.useForm();

	useEffect(() => {
		prospectFormData && form.setFieldsValue(prospectFormData);
	}, [prospectFormData, form]);

	// Control Structure Api
	useEffect(() => {
		executeGetProspectCreateCs();
	}, []);
	// remove attachments
	const removeAttachment = (fileName) => {
		if (Array.isArray(filenames)) {
			setFilenames(filenames.filter((item) => item.fileName !== fileName));
		}
	};

	// ----------------------------start for document detail validation-------------------------

	const checkDocMandatory = () => {
		if (
			Array.isArray(prospectFormData?.DocumentInfo) &&
			prospectFormData?.DocumentInfo?.length > 0
		) {
			let countVal = 0;
			prospectFormData?.DocumentInfo.map((_) => {
				if (_.docmandatory === 'Y') {
					countVal += 1;
				}
			});
			if (countVal >= documentRequiredField.mandatoryCount) {
				setDocumentRequiredField({ ...documentRequiredField, required: false });
			}
		}
	};

	useEffect(() => {
		if (prospectFormData?.DocumentInfo?.length > 0) {
			checkDocMandatory();
		}
	}, [prospectFormData?.DocumentInfo]);

	useEffect(() => {
		if (prospectFormData?.DocumentInfo?.length > 0 && location.state?.action === 'edit') {
			checkDocMandatory();
		}
	}, []);

	const [documentRequestObject, setDocumentRequestObject] = useState({});

	useEffect(() => {
		const newDocumentRequestObject = {
			data: {
				RefID: prospectFormData?.prospectId || '',
				RefType: 'PROSPECTADD',
				CustomerType: prospectFormData?.prospectType,
				CustomerCategory:
					prospectFormData?.prospectType === 'I'
						? prospectFormData?.individualCategory
						: prospectFormData?.corporateCategory,
				ApplicableFor: 'P'
			}
		};
		setDocumentRequestObject(newDocumentRequestObject);
	}, [
		prospectFormData?.prospectId,
		prospectFormData?.customerType,
		prospectFormData?.prospectType === 'I'
			? prospectFormData?.individualCategory
			: prospectFormData?.corporateCategory
	]);

	const bringEditingData = (editingData) => {
		const { prospectDetail, riskProfileModel, socialList, uploadedDocInfo, ...rest } = editingData;

		if (prospectDetail?.profileImage) {
			let stringVal = 'data:image;base64,' + prospectDetail?.profileImage;
			let stringLength = stringVal?.length;
			let sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
			let sizeInKb = sizeInBytes / 1000;
			var profileImage = {
				refType: null,
				refId: null,
				fileDescription: 'Profile_Photo',
				fileName: '',
				fileSize: Math.floor(sizeInKb) + 'KB',
				mimeType: 'image',
				fileString: prospectDetail?.profileImage,
				attachmentFor: 'Profile_Photo',
				sessionId: ''
			};
		}

		let editCaptureData = {
			// Initial Prospect Data
			prospectType: prospectDetail.typeDataValue ? prospectDetail.typeDataValue : 'I',
			reference: prospectDetail.reference ? prospectDetail.reference : 'CIF',
			prospectId: prospectDetail.prospectId ? prospectDetail.prospectId : '',
			cifnumber: prospectDetail?.cifnumber ? prospectDetail?.cifnumber : '',
			isOverWrite: false,
			id: prospectDetail.id ? prospectDetail.id : '',
			// Personal Details
			// if Type Individual
			title:
				prospectDetail.typeDataValue === 'I' && prospectDetail.salutationDataValue
					? prospectDetail.salutationDataValue
					: '',
			titleCondition: '',
			individualFirstName:
				prospectDetail.typeDataValue === 'I' && prospectDetail.firstName
					? prospectDetail.firstName
					: '',
			individualMiddleName:
				prospectDetail.typeDataValue === 'I' && prospectDetail.middleName
					? prospectDetail.middleName
					: '',
			individualLastName:
				prospectDetail.typeDataValue === 'I' && prospectDetail.lastName
					? prospectDetail.lastName
					: '',
			profileImageString: prospectDetail.profileImage
				? `data:image/jpeg;base64,${prospectDetail.profileImage}`
				: '',
			suffix: prospectDetail?.suffix ? prospectDetail?.suffix : '',
			profileImage: { fileString: prospectDetail.profileImage },
			individualSuffix: prospectDetail?.suffix ? prospectDetail?.suffix : '',
			individualDob:
				prospectDetail.typeDataValue === 'I' && prospectDetail.dateofBirthCorp
					? moment(prospectDetail.dateofBirthCorp)
					: undefined,
			individualGender:
				prospectDetail.typeDataValue === 'I' && prospectDetail.genderDataValue
					? prospectDetail.genderDataValue
					: undefined,
			individualCategory:
				prospectDetail.typeDataValue === 'I' && prospectDetail.categoryDataValue
					? prospectDetail.categoryDataValue
					: undefined,
			individualNationality:
				prospectDetail.typeDataValue === 'I' && prospectDetail.nationalityDataValue
					? prospectDetail.nationalityDataValue
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
			// if type Corporate
			corporateCompanyName:
				prospectDetail.typeDataValue === 'C' && prospectDetail.firstName
					? prospectDetail.firstName
					: undefined,
			corporateContactPerson:
				prospectDetail.typeDataValue === 'C' && prospectDetail.middleName
					? prospectDetail.middleName
					: undefined,
			corporateContactPersonDetails:
				prospectDetail.typeDataValue === 'C' && prospectDetail.lastName
					? prospectDetail.lastName
					: undefined,
			corporateProfileImage:
				prospectDetail.typeDataValue === 'C' && prospectDetail.profileImage
					? prospectDetail.profileImage
					: undefined,
			corporateDoi:
				prospectDetail.typeDataValue === 'C' && prospectDetail.dateofBirthCorp
					? moment(prospectDetail.dateofBirthCorp)
					: undefined,
			corporateCategory:
				prospectDetail.typeDataValue === 'C' && prospectDetail.categoryDataValue
					? prospectDetail.categoryDataValue
					: undefined,
			corporateNationality:
				prospectDetail.typeDataValue === 'C' && prospectDetail.nationalityDataValue
					? prospectDetail.nationalityDataValue
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
			// Contact Details
			countryCode: prospectDetail.dialCode ? prospectDetail.dialCode : '',
			contact: prospectDetail.mobile ? prospectDetail.mobile : '',
			altCountryCode: prospectDetail.alternateDialCode
				? prospectDetail.alternateDialCode
				: undefined,
			alternateContact: prospectDetail.alternateNumber ? prospectDetail.alternateNumber : '',
			emailId: prospectDetail.email ? prospectDetail.email : '',
			whatsApp: socialList.WhatsApp ? socialList.WhatsApp : '',
			viber: socialList.Viber ? socialList.Viber : '',
			address: prospectDetail.address ? prospectDetail.address : '',
			zipCode: prospectDetail.zipCode ? prospectDetail.zipCode : '',
			country: prospectDetail.countryDataValue ? prospectDetail.countryDataValue : '',
			state: prospectDetail.stateDataValue ? prospectDetail.stateDataValue : '',
			city: prospectDetail.cityDataValue ? prospectDetail.cityDataValue : '',
			twitter: socialList.Twitter ? socialList.Twitter : '',
			facebook: socialList.Facebook ? socialList.Facebook : '',
			linkedIn: socialList.LinkedIn ? socialList.LinkedIn : '',
			// Source Details
			source: prospectDetail.source ? prospectDetail.source : '',
			sourceType: prospectDetail.sourceType ? prospectDetail.sourceType : '',
			sourcedBy: prospectDetail.sourcedBy ? prospectDetail.sourcedBy : '',
			sourceName: prospectDetail.sourceValue ? prospectDetail.sourceValue : '',
			// Kyc Details
			primaryId: prospectDetail.primaryId ? prospectDetail.primaryId : '',
			primaryIdnumber: prospectDetail.primaryIdnumber ? prospectDetail.primaryIdnumber : '',
			expiryDate: prospectDetail.expiryDate ? moment(prospectDetail.expiryDate) : '',
			riskCategory: prospectDetail.riskCategory ? prospectDetail.riskCategory : '',
			riskScore: prospectDetail.riskScore ? prospectDetail.riskScore : '',
			// Other Details
			qualificationStatus: prospectDetail.qualificationStatusDataValue
				? prospectDetail.qualificationStatusDataValue
				: '',
			interestLevel: prospectDetail.interestlevelDataValue
				? prospectDetail.interestlevelDataValue
				: '',
			preferredCurrency: prospectDetail.preferredCurrencyDataValue
				? prospectDetail.preferredCurrencyDataValue
				: '',
			status: prospectDetail.status ? prospectDetail.status : 'Active',
			remarks: prospectDetail.remark ? prospectDetail.remark : '',
			// Relationship Manager's Details
			relationshipManager: prospectDetail.relationshipManagerDataValue
				? prospectDetail.relationshipManagerDataValue
				: '',
			branchName: prospectDetail.branchDataValue ? prospectDetail.branchDataValue : '',
			// Attachments
			// attachments:
			// 	Array.isArray(editAttachments) && editAttachments.length > 0 ? editAttachments : [],
			fileList: [],
			// profileImageAttachment:
			// 	editAttachments.length > 0
			// 		? editAttachments.filter((item) => item.attachmentFor === 'Profile_Photo')[0]
			// 		: undefined,
			profileImageAttachment: profileImage,
			// Risk Profile
			riskProfileModel: riskProfileModel,
			DocumentInfo: uploadedDocInfo?.lstDocumentInfo
		};

		Promise.all([
			getProspectRelationsApi(data),
			getMiscellaneousDetailsForCustomer('PROSPECTADD', data),
			getAttachmentDetailApi(data)
		]).then((finalRes) => {
			let miscellaneousArray = finalRes[1].data.miscellaneous.map((misc) => {
				return {
					type: misc.fieldName,
					miscellaneous: misc.fieldValue
				};
			});
			editCaptureData = {
				...editCaptureData,
				relationDetail: finalRes[0].data?.map(({ relationName, name, ...rest }) => {
					return {
						...rest,
						relationName: name,
						relationNameID: relationName
					};
				}),
				miscellaneous: miscellaneousArray,
				attachments: finalRes[2]?.data
			};
			setProspectFormData(editCaptureData);
			setAttachmentsModalDataArray(finalRes[2]?.data);
		});
	};

	useEffect(() => {
		if (screen === 'list' && action === 'edit') {
			getProspects360ViewApi(data)
				.then((res) => {
					bringEditingData(res.data);
				})
				.catch(() => {});

			// getAttachmentDetailApi(data)
			// 	.then((res) => {
			// 		 setEditAttachmnts(editAttachments);
			// 		setAttachmentsModalDataArray(res.data);
			// 	})
			// 	.catch(() => {});
		}
	}, []);

	const checkValidations = () => {
		if (documentRequiredField.required) {
			setDocumentRequiredField({ ...documentRequiredField, showAlertMessage: true });
			form
				.validateFields()
				.then(() => {})
				.catch((err) => {
					setRequiredFiled(true);
				});
		} else {
			setRequiredFiled(false);
			//   handleFormSubmit()
			handleFormSubmit(false);
		}
	};

	let rules = [];
	let csObject = [];
	cs !== '' &&
		cs.length > 0 &&
		cs.forEach((s, index) => {
			rules[index] = createValidators(s.controlStructureField, form);
			csObject[index] = generateCsObject(s.controlStructureField);
		});

	console.log(csObject);

	const handleFormSubmit = (overwrite) => {
		setLoading(true);
		form
			.validateFields()
			.then((res) => {
				postProspectApi(prospectFormData, false, location.state?.data ? location.state.data : null)
					.then((res) => {
						if (res.data.success) {
							setShowSuccessModal(true);
							setLoading(false);
						} else {
							setErrorArray([
								{
									message: res.data.message,
									mobile: res.data.mobile,
									name: res.data.name
								}
							]);
							setShowFailModal(true);
							setLoading(false);
						}
					})
					.catch((err) => {
						setLoading(false);
					});
			})
			.catch((err) => {
				setRequiredFiled(true);
				setLoading(false);
			});
	};

	const handleFormSubmitIfOk = (overwrite) => {
		form
			.validateFields()
			.then((res) => {
				postProspectApi(prospectFormData, overwrite)
					.then((res) => {
						if (res.data) {
							setShowFailModal(false);
							setShowSuccessModal(true);
						}
					})
					.catch((err) => {});
			})
			.catch((err) => {
				setRequiredFiled(true);
			});
	};

	const handleProspectFormChange = (values) => {
		if (values.relationshipManager) {
			const csObj =
				csObject[
					cs
						.map((item, index) => (item.sectionName === 'Main' ? index : false))
						.filter((indexItem) => indexItem !== false)[0]
				];
			const reManager = csObj?.RelationshipManager?.lookupValue?.lookUpValues?.find((item) => {
				return item.ID === values.relationshipManager;
			});

			setProspectFormData({
				...prospectFormData,
				...values,
				branchName: reManager.Branch
			});
		}
		if (values.attachments && values.attachments.length > 0) {
			let attachmentsModalData = values.attachments.map((file) => {
				return {
					fileDescription: file.fileDescription,
					fileName: file.fileName,
					fileSize: file.fileSize,
					fileType: file.fileType,
					mimeType: file.mimetype,
					fileString: file.fileString,
					// attachmentFor: "Attachments",
					attachmentFor: file.fileName,
					attachedBy: user && user.userName,
					refId: file.refId,
					refType: file.refType,
					sessionId: file.SessionId
				};
			});
			let finalAttachmentsModalData = [...attachmentsModalDataArray];
			// ----------------used for delete operation-----------------------
			if (values?.operation && values?.operation === 'delete') {
				finalAttachmentsModalData = [];
			}
			// ----------------used for delete operation-----------------------
			setAttachmentsModalDataArray([...finalAttachmentsModalData, ...attachmentsModalData]);
		}
		// ----------------used for delete operation-----------------------
		if (
			values?.operation &&
			values?.operation === 'delete' &&
			values?.attachments &&
			values?.attachments?.length === 0
		) {
			setAttachmentsModalDataArray([]);
		}
		if (
			!values.attachments &&
			!values.profileImage &&
			!values.relationshipManager &&
			!values.DocumentInfo
		) {
			setProspectFormData({
				...prospectFormData,
				...values
			});
		}
		// OLD ATTACHMENT COMPONENT >>> UPLOADBYFORMAT
		// if (values.attachments && values.attachments.fileList) {
		//   if (values.attachments.file.status === "removed") {
		//     setProspectFormData({
		//       ...prospectFormData,
		//       attachments: prospectFormData.attachments.filter(
		//         (item) => item.fileName !== values.attachments.file.name
		//       ),
		//     });
		//   } else if (
		//     Array.isArray(values.attachments.fileList) &&
		//     values.attachments.fileList.length > 0
		//   ) {
		//     let attachments = [];
		//     values.attachments.fileList.forEach((file) => {
		//       if (file.size / 1024 / 1024 <= 1) {
		//         getBase64(file.originFileObj, (imageUrl) => {
		//           // if (Array.isArray(attachments)) {

		//           attachments = [
		//             ...attachments,
		//             ...getExistingAttachments(),
		//             {
		//               refType: null,
		//               refId: null,
		//               fileDescription: "Attachments",
		//               fileName: file.originFileObj.name,
		//               fileSize:
		//                 (file.originFileObj.size / 1024).toFixed(2).toString() +
		//                 "KB",
		//               mimeType: file.originFileObj.type,
		//               fileString: imageUrl && imageUrl.split(",")[1],
		//               attachmentFor: "Attachments",
		//               attachedBy: user && user.userName,
		//               sessionId: "",
		//             },
		//           ];
		//           setAttachments(attachments, values.attachments.fileList);
		//         });
		//       }
		//       // }
		//     });
		//   }
		// }
		if (values.DocumentInfo) {
			setProspectFormData({
				...prospectFormData,
				...values
				// individualDob: moment(values.individualDob).toISOString(),
			});
		}
		if (values.individualDob) {
			setProspectFormData({
				...prospectFormData,
				...values
				// individualDob: moment(values.individualDob).toISOString(),
			});
		}
		if (values.corporateDoi) {
			setProspectFormData({
				...prospectFormData,
				...values
				// corporateDoi: moment(values.corporateDoi).toISOString(),
			});
		}

		if (values.profileImage) {
			let pImg = values.profileImage;
			pImg.file &&
				pImg.file.originFileObj &&
				getBase64(pImg.file.originFileObj, (imageUrl) => {
					setProspectFormData({
						...prospectFormData,
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

	const handleActionModalOkOrCancel = () => {
		setShowFailModal(false);

		setProspectFormData({
			...prospectFormData,
			isOverwrite: false
		});
		// handleFormSubmit();
	};
	// useEffect(() => {
	//   // prospectFormData.isOverWrite && handleFormSubmit();
	// }, [prospectFormData]);

	useEffect(() => {
		setProspectFormData({
			...prospectFormData,
			attachments: attachmentsModalDataArray
		});
	}, [attachmentsModalDataArray]);

	const onAlertClose = () => {
		setRequiredFiled(false);
		setDocumentRequiredField({ ...documentRequiredField, showAlertMessage: false });
	};

	const getQuestionAnswer = async () => {
		try {
			const response = await getQuestionAnswerList(prospectFormData, 'PROSPECT');
			setRiskProfileQA(response.data);
		} catch (error) {}
	};

	useEffect(() => {
		getQuestionAnswer();
	}, [
		prospectFormData?.prospectType,
		prospectFormData?.prospectType === 'I'
			? prospectFormData?.individualCategory
			: prospectFormData?.corporateCategory
	]);

	useEffect(() => {
		if (action === 'edit' || action === 'create') {
			getQuestionAnswer();
		}
	}, []);

	const onIsSecuritySuitabilityHandler = (val) => {
		setProspectFormData({ ...prospectFormData, isSecuritySuitability: val });
	};

	return (
		<div className='prospect-create-container'>
			<Modal
				visible={showSuccessModal}
				closable={false}
				footer={[
					<Button
						onClick={() => {
							setShowSuccessModal(false);
							history.goBack();
						}}
						key={'ok'}
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
				closable={false}
				errorArray={errorArray}
				onOk={() => {
					handleFormSubmitIfOk(true);
				}}
				onCancel={handleActionModalOkOrCancel}
			/>

			{/* Title Bar Start */}
			<DashboardScreenTopbar
				screenText={action && action === 'edit' ? 'Edit Prospect' : 'Create Prospect'}
				breadCrumb='My Prospects'
				cancelBtnText='Cancel'
				submitBtnText='Save'
				// onSubmit={() => {
				// 	handleFormSubmit(false);
				// }}
				onSubmit={checkValidations}
				onCancel={() => {
					if (screen === 'view') {
						const toObject = {
							pathname: `/dashboard/MyProspect/ProspectView`,
							state: {
								prospectIds: prospectFormData.prospectId,
								rowIndex: rowIndex
							}
						};
						history.push(toObject);
					} else {
						history.goBack();
					}
				}}
				loading={loading}
			/>
			{/* Title Bar End */}
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
			{documentRequiredField.showAlertMessage ? (
				<Alert
					message='Error'
					description={'Please upload mandatory document'}
					type='error'
					closable
					onClose={setTimeout(() => {
						onAlertClose();
					}, 5000)}
				/>
			) : (
				''
			)}
			{cs ? (
				<Space direction='vertical' size={16} className='parent-form-container'>
					{/* Prospect Type Form Section Start */}
					<ProspectTypeFormCard
						form={form}
						formData={prospectFormData}
						action={location?.state?.action}
						setProspectFormData={setProspectFormData}
						defaultProspectFormData={prospectFormData}
						onValuesChange={handleProspectFormChange}
						rules={
							rules.length > 0
								? rules[
										cs
											.map((item, index) => (item.sectionName === 'Main' ? index : false))
											.filter((indexItem) => indexItem !== false)[0]
								  ]
								: undefined
						}
						csObject={
							csObject[
								cs
									.map((item, index) => (item.sectionName === 'Main' ? index : false))
									.filter((indexItem) => indexItem !== false)[0]
							]
						}
					/>
					{/* Prospect Type Form Section End */}

					{/* Profile/Company Details Section End */}
					{prospectFormData.prospectType === 'I' ? (
						<ProfileDetailsFormCard
							action={location?.state?.action}
							form={form}
							formData={prospectFormData}
							onValuesChange={handleProspectFormChange}
							rules={
								rules.length > 0
									? rules[
											cs
												.map((item, index) => (item.sectionName === 'Main' ? index : false))
												.filter((indexItem) => indexItem !== false)[0]
									  ]
									: undefined
							}
							csObject={
								csObject[
									cs
										.map((item, index) => (item.sectionName === 'Main' ? index : false))
										.filter((indexItem) => indexItem !== false)[0]
								]
							}
						/>
					) : (
						<CorporateCompanyDetailsFormCard
							action={location?.state?.action}
							form={form}
							formData={prospectFormData}
							onValuesChange={handleProspectFormChange}
							rules={
								rules.length > 0
									? rules[
											cs
												.map((item, index) => (item.sectionName === 'Main' ? index : false))
												.filter((indexItem) => indexItem !== false)[0]
									  ]
									: undefined
							}
							csObject={
								csObject[
									cs
										.map((item, index) => (item.sectionName === 'Main' ? index : false))
										.filter((indexItem) => indexItem !== false)[0]
								]
							}
						/>
					)}

					{/* Profile/Company Details Section End */}

					{/* Contact Details Form Section End */}
					<ContactDetailsFormCard
						form={form}
						formData={prospectFormData}
						onValuesChange={handleProspectFormChange}
						rules={
							rules.length > 0
								? rules[
										cs
											.map((item, index) => (item.sectionName === 'Main' ? index : false))
											.filter((indexItem) => indexItem !== false)[0]
								  ]
								: undefined
						}
						csObject={
							csObject[
								cs
									.map((item, index) => (item.sectionName === 'Main' ? index : false))
									.filter((indexItem) => indexItem !== false)[0]
							]
						}
						mode={action}
					/>
					{/* Contact Details Form Section End */}

					{/* Relation Details Form Section Start */}
					{cs &&
						cs.filter((item) => item.sectionName === 'Grid_Relation') &&
						cs.filter((item) => item.sectionName === 'Grid_Relation').length > 0 &&
						cs.filter((item) => item.sectionName === 'Grid_Relation')[0] && (
							<RelationDetailsFormCard
								form={form}
								formModal={formModal}
								formData={prospectFormData}
								onValuesChange={handleProspectFormChange}
								rules={rules.length > 0 ? rules : undefined}
								cs={cs}
								csObject={csObject}
								relationFormFrom={'prospectCreate'}
							/>
						)}
					{/* Relation Details Form Section End */}

					{/* KycValidationDetails Section End */}
					<KycValidationDetails
						form={form}
						formData={prospectFormData}
						onValuesChange={handleProspectFormChange}
						// handleChangeRiskScore={handleChangeRiskScore}
						rules={
							rules.length > 0
								? rules[
										cs
											.map((item, index) => (item.sectionName === 'Main' ? index : false))
											.filter((indexItem) => indexItem !== false)[0]
								  ]
								: undefined
						}
						csObject={
							csObject[
								cs
									.map((item, index) => (item.sectionName === 'Main' ? index : false))
									.filter((indexItem) => indexItem !== false)[0]
							]
						}
					/>
					{/* KycValidationDetails Section End */}

					{/* Source Details Section Start */}
					<SourceDetailsFormCard
						form={form}
						formData={prospectFormData}
						onValuesChange={handleProspectFormChange}
						rules={
							rules.length > 0
								? rules[
										cs
											.map((item, index) => (item.sectionName === 'Main' ? index : false))
											.filter((indexItem) => indexItem !== false)[0]
								  ]
								: undefined
						}
						csObject={
							csObject[
								cs
									.map((item, index) => (item.sectionName === 'Main' ? index : false))
									.filter((indexItem) => indexItem !== false)[0]
							]
						}
					/>
					{/* Source Details Section End */}

					{/* Other Details Section Start */}
					<OtherDetailsFormCard
						form={form}
						formData={prospectFormData}
						onValuesChange={handleProspectFormChange}
						rules={
							rules.length > 0
								? rules[
										cs
											.map((item, index) => (item.sectionName === 'Main' ? index : false))
											.filter((indexItem) => indexItem !== false)[0]
								  ]
								: undefined
						}
						csObject={
							csObject[
								cs
									.map((item, index) => (item.sectionName === 'Main' ? index : false))
									.filter((indexItem) => indexItem !== false)[0]
							]
						}
					/>
					{/* Other Details Section End */}

					{/* Relationship Manager Details Section Start */}
					<RelationshipManagerDetailsFormCard
						form={form}
						formData={prospectFormData}
						user={user}
						onValuesChange={handleProspectFormChange}
						rules={
							rules.length > 0
								? rules[
										cs
											.map((item, index) => (item.sectionName === 'Main' ? index : false))
											.filter((indexItem) => indexItem !== false)[0]
								  ]
								: undefined
						}
						csObject={
							csObject[
								cs
									.map((item, index) => (item.sectionName === 'Main' ? index : false))
									.filter((indexItem) => indexItem !== false)[0]
							]
						}
					/>
					{/* Relationship Manager Details Section End */}

					{/* Attachments Section Start */}
					{/* <UploadByFormat
            uploadFormat="attachments"
            form={form}
            formData={prospectFormData}
            onValuesChange={handleProspectFormChange}
            rules={
              rules.length > 0
                ? rules[
                    cs
                      .map((item, index) =>
                        item.sectionName === "Main" ? index : false
                      )
                      .filter((indexItem) => indexItem !== false)[0]
                  ]
                : undefined
            }
            removeAttachment={removeAttachment}
            csObject={
              csObject[
                cs
                  .map((item, index) =>
                    item.sectionName === "Main" ? index : false
                  )
                  .filter((indexItem) => indexItem !== false)[0]
              ]
            }
            id={prospectFormData.prospectId}
          /> */}
					{/* <UploadByFormat/> */}
					<RiskProfileFormCard
						form={form}
						formData={prospectFormData}
						onValuesChange={handleProspectFormChange}
						rules={
							rules.length > 0
								? rules[
										cs
											.map((item, index) => (item.sectionName === 'Main' ? index : false))
											.filter((indexItem) => indexItem !== false)[0]
								  ]
								: undefined
						}
						csObject={
							csObject[
								cs
									.map((item, index) => (item.sectionName === 'Main' ? index : false))
									.filter((indexItem) => indexItem !== false)[0]
							]
						}
						questionAnswer={riskProfileQA}
						action={location?.state?.action}
						screen={'prospectCreate'}
						// setIsSecuritySuitability={setIsSecuritySuitability}
						onIsSecuritySuitabilityHandler={onIsSecuritySuitabilityHandler}
					/>
					<AttachmentUploadModal
						selectedAccount={{
							// scheme: location.state?.refID,
							scheme: prospectFormData?.prospectId,
							refType: 'PROSPECTADD'
						}}
						// selectedAccount={{  refType: location.state?.refType,scheme: location.state?.refID, }}
						isUpload={false}
						type='PROSPECTADD'
						onValuesChange={handleProspectFormChange}
						data={attachmentsModalDataArray}
					/>

					{/* Attachments Section End */}
					<DocumentsDetail
						form={form}
						formData={prospectFormData}
						onValuesChange={handleProspectFormChange}
						rules={rules.length > 0 ? rules : undefined}
						removeAttachment={removeAttachment}
						csObject={csObject}
						action={location?.state?.action}
						documentRequestObject={documentRequestObject}
						setDocumentRequiredField={setDocumentRequiredField}
						documentRequiredField={documentRequiredField}
						checkDocMandatory={checkDocMandatory}
						type='PROSPECTADD'
					/>
					{/* Miscellaneous Section Start */}
					{cs &&
						cs.filter((item) => item.sectionName === 'Miscellaneous') &&
						cs.filter((item) => item.sectionName === 'Miscellaneous').length > 0 &&
						cs.filter((item) => item.sectionName === 'Miscellaneous')[0] && (
							<MiscellaneousFormCard
								form={form}
								formData={prospectFormData}
								onValuesChange={handleProspectFormChange}
								rules={rules.length > 0 ? rules[2] : undefined}
								csObject={
									csObject[
										cs
											.map((item, index) => (item.sectionName === 'Miscellaneous' ? index : false))
											.filter((indexItem) => indexItem !== false)[0]
									]
								}
							/>
						)}
					{/* Miscellaneous Section End */}
				</Space>
			) : (
				<div
					className='font-awesome-icon'
					style={{
						position: 'absolute',
						left: '50%',
						top: '50%',
						transform: 'translate(-50%, -50%)'
					}}
				>
					<FontAwesomeIcon icon={faSpinnerThird} spin />
				</div>
			)}
			{cs && <BackToTop />}
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.auth.user,
		cs: state.prospectCreate.controlStructure
	};
};
const mapDispatchToProps = {
	executeGetProspectCreateCs,
	excecuteGetProspect360View
};

export default connect(mapStateToProps, mapDispatchToProps)(ProspectCreateScreen);
