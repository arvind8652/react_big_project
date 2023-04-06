import { memo, useEffect, useState } from 'react';

// external imports
import { Card, Form, Row, Col, Input, Select, Checkbox, Typography, Button, Tooltip } from 'antd';

import { CloseOutlined, UserOutlined, EllipsisOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import {
	getClassifications,
	getAccountData,
	getAccountNameValidation
} from '../../../api/accountCreateApi';
import AvatarLogo from '../../Avatar/AvatarLogo';
import { RESP_FIELD_SIZE, RESP_AVATAR_SIZE_FOR_INPUT_FIELD } from '../../../theme';
import { Option } from 'antd/lib/mentions';
import AccountJointHolderDetail from './AccountJointHolderDetail';

const AccountDetails = ({
	csObject,
	rules,
	onValuesChange,
	formData,
	form,
	accountDetails,
	profileAccountDetails,
	action,
	userNameDropDownlist,
	user,
	clientId,
	formatJointAccountHolder = () => {}
}) => {
	const { Item } = Form;

	const [jointAccountHolders, setJointAccountHolders] = useState([]);
	const [data, setData] = useState(csObject?.JointHolderName?.lookupValue?.lookUpValues);
	const [getClassification, setGetClassification] = useState([]);
	const [getAccount, setGetAccount] = useState([]);
	const [createtAccountName, setCreateAccountName] = useState();

	useEffect(() => {
		doGetClassification();
	}, [formData.type]);

	useEffect(() => {
		if (
			action === 'edit' ||
			action === 'copy' ||
			action === 'profileEdit' ||
			action === 'profileCopy'
		) {
			setCreateAccountName(formData?.primaryAccountHolder);
		}
	}, [formData?.primaryAccountHolder]);

	const doGetClassification = () => {
		csObject?.Type?.dropDownValue?.map(async (item) => {
			if (item.dataValue === formData.type) {
				try {
					const response = await getClassifications(item.dataValue);
					setGetClassification(response.data);
				} catch {
					console.error();
				}
			}
		});
	};

	// const accountNameValidator = async ( rule, value, callback) => {
	//   if (value) {
	//     try {
	//       let response = await getAccountNameValidation(value);
	//       if (!response.data.success) {
	//         return Promise.reject(new Error(response.data.message));
	//       }
	//       else{
	//         return Promise.resolve();
	//       }
	//     }
	//     catch (error) {
	//       console.log('error data-----------',error)
	//     }
	//   }
	//   else{
	//     return Promise.resolve();
	//   }
	// };

	useEffect(() => {
		getAccountName();
	}, [formData.name]);

	useEffect(() => {
		if (
			!(
				action === 'edit' ||
				action === 'copy' ||
				action === 'profileEdit' ||
				action === 'profileCopy'
			)
		) {
			let nameForAccount, operationMode, holderList;
			nameForAccount = userNameDropDownlist?.find((itm) => itm.CustomerID === formData.name);
			if (formData.modeOfOperation) {
				operationMode = csObject?.ModeofOperation?.dropDownValue?.find(
					(itm) => itm.dataValue === formData?.modeOfOperation
				);
			}
			if (jointAccountHolders?.length > 0) {
				holderList = jointAccountHolders?.map((e) => {
					if (e?.second_name === '' && e?.third_name === '') {
						return e?.first_name;
					} else if (e?.third_name === '') {
						return e?.first_name + ' ' + e?.second_name;
					} else if (e?.second_name === '') {
						return e?.first_name + ' ' + e?.third_name;
					} else {
						return e?.first_name + ' ' + e?.second_name + ' ' + e?.third_name;
					}
				});
			}
			let nameString = nameForAccount?.Name;
			if (holderList?.length > 0) {
				for (let i = 0; i < holderList.length; i++) {
					nameString += ' ' + operationMode?.displayValue + ' ' + holderList[i];
				}
			}

			formData.accountName = nameString;
			form.setFieldsValue({ accountName: nameString });
			setCreateAccountName(nameString);
		}
	}, [formData.name, formData.modeOfOperation, jointAccountHolders, userNameDropDownlist]);

	const getAccountName = () => {
		userNameDropDownlist?.map(async (item) => {
			if (item.CustomerID === formData.name) {
				try {
					const response = await getAccountData(formData.name);
					setGetAccount(response.data);
				} catch (error) {}
			}
		});
	};

	useEffect(() => {
		setData(csObject?.JointHolderName?.lookupValue?.lookUpValues);
	}, [csObject?.JointHolderName?.lookupValue?.lookUpValues]);

	useEffect(() => {
		if (action !== 'edit' || action !== 'copy' || action !== 'profileCopy') {
			let obj = csObject?.Nature?.dropDownValue?.find(
				(o) => o?.dataValue === csObject?.Nature?.defaultvalue
			);
			if (obj) {
				formData.nature = obj?.dataValue;
				form.setFieldsValue({ nature: obj?.displayValue });
			} else {
				formData.nature = 'AR';
				form.setFieldsValue({ nature: 'Advisory' });
			}
		}
	}, []);

	useEffect(() => {
		const data = jointAccountHolders?.map((e) => ({
			jointId: e?.client_id,
			WsjointDetailsId: ''
		}));

		onValuesChange({ holdingAccount: data });
	}, [jointAccountHolders]);

	useEffect(() => {
		if (action === 'edit' || action === 'copy') {
			// feed up the data
			const newJointAccountHolders = accountDetails?.jointHolder?.map((e) => {
				return {
					client_id: e?.jointId,
					first_name: e?.name,
					third_name: '',
					FileString: e?.profileImage,
					ProfileInitial: e?.profileInitials,
					second_name: ''
				};
			});
			setJointAccountHolders(newJointAccountHolders);
		}
	}, [accountDetails]);

	useEffect(() => {
		if (action === 'profileEdit' || action === 'profileCopy') {
			// feed up the data
			const newJointAccountHolders = profileAccountDetails?.jointHolder?.map((e) => {
				return {
					client_id: e?.jointId,
					first_name: e?.name,
					third_name: '',
					FileString: e?.profileImage,
					ProfileInitial: e?.profileInitials,
					second_name: ''
				};
			});
			setJointAccountHolders(newJointAccountHolders);
		}
	}, [profileAccountDetails]);

	// useEffect(() => {
	// 	if (action === 'profileEdit' || action === 'profileCopy') {
	// 		// feed up the data
	// 		setHoldingPattern(formData?.holdingPattern);
	// 	}
	// }, [formData?.holdingPattern]);

	useEffect(() => {
		let jointHolderNames = [];
		if (
			typeof formData?.holdingAccount === 'object' &&
			Object?.keys(formData?.holdingAccount)?.length > 0
		) {
			formData?.holdingAccount?.map((_) => {
				csObject?.ModeofOperation?.dropDownValue?.filter((itm) => {
					if (itm?.dataValue === _?.modeOfOperation) {
						jointHolderNames.push(' ' + itm?.displayValue);
					}
				});
				csObject?.JointHolderName?.lookupValue?.lookUpValues?.filter((itm) => {
					if (itm?.client_id === _?.jointId) {
						jointHolderNames.push(` ${itm?.first_name} ${itm?.second_name} ${itm?.third_name} `);
					}
				});
			});
		} else {
			jointHolderNames = [];
		}

		onValuesChange({
			accountName: `${createtAccountName ?? ''} ${jointHolderNames?.toString()?.replace(/,/g, '')}`
		});
		form.setFieldsValue({
			accountName: `${createtAccountName ?? ''} ${jointHolderNames?.toString()?.replace(/,/g, '')}`
		});
	}, [formData?.holdingAccount, createtAccountName]);

	// useEffect(() => {
	// 	if (action === 'edit' || action === 'copy') {
	// 		// feed up the data
	// 		setHoldingPattern(formData?.holdingPattern);
	// 	}
	// }, [formData?.holdingPattern]);

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
			// marginRight: 10,
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
		dropDownHeight: { height: '150px', overflowY: 'scroll' },
		textJoint: { marginTop: '10px' }
	};

	// const renderCustomSelectOption = () => {
	// 	const handleOnChange = (
	// 		checked,
	// 		client_id,
	// 		first_name,
	// 		FileString,
	// 		ProfileInitial,
	// 		third_name,
	// 		second_name
	// 	) => {
	// 		if (checked) {
	// 			setJointAccountHolders([
	// 				...jointAccountHolders,
	// 				{
	// 					client_id: client_id,
	// 					first_name: first_name,
	// 					FileString: FileString,
	// 					ProfileInitial: ProfileInitial,
	// 					third_name: third_name,
	// 					second_name: second_name
	// 				}
	// 			]);
	// 		} else {
	// 			setJointAccountHolders(jointAccountHolders.filter((itm) => itm.client_id !== client_id));
	// 		}
	// 	};

	// 	return data?.map((e, idx) => {
	// 		return (
	// 			<div style={styleSet.parentCheckBox} key={idx}>
	// 				<div style={styleSet.checkboxContainer}>
	// 					<Checkbox
	// 						checked={
	// 							jointAccountHolders?.find((item) => item.client_id === e.client_id) ? true : false
	// 						}
	// 						onChange={(evt) =>
	// 							handleOnChange(
	// 								evt.target.checked,
	// 								e.client_id,
	// 								e.first_name,
	// 								e.FileString,
	// 								e.ProfileInitial,
	// 								e.third_name,
	// 								e?.second_name
	// 							)
	// 						}
	// 					/>
	// 				</div>
	// 				<div style={styleSet.itemCheckbox}>
	// 					<Typography.Text>
	// 						{e?.first_name + ' ' + e?.second_name + ' ' + e?.third_name}{' '}
	// 					</Typography.Text>
	// 				</div>
	// 			</div>
	// 		);
	// 	});
	// };

	// const handleOnChange = (query) => {
	// 	const small = query?.toLowerCase();
	// 	const newData = csObject?.JointHolderName?.lookupValue?.lookUpValues?.filter((e) => {
	// 		return e.first_name.toLowerCase().includes(small);
	// 	});
	// 	setData(newData);
	// };

	const updateHoldingPattern = (value) => {
		setJointAccountHolders([]);
		onValuesChange({ holdingPattern: value, modeOfOperation: '' });
	};

	return (
		<>
			<Card title='Account Details'>
				<Form
					form={form}
					initialValues={formData}
					onValuesChange={onValuesChange}
					layout='vertical'
				>
					<Row align='middle'>
						<Col span={8}>
							<Item
								name='accountName'
								validateTrigger={['onBlur']}
								rules={[
									{
										required: true,
										message: '* Account Name cannot be empty'
									}
									// {
									//   validator: !(action === "edit" || action === "profileEdit") ? accountNameValidator : ""
									// },
								]}
								label='Account Name'
								required={true}
							>
								<Input
									placeholder='Type in a name'
									size={RESP_FIELD_SIZE}
									disabled={true}
									suffix={
										<Tooltip title={formData?.accountName}>
											<EllipsisOutlined />
										</Tooltip>
									}
								/>
							</Item>
						</Col>
						{/* REMOVED FOR #497 AFTER DISCUSSED WITH DEEPAK */}
						{/* <Col span={8}>
              <Item label="Primary Account Holder" name="primaryAccountHolder">
                <Input
                  size="large"
                  placeholder="Type in a name"
                  maxLength="50"
                />
              </Item>
            </Col> */}
						<Col span={8}>
							<Item
								label='Product Provider Code'
								// rules={[
								// 	{ pattern: /^[A-Za-z0-9 ]+$/, message: 'Cannot contain special character(s)' }
								// ]}
								rules={rules ? rules?.productcode : []}
								name='productCode'
							>
								<Input size={RESP_FIELD_SIZE} placeholder='Enter code' />
							</Item>
						</Col>
						<Col span={8}>
							<Item label='Link Account' name='LinkAccount'>
								<Select
									showSearch
									placeholder='Search Account'
									size={RESP_FIELD_SIZE}
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={getAccount?.lookUpValues?.map((item) => ({
										label: item.Name,
										value: item.Scheme
									}))}
								/>
							</Item>
						</Col>
					</Row>
					{/* <Row align="middle">
            <col>
            {createtAccountName &&
              <Alert message={createtAccountName} type="info" />}
            </col>
          </Row> */}

					<Row align='middle'>
						<Col span={8}>
							<Item name='nature' rules={rules ? rules?.nature : []} label='Nature'>
								<Select
									placeholder='Select Option'
									showSearch={true}
									disabled={true}
									size={RESP_FIELD_SIZE}
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={csObject?.Nature?.dropDownValue?.map((item) => ({
										label: item.displayValue,
										value: item.dataValue
									}))}
								/>
							</Item>
						</Col>
						<Col span={8}>
							{/* <Item name='type' rules={rules ? rules?.type : []} label='Type'> */}
							<Item name='type' rules={rules ? rules?.type : []} label='Product Provider'>
								<Select
									placeholder='Select Option'
									showSearch={true}
									size={RESP_FIELD_SIZE}
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									// options={csObject?.Type?.dropDownValue?.map(
									//   (item) => ({ label: item.displayValue, value: item.dataValue })
									// )}
								>
									{csObject?.Type?.dropDownValue?.map((item, inx) => (
										<Option
											value={item.dataValue}
											label={item.displayValue}
											key={inx}
											disabled={user.userRole === 'RBSMKR' && item.dataValue === 'PS'}
										>
											{item.displayValue}
										</Option>
									))}
								</Select>
							</Item>
						</Col>
						<Col span={8}>
							<Item
								name='classification'
								rules={rules ? rules?.classification : []}
								label='Classification'
							>
								<Select
									placeholder='Select Option'
									showSearch={true}
									size={RESP_FIELD_SIZE}
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={getClassification?.lookUpValues?.map((item) => ({
										label: item.display_value,
										value: item.data_value
									}))}
								/>
							</Item>
						</Col>
					</Row>

					<Row>
						<Col span={8}>
							<Item
								name='holdingPattern'
								rules={rules ? rules?.holdingpattern : []}
								label='Holding Pattern'
							>
								<Select
									placeholder='Select Option'
									showSearch={true}
									size={RESP_FIELD_SIZE}
									value={formData?.holdingPattern ?? ''}
									onChange={(value) => updateHoldingPattern(value)}
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={csObject?.HoldingPattern?.dropDownValue?.map((item) => ({
										label: item.displayValue,
										value: item.dataValue
									}))}
								/>
							</Item>
						</Col>
						{/* <Col span={8}>
							<Item
								rules={[
									{
										required: formData?.holdingPattern === 'JOINT' ? true : false,
										message: '* Mode of Operation cannot be empty'
									}
								]}
								name='modeOfOperation'
								label='Mode Of Operation'
								required={holdingPattern === 'JOINT' ? true : false}
							>
								<Select
									placeholder='Select Option'
									showSearch={true}
									size={RESP_FIELD_SIZE}
									disabled={!holdingPattern || holdingPattern === 'SINGLE'}
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={csObject?.ModeofOperation?.dropDownValue?.map((item) => ({
										label: item.displayValue,
										value: item.dataValue
									}))}
								/>
							</Item>
						</Col>
						<Col span={8}>
							<Item
								name='holdingAccountHolder'
								rules={[
									{
										required:
											formData?.holdingPattern === 'JOINT' && jointAccountHolders?.length === 0
												? true
												: false,
										message: '* Select atleast one joint holder'
									}
								]}
								label='Joint Holder(s) Name'
								required={holdingPattern === 'JOINT' ? true : false}
							>
								<Select
									placeholder='Search by name'
									size={RESP_FIELD_SIZE}
									onSearch={handleOnChange}
									dropdownStyle={styleSet.dropDownHeight}
									disabled={!holdingPattern || holdingPattern === 'SINGLE'}
									mode='multiple'
									dropdownRender={renderCustomSelectOption}
								/>
							</Item>
						</Col> */}

						{/* ----------------------------- */}
						<Col span={24}>
							<AccountJointHolderDetail
								csObject={csObject}
								onValuesChange={onValuesChange}
								formData={formData}
								dataSource={formData?.holdingAccount}
								clientId={clientId}
								formatJointAccountHolder={formatJointAccountHolder}
							/>
						</Col>
						{/* ----------------------------- */}
						{/* <Col span={24}>
							<div>
								{jointAccountHolders?.length > 0 && holdingPattern === 'JOINT' ? (
									<div style={styleSet.textJoint}>Joint Holders</div>
								) : (
									''
								)}
							</div>
						</Col>
						{jointAccountHolders?.length > 0 && holdingPattern === 'JOINT' && (
							<Col span={24}>
								<div>
									{jointAccountHolders?.length > 0 && (
										<div style={styleSet.tagContainer}>
											{jointAccountHolders?.map((e) => (
												<Col span={6}>
													<div style={styleSet.tag}>
														<div style={styleSet.close}>
															<AvatarLogo
																imgsrc={e.FileString}
																profileName={e.ProfileInitial}
																avatarSize={RESP_AVATAR_SIZE_FOR_INPUT_FIELD}
															/>
														</div>
														<div
															title={e?.first_name + ' ' + e?.second_name + ' ' + e?.third_name}
															style={styleSet.name}
														>
															{e?.first_name + ' ' + e?.second_name + ' ' + e?.third_name}
														</div>
														<div style={styleSet.close}>
															<CloseOutlined
																onClick={() =>
																	setJointAccountHolders(
																		jointAccountHolders?.filter(
																			(item) => item.client_id !== e.client_id
																		)
																	)
																}
															/>
														</div>
													</div>
												</Col>
											))}
										</div>
									)}
								</div>
							</Col>
						)} */}
					</Row>
				</Form>
			</Card>
		</>
	);
};

const mapStateToProps = (state) => ({
	accountDetails: state.accountCreate.accountDetails,
	profileAccountDetails: state.accountCreate.accountDetailsProfile
});

export default connect(mapStateToProps)(memo(AccountDetails));
