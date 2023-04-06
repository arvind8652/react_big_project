import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Form, Radio, Select, Input, Popover, Spin } from 'antd';
import { getCifValidation } from '../../../api/customerCreateApi';
import moment from 'moment';
import './CustomerTypeFormCard.scss';

import { ScRadioButton, ScRadioGroup } from '../../StyledComponents/formElements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArchive,
	faEnvelopeOpenText,
	faStepForward,
	faUnlock
} from '@fortawesome/free-solid-svg-icons';
import {
	faTrashAlt,
	faEdit,
	faChevronRight,
	faChevronLeft
} from '@fortawesome/pro-regular-svg-icons';
import { FileSearchOutlined, SyncOutlined } from '@ant-design/icons';

export default function CustomerType({
	form,
	formData,
	onValuesChange,
	rules,
	csObject,
	action = '',
	refType = '',
	setCustomerFormData = {},
	setCifRespData = {},
	cifRespData = {},
	setCifIconClickedRequired = {},
	cifIconClickedRequired = {}
}) {
	const [loader, setLoader] = useState(false);
	const handleOnValuesChange = (key, value) => {
		if ((action === 'edit' || action === 'convert') && key === 'clientId') {
			onValuesChange({ [key]: value, ['clientRequisitionN']: value });
		} else {
			onValuesChange({ [key]: value });
		}
		if (key === 'customerType') {
			onValuesChange({ [key]: value, ['sourceOfFund']: '', ['sourceOfFundsOth']: '' });
		}
		if (key === 'otherIdNo') {
			// if (value) {
			if (value && new RegExp(/^[a-zA-Z0-9]+$/)?.test(value)) {
				setCifIconClickedRequired({
					...cifIconClickedRequired,
					cifIconClickedReq: true,
					errorMessage: '',
					showPoperOverMessage: true
				});
			} else {
				setCifIconClickedRequired({
					...cifIconClickedRequired,
					cifIconClickedReq: false,
					errorMessage: '',
					showPoperOverMessage: false
				});
			}
			onValuesChange({ [key]: value, ['callCifValidator']: true });
		}
	};
	// start handleCifValidator
	const handleCifValidator = async () => {
		// setCifIconClickedRequired({
		// 	...cifIconClickedRequired,
		// 	cifIconClickedReq: false,
		// 	showPoperOverMessage: false
		// });

		if (formData?.otherIdNo && new RegExp(/^[a-zA-Z0-9]+$/)?.test(formData?.otherIdNo)) {
			setLoader(true);
			try {
				let response = await getCifValidation(
					formData.id,
					formData?.otherIdNo,
					action,
					refType,
					formData?.clientRequisitionN
				);
				handleOnValuesChange('qib', response.data?.field1);
				if (!response.data.success) {
					form.setFieldsValue({
						otherIdNo: {
							value: formData?.otherIdNo,
							errors: [new Error(response.data.message)]
						}
					});
					setLoader(false);
					setCifIconClickedRequired({
						...cifIconClickedRequired,
						errorMessage: response.data.message,
						cifIconClickedReq: false,
						showPoperOverMessage: false
					});
					return Promise.reject(new Error(response.data.message));
				} else {
					setLoader(false);
					setCifIconClickedRequired({
						...cifIconClickedRequired,
						errorMessage: '',
						cifIconClickedReq: false,
						showPoperOverMessage: false
					});
					let clientRequisitionData = response?.data?.clientRequisition;
					let riskProfileModelData = response?.data?.riskProfileModel;
					if (
						clientRequisitionData !== null &&
						clientRequisitionData !== ''
						// below line may be useful in future
						// && formData?.callCifValidator === true
					) {
						let dataObject = { ...formData };
						// let dataObject = {
						// 	callCifValidator: formData?.callCifValidator,
						// 	customerType: formData?.customerType,
						// 	category: formData?.category,
						// 	title: formData?.title,
						// 	placeHolder: formData?.placeHolder,
						// 	titleCondition: formData?.titleCondition,
						// 	reference: formData?.reference,
						// 	event: formData?.event,
						// 	socialList: {
						// 		dialCode: '+63',
						// 		alternateDialCode: '+63'
						// 	},
						// 	nationality: '01',
						// 	country: 'PH',
						// 	mailCountry: 'PH',
						// 	permCountry: 'PH',
						// 	compCountry: 'PH',

						// 	currency: 'PHP',
						// 	custRelMgr: formData?.custRelMgr,
						// 	bankAccbranch: formData?.bankAccbranch,
						// 	relationDetail: [],
						// 	miscellaneous: [],
						// 	isSecuritySuitability: true,
						// 	sourcedBy: formData?.sourcedBy,
						// 	refType: formData?.refType,
						// 	otherIdNo: formData?.otherIdNo
						// };
						for (const prop in clientRequisitionData) {
							if (
								clientRequisitionData[prop] !== '' &&
								clientRequisitionData[prop] !== null &&
								clientRequisitionData[prop] !== undefined
							) {
								dataObject[`${prop}`] = clientRequisitionData[prop];
							}
						}

						if (clientRequisitionData?.natureofbusiness !== null) {
							dataObject.natureOfBusiness = clientRequisitionData?.natureofbusiness;
						}
						if (clientRequisitionData?.residentStatus !== null) {
							dataObject.residentialStatus = clientRequisitionData?.residentStatus;
						}
						if (clientRequisitionData?.amla !== null) {
							dataObject.Amla = clientRequisitionData?.amla;
						}
						if (clientRequisitionData?.investmentValue !== null) {
							dataObject.InvestmentValue = clientRequisitionData?.investmentValue?.toString();
							dataObject.investmentValue = clientRequisitionData?.investmentValue?.toString();
						}
						if (clientRequisitionData?.sourceNetworth !== null) {
							dataObject.sourceOfFund = clientRequisitionData?.sourceNetworth;
						}
						if (clientRequisitionData?.mailstate !== null) {
							dataObject.mailState = clientRequisitionData?.mailstate;
						}
						if (clientRequisitionData?.isblanketWaiver !== null) {
							dataObject.isBlanketWaiver = clientRequisitionData?.isblanketWaiver;
						}
						if (clientRequisitionData?.qibName !== null) {
							dataObject.qib = clientRequisitionData?.qibName;
						}
						if (clientRequisitionData?.clientRequisitionN !== null) {
							dataObject.clientRequisitionN = clientRequisitionData?.clientRequisitionN;
						}
						dataObject.titleCondition = clientRequisitionData?.gender;
						dataObject.title = clientRequisitionData?.title;

						if (
							clientRequisitionData?.mailAdd1 !== null &&
							clientRequisitionData?.mailCountry !== null &&
							clientRequisitionData?.mailstate !== null &&
							clientRequisitionData?.mailCity !== null &&
							clientRequisitionData?.mailAddPin !== null &&
							clientRequisitionData?.mailAdd1 === clientRequisitionData?.permAdd1 &&
							clientRequisitionData?.mailCountry === clientRequisitionData?.permCountry &&
							clientRequisitionData?.mailstate === clientRequisitionData?.permanentState &&
							clientRequisitionData?.mailCity === clientRequisitionData?.permCity &&
							clientRequisitionData?.mailAddPin === clientRequisitionData?.permAddPin
						) {
							dataObject.disablePrermanentAddressField = true;
						} else {
							dataObject.disablePrermanentAddressField = false;
						}
						dataObject.customerType = clientRequisitionData?.customerType
							? clientRequisitionData?.customerType
							: formData?.customerType;
						dataObject.reference = clientRequisitionData?.reference
							? clientRequisitionData?.reference
							: formData?.reference;
						dataObject.clientId = formData?.clientId;

						dataObject.nationality = clientRequisitionData?.nationality
							? clientRequisitionData?.nationality
							: formData?.nationality;
						dataObject.country = clientRequisitionData?.country
							? clientRequisitionData?.country
							: formData?.country;
						dataObject.mailCountry = clientRequisitionData?.mailCountry
							? clientRequisitionData?.mailCountry
							: formData?.mailCountry;
						dataObject.permCountry = clientRequisitionData?.permCountry
							? clientRequisitionData?.permCountry
							: formData?.permCountry;
						dataObject.currency = clientRequisitionData?.currency
							? clientRequisitionData?.currency
							: formData?.currency;
						dataObject.socialList = {
							dialCode: clientRequisitionData?.dialCode
								? clientRequisitionData?.dialCode
								: formData?.socialList?.dialCode,
							alternateDialCode: clientRequisitionData?.alternateDialCode
								? clientRequisitionData?.alternateDialCode
								: formData?.socialList?.alternateDialCode
						};
						dataObject.dob = clientRequisitionData?.dateOfBirth
							? moment(clientRequisitionData?.dateOfBirth, 'YYYY-MM-DD')
							: formData?.dob
							? moment(formData?.dob, 'YYYY-MM-DD')
							: null;
						dataObject.dateOfBirth = clientRequisitionData?.dateOfBirth
							? moment(clientRequisitionData?.dateOfBirth, 'YYYY-MM-DD')
							: formData?.dob
							? moment(formData?.dob, 'YYYY-MM-DD')
							: null;
						dataObject.cifRelatedclientRequisitionData = true;
						if (riskProfileModelData !== null && riskProfileModelData !== '') {
							dataObject.riskProfileModel = riskProfileModelData;
						}
						dataObject.cifDataOnEdit = true;
						setCustomerFormData(dataObject);
						form.setFieldsValue(dataObject);
						setCifRespData(dataObject);
					}

					// ---------------------------------------------------------==========------------------------
					return Promise.resolve();
				}
			} catch (error) {
				setLoader(false);
				setCifIconClickedRequired({
					...cifIconClickedRequired,
					errorMessage: '',
					cifIconClickedReq: false,
					showPoperOverMessage: false
				});

				console.log('error data-----------', error);
			}
		} else {
			setLoader(false);
			setCifIconClickedRequired({
				...cifIconClickedRequired,
				errorMessage: '',
				cifIconClickedReq: false,
				showPoperOverMessage: false
			});

			return Promise.resolve();
		}
	};
	// end handleCifValidator

	// THIS IS FOR PNB_UAT-1917368 (CIF valiadation)
	const cifValidator = async (rule, value, callback) => {
		if (value) {
			try {
				let response = await getCifValidation(
					formData.id,
					value,
					action,
					refType,
					formData?.clientRequisitionN
				);
				handleOnValuesChange('qib', response.data?.field1);
				if (!response.data.success) {
					return Promise.reject(new Error(response.data.message));
				} else {
					let clientRequisitionData = response?.data?.clientRequisition;
					if (
						clientRequisitionData !== null &&
						clientRequisitionData !== '' &&
						formData?.callCifValidator === true
					) {
						let dataObject = { ...formData };
						for (const prop in clientRequisitionData) {
							if (
								clientRequisitionData[prop] !== '' &&
								clientRequisitionData[prop] !== null &&
								clientRequisitionData[prop] !== undefined
							) {
								dataObject[`${prop}`] = clientRequisitionData[prop];
							}
						}

						if (clientRequisitionData?.natureofbusiness !== null) {
							dataObject.natureOfBusiness = clientRequisitionData?.natureofbusiness;
						}
						if (clientRequisitionData?.residentStatus !== null) {
							dataObject.residentialStatus = clientRequisitionData?.residentStatus;
						}
						if (clientRequisitionData?.amla !== null) {
							dataObject.Amla = clientRequisitionData?.amla;
						}
						if (clientRequisitionData?.investmentValue !== null) {
							dataObject.InvestmentValue = clientRequisitionData?.investmentValue;
						}
						if (clientRequisitionData?.sourceNetworth !== null) {
							dataObject.sourceOfFund = clientRequisitionData?.sourceNetworth;
						}
						if (clientRequisitionData?.mailstate !== null) {
							dataObject.mailState = clientRequisitionData?.mailstate;
						}
						if (clientRequisitionData?.isblanketWaiver !== null) {
							dataObject.isBlanketWaiver = clientRequisitionData?.isblanketWaiver;
						}
						if (clientRequisitionData?.qibName !== null) {
							dataObject.qib = clientRequisitionData?.qibName;
						}
						if (clientRequisitionData?.clientRequisitionN !== null) {
							dataObject.clientRequisitionN = clientRequisitionData?.clientRequisitionN;
						}
						dataObject.titleCondition = clientRequisitionData?.gender;
						dataObject.title = clientRequisitionData?.title;
						// dataObject.titleCondition =
						// 	clientRequisitionData?.title === 'MR'
						// 		? 'M'
						// 		: clientRequisitionData?.title === 'MS'
						// 		? 'F'
						// 		: clientRequisitionData?.title === null || ''
						// 		? 'M'
						// 		: 'A';
						// dataObject.title =
						// 	clientRequisitionData?.title === 'MR'
						// 		? 'MR|M'
						// 		: clientRequisitionData?.title === 'MS'
						// 		? 'MS|F'
						// 		: clientRequisitionData?.title === null || ''
						// 		? 'MR|M'
						// 		: `${clientRequisitionData?.title}|A`;

						if (
							clientRequisitionData?.mailAdd1 !== null &&
							clientRequisitionData?.mailCountry !== null &&
							clientRequisitionData?.mailstate !== null &&
							clientRequisitionData?.mailCity !== null &&
							clientRequisitionData?.mailAddPin !== null &&
							clientRequisitionData?.mailAdd1 === clientRequisitionData?.permAdd1 &&
							clientRequisitionData?.mailCountry === clientRequisitionData?.permCountry &&
							clientRequisitionData?.mailstate === clientRequisitionData?.permanentState &&
							clientRequisitionData?.mailCity === clientRequisitionData?.permCity &&
							clientRequisitionData?.mailAddPin === clientRequisitionData?.permAddPin
						) {
							dataObject.disablePrermanentAddressField = true;
						} else {
							dataObject.disablePrermanentAddressField = false;
						}
						dataObject.customerType = clientRequisitionData?.customerType
							? clientRequisitionData?.customerType
							: formData?.customerType;
						dataObject.reference = clientRequisitionData?.reference
							? clientRequisitionData?.reference
							: formData?.reference;
						dataObject.clientId = formData?.clientId;

						dataObject.nationality = clientRequisitionData?.nationality
							? clientRequisitionData?.nationality
							: formData?.nationality;
						dataObject.country = clientRequisitionData?.country
							? clientRequisitionData?.country
							: formData?.country;
						dataObject.mailCountry = clientRequisitionData?.mailCountry
							? clientRequisitionData?.mailCountry
							: formData?.mailCountry;
						dataObject.permCountry = clientRequisitionData?.permCountry
							? clientRequisitionData?.permCountry
							: formData?.permCountry;
						dataObject.currency = clientRequisitionData?.currency
							? clientRequisitionData?.currency
							: formData?.currency;
						dataObject.socialList = {
							dialCode: clientRequisitionData?.dialCode
								? clientRequisitionData?.dialCode
								: formData?.socialList?.dialCode,
							alternateDialCode: clientRequisitionData?.alternateDialCode
								? clientRequisitionData?.alternateDialCode
								: formData?.socialList?.alternateDialCode
						};
						dataObject.dob = clientRequisitionData?.dateOfBirth
							? moment(clientRequisitionData?.dateOfBirth, 'YYYY-MM-DD')
							: formData?.dob
							? moment(formData?.dob, 'YYYY-MM-DD')
							: null;
						dataObject.dateOfBirth = clientRequisitionData?.dateOfBirth
							? moment(clientRequisitionData?.dateOfBirth, 'YYYY-MM-DD')
							: formData?.dob
							? moment(formData?.dob, 'YYYY-MM-DD')
							: null;
						dataObject.cifRelatedclientRequisitionData = true;
						setCustomerFormData(dataObject);
						form.setFieldsValue(dataObject);
						setCifRespData(dataObject);
					}

					// ---------------------------------------------------------==========------------------------
					return Promise.resolve();
				}
			} catch (error) {
				console.log('error data-----------', error);
			}
		} else {
			return Promise.resolve();
		}
	};

	// THIS IS CAN REMOVE in future for PNB_UAT-1917368 (CIF valiadation)
	const cifValidator1 = async (rule, value, callback) => {
		if (value) {
			try {
				let response = await getCifValidation(formData.id, value);
				handleOnValuesChange('qib', response.data?.field1);
				if (!response.data.success) {
					return Promise.reject(new Error(response.data.message));
				} else {
					return Promise.resolve();
				}
			} catch (error) {
				console.log('error data-----------', error);
			}
		} else {
			return Promise.resolve();
		}
	};

	return (
		<Card title=''>
			<Form layout='vertical' initialValues={formData} form={form} onValuesChange={onValuesChange}>
				<Row>
					<Col span={8}>
						<Form.Item
							label='Customer Type'
							name='customerType'
							required={true}
							rules={rules ? rules.customertype : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Radio.Group
								onChange={(evt) => handleOnValuesChange('customerType', evt.target.value)}
								defaultValue={formData?.customertype ? formData.customertype : 'C'}
								size='large'
								disabled={action === 'edit'}
							>
								{csObject?.CustomerType?.dropDownValue.map((item, i) => (
									<Radio.Button
										// disabled={
										// 	cifRespData?.customerType && cifRespData?.customerType !== item.dataValue
										// }
										disabled={formData?.cifDataOnEdit && formData?.customerType !== item?.dataValue}
										key={i.toString()}
										// className="customer-type-rb"
										className={`opp-radio-field ${
											formData.customerType == item.dataValue && 'active'
										}`}
										value={item.dataValue}
									>
										{item.displayValue}
									</Radio.Button>
								))}
							</Radio.Group>
						</Form.Item>
					</Col>
					<Col span={7}>
						<Form.Item
							name='reference'
							label='Reference'
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.reference : []}
						>
							<Select
								disabled
								onChange={(val) => handleOnValuesChange('reference', val)}
								placeholder='Select reference'
								size='large'
								value={formData?.reference}
							>
								{csObject?.Reference?.dropDownValue.map((item, i) => (
									<Select.Option key={i} value={item.dataValue}>
										{item.displayValue}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={7} style={{ position: 'relative' }}>
						<Form.Item
							// name="cif"
							// name="clientId"
							name='otherIdNo'
							label='CIF Number'
							validateTrigger={['onChange', 'onBlur']}
							// rules={
							// 	formData?.reference
							// 		? [
							// 				// {
							// 				// 	// validator: cifValidator
							// 				// 	// validator:action!=="edit" && formData?.callCifValidator===true ?cifValidator:""
							// 				// }
							// 				// {
							// 				//   required: true,
							// 				//   message: " ",
							// 				// },
							// 		  ]
							// 		: []
							// }
							// rules={rules ? [...rules.clientid, { validator: cifValidator }] : []}
							// rules={
							// 	rules
							// 		? [...rules.clientid, { validator: formData?.physchlgdMinor ? '' : cifValidator }]
							// 		: []
							// }
							// rules={rules ? rules.clientid : []}
							// rules={
							// 	!formData?.physchlgdMinor
							// 		? [
							// 				{
							// 					required: true,
							// 					message: '* CIF Number cannot be empty'
							// 				},
							// 				{
							// 					message: 'Maximum character length is 20',
							// 					pattern: /^[\S\d\W]{0,20}$/
							// 				},
							// 				{
							// 					message: 'Invalid syntax',
							// 					pattern: /^[a-zA-Z0-9]+$/
							// 				}
							// 		  ]
							// 		: []
							// }

							// -----------------
							rules={
								!formData?.physchlgdMinor
									? [
											{
												required: true,
												message: '* CIF Number cannot be empty'
											},
											{
												message: 'Maximum character length is 20',
												pattern: /^[\S\d\W]{0,20}$/
											},
											{
												message: 'Invalid syntax',
												pattern: /^[a-zA-Z0-9]+$/
											}
									  ]
									: [
											{
												required: false
											},
											{
												message: 'Maximum character length is 20',
												pattern: /^[\S\d\W]{0,20}$/
											},
											{
												message: 'Invalid syntax',
												pattern: /^[a-zA-Z0-9]+$/
											}
									  ]
							}
							// -----------------

							// required={formData?.reference ? true : false}
						>
							<Input
								// disabled={formData?.physchlgdMinor}
								// disabled={formData?.reference != '' ? false : true}

								// disabled={action === "edit" ? true : false}
								// value={
								//   formData?.clientRequisitionN
								//     ? formData?.clientRequisitionN
								//     : formData?.clientId
								// }
								value={formData?.otherIdNo ? formData?.otherIdNo : formData?.clientRequisitionN}
								onChange={(evt) => {
									handleOnValuesChange('otherIdNo', evt.target.value);
								}}
								// onKeyPress={(evt) => {
								// 	if (evt.which === 32) {
								// 		evt.preventDefault();
								// 		return false;
								// 	}
								// }}
								size='large'
								placeholder='Enter CIF number'
								// maxLength='20'
							/>
							{/* {cifIconClickedRequired?.errorMessage && (
								// <div role='alert' className='ant-form-item-explain-error'>
								<span>{cifIconClickedRequired?.errorMessage}</span>
							)} */}
						</Form.Item>
						<br />
						{cifIconClickedRequired?.errorMessage && (
							<span style={{ position: 'absolute', bottom: '0px', color: 'red' }}>
								{cifIconClickedRequired?.errorMessage}
							</span>
						)}
					</Col>
					<Col span={2} style={{ position: 'relative' }}>
						<Popover
							content={<p>Please click on fetch CIF detail icon</p>}
							visible={cifIconClickedRequired?.showPoperOverMessage}
						>
							<SyncOutlined
								title='fetch CIF detail'
								spin={loader}
								style={{
									position: 'absolute',
									top: '50%',
									fontSize: '2em',
									fontWeight: 'bold',
									opacity: loader ? '0.5' : '1'
								}}
								onClick={() => handleCifValidator()}
							/>
							{/* {loader && <p>fetching...</p>} */}
						</Popover>

						{/* <FontAwesomeIcon icon='fa-solid fa-rotate' /> */}
						{/* <FontAwesomeIcon className='icon' icon={fa} transform={{ rotate: 90 }} /> */}
						{/* <FontAwesomeIcon
							icon={}
							style={{ position: 'absolute', top: '50%' }}
							size='2x'
							onClick={() => handleCifValidator()}
						/>
						<Popover
							content={<p>Please click on fetch CIF detail icon</p>}
							visible={cifIconClickedRequired?.showPoperOverMessage}
						>
							{loader && <Spin />}
							{!loader && (
								<FileSearchOutlined
									title='fetch CIF detail'
									style={{ position: 'absolute', top: '50%', fontSize: '2em' }}
									onClick={() => handleCifValidator()}
								/>
							)}
						</Popover> */}
					</Col>
				</Row>
			</Form>
		</Card>
	);
}
