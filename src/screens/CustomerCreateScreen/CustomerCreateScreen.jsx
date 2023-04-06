import { useEffect, useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';
import { Form, Space, Button, Alert } from 'antd';
import { connect } from 'react-redux';
import { createValidators, generateCsObject, getBase64 } from '../../utils/utils';
import {
	executeGetCustomerCreateCs,
	setCreateCustomerData
} from '../../redux/actions/customerCreateActions';
import {
	getQuestionAnswerList,
	postCustomerApi,
	getCustomerDetails,
	getMiscellaneousDetailsForCustomer,
	getAttachmentDetailsForCustomer
} from '../../api/customerCreateApi';
import {
	getProspectRelationsApi,
	getProspectAttachmentDetailApi,
	getAttachmentDetailApi
} from '../../api/customerViewApi';
import DashboardScreenTopbar from '../../components/DashboardScreenTopbar/DashboardScreenTopbar';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import Modal from 'antd/lib/modal/Modal';
import FailModal from '../../components/Modal/FailModal/FailModal';
import CustomerType from '../../components/Forms/CustomerTypeFormCard/CustomerTypeFormCard';
import PersonalDetails from '../../components/Forms/CustomerPersonalDetailsFormCard/CustomerPersonalDetailsFormCard';
import ContactDetails from '../../components/Forms/CustomerContactDetailsFormCard/CustomerContactDetailsFormCard';
import AddressDetails from '../../components/Forms/CustomerAddressDetailsFormCard/CustomerAddressDetailsFormCard';
import KycValidationDetails from '../../components/Forms/CustomerKYCDetailsFormCard/CustomerKYCDetailsFormCard';
import SourceDetails from '../../components/Forms/CustomerSourceDetailsFormCard/CustomerSourceDetailsFormCard';
import OtherDetails from '../../components/Forms/CustomerOtherDetailsFormCard/CustomerOtherDetailsFormCard';
import RelationshipManagerDetails from '../../components/Forms/CustomerRelationshipManagerFormCard/CustomerRelationshipManagerFormCard';
import DocumentsDetail from '../../components/Forms/CustomerDocumentsDetailFormCard/CustomerDocumentsDetailFormCard';
import './CustomerCreateScreen.scss';
import UploadByFormat from '../../components/UploadByFormat/UploadByFormat';
import RiskProfileFormCard from '../../components/Forms/RiskProfileFormCard/RiskProfileFormCard';
import MiscellaneousFormCard from '../../components/Forms/MiscellaneousFormCard/MiscellaneousFormCard';
import BackToTop from '../../components/BackToTop/BackToTop';
import { CONSTANTS } from '../../constants/constants';

import {
	getProspects360ViewApi,
	getMiscellaneousDetailApi
	// getProspectRelationsApi
} from '../../api/prospectViewApi';

import RelationDetailsFormCard from '../../components/Forms/RelationDetailsFormCard/RelationDetailsFormCard';
import AttachmentUploadModal from '../../components/AttachmentPannel/AttachmentUploadModal';
import CustomerMailingInstruction from '../../components/Forms/CustomerMailingInstructions/CustomerMailingInstruction';
import { useReactToPrint } from 'react-to-print';
import ComponentToPrint from '../WealthManagementOnboardingForm/ComponentToPrint';

const CustomerCreateScreen = (props) => {
	// const { cs, prospectDataToCustomer, user,allAttachmentData, setCreateCustomerData } = props;
	const { cs, prospectDataToCustomer, user, setCreateCustomerData, minInvestmentValue } = props;
	// const [customerNewData, setCustomerNewData] = useState();
	const [attachmentsModalDataArray, setAttachmentsModalDataArray] = useState([]);
	const history = useHistory();
	const location = useLocation();

	const locationData = location.state;

	const [form] = Form.useForm();
	const [formModal] = Form.useForm();
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [riskProfileQA, setRiskProfileQA] = useState();
	const [showFailModal, setShowFailModal] = useState(false);
	const [filenames, setFilenames] = useState([]);
	const [errorArray, setErrorArray] = useState([]);
	const [editAttachments, setEditAttachmnts] = useState([]);
	const [editDocument, setEditDocument] = useState([]);
	const [loading, setLoading] = useState(false);
	// const [isSecuritySuitability,setIsSecuritySuitability] = useState(true);
	const [cifRespData, setCifRespData] = useState({});
	const [cifIconClickedRequired, setCifIconClickedRequired] = useState({
		showCifIconAlertMessage: false,
		cifIconClickedReq: false,
		showPoperOverMessage: false,
		errorMessage: ''
	});

	const [customerFormData, setCustomerFormData] = useState({
		callCifValidator: true,
		customerType: 'I',
		category: '2',
		// title: 'MR|M',
		title: 'MR',
		placeHolder: 'Select',
		titleCondition: 'M',
		reference: 'C',
		event: locationData?.action === 'edit' ? 'M' : ' ',
		socialList: {
			dialCode: '+63',
			alternateDialCode: '+63'
		},
		nationality: '01',
		country: 'PH',
		mailCountry: 'PH',
		permCountry: 'PH',
		compCountry: 'PH',

		currency: 'PHP',
		custRelMgr: user?.rmYN === 'Y' ? user.userID : null,
		bankAccbranch: user?.rmYN === 'Y' ? user.branch : null,
		relationDetail: [],
		miscellaneous: [],
		isSecuritySuitability: true,
		sourcedBy: user?.userRole === 'BU' ? 'BR' : undefined,
		refType: location?.state?.refType,
		cifDataOnEdit: false //on edit it will true if CIF Number is present
		// communicationPre: []
	});
	const [documentRequiredField, setDocumentRequiredField] = useState({
		mandatoryCount: 0,
		required: false,
		showAlertMessage: false
	});

	const [relationDetailCount, setRelationDetailCount] = useState({
		checkCount: false,
		relationCount: 0,
		showRealtionAlertMessage: false,
		yearCount: 0
	});
	const [riskProfileRequiredField, setRiskProfileRequiredField] = useState({
		required: false,
		showRiskProfileAlertMessage: false
	});

	const [requiredFiled, setRequiredFiled] = useState(false);

	useEffect(() => {
		executeGetCustomerCreateCs();

		if (locationData?.mode === 'create') {
			getCustomerDetailsFromProspect();
		}

		if (locationData?.action === 'convert') {
			getProspects360ViewApi(locationData?.data).then((res) => bringProspectEditingData(res.data));
			getProspectAttachmentDetailApi(locationData?.data)
				.then((res) => {
					setEditAttachmnts(editAttachments);
					setAttachmentsModalDataArray(res.data);
				})
				.catch(() => {});
		}

		if (locationData?.action === 'edit') {
			if (customerFormData?.DocumentInfo?.length > 0) {
				checkDocMandatory();
			}
			getExistingCustomerDetails();
		}
	}, []);

	useEffect(() => {
		form.setFieldsValue(customerFormData);
	}, [customerFormData]);

	useEffect(() => {
		setCreateCustomerData({ ...customerFormData, accType: 'CUSTOMER' });
	}, [customerFormData]);

	useEffect(() => {
		checkRiskProfileMandatoryRecord();
		// console.log('check riskprofilemodal------', customerFormData.riskProfileModel);
	}, [customerFormData.riskProfileModel]);

	useEffect(() => {
		checkRiskProfileMandatory();
	}, [customerFormData.category]);

	useEffect(() => {
		if (customerFormData?.dateOfBirth) {
			if (customerFormData?.customerType === 'I' && customerFormData?.dateOfBirth) {
				let checkAgeGap = () => {
					if (customerFormData?.dateOfBirth?._isAMomentObject) {
						let dobYear = customerFormData?.dateOfBirth?.year();
						let currYear = new Date().getFullYear();
						// console.log('cheeheeh----11------', Number(currYear) - Number(dobYear));
						return Number(currYear) - Number(dobYear);
					}
				};
				if (checkAgeGap() < 18) {
					// if (relationDetailCount?.yearCount < 18) {
					if (customerFormData?.relationDetail?.length === 0) {
						setRelationDetailCount({
							...relationDetailCount,
							checkCount: true,
							relationCount: customerFormData?.relationDetail?.length
						});
					} else {
						setRelationDetailCount({
							...relationDetailCount,
							checkCount: false,
							relationCount: customerFormData?.relationDetail?.length
						});
					}
				}
			} else {
				setRelationDetailCount({
					...relationDetailCount,
					checkCount: false,
					relationCount: customerFormData?.relationDetail?.length
				});
			}
		}
	}, [customerFormData.relationDetail, customerFormData.dateOfBirth]);
	// }, [customerFormData.relationDetail]);
	// --------------------------------end for relationDetail validation----------------------------------

	useEffect(() => {
		if (customerFormData?.DocumentInfo?.length > 0) {
			checkDocMandatory();
		}
	}, [customerFormData.DocumentInfo]);

	useEffect(() => {
		setCustomerFormData({ ...customerFormData, attachments: attachmentsModalDataArray });
	}, [attachmentsModalDataArray]);

	useEffect(() => {
		getQuestionAnswer();
	}, [
		customerFormData.customerType,
		customerFormData.category,
		customerFormData.residentialStatus
	]);
	/*
	useEffect(() => {
		console.log('10');
		console.log('check datata');

		// if (customerFormData.isSecuritySuitability) {
		const newDocumentRequestObject = {
			data: {
				CustomerType: customerFormData?.customerType || null,
				CustomerCategory: customerFormData?.category || null,
				ResidentialStatus: customerFormData?.residentialStatus || null,
				// RefID: "",
				RefID: locationData?.refID || '',
				RefType: locationData?.refType || '',
				// IsSecuritySuitability:isSecuritySuitability,
				IsSecuritySuitability: customerFormData?.isSecuritySuitability,
				IsClientEdit:
					locationData?.refType === 'CLIENTADD' && locationData?.action === 'edit' ? true : false
			}
		};
		setDocumentRequestObject(newDocumentRequestObject);
		// }
	}, [
		customerFormData.customerType,
		customerFormData.category,
		customerFormData.residentialStatus,
		customerFormData.isSecuritySuitability
	]);
*/
	const checkRiskProfileMandatoryRecord = () => {
		if (
			customerFormData?.riskProfileModel &&
			Object.keys(customerFormData?.riskProfileModel).length > 0
		) {
			// console.log('line no---- 249');
			// console.log('check riskprofilemodal----///--', customerFormData.riskProfileModel);
			setRiskProfileRequiredField({ ...riskProfileRequiredField, required: false });
		}
	};

	const checkRiskProfileMandatory = () => {
		// if (
		// 	customerFormData?.category &&
		// 	customerFormData?.category === '1' &&
		// 	(user?.userRole === 'BU' || user?.userRole === 'RBSMKR')
		// ) {
		// 	setRiskProfileRequiredField({ ...riskProfileRequiredField, required: true });
		// } else if (
		// 	customerFormData?.category &&
		// 	customerFormData?.category === '2' &&
		// 	(user?.userRole === 'RM' || user?.userRole === 'WMGMKO')
		// ) {
		// 	setRiskProfileRequiredField({ ...riskProfileRequiredField, required: true });
		// } else {
		// 	console.log('line no---- 268');
		// 	setRiskProfileRequiredField({ required: false, showRiskProfileAlertMessage: false });
		// }
		if (locationData?.action === 'edit') {
			checkRiskProfileMandatoryRecord();
		}
	};

	const checkDocMandatory = () => {
		if (
			Array.isArray(customerFormData?.DocumentInfo) &&
			customerFormData?.DocumentInfo?.length > 0
		) {
			let countVal = 0;
			customerFormData?.DocumentInfo.map((_) => {
				if (_.docmandatory === 'Y') {
					countVal += 1;
				}
			});
			if (countVal >= documentRequiredField.mandatoryCount) {
				setDocumentRequiredField({ ...documentRequiredField, required: false });
			}
		}
		// else {
		//   setDocumentRequiredField({ ...documentRequiredField, required: true });

		// }
	};

	const bringProspectEditingData = (editingData) => {
		const { prospectDetail, riskProfileModel, socialList, uploadedDocInfo } = editingData;
		const stringVal = 'data:image;base64,' + prospectDetail.profileImage;
		const stringLength = stringVal.length;
		const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
		const sizeInKb = sizeInBytes / 1000;
		const profileImage = {
			refType: null,
			refId: null,
			fileDescription: 'Profile_Photo',
			fileName: '',
			fileSize: Math.floor(sizeInKb) + 'KB',
			mimeType: 'image',
			fileString: prospectDetail.profileImage,
			attachmentFor: 'Profile_Photo',
			sessionId: ''
		};
		// console.log('line no 316-----------', riskProfileModel);
		let editCaptureData = {
			// Intial Details
			customerType: prospectDetail.typeDataValue ? prospectDetail.typeDataValue : 'I',
			reference: prospectDetail.reference ? prospectDetail.reference : 'CIF',
			otherIdNo: prospectDetail.cifnumber ? prospectDetail.cifnumber : '',
			// Personal Details
			title: prospectDetail.salutationDataValue ? prospectDetail.salutationDataValue : '',
			titleCondition: '',
			firstName: prospectDetail.firstName ? prospectDetail.firstName : '',
			secondName:
				prospectDetail?.typeDataValue === 'I' && prospectDetail?.middleName
					? prospectDetail?.middleName
					: '',
			thirdName:
				prospectDetail?.typeDataValue === 'I' && prospectDetail?.lastName
					? prospectDetail?.lastName
					: '',
			suffix: prospectDetail.suffix ? prospectDetail.suffix : '',
			profileImageString: prospectDetail.profileImage
				? `data:image/jpeg;base64,${prospectDetail.profileImage}`
				: '',
			profileImage: profileImage,
			category: prospectDetail.categoryDataValue ? prospectDetail.categoryDataValue : '',
			dateOfBirth: prospectDetail.dateofBirthCorp
				? moment(prospectDetail.dateofBirthCorp, 'YYYY-MM-DD')
				: null,
			gender: prospectDetail.genderDataValue ? prospectDetail.genderDataValue : '',
			nationality: prospectDetail.nationalityDataValue ? prospectDetail.nationalityDataValue : '',
			referenceName: prospectDetail.referenceName ? prospectDetail.referenceName : '',
			// Contact Details
			dialCode: prospectDetail.dialCode ? prospectDetail.dialCode : '',
			mobileNo: prospectDetail.mobile ? prospectDetail.mobile : '',
			alternateDialCode: prospectDetail.alternateDialCode ? prospectDetail.alternateDialCode : '',
			telephoneHome: prospectDetail.alternateNumber ? prospectDetail.alternateNumber : '',
			eMail: prospectDetail.email ? prospectDetail.email : '',
			viber: socialList.Viber ? socialList.Viber : '',
			whatsApp: socialList.WhatsApp ? socialList.WhatsApp : '',
			Twitter: socialList.Twitter ? socialList.Twitter : '',
			Facebook: socialList.Facebook ? socialList.Facebook : '',
			LinkedIn: socialList.LinkedIn ? socialList.LinkedIn : '',
			// Address Details
			mailAdd1: prospectDetail.address ? prospectDetail.address : '',
			mailAddPin: prospectDetail.zipCode ? prospectDetail.zipCode : '',
			mailCountry: prospectDetail.countryDataValue ? prospectDetail.countryDataValue : '',
			mailState: prospectDetail.stateDataValue ? prospectDetail.stateDataValue : '',
			mailCity: prospectDetail.cityDataValue ? prospectDetail.cityDataValue : '',
			// Source Details
			source: prospectDetail.source ? prospectDetail.source : '',
			sourceType: prospectDetail.sourceType ? prospectDetail.sourceType : '',
			sourceValue: prospectDetail.sourceValue ? prospectDetail.sourceValue : '',
			sourcedBy: prospectDetail.sourcedBy ? prospectDetail.sourcedBy : '',
			sourceOfFundsOth: null,
			// Relationship Manager's Details
			custRelMgr: prospectDetail.relationshipManagerDataValue
				? prospectDetail.relationshipManagerDataValue
				: '',
			bankAccbranch: prospectDetail.branchDataValue ? prospectDetail.branchDataValue : '',
			// Other Details
			remarks: prospectDetail.remark ? prospectDetail.remark : '',
			// Risk Profile Details
			isSecuritySuitability: true,
			// KYC Validation Details
			idType: prospectDetail.primaryId ? prospectDetail.primaryId : '',
			idNo: prospectDetail.primaryIdnumber ? prospectDetail.primaryIdnumber : '',
			idExpDate: prospectDetail.expiryDate ? moment(prospectDetail.expiryDate, 'YYYY-MM-DD') : '',
			riskCategory: prospectDetail.riskCategory ? prospectDetail.riskCategory : '',
			riskScore: prospectDetail.riskScore ? prospectDetail.riskScore : '',
			// Attachments
			attachments:
				Array.isArray(editAttachments) && editAttachments.length > 0 ? editAttachments : [],
			fileList: [],
			profileImageAttachment:
				editAttachments.length > 0
					? editAttachments.filter((item) => item.attachmentFor === 'Profile_Photo')[0]
					: undefined,
			prospectId: prospectDetail?.prospectId ? prospectDetail?.prospectId : ''

			// Risk Profile
			// riskProfileModel: riskProfileModel,
			// DocumentInfo: uploadedDocInfo?.lstDocumentInfo
		};
		Promise.all([
			getProspectRelationsApi(locationData?.data, 'PROSPECTADD'),
			getMiscellaneousDetailsForCustomer('PROSPECTADD', locationData?.data)
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
				miscellaneous: miscellaneousArray
			};
			setCustomerFormData(editCaptureData);
		});
		setCustomerFormData(editCaptureData);
		form.setFieldsValue(editCaptureData);
	};

	function formatCustomerDetailsResponse(
		customerDetails,
		miscellaneousData,
		attachmentData,
		relationDetailData
	) {
		let misc1 = [];
		if (miscellaneousData.data.miscellaneous.length > 0) {
			miscellaneousData.data.miscellaneous.map((data) => {
				misc1.push({ miscellaneous: data.fieldValue, type: data.fieldName });
			});
		}
		if (typeof customerDetails === 'object' && customerDetails !== null) {
			const { clientRequisition, socialList, riskProfileModel, uploadedDocInfo, bankDetails } =
				customerDetails;
			// console.log('line no 434-----', riskProfileModel);
			let newRelationDetailResult = [];
			if (relationDetailData?.length > 0) {
				relationDetailData?.map((item) => {
					let newRelationDetailObject = {};
					for (const prop in item) {
						newRelationDetailObject[`${prop}`] = item[prop];
					}
					if (newRelationDetailObject?.isCustomer === true) {
						newRelationDetailObject.relationNameID = newRelationDetailObject?.relationName;
						newRelationDetailObject.relationName = newRelationDetailObject?.name;
					}
					newRelationDetailObject.relationType = newRelationDetailObject?.relation;
					newRelationDetailObject.emailId = newRelationDetailObject?.email;
					newRelationDetailObject.contactNumber = newRelationDetailObject?.mobile;
					newRelationDetailResult.push(newRelationDetailObject);
				});
				clientRequisition.relationDetail = newRelationDetailResult;
			} else {
				clientRequisition.relationDetail = [];
			}
			// -----------------------------------------------------------------------------------------------

			if (clientRequisition?.profileImage) {
				// let stringVal = "data:image/png;base64,"+formData?.profileImage;
				let stringVal = 'data:image;base64,' + clientRequisition?.profileImage;
				let stringLength = stringVal?.length;
				let sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
				let sizeInKb = sizeInBytes / 1000;

				clientRequisition.profileImageString =
					'data:image;base64,' + clientRequisition?.profileImage;
				clientRequisition.profileImage = {
					refType: null,
					refId: null,
					fileDescription: 'Profile_Photo',
					fileName: '',
					fileSize: Math.floor(sizeInKb) + 'KB',
					mimeType: 'image',
					fileString: clientRequisition?.profileImage,
					attachmentFor: 'Profile_Photo',
					sessionId: ''
				};
			}

			if (
				clientRequisition?.mailAdd1 === clientRequisition?.permAdd1 &&
				clientRequisition?.mailCountry === clientRequisition?.permCountry &&
				clientRequisition?.mailstate === clientRequisition?.permanentState &&
				clientRequisition?.mailCity === clientRequisition?.permCity &&
				clientRequisition?.mailAddPin === clientRequisition?.permAddPin
			) {
				clientRequisition.disablePrermanentAddressField = true;
			} else {
				clientRequisition.disablePrermanentAddressField = false;
			}

			let obj = csObject[0]?.FamilyName?.lookupValue?.lookUpValues.find(
				(obj) => obj.name == clientRequisition.surName || obj.family == clientRequisition.surName
			);
			let familycode = obj?.family;
			let familyName = obj?.name;

			const newCustomerFormData = {
				...clientRequisition,
				category: clientRequisition?.legalStatus,
				dateOfBirth: clientRequisition?.dateOfBirth
					? moment(clientRequisition?.dateOfBirth, 'YYYY-MM-DD')
					: null,
				natureOfBusiness: clientRequisition?.natureofbusiness,
				residentialStatus: clientRequisition?.residentStatus,
				Amla: clientRequisition?.amla,
				InvestmentValue: clientRequisition?.investmentValue?.toString(),
				investmentValue: clientRequisition?.investmentValue?.toString(),
				sourceOfFund: clientRequisition?.sourceNetworth,
				Twitter: socialList?.Twitter,
				Facebook: socialList?.Facebook,
				LinkedIn: socialList?.LinkedIn,
				mailState: clientRequisition?.mailstate,
				mailingPreference: clientRequisition?.mailingPreference,
				compState: clientRequisition?.compState,
				riskProfileModel: riskProfileModel,
				DocumentInfo: uploadedDocInfo?.lstDocumentInfo,
				socialList: socialList,
				socials: [socialList?.WhatsApp ? 'WhatsApp' : '', socialList?.Viber ? 'Viber' : ''],
				whatsApp: socialList?.WhatsApp ? true : false,
				viber: socialList?.Viber ? true : false,
				bankDetails: bankDetails,
				event: 'M',
				clientId: clientRequisition?.clientId,
				otherIdNo: clientRequisition?.otherIdNo,
				isBlanketWaiver: clientRequisition?.isblanketWaiver,
				qib: clientRequisition?.qibName,
				clientRequisitionN: clientRequisition?.clientRequisitionN,
				action: locationData?.action,
				source: clientRequisition?.source,
				frequency: clientRequisition?.frequency,
				refType: locationData?.refType,
				// titleCondition:
				// 	clientRequisition?.title === 'MR' ? 'M' : clientRequisition?.title === 'MS' ? 'F' : 'A',
				// title:
				// 	clientRequisition?.title === 'MR'
				// 		? 'MR|M'
				// 		: clientRequisition?.title === 'MS'
				// 		? 'MS|F'
				// 		: `${clientRequisition?.title}|A`
				titleCondition: clientRequisition?.gender,
				title: clientRequisition?.title,
				physchlgdMinor: clientRequisition?.physchlgdMinor,
				cifDataOnEdit: clientRequisition?.otherIdNo ? true : false //if it is true we will not allowed to edit on edit screen
			};

			const newDocumentRequestObject1 = {
				data: {
					CustomerType: clientRequisition?.customerType || null,
					CustomerCategory: clientRequisition?.legalStatus || null,
					ResidentialStatus: clientRequisition?.residentStatus || null,
					RefID: locationData?.refID || '',
					RefType: locationData?.refType || '',
					IsSecuritySuitability: clientRequisition?.isSecuritySuitability,
					uploadedDocInfo: uploadedDocInfo?.lstDocumentInfo
				}
			};
			setDocumentRequestObject(newDocumentRequestObject1);
			setCustomerFormData({
				...newCustomerFormData,
				miscellaneous: misc1,
				attachments: attachmentData,
				surName: customerDetails?.clientRequisition?.surName
			});
			setAttachmentsModalDataArray(attachmentData);
			checkDocMandatory();
			checkRiskProfileMandatory();
			checkRiskProfileMandatoryRecord();
		}
	}

	const getExistingCustomerDetails = async () => {
		try {
			const response = await getCustomerDetails(locationData?.refID, locationData?.refType);
			const response1 = await getMiscellaneousDetailsForCustomer(
				locationData?.refType,
				locationData?.refID
			);
			const response2 = await getProspectRelationsApi(locationData?.refID, locationData?.refType);
			let response3;
			if (locationData?.refType === 'CLIENTADD') {
				response3 = await getAttachmentDetailsForCustomer('CLIENTADD', locationData?.refID);
			} else {
				response3 = await getAttachmentDetailApi(locationData?.refID);
			}
			formatCustomerDetailsResponse(response.data, response1, response3.data, response2.data);
		} catch (error) {
			console.error(error);
		}
	};

	const getCustomerDetailsFromProspect = () => {
		const customerData = locationData?.data;
		let formData = {
			customerType: customerData.prospectDetail.typeDataValue
				? customerData.prospectDetail.typeDataValue
				: null,
			title: customerData.prospectDetail.salutation ? customerData.prospectDetail.salutation : null,
			titleCondition: customerData?.prospectDetail?.genderDataValue
				? customerData?.prospectDetail?.genderDataValue
				: null,
			firstName: customerData.prospectDetail.firstName
				? customerData.prospectDetail.firstName
				: null,
			secondName: customerData.prospectDetail.middleName
				? customerData.prospectDetail.middleName
				: null,
			thirdName: customerData.prospectDetail.lastName ? customerData.prospectDetail.lastName : null,
			nationality: customerData.prospectDetail.nationality
				? customerData.prospectDetail.nationality
				: null,
			category: customerData.prospectDetail.category ? customerData.prospectDetail.category : null,
			dateOfBirth: customerData.prospectDetail.dateofBirthCorp
				? moment(customerData.prospectDetail.dateofBirthCorp, 'YYYY-MM-DD')
				: null,
			gender: customerData.prospectDetail.genderDataValue
				? customerData.prospectDetail.genderDataValue
				: null,
			referenceName: customerData.prospectDetail.referenceName
				? customerData.prospectDetail.referenceName
				: null,
			dialCode: customerData.prospectDetail.dialCode ? customerData.prospectDetail.dialCode : null,
			mobileNo: customerData.prospectDetail.mobile ? customerData.prospectDetail.mobile : null,
			eMail: customerData.prospectDetail.email ? customerData.prospectDetail.email : null,
			mailAdd1: customerData.prospectDetail.address ? customerData.prospectDetail.address : null,
			mailAddPin: customerData.prospectDetail.zipCode ? customerData.prospectDetail.zipCode : null,
			mailCountry: customerData.prospectDetail.countryDataValue
				? customerData.prospectDetail.countryDataValue
				: null,
			prospectId: customerData.prospectDetail.prospectId
				? customerData.prospectDetail.prospectId
				: null,
			// frequency:customerData.prospectDetail.frequency ? customerData.prospectDetail.frequency : null,
			source: customerData.prospectDetail.source ? customerData.prospectDetail.source : null,
			sourcedBy: customerData.prospectDetail.sourcedBy
				? customerData.prospectDetail.sourcedBy
				: null,
			custRelMgr: customerData.prospectDetail.relationshipManagerDataValue
				? customerData.prospectDetail.relationshipManagerDataValue
				: null,
			bankAccbranch: customerData.prospectDetail.branchDataValue
				? customerData.prospectDetail.branchDataValue
				: null,
			Twitter: customerData.socialList.Twitter ? customerData.socialList.Twitter : null,
			Facebook: customerData.socialList.Facebook ? customerData.socialList.Facebook : null,
			LinkedIn: customerData.socialList.LinkedIn ? customerData.socialList.LinkedIn : null
		};
		setCustomerFormData(formData);
	};

	let rules = [];
	let csObject = [];
	cs &&
		cs !== '' &&
		cs.length > 0 &&
		cs.forEach((s, index) => {
			rules[index] = createValidators(s.controlStructureField, form);
			csObject[index] = generateCsObject(s.controlStructureField);
		});

	const getExistingAttachments = () => {
		if (locationData?.screen === 'view') {
			if (
				locationData?.data &&
				locationData?.data.attachments &&
				Array.isArray(locationData?.data.attachments)
			)
				return locationData?.data.attachments;
		}
		return [];
	};

	const checkValidations = () => {
		// console.log('check riskprofile validation-------', riskProfileRequiredField);
		setCustomerFormData({ ...customerFormData, callCifValidator: false });
		// if(documentRequiredField.required){
		//   setDocumentRequiredField({...documentRequiredField,showAlertMessage:true});
		//   form.validateFields().then(()=>{}).catch((err)=>{setRequiredFiled(true)})
		// }
		if (
			documentRequiredField.required ||
			relationDetailCount.checkCount ||
			riskProfileRequiredField.required ||
			cifIconClickedRequired.cifIconClickedReq ||
			cifIconClickedRequired.errorMessage
		) {
			// if(documentRequiredField.required && relationDetailCount.checkCount && riskProfileRequiredField.required){
			//   setDocumentRequiredField({...documentRequiredField,showAlertMessage:true});
			//   setRelationDetailCount ({...relationDetailCount,showRealtionAlertMessage:true});
			//   setRiskProfileRequiredField ({...relationDetailCount,showRiskProfileAlertMessage:true});
			//   form.validateFields().then(()=>{}).catch((err)=>{setRequiredFiled(true)})
			// }
			// else if(documentRequiredField.required){
			//   setDocumentRequiredField({...documentRequiredField,showAlertMessage:true});
			//   form.validateFields().then(()=>{}).catch((err)=>{setRequiredFiled(true)})
			// }
			// else if(relationDetailCount.checkCount){
			//   setRelationDetailCount ({...relationDetailCount,showRealtionAlertMessage:true});
			//   form.validateFields().then(()=>{}).catch((err)=>{setRequiredFiled(true)})
			// }
			if (cifIconClickedRequired.errorMessage && !cifIconClickedRequired.cifIconClickedReq) {
				// alert('qqq');
				setRequiredFiled(true);
				form
					.validateFields()
					.then(() => {})
					.catch((err) => {
						setRequiredFiled(true);
					});
			}
			if (cifIconClickedRequired.cifIconClickedReq) {
				setCifIconClickedRequired({ ...cifIconClickedRequired, showCifIconAlertMessage: true });
				form
					.validateFields()
					.then(() => {})
					.catch((err) => {
						setRequiredFiled(true);
					});
			}
			if (documentRequiredField.required) {
				setDocumentRequiredField({ ...documentRequiredField, showAlertMessage: true });
				form
					.validateFields()
					.then(() => {})
					.catch((err) => {
						setRequiredFiled(true);
					});
			}
			if (riskProfileRequiredField.required) {
				// setRiskProfileRequiredField({
				// 	...riskProfileRequiredField,
				// 	showRiskProfileAlertMessage: true
				// });
				// form
				// 	.validateFields()
				// 	.then(() => {})
				// 	.catch((err) => {
				// 		setRequiredFiled(true);
				// 	});

				// ------------------------------------------
				if (
					customerFormData?.riskProfileModel &&
					Object.keys(customerFormData?.riskProfileModel).length > 0
				) {
					setRiskProfileRequiredField({ required: false, showRiskProfileAlertMessage: false });
					form
						.validateFields()
						.then(() => {})
						.catch((err) => {
							setRequiredFiled(false);
						});
				} else {
					setRiskProfileRequiredField({ required: true, showRiskProfileAlertMessage: true });
					form
						.validateFields()
						.then(() => {})
						.catch((err) => {
							setRequiredFiled(true);
						});
				}
				// --------------------------------------------
			}
			if (relationDetailCount.checkCount) {
				setRelationDetailCount({ ...relationDetailCount, showRealtionAlertMessage: true });
				form
					.validateFields()
					.then(() => {})
					.catch((err) => {
						setRequiredFiled(true);
					});
			}

			// if (
			// 	customerFormData?.category === '1' &&
			// 	(user?.userRole === 'BU' || user?.userRole === 'RBSMKR')
			// ) {
			// 	if (
			// 		customerFormData?.riskProfileModel &&
			// 		Object.keys(customerFormData?.riskProfileModel).length > 0
			// 	) {
			// 		setRiskProfileRequiredField({ required: false, showRiskProfileAlertMessage: false });
			// 		form
			// 			.validateFields()
			// 			.then(() => {})
			// 			.catch((err) => {
			// 				setRequiredFiled(false);
			// 			});
			// 	} else {
			// 		setRiskProfileRequiredField({ required: true, showRiskProfileAlertMessage: true });
			// 		form
			// 			.validateFields()
			// 			.then(() => {})
			// 			.catch((err) => {
			// 				setRequiredFiled(true);
			// 			});
			// 	}
			// }
			// if (
			// 	customerFormData?.category === '2' &&
			// 	(user?.userRole === 'RM' || user?.userRole === 'WMGMKO')
			// ) {
			// 	if (
			// 		customerFormData?.riskProfileModel &&
			// 		Object.keys(customerFormData?.riskProfileModel).length > 0
			// 	) {
			// 		setRiskProfileRequiredField({ required: false, showRiskProfileAlertMessage: false });
			// 		form
			// 			.validateFields()
			// 			.then(() => {})
			// 			.catch((err) => {
			// 				setRequiredFiled(false);
			// 			});
			// 	} else {
			// 		setRiskProfileRequiredField({ required: true, showRiskProfileAlertMessage: true });
			// 		form
			// 			.validateFields()
			// 			.then(() => {})
			// 			.catch((err) => {
			// 				setRequiredFiled(true);
			// 			});
			// 	}
			// }
		} else {
			setRequiredFiled(false);
			handleFormSubmit();
		}
	};

	const handleFormSubmit = () => {
		setLoading(true);
		form
			.validateFields()
			.then((res) => {
				postCustomerApi(customerFormData)
					.then((res) => {
						if (res.data.success) {
							setShowSuccessModal(true);
							setLoading(false);
						} else {
							setErrorArray([
								{
									message: res.data.message
								}
							]);
							setShowFailModal(true);
							setLoading(false);
						}
					})
					.catch((err) => {
						console.error(err);
						setLoading(false);
					});
			})
			.catch((err) => {
				// console.log('all record error message---------', err);
				setRequiredFiled(true);
				setLoading(false);
				if (documentRequiredField.required) {
				}
			});
	};

	const [docRequestObject, setDocRequestObject] = useState({});
	useEffect(() => {
		const newDocumentRequestObject = {
			data: {
				CustomerType: customerFormData?.customerType || null,
				CustomerCategory: customerFormData?.category || null,
				ResidentialStatus: customerFormData?.residentialStatus || null,
				RefID: locationData?.refID || '',
				RefType: locationData?.refType || '',
				IsSecuritySuitability: customerFormData?.isSecuritySuitability,
				IsClientEdit:
					locationData?.refType === 'CLIENTADD' && locationData?.action === 'edit' ? true : false
			}
		};
		setDocumentRequestObject(newDocumentRequestObject);
	}, [docRequestObject]);

	useEffect(() => {
		const newDocumentRequestObject = {
			data: {
				CustomerType: cifRespData?.customerType || null,
				CustomerCategory: cifRespData?.category || null,
				ResidentialStatus: cifRespData?.residentialStatus || null,
				RefID: locationData?.refID || '',
				RefType: locationData?.refType || '',
				IsSecuritySuitability: cifRespData?.isSecuritySuitability,
				IsClientEdit:
					locationData?.refType === 'CLIENTADD' && locationData?.action === 'edit' ? true : false
			}
		};
		setDocumentRequestObject(newDocumentRequestObject);
	}, [cifRespData]);
	useEffect(() => {
		setCustomerFormData({ ...customerFormData, DocumentInfo: editDocument });
	}, [editDocument]);

	const handleCustomerFormChange = (values) => {
		if (values.socialList) {
			values = { ...values, ...values.socialList };
		}
		if (!values.DocumentInfo) {
			setCustomerFormData({ ...customerFormData, ...values });
		}
		if (values.DocumentInfo) {
			setEditDocument(values.DocumentInfo);
		}
		// setCustomerFormData({ ...customerFormData, ...values });

		if (values.profileImage) {
			let pImg = values.profileImage;
			pImg.file &&
				pImg.file.originFileObj &&
				getBase64(pImg.file.originFileObj, (imageUrl) => {
					setCustomerFormData({
						...customerFormData,
						// ...values,
						profileImageString: imageUrl,
						// profileImageAttachment: {
						profileImage: {
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

	const removeAttachment = (fileName) => {
		if (Array.isArray(filenames)) {
			setFilenames(filenames.filter((item) => item.fileName !== fileName));
		}
	};

	const handleFailModalOkOrCancel = () => {
		setShowFailModal(false);
	};

	const getQuestionAnswer = async () => {
		try {
			const response = await getQuestionAnswerList(customerFormData, 'CUSTOMER');
			// handleCustomerFormChange({ riskProfileModel: {} });
			if (response?.data?.lstQuestionsAnswers?.length > 0) {
				// console.log('line no ------878');
				setRiskProfileRequiredField({
					...riskProfileRequiredField,
					required: true
				});
			} else {
				// console.log('line no ------884');
				setRiskProfileRequiredField({
					...riskProfileRequiredField,
					required: false
				});
			}
			setRiskProfileQA(response.data);
		} catch (error) {}
	};

	const onAlertClose = () => {
		setRequiredFiled(false);
		setDocumentRequiredField({ ...documentRequiredField, showAlertMessage: false });
		setRelationDetailCount({ ...relationDetailCount, showRealtionAlertMessage: false });
		setCifIconClickedRequired({ ...cifIconClickedRequired, showCifIconAlertMessage: false });
		setRiskProfileRequiredField({
			...riskProfileRequiredField,
			showRiskProfileAlertMessage: false
		});
	};

	const [documentRequestObject, setDocumentRequestObject] = useState({});

	const handleOppFormChange = (values) => {
		if (!values.attachments) {
			setAttachmentsModalDataArray({
				...attachmentsModalDataArray,
				...values
			});
		}
		if (values.attachments && values.attachments.length > 0) {
			let attachmentsModalData = [];
			values.attachments.map((file) => {
				attachmentsModalData = [
					...attachmentsModalData,
					{
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
					}
				];
			});
			let finalAttachmentsModalData = [...attachmentsModalDataArray];
			// ----------------used for delete operation-----------------------
			if (values?.operation && values?.operation === 'delete') {
				finalAttachmentsModalData = [];
			}
			// ----------------used for delete operation-----------------------
			attachmentsModalData.forEach((file) => {
				finalAttachmentsModalData = [...finalAttachmentsModalData, file];
			});
			setAttachmentsModalDataArray(finalAttachmentsModalData);
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
		// ----------------used for delete operation-----------------------
	};

	const onIsSecuritySuitabilityHandler = (val) => {
		setDocRequestObject({ ...docRequestObject, isSecuritySuitability: val });
		setCustomerFormData({ ...customerFormData, isSecuritySuitability: val });
	};

	const handleArrow = () => {
		history.push('/dashboard/MyCustomer/Onboarding');
	};

	const componentRefInd = useRef();
	const componentRefCorp = useRef();
	const handlePrintInd = useReactToPrint({
		content: () => componentRefInd.current
	});
	const handlePrintCorp = useReactToPrint({
		content: () => componentRefCorp.current
	});

	const screenText = () => {
		if (locationData?.mode === 'edit') {
			return 'Create Client';
		}
		if (locationData?.action === 'edit') {
			return 'Edit Client';
		}
		return 'Create Client';
	};

	return (
		<div className='customer-create-container'>
			<Modal
				visible={showSuccessModal}
				closable={false}
				footer={[
					<Button
						onClick={() => {
							setShowSuccessModal(false);
							history.push('/dashboard/MyCustomer/Onboarding');
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
				onOk={handleFailModalOkOrCancel}
				onCancel={handleFailModalOkOrCancel}
				errorArray={errorArray}
			/>

			<DashboardScreenTopbar
				// screenText={"Create Customer"}
				screenText={screenText()}
				breadCrumb='My Client'
				cancelBtnText='Cancel'
				submitBtnText='Save'
				// onSubmit={handleFormSubmit}
				onSubmit={checkValidations}
				onArrowclick={handleArrow}
				loading={loading}
				handlePrintInd={handlePrintInd}
				handlePrintCorp={handlePrintCorp}
				componentRefInd={componentRefInd}
				componentRefCorp={componentRefCorp}
				customerType={customerFormData.customerType}
				onCancel={() => {
					history.push('/dashboard/MyCustomer/Onboarding');
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
			{cifIconClickedRequired.showCifIconAlertMessage ? (
				<Alert
					message='Error'
					description={'Please click on fetch CIF detail icon'}
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

			{relationDetailCount.showRealtionAlertMessage ? (
				<Alert
					message='Error'
					description={'Please add at least ONE Relation Detail for minor'}
					type='error'
					closable
					onClose={setTimeout(() => {
						onAlertClose();
					}, 5000)}
				/>
			) : (
				''
			)}

			{riskProfileRequiredField.showRiskProfileAlertMessage ? (
				<Alert
					message='Error'
					description={'Risk Profile is required'}
					type='error'
					closable
					onClose={setTimeout(() => {
						onAlertClose();
					}, 5000)}
				/>
			) : (
				''
			)}

			<Space direction='vertical' size={16} className='parent-form-container'>
				<CustomerType
					form={form}
					formData={customerFormData}
					onValuesChange={handleCustomerFormChange}
					rules={rules.length > 0 ? rules[0] : undefined}
					csObject={csObject[0]}
					action={locationData?.action}
					refType={locationData?.refType}
					setCustomerFormData={setCustomerFormData}
					setCifRespData={setCifRespData}
					cifRespData={cifRespData}
					setCifIconClickedRequired={setCifIconClickedRequired}
					cifIconClickedRequired={cifIconClickedRequired}
				/>
				<PersonalDetails
					form={form}
					formData={customerFormData}
					onValuesChange={handleCustomerFormChange}
					rules={rules.length > 0 ? rules[0] : undefined}
					csObject={csObject[0]}
					setRelationDetailCount={setRelationDetailCount}
					relationDetailCount={relationDetailCount}
					action={locationData?.action}
					cifRespData={cifRespData}
					setCifIconClickedRequired={setCifIconClickedRequired}
					setDocRequestObject={setDocRequestObject}
					docRequestObject={docRequestObject}
				/>
				<ContactDetails
					form={form}
					formData={customerFormData}
					onValuesChange={handleCustomerFormChange}
					rules={rules.length > 0 ? { ...rules[0], ...rules[1] } : undefined}
					csObject={{ ...csObject[0], ...csObject[1] }}
					action={locationData?.action}
					cifRespData={cifRespData}
				/>
				<AddressDetails
					form={form}
					formData={customerFormData}
					onValuesChange={handleCustomerFormChange}
					rules={rules.length > 0 ? rules[0] : undefined}
					csObject={csObject[0]}
					action={locationData?.action}
					mode={locationData?.mode}
					cifRespData={cifRespData}
				/>
				<CustomerMailingInstruction
					form={form}
					formData={customerFormData}
					rules={rules?.length > 0 ? rules[0] : undefined}
					csObject={csObject[0]}
					onValuesChange={handleCustomerFormChange}
					action={locationData?.action}
					cifRespData={cifRespData}
				/>

				{customerFormData?.customerType === 'I' &&
					cs &&
					cs.filter((item) => item.sectionName === 'Grid_Relation') &&
					cs.filter((item) => item.sectionName === 'Grid_Relation').length > 0 &&
					cs.filter((item) => item.sectionName === 'Grid_Relation')[0] && (
						<RelationDetailsFormCard
							form={form}
							formModal={formModal}
							formData={customerFormData}
							onValuesChange={handleCustomerFormChange}
							rules={rules.length > 0 ? rules[5] : undefined}
							cs={cs}
							csObject={csObject}
							countryCode={cs[0]?.controlStructureField[20]?.lookupValue?.lookUpValues}
							relationFormFrom={'customerCreate'}
							// allProspectRelationData={allProspectRelationData}
						/>
					)}
				<SourceDetails
					form={form}
					formData={customerFormData}
					onValuesChange={handleCustomerFormChange}
					rules={rules.length > 0 ? rules[0] : undefined}
					csObject={csObject[0]}
					action={locationData?.action}
					screen={locationData?.screen}
					mode={locationData?.mode}
					cifRespData={cifRespData}
				/>

				<OtherDetails
					form={form}
					formData={customerFormData}
					onValuesChange={handleCustomerFormChange}
					rules={rules.length > 0 ? rules[0] : undefined}
					csObject={csObject[0]}
					refType={locationData?.refType}
					minInvestmentValue={minInvestmentValue}
					cifRespData={cifRespData}
					action={locationData?.action}
				/>
				<RelationshipManagerDetails
					form={form}
					formData={customerFormData}
					user={user}
					onValuesChange={handleCustomerFormChange}
					rules={rules.length > 0 ? rules[0] : undefined}
					csObject={csObject[0]}
					cifRespData={cifRespData}
					action={locationData?.action}
				/>
				<RiskProfileFormCard
					form={form}
					formData={customerFormData}
					onValuesChange={handleCustomerFormChange}
					rules={rules.length > 0 ? rules[0] : undefined}
					csObject={csObject[0]}
					questionAnswer={riskProfileQA}
					action={locationData?.action}
					screen={'customerCreate'}
					// setIsSecuritySuitability={setIsSecuritySuitability}
					onIsSecuritySuitabilityHandler={onIsSecuritySuitabilityHandler}
					cifRespData={cifRespData}
					setRiskProfileRequiredField={setRiskProfileRequiredField}
				/>
				<KycValidationDetails
					form={form}
					formData={customerFormData}
					onValuesChange={handleCustomerFormChange}
					rules={rules.length > 0 ? rules[0] : undefined}
					csObject={csObject[0]}
					cifRespData={cifRespData}
				/>

				<AttachmentUploadModal
					selectedAccount={{ scheme: locationData?.refID, refType: 'CLIENTREQADD' }}
					// selectedAccount={{  refType: locationData?.refType,scheme: locationData?.refID, }}
					isUpload={false}
					type='CLIENTREQADD'
					onValuesChange={handleOppFormChange}
					data={attachmentsModalDataArray}
				/>
				<DocumentsDetail
					form={form}
					formData={customerFormData}
					onValuesChange={handleCustomerFormChange}
					rules={rules.length > 0 ? rules[0] : undefined}
					removeAttachment={removeAttachment}
					csObject={csObject[4]}
					action={locationData?.action}
					documentRequestObject={documentRequestObject}
					setDocumentRequiredField={setDocumentRequiredField}
					documentRequiredField={documentRequiredField}
					checkDocMandatory={checkDocMandatory}
					type='CLIENTREQADD'
				/>
				<MiscellaneousFormCard
					form={form}
					formData={customerFormData}
					onValuesChange={handleCustomerFormChange}
					rules={rules.length > 0 ? rules[0] : undefined}
					csObject={csObject[2]}
					id={locationData?.customerId}
					action={locationData?.action}
					refID={locationData?.refID}
					progName='CLIENTREQADD'
					screenName='customer'
				/>
			</Space>
			<BackToTop />
			<div style={{ display: 'none' }}>
				<ComponentToPrint ref={componentRefInd} />
			</div>
			<div style={{ display: 'none' }}>
				<ComponentToPrint ref={componentRefCorp} />
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		cs: state.customerCreate.controlStructure,
		user: state.auth.user,
		minInvestmentValue: state?.common?.config?.[15]?.value1
		// allAttachmentData:
		//   (state.customerView && state.customerView.customerAttachmentsDetail) ||
		//   [],
		// allProspectRelationData: state.customerView.prospectRelation,
	};
};

const mapDispatchToProps = {
	executeGetCustomerCreateCs,
	setCreateCustomerData
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerCreateScreen);
