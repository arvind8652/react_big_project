import { Form, Col, Card, Typography, Table, Row, Space } from 'antd';
import { faEdit, faTrashAlt } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import {
	ScButtonPrimary,
	ScButtonText,
	ScModal,
	ScRow,
	ScTable
} from '../../StyledComponents/genericElements';
import { ScSelect } from '../../StyledComponents/formElements';
import { getOwnershipDetails } from '../../../api/accountViewApi';
import moment from 'moment';
import { getDateFormat } from '../../../utils/utils';

const AccountJointHolderDetail = ({
	csObject,
	formData = {},
	dataSource = [],
	onValuesChange = () => {},
	action = '',
	clientId,
	formatJointAccountHolder = () => {}
}) => {
	const [form] = Form.useForm();
	const [showJointHolderModal, setShowJointHolderModal] = useState(false);
	const [holderDetailForEdit, setHolderDetailForEdit] = useState({});
	const [showJointHolderModalForEdit, setShowJointHolderModalForEdit] = useState(false);
	const [showOwnershipDetails, setShowOwnershipDetails] = useState(false);
	const [ownershipDetailsData, setOwnershipDetailsData] = useState([]);
	// const JointHolderModal = (holderDetailForEdit = {}, showJointHolderModalForEdit = false) => {
	const getOwnershipDetailsFunc = async () => {
		try {
			const response = await getOwnershipDetails(clientId);
			setOwnershipDetailsData(response.data);
		} catch (error) {
			console.info(error);
		}
	};
	useEffect(() => {
		setOwnershipDetailsData([]);
		getOwnershipDetailsFunc();
	}, [clientId]);

	// (prev) => {
	// 	if (prev === undefined) return record.lstJointDetails;
	// 	if (prev)

	// else
	// 	return [
	// 		...prev?.filter(
	// 			(item) => JSON.stringify(item) !== JSON.stringify(...record.lstJointDetails)
	// 		),
	// 		...record.lstJointDetails
	// 	];
	// if (prev)
	// 	return [
	// 		...prev?.filter(
	// 			(item) => JSON.stringify(item) !== JSON.stringify(...record.lstJointDetails)
	// 		),
	// 		...record.lstJointDetails
	// 	];
	// else return record.lstJointDetails;
	const OwnershipDetailsComponent = () => {
		const columns = [
			{
				title: 'Investment ID',
				dataIndex: 'ownership',
				key: 'ownership',
				width: 150,
				render: (_, record) => (
					<Space size='middle'>
						<a
							onClick={() => {
								setShowOwnershipDetails(false);
								// form.setFieldsValue({
								// 	bankDetails: [
								// 		{
								// 			default: false,
								// 			bankName: record?.bankCode,
								// 			branch: record?.branch,
								// 			accountType: record?.accountType,
								// 			accountNo: record?.accountNo,
								// 			currency: record?.currency,
								// 			accountStatus: record?.status,
								// 			remarks: record?.remarks,
								// 			clientId: '',
								// 			custBankId: '',
								// 			srlNo: 1
								// 		}
								// 	]
								// });
								onValuesChange({
									reportingCurrency: record?.reportingCurrency,
									bankDetails: record?.bankDetails,
									bankDetailsFromOwnerShipDetail: record?.bankDetails,
									BankDetailsFormCard: record?.bankDetails,
									// bankDetails: [
									// 	{
									// 		default: false,
									// 		bankName: record?.bankCode,
									// 		branch: record?.branch,
									// 		accountType: record?.bankAccountType,
									// 		accountNo: record?.accountNo,
									// 		currency: record?.currency,
									// 		accountStatus: record?.status,
									// 		remarks: record?.remarks,
									// 		clientId: '',
									// 		custBankId: '',
									// 		srlNo: 1
									// 	}
									// ],

									// bankDetailsFromOwnerShipDetail: [
									// 	{
									// 		default: false,
									// 		bankName: record?.bankCode,
									// 		branch: record?.branch,
									// 		accountType: record?.bankAccountType,
									// 		accountNo: record?.accountNo,
									// 		currency: record?.currency,
									// 		accountStatus: record?.status,
									// 		remarks: record?.remarks,
									// 		clientId: '',
									// 		custBankId: '',
									// 		srlNo: 1
									// 	}
									// ],

									// BankDetailsFormCard: [
									// 	{
									// 		default: false,
									// 		bankName: record?.bankCode,
									// 		branch: record?.branch,
									// 		accountType: record?.bankAccountType,
									// 		accountNo: record?.accountNo,
									// 		currency: record?.currency,
									// 		accountStatus: record?.status,
									// 		remarks: record?.remarks,
									// 		clientId: '',
									// 		custBankId: '',
									// 		srlNo: 1
									// 	}
									// ],
									holdingPattern: record.holdingPattern,
									holdingAccount:
										record.holdingPattern === 'JOINT'
											? formatJointAccountHolder(record.lstJointDetails)
											: []
								});
							}}
						>
							{record.ownership}
						</a>
					</Space>
				)
			},
			{
				title: 'Joint Holder Details',
				dataIndex: 'ownershipDetail',
				key: 'ownershipDetail',
				width: 300,
				render: (_, record) => (
					<Space size='middle' style={{ color: 'black' }}>
						<div> {record.ownershipDetail}</div>
					</Space>
				)
			},
			{
				title: 'Product Provider',
				key: 'productCode',
				dataIndex: 'productCode',
				width: 250,
				render: (_, record) => (
					<Space size='middle' style={{ color: 'black' }}>
						<div> {record.productCode}</div>
					</Space>
				)
			},
			{
				title: 'Type',
				dataIndex: 'accountTypeName',
				key: 'accountTypeName',
				width: 150,
				render: (_, record) => (
					<Space size='middle' style={{ color: 'black' }}>
						<div> {record.accountTypeName}</div>
					</Space>
				)
			},
			{
				title: 'Classification',
				dataIndex: 'accountClassificationName',
				key: 'accountClassificationName',
				width: 150,
				render: (_, record) => (
					<Space size='middle' style={{ color: 'black' }}>
						<div> {record.accountClassificationName}</div>
					</Space>
				)
			}
		];
		return (
			<ScModal
				visible={showOwnershipDetails}
				title='Ownership Details'
				closable={true}
				width='75vw'
				footer={null}
				onCancel={() => setShowOwnershipDetails(false)}
				centered
			>
				<Table columns={columns} dataSource={ownershipDetailsData} pagination={false} />
			</ScModal>
		);
	};
	const JointHolderModal = () => {
		const [jointHolderDetail, setJointHolderDetail] = useState({});
		// if (showJointHolderModalForEdit) {
		// 	form.setFieldsValue({
		// 		modeOfOperation: holderDetailForEdit?.holderDetailForEdit?.modeOfOperation,
		// 		jointId: holderDetailForEdit?.holderDetailForEdit?.jointId
		// 	});
		// }
		// const [jointHolderDetail, setJointHolderDetail] = useState(
		// 	holderDetailForEdit?.holderDetailForEdit
		// );
		const onChangeHandler = (key, val) => {
			if (key === 'modeOfOperation') {
				setJointHolderDetail({
					...jointHolderDetail,
					[key]: val,
					['WsjointDetailsId']: '',
					['jointId']: null
				});
				form.setFieldsValue({ jointId: null });
			} else {
				setJointHolderDetail({ ...jointHolderDetail, [key]: val, ['WsjointDetailsId']: '' });
			}
		};
		const onSubmitHandler = () => {
			onValuesChange({
				holdingAccount: [...(formData && formData?.holdingAccount), jointHolderDetail]
			});
		};
		const callCancel = () => {
			setShowJointHolderModal(false);
			setJointHolderDetail({});
			form.resetFields();
		};
		return (
			<ScModal
				destroyOnClose={true}
				visible={showJointHolderModal}
				title='Add Joint Holder Detail'
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
									onSubmitHandler();
									setJointHolderDetail({});
									setShowJointHolderModal(false);
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
				// width='25vw'
				width='40vw'
				// width='60vw'
			>
				<Form form={form} layout='vertical'>
					<ScRow align='middle'>
						<Col span={24}>
							<Form.Item
								name='modeOfOperation'
								// label='Mode Of Operation'
								label={
									<div>
										Mode Of Operation
										{formData?.holdingPattern === 'JOINT' ? (
											<span style={{ color: 'red' }}> *</span>
										) : null}
									</div>
								}
								validateTrigger={['onChange', 'onBlur']}
								rules={[
									{
										required: formData?.holdingPattern === 'JOINT' ? true : false,
										message: '* Mode of Operation cannot be empty'
									}
								]}
								required={formData?.holdingPattern === 'JOINT' ? true : false}
							>
								<ScSelect
									placeholder='Select Option'
									showSearch={true}
									value={jointHolderDetail?.modeOfOperation}
									onChange={(val) => {
										onChangeHandler('modeOfOperation', val);
										val !== 'ITF' && localStorage?.setItem('modeOp', val);
									}}
									filterOption={(input, option) => {
										return option?.label?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0;
									}}
								>
									{csObject?.ModeofOperation?.dropDownValue?.map((item) => (
										<ScSelect.Option
											key={item?.dataValue}
											label={item?.displayValue}
											value={item?.dataValue}
											disabled={
												(localStorage?.getItem('modeOp') === 'AND' && item?.dataValue === 'OR') ||
												(localStorage?.getItem('modeOp') === 'OR' && item?.dataValue === 'AND')
											}
										>
											{item?.displayValue}
										</ScSelect.Option>
									))}
								</ScSelect>
							</Form.Item>
						</Col>
					</ScRow>
					<ScRow align='middle'>
						<Col span={24}>
							<Form.Item
								name='jointId'
								// label='Joint Holder Name'
								label={
									<div>
										Joint Holder Name
										{formData?.holdingPattern === 'JOINT' ? (
											<span style={{ color: 'red' }}> *</span>
										) : null}
									</div>
								}
								validateTrigger={['onChange', 'onBlur']}
								rules={[
									{
										required: formData?.holdingPattern === 'JOINT' ? true : false,
										message: '* Joint Holder Name cannot be empty'
									}
								]}
								required={formData?.holdingPattern === 'JOINT' ? true : false}
							>
								<ScSelect
									title={
										!jointHolderDetail?.modeOfOperation ? 'Please select mode of operation' : ''
									}
									disabled={!jointHolderDetail?.modeOfOperation}
									optionLabelProp='label'
									placeholder='Select Option'
									showSearch={true}
									value={jointHolderDetail?.holdingAccountHolder}
									onChange={(val) => {
										onChangeHandler('jointId', val);
									}}
									filterOption={(input, option) => {
										return (
											option?.label?.toString()?.toLowerCase()?.indexOf(input?.toLowerCase()) >=
												0 ||
											option?.otherIdNo?.toString()?.toLowerCase()?.indexOf(input?.toLowerCase()) >=
												0 ||
											option?.mobileNo?.toString()?.toLowerCase()?.indexOf(input?.toLowerCase()) >=
												0 ||
											option?.emailId?.toString()?.toLowerCase()?.indexOf(input?.toLowerCase()) >=
												0 ||
											option?.dob?.toString()?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
										);
									}}
								>
									{/* {csObject?.JointHolderName?.lookupValue?.lookUpValues?.map((item) => ( */}
									{csObject?.JointHolderName?.lookupValue?.lookUpValues?.map(
										(item) =>
											item?.client_id !== formData?.name &&
											((item?.PHYSCHLGDMINOR === ' ' &&
												(jointHolderDetail?.modeOfOperation === 'AND' ||
													jointHolderDetail?.modeOfOperation === 'OR')) ||
												((item?.PHYSCHLGDMINOR === 'ITF' || item?.PHYSCHLGDMINOR === 'MINOR') &&
													jointHolderDetail?.modeOfOperation === 'ITF')) && (
												// item?.PHYSCHLGDMINOR === jointHolderDetail?.modeOfOperation) && (
												// (item?.PHYSCHLGDMINOR === ' ' &&
												// (jointHolderDetail?.modeOfOperation === 'AND' ||
												// 	jointHolderDetail?.modeOfOperation === 'EITHEROR')) && (
												// item?.PHYSCHLGDMINOR === formData?.modeOfOperation && (
												// item?.PHYSCHLGDMINOR === 'MINOR' && (
												<ScSelect.Option
													disabled={formData?.holdingAccount?.find((e) => {
														let duplicateVal = false;
														if (e?.jointId === item?.client_id) {
															duplicateVal = true;
														}
														return duplicateVal;
													})}
													key={item?.ID}
													value={item?.client_id}
													label={`${item?.first_name} ${item?.second_name} ${item?.third_name} `}
													otherIdNo={item?.OTHERIDNO}
													mobileNo={item?.MOBILE}
													emailId={item?.EMAIL}
													dob={
														item?.DATEOFBIRTHCORP &&
														moment(item?.DATEOFBIRTHCORP).format(getDateFormat())
													}
												>
													{/* {`${item?.first_name} ${item?.second_name} ${item?.third_name} `} */}

													<Row>
														<Col span={20}>
															<Row>
																<Col
																	span={24}
																>{`${item?.OTHERIDNO} / ${item?.first_name} ${item?.second_name} ${item?.third_name} `}</Col>
															</Row>
															<Row>
																<Col span={24}>{`${item?.MOBILE ? item?.MOBILE : ''} / ${
																	item?.EMAIL ? item?.EMAIL : ''
																}`}</Col>
															</Row>
														</Col>
														<Col span={4}>{`${
															item?.DATEOFBIRTHCORP
																? moment(item?.DATEOFBIRTHCORP).format(getDateFormat())
																: ' '
														}`}</Col>
													</Row>
												</ScSelect.Option>
											)
									)}
								</ScSelect>
							</Form.Item>
						</Col>
					</ScRow>
				</Form>
			</ScModal>
		);
	};

	const removeJointHolderDetail = (dataObject) => {
		onValuesChange({
			holdingAccount: dataSource.filter(
				(item) => JSON.stringify(item) !== JSON.stringify(dataObject)
			)
		});
	};

	const editJointHolderDetail = (dataObject) => {
		setHolderDetailForEdit(dataObject);
		setShowJointHolderModalForEdit(true);
		setShowJointHolderModal(true);
	};

	const renderModeOfOperationColumn = (modeOfOperation, dataSource) => {
		if (action !== 'view') {
			let displayVal;
			if (modeOfOperation) {
				csObject?.ModeofOperation?.dropDownValue?.find((e) => {
					if (modeOfOperation === e.dataValue) {
						displayVal = e?.displayValue;
					}
				});
			}
			return displayVal;
		}
		return dataSource?.modeOfOperationName;
	};

	const renderJointIdColumn = (jointId, dataSource) => {
		if (action !== 'view') {
			let displayVal;
			if (jointId) {
				csObject?.JointHolderName?.lookupValue?.lookUpValues?.find((e) => {
					if (jointId === e.client_id) {
						displayVal = `${e?.first_name} ${e?.second_name} ${e?.third_name} `;
					}
				});
			}
			return displayVal;
		}
		return dataSource?.customerName;
	};

	const columns = [
		{
			title: 'Mode Of Operation',
			dataIndex: 'modeOfOperation',
			key: 'jointId',
			render: (modeOfOperation, dataSource) =>
				renderModeOfOperationColumn(modeOfOperation, dataSource)
		},
		{
			title: 'Joint Holder Name',
			dataIndex: 'jointId',
			key: 'jointId',
			render: (jointId, dataSource) => renderJointIdColumn(jointId, dataSource)
		}
	];

	// let editColumn = {
	// 	title: '',
	// 	width: 50,
	// 	dataIndex: '',
	// 	key: 'jointId',
	// 	render: (dataObject) => (
	// 		<span>
	// 			<FontAwesomeIcon
	// 				icon={faEdit}
	// 				onClick={() => {
	// 					editJointHolderDetail(dataObject);
	// 				}}
	// 			/>
	// 		</span>
	// 	)
	// };
	// columns.push(editColumn);

	let deleteColumn = {
		title: '',
		width: 50,
		dataIndex: '',
		key: 'jointId',
		render: (jointId, dataObject, index) => (
			<span>
				<FontAwesomeIcon
					icon={faTrashAlt}
					onClick={() => {
						removeJointHolderDetail(dataObject, index);
					}}
				/>
			</span>
		)
	};
	action !== 'view' && columns.push(deleteColumn);
	return (
		<>
			<OwnershipDetailsComponent />
			<JointHolderModal
				holderDetailForEdit={holderDetailForEdit}
				showJointHolderModalForEdit={showJointHolderModalForEdit}
			/>
			<Card
				style={{ marginTop: '20px' }}
				type='inner'
				title='Joint Holder(s) Detail'
				extra={
					action !== 'view' && (
						// <a
						// 	disabled={formData?.holdingPattern !== 'JOINT' || formData?.name === null}
						// 	onClick={() => {
						// 		formData?.holdingPattern === 'JOINT' &&
						// 			formData?.name !== null &&
						// 			setShowJointHolderModal(!showJointHolderModal);
						// 		showJointHolderModalForEdit(false);
						// 		form.resetFields();
						// 	}}
						// >
						// 	+ Add Joint Holder Detail
						// </a>
						<>
							<Typography.Title level={5}>
								<Typography.Link>
									<a
										disabled={formData?.name === null}
										onClick={() => {
											formData?.name !== null && setShowOwnershipDetails(!showOwnershipDetails);
										}}
									>
										+ Ownership Details
									</a>
								</Typography.Link>
							</Typography.Title>
							<Typography.Title level={5}>
								<Typography.Link>
									<a
										disabled={formData?.holdingPattern !== 'JOINT' || formData?.name === null}
										onClick={() => {
											if (
												formData?.holdingAccount?.length === 0 &&
												localStorage?.getItem('modeOp')
											) {
												localStorage?.removeItem('modeOp');
											} else if (
												formData?.holdingAccount?.length > 0 &&
												localStorage?.getItem('modeOp')
											) {
												let checkAndOr = false;
												formData?.holdingAccount?.map((_) => {
													if (_?.modeOfOperation === 'AND' || _?.modeOfOperation === 'OR') {
														checkAndOr = true;
													}
												});
												if (!checkAndOr) {
													localStorage?.removeItem('modeOp');
												}
											}
											formData?.holdingPattern === 'JOINT' &&
												formData?.name !== null &&
												setShowJointHolderModal(!showJointHolderModal);
											showJointHolderModalForEdit(false);
											form.resetFields();
										}}
									>
										+ Add Joint Holder Detail
									</a>
								</Typography.Link>
							</Typography.Title>
						</>
					)
				}
			>
				<ScTable
					columns={columns}
					dataSource={formData?.holdingPattern === 'JOINT' ? dataSource : []}
					// scroll={{ y: 150 }}
					backgroundColor='#F0F2FB'
					pagination={false}
				/>
			</Card>
		</>
	);
};

export default AccountJointHolderDetail;
