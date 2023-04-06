import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, Row, Col, Avatar, Form } from "antd";
import {
	executeGetClientInfo,
	executeGetClientAccounts,
	setSecondaryOrder,
	executeGetCreditAccounts,
	executegGetCustomerDetails,
	executegGetJointHolderDetails,
	setSMCalculator,
	setJointHolderDetails,
} from "../../redux/actions/pNBActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/pro-solid-svg-icons";
import { ClientCard } from "../PrimaryMarket/ClientCard";

import CustomModal from "../../components/Modal/CustomModal/CustomModal";

export const AccountDetails = ({
	setUserBankAccOptions = () => {},
	setSrcOfFund = () => {},
	returnValidators = () => {},
	setPlaceButtonFlag = () => {},
	handleFormValues = () => {},
	setAccountName = () => {},
	onSelectClient,
	clientId,
	schemeAD,
	setAccName = () => {},
	formValues ={},
	action = "add",
	// orderDetailsFormValues={}
}) => {
	const dispatch = useDispatch();
	const [clients, setClients] = useState([]);
	const [selectedClient, setSelectedClient] = useState("");
	const [isClientSelected, setClientSelectionStatus] = useState(false);
	const [clientAccounts, setClientAccounts] = useState([]);
	const [selectedAccount, setSelectedAccount] = useState("");
	const [alertMessage, setAlertMessage] = useState(false);
	const [clientData, setClientData] = useState({});
	const styles = {
		fontSize: { fontSize: "0.6rem" },
	};

	useEffect(() => {
		executeGetClientInfo().then((e) => {
			setClients(e.data);
		});
		if(action!=="edit"){
			executeGetClientAccounts("").then((data) => {
				setClientAccounts(data);
			});
		}
	}, []);

	useEffect(()=>{
		if(formValues?.clientId!==null && formValues?.clientId!=="" && formValues?.clientId!==undefined && action!=="edit"){
			executegGetCustomerDetails(formValues?.clientId)
			.then((res)=>{
				setClientData(res)		
			setClientSelectionStatus(true);
			setSelectedClient(formValues?.clientId)
			});
			let selectedAccountVal = selectedAccount;
			
			executeGetClientAccounts(formValues?.clientId).then((data) => {
				setClientAccounts(data);
				setClientSelectionStatus(true);
				setAccountName(data[0]?.customerName);

				handleFormValues({
					selectedAccount: selectedAccount,
					scheme: selectedAccount,
				});
			});
		}
	},[formValues?.clientId])

	useEffect(() => {
		dispatch(setJointHolderDetails(null));
		// executegGetCustomerDetails(clientId);
		executegGetCustomerDetails(clientId).then((res)=>{
			setClientData(res)
		});
		setSelectedClient(clientId);
		handleFormValues({ clientId: clientId, selectedAccount: "" });
		setSelectedAccount("");
		let selectedClient = clientId;
		if (selectedClient)
			executeGetClientAccounts(selectedClient).then((data) => {
				setClientAccounts(data);
				setClientSelectionStatus(true);
				setAccountName(data[0]?.customerName);
			});
		let result = clients?.filter((el) => el?.customerId === clientId);
		onSelectClient(result?.[0]);
	}, [clientId]);

	useEffect(() => {
		executegGetJointHolderDetails(schemeAD);
		setSelectedAccount(schemeAD);
		if(schemeAD){
			handleFormValues({
				selectedAccount: schemeAD,
				scheme: schemeAD,
			});
		}
		if(schemeAD){
		executeGetCreditAccounts(schemeAD).then((options) => {
			let optionsData = options.lookUpValues.map((eachOption) => {
				return {
					dataValue: eachOption[options.returnColumn],
					displayValue: eachOption[options.displayColumn],
				};
			});
			setUserBankAccOptions(optionsData);
		});
		}
		let selectedData = clientAccounts?.find((e) => e.scheme === schemeAD);
		setAccName(selectedData?.schemeName);
		dispatch(
			setSecondaryOrder({
				accCurrency: selectedData?.accCurrency,
				scheme: schemeAD,
			})
		);
		// setSrcOfFund(selectedData?.sourceOfFund);
	}, [schemeAD, clientAccounts]);

	const setSelected = (e) => {
		dispatch(setJointHolderDetails(null));
		executegGetCustomerDetails(e);
		setSelectedClient(e);
		handleFormValues({ clientId: e, selectedAccount: "" });
		setSelectedAccount("");
		let selectedClient = e;
		executeGetClientAccounts(selectedClient).then((data) => {
			setClientAccounts(data);
			setClientSelectionStatus(true);
			setAccountName(data[0]?.customerName);
		});
		let result = clients?.filter((el) => el?.customerId === e);
		onSelectClient(result?.[0]);
	};

	const setSelectedAccountFunc = (selectedOption) => {
		let selectedData = clientAccounts.find((e) => e.scheme === selectedOption);
		
		executegGetJointHolderDetails(selectedOption);
		setSelectedAccount(selectedOption);
		if(clientId==="" || clientId===null){
			handleFormValues({
				selectedAccount: selectedOption,
				scheme: selectedOption,
				clientId: selectedData?.client_id,
				sourceOfFund: selectedData.sourceOfFund
			});
		}
		else{
			handleFormValues({
				selectedAccount: selectedOption,
				scheme: selectedOption,
				sourceOfFund: selectedData.sourceOfFund
			});
		}
		executeGetCreditAccounts(selectedOption).then((options) => {
			let optionsData = options.lookUpValues.map((eachOption) => {
				return {
					dataValue: eachOption[options.returnColumn],
					displayValue: eachOption[options.displayColumn],
				};
			});
			setUserBankAccOptions(optionsData);
		});
		// let selectedData = clientAccounts.find((e) => e.scheme === selectedOption);
		setAccName(selectedData?.schemeName);
		dispatch(
			setSecondaryOrder({
				accCurrency: selectedData.accCurrency,
				scheme: selectedOption,
			})
		);
		setSrcOfFund(selectedData.sourceOfFund);
	};

	const customerData = useSelector((state) => state.common.customerInfo.customerCode);
	const showCustomer = useSelector((state) => state.dashboard.childMenuFlag);

	useEffect(() => {
		if (customerData && showCustomer) {
			setSelected(customerData);
		}
	}, [customerData, showCustomer, clientData]);

	return (
		<>
			<Row>
				{showCustomer === false && (
					<Col span={8}>
						<Form.Item
							label={"Select Client"}
							colon={false}
							labelCol={{ span: "24" }}
							className="cardColumn"
							labelAlign="left"
							name="clientId"
							rules={returnValidators("ClientName")}
							validateTrigger={["onChange", "onBlur"]}
						>
							<Select
								showSearch
								size="large"
								placeholder="Select a client"
								onChange={setSelected}
								value={showCustomer ? customerData : selectedClient}
								disabled={showCustomer}
								// onSearch={(input, _) => {
								// 	return clients.filter((eachClient) =>
								// 		JSON.stringify(eachClient).toLowerCase().includes(input.toLowerCase())
								// 	);
								// }}
								filterOption={(input, option) => {
									return option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
							>
								{clients.length > 0 &&
									clients.map((item, index) => (
										<Select.Option key={`${item.firstName} ${item.lastName} ${index}`} value={item.customerId}>
											<Row>
												<Col span={4}>
													<Avatar size={30}>{item.profileInitial}</Avatar>
												</Col>
												<Col span={15}>
													<Row>
														<Col className="clientName" style={{ fontSize: "0.85rem" }}>
															{`${item.firstName} ${item?.lastName}`}
														</Col>
													</Row>
													<Row>
														<Col>
															<FontAwesomeIcon icon={faMapMarkerAlt} style={{ height: "0.6rem" }} />
															<span
																style={{
																	fontSize: "0.6rem",
																	marginLeft: "5px",
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
						label={"Select Account"}
						colon={false}
						labelCol={{ span: "24" }}
						className="cardColumn"
						labelAlign="left"
						name="selectedAccount"
						rules={returnValidators("AccountName")}
						validateTrigger={["onChange", "onBlur"]}
					>
						<Select
							placeholder="Select an account"
							onChange={setSelectedAccountFunc}
							value={selectedAccount}
							size="large"
							// disabled={!isClientSelected ?? true} // !isClientSelected ?? true
							filterOption={(input, option) => {
								return option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0;
							}}
							showSearch
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
													<Col className="clientName" style={{ fontSize: "0.85rem" }}>
														{`${item?.schemeName}`}
													</Col>
												</Row>
											</Col>
											<Col span={3} style={styles.fontSize}>
												{item?.accountNatureName ? item?.accountNatureName : "-"}
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
					onOk={() => console.log("OK PRESSED")}
					handleCancel={() => {
						setAlertMessage(false);
						setSelectedClient("");
					}}
				/>
				{isClientSelected && <ClientCard clientData={clientData} />}
			</Row>
		</>
	);
};
