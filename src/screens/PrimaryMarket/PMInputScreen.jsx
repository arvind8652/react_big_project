import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'antd';
import BackToTop from '../../components/BackToTop/BackToTop';
import DashboardScreenTopbar from '../../components/DashboardScreenTopbar/DashboardScreenTopbar';
import { useSelector } from 'react-redux';
import { createValidators } from '../../utils/utils';
import { LoadingOutlined } from '@ant-design/icons';

import GenericCard from '../../components/GenericCard/GenericCard';
import {
	executeControlStructure,
	executePlaceOrder,
	executeGetDefaultBankAccountAndCustodian,
	executeExploreProduct
} from '../../redux/actions/primaryMarketActions';

import { getOrderDetails, getOrderAttachmentDetails } from '../../api/primaryMarketApi';

import Schema from 'async-validator';

import './style.scss';
import AttachmentUploadModal from '../../components/AttachmentPannel/AttachmentUploadModal';
import DocumentsDetail from '../../components/Forms/CustomerDocumentsDetailFormCard/CustomerDocumentsDetailFormCard';

import { AccountDetails } from './AccountDetails';
import { SecurityDetails } from './SecurityDetails';
import { AddressDetails } from './AddressDetails';
import { OrderDetails } from './OrderDetails';
import { OtherDetails } from './OtherDetails';
import { PaymentDetails } from './PaymentDetails';
import { OrderType } from './OrderType';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import moment from 'moment';

// KEEP THIS LINE HERE FOR DEBUG MANDATORY FIELDS
// Schema.warning = (msg, msg2) => console.log(msg, msg2);

// CODE REQUIRED
Schema.warning = (msg, msg2) => {};

const styleSet = {
	cardStyle: {
		margin: '10px 0px'
	}
};

const PMInputScreen = () => {
	const history = useHistory();
	const location = useLocation();
	const whichInvestment = location.state?.activeTab ?? 'EQ';
	const { dealId, pmOrderData, activeTab } = location.state;
	const whichMode = dealId ? 'edit' : 'add';
	const [csAvailable, setCSActive] = useState(false);
	const [documentDetailsPayload, setDocumentDetailsPayload] = useState({});
	const [bankAccOptions, setUserBankAccOptions] = useState();
	const [mailingOption, setMailingAddressOption] = useState('O');
	const [securityList, setSecurityList] = useState({});
	const [errorDescription, setErrorDescription] = useState(['']);
	const [form] = Form.useForm();
	const [showLoading, setShowLoading] = useState(false);
	const [loadingMessage, setLoadingMessage] = useState('Loading...');

	const [placeButtonFlag, setPlaceButtonFlag] = useState(false);

	// ----------------------------start for document detail validation-------------------------
	const [documentRequiredField, setDocumentRequiredField] = useState({
		mandatoryCount: 0,
		required: false,
		showAlertMessage: false
	});
	// ----------------------------end for document detail validation-------------------------

	// USE THIS IN API CALL
	const [attachmentsModalDataArray, setAttachmentsModalDataArray] = useState([]);
	const [documentData, setDocumentData] = useState({ DocumentInfo: [] });

	const [displayAlert, setDisplayAlert] = useState(false);

	const controlStructure = useSelector((state) => state.primaryMarketReducer.controlStructure);
	const user = useSelector((state) => state.auth.user);

	const primaryOrderData = useSelector((state) => state.primaryMarketReducer.primaryOrder);
	const bookingBranch = useSelector((state) => state.auth.user.branch);

	const [formValues, setFormValues] = useState({
		clientId: null,
		selectedAccount: null,
		issuer: '',
		security: '',
		orderDate: moment(sessionStorage.getItem('curDate')),
		price: '',
		applicationQuantity: 0,
		applicationAmount: 0,
		broker: '',
		brokerage: 0,
		interestRate: 0,
		otherCharges: primaryOrderData?.primaryOrderFcyArrangerFee ?? 0,
		settlementValue: 0.0,
		defaultCreditAccount: '',
		custodian: '',
		dpAccNo: '',
		paymentMode: '',
		paymentDate: moment(sessionStorage.getItem('curDate')),
		bankAcc: '',
		chequeNumber: '',
		bankName: '',
		bookingBranch: bookingBranch ?? '',
		sourceOfFund: '',
		freshFunds: '',
		source: '',
		otherSource: '',
		designation: '',
		emailId: '',
		mailingAddress: '',
		nocdCode: '',
		remarks: '',
		address: '',
		country: '',
		state: '',
		city: '',
		zipCode: '',
		PMOrderType: ''
	});

	const [pmData, setPMData] = useState({});

	const [minInvestmentAmt, setMinInvestmentAmt] = useState(false);

	const [faceValue, setFaceValue] = useState();

	const [exploreProductData, setExploreProductData] = useState([]);
	const handleFormValues = (obj) => {
		setFormValues({ ...formValues, ...obj });
		return;
	};

	const returnFormField = (key) => {
		return formValues[key];
	};

	const checkDocMandatory = (saveBtnClickCall = false) => {
		let requiredFinalVal = false;
		if (Array.isArray(documentData?.DocumentInfo) && documentData?.DocumentInfo?.length > 0) {
			let countVal = 0;
			documentData?.DocumentInfo.forEach((_) => {
				if (_.docmandatory === 'Y') {
					countVal += 1;
				}
			});
			if (countVal >= documentRequiredField.mandatoryCount) {
				setDocumentRequiredField({ ...documentRequiredField, required: false });
				requiredFinalVal = true;
			}
		}
		if (saveBtnClickCall) {
			return requiredFinalVal;
		}
		// else {
		// 	setDocumentRequiredField({ ...documentRequiredField, required: true });
		// }
	};

	const setDocumentPayload = () => {
		if (securityList && securityList.security) {
			// let documentDetailsPayload = {};
			const newDocumentRequestObject = {
				data: {
					AssetType: securityList?.security?.assetType || null,
					OrderType: 'PMIPO',
					IsSecuritySuitability: securityList.isSecuritySuitability,
					ClientId: formValues.clientId || null,
					Scheme: formValues.selectedAccount || null,
					RefID: pmData?.dealId || '',
					RefType: 'ORDERPRADD' || ''
				}
			};
			setDocumentDetailsPayload(newDocumentRequestObject);
		}
	};

	useEffect(() => {
		setDocumentPayload();
		// if (securityList && securityList.security) {
		// 	// let documentDetailsPayload = {};

		// 	const newDocumentRequestObject = {
		// 		data: {
		// 			AssetType: securityList?.security?.assetType || null,
		// 			OrderType: "PMIPO" || null,
		// 			IsSecuritySuitability: securityList?.isSecuritySuitability,
		// 			ClientId: formValues?.clientId || null,
		// 			Scheme: formValues?.selectedAccount || null,
		// 		},
		// 	};
		// 	setDocumentDetailsPayload(newDocumentRequestObject);
		// console.log("securityList------------------",newDocumentRequestObject);

		// }
	}, [formValues.clientId, pmData?.dealId, formValues.selectedAccount, securityList]);
	// }, [formValues.clientId, formValues.selectedAccount, securityList]);
	// }, [pmData.clientId, pmData.selectedAccount, securityList,dealId]);

	useEffect(() => {
		if (dealId) {
			getOrderDetails(dealId).then((response) => {
				let pmData = response.data.pmDealRequisitions;
				handleFormValues({
					clientId: pmData.clientId,
					selectedAccount: pmData.scheme,
					issuer: pmData.issuer,
					security: pmData.security,
					orderDate: moment(sessionStorage.getItem('curDate')),
					price: pmData.appAmount,
					applicationQuantity: pmData.eligUnits,
					applicationAmount: pmData.fcyTotPaid,
					dpAccNo: pmData.dpAccountNo,
					broker: pmData.agent,
					brokerage: 0,
					interestRate: pmData.appYield,
					otherCharges: primaryOrderData?.primaryOrderFcyArrangerFee ?? 0,
					// settlementValue: pmData.fcyNettVal,
					defaultCreditAccount: pmData.bankAccForINM,
					custodian: pmData.custodian,
					paymentMode: pmData.instrType,
					paymentDate: pmData.chqDate ? moment(pmData.chqDate) : null,
					bankAcc: pmData.account,
					chequeNumber: pmData.chqNumber,
					bankName: pmData.bank,
					bookingBranch: bookingBranch ?? '',
					sourceOfFund: pmData.sourceOfFund,
					freshFunds: pmData.freshSchemeYn,
					source: pmData.sourceUserId,
					otherSource: pmData.OthSource,
					designation: pmData.othDesignation,
					emailId: pmData.emailId,
					mailingAddress: pmData.addressOthYn,
					nocdCode: pmData.nocdCode ?? null,
					remarks: pmData.remarks,
					address: pmData.mailAdd1,
					country: pmData.mailCountry,
					state: pmData.mailState,
					city: pmData.mailCity,
					zipCode: pmData.mailPin,
					tranType: pmData.tranType
				});

				setMailingAddressOption(pmData.addressOthYn);

				setPMData(pmData);

				setDocumentData({
					DocumentInfo: response.data.uploadedDocInfo.lstDocumentInfo
				});
				if (response.data.attachment) {
					setAttachmentsModalDataArray(response.data.attachment);
				}
			});
		}
		setDocumentPayload();
	}, [dealId]);

	useEffect(() => {
		if (documentData?.DocumentInfo?.length > 0) {
			checkDocMandatory();
		}
	}, [documentData?.DocumentInfo]);

	useEffect(() => {
		if (documentData?.DocumentInfo?.length > 0 && dealId) {
			checkDocMandatory();
		}
	}, []);

	useEffect(() => {
		form.setFieldsValue(formValues);
		form.validateFields();
	}, [formValues, form]);

	useEffect(() => {
		if (dealId === undefined || dealId === null) {
			handleFormValues({ custodian: '', bankAcc: '' });
			if (formValues.security && formValues.selectedAccount) {
				executeGetDefaultBankAccountAndCustodian(
					formValues.selectedAccount,
					formValues.security
				).then((res) =>
					handleFormValues({
						custodian: res.data.custodian?.dataValue ?? '',
						bankAcc: res.data.bankAccount?.dataValue ?? '',
						defaultCreditAccount: res.data.bankAccount?.dataValue ?? ''
					})
				);
			}
		}
	}, [formValues.security, formValues.selectedAccount]);

	// Attachment
	const getAttachmentData = async () => {
		try {
			let resp = await getOrderAttachmentDetails('ORDERPRADD', dealId);
			if (resp.status) {
				setAttachmentsModalDataArray(resp.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (dealId) getAttachmentData();
	}, [dealId]);
	//

	const handleOppFormChange = (values) => {
		if (!values.attachments) {
			setAttachmentsModalDataArray({
				...attachmentsModalDataArray,
				...values
			});
		}
		if (values.attachments && values.attachments.length > 0) {
			let attachmentsModalData = [];
			values.attachments.forEach((file) => {
				attachmentsModalData = [
					...attachmentsModalData,
					{
						fileDescription: 'Attachments',
						// fileName: file.FileName,
						// fileSize: file.FileSize,
						fileName: file.fileName,
						fileSize: file.fileSize,

						mimeType: file.mimetype,
						fileString: file.fileString,
						attachmentFor: 'Attachments',
						attachedBy: user && user.userName,
						sessionId: file.SessionId,
						refType: 'ORDERPRADD',
						refId: null
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

	const selectValues = (keyField) => {
		let filtered = csAvailable
			? Object.values(controlStructure).filter((e) => e.keyField === keyField)
			: [];

		if (filtered.length > 0) {
			let selectedObj = filtered[0];
			switch (selectedObj.controlType) {
				case 'AutoComplete':
					return {
						options: selectedObj.lookupValue.lookUpValues,
						key: selectedObj.lookupValue.returnColumn,
						value: selectedObj.lookupValue.displayColumn
					};
				case 'DropdownList':
					return {
						options: selectedObj.dropDownValue,
						key: 'dataValue',
						value: 'displayValue'
					};
				default:
					return { options: [] };
			}
		}
		return { options: [] };
	};

	const returnValidators = (keyField) => {
		if (csAvailable && controlStructure) {
			let validators = createValidators(controlStructure, form);
			let ansValidator = validators[keyField.toLowerCase()];
			if (ansValidator) {
				return ansValidator;
			} else {
				return [];
			}
		} else {
			return [];
		}
	};

	useEffect(() => {
		csAvailable === false &&
			executeControlStructure().then(() => {
				setCSActive(true);
			});
		executeExploreProduct({
			//  BusinessDate:"2021-12-07",
			BusinessDate: moment(sessionStorage?.getItem('prevDate'))?.format('YYYY-MM-DD'),
			MarketType: 'ORDERPRADD',
			AssetGroup: activeTab
		}).then((res) => {
			// console.log("response data-------------------",res)
			setExploreProductData(res);
		});
	}, [csAvailable]);

	const minQuantityChecks = () => {
		let messages = [];
		let status = true;

		if (minInvestmentAmt && formValues.applicationAmount < minInvestmentAmt) {
			status = false;
			if (whichInvestment === 'EQ') {
				messages.push(`Application Amount should be > = ${minInvestmentAmt}`);
			} else {
				messages.push(`Facevalue should be > = ${minInvestmentAmt}`);
			}
		}

		if (securityList.security) {
			if (whichInvestment === 'EQ') {
				if (formValues.applicationQuantity < securityList.security.appMinimum) {
					status = false;
					messages.push(`Application Quantity should be > = ${securityList.security.appMinimum}`);
				}

				if (
					securityList.security.pmLotsize &&
					!Number.isInteger(formValues.applicationQuantity / securityList.security.pmLotsize)
				) {
					status = false;
					messages.push(
						`Application Quantity should be in multiples of ${securityList.security.pmLotsize}`
					);
				}
			} else {
				if (formValues.applicationAmount < securityList.security.appMinimum) {
					status = false;
					messages.push(`Facevalue should be > = ${securityList.security.appMinimum}`);
				}

				if (
					securityList.security.pmLotsize &&
					!Number.isInteger(formValues.applicationAmount / securityList.security.pmLotsize)
				) {
					status = false;
					messages.push(`Face Value should be in multiples of ${securityList.security.pmLotsize}`);
				}
			}
		}

		return {
			status: status,
			messages: messages
		};
	};

	const handleDocFormChange = (values) => {
		setDocumentData({ ...documentData, ...values });
	};

	const onFinish = () => {
		const validationCheck = minQuantityChecks();

		if (validationCheck.status) {
			const reqObj = {
				// pmDealRequisitions: { ...primaryOrderData, dealId: dealId ?? "" },
				pmDealRequisitions: {
					...primaryOrderData,
					dealId: dealId ?? '',
					IsSecuritySuitability: securityList?.isSecuritySuitability
				},
				documentInfo: { lstDocumentInfo: documentData?.DocumentInfo ?? [] },
				attachment: attachmentsModalDataArray
			};

			setPlaceButtonFlag(true);
			setShowLoading(true);
			setLoadingMessage(() => (
				<center>
					<LoadingOutlined style={{ fontSize: '5rem' }} />
				</center>
			));
			executePlaceOrder(reqObj).then((response) => {
				if (response.status === 200 && response.data.success === true) {
					setLoadingMessage(`Order ${response.data.message} for ${response.data.transactionId}`);
					setTimeout(() => {
						setShowLoading(false);
						if (formValues.tranType === 'S') {
							history.push('../orderBook/OrderBookInput', {
								dealId: undefined,
								activeTab: activeTab
							});
						} else {
							history.replace('/dashboard/orderBook', {
								activeTab
							});
						}
					}, 1500);
				} else {
					setLoadingMessage(`Unfortunately, unable to place order`);
					setTimeout(() => {
						setShowLoading(false);
					}, 2500);
					setDisplayAlert(true);
					setPlaceButtonFlag(false);
				}
			});
		} else {
			setDisplayAlert(true);
			setErrorDescription(validationCheck.messages);
		}
	};

	const onFinishFailed = () => {
		setDisplayAlert(true);
		const validationCheck = minQuantityChecks();
		if (validationCheck.status) {
			setErrorDescription(['Mandatory field/s are blank!']);
		} else {
			setErrorDescription(['Mandatory field/s are blank!', ...validationCheck.messages]);
		}
	};

	const getDecimalPrecision = (keyField) => {
		if (controlStructure && controlStructure.length > 0) {
			return controlStructure.find((each) => each.keyField === keyField).decimalLength;
		} else {
			return 0;
		}
	};

	const RENDER_CARDS = [
		{
			title: 'Account Details',
			component: (
				<AccountDetails
					setUserBankAccOptions={setUserBankAccOptions}
					returnValidators={returnValidators}
					setPlaceButtonFlag={setPlaceButtonFlag}
					handleFormValues={handleFormValues}
					returnFormField={returnFormField}
					formValues={formValues}
					isEdit={dealId ? true : false}
				/>
			)
		},
		{
			title: 'Order Type',
			component: (
				<OrderType
					selectValues={selectValues}
					returnValidators={returnValidators}
					handleFormValues={handleFormValues}
					whichInvestment={whichInvestment}
					exploreProductData={exploreProductData}
				/>
			)
		},
		{
			title: 'Security Details',
			component: (
				<SecurityDetails
					selectValues={selectValues}
					whichInvestment={whichInvestment}
					returnValidators={returnValidators}
					marketType={'PRIMARY'}
					setPlaceButtonFlag={setPlaceButtonFlag}
					setSecurityList={setSecurityList}
					handleFormValues={(obj) => handleFormValues(obj)}
					returnFormField={returnFormField}
					setMinInvestmentAmt={setMinInvestmentAmt}
					setFaceValue={(val) => setFaceValue(val)}
					formValues={formValues}
					exploreProductData={exploreProductData}
					// exploreProductData={ whichInvestment === "EQ" ? exploreProductData :[] }
					// exploreProductData={ [] }
				/>
			)
		},
		{
			title: 'Order Details',
			component: (
				<OrderDetails
					selectValues={selectValues}
					bankAccOptions={bankAccOptions}
					returnValidators={returnValidators}
					whichInvestment={whichInvestment}
					handleFormValues={handleFormValues}
					formValues={formValues}
					faceValue={faceValue}
					getDecimalPrecision={getDecimalPrecision}
					mode={whichMode}
					controlStructure={controlStructure}
					form={form}
				/>
			)
		},
		{
			title: 'Payment Details',
			component: (
				<PaymentDetails
					selectValues={selectValues}
					bankAccOptions={bankAccOptions}
					returnValidators={returnValidators}
					handleFormValues={handleFormValues}
					formValues={formValues}
					controlStructure={controlStructure}
					form={form}
				/>
			)
		},
		{
			title: 'Other Details',
			component: (
				<OtherDetails
					selectValues={selectValues}
					setMailingAddressOption={setMailingAddressOption}
					returnValidators={returnValidators}
					handleFormValues={handleFormValues}
					formValues={formValues}
				/>
			)
		},
		{
			title: 'Address Details',
			component: (
				<AddressDetails
					selectValues={selectValues}
					mailingOption={mailingOption}
					returnValidators={returnValidators}
					clientId={formValues.clientId}
					handleFormValues={handleFormValues}
					formValues={formValues}
					mode={whichMode}
					stateEditOptions={
						dealId
							? {
									data_value: pmData.mailState,
									display_value: pmData.mailStateName
							  }
							: ''
					}
					cityEditOptions={
						dealId
							? {
									data_value: pmData.mailCity,
									display_value: pmData.mailCityName
							  }
							: ''
					}
				/>
			)
		}
	];

	const DisplayErrorDescriptions = () => {
		return errorDescription.map((each, idx) => <h4 key={idx}>{each}</h4>, '');
	};

	const onArrowClick = () => {
		history.push('/dashboard/orderBook');
	};

	const checkDocValidations = () => {
		let checkDocMandatoryVal = checkDocMandatory(true);
		if (!checkDocMandatoryVal) {
			setDocumentRequiredField({
				...documentRequiredField,
				showAlertMessage: true
			});
		} else {
			onFinish();
		}

		// if (documentRequiredField.required) {
		// 	setDocumentRequiredField({
		// 		...documentRequiredField,
		// 		showAlertMessage: true,
		// 	});
		// } else {
		// 	onFinish();
		// }
	};

	return (
		<div className='secondary-create-container'>
			<Form
				form={form}
				name='control-ref'
				// onFinish={onFinish}
				onFinish={checkDocValidations}
				onFinishFailed={onFinishFailed}
				className='parent-form-container'
				requiredMark={true}
			>
				<DashboardScreenTopbar
					showBackArrow={true}
					screenText={`Primary Order`}
					submitBtnText='Place Now'
					onArrowclick={onArrowClick}
					RenderSubmit={
						<Form.Item>
							<Button
								type='primary'
								htmlType='submit'
								className='btn submit'
								disabled={placeButtonFlag ?? false}
							>
								Place Order
							</Button>
						</Form.Item>
					}
					RenderCancel={
						<Button
							type='text'
							onClick={() =>
								history.replace('/dashboard/orderBook', {
									activeTab
								})
							}
							className='btn cancel'
						>
							Cancel
						</Button>
					}
				/>

				{documentRequiredField.showAlertMessage ? (
					<Alert
						message='Error'
						description={'Please upload mandatory document'}
						type='error'
						closable
						onClose={setTimeout(() => {
							setDocumentRequiredField({
								...documentRequiredField,
								showAlertMessage: false
							});
						}, 3500)}
					/>
				) : (
					''
				)}

				{displayAlert && (
					<Alert
						message='Error'
						description={<DisplayErrorDescriptions />}
						type='error'
						closable
						onClose={setTimeout(() => {
							setDisplayAlert(false);
						}, 3500)}
					/>
				)}
				<Row>
					{RENDER_CARDS.map((ele) => {
						return (
							<Col
								span={24}
								style={styleSet.cardStyle}
								hidden={whichInvestment === 'EQ' && ele.title === 'Order Type' ? true : false}
								key={ele.title}
							>
								<GenericCard header={ele.title}>{ele.component}</GenericCard>
							</Col>
						);
					})}
				</Row>

				<Row>
					<Col span={24} style={styleSet.cardStyle}>
						<DocumentsDetail
							form={form}
							formData={documentData}
							onValuesChange={handleDocFormChange}
							// rules={rules.length > 0 ? rules[0] : undefined}
							// removeAttachment={removeAttachment}
							action={dealId ? 'edit' : 'add'}
							documentRequestObject={documentDetailsPayload}
							setDocumentRequiredField={setDocumentRequiredField}
							documentRequiredField={documentRequiredField}
							checkDocMandatory={checkDocMandatory}
							type='ORDERBOOK'
						/>

						{/* <DocumentCardWithUpload
							data={documentData?.lstDocumentInfo ?? []}
							securityList={securityList}
							docDetailsObj={documentDetailsPayload}
							setDocumentData={(data) => setDocumentData(data)}
						/> */}
					</Col>
				</Row>
				<AttachmentUploadModal
					selectedAccount={formValues.selectedAccount}
					isUpload={false}
					onValuesChange={handleOppFormChange}
					data={attachmentsModalDataArray}
					type='ORDERPRADD'
					// action={dealId ? "edit" : "add"}
				/>
				<Row>
					<BackToTop />
				</Row>
				<CustomModal visible={showLoading} children={<h2>{loadingMessage}</h2>} closable={false} />
			</Form>
		</div>
	);
};

export default PMInputScreen;
