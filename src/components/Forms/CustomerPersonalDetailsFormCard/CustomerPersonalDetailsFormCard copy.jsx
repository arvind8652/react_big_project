import React, { useEffect, useState, useRef } from 'react';
import {
	Form,
	Input,
	Card,
	Select,
	DatePicker,
	Radio,
	Row,
	Col,
	Checkbox,
	Divider,
	Typography,
	message,
	Button
} from 'antd';
import { CloseOutlined, UserOutlined } from '@ant-design/icons';

import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUserPlus } from '@fortawesome/pro-light-svg-icons';

import './PersonalDetailsFormCard.scss';

import UploadByFormat from '../../UploadByFormat/UploadByFormat';
import { POLO_BLUE } from '../../../theme';
import { createNewFamilyName, isHeadOfTheFamily } from '../../../api/customerCreateApi';
import { CONSTANTS } from '../../../constants/constants';
import { beforeUpload, dummyRequest } from '../../../utils/utils';
import { getCity, getDependentData, getSourceOfWealth, getState } from '../../../api/commonApi';
import Modal from 'antd/lib/modal/Modal';

const { Option } = Select;

const PersonalDetails = ({
	form,
	formData,
	onValuesChange,
	rules,
	csObject,
	setRelationDetailCount,
	relationDetailCount,
	action = '',
	cifRespData = {},
	setCifIconClickedRequired = {},
	setDocRequestObject = {},
	docRequestObject = {}
}) => {
	const [familyName, setFamilyName] = React.useState();
	const [errorList, setErrorList] = useState([]);
	const [city, setCity] = useState();

	const [families, setFamilies] = useState(csObject?.FamilyName?.lookupValue?.lookUpValues ?? []);
	const [dropdownRelatedParty, setDropdownRelatedParty] = useState(
		csObject?.RelatedParty?.dropDownValue
	);
	const [relatedParty, setRelatedParty] = useState([]);
	const [years, setYears] = useState();
	const [showHeadOfFamilyModal, setshowHeadOfFamilyModal] = useState(false);
	const headofFamilyRef = useRef();

	const [customerSubType, setCustomerSubType] = useState();
	const [empRecordOnEdit, setEmpRecordOnEdit] = useState(false);
	const [sourceOfWealthData, setSourceOfWealthData] = useState();

	// useEffect(()=>{
	//   if(formData?.gender==="F" && formData?.title==="MR"){
	//     onValuesChange({ title: undefined});
	//     form.setFieldsValue({ title: undefined })
	//     message.warning(' For geneder Female salutation should be different.')
	//   }
	// },[formData?.title, formData?.gender])

	const getSourceOfWealthHandler = async () => {
		try {
			const resp = await getSourceOfWealth(formData?.customerType);
			setSourceOfWealthData(resp?.data);
		} catch (error) {
			console.log('getSourceOfWealth', error);
		}
	};
	useEffect(() => {
		if (
			formData?.title !== undefined &&
			formData?.title !== null &&
			formData?.title !== '' &&
			formData?.titleCondition !== '' &&
			formData?.gender &&
			formData?.gender !== null &&
			formData?.gender !== '' &&
			formData?.titleCondition !== formData?.gender &&
			formData?.titleCondition !== 'A'
		) {
			onValuesChange({ title: undefined, titleCondition: '' });
			if (formData?.gender === 'F') {
				// message.warning(' For geneder Female salutation should be different.')
				message.warning(' Please select other salutation for gender female.');
			} else if (formData?.gender === 'M') {
				// message.warning(' For geneder Male salutation should be different.')
				message.warning(' Please select other salutation for gender male.');
			}
		}
	}, [formData?.title, formData?.gender]);

	useEffect(() => {
		if (formData?.surName && families?.length > 0 && action === 'edit') {
			// setFamilyName(formData?.surnameName);
			// form.setFieldsValue({ surName: formData?.surnameName });

			let obj1 = families.find((obj) => obj.family === formData?.surName);
			let familycode1 = obj1?.family;
			if (familycode1 !== null && familycode1 !== undefined && familycode1 !== '') {
				// alert(familyName);
				form.setFieldsValue({ surName: obj1?.name });
			}
		}
	}, [formData?.surName, families]);
	//   useEffect(()=>{
	//     if(formData?.surName && action==="edit"){
	//       // let obj = families?.find(obj => obj?.family == formData?.surName);
	//       let obj = csObject?.FamilyName?.lookupValue?.lookUpValues?.find(obj => obj?.family == formData?.surName);
	//       let familycode = obj?.family
	//       form.setFieldsValue({ surName: obj?.name });
	//       onValuesChange({ surName: familycode ? familycode : formData?.surName});
	//       // headofFamilyRef.current.state.checked=false
	//       setFamilyName(obj?.name)
	//     }
	//   // },[formData?.surName])
	// },[formData?.surName])

	useEffect(() => {
		if (action === 'edit') {
			onCountryChange(formData?.country);
		}
	}, [formData?.country]);

	useEffect(() => {
		if (action === 'edit' && formData?.relatedParty?.length > 0) {
			setRelatedParty(formData?.relatedParty);
		}
	}, [formData?.relatedParty]);

	useEffect(() => {
		if (!dropdownRelatedParty) {
			setDropdownRelatedParty(csObject?.RelatedParty?.dropDownValue);
		}
	}, [csObject]);

	useEffect(() => {
		// alert('123444')
		if (familyName) {
			onValuesChange({ surName: '', headOfFamily: false });
			headofFamilyRef.current.state.checked = false;

			let obj = families.find((obj) => obj.name.toLowerCase() === familyName?.toLowerCase());
			if (obj) {
				onValuesChange({
					surName: obj.family,
					headOfFamily: false
				});
				setFamilyName(obj?.name);
				headofFamilyRef.current.state.checked = false;
			}
			// alert(familyName);

			// form.setFieldsValue({ surName: familyName });
			// onValuesChange({ surName: familycode ? familycode : familyName,headOfFamily:false });
			// headofFamilyRef.current.state.checked=false
		}
	}, [familyName]);

	const createNewFamily = async () => {
		try {
			const response = await createNewFamilyName(familyName);

			setFamilies([{ family: response?.data?.transactionId, name: familyName }, ...families]);
			form.setFieldsValue({ surName: familyName });

			onValuesChange({ surName: response?.data?.transactionId });
		} catch (error) {
		} finally {
			setFamilyName(familyName);
		}
	};

	const getHeadOfTheFamily = async () => {
		try {
			const response = await isHeadOfTheFamily(formData.surName);
			if (response.data) {
				setshowHeadOfFamilyModal(true);
			}
		} catch (error) {}
	};

	const handleOnValuesChange = (key, value) => {
		if (key === 'physchlgdMinor' && value) {
			// onValuesChange({ [key]: value, ['otherIdNo']: '' });
			onValuesChange({ [key]: value });
			setCifIconClickedRequired({
				showCifIconAlertMessage: false,
				cifIconClickedReq: false,
				showPoperOverMessage: false,
				errorMessage: ''
			});
		} else if (key === 'customerType' || key === 'category' || key === 'residentialStatus') {
			setDocRequestObject({ ...docRequestObject, [key]: value });
			onValuesChange({ [key]: value, ['riskProfileModel']: {} });
		} else {
			onValuesChange({ [key]: value });
		}
	};

	const handleOnTitleChange = (key, value) => {
		let titleCond = '';
		csObject?.Salutation?.lookupValue?.lookUpValues?.filter((_) => {
			if (_?.data_value === value) {
				titleCond = _?.chk_condn;
			}
		});
		onValuesChange({ [key]: value, ['titleCondition']: titleCond });
	};

	useEffect(() => {
		if (csObject?.FamilyName) {
			setFamilies(csObject?.FamilyName.lookupValue.lookUpValues);
		}
	}, [csObject?.FamilyName]);

	function disabledDate(current) {
		// Can not select days after today and today
		return current && current > moment().endOf('day');
	}
	// useEffect(()=>{
	//   if (formData?.customerType === "I") {
	//     if(formData?.title==="CH|M" && years>=18){

	//     //  alert("Age should be less")
	//     message.warning(
	//       " It is mandatory to enter age less than 18"
	//     );

	//     }
	//   }
	// },[formData?.dob,formData?.title])

	useEffect(() => {
		if (action === 'edit' || action === 'convert') {
			if (formData?.dateOfBirth) {
				var years = moment().diff(formData?.dateOfBirth, 'years');
				setYears(years);
			}
		}
	}, [formData?.dateOfBirth]);

	useEffect(() => {
		let checkAgeGap = () => {
			if (formData?.dateOfBirth?._isAMomentObject) {
				let dobYear = formData?.dateOfBirth?.year();
				let currYear = new Date().getFullYear();
				return Number(currYear) - Number(dobYear);
			}
		};
		if (formData?.customerType === 'I') {
			// let checkAgeGap = () => {
			// 	if (formData?.dateOfBirth?._isAMomentObject) {
			// 		let dobYear = formData?.dateOfBirth?.year();
			// 		let currYear = new Date().getFullYear();
			// 		// console.log('cheeheeh----------', Number(currYear) - Number(dobYear));
			// 		return Number(currYear) - Number(dobYear);
			// 	}
			// };
			if (checkAgeGap() < 18) {
				// if (years < 18) {
				// if (formData?.physchlgdMinor !== 'ITF') {
				// 	onValuesChange({ physchlgdMinor: 'MINOR', ['otherIdNo']: '' });
				// }
				if (formData?.relationDetail?.length > 0) {
					setRelationDetailCount({
						...relationDetailCount,
						checkCount: false,
						// yearCount: years
						yearCount: checkAgeGap()
					});
				} else {
					setRelationDetailCount({
						...relationDetailCount,
						checkCount: true,
						// yearCount: years
						yearCount: checkAgeGap()
					});
					message.warning(
						' It is mandatory to enter details of guardian under Relationship Details for a minor Client.'
					);
				}
				// message.warning(
				// 	' It is mandatory to enter details of guardian under Relationship Details for a minor Client.'
				// );
			} else {
				// if (formData?.physchlgdMinor === 'MINOR') {
				// 	onValuesChange({ physchlgdMinor: null });
				// }
				setRelationDetailCount({
					...relationDetailCount,
					checkCount: false,
					// yearCount: years
					yearCount: checkAgeGap()
				});
			}
		} else {
			setRelationDetailCount({
				...relationDetailCount,
				checkCount: false,
				// yearCount: years
				yearCount: checkAgeGap()
			});
		}
	}, [formData?.dateOfBirth, formData?.relationDetail, years]);

	useEffect(() => {
		if (action !== 'edit') {
			defaultCityval();
		}
	}, []);

	const defaultCityval = async (country = formData?.country) => {
		try {
			const s = await getCity(country, 20103, 'CLIENTREQADD');
			setCity(s.data);
		} catch (error) {
			console.log('error Permanent city', error);
		}
	};

	const onCountryChange = async (countryCode) => {
		try {
			const response = await getCity(countryCode, 20103, 'CLIENTREQADD');
			setCity(response.data);
			form.setFieldsValue({ city: null });
		} catch (error) {
			console.error('[CustomerAddressDetailsFormCard] onCountryChange', error);
		}
	};
	const styleSet = {
		parentCheckBox: { display: 'flex', alignItems: 'center', padding: '10px' },
		checkboxContainer: {
			flex: 0.1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		itemCheckbox: { flex: 0.9 },
		tag: {
			display: 'flex',
			backgroundColor: '#F6F7FB',
			color: '#5D6DD1',
			alignItems: 'center',
			borderRadius: 10,
			padding: 5
		},
		close: {
			paddingLeft: 5,
			paddingRight: 5
		},
		name: {
			whiteSpace: 'nowrap',
			width: '100%',
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		},
		tagContainer: { overflowX: 'auto', display: 'flex', paddingBottom: 10 },
		dropDownHeight: { maxHeight: '150px', overflowY: 'scroll' }
	};
	const handleOnChange = (query) => {
		const small = query?.toLowerCase();
		const newData = csObject?.RelatedParty?.dropDownValue.filter((e) => {
			return e.displayValue.toLowerCase().includes(small);
		});
		setDropdownRelatedParty(newData);
	};
	const renderCustomSelectOption = () => {
		const handleOnChange = (checked, dataValue, displayValue) => {
			if (checked) {
				setRelatedParty([...relatedParty, { dataValue: dataValue, displayValue: displayValue }]);
			} else {
				setRelatedParty(relatedParty.filter((itm) => itm.dataValue !== dataValue));
			}
		};
		return dropdownRelatedParty?.map((e, idx) => {
			return (
				<div style={styleSet.parentCheckBox} key={idx}>
					<div style={styleSet.checkboxContainer}>
						<Checkbox
							checked={relatedParty?.find((item) => item.dataValue === e.dataValue) ? true : false}
							onChange={(evt) => {
								handleOnChange(evt.target.checked, e.dataValue, e.displayValue);
							}}
						/>
					</div>
					<div style={styleSet.itemCheckbox}>
						<Typography.Text>{e?.displayValue}</Typography.Text>
					</div>
				</div>
			);
		});
	};
	useEffect(() => {
		let empFlag = true;
		relatedParty.forEach((ele) => {
			if (ele.dataValue === 'EMPLOYEE' || ele.dataValue === 'WEALTHPERSONNEL') {
				empFlag = false;
			}
		});
		if (empFlag) {
			onValuesChange({ relatedParty: relatedParty, ['employeeId']: '' });
		} else {
			onValuesChange({ relatedParty: relatedParty });
		}
	}, [relatedParty]);
	const enableDisableEmployeeId = () => {
		let flag = true;
		relatedParty.forEach((ele) => {
			if (ele.dataValue === 'EMPLOYEE' || ele.dataValue === 'WEALTHPERSONNEL') {
				flag = false;
			}
		});
		return flag;
	};
	const getCustomerSubTypeHandler = async () => {
		try {
			const resp = await getDependentData(20106, formData?.customerType);
			setCustomerSubType(resp.data);
		} catch (error) {
			console.log('err =>', error);
		}
	};

	useEffect(() => {
		getCustomerSubTypeHandler();
		getSourceOfWealthHandler();
	}, [formData?.customerType]);

	useEffect(() => {
		if (!empRecordOnEdit) {
			onValuesChange({ ['employerName']: '', ['sourceOfFundsOth']: '' });
		}
		setEmpRecordOnEdit(false);
	}, [formData?.sourceOfFund]);

	useEffect(() => {
		if (action === 'edit') {
			setEmpRecordOnEdit(true);
		}
	}, []);

	// useEffect(()=>{
	//   if(csObject?.Nationality){
	//   handleOnValuesChange("nationality",csObject?.Nationality?.defaultvalue)
	//   // handleOnValuesChange("country",csObject?.PlaceOfBirthCountry?.defaultvalue)
	//   }
	// },[])

	return (
		<Card title='Personal Details'>
			<Modal
				visible={showHeadOfFamilyModal}
				closable={false}
				footer={[
					<Button
						className='submit-btn'
						key='submit'
						type='primary'
						onClick={() => {
							setshowHeadOfFamilyModal(false);
						}}
					>
						Okay
					</Button>,
					<Button
						className='text-only-btn'
						key='back'
						type='text'
						onClick={() => {
							setshowHeadOfFamilyModal(false);
							onValuesChange({ headOfFamily: false });

							headofFamilyRef.current.state.checked = false;
						}}
					>
						Cancel
					</Button>
				]}
				centered
			>
				{`The Head of family already exist,Do you want to replace it?`}
			</Modal>

			<Form layout='vertical' initialValues={formData} form={form}>
				<Row>
					<Col span={10}>
						{formData?.customerType === 'I' && (
							<Col span={8}>
								<Form.Item
									label='Salutation'
									name='title'
									validateTrigger={['onChange', 'onBlur']}
									rules={rules ? rules.salutation : []}
									required
								>
									<Select
										// disabled={cifRespData?.title}
										disabled={formData?.cifDataOnEdit}
										showSearch
										filterOption={(input, option) =>
											option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
										}
										placeholder='Select Salutation'
										value={formData?.title}
										// onChange={(val) => handleOnValuesChange('title', val)}
										onChange={(val) => handleOnTitleChange('title', val)}
										// defaultValue={'MR'}
										size='large'
										//   options ={csObject?.Salutation?.dropDownValue.map((_,i)=>({
										//     key:i,
										//     label:_.displayValue,
										//     value: _.dataValue
										//   })
										// )}
										options={csObject?.Salutation?.lookupValue?.lookUpValues?.map((_, i) => ({
											key: i,
											label: _.display_value,
											value: _.data_value
											// value: `${_.data_value}|${_.chk_condn}`
										}))}
									/>
								</Form.Item>
							</Col>
						)}
					</Col>
				</Row>
				<Row>
					<Col span={6}>
						<Form.Item
							label={formData?.customerType === 'C' ? 'Full Name' : 'First Name'}
							name='firstName'
							style={{
								width: '100%'
							}}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.firstname : []}
							// required
						>
							<Input
								// disabled={cifRespData?.firstName}
								disabled={formData?.cifDataOnEdit}
								onChange={(evt) => handleOnValuesChange('firstName', evt.target.value)}
								placeholder={
									formData?.customerType === 'C' ? 'Enter full name' : 'Enter first name'
								}
								size='large'
								value={formData?.firstname}
							/>
						</Form.Item>
					</Col>
					{formData?.customerType === 'I' && (
						<>
							<Col span={8}>
								<Form.Item
									label='Middle Name'
									name='secondName'
									style={{
										width: '100%'
									}}
									validateTrigger={['onChange', 'onBlur']}
									rules={rules ? rules.middlename : []}
								>
									<Input
										// disabled={cifRespData?.secondName}
										disabled={formData?.cifDataOnEdit}
										onChange={(evt) => handleOnValuesChange('secondName', evt.target.value)}
										placeholder='Enter middle name'
										size='large'
										// maxLength={csObject?.MiddleName?.fieldLength}
										value={formData?.secondName}
									/>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item
									label='Last Name'
									name='thirdName'
									style={{
										width: '100%'
									}}
									validateTrigger={['onChange', 'onBlur']}
									rules={rules ? rules.lastname : []}
								>
									<Input
										// disabled={cifRespData?.thirdName}
										disabled={formData?.cifDataOnEdit}
										onChange={(evt) => handleOnValuesChange('thirdName', evt.target.value)}
										placeholder='Enter last name'
										size='large'
										// maxLength={csObject?.LastName?.fieldLength}
										value={formData?.thirdName}
										// required
									/>
								</Form.Item>
							</Col>
							<Col span={2}>
								<Form.Item
									label='Suffix'
									name='suffix'
									style={{
										width: '100%'
									}}
									validateTrigger={['onChange', 'onBlur']}
									rules={rules ? rules.suffix : []}
								>
									<Input
										// disabled={cifRespData?.suffix}
										disabled={formData?.cifDataOnEdit}
										onChange={(evt) => handleOnValuesChange('suffix', evt.target.value)}
										placeholder='Suffix'
										size='large'
										// maxLength={csObject?.Suffix?.fieldLength}
										value={formData?.suffix}
									/>
								</Form.Item>
							</Col>
						</>
					)}
				</Row>
				<Row>
					<Col span={10}>
						<Row>
							<Col span={18} className='margin-tp'>
								<Form.Item name='profilePhoto' valuePropName='fileList'>
									<UploadByFormat
										action={action}
										formData={formData}
										accept={CONSTANTS.attachmentFileTypes.uploadPhotoFileTypes}
										uploadFormat='image'
										name='Profile Photo'
										style={{
											borderRadius: '15px',
											padding: '12px 0'
										}}
										showPreview={true}
										icon={faUserCircle}
										color={POLO_BLUE}
										size='4x'
										text='Upload Photo'
										customRequest={dummyRequest}
										onChange={({ file, fileList }) => {
											if (
												beforeUpload(
													file,
													setErrorList,
													CONSTANTS.attachmentFileTypes.uploadPhotoFileTypes
												)
											) {
												onValuesChange({
													profileImage: { file, fileList }
												});
											}
										}}
									/>
								</Form.Item>
							</Col>
						</Row>
					</Col>
					<Col span={7}>
						<Form.Item
							name='surName'
							label='Group/ Family name'
							// value={familyName}
							style={{
								width: '100%'
							}}
							validateTrigger={['onBlur']}
							// required
							rules={rules ? rules.familyname : []}
						>
							<Select
								// disabled={cifRespData?.surName}
								size='large'
								// value={formData?.surName}
								suffixIcon={<FontAwesomeIcon icon={faUserPlus} size='1x' />}
								showSearch
								// allowClear
								placeholder='Search by name'
								optionFilterProp='children'
								filterOption={(input, option) => {
									return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								onSearch={
									(val) => (val ? setFamilyName(val) : setFamilyName(null))
									// val ? setFamilyName(val) : setFamilyName(val)
								}
								notFoundContent={<></>}
								options={families?.map((_, index) => ({
									// options={csObject?.FamilyName?.lookupValue?.lookUpValues?.map((_,index) => ({
									key: index,
									label: _.name,
									// value: _.name,
									value: _.family
								}))}
								dropdownRender={() => {
									return (
										<div
											className='dropdown-custom'
											style={{ maxHeight: '15rem', overflowY: 'auto' }}
										>
											{families.filter((_) => familyName?.toLowerCase() === _.name?.toLowerCase())
												.length === 0 &&
												familyName && (
													<>
														<div className='dropdown-custom-item' style={{ color: 'black' }}>
															<span
																onClick={createNewFamily}
															>{`+ Create "${familyName}" Family`}</span>
														</div>
														<Divider style={{ margin: 0 }} />
													</>
												)}
											<div className='dropdown-custom-options'>
												{families?.map((item, index) => (
													<div key={index} className='dropdown-custom-item'>
														<Checkbox
															// checked={familyName === item.value}
															// checked={familyName?.toLowerCase() === item?.value?.toLowerCase()}
															// checked={formData?.surName === item?.family}
															checked={formData?.surName === item?.family}
															// onChange={() => setFamilyName(item.value)}
															// checked={familyName === item.name ? true : false}
															// onChange={() => setFamilyName(item.name)}
															onChange={() => setFamilyName(item.name)}
															// onClick={(e) => {
															// 	if (e.target.checked) {
															// 		handleOnValuesChange('surName', item.family);
															// 	} else {
															// 		handleOnValuesChange('surName', '');
															// 	}
															// }}
														>
															{item.name}
														</Checkbox>
													</div>
												))}
											</div>
											{/* {families.filter((_) => familyName?.toLowerCase() === _.name?.toLowerCase())
												.length === 0 &&
												familyName && (
													<>
														<Divider style={{ margin: 0 }} />
														<div className='dropdown-custom-item'>
															<span
																onClick={createNewFamily}
															>{`+ Create "${familyName}" Family`}</span>
														</div>
													</>
												)} */}
										</div>
									);
								}}
								value={familyName}
								// value={formData?.surName}
							/>
						</Form.Item>
						<Form.Item
							label='Sub Type'
							name='subType'
							// rules={rules ? rules.subtype : []}
							rules={
								formData?.customerType === 'C'
									? [
											{
												required: true,
												message: '* Sub Type cannot be empty'
											}
									  ]
									: []
							}
							validateTrigger={['onChange', 'onBlur']}
							// required
						>
							<Select
								// disabled={cifRespData?.subType}
								showSearch
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								onChange={(val) => handleOnValuesChange('subType', val)}
								size='large'
								style={{
									width: '100%'
								}}
								placeholder='Select Sub Type'
								value={formData?.subType}
								options={customerSubType?.lookUpValues?.map((_, i) => ({
									key: i,
									label: _.display_value,
									value: _.data_value
								}))}
							/>
						</Form.Item>
					</Col>
					<Col span={7}>
						<>
							<Form.Item
								name='headOfFamily'
								validateTrigger={['onChange', 'onBlur']}
								rules={rules ? rules.headoffamily : []}
								style={{ paddingTop: '2.2rem', marginBottom: '2rem' }}
							>
								<Checkbox
									ref={headofFamilyRef}
									checked={formData.headOfFamily === true || formData.headOfFamily === 'Y'}
									// disabled={!formData.surName}
									disabled={
										// formData?.title === 'CH|M' ||
										// (formData?.title !== 'CH|M' && !formData.surName) ||
										(formData?.title === 'CH' && formData?.titleCondition === 'M') ||
										(formData?.title !== 'CH' &&
											formData?.titleCondition === 'M' &&
											!formData.surName) ||
										cifRespData?.headOfFamily
									}
									onChange={(evt) => {
										if (evt.target.checked) {
											getHeadOfTheFamily();
										}
										handleOnValuesChange('headOfFamily', evt.target.checked);
									}}
								>
									Head of Family /Group
								</Checkbox>
							</Form.Item>
						</>
						<Form.Item
							label='Category'
							name='category'
							rules={rules ? rules.category : []}
							validateTrigger={['onChange', 'onBlur']}
							// required
						>
							<Select
								// disabled={action === 'edit' ? true : false}
								// disabled={action === 'edit' || cifRespData?.category}
								disabled={action === 'edit' || formData?.cifDataOnEdit}
								defaultValue={formData?.category ? formData.category : '2'}
								showSearch
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								onChange={(val) => handleOnValuesChange('category', val)}
								required
								size='large'
								style={{
									width: '100%'
								}}
								placeholder='Select category'
								value={formData?.category}
								options={csObject?.Category?.dropDownValue.map((_, i) => ({
									key: i,
									label: _.displayValue,
									value: _.dataValue
								}))}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={10}>
						{formData?.customerType === 'I' && (
							<Form.Item
								label='Gender'
								name='gender'
								rules={rules ? rules.gender : []}
								validateTrigger={['onChange', 'onBlur']}
								// required
							>
								<Radio.Group
									onChange={(evt) => handleOnValuesChange('gender', evt.target.value)}
									defaultValue={formData?.gender}
									size='large'
									style={{ width: '100%' }}
								>
									{csObject?.Gender?.dropDownValue.map((item, i) => (
										<Radio.Button
											// disabled={cifRespData?.gender && cifRespData?.gender !== item.dataValue}
											disabled={formData?.cifDataOnEdit && formData?.gender !== item.dataValue}
											key={i.toString()}
											value={item.dataValue}
											style={{
												width: `${Math.floor(100 / csObject?.Gender?.dropDownValue.length)}%`,
												textAlign: 'center'
											}}
										>
											{item.displayValue}
										</Radio.Button>
									))}
								</Radio.Group>
							</Form.Item>
						)}
					</Col>
					<Col span={7}>
						<Form.Item
							name='dateOfBirth'
							label={formData?.customerType === 'C' ? 'DOI' : 'Date of Birth'}
							// rules={rules ? rules.dateofbirth : []}
							rules={rules ? rules.dateofbirth : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<DatePicker
								allowClear={false}
								// disabled={cifRespData?.dateOfBirth}
								disabled={formData?.cifDataOnEdit}
								disabledDate={disabledDate}
								onChange={(val) => {
									if (val) {
										var years = moment().diff(val, 'years');
										setYears(years);
										handleOnValuesChange('dateOfBirth', val);
									} else {
										setYears(null);
									}
								}}
								placeholder={formData?.customerType === 'C' ? 'Select DOI' : 'Select date of birth'}
								size='large'
								style={{ width: '100%' }}
								// defaultValue={formData?.dob}
								defaultValue={formData?.dateOfBirth}
								format='DD-MM-YYYY'
							/>
						</Form.Item>
					</Col>
					<Col span={7}>
						<Form.Item
							label='Occupation'
							name='occupation'
							rules={formData?.customerType === 'I' ? rules?.occupation : []}
							// rules={formData?.customerType==="I"? rules ? [...rules.occupation] : []:[]}
							validateTrigger={['onChange', 'onBlur']}
							// required={formData?.customerType==="I"?true:false}
						>
							<Select
								// disabled={cifRespData?.occupation}
								disabled={formData?.cifDataOnEdit && formData?.customerType === 'I'}
								onChange={(val) => handleOnValuesChange('occupation', val)}
								showSearch
								size='large'
								style={{
									width: '100%'
								}}
								placeholder='Select'
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								options={csObject?.Occupation?.dropDownValue.map((_, i) => ({
									key: i,
									label: _.displayValue,
									value: _.dataValue
								}))}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={10}>
						<Form.Item
							label={formData?.customerType === 'I' ? 'Nationality' : 'Domicile'}
							name='nationality'
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.nationality : []}
							required
						>
							<Select
								// disabled={cifRespData?.nationality}
								disabled={formData?.cifDataOnEdit}
								defaultValue={formData?.nationality}
								showSearch
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								onChange={(val) => handleOnValuesChange('nationality', val)}
								required
								placeholder='Select nationality'
								size='large'
								style={{
									width: '100%'
								}}
								value={formData?.nationality}
								options={csObject?.Nationality?.dropDownValue.map((_, i) => ({
									key: i,
									label: _.displayValue,
									value: _.dataValue
								}))}
							/>
						</Form.Item>
					</Col>
					<Col span={7}>
						<Form.Item
							label={
								formData?.customerType === 'C'
									? 'Place of Incorporation Country'
									: 'Place of Birth (Country)'
							}
							name='country'
							// rules={rules ? rules.placeofbirthcountry : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={cifRespData?.country}
								disabled={formData?.cifDataOnEdit && formData?.customerType === 'I'}
								defaultValue={csObject?.PlaceOfBirthCountry?.defaultvalue}
								showSearch
								onChange={(val) => {
									onCountryChange(val);
									handleOnValuesChange('country', val);
								}}
								size='large'
								style={{
									width: '100%'
								}}
								placeholder='Select'
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								options={csObject?.PlaceOfBirthCountry?.dropDownValue.map((_, i) => ({
									key: i,
									label: _.displayValue,
									value: _.dataValue
								}))}
							/>
						</Form.Item>
					</Col>
					<Col span={7}>
						<Form.Item
							label={
								formData?.customerType === 'C'
									? 'Place of Incorporation City'
									: 'Place of Birth (City)'
							}
							name='city'
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={cifRespData?.city}
								onChange={(val) => {
									handleOnValuesChange('city', val);
								}}
								showSearch={true}
								size='large'
								style={{
									width: '100%'
								}}
								placeholder='Select'
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								options={city?.lookUpValues.map((_, i) => ({
									key: i,
									label: _.display_value,
									value: _.data_value
								}))}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={10}>
						<Form.Item
							label='Nature of Business'
							name='natureOfBusiness'
							rules={rules ? rules.natureofbusiness : []}
							validateTrigger={['onChange', 'onBlur']}
							required
						>
							<Select
								// disabled={cifRespData?.natureOfBusiness}
								disabled={formData?.cifDataOnEdit}
								onChange={(val) => handleOnValuesChange('natureOfBusiness', val)}
								size='large'
								style={{
									width: '100%'
								}}
								placeholder='Select'
								showSearch
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								options={csObject?.NatureofBusiness?.dropDownValue.map((_, i) => ({
									key: i,
									label: _.displayValue,
									value: _.dataValue
								}))}
							/>
						</Form.Item>
					</Col>
					<Col span={7}>
						<Form.Item
							label='Annual Income'
							name='income'
							rules={rules ? rules.annualincome : []}
							validateTrigger={['onChange', 'onBlur']}
							// required
						>
							<Select
								// disabled={cifRespData?.income}
								disabled={formData?.cifDataOnEdit}
								onChange={(val) => handleOnValuesChange('income', val)}
								showSearch
								// required
								size='large'
								style={{
									width: '100%'
								}}
								placeholder='Select'
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								options={csObject?.AnnualIncome?.dropDownValue.map((_, i) => ({
									key: i,
									label: _.displayValue,
									value: _.dataValue
								}))}
							/>
						</Form.Item>
					</Col>
					<Col span={7}>
						<Form.Item
							// label='Net Worth'
							label='Financial Situation'
							name='networth'
							rules={rules ? rules.networth : []}
							validateTrigger={['onChange', 'onBlur']}
							// required
						>
							<Select
								// disabled={cifRespData?.networth}
								showSearch
								onChange={(val) => handleOnValuesChange('networth', val)}
								// required
								size='large'
								style={{
									width: '100%'
								}}
								placeholder='Select'
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								options={csObject?.NetWorth?.dropDownValue.map((_, i) => ({
									key: i,
									label: _.displayValue,
									value: _.dataValue
								}))}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={10}>
						<Form.Item
							label='Residential Status'
							name='residentialStatus'
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules?.residentstatus : []}
						>
							<Select
								// disabled={cifRespData?.residentialStatus}
								disabled={formData?.cifDataOnEdit}
								showSearch
								onChange={(val) => handleOnValuesChange('residentialStatus', val)}
								required
								size='large'
								style={{
									width: '100%'
								}}
								placeholder='Select'
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								options={csObject?.ResidentStatus?.dropDownValue?.map((_, i) => ({
									key: i,
									label: _.displayValue,
									value: _.dataValue
								}))}
							/>
						</Form.Item>
					</Col>
					{/* <Col span={7}> */}
					{formData?.customerType === 'I' && (
						<Col span={7}>
							<Form.Item
								// label='Maritial Status'
								label='Marital Status'
								name='maritalStatus'
								validateTrigger={['onChange', 'onBlur']}
								rules={rules ? rules.maritialstatus : []}
								required
							>
								<Select
									// disabled={cifRespData?.maritalStatus}
									disabled={formData?.cifDataOnEdit}
									showSearch
									onChange={(val) => handleOnValuesChange('maritalStatus', val)}
									required
									size='large'
									style={{
										width: '100%'
									}}
									placeholder='Select'
									filterOption={(input, option) =>
										option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
									options={csObject?.MaritialStatus?.dropDownValue.map((_, i) => ({
										key: i,
										label: _.displayValue,
										value: _.dataValue
									}))}
								/>
							</Form.Item>
						</Col>
					)}

					<Col span={7}>
						<Form.Item
							label='Tax Status'
							name='taxStatus'
							rules={rules ? rules.taxstatus : []}
							validateTrigger={['onChange', 'onBlur']}
							// required
						>
							<Select
								// disabled={cifRespData?.taxStatus}
								onChange={(val) => handleOnValuesChange('taxStatus', val)}
								// required
								size='large'
								style={{
									width: '100%'
								}}
								placeholder='Select'
								showSearch
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								options={csObject?.TaxStatus?.dropDownValue.map((_, i) => ({
									key: i,
									label: _.displayValue,
									value: _.dataValue
								}))}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={10}>
						<Form.Item
							// label='Source of Fund'
							label='Source of Wealth'
							name='sourceOfFund'
							rules={rules ? rules.sourceoffund : []}
							validateTrigger={['onChange', 'onBlur']}
							// required
						>
							<Select
								// disabled={cifRespData?.sourceOfFund}
								disabled={formData?.cifDataOnEdit}
								showSearch
								onChange={(val) => handleOnValuesChange('sourceOfFund', val)}
								// required
								size='large'
								style={{
									width: '100%'
								}}
								placeholder='Select'
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								// options={csObject?.SourceofFund?.dropDownValue.map((_, i) => ({
								// 	key: i,
								// 	label: _.displayValue,
								// 	value: _.dataValue
								// }))}
								options={sourceOfWealthData?.lookUpValues?.map((item, i) => ({
									key: i,
									label: item.display_value,
									value: item.data_value
								}))}
							/>
						</Form.Item>
					</Col>
					<Col span={7}>
						<Form.Item
							// label='Source of Fund (Others)'
							label='Source of Wealth (Others)'
							style={{
								width: '100%'
							}}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.sourceoffundsoth : []}
							// required={formData.sourceOfFund == 'O'}
							required={formData.sourceOfFund === 'OTHERS'}
						>
							<Input
								onChange={(evt) => handleOnValuesChange('sourceOfFundsOth', evt.target.value)}
								placeholder='Source of Wealth (Others)'
								size='large'
								value={formData?.sourceOfFundsOth}
								// disabled={!formData.sourceOfFund || formData.sourceOfFund != 'O'}
								disabled={
									!formData.sourceOfFund || formData.sourceOfFund !== 'OTHERS'
									// ||
									// cifRespData?.sourceOfFundsOth
								}
							/>
						</Form.Item>
					</Col>
					<Col span={7}>
						<Form.Item
							label='Employer Name'
							style={{
								width: '100%'
							}}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.employername : []}
							// required={formData.sourceOfFund == 'S'}
							required={formData.sourceOfFund === 'SLRY'}
						>
							<Input
								onChange={(evt) => handleOnValuesChange('employerName', evt.target.value)}
								placeholder='Enter Employer Name'
								size='large'
								// disabled={!formData.sourceOfFund || formData.sourceOfFund != 'S'}
								disabled={
									!formData.sourceOfFund ||
									formData.sourceOfFund !== 'SLRY' ||
									// ||
									// cifRespData?.employerName
									formData?.cifDataOnEdit
								}
								value={formData?.employerName}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={10}>
						<Form.Item name='relatedParty' label='Related Party'>
							{
								// IMPORTANT don't remove below empty space
								' '
							}
							<Select
								// disabled={
								// 	cifRespData?.relatedParty &&
								// 	Array.isArray(cifRespData?.relatedParty) &&
								// 	cifRespData?.relatedParty?.length > 0
								// }
								showSearch
								size='large'
								onSearch={handleOnChange}
								dropdownStyle={styleSet.dropDownHeight}
								mode='multiple'
								dropdownRender={renderCustomSelectOption}
							/>
						</Form.Item>
						{relatedParty?.length > 0 && (
							<div style={styleSet.tagContainer}>
								{relatedParty?.map((e, item) => (
									<Col span={12} key={e?.dataValue}>
										<div style={styleSet.tag}>
											<div style={styleSet.close}>
												<UserOutlined />
											</div>
											<div style={styleSet.name}>{e?.displayValue}</div>
											<div style={styleSet.close}>
												<CloseOutlined
													onClick={() => {
														setRelatedParty(
															relatedParty?.filter((item) => item?.dataValue !== e?.dataValue)
														);
													}}
												/>
											</div>
										</div>
									</Col>
								))}
							</div>
						)}
					</Col>
					<Col span={7}>
						<Form.Item
							label='Employee ID'
							name='employeeId'
							style={{
								width: '100%'
							}}
							validateTrigger={['onChange', 'onBlur']}
							// rules={rules ? rules.employeeid : []}
							rules={
								rules
									? [
											...rules.employeeid,
											!enableDisableEmployeeId()
												? { required: true, message: '* Employee ID cannot be empty' }
												: { required: false }
									  ]
									: []
							}
							required={!enableDisableEmployeeId()}
						>
							<Input
								onChange={(evt) => handleOnValuesChange('employeeId', evt.target.value)}
								placeholder='Enter Employee Id'
								size='large'
								value={formData?.employeeId}
								// disabled={enableDisableEmployeeId() || cifRespData?.employeeId}
								disabled={enableDisableEmployeeId()}
							/>
						</Form.Item>
					</Col>
					<Col span={7}>
						<Form.Item
							label='Client Classification'
							// name='PHYSCHLGDORMINOR'
							name='physchlgdMinor'
							rules={rules ? rules.physchlgdorminor : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={cifRespData?.physchlgdMinor}
								allowClear
								showSearch
								onChange={(val) => handleOnValuesChange('physchlgdMinor', val)}
								size='large'
								style={{
									width: '100%'
								}}
								placeholder='Select'
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								options={csObject?.PHYSCHLGDORMINOR?.dropDownValue.map((_, i) => ({
									key: i,
									label: _.displayValue,
									value: _.dataValue
								}))}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	);
};

export default PersonalDetails;
