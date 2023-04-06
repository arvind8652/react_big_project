// built in imports
import React, { useState, useEffect } from 'react';

// internal imports
import DashboardScreenTopbar from '../../components/DashboardScreenTopbar/DashboardScreenTopbar';
import CreateClientDetailsFormCard from '../../components/Forms/CreateClientDetailsFormCard/CreateClientDetailsFormCard';
import AccountDetailsFormCard from '../../components/Forms/AccountDetailsFormCard/AccountDetailsFormCard';
import AdditionalDetailsFormCard from '../../components/Forms/AdditionalDetailsFormCard/AdditionalDetailsFormCard';
import AccountOtherDetailsFormCard from '../../components/Forms/AccountOtherDetailsFormCard/AccountOtherDetailsFormCard';
// import AttachmentsFormCard from "../../components/Forms/CustomerAttachmentsFormCard/CustomerAttachmentsFormCard";
import AttachmentUploadModal from '../../components/AttachmentPannel/AttachmentUploadModal';
import BankDetailsFormCard from '../../components/Forms/BankDetailsFormCard/BankDetailsFormCard';
import AccountSecurityAccountsFormCard from '../../components/Forms/AccountSecurityAccountsFormCard/AccountSecurityAccountsFormCard';
import DocumentsDetailFormCard from '../../components/Forms/CustomerDocumentsDetailFormCard/CustomerDocumentsDetailFormCard';
import MiscellaneousFormCard from '../../components/Forms/MiscellaneousFormCard/MiscellaneousFormCard';
import RiskProfileFormCard from '../../components/Forms/RiskProfileFormCard/RiskProfileFormCard';
import {
	executeGetAccountCreateCs,
	executeGetAccountDetails,
	executePostAccount,
	executeGetProfileAccountDetails
} from '../../redux/actions/accountCreateActions';
import { connect } from 'react-redux';
import { CONSTANTS } from '../../constants/constants';

// external imports
import { Button, Form, Space, Alert, message } from 'antd';

// styles
import './AccountCreateScreen.scss';
import '../../antd-override.scss';

import { createValidators, generateCsObject } from '../../utils/utils';

import { getQA } from '../../api/accountCreateApi';
import Modal from 'antd/lib/modal/Modal';
import { useHistory, useLocation } from 'react-router-dom';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import FailModal from '../../components/Modal/FailModal/FailModal';
import BackToTop from '../../components/BackToTop/BackToTop';
import AccountMailingInstruction from '../../components/Forms/AccountMailingInstructions/AccountMailingInstruction';
import DocumentsDetail from '../../components/Forms/CustomerDocumentsDetailFormCard/CustomerDocumentsDetailFormCard';
import { setCreateCustomerData } from '../../redux/actions/customerCreateActions';

const AccountCreateScreen = ({
	cs,
	accountDetails,
	user,
	profileAccountDetails,
	setCreateCustomerData
}) => {
	const { useForm } = Form;

	const [form] = useForm();

	// states
	const [accountFormData, setAccountFormData] = useState({
		isSecuritySuitability: true,
		name: null,
		holdingAccount: []
	});
	const [selectedAccount, setSelectedAccount] = useState({});
	const [attachmentsModalDataArray, setAttachmentsModalDataArray] = useState([]);
	const [userNameDropDownlist, setUserNameDropDownlist] = useState([]);
	const [filenames, setFilenames] = useState([]);
	const [riskProfileQA, setRiskProfileQA] = useState();
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showFailModal, setShowFailModal] = useState(false);
	const [errorArray, setErrorArray] = useState([]);
	const [requiredFiled, setRequiredFiled] = useState(false);
	const [accessData, setAccessData] = useState([]);
	const [customerType, setCustomerType] = useState(null);
	const [clientId, setCustomerId] = useState(null);
	const [isGetAccountDetailsApiCompleted, setIsGetAccountDetailsApiCompleted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [clientCategory, setClientCategory] = useState(null);

	const [reportCurrAndCurrValidate, setReportCurrAndCurrValidate] = useState(false);

	// const [isSecuritySuitability,setIsSecuritySuitability] = useState(true);

	// --------------------------------start for bank detail validation------------------------
	const [bankDetailValidation, setBankDetailValidation] = useState({
		required: false,
		showBankDetailAlertMessage: false
	});
	// --------------------------------end for bank detail validation------------------------

	// ----------------------------start for document detail validation-------------------------
	const [documentRequiredField, setDocumentRequiredField] = useState({
		mandatoryCount: 0,
		required: false,
		showAlertMessage: false
	});
	// ----------------------------end for document detail validation-------------------------
	// --------------------------------start for risk profile validation------------------------
	const [riskProfileRequiredField, setRiskProfileRequiredField] = useState({
		required: false,
		showRiskProfileAlertMessage: false
	});
	// --------------------------------end for risk profile validation------------------------
	// --------------------------------start for Joint Holder Detail validation------------------------
	const [jointHolderDetailRequiredField, setJointHolderDetailRequiredField] = useState({
		required: false,
		showJointHolderDetailAlertMessage: false
	});
	// --------------------------------end for Joint Holder Detail validation------------------------

	let rules = [];
	let csObject = [];
	let customerId;
	const history = useHistory();
	const location = useLocation();

	const refID = location?.state?.refID;
	const refType = location?.state?.refType || 'ACCOUNTREQADD';
	const action = location?.state?.action;

	// ----------------------------start for document detail validation-------------------------

	const checkDocMandatory = () => {
		if (Array.isArray(accountFormData?.DocumentInfo) && accountFormData?.DocumentInfo?.length > 0) {
			let countVal = 0;
			accountFormData?.DocumentInfo.map((_) => {
				if (_.docmandatory === 'Y') {
					countVal += 1;
				}
			});
			// if (countVal === documentRequiredField.mandatoryCount) {
			if (countVal >= documentRequiredField.mandatoryCount) {
				setDocumentRequiredField({ ...documentRequiredField, required: false });
			}
		}
		// else {
		//   setDocumentRequiredField({ ...documentRequiredField, required: true });

		// }
	};
	useEffect(() => {
		if (accountFormData?.DocumentInfo?.length > 0) {
			checkDocMandatory();
		}
	}, [accountFormData?.DocumentInfo]);
	// ----------------------------end for document detail validation-------------------------

	// --------------------------------start for Joint Holder Detail validation------------------------
	useEffect(() => {
		if (
			accountFormData?.holdingPattern === 'JOINT' &&
			accountFormData?.holdingAccount &&
			Object?.keys(accountFormData?.holdingAccount)?.length === 0 &&
			accountFormData?.name !== null
		) {
			setJointHolderDetailRequiredField({ ...jointHolderDetailRequiredField, required: true });
		} else {
			setJointHolderDetailRequiredField({ ...jointHolderDetailRequiredField, required: false });
		}
		if (accountFormData?.holdingAccount?.length > 0) {
			accountFormData?.holdingAccount?.map((_) => {
				if (_?.modeOfOperation !== 'ITF') {
					localStorage?.setItem('modeOp', _?.modeOfOperation);
				}
			});
		}
	}, [accountFormData?.holdingPattern, accountFormData?.name, accountFormData?.holdingAccount]);
	// --------------------------------end for Joint Holder Detail validation------------------------

	useEffect(() => {
		const clientData = userNameDropDownlist.find((item) => {
			return item.CustomerID === accountFormData.name;
		});
		setCreateCustomerData({ ...accountFormData, accType: 'ACCOUNT', ...clientData });
	}, [accountFormData]);

	useEffect(() => {
		executeGetAccountCreateCs();
		if (action === 'edit' || action === 'copy') {
			executeGetAccountDetails(refID);
		} else if (action === 'profileEdit' || action === 'profileCopy') {
			executeGetProfileAccountDetails(refID);
		}
		// else {
		// 	executeGetAccountCreateCs();
		// }
	}, []);

	const handleCustomerType = (value) => {
		setCustomerType(value);
	};

	const handleCustomerId = (value) => {
		setCustomerId(value);
	};
	cs?.csList?.forEach((item, idx) => {
		rules[idx] = createValidators(item.controlStructureField, form);
		csObject[idx] = generateCsObject(item.controlStructureField);
	});

	// useEffect(() => {
	// 	executeGetAccountCreateCs();
	// }, []);

	// --------------------------------start for risk profile validation------------------------
	// useEffect(()=>{
	//   checkRiskProfileMandatoryRecord();
	// },[accountFormData?.riskProfileModel])

	// const checkRiskProfileMandatoryRecord= () =>{
	//   if(accountFormData?.riskProfileModel && Object?.keys(accountFormData?.riskProfileModel).length > 0){
	//     setRiskProfileRequiredField({...riskProfileRequiredField,required:false})
	//   }
	// }
	// --------------------------------end for risk profile validation------------------------

	const handleAccountFormChange = (values) => {
		// console.log('values----------', values);
		if (values?.holdingPattern) {
			form.setFieldsValue({ ...accountFormData, ...values });
		}
		if (typeof values === 'object' && 'type' in values) {
			setAccountFormData({ ...accountFormData, ...values, ['classification']: null });
			form.setFieldsValue({ classification: null });
		} else if (typeof values === 'object' && 'reportingCurrency' in values) {
			setAccountFormData({ ...accountFormData, ...values });
			// setBankDetailValidation({
			// 	required: false,
			// 	showBankDetailAlertMessage: false
			// });
			// checkReportCurrWithDefaultCurr(accountFormData?.bankDetails, Object?.values(values)[0]);
		} else {
			setAccountFormData({ ...accountFormData, ...values });
		}
	};

	const removeAttachment = (fileName) => {
		if (Array.isArray(filenames)) {
			setFilenames(filenames.filter((item) => item.fileName !== fileName));
		}
	};

	//--------------------------start risk profile validation ----------------------------
	const checkRiskProfileMandatory = () => {
		if (clientCategory === '1') {
			setRiskProfileRequiredField({ ...riskProfileRequiredField, required: true });
		} else if (
			clientCategory === '2' &&
			(accountFormData?.type === 'PT' || accountFormData?.type === 'PS')
		) {
			setRiskProfileRequiredField({ ...riskProfileRequiredField, required: true });
		} else {
			setRiskProfileRequiredField({ required: false, showRiskProfileAlertMessage: false });
		}
	};

	useEffect(() => {
		checkRiskProfileMandatory();
	}, [accountFormData?.name, accountFormData?.type]);

	//---------------------------------------- end of risk profile --------------------------------

	// checking Reporting Currency and default bank detail currency should be same
	useEffect(() => {
		// console.log('check bank detial-----', accountFormData?.bankDetails);
		if (accountFormData?.bankDetails?.length > 0 && accountFormData?.reportingCurrency) {
			let requiredFinalVal = false;
			accountFormData?.bankDetails?.map((obj) => {
				if (obj?.defaultYN === 'Y' || obj?.defaultYN === true) {
					// console.log('line no------266');
					if (
						obj?.currency &&
						accountFormData?.reportingCurrency &&
						obj?.currency != accountFormData?.reportingCurrency
					) {
						// console.log('line no------272');
						// message.error('Reporting currency and default Bank Details currency should be same', 5);
						requiredFinalVal = true;
					}
				}
			});
			setReportCurrAndCurrValidate(requiredFinalVal);
			if (requiredFinalVal) {
				// console.log('line no----279', requiredFinalVal);
				// setBankDetailValidation({ ...bankDetailValidation, required: true }); //---for testing purpose commented this line
				setBankDetailValidation({ ...bankDetailValidation, required: false }); //---for testing purpose added this line
			} else {
				// console.log('line no----282', requiredFinalVal);
				setBankDetailValidation({ ...bankDetailValidation, required: false });
			}
		}
	}, [accountFormData?.reportingCurrency, accountFormData?.bankDetails]);

	const checkValidations = () => {
		// if (documentRequiredField.required || riskProfileRequiredField.required) {
		// console.log('bank validation--------', bankDetailValidation);
		if (
			documentRequiredField.required ||
			riskProfileRequiredField.required ||
			jointHolderDetailRequiredField.required ||
			bankDetailValidation.required
		) {
			if (clientCategory === '1') {
				if (
					accountFormData?.riskProfileModel &&
					Object.keys(accountFormData?.riskProfileModel).length > 0
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
			}
			if (
				clientCategory === '2' &&
				(accountFormData?.type === 'PT' || accountFormData?.type === 'PS')
			) {
				if (
					accountFormData?.riskProfileModel &&
					Object.keys(accountFormData?.riskProfileModel).length > 0
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
			if (bankDetailValidation.required) {
				setBankDetailValidation({
					// ...bankDetailValidation,
					required: reportCurrAndCurrValidate,
					showBankDetailAlertMessage: reportCurrAndCurrValidate
				});
				// reportCurrAndCurrValidate

				// -------------------------------------------------------
				// if (accountFormData?.bankDetails?.length > 0 && accountFormData?.reportingCurrency) {
				// 	let requiredFinalVal1 = false;
				// 	accountFormData?.bankDetails?.map((obj) => {
				// 		if (obj?.defaultYN === 'Y' || obj?.defaultYN === true) {
				// 			console.log('line no--//----266');
				// 			if (
				// 				obj?.currency &&
				// 				accountFormData?.reportingCurrency &&
				// 				obj?.currency != accountFormData?.reportingCurrency
				// 			) {
				// 				console.log('line no-//-----272');
				// 				// message.error('Reporting currency and default Bank Details currency should be same', 5);
				// 				requiredFinalVal1 = true;
				// 			}
				// 		}
				// 	});
				// 	if (requiredFinalVal1) {
				// 		console.log('line no--//--279', requiredFinalVal);
				// 		setBankDetailValidation({ showBankDetailAlertMessage: true, required: true });
				// 	} else {
				// 		console.log('line no--//--282', requiredFinalVal);
				// 		setBankDetailValidation({ showBankDetailAlertMessage: false, required: false });
				// 	}
				// }
				// ------------------------------------------------------
				form
					.validateFields()
					.then(() => {})
					.catch((err) => {
						setRequiredFiled(true);
					});
			}
			if (jointHolderDetailRequiredField.required) {
				// if (
				// 	accountFormData?.holdingPattern === 'JOINT' &&
				// 	Object?.keys(accountFormData?.holdingAccount)?.length === 0 &&
				// 	accountFormData?.name !== null
				// ) {
				setJointHolderDetailRequiredField({
					...jointHolderDetailRequiredField,
					showJointHolderDetailAlertMessage: true
				});
				form
					.validateFields()
					.then(() => {})
					.catch((err) => {
						setRequiredFiled(true);
					});
			}
		} else {
			setRequiredFiled(false);
			onSave();
		}

		// const checkValidations = () => {
		//   // if(documentRequiredField.required){
		//   //   setDocumentRequiredField({...documentRequiredField,showAlertMessage:true});
		//   //   form.validateFields().then(()=>{}).catch((err)=>{setRequiredFiled(true)})
		//   // }
		//   // if (documentRequiredField.required || riskProfileRequiredField.required) {

		//     if(clientCategory==='1'){
		//       if(accountFormData?.riskProfileModel && Object.keys(accountFormData?.riskProfileModel).length > 0){
		//         setRiskProfileRequiredField ({required:false,showRiskProfileAlertMessage:false});
		//         form.validateFields().then(()=>{}).catch((err)=>{setRequiredFiled(false)})
		//         //checkDocReq();
		//       }
		//       else{
		//         setRiskProfileRequiredField ({required:true,showRiskProfileAlertMessage:true});
		//         form.validateFields().then(()=>{}).catch((err)=>{setRequiredFiled(true)})
		//         //checkDocReq();
		//       }
		//     }
		//     else if(clientCategory ==='2' && (accountFormData?.type==="PT" || accountFormData?.type==="PS")){
		//       if(accountFormData?.riskProfileModel && Object.keys(accountFormData?.riskProfileModel).length > 0){
		//         setRiskProfileRequiredField ({required:false,showRiskProfileAlertMessage:false});
		//         form.validateFields().then(()=>{}).catch((err)=>{setRequiredFiled(false)})
		//         //checkDocReq();
		//       }
		//       else{
		//         setRiskProfileRequiredField ({required:true,showRiskProfileAlertMessage:true});
		//         form.validateFields().then(()=>{}).catch((err)=>{setRequiredFiled(true)})
		//         //checkDocReq();
		//       }
		//     }
		//     // if(documentRequiredField.required){
		//     //   setDocumentRequiredField({ ...documentRequiredField, showAlertMessage: true });
		//     //   form.validateFields().then(() => { }).catch((err) => { setRequiredFiled(true) })
		//     // }
		//   // }
		//   else {
		//     // if(documentRequiredField.required){
		//     //   setDocumentRequiredField({ ...documentRequiredField, showAlertMessage: true });
		//     //   form.validateFields().then(() => { }).catch((err) => { setRequiredFiled(true) })
		//     // } else {
		//       setRequiredFiled(false)
		//       onSave()
		//     // }
		//   }
	};

	const checkJointHolderDetailValidation = () => {
		if (jointHolderDetailRequiredField.required) {
			setJointHolderDetailRequiredField({
				...jointHolderDetailRequiredField,
				showJointHolderDetailAlertMessage: true
			});
			form
				.validateFields()
				.then(() => {})
				.catch((err) => {
					setRequiredFiled(true);
				});
		} else {
			setRequiredFiled(false);
			onSave();
		}
	};

	const onSave = () => {
		setLoading(true);
		form
			.validateFields()
			.then((res) => {
				executePostAccount(accountFormData)
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
						console.log('error', err);
						setLoading(false);
					});
			})
			.catch((err) => {
				console.log('error2', err);
				setRequiredFiled(true);
				setLoading(false);
			});
	};

	const getRiskProfileQA = async () => {
		try {
			const response = await getQA(
				accountFormData?.type,
				accountFormData?.nature,
				accountFormData?.classification
			);
			setRiskProfileQA(response.data);
		} catch (error) {}
	};

	useEffect(() => {
		// if (accountFormData?.type && accountFormData?.nature && accountFormData?.classification) {
		if (accountFormData?.type && accountFormData?.nature) {
			getRiskProfileQA();
		}
		// }, [accountFormData?.type, accountFormData?.nature, accountFormData?.classification]);
	}, [accountFormData?.type, accountFormData?.nature, accountFormData?.classification]);

	const handleFailModalOkOrCancel = () => {
		setShowFailModal(false);
	};
	const onAlertClose = () => {
		setRequiredFiled(false);
		setDocumentRequiredField({ ...documentRequiredField, showAlertMessage: false });
		setRiskProfileRequiredField({
			...riskProfileRequiredField,
			showRiskProfileAlertMessage: false
		});
		setJointHolderDetailRequiredField({
			...jointHolderDetailRequiredField,
			showJointHolderDetailAlertMessage: false
		});
		setBankDetailValidation({
			...bankDetailValidation,
			showBankDetailAlertMessage: false
		});
	};

	const formatSecurityAccountDetails = (data) => {
		return data?.map((e) => ({
			type: e?.type,
			serviceProvider: e?.serviceProvider,
			accountNumber: e?.accountNumber,
			subAssetClass: e?.subAssetClass?.dataValue,
			accountStatus: e?.accStatus,
			remarks: e?.remark,
			srlNo: e?.srlNo
		}));
	};

	const formatJointAccountHolder = (data) => {
		return data?.map((e) => ({
			jointId: e?.jointId,
			WsjointDetailsId: '',
			modeOfOperation: e?.modeofoperation,
			SrlNo: e?.srlNo
		}));
	};

	const checkRiskProfileModelData = (data) => {
		if (data?.recommendedCategoryCode) {
			return data;
		}
		return {};
	};

	const formatData = () => {
		return {
			relationshipManager: accountDetails?.baseSchemeRequisition?.investmentManager || null,
			branch: accountDetails?.baseSchemeRequisition?.branch || null,
			nature: accountDetails?.baseSchemeRequisition?.schemeType || null,
			classification: accountDetails?.baseSchemeRequisition?.fundClassification || null,
			holdingPattern: accountDetails?.baseSchemeRequisition?.holdingPattern || null,
			// modeOfOperation: accountDetails?.baseSchemeRequisition?.modeOfOperation || null,
			benchmark: accountDetails?.baseSchemeRequisition?.stkexindex || null,
			reportingCurrency: accountDetails?.baseSchemeRequisition?.currency || null,
			otherDetailsRemarks:
				accountDetails?.baseSchemeRequisition?.remark !== ''
					? accountDetails?.baseSchemeRequisition?.remark
					: null,
			// riskProfileModel: accountDetails?.riskProfileModel,

			riskProfileModel:
				// action !== 'copy' && action !== 'profileCopy' ? accountDetails?.riskProfileModel : {},
				action !== 'copy' && action !== 'profileCopy'
					? checkRiskProfileModelData(accountDetails?.riskProfileModel)
					: {},
			bankDetails: accountDetails?.bankDetails,
			securityAccountDetails: formatSecurityAccountDetails(accountDetails?.securityAccountDetails),
			secondaryRelationshipManager:
				accountDetails?.baseSchemeRequisition?.investmentManagerN !== ''
					? accountDetails?.baseSchemeRequisition?.investmentManagerN
					: null,
			serviceRelationshipManager:
				accountDetails?.baseSchemeRequisition?.investmentManager3 !== ''
					? accountDetails?.baseSchemeRequisition?.investmentManager3
					: null,
			secondaryExternalRM:
				accountDetails?.baseSchemeRequisition?.secondaryExternalRm !== ''
					? accountDetails?.baseSchemeRequisition?.secondaryExternalRm
					: null,
			primaryExternalRM:
				accountDetails?.baseSchemeRequisition?.primaryExternalRm !== ''
					? accountDetails?.baseSchemeRequisition?.primaryExternalRm
					: null,
			type: accountDetails?.baseSchemeRequisition?.incomeGrowth || null,
			accountName: accountDetails?.baseSchemeRequisition?.name || null,
			name: accountDetails?.baseSchemeRequisition?.clientId || null,
			primaryAccountHolder: accountDetails?.customerDetails?.name || null,
			// DocumentInfo: accountDetails?.uploadedDocInfo?.lstDocumentInfo || null,
			DocumentInfo:
				action !== 'copy' && action !== 'profileCopy'
					? accountDetails?.uploadedDocInfo?.lstDocumentInfo || null
					: [],
			// scheme: accountDetails?.baseSchemeRequisition?.scheme || null, /// required only for edit
			scheme:
				action !== 'copy' && action !== 'profileCopy'
					? accountDetails?.baseSchemeRequisition?.scheme || null
					: null, /// required only for edit
			// holdingAccount: formatJointAccountHolder(accountDetails?.jointHolder),
			holdingAccount:
				accountDetails?.baseSchemeRequisition?.holdingPattern === 'SINGLE'
					? []
					: formatJointAccountHolder(accountDetails?.jointHolder),
			investmentAccess:
				accountDetails?.baseSchemeRequisition?.investmentAccessArray?.toString() || null,
			SourceOfFund: accountDetails?.baseSchemeRequisition?.sourceOfFund,
			LinkAccount: accountDetails?.baseSchemeRequisition?.linkedAccount || null,
			productCode:
				accountDetails?.baseSchemeRequisition?.productCode !== ''
					? accountDetails?.baseSchemeRequisition?.productCode
					: null,
			TaxStatus:
				accountDetails?.baseSchemeRequisition?.taxStatus !== ''
					? accountDetails?.baseSchemeRequisition?.taxStatus
					: null,
			ReferralBranch:
				accountDetails?.baseSchemeRequisition?.referralBranch !== ''
					? accountDetails?.baseSchemeRequisition?.referralBranch
					: null,
			Frequency: accountDetails?.baseSchemeRequisition?.frequency || null,
			DeliverToRm: accountDetails?.baseSchemeRequisition?.deliverToRm,
			MailingPreference: accountDetails?.baseSchemeRequisition?.mailingPreference || null,
			otherInstructions: accountDetails?.baseSchemeRequisition?.otherInstructions || null,
			AuthorisedPerson: accountDetails?.baseSchemeRequisition?.authorisedPerson,
			DeliveryInstructions:
				accountDetails?.baseSchemeRequisition?.deliveryInstructions !== ''
					? accountDetails?.baseSchemeRequisition?.deliveryInstructions
					: null,
			LocationAndAddress: accountDetails?.baseSchemeRequisition?.location,
			marketAccess: accountDetails?.baseSchemeRequisition?.marketAccess,
			isSecuritySuitability: accountDetails?.baseSchemeRequisition?.isSecuritySuitability,
			blockYN: accountDetails?.baseSchemeRequisition?.blockYn
		};
	};

	const profileData = () => {
		return {
			relationshipManager: profileAccountDetails?.baseSchemeRequisition?.investmentManager,
			branch: profileAccountDetails?.baseSchemeRequisition?.branch,
			nature: profileAccountDetails?.baseSchemeRequisition?.schemeType,
			classification: profileAccountDetails?.baseSchemeRequisition?.fundClassification,
			holdingPattern: profileAccountDetails?.baseSchemeRequisition?.holdingPattern,
			// modeOfOperation: profileAccountDetails?.baseSchemeRequisition?.modeOfOperation,
			benchmark: profileAccountDetails?.baseSchemeRequisition?.stkexindex,
			reportingCurrency: profileAccountDetails?.baseSchemeRequisition?.currency,
			otherDetailsRemarks: profileAccountDetails?.baseSchemeRequisition?.remark,
			// riskProfileModel: profileAccountDetails?.riskProfileModel,

			riskProfileModel:
				action !== 'copy' && action !== 'profileCopy'
					? // ? profileAccountDetails?.riskProfileModel
					  checkRiskProfileModelData(profileAccountDetails?.riskProfileModel)
					: {},
			bankDetails: profileAccountDetails?.bankDetails,
			securityAccountDetails: formatSecurityAccountDetails(
				profileAccountDetails?.securityAccountDetails
			),
			secondaryRelationshipManager:
				profileAccountDetails?.baseSchemeRequisition?.investmentManagerN,
			serviceRelationshipManager: profileAccountDetails?.baseSchemeRequisition?.investmentManager3,
			secondaryExternalRM: profileAccountDetails?.baseSchemeRequisition?.secondaryExternalRm,
			primaryExternalRM: profileAccountDetails?.baseSchemeRequisition?.primaryExternalRm,
			type: profileAccountDetails?.baseSchemeRequisition?.incomeGrowth,
			accountName: profileAccountDetails?.baseSchemeRequisition?.name,
			name: profileAccountDetails?.baseSchemeRequisition?.clientId,
			primaryAccountHolder: profileAccountDetails?.customerDetails?.name,
			// DocumentInfo: profileAccountDetails?.uploadedDocInfo?.lstDocumentInfo,
			DocumentInfo:
				action !== 'copy' && action !== 'profileCopy'
					? profileAccountDetails?.uploadedDocInfo?.lstDocumentInfo || null
					: [],
			scheme:
				action !== 'copy' && action !== 'profileCopy'
					? profileAccountDetails?.baseSchemeRequisition?.scheme
					: null, /// required only for edit
			// holdingAccount: formatJointAccountHolder(profileAccountDetails?.jointHolder),
			holdingAccount:
				profileAccountDetails?.baseSchemeRequisition?.holdingPattern === 'SINGLE'
					? []
					: formatJointAccountHolder(profileAccountDetails?.jointHolder),

			investmentAccess:
				profileAccountDetails?.baseSchemeRequisition?.investmentAccessArray?.toString(),
			SourceOfFund: profileAccountDetails?.baseSchemeRequisition?.sourceOfFund,
			LinkAccount: profileAccountDetails?.baseSchemeRequisition?.linkedAccount,
			productCode: profileAccountDetails?.baseSchemeRequisition?.productCode,
			TaxStatus: profileAccountDetails?.baseSchemeRequisition?.taxStatus,
			ReferralBranch: profileAccountDetails?.baseSchemeRequisition?.referralBranch,
			Frequency: profileAccountDetails?.baseSchemeRequisition?.frequency,
			DeliverToRm: profileAccountDetails?.baseSchemeRequisition?.deliverToRm,
			MailingPreference: profileAccountDetails?.baseSchemeRequisition?.mailingPreference,
			otherInstructions: profileAccountDetails?.baseSchemeRequisition?.otherInstructions,
			AuthorisedPerson: profileAccountDetails?.baseSchemeRequisition?.authorisedPerson,
			DeliveryInstructions: profileAccountDetails?.baseSchemeRequisition?.deliveryInstructions,
			LocationAndAddress: profileAccountDetails?.baseSchemeRequisition?.location,
			marketAccess: profileAccountDetails?.baseSchemeRequisition?.marketAccess,
			isSecuritySuitability: profileAccountDetails?.baseSchemeRequisition?.isSecuritySuitability,
			blockYN: profileAccountDetails?.baseSchemeRequisition?.blockYn
		};
	};

	useEffect(() => {
		if ((action === 'edit' || action === 'copy') && accountDetails) {
			setIsGetAccountDetailsApiCompleted(true);
			setAccountFormData({ ...accountFormData, ...formatData() });
			// setAttachmentsModalDataArray(accountDetails?.attach);
			setAttachmentsModalDataArray(action !== 'copy' ? accountDetails?.attach : []);
			setCustomerId(accountDetails?.baseSchemeRequisition?.clientId);
			form.setFieldsValue(formatData());
		}
	}, [accountDetails]);

	useEffect(() => {
		if ((action === 'profileEdit' || action === 'profileCopy') && profileAccountDetails) {
			setIsGetAccountDetailsApiCompleted(true);
			setAccountFormData({ ...accountFormData, ...profileData() });
			// setAttachmentsModalDataArray(profileAccountDetails?.attach);
			setAttachmentsModalDataArray(action !== 'profileCopy' ? profileAccountDetails?.attach : []);
			setCustomerId(profileAccountDetails?.baseSchemeRequisition?.clientId);
			form.setFieldsValue(profileData());
		}
	}, [profileAccountDetails]);

	const [documentRequestObject, setDocumentRequestObject] = useState({});
	useEffect(() => {
		// if (accountFormData?.type && accountFormData?.nature && accountFormData?.classification) {
		if (accountFormData?.type && accountFormData?.nature) {
			const newDocumentRequestObject = {
				data: {
					AccountNature: accountFormData?.nature || null,
					AccountClassification: accountFormData?.classification || null,
					AccountType: accountFormData?.type || null,
					ClientId: clientId,
					// RefID: "",
					RefID: refID || '',
					// RefType: 'ACCOUNTREQADD' || '',
					// RefType: refType || '',
					RefType: 'ACCOUNTREQADD',
					IsSecuritySuitability: accountFormData?.isSecuritySuitability
				}
			};
			setDocumentRequestObject(newDocumentRequestObject);
		}
	}, [
		accountFormData?.nature,
		accountFormData?.classification,
		accountFormData?.type,
		clientId,
		accountFormData?.isSecuritySuitability
	]);

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
						fileDescription: 'Attachments',
						fileName: file.fileName,
						fileSize: file.fileSize,
						mimeType: file.mimeType,
						fileString: file.fileString,
						attachmentFor: 'Attachments',
						attachedBy: user && user.userName,
						sessionId: file.sessionId
					}
				];
			});
			let finalAttachmentsModalData = [...attachmentsModalDataArray];
			if (values?.operation && values?.operation === 'delete') {
				finalAttachmentsModalData = [];
			}
			attachmentsModalData.forEach((file) => {
				finalAttachmentsModalData = [...finalAttachmentsModalData, file];
			});
			setAttachmentsModalDataArray(finalAttachmentsModalData);
		}
		if (
			values?.operation &&
			values?.operation === 'delete' &&
			values?.attachments &&
			values?.attachments?.length === 0
		) {
			setAttachmentsModalDataArray([]);
		}
	};
	useEffect(() => {
		setAccountFormData({ ...accountFormData, attachments: attachmentsModalDataArray });
	}, [attachmentsModalDataArray]);

	const onIsSecuritySuitabilityHandler = (val) => {
		// setIsSecuritySuitability(val);
		setAccountFormData({ ...accountFormData, isSecuritySuitability: val });
	};

	const handleArrow = () => {
		history.push('/dashboard/MyAccount');
	};

	return (
		<div className='account-create-container'>
			<Modal
				visible={showSuccessModal}
				closable={false}
				footer={[
					<Button
						onClick={() => {
							setShowSuccessModal(false);
							// history.push('/dashboard/MyAccount');
							history.push({
								pathname:
									action === 'profileEdit' || action === 'profileCopy'
										? `/dashboard/Profile`
										: `/dashboard/MyAccount`
							});
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

			<DashboardScreenTopbar
				screenText={
					action === 'edit'
						? 'Edit Account'
						: action === 'profileEdit'
						? 'Edit Account'
						: 'Create Account'
				}
				cancelBtnText='Cancel'
				submitBtnText='Save'
				// onSubmit={onSave}
				// onSubmit={action === 'edit' ? onSave : action === 'profileEdit' ? onSave : checkValidations}
				// onSubmit={
				// 	action === 'edit' || action === 'copy'
				// 		? checkJointHolderDetailValidation
				// 		: action === 'profileEdit' || action === 'profileCopy'
				// 		? checkJointHolderDetailValidation
				// 		: checkValidations
				// }

				onSubmit={checkValidations}
				onCancel={() => {
					// history.push('/dashboard/MyAccount');
					history.push({
						pathname:
							action === 'profileEdit' || action === 'profileCopy'
								? `/dashboard/Profile`
								: `/dashboard/MyAccount`
					});
				}}
				onArrowclick={handleArrow}
				loading={loading}
			/>

			<Space direction='vertical' size={16} className='parent-form-container'>
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

				{bankDetailValidation.showBankDetailAlertMessage ? (
					<Alert
						message='Error'
						description={'Reporting currency and default Bank Details currency should be same'}
						type='error'
						closable
						onClose={setTimeout(() => {
							onAlertClose();
						}, 5000)}
					/>
				) : (
					''
				)}

				{jointHolderDetailRequiredField.showJointHolderDetailAlertMessage ? (
					<Alert
						message='Error'
						description={'Atleast ONE Joint Holder Detail is required'}
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

				<CreateClientDetailsFormCard
					form={form}
					user={user}
					onSelectCustomerType={handleCustomerId}
					formData={accountFormData}
					setUserNameDropDownlist={setUserNameDropDownlist}
					csObject={csObject?.length > 0 ? csObject[0] : undefined}
					rules={rules?.length > 0 ? rules[0] : undefined}
					onValuesChange={handleAccountFormChange}
					action={action}
					location={location}
					setClientCategory={setClientCategory}
				/>

				<AccountDetailsFormCard
					form={form}
					formData={accountFormData}
					setAccessData={setAccessData}
					rules={rules?.length > 0 ? rules[0] : undefined}
					csObject={csObject?.length > 0 ? csObject[0] : undefined}
					onValuesChange={handleAccountFormChange}
					action={action}
					userNameDropDownlist={userNameDropDownlist}
					user={user}
					clientId={clientId}
					formatJointAccountHolder={formatJointAccountHolder}
				/>

				<AdditionalDetailsFormCard
					form={form}
					formData={accountFormData}
					rules={rules?.length > 0 ? rules[0] : undefined}
					csObject={csObject?.length > 0 ? csObject[0] : undefined}
					onValuesChange={handleAccountFormChange}
					action={action}
					userNameDropDownlist={userNameDropDownlist}
				/>

				<AccountOtherDetailsFormCard
					form={form}
					formData={accountFormData}
					rules={rules?.length > 0 ? rules[0] : undefined}
					csObject={csObject?.length > 0 ? csObject[0] : undefined}
					onValuesChange={handleAccountFormChange}
					userNameDropDownlist={userNameDropDownlist}
					action={action}
					location={location}
				/>

				<AccountMailingInstruction
					form={form}
					onSelectCustomerType={handleCustomerType}
					formData={accountFormData}
					rules={rules?.length > 0 ? rules[0] : undefined}
					csObject={csObject?.length > 0 ? csObject[0] : undefined}
					onValuesChange={handleAccountFormChange}
					action={action}
					location={location}
				/>

				<RiskProfileFormCard
					form={form}
					formData={accountFormData}
					onValuesChange={handleAccountFormChange}
					questionAnswer={riskProfileQA}
					action={action}
					screen={'accountCreate'}
					onIsSecuritySuitabilityHandler={onIsSecuritySuitabilityHandler}
				/>

				{/*
        This will useful future use
        <AttachmentsFormCard
          form={form}
          formData={accountFormData}
          onValuesChange={handleAccountFormChange}
          action={action}
          progName="ACCOUNTREQADD"
          customerCode={refID}
        /> */}
				<AttachmentUploadModal
					selectedAccount={{ scheme: location.state?.refID }}
					isUpload={false}
					type='ACCOUNTREQADD'
					onValuesChange={handleOppFormChange}
					data={attachmentsModalDataArray}
					action={location?.state?.action}
				/>
				{/* <DocumentsDetailFormCard
          form={form}
          formData={accountFormData}
          onValuesChange={handleAccountFormChange}
          rules={rules.length > 0 ? rules[0] : undefined}
          removeAttachment={removeAttachment}
          action={action}
          documentRequestObject={documentRequestObject}
        /> */}

				<DocumentsDetail
					form={form}
					formData={accountFormData}
					onValuesChange={handleAccountFormChange}
					rules={rules.length > 0 ? rules[0] : undefined}
					removeAttachment={removeAttachment}
					csObject={csObject[4]}
					action={location?.state?.action}
					documentRequestObject={documentRequestObject}
					setDocumentRequiredField={setDocumentRequiredField}
					documentRequiredField={documentRequiredField}
					checkDocMandatory={checkDocMandatory}
					type='ACCOUNTREQADD'
				/>

				{(!(
					action === 'edit' ||
					action === 'copy' ||
					action === 'profileEdit' ||
					action === 'profileCopy'
				) ||
					(isGetAccountDetailsApiCompleted && accountFormData?.bankDetails)) && (
					<BankDetailsFormCard
						form={form}
						formData={accountFormData}
						rules={rules?.length > 0 ? rules[4] : undefined}
						csObject={csObject?.length > 0 ? csObject[4] : undefined}
						onValuesChange={handleAccountFormChange}
						action={action}
						setBankDetailValidation={setBankDetailValidation}
						// checkReportCurrWithDefaultCurr={checkReportCurrWithDefaultCurr}
					/>
				)}

				{/* COMMENTED FOR DEV PURPOSES */}
				{/* {(!(action === "edit" || action === "profileEdit") ||
          (isGetAccountDetailsApiCompleted && accountFormData?.securityAccountDetails)) && (
          <AccountSecurityAccountsFormCard
            form={form}
            formData={accountFormData}
            onValuesChange={handleAccountFormChange}
            rules={rules.length > 0 ? rules[3] : undefined}
            csObject={csObject?.length > 0 ? csObject[3] : undefined}
            id={customerId}
          />
        )} */}

				<MiscellaneousFormCard
					form={form}
					formData={accountFormData}
					onValuesChange={handleAccountFormChange}
					rules={rules.length > 0 ? rules[0] : undefined}
					csObject={csObject[1]}
					id={customerId}
					refID={refID}
					progName={action === 'profileEdit' ? 'ACCOUNTADD' : 'ACCOUNTREQADD'}
					action={action}
					screenName='account'
				/>
				{/* <AccountMiscellaneousFormCard /> */}
			</Space>
			<BackToTop />
		</div>
	);
};

const mapStateToProps = (state) => ({
	cs: state.accountCreate.controlStructure,
	accountDetails: state.accountCreate.accountDetails,
	profileAccountDetails: state.accountCreate.accountDetailsProfile,
	user: state.auth.user
});

const mapDispatchToProps = { setCreateCustomerData };

export default connect(mapStateToProps, mapDispatchToProps)(AccountCreateScreen);
