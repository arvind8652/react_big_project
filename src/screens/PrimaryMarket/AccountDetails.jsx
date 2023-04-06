import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Row, Col, Avatar, Form } from 'antd';
import {
	executeGetClientInfo,
	executeGetClientAccounts,
	setPrimaryOrder,
	executeGetCreditAccounts,
	executeGetCustomerDetails
} from '../../redux/actions/primaryMarketActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/pro-solid-svg-icons';
import { ClientCard } from './ClientCard';

import CustomModal from '../../components/Modal/CustomModal/CustomModal';

export const AccountDetails = ({
	setUserBankAccOptions = () => {},
	returnValidators = () => {},
	setPlaceButtonFlag = () => {},
	handleFormValues = () => {},
	returnFormField = () => {},
	formValues = {}
}) => {
	const dispatch = useDispatch();
	const [clients, setClients] = useState([]);
	const [isClientSelected, setClientSelectionStatus] = useState(false);
	const [clientAccounts, setClientAccounts] = useState([]);
	const [alertMessage, setAlertMessage] = useState(false);
	const [clientData, setClientData] = useState({});

	const styles = {
		fontSize: { fontSize: '0.6rem' }
	};

	useEffect(() => {
		executeGetClientInfo().then((e) => {
			setClients(e.data);
		});
		executeGetClientAccounts('').then((data) => {
			setClientAccounts(data);
		});
	}, []);

	const setSelectedClientFunc = (e) => {
		handleFormValues({ clientId: e, selectedAccount: '' });
	};

	const setSelectedAccountFunc = (selectedOption) => {
		let selectedData = clientAccounts.find((e) => e.scheme === selectedOption);
		// handleFormValues({ selectedAccount: selectedOption, sourceOfFund: selectedData.sourceOfFund });
		if (formValues.clientId === null) {
			handleFormValues({
				selectedAccount: selectedOption,
				sourceOfFund: selectedData.sourceOfFund,
				clientId: selectedData.client_id
			});
		} else {
			handleFormValues({
				selectedAccount: selectedOption,
				sourceOfFund: selectedData.sourceOfFund
			});
		}
	};

	const customerData = useSelector((state) => state.common.customerInfo.customerCode);
	const showCustomer = useSelector((state) => state.dashboard.childMenuFlag);

	useEffect(() => {
		if (customerData && showCustomer) {
			setSelectedClientFunc(customerData);
		}
	}, [customerData, showCustomer, clientData]);

	useEffect(() => {
		executeGetCustomerDetails(formValues.clientId).then((response) => {
			setClientData(response);
			if (response && !response.tin) {
				setAlertMessage(true);
				setPlaceButtonFlag(true);
				setClientSelectionStatus(false);
			} else {
				setPlaceButtonFlag(false);
				executeGetClientAccounts(formValues.clientId).then((data) => {
					setClientAccounts(data);
					setClientSelectionStatus(true);
				});
			}
		});
	}, [formValues.clientId]);

	useEffect(() => {
		dispatch(
			setPrimaryOrder({
				scheme: formValues.selectedAccount
			})
		);

		if (clientAccounts.length > 0) {
			let selectedData = clientAccounts.find((e) => e.scheme === formValues.selectedAccount);
			if (selectedData) {
				dispatch(
					setPrimaryOrder({
						accCurrency: selectedData.accCurrency
					})
				);
				handleFormValues({ sourceOfFund: selectedData.sourceOfFund });
			}
		}

		executeGetCreditAccounts(formValues.selectedAccount).then((options) => {
			let optionsData = options.lookUpValues.map((eachOption) => {
				return {
					dataValue: eachOption[options.returnColumn],
					displayValue: eachOption[options.displayColumn]
				};
			});
			setUserBankAccOptions(optionsData);
		});
		if (formValues.clientId === null) {
		}
	}, [formValues.selectedAccount, clientAccounts]);

	return (
		<>
			<Row>
				{showCustomer === false && (
					<Col span={8}>
						<Form.Item
							label={'Select Client'}
							colon={false}
							labelCol={{ span: '24' }}
							className='cardColumn'
							labelAlign='left'
							name='clientId'
							rules={returnValidators('ClientName')}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								showSearch
								size='large'
								placeholder='Select a client'
								onChange={setSelectedClientFunc}
								value={showCustomer ? customerData : returnFormField('clientId')}
								disabled={showCustomer}
								filterOption={(input, option) => {
									return option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
							>
								{clients.length > 0 &&
									clients.map((item, index) => (
										<Select.Option
											key={`${item.firstName} ${item.lastName} ${index}`}
											value={item.customerId}
										>
											<Row>
												<Col span={4}>
													<Avatar size={30}>{item.profileInitial}</Avatar>
												</Col>
												<Col span={15}>
													<Row>
														<Col className='clientName' style={{ fontSize: '0.85rem' }}>
															{`${item.firstName} ${item?.lastName}`}
														</Col>
													</Row>
													<Row>
														<Col>
															<FontAwesomeIcon icon={faMapMarkerAlt} style={{ height: '0.6rem' }} />
															<span
																style={{
																	fontSize: '0.6rem',
																	marginLeft: '5px'
																}}
															>
																{item.address}
															</span>
														</Col>
													</Row>
												</Col>
												<Col span={3} style={styles.fontSize}>
													{item.city}
												</Col>
											</Row>
										</Select.Option>
									))}
							</Select>
						</Form.Item>
					</Col>
				)}

				<Col span={8}>
					<Form.Item
						label={'Select Account'}
						colon={false}
						labelCol={{ span: '24' }}
						className='cardColumn'
						labelAlign='left'
						name='selectedAccount'
						rules={returnValidators('AccountName')}
						validateTrigger={['onChange', 'onBlur']}
					>
						<Select
							showSearch
							placeholder='Select a account'
							onChange={setSelectedAccountFunc}
							value={formValues.selectedAccount}
							size='large'
							// disabled={!isClientSelected ?? true}
							filterOption={(input, option) => {
								return option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0;
							}}
						>
							{clientAccounts.length > 0 &&
								clientAccounts.map((item, idx) => (
									<Select.Option key={`${item.schemeName} ${idx}`} value={item?.scheme}>
										<Row>
											<Col span={4}>
												<Avatar size={30}>{item?.profileInitial}</Avatar>
											</Col>
											<Col span={15}>
												<Row>
													<Col className='clientName' style={{ fontSize: '0.85rem' }}>
														{`${item?.schemeName}`}
													</Col>
												</Row>
											</Col>
											<Col span={3} style={styles.fontSize}>
												{item.accountNatureName ? item.accountNatureName : '-'}
											</Col>
										</Row>
									</Select.Option>
								))}
						</Select>
					</Form.Item>
				</Col>
				<CustomModal
					visible={alertMessage}
					children={<h2>Kindly capture TIN in client master to proceed with application</h2>}
					closable={true}
					onOk={() => console.log('OK PRESSED')}
					handleCancel={() => {
						setAlertMessage(false);
						handleFormValues({ clientId: '' });
					}}
				/>
				{isClientSelected && <ClientCard clientData={clientData} />}
			</Row>
		</>
	);
};
