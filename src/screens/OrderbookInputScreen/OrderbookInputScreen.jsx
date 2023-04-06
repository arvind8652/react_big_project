import { useEffect, useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Row, Col, Form, Button, Alert } from 'antd';
import { useSelector } from 'react-redux';
import { store } from '../../redux/configureStore';
import { ExportCSV } from './ExportCSV';
import {
	executeControlStructure,
	executePlaceOrder,
	executeCalculateSMOrder,
	setCalculateSMOrder,
	setSMCalculator,
	setPrintSofData,
	executeGetDefaultBankAccountAndCustodian,
	setSecondaryOrder,
	executegGetJointHolderDetails
} from '../../redux/actions/pNBActions';

import moment from 'moment';

import BackToTop from '../../components/BackToTop/BackToTop';
import TopBar from '../../components/DashboardScreenTopbar/DashboardScreenTopbar';
import GenericCard from '../../components/GenericCard/GenericCard';
import { AccountDetails } from './AccountDetails';
import { OrderDetails } from './OrderDetails';
import { OtherDetails } from './OtherDetails';
import { PaymentDetails } from './PaymentDetails';
import { SecurityDetails } from '../PrimaryMarket/SecurityDetails';
import { OrderType } from './OrderType';
import { createValidators } from '../../utils/utils';
import { LoadingOutlined } from '@ant-design/icons';
import './style.scss';
import './OrderbookInputScreen.scss';
import AttachmentUploadModal from '../../components/AttachmentPannel/AttachmentUploadModal';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import ComponentToPrint from './ComponentToPrint';

import DocumentsDetail from '../../components/Forms/CustomerDocumentsDetailFormCard/CustomerDocumentsDetailFormCard';
import { getOrderAttachmentDetails } from '../../api/primaryMarketApi';
import { getSecurityDetail } from '../../api/portfolioHoldingsApi';
import { getSMOrderDetailsByID } from '../../api/pNBApi';
import ComponentToPrintCalc from './componentToPrintCalc';
import { executeExploreProduct } from '../../redux/actions/primaryMarketActions';

const styleSet = {
	cardStyle: {
		margin: '10px 0px'
	}
};
const InvestmentOrder = () => {
	const history = useHistory();
	const location = useLocation();
	const { dealId, data, tranType, activeTab, exploreSecurity } = location.state;
	const whichInvestment = location.state?.activeTab ?? 'EQ';
	const [csAvailable, setCSActive] = useState(false);
	const [selectedAccount, setSelectedAccount] = useState({});
	const [bankAccOptions, setUserBankAccOptions] = useState([]);
	const [srcOfFund, setSrcOfFund] = useState('');
	const [attachmentsModalDataArray, setAttachmentsModalDataArray] = useState([]);
	const [documentData, setDocumentData] = useState({ DocumentInfo: [] });
	const [clientId, setClientId] = useState('');
	const [schemeAD, setSchemeAD] = useState('');
	const [securitySM, setSecuritySM] = useState('');
	const [issuerSM, setIssuerSM] = useState('');
	const [client, setClient] = useState({});
	const [securityList, setSecurityList] = useState();
	const [documentDetailsPayload, setDocumentDetailsPayload] = useState({});
	const [placeButtonFlag, setPlaceButtonFlag] = useState(false);
	// const [isFavourable, setIsFavourable] = useState(false);
	const [orderDetailsFormValues, setOrderDetailsFormValues] = useState({
		yield: null,
		orderDate: moment(sessionStorage.getItem('curDate')),
		price: null,
		faceValue: null,
		accruedInterest: null,
		broker: null,
		brokerage: null,
		transferFee: null,
		custodyFees: null,
		otherCharges: null,
		settlementValue: null,
		orderInstruction: null,
		otherInstruction: null,
		defaultCreditAccount: null
	});
	const controlStructureOtherDetails = useSelector((state) => state.pNBReducer?.controlStructure);

	const bookingBranch = useSelector((state) => state.auth.user.branch);

	const RMN = useSelector((state) => state.auth.user.userName);

	const [formValues, setFormValues] = useState({
		paymentMode: '',
		paymentDate: moment(sessionStorage.getItem('curDate')),
		bankAcc: '',
		chequeNumber: '',
		bankName: '',
		tranType: '',
		scheme: '',
		security: '',
		bookingBranch: bookingBranch ?? '',
		sourceOfFund: srcOfFund ? srcOfFund : '',
		withholdingTaxPer: '',
		remarks: ''
	});

	useEffect(() => {
		setSecuritySM(location.state.exploreSecurity);
	}, [location.state.exploreSecurity]);

	const [CSVData, setCsvData] = useState([]);
	const [errorDescription, setErrorDescription] = useState();
	const [displayAlert, setDisplayAlert] = useState(false);
	const [yieldPrice, setYieldPrice] = useState('');
	const [showLoading, setShowLoading] = useState(false);
	const [loadingMessage, setLoadingMessage] = useState('Loading...');
	const [form] = Form.useForm();
	const controlStructure = useSelector((state) => state.pNBData?.controlStructure);
	const debtSMOrder = useSelector((state) => state.pNBData?.debtSMOrder);
	const calculateStructure = useSelector((state) => state.pNBData?.calculateSMOrder);
	const [defaultBankDetails, setDefaultBankDetails] = useState({
		custodian: {
			dataValue: null,
			displayValue: null
		},
		bankAccount: null
	});
	const [notFavourable, setNotFavourable] = useState(false);
	const user = useSelector((state) => state.auth.user);
	const [accountName, setAccountName] = useState('');
	const [accName, setAccName] = useState('');
	const returnFormField = (key) => {
		return formValues[key];
	};
	const [transactionType, setTransactionType] = useState(null);

	const [exploreProductData, setExploreProductData] = useState([]);
	// ----------------------------start for document detail validation-------------------------
	const [documentRequiredField, setDocumentRequiredField] = useState({
		mandatoryCount: 0,
		required: false,
		showAlertMessage: false
	});

	const getAttachmentData = async () => {
		try {
			let resp = await getOrderAttachmentDetails('ORDERSMADD', dealId);
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

	useEffect(() => {
		if (dealId)
			getSMOrderDetailsByID(dealId).then((response) => {
				let smData = response.data.dealRequisitions;
				console.log('smData', smData);
				setTransactionType(smData?.tranType);
				setClientId(smData?.clientId);
				setSchemeAD(smData?.scheme);
				setSecuritySM(smData?.security);
				setIssuerSM(smData?.issuer);
				// console.log("Chq Date - >", smData?.chqDate);
				handleFormValues({
					// clientId: smData?.customerName,
					clientId: smData?.clientId,
					selectedAccount: smData?.schemeName,
					issuer: smData?.issuer,
					security: smData?.security,
					orderDate: moment(sessionStorage.getItem('curDate')),
					//   price: smData.appAmount,
					applicationQuantity: smData?.eligUnits,
					applicationAmount: smData?.fcyTotPaid,
					dpAccNo: smData?.dpAccountNo,
					broker: smData?.broker,
					brokerage: smData?.fcyBrkCommn,
					interestRate: smData?.interest,
					settlementValue: smData?.fcyNettVal,
					defaultCreditAccount: smData?.bankAccForINM,
					custodian: '',
					paymentMode: smData?.instrType,
					paymentDate: smData?.chqDate ? moment(smData?.chqDate) : null,
					// paymentDate: "",
					bankAcc: smData?.account,
					chequeNumber: smData?.chqNumber,
					bankName: smData?.bank,
					sourceOfFund: srcOfFund,
					freshFunds: smData?.freshSchemeYn,
					source: smData?.sourceUserId,
					otherSource: smData?.OthSource,
					designation: smData?.othDesignation,
					emailId: smData?.emailId,
					mailingAddress: smData?.AddressOthYn,
					nocdCode: '',
					remarks: smData?.remarks,
					yield: smData?.purYield,
					price: smData?.rate,
					faceValue: parseFloat(smData?.fcyGrossVal),
					accruedInterest: smData?.fcyGrossInt,
					orderInstruction: smData?.orderInstruction,
					otherInstruction: smData?.otherInstruction,
					custodyFees: smData?.fcyCustchrg,
					transferFee: smData?.fcyTransChrg,
					tranType: smData?.tranType
				});
				let updateObj = {
					valueDate: moment(sessionStorage.getItem('curDate')).format('YYYY-MM-DD'),
					fcyGrossVal: parseFloat(smData?.faceValue),
					orderInstruction: smData?.orderInstruction,
					otherInstruction: smData?.otherInstruction,
					security: smData?.security,
					purYield: smData?.purYield,
					rate: smData?.rate,
					branch: smData?.branchName
				};

				setDocumentData({
					DocumentInfo: response.data.uploadedDocInfo.lstDocumentInfo
				});

				store.dispatch(setSecondaryOrder({ ...updateObj }));
				let sss = {
					date: orderDetailsFormValues.orderDate,
					secondaryOrderData: secondaryOrderData,
					client: {
						firstName: smData?.customerName,
						lastname: smData?.lastName,
						middleName: smData?.middleName
					},
					pnb: location?.state?.buySell || smData?.tranTypeName?.toUpperCase()
				};
				store.dispatch(setPrintSofData(sss));
				executegGetJointHolderDetails(smData?.scheme);
			});
	}, [dealId]);
	// ----------------------------end for document detail validation-------------------------

	// ----------------------------start for document detail validation-------------------------

	const checkDocMandatory = () => {
		if (Array.isArray(documentData?.DocumentInfo) && documentData?.DocumentInfo?.length > 0) {
			let countVal = 0;
			documentData?.DocumentInfo.map((_) => {
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
		if (documentData?.DocumentInfo?.length > 0) {
			checkDocMandatory();
		}
	}, [documentData?.DocumentInfo]);
	// ----------------------------end for document detail validation-------------------------

	useEffect(() => {
		let sss = {
			date: orderDetailsFormValues.orderDate,
			secondaryOrderData: secondaryOrderData,
			client: client,
			pnb: location?.state?.buySell
		};
		store.dispatch(setPrintSofData(sss));
	}, [orderDetailsFormValues.orderDate, secondaryOrderData, client, location?.state?.buySell]);

	const handlePrint2 = () => {
		let sss = {
			date: orderDetailsFormValues.orderDate,
			secondaryOrderData: secondaryOrderData,
			client: client,
			pnb: location?.state?.buySell
		};

		//history.push("/sofForm", "_blank");
		// document.title = `SOF_${moment(orderDetailsFormValues.orderDate).format("DD-MM-YYYY")}`;
		window.open('/sofForm', '_blank');
		store.dispatch(setPrintSofData(sss));
	};

	const componentRef = useRef();
	const componentRefCalc = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current
	});
	const handlePrintcalc = useReactToPrint({
		content: () => componentRefCalc.current
	});

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
						fileType: file.fileType,
						mimeType: file.mimetype,
						fileString: file.fileString,
						attachmentFor: 'Attachments',
						attachedBy: user && user.userName,
						sessionId: file.SessionId,
						refType: 'ORDERSMADD',
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
	const selectValues = (keyField) => {
		let filtered = csAvailable
			? Object.values(controlStructure)?.filter((e) => e.keyField === keyField)
			: [];

		if (filtered?.length > 0) {
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
	const onCalculate = () => {
		let updateObj;
		updateObj = {
			dealRequisition: {
				IsSecuritySuitability: securityList?.isSecuritySuitability,
				scheme: secondaryOrderData.scheme,
				security: secondaryOrderData.security,
				tranType: secondaryOrderData.tranType,
				rate: yieldPrice === 'Y' ? 0 : parseFloat(orderDetailsFormValues?.price),
				assetType: secondaryOrderData.assetType,
				broker: orderDetailsFormValues.broker,
				account: orderDetailsFormValues.defaultCreditAccount,
				currency: debtSMOrder.currency,
				accCurrency: debtSMOrder.accCurrency,
				fcyGrossVal: parseFloat(orderDetailsFormValues?.faceValue),
				faceValue: parseFloat(debtSMOrder?.faceValue),
				interest: parseFloat(debtSMOrder?.interest),
				matDate: debtSMOrder.matDate,
				quoteBasis: yieldPrice,
				xirrType: 'Y',
				purYield: yieldPrice == 'P' ? 0 : parseFloat(orderDetailsFormValues.yield),
				priceOrYield: yieldPrice,
				fcyBrkCommn: parseFloat(orderDetailsFormValues.brokerage),
				orgFcyBrkCommn: parseFloat(orderDetailsFormValues.brokerage),
				fcyTransChrg: parseFloat(orderDetailsFormValues.transferFee),
				fcyCustChrg: parseFloat(orderDetailsFormValues.custodyFees),
				fcyGrossInt: parseFloat(orderDetailsFormValues.accruedInterest),
				recompYN: debtSMOrder.recompYN,
				defaultCreditAccount: orderDetailsFormValues.bankAccForINM
			}
		};
		if (securityList?.security?.discounted === 'Y') {
			if (formValues.tranType === 'BUY') {
				// console.log("tranType", tranType);
				setCsvData(excelData);
			} else {
				setCsvData(excelData2);
			}
		} else if (securityList?.security?.intYN === 'Y' && formValues.transactionType === 'BUY') {
			setCsvData(excelData3);
		} else {
			setCsvData(excelData4);
		}
		console.log('udate obg', updateObj);
		setShowLoading(true);
		setLoadingMessage(() => (
			<center>
				<LoadingOutlined style={{ fontSize: '5rem' }} />
			</center>
		));

		executeCalculateSMOrder(updateObj).then((response) => {
			if (response.status === 200 || response.data.success === true) {
				store.dispatch(setCalculateSMOrder(response.data));
				store.dispatch(setSMCalculator({ recompYN: 'N' }));
				setNotFavourable(false);
				setLoadingMessage(`Required values calculated successfully`);
				setTimeout(() => {
					setShowLoading(false);
					// history.goBack();
				}, 1500);
			} else {
				setLoadingMessage(`Unfortunately, unable to calculate, please check selected/input values`);
				setTimeout(() => {
					setShowLoading(false);
				}, 2000);
				setDisplayAlert(true);
			}
		});
		// executeCalculateSMOrder(updateObj);
	};

	const handleFormValues = (obj) => {
		setFormValues({ ...formValues, ...obj });
		setOrderDetailsFormValues({ ...orderDetailsFormValues, ...obj });
	};

	const onSelectClient = (client) => {
		setClient(client);
	};

	const [prevDate, setPrevDate] = useState(sessionStorage.getItem('prevDate'));
	const [userID, setUserID] = useState(sessionStorage.getItem('userID'));
	const [securityHoldings, setSecurityHoldings] = useState([]);

	useEffect(() => {
		if (formValues.scheme && formValues.tranType && formValues.security) {
			const payload = {
				CustomerID: formValues.clientId,
				// CustomerID: "JOE",
				// assetTab: "ORD",
				assetTab: activeTab,
				businessDate: moment(prevDate).format('YYYY-MM-DD'),
				scheme: formValues.scheme,
				// security: "PHPSEC",
				security: formValues.security,
				userID: userID
			};
			getSecurityDetail(payload).then((res) => setSecurityHoldings(res.data));
		}
	}, [formValues.scheme, formValues.security, formValues.tranType]);

	useEffect(() => {
		if (formValues.scheme && formValues.tranType && formValues.security) {
			executeGetDefaultBankAccountAndCustodian(
				formValues.scheme,
				formValues.security,
				formValues.tranType
			).then((res) => setDefaultBankDetails(res.data));
		}
	}, [formValues.scheme, formValues.security, formValues.tranType]);

	useEffect(() => {
		if (defaultBankDetails) {
			handleFormValues({
				custodian: defaultBankDetails.custodian?.dataValue ?? '',
				bankAcc: defaultBankDetails.bankAccount?.dataValue ?? '',
				defaultCreditAccount: defaultBankDetails.bankAccount?.dataValue ?? ''
			});
		}
	}, [defaultBankDetails]);

	useEffect(() => {
		const setDefaultPrice = (payload) => {
			if (payload?.data?.OrderType === 'BUY') {
				return securityList?.security?.buyOfferPrice;
			}
			if (payload?.data?.OrderType === 'SELL') {
				return securityList?.security?.sellOfferPrice;
			}
		};

		if (yieldPrice && yieldPrice === 'P') {
			setOrderDetailsFormValues({
				...orderDetailsFormValues,
				price: setDefaultPrice(documentDetailsPayload)
			});
		}
	}, [yieldPrice]);

	useEffect(() => {
		if (
			calculateStructure &&
			calculateStructure.dealRequisition &&
			calculateStructure.dealRequisition != null
		) {
			setOrderDetailsFormValues({
				...orderDetailsFormValues,
				price: calculateStructure.dealRequisition.rate,
				yield: calculateStructure.dealRequisition.purYield,
				brokerage: calculateStructure.dealRequisition.fcyBrkCommn,
				custodyFees: calculateStructure.dealRequisition.fcyCustchrg,
				transferFee: calculateStructure.dealRequisition.fcyTransChrg,
				defaultCreditAccount: defaultBankDetails?.bankAccount?.displayValue,
				accruedInterest: calculateStructure.dealRequisition.fcyGrossInt,
				settlementValue: calculateStructure.dealRequisition.fcyNettVal,
				withholdingTaxPer: calculateStructure.dealRequisition.fcyVatFee
			});
			setFormValues({
				...formValues,
				withholdingTaxPer: calculateStructure.dealRequisition.fcyVatFee
			});
		}
	}, [calculateStructure]);
	const RENDER_CARDS = [
		{
			title: 'Account Details',
			component: (
				<AccountDetails
					setUserBankAccOptions={setUserBankAccOptions}
					setSrcOfFund={setSrcOfFund}
					returnValidators={returnValidators}
					clientId={clientId}
					handleFormValues={handleFormValues}
					onSelectClient={onSelectClient}
					setAccountName={setAccountName}
					setAccName={setAccName}
					schemeAD={schemeAD}
					action={dealId ? 'edit' : 'add'}
					formValues={formValues}
					// orderDetailsFormValues={orderDetailsFormValues}
				/>
			)
		},
		{
			title: 'Order Type',
			component: (
				<OrderType
					buySell={location.state?.buySell}
					selectValues={selectValues}
					returnValidators={returnValidators}
					formValues={formValues}
					handleFormValues={handleFormValues}
					transactionType={transactionType}
					exploreProductData={exploreProductData}
				/>
			)
		},
		{
			title: 'Security Details',
			component: (
				<SecurityDetails
					selectValues={selectValues}
					marketType='Secondary'
					clientId={clientId}
					setSecurityList={setSecurityList}
					returnValidators={returnValidators}
					setPlaceButtonFlag={setPlaceButtonFlag}
					handleFormValues={handleFormValues}
					returnFormField={returnFormField}
					issuerSM={issuerSM}
					securitySM={securitySM}
					stockHoldings={securityHoldings?.securityDetail}
					whichInvestment={whichInvestment}
				/>
			)
		},
		{
			title: 'Order Details',
			component: (
				<OrderDetails
					form={form}
					selectValues={selectValues}
					returnValidators={returnValidators}
					bankAccOptions={bankAccOptions}
					onCalculate={onCalculate}
					formValues={orderDetailsFormValues}
					setFormValues={setOrderDetailsFormValues}
					yieldPrice={yieldPrice}
					setYieldPrice={setYieldPrice}
					setNotFavourable={setNotFavourable}
					notFavourable={notFavourable}
					handleFormValues={handleFormValues}
					controlStructure={controlStructure}
				/>
			)
		},
		{
			title: 'Payment Details',
			component: (
				<PaymentDetails
					form={form}
					selectValues={selectValues}
					bankAccOptions={bankAccOptions}
					returnValidators={returnValidators}
					formValues={formValues}
					handleFormValues={handleFormValues}
					controlStructure={controlStructure}
				/>
			)
		},
		{
			title: 'Other Details',
			component: (
				<OtherDetails
					selectValues={selectValues}
					returnValidators={returnValidators}
					formValues={formValues}
					setFormValues={setFormValues}
					controlStructureOtherDetails={controlStructureOtherDetails}
				/>
			)
		}
	];

	useEffect(() => {
		form.setFieldsValue({ ...orderDetailsFormValues });
		form.validateFields();
	}, [orderDetailsFormValues, form]);

	useEffect(() => {
		form.setFieldsValue(formValues);
		form.validateFields();
	}, [formValues, form]);

	useEffect(() => {
		csAvailable === false &&
			executeControlStructure().then(() => {
				setCSActive(true);
			});
		executeExploreProduct({
			//  BusinessDate:"2021-12-07",
			BusinessDate: moment(sessionStorage?.getItem('prevDate'))?.format('YYYY-MM-DD'),
			MarketType: 'ORDERSMADD',
			AssetGroup: activeTab
		}).then((res) => {
			// console.log("response data-------------------",res)
			setExploreProductData(res);
		});
	}, [csAvailable]);

	const secondaryOrderData = useSelector((state) => {
		return state.pNBData?.secondaryOrder;
	});

	const handleDocFormChange = (values) => {
		setDocumentData({ ...documentData, ...values });
	};

	const onSubmitForm = () => {
		const reqObj = {
			// dealRequisition: secondaryOrderData ? secondaryOrderData : "",

			dealRequisition: secondaryOrderData
				? // ? { ...secondaryOrderData, dealId: dealId ?? "" }
				  {
						...secondaryOrderData,
						dealId: dealId ?? '',
						IsSecuritySuitability: securityList?.isSecuritySuitability
				  }
				: '',
			// documentInfo: documentData.length > 0 ? documentData : {},
			// documentInfo: { lstDocumentInfo: documentData?.DocumentInfo },
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
					history.goBack();
				}, 1500);
			} else {
				setLoadingMessage(`Unfortunately, unable to place order`);
				setTimeout(() => {
					setShowLoading(false);
				}, 2000);
				setDisplayAlert(true);
				setPlaceButtonFlag(false);
			}
		});
	};
	const onFinishFailed = () => {
		setDisplayAlert(true);
		setErrorDescription('Mandatory field/s are blank!');
	};
	useEffect(() => {
		if (securityList && securityList.security) {
			// let documentDetailsPayload = {};
			// documentDetailsPayload.AssetType = securityList.security.assetType;
			// documentDetailsPayload.OrderType = secondaryOrderData.tranType;
			// documentDetailsPayload.IsSecuritySuitability = securityList.isSecuritySuitability;
			// documentDetailsPayload.ClientId = clientId;
			// documentDetailsPayload.Scheme = secondaryOrderData.scheme;
			// setDocumentDetailsPayload(documentDetailsPayload);
			let newDocumentRequestObject;
			newDocumentRequestObject = {
				data: {
					AssetType: securityList?.security.assetType || null,
					OrderType: secondaryOrderData?.tranType || null,
					IsSecuritySuitability: securityList?.isSecuritySuitability,
					ClientId: formValues.clientId || null,
					Scheme: secondaryOrderData?.scheme || null,
					RefID: dealId || '',
					RefType: 'ORDERSMADD' || ''
				}
			};
			setDocumentDetailsPayload(newDocumentRequestObject);
		}
	}, [securityList]);

	const checkDocValidations = () => {
		if (documentRequiredField.required) {
			setDocumentRequiredField({
				...documentRequiredField,
				showAlertMessage: true
			});
			// form.validateFields().then(()=>{}).catch((err)=>{setRequiredFiled(true)})
		} else {
			onSubmitForm();
		}
	};

	// const downloadRecords = () => {
	//   const downloadData = () => ({
	//     "ISIN" : securityList?.security?.isinCode,
	//   })
	//   exportJSON(downloadData, "SM Calculator");
	// }

	const dateFormat = 'DD-MM-YYYY';
	const momentDiff = (prev, next) => {
		let prevDate = prev;
		let nextDate = next;
		if (typeof prev === 'string') {
			prevDate = moment(prev);
		}

		if (typeof next === 'string') {
			nextDate = moment(next);
		}

		if (prev && next) {
			return prevDate.diff(nextDate, 'days');
		}
		return '';
	};
	const fileName = 'SMCalculator';

	// if(securityList?.security?.discounted === "Y"){
	//   if(formValues.tranType === "BUY") {
	const excelData = [
		{ id: 'Transaction', name: formValues.tranType },
		{ id: 'Security Name', name: securityList?.security?.securityName },
		{ id: 'Account Name', name: accName },
		{ id: 'RM Name', name: RMN ?? '' },
		{ id: '', name: '' },
		{
			id: 'Original Term',
			name:
				`${momentDiff(securityList?.security?.matDate, securityList?.security?.basisDate)} days` ??
				'0 days'
		},
		{
			id: 'Remaining Term',
			name:
				`${momentDiff(securityList?.security?.matDate, orderDetailsFormValues?.orderDate)} days` ??
				'0 days'
		},
		{
			id: 'Trade Date',
			name: orderDetailsFormValues?.orderDate
				? moment(orderDetailsFormValues?.orderDate).format(dateFormat)
				: ''
		},
		{
			id: 'Settlement Date',
			name: moment(calculateStructure?.dealRequisition?.delDate).format(dateFormat)
		},
		{ id: 'Face Value', name: orderDetailsFormValues?.faceValue },
		{
			id: 'Principal',
			name:
				orderDetailsFormValues?.price *
					(orderDetailsFormValues?.faceValue / securityList?.security?.faceValue) ?? ''
		},
		{ id: "Add: Broker's Fee", name: orderDetailsFormValues?.brokerage },
		{ id: 'Total Proceeds', name: orderDetailsFormValues?.settlementValue },
		{
			id: 'Advanced Interest',
			name: orderDetailsFormValues?.faceValue - orderDetailsFormValues?.settlementValue
		},
		{
			id: 'Gross Effective Yield',
			name: (
				100 *
				((((orderDetailsFormValues?.faceValue - orderDetailsFormValues?.settlementValue) /
					orderDetailsFormValues?.settlementValue) *
					360) /
					momentDiff(securityList?.security?.matDate, orderDetailsFormValues?.orderDate)) *
				(1 - formValues?.withholdingTaxPer / 100)
			).toFixed(4)
		},
		{
			id: 'Net Effective Yield',
			name: (
				(100 *
					(((orderDetailsFormValues?.faceValue - orderDetailsFormValues?.settlementValue) /
						orderDetailsFormValues?.settlementValue) *
						360)) /
				momentDiff(securityList?.security?.matDate, orderDetailsFormValues?.orderDate)
			).toFixed(4)
		},
		{
			id: 'Maturity Value Check',
			name:
				securityList?.security?.faceValue *
				(orderDetailsFormValues?.faceValue / securityList?.security?.faceValue)
		}
	];

	const excelData2 = [
		{ id: 'Transaction', name: formValues.tranType },
		{ id: 'Security Name', name: securityList?.security?.securityName },
		{ id: 'Account Name', name: accName },
		{ id: 'RM Name', name: RMN ?? '' },
		{ id: '', name: '' },
		{
			id: 'Original Term',
			name:
				`${momentDiff(securityList?.security?.matDate, securityList?.security?.basisDate)} days` ??
				'0 days'
		},
		{
			id: 'Remaining Term',
			name:
				`${momentDiff(securityList?.security?.matDate, orderDetailsFormValues?.orderDate)} days` ??
				'0 days'
		},
		{
			id: 'Trade Date',
			name: orderDetailsFormValues?.orderDate
				? moment(orderDetailsFormValues?.orderDate).format(dateFormat)
				: ''
		},
		{
			id: 'Settlement Date',
			name: moment(calculateStructure?.dealRequisition?.delDate).format(dateFormat)
		},
		{ id: 'Face Value', name: orderDetailsFormValues?.faceValue },
		{
			id: 'Principal',
			name:
				orderDetailsFormValues?.price *
					(orderDetailsFormValues?.faceValue / securityList?.security?.faceValue) ?? ''
		},
		{ id: "Add: Broker's Fee", name: orderDetailsFormValues?.brokerage },
		{ id: 'Total Proceeds', name: orderDetailsFormValues?.settlementValue }
	];

	const excelData3 = [
		{ id: 'Transaction', name: formValues.tranType },
		{ id: 'Security Name', name: securityList?.security?.securityName },
		{ id: 'Account Name', name: accName },
		{ id: 'RM Name', name: RMN ?? '' },
		{ id: '', name: '' },
		{ id: 'Net Price', name: orderDetailsFormValues.price },
		{
			id: 'Original Term',
			name:
				`${momentDiff(securityList?.security?.matDate, securityList?.security?.basisDate)} days` ??
				'0 days'
		},
		{
			id: 'Remaining Term',
			name:
				`${momentDiff(securityList?.security?.matDate, orderDetailsFormValues?.orderDate)} days` ??
				'0 days'
		},
		{
			id: 'Accrued Term',
			name:
				`${momentDiff(orderDetailsFormValues?.orderDate, securityList?.security?.lastIP)} days` ??
				'0 days'
		},
		{
			id: 'Trade Date',
			name: orderDetailsFormValues?.orderDate
				? moment(orderDetailsFormValues?.orderDate).format(dateFormat)
				: ''
		},
		{
			id: 'Settlement Date',
			name: moment(calculateStructure?.dealRequisition?.delDate).format(dateFormat)
		},
		{
			id: 'Value Date',
			name: orderDetailsFormValues?.orderDate
				? moment(orderDetailsFormValues?.orderDate).format(dateFormat)
				: ''
		},
		{ id: 'Face Value', name: orderDetailsFormValues?.faceValue },
		{
			id: 'Principal',
			name:
				orderDetailsFormValues?.price *
					(orderDetailsFormValues?.faceValue / securityList?.security?.faceValue) ?? ''
		},
		{
			id: 'Add: Net Accrued Interest',
			name: orderDetailsFormValues?.accruedInterest
		},
		{ id: 'Transfer Fee', name: orderDetailsFormValues?.transferFee },
		{ id: "Add: Broker's Fee", name: orderDetailsFormValues?.brokerage },
		{ id: 'Total Proceeds', name: orderDetailsFormValues?.settlementValue },
		{
			id: 'Coupon Amount',
			name: calculateStructure?.dealRequisition?.couponAmt
		},
		{
			id: 'Remaining number of Coupon Payments',
			name: calculateStructure?.dealRequisition?.couponCnt
		},
		{
			id: 'Total Coupons Received',
			name:
				calculateStructure?.dealRequisition?.couponAmt *
				calculateStructure?.dealRequisition?.couponCnt
		},
		{
			id: 'Total Coupons + FV',
			name:
				calculateStructure?.dealRequisition?.couponAmt *
					calculateStructure?.dealRequisition?.couponCnt +
				orderDetailsFormValues?.faceValue
		},
		{
			id: 'Gross Effective Yield',
			name: (
				100 *
				(((((orderDetailsFormValues.faceValue *
					(securityList?.security?.interestRate / 100) *
					(1 - formValues.withholdingTaxPer / 100) *
					180) /
					360) *
					calculateStructure?.dealRequisition?.couponCnt +
					orderDetailsFormValues.faceValue -
					orderDetailsFormValues.settlementValue) *
					360) /
					(orderDetailsFormValues.settlementValue *
						momentDiff(securityList?.security?.matDate, securityList?.security?.orderDate))) *
				(1 - formValues.withholdingTaxPer / 100)
			).toFixed(4)
		},
		{
			id: 'Net Effective Yield',
			name: (
				100 *
				(((((orderDetailsFormValues.faceValue *
					(securityList?.security?.interestRate / 100) *
					(1 - formValues.withholdingTaxPer / 100) *
					180) /
					360) *
					calculateStructure?.dealRequisition?.couponCnt +
					orderDetailsFormValues.faceValue -
					orderDetailsFormValues.settlementValue) *
					360) /
					(orderDetailsFormValues.settlementValue *
						momentDiff(securityList?.security?.matDate, securityList?.security?.orderDate)))
			).toFixed(4)
		},
		{
			id: 'Maturity Value Check',
			name:
				calculateStructure?.dealRequisition?.couponAmt *
					calculateStructure?.dealRequisition?.couponCnt +
				orderDetailsFormValues?.faceValue
		}
	];

	const excelData4 = [
		{ id: 'Transaction', name: formValues.tranType },
		{ id: 'Security Name', name: securityList?.security?.securityName },
		{ id: 'Account Name', name: accName },
		{ id: 'RM Name', name: RMN ?? '' },
		{ id: '', name: '' },
		{ id: 'Net Price', name: orderDetailsFormValues.price },
		{
			id: 'Original Term',
			name:
				`${momentDiff(securityList?.security?.matDate, securityList?.security?.basisDate)} days` ??
				'0 days'
		},
		{
			id: 'Remaining Term',
			name:
				`${momentDiff(securityList?.security?.matDate, orderDetailsFormValues?.orderDate)} days` ??
				'0 days'
		},
		{
			id: 'Accrued Term',
			name:
				`${momentDiff(orderDetailsFormValues?.orderDate, securityList?.security?.lastIP)} days` ??
				'0 days'
		},
		{
			id: 'Trade Date',
			name: orderDetailsFormValues?.orderDate
				? moment(orderDetailsFormValues?.orderDate).format(dateFormat)
				: ''
		},
		{
			id: 'Settlement Date',
			name: moment(calculateStructure?.dealRequisition?.delDate).format(dateFormat)
		},
		{
			id: 'Value Date',
			name: orderDetailsFormValues?.orderDate
				? moment(orderDetailsFormValues?.orderDate).format(dateFormat)
				: ''
		},
		{ id: 'Face Value', name: orderDetailsFormValues?.faceValue },
		{
			id: 'Principal',
			name:
				orderDetailsFormValues?.price *
					(orderDetailsFormValues?.faceValue / securityList?.security?.faceValue) ?? ''
		},
		{
			id: 'Add: Net Accrued Interest',
			name: orderDetailsFormValues?.accruedInterest
		},
		{ id: 'Transfer Fee', name: orderDetailsFormValues?.transferFee },
		{ id: "Add: Broker's Fee", name: orderDetailsFormValues?.brokerage },
		{ id: 'Total Proceeds', name: orderDetailsFormValues?.settlementValue }
	];
	// }
	// }else {

	const excelData5 = [
		{ id: 'Transaction', name: formValues.tranType },
		{ id: 'Security Name', name: securityList?.security?.securityName },
		{ id: 'Account Name', name: accName },
		{ id: 'RM Name', name: RMN ?? '' },
		{ id: '', name: '' },
		{ id: 'ISIN', name: securityList?.security?.isinCode },
		{
			id: 'Issue Date',
			name: securityList?.security?.basisDate
				? moment(securityList?.security?.basisDate).format(dateFormat)
				: ''
		},
		{
			id: 'Maturity Date',
			name: securityList?.security?.matDate
				? moment(securityList?.security?.basisDate).format(dateFormat)
				: ''
		},
		{ id: 'Coupon Rate', name: securityList?.security?.interestRate },
		{ id: 'Yield to Maturity', name: orderDetailsFormValues?.yield },
		{ id: 'Final Withholding Tax', name: formValues.withholdingTaxPer }
	];
	// }

	return (
		<div className='secondary-create-container'>
			<Form
				form={form}
				name='control-ref'
				// onFinish={onSubmitForm}
				onFinish={checkDocValidations}
				onFinishFailed={onFinishFailed}
				className='parent-form-container'
			>
				<TopBar
					showBackArrow={true}
					// onCancel={() => history.goBack()}
					secondaryMarket={true}
					onCancel={() => {
						history.replace('/dashboard/orderBook', {
							activeTab
						});
						store.dispatch(setCalculateSMOrder());
					}}
					screenText={`Secondary Order`}
					submitBtnText='Place Now'
					// cancelBtnText="Cancel"
					RenderCancel={
						<Button
							type='text'
							onClick={() => {
								history.replace('/dashboard/orderBook', {
									activeTab
								});
								store.dispatch(setCalculateSMOrder());
							}}
							className='btn cancel'
						>
							Cancel
						</Button>
					}
					RenderSubmit={
						<Form.Item>
							{/* <Button type="primary" className="btn submit" style={{ marginLeft: "10px" }} onClick={handlePrint}>
								Print/SOF
							</Button> */}
							<ReactToPrint
								pageStyle={`size: 2.5in 4in`}
								trigger={() => (
									<Button
										type='primary'
										className='btn submit'
										style={{ marginLeft: '10px' }}
										onClick={handlePrint}
									>
										Print/SOF
									</Button>
								)}
								content={() => componentRef.current}
								documentTitle={`SOF_${accName ? accName : ''}
                _${moment(orderDetailsFormValues?.orderDate).format('MMDDYYYY')}_${moment().format(
									`HHmmss`
								)}_${user?.userName}`}
							/>

							<ReactToPrint
								pageStyle={`size: 2.5in 4in`}
								trigger={() => (
									<Button
										type='primary'
										className='btn submit'
										style={{ marginLeft: '10px' }}
										onClick={handlePrintcalc}
										disabled={securityList ? false : true}
									>
										Print Calc
									</Button>
								)}
								content={() => componentRefCalc.current}
								documentTitle={`${client?.firstName} ${client?.lastName} Calculator`}
							/>

							<ExportCSV csvData={CSVData} fileName={fileName} />

							<Button
								type='primary'
								htmlType='submit'
								className='btn submit'
								disabled={placeButtonFlag ?? false}
								style={{ marginLeft: '10px' }}
								onClick={() => {
									store.dispatch(setCalculateSMOrder());
								}}
							>
								Place Order
							</Button>
						</Form.Item>
					}
				/>
				{displayAlert && (
					<Alert
						message='Error'
						description={errorDescription}
						type='error'
						closable
						onClose={setTimeout(() => {
							setDisplayAlert(false);
						}, 3000)}
					/>
				)}

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

				<Row>
					{RENDER_CARDS.map((ele) => {
						return (
							<Col span={24} style={styleSet.cardStyle}>
								<GenericCard
									header={ele.title}
									buttonTitle={ele.title === 'Order Details' ? 'Calculate' : ''}
									menuFlag={ele.title === 'Order Details' ? 1 : ''}
									onClick={onCalculate}
								>
									{ele.component}
								</GenericCard>
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
							// action={location?.state?.action}
							action={dealId ? 'edit' : 'add'}
							// action="edit"
							documentRequestObject={documentDetailsPayload}
							setDocumentRequiredField={setDocumentRequiredField}
							documentRequiredField={documentRequiredField}
							checkDocMandatory={checkDocMandatory}
							type='ORDERBOOK'
						/>
						{/* <DocumentCardWithUpload
							data={documentData?.lstDocumentInfo ?? []}
							docDetailsObj={documentDetailsPayload}
							securityList={securityList}
							setDocumentData={(data) => setDocumentData(data)}
						/> */}
					</Col>
				</Row>
				<AttachmentUploadModal
					selectedAccount={selectedAccount}
					isUpload={false}
					onValuesChange={handleOppFormChange}
					data={attachmentsModalDataArray}
					//   data={attachmentDetails}
				/>
				<Row>
					<BackToTop />
				</Row>
			</Form>
			<CustomModal visible={showLoading} children={<h2>{loadingMessage}</h2>} closable={false} />
			<div style={{ display: 'none' }}>
				<ComponentToPrint ref={componentRef} />
				dd
			</div>
			<div style={{ display: 'none' }}>
				<ComponentToPrintCalc
					ref={componentRefCalc}
					info={{
						...location.state,
						securityData: securityList ? securityList.security : {},
						accountName: accountName,
						formValues: { ...formValues, ...orderDetailsFormValues },
						ytm: yieldPrice
					}}
				/>
			</div>
		</div>
	);
};

export default InvestmentOrder;
