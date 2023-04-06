import { Form, Col, Space, Row, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { symbolsArr } from '../../../utils/utils';
import { ScDatePicker, ScInput, ScSelect, ScTextArea } from '../../StyledComponents/formElements';
import {
	ScButtonPrimary,
	ScButtonText,
	ScModal,
	ScRow
} from '../../StyledComponents/genericElements';
import {
	getDependentNameListDataApi,
	getDependentCustomerNameListDataApi
} from '../../../api/commonApi';
import Text from 'antd/lib/typography/Text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/pro-solid-svg-icons';
import { CONSTANTS } from '../../../constants/constants';
import { faUser } from '@fortawesome/pro-light-svg-icons';
import { AvatarSize } from '../../../constants/AvatarSize';
import AvatarLogo from '../../Avatar/AvatarLogo';
import { palette, fontSet, avatar } from '../../../theme';
import Avatar from 'antd/lib/avatar/avatar';
import './relationDetailFormModal.scss';
import moment from 'moment';

const relationDataDefault = {
	isCustomer: true,
	relationName: null,
	dob: null,
	dialCode: '+63',
	contactNumber: null,
	emailId: null,
	address: null
};

const RelationDetailFormModal = ({
	visible,
	formData,
	handleOk,
	onCancel,
	cs,
	csObject,
	rules,
	relationEditForm = {},
	addButton,
	relationFormFrom
}) => {
	const [form] = Form.useForm();
	const [checkbool, setcheckbool] = useState(false);

	const [relationDetailFormData, setRelationDetailFormData] = useState(
		Object.keys(relationEditForm).length > 0 ? relationEditForm : relationDataDefault
	);

	const [existingCustomersList, setExistingCustomersList] = useState([]);
	const [ellipsis, setEllipsis] = useState(true);
	const countryObj =
		csObject[
			cs
				.map((item, index) => (item?.sectionName === 'Main' ? index : false))
				.filter((indexItem) => indexItem !== false)[0]
		]?.CountryCode?.lookupValue?.lookUpValues;
	const coutryCode = countryObj && countryObj.length > 0 ? countryObj : [];
	const mainRuleObject =
		rules &&
		cs &&
		rules[
			cs
				.map((item, index) => (item?.sectionName === 'Main' ? index : false))
				.filter((indexItem) => indexItem !== false)[0]
		];
	const gridRelationRuleObject =
		rules &&
		cs &&
		rules[
			cs
				.map((item, index) => (item?.sectionName === 'Grid_Relation' ? index : false))
				.filter((indexItem) => indexItem !== false)[0]
		];
	useEffect(() => {
		if (Object.keys(relationEditForm).length > 0) {
			setRelationDetailFormData(relationEditForm);
		}
	}, [relationEditForm]);
	useEffect(() => {
		if (relationFormFrom == 'customerCreate') {
			if (relationDetailFormData?.isCustomer) {
				getDependentCustomerNameListDataApi().then((res) => {
					setExistingCustomersList(res?.data?.lookUpValues);
				});
			}
		} else {
			relationDetailFormData?.isCustomer &&
				getDependentNameListDataApi().then((res) => {
					setExistingCustomersList(res?.data?.lookUpValues || []);
				});
		}
	}, [relationDetailFormData?.isCustomer]);

	form?.setFieldsValue(relationDetailFormData);

	if (addButton) {
	} else {
	}

	const customerTypeOptions = [
		{ label: 'Existing', value: true },
		{ label: 'New', value: false }
	];

	const onValuesChange = (val) => {
		if (relationFormFrom === 'customerCreate') {
			if (relationDetailFormData?.isCustomer && val?.relationName) {
				const customer = existingCustomersList.filter(
					// (cust) => cust?.ID === val?.relationName
					(cust, i) => cust?.CustomerID === val?.relationName
				)[0];

				setRelationDetailFormData({
					isCustomer: relationDetailFormData?.isCustomer,
					relationName: customer?.Name,
					// relationName: relationDetailFormData?.isCustomer?customer?.CustomerID:customer?.Name,
					relationNameID: customer?.CustomerID,

					// dob: null,
					// dob: relationDetailFormData?.dob,
					// dob: moment(customer?.DateofBirth),
					dob: customer?.DateofBirth ? moment(customer?.DateofBirth) : null,
					// dialCode: customer?.DialCode,
					dialCode: customer?.CountryCode
						? customer?.CountryCode
						: csObject[5]?.CountryCode?.defaultvalue,
					contactNumber: customer?.Mobile?.toString(),
					emailId: customer?.Email,
					address: customer?.Address
				});
			} else {
				setRelationDetailFormData({ ...relationDetailFormData, ...val });
			}
		} else if (relationDetailFormData?.isCustomer && val?.relationName) {
			const customer = existingCustomersList?.filter(
				(cust) => cust?.CustomerID === val?.relationName
			)[0];

			setRelationDetailFormData({
				isCustomer: val?.isCustomer ? val?.isCustomer : relationDetailFormData?.isCustomer,
				relationName: customer?.Name,
				relationNameID: customer?.CustomerID,
				dob: customer?.DateofBirth ? moment(customer?.DateofBirth) : null,
				dialCode: customer?.DialCode,
				contactNumber: customer?.Mobile?.toString(),
				emailId: customer?.Email,
				address: `${customer?.Address}, ${customer?.City}`
			});
		} else {
			setRelationDetailFormData({ ...relationDetailFormData, ...val });
		}
	};

	const relationDialingCode = (
		<Form.Item
			name='dialCode'
			// name="countryCode"

			noStyle
			validateTrigger={['onChange', 'onBlur']}
			rules={mainRuleObject && mainRuleObject?.dialcode ? mainRuleObject?.dialcode : []}
		>
			<ScSelect
				className='field'
				value={relationDetailFormData?.dialCode}
				disabled={relationDetailFormData?.isCustomer}
				// value={relationDetailFormData?.countryCode}
				placeholder={CONSTANTS.placeholders.select}
			>
				{/* {coutryCode
					.filter((item) => typeof item?.Dialing_Code === 'string')
					.map((country) => {
						<ScSelect.Option key={country?.country} value={country?.Dialing_Code}>
							{country?.Dialing_Code?.includes('+') ? '' : '+'}
							{country?.Dialing_Code}
						</ScSelect.Option>;
					})} */}
				{csObject &&
					csObject?.[0]?.CountryCode &&
					csObject?.[0]?.CountryCode?.lookupValue?.lookUpValues?.map((country) => (
						<ScSelect.Option key={country?.country} value={country?.Dialing_Code}>
							{/* + {country.Dialing_Code} */}
							{country?.Dialing_Code?.includes('+') ? '' : '+'}

							{country?.Dialing_Code}
						</ScSelect.Option>
					))}
				{/* {csObject[
					cs
						.map((item, index) => (item?.sectionName === 'Main' ? index : false))
						.filter((indexItem) => indexItem !== false)[0]
				] &&
					csObject[
						cs
							.map((item, index) => (item?.sectionName === 'Main' ? index : false))
							.filter((indexItem) => indexItem !== false)[0]
						// ].DialCode &&
					].CountryCode &&
					csObject[
						cs
							.map((item, index) => (item?.sectionName === 'Main' ? index : false))
							.filter((indexItem) => indexItem !== false)[0]
						// ]?.DialCode?.lookupValue?.lookUpValues?.map((country) => (
						//   <ScSelect.Option key={country?.country} value={country?.Dialing_Code}>
						//     + {country?.Dialing_Code}
					]?.CountryCode?.lookupValue?.lookUpValues?.map((country) => (
						<ScSelect.Option key={country?.country} value={country?.Dialing_Code}>
							{country?.Dialing_Code?.includes('+') ? '' : '+'}
							{country?.Dialing_Code}
						</ScSelect.Option>
					))} */}
			</ScSelect>
		</Form.Item>
	);

	const setDefaultModelValues = (val) => {
		setcheckbool(!checkbool);
		setRelationDetailFormData({
			isCustomer: val,
			relationName: null,
			dob: null,
			countryCode: '+63',
			contactNumber: null,
			emailId: null,
			address: null,
			relationType: null
		});
	};

	const callCancel = () => {
		setDefaultModelValues(true);
		onCancel();
	};

	return (
		<ScModal
			destroyOnClose={true}
			visible={visible}
			title='Add Relation'
			onCancel={onCancel}
			onOk={handleOk}
			closable={false}
			footer={[
				<ScButtonText type='text' key='back' onClick={callCancel}>
					Cancel
				</ScButtonText>,
				<ScButtonPrimary
					htmlType='submit'
					key='submit'
					type='primary'
					onClick={() => {
						form
							.validateFields()
							.then(() => {
								var lists = [];
								if (
									Object.keys(relationEditForm).length === 0 &&
									relationEditForm.constructor === Object
								) {
									lists = formData?.relationDetail;
								} else {
									lists = formData?.relationDetail?.filter((x) => {
										return x?.relationNameID != relationEditForm?.relationNameID;
									});
								}
								handleOk({
									relationDetail: [...(formData && lists), relationDetailFormData]
								});
								setRelationDetailFormData(relationDataDefault);
								form.resetFields();
							})
							.catch((err) => {
								console.log(err);
							});
					}}
				>
					Submit
				</ScButtonPrimary>
			]}
			centered
			width='50vw'
		>
			<Form
				form={form}
				layout='vertical'
				onValuesChange={onValuesChange}
				//initialValues={relationDetailFormData}
			>
				<ScRow align='middle'>
					{/* <Col span={11}> */}
					<Col span={24}>
						<Form.Item
							name='isCustomer'
							label='Customer Type'
							rules={
								gridRelationRuleObject && gridRelationRuleObject?.isExistingCustomer
									? gridRelationRuleObject?.isExistingCustomer
									: []
							}
						>
							<Radio.Group
								value={relationDetailFormData?.isCustomer}
								size='large'
								onChange={() => setDefaultModelValues(checkbool)}
							>
								{customerTypeOptions &&
									customerTypeOptions.map((radioOption) => (
										<Radio.Button
											// style={{ width: "50%" }}
											className={`radio-field ${
												relationDetailFormData?.isCustomer === radioOption?.value ? 'active' : ''
											}`}
											value={radioOption?.value}
											key={radioOption?.value}
										>
											{radioOption?.label}
										</Radio.Button>
									))}
							</Radio.Group>
						</Form.Item>
					</Col>
				</ScRow>
				<ScRow align='middle' justify='space-between'>
					<Col span={11}>
						<Form.Item
							name='relationName'
							// label='Full Name'
							label={
								<div>
									Full Name
									{<span style={{ color: 'red' }}> *</span>}
								</div>
							}
							validateTrigger={['onChange', 'onBlur']}
							// rules={
							//   gridRelationRuleObject && gridRelationRuleObject?.relationname
							//     ? gridRelationRuleObject?.relationname
							//     : []
							// }
							// rules={rules && rules?.relationname ? rules?.relationname : []}
							rules={
								gridRelationRuleObject
									? gridRelationRuleObject.relationname
									: rules?.relationname
									? rules?.relationname
									: []
							}
							required
						>
							{relationDetailFormData?.isCustomer ? (
								<ScSelect
									size='large'
									className='interaction-filter-dropdown name-input'
									placeholder={CONSTANTS.placeholders.search}
									optionFilterProp='children'
									value={formData?.refID}
									suffixIcon={
										<FontAwesomeIcon
											icon={faUser}
											//   style={{ color: "rgba(0,0,0,.45)" }}
										/>
									}
									filterOption={(input, option) => {
										let filterWith;
										if (relationFormFrom === 'customerCreate') {
											filterWith = ['Name'];
										} else {
											filterWith = ['Name', 'Mobile', 'Email', 'Address', 'City'];
										}
										return Object.keys(existingCustomersList[option.key])
											.filter((i) => filterWith && filterWith.includes(i))
											.find((key) => {
												return typeof existingCustomersList[option.key][key] === 'string'
													? existingCustomersList[option.key][key]
															.toLowerCase()
															.includes(input.toLowerCase())
													: existingCustomersList[option.key][key].includes(input.toLowerCase());
											});
									}}
									showSearch
								>
									{relationFormFrom === 'customerCreate'
										? existingCustomersList &&
										  existingCustomersList.map((item, index) => (
												<ScSelect.Option
													// value={item.ID}
													value={item.CustomerID}
													key={index}
												>
													{/* <ScRow align="top" justify="space-between"> */}
													<ScRow>
														<Col
															style={{
																overflow: 'hidden',
																whiteSpace: 'nowrap',
																textOverflow: 'ellipsis'
															}}
														>
															<Text>{item.Name}</Text>
														</Col>
													</ScRow>
												</ScSelect.Option>
										  ))
										: existingCustomersList &&
										  existingCustomersList.map((item, index) => (
												<ScSelect.Option
													value={item.CustomerID}
													key={index}
													style={{ padding: '10px' }}
												>
													<ScRow align='top' justify='space-between'>
														<Col span={4}>
															<div>
																<AvatarLogo
																	imgsrc={
																		item?.FileString &&
																		item?.FileString !== ' ' &&
																		item.FileString !== null &&
																		item.FileString
																	}
																	profileName={item.ProfileInitial}
																	avatarSize={AvatarSize.extrasmall}
																/>
															</div>
														</Col>
														{/* <Col span={4}>
                            {item?.profileImage != null ? (
                              <Avatar
                                style={avatar.smallAvatar}
                                // src={item?.profileImage}
                                src={`data:image/jpeg;base64,${item?.profileImage}`}
                              ></Avatar>
                            ) : (
                              <Avatar
                                style={{ color: "#f56a00", backgroundColor: "#E5EBFF" }}
                                size={55}
                              >
                                {item?.ProfileInitial}
                              </Avatar>
                            )}
                          </Col> */}
														<Col
															span={13}
															style={{
																padding: '0 5px',
																overflow: 'hidden',
																whiteSpace: 'nowrap',
																textOverflow: 'ellipsis'
															}}
														>
															<Space wrap direction='vertical' size={-1}>
																<Text>{item.Name}</Text>
																<Text
																	style={
																		ellipsis
																			? {
																					width: 280,
																					color: '#5D6DD1',
																					fontSize: '13px'
																			  }
																			: {
																					width: 100
																			  }
																	}
																	ellipsis={ellipsis ? ellipsis : false}
																>
																	<FontAwesomeIcon
																		icon={faMapMarkerAlt}
																		style={{
																			marginRight: '2px'
																		}}
																	/>
																	{item.Address}
																</Text>
															</Space>
														</Col>
														<Col span={6} style={{ textAlign: 'right' }}>
															<Text style={{ color: '#2C2D33', fontSize: '13px' }}>
																{item.City}
															</Text>
														</Col>
													</ScRow>
												</ScSelect.Option>
										  ))}
								</ScSelect>
							) : (
								<ScInput
									type='text'
									value={relationDetailFormData.relationName}
									placeholder={CONSTANTS.placeholders.enter}
									required
								/>
							)}
						</Form.Item>
					</Col>
					<Col span={11}>
						<Form.Item
							name='relationType'
							// label='Relation'
							label={
								<div>
									Relation
									{<span style={{ color: 'red' }}> *</span>}
								</div>
							}
							required={true}
							validateTrigger={['onChange', 'onBlur']}
							// rules={
							//   gridRelationRuleObject && gridRelationRuleObject.relation
							//     ? gridRelationRuleObject.relation
							//     : []
							// }
							// rules={rules && rules?.relation ? rules?.relation : []}
							rules={
								gridRelationRuleObject
									? gridRelationRuleObject.relation
									: rules?.relation
									? rules?.relation
									: []
							}
						>
							{cs && (
								<ScSelect placeholder={CONSTANTS.placeholders.select}>
									{csObject[
										cs
											.map((item, index) => (item.sectionName === 'Grid_Relation' ? index : false))
											.filter((indexItem) => indexItem !== false)[0]
									] &&
										csObject[
											cs
												.map((item, index) =>
													item.sectionName === 'Grid_Relation' ? index : false
												)
												.filter((indexItem) => indexItem !== false)[0]
										].Relation &&
										csObject[
											cs
												.map((item, index) =>
													item.sectionName === 'Grid_Relation' ? index : false
												)
												.filter((indexItem) => indexItem !== false)[0]
										].Relation.dropDownValue &&
										csObject[
											cs
												.map((item, index) =>
													item.sectionName === 'Grid_Relation' ? index : false
												)
												.filter((indexItem) => indexItem !== false)[0]
										].Relation.dropDownValue.map((option) => (
											<ScSelect.Option key={option.dataValue} value={option.dataValue}>
												{option.displayValue}
											</ScSelect.Option>
										))}
								</ScSelect>
							)}
						</Form.Item>
					</Col>
				</ScRow>
				<ScRow align='middle' justify='space-between'>
					<Col span={11}>
						<Form.Item
							name='dob'
							label='Date Of Birth'
							validateTrigger={['onChange', 'onBlur']}
							// rules={
							// 	gridRelationRuleObject && gridRelationRuleObject.relationDob
							// 		? gridRelationRuleObject.relationDob
							// 		: []
							// }
							rules={
								gridRelationRuleObject ? gridRelationRuleObject.dob : rules?.dob ? rules?.dob : []
							}
						>
							<ScDatePicker
								disabled={relationDetailFormData?.isCustomer}
								value={relationDetailFormData.dob}
								size='large'
								format='DD-MM-YYYY'
								disabledDate={(d) => !d || d.isAfter(new Date().setDate(new Date().getDate()))}
								placeholder={CONSTANTS.placeholders.date}
							/>
						</Form.Item>
					</Col>
					<Col span={11}>
						<Form.Item
							name='contactNumber'
							// label='Contact'
							label={
								<div>
									Contact
									{<span style={{ color: 'red' }}> *</span>}
								</div>
							}
							validateTrigger={['onChange', 'onBlur']}
							// rules={
							//   gridRelationRuleObject && gridRelationRuleObject.relationMobile
							//     ? gridRelationRuleObject.relationMobile
							//     : []
							// }
							// rules={rules && rules?.mobile ? rules?.mobile : []}
							rules={
								gridRelationRuleObject
									? gridRelationRuleObject.mobile
									: rules?.mobile
									? rules?.mobile
									: []
							}
						>
							<ScInput
								maxLength={10}
								type='number'
								onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
								addonBefore={relationDialingCode}
								disabled={relationDetailFormData?.isCustomer}
								value={relationDetailFormData.contactNumber}
								placeholder={CONSTANTS.placeholders.enter}
							></ScInput>
						</Form.Item>
					</Col>
				</ScRow>
				<ScRow align='middle'>
					<Col span={11}>
						<Form.Item
							name='emailId'
							label='Email ID'
							validateTrigger={['onChange', 'onBlur']}
							// rules={
							//   gridRelationRuleObject && gridRelationRuleObject.email
							//     ? gridRelationRuleObject.email
							//     : []
							// }
							// rules={rules && rules?.email ? rules?.email : []}
							rules={
								gridRelationRuleObject
									? gridRelationRuleObject.email
									: rules?.email
									? rules?.email
									: []
							}
						>
							<ScInput
								value={relationDetailFormData.emailId}
								disabled={relationDetailFormData?.isCustomer}
								placeholder={CONSTANTS.placeholders.enter}
							/>
						</Form.Item>
					</Col>
				</ScRow>
				<ScRow align='middle'>
					<Col span={24}>
						<Form.Item
							name='address'
							label='Address'
							validateTrigger={['onChange', 'onBlur']}
							// rules={
							//   gridRelationRuleObject && gridRelationRuleObject.relationAddress
							//     ? gridRelationRuleObject.relationAddress
							//     : []
							// }
							// rules={rules && rules?.address ? rules?.address : []}
							rules={
								gridRelationRuleObject
									? gridRelationRuleObject.address
									: rules?.address
									? rules?.address
									: []
							}
						>
							<ScTextArea
								rows={6}
								disabled={relationDetailFormData?.isCustomer}
								value={relationDetailFormData.address}
								placeholder={CONSTANTS.placeholders.enter}
							/>
						</Form.Item>
					</Col>
				</ScRow>
			</Form>
		</ScModal>
	);
};
export default RelationDetailFormModal;
