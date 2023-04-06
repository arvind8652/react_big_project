import React, { useEffect, useState } from 'react';
import {
	Card,
	Row,
	Col,
	Typography,
	Checkbox,
	Select,
	Form,
	Input,
	AutoComplete,
	ConfigProvider,
	Empty,
	Tooltip,
	message
} from 'antd';

import { getBranch } from '../../../api/commonApi';

export default function BankDetailsFormCard({
	form,
	formData,
	onValuesChange,
	rules,
	csObject,
	action,
	setBankDetailAccNoDuplicationValidation = () => {},
	setBankDetailValidation = () => {}
}) {
	let addNewBankDetails;

	const [bankDetailsList, setBankDetailsList] = React.useState([]);
	const [branch, setBranch] = useState([]);
	// const [data, setData] = useState({ bankDetails: {} });

	const onChange = (value, key, idx) => {
		if (key === 'currency') {
			setBankDetailValidation({
				required: false,
				showBankDetailAlertMessage: false
			});
		}
		setBankDetailsList((prevBankDetailsList) => {
			const newObj = [...prevBankDetailsList];
			newObj[idx] = { ...newObj[idx], [key]: value, srlNo: idx + 1 };
			return newObj;
		});
	};

	const checkAccNoDoublication = (value, key, idx) => {
		alert('44');
		let dupAccNo = false;
		if (bankDetailsList?.length > 1) {
			bankDetailsList?.map((obj) => {
				if (obj.accountNo.toString() == value.toString()) {
					dupAccNo = true;
				}
			});
		}
		if (dupAccNo) {
			alert('22');
			message.error('Account Number should be unique', 5);
			setBankDetailAccNoDuplicationValidation({
				required: true,
				showBankDetailAccNoDuplicationAlertMessage: false
			});
		} else {
			alert('33');
			setBankDetailAccNoDuplicationValidation({
				required: false,
				showBankDetailAccNoDuplicationAlertMessage: false
			});
		}
		setBankDetailsList((prevBankDetailsList) => {
			const newObj = [...prevBankDetailsList];
			newObj[idx] = { ...newObj[idx], [key]: value, srlNo: idx + 1 };
			return newObj;
		});
	};

	const nonEditableHandler = () => {
		let updatedBankDetail = [];
		formData?.bankDetails?.map((item) => {
			let dataObject = {};
			for (const prop in item) {
				dataObject[`${prop}`] = item[prop];
			}
			if (action === 'profileCopy' || action === 'copy') {
				dataObject['bankAccNo'] = null;
			}
			if (action === 'profileEdit') {
				dataObject['nonEditable'] = true;
			}
			updatedBankDetail.push(dataObject);
		});
		return updatedBankDetail;
	};

	useEffect(() => {
		if (Array.isArray(formData?.bankDetails)) {
			// setBankDetailsList(formData?.bankDetails);

			if (formData?.bankDetails?.length > 0) {
				setBankDetailsList(nonEditableHandler());
			}
			formData?.bankDetails?.forEach((e, idx) => {
				getBranchList(e?.bankName, idx);
			});
		}
	}, []);

	// this useEffect call only when joint holder detail are selected from ownership detail
	useEffect(() => {
		if (
			Array.isArray(formData?.bankDetailsFromOwnerShipDetail) &&
			formData?.bankDetailsFromOwnerShipDetail?.length > 0
			// &&
			// formData?.bankDetails[0]?.bankName
		) {
			setBankDetailsList(formData?.bankDetailsFromOwnerShipDetail);
			// setBankDetailsList(nonEditableHandler());
			formData?.bankDetailsFromOwnerShipDetail?.forEach((e, idx) => {
				e?.bankName && getBranchList(e?.bankName, idx);
			});
		}
	}, [formData?.bankDetailsFromOwnerShipDetail]);

	useEffect(() => {
		const data = { bankDetails: [...bankDetailsList] };
		onValuesChange(data);
	}, [bankDetailsList]);

	const getBranchList = async (value, idx) => {
		try {
			const response = await getBranch(value);
			setBranch((prev) => {
				const newPrev = [...prev];
				newPrev[idx] = response.data.lookUpValues || [];
				return newPrev;
			});
		} catch (error) {}
	};

	useEffect(() => {
		if (
			!(
				action === 'edit' ||
				action === 'copy' ||
				action === 'profileEdit' ||
				action === 'profileCopy'
			)
		) {
			setBankDetailsList([
				...bankDetailsList,
				{
					defaultYN: false,
					bankName: null,
					branch: '',
					accountType: '',
					accountNo: '',
					currency: '',
					status: '',
					remarks: '',
					clientId: '',
					custBankId: '',
					srlNo: 0
				}
			]);
			addNewBankDetails();
		}
	}, []);

	return (
		<Card
			title='Bank Details'
			className={bankDetailsList.length === 0 ? 'no-card-body' : ''}
			extra={
				<Typography.Title level={5}>
					<Typography.Link
						onClick={() => {
							setBankDetailsList([
								...bankDetailsList,
								{
									defaultYN: false,
									bankName: null,
									branch: '',
									accountType: '',
									accountNo: '',
									currency: '',
									status: '',
									remarks: '',
									clientId: '',
									custBankId: '',
									srlNo: 0
								}
							]);
							addNewBankDetails();
						}}
					>
						+ Add
					</Typography.Link>
				</Typography.Title>
			}
		>
			<Form form={form} layout='vertical' initialValues={formData} onValuesChange={onValuesChange}>
				<Form.List initialValue={formData.bankDetails} name='BankDetailsFormCard'>
					{(fields, { add, remove }) => {
						addNewBankDetails = () => add();
						return fields.map(({ key, name, fieldKey, ...restField }, index) => {
							return (
								<div
									style={{
										marginBottom: bankDetailsList.length - 1 === index ? 0 : 20
									}}
									key={key}
								>
									<Row justify='space-between'>
										<Col>
											<Form.Item name={[name, 'defaultYN']}>
												{bankDetailsList.length > 0 && (
													<Checkbox
														// checked={bankDetailsList.length > 0 && bankDetailsList[index]?.default}
														checked={
															bankDetailsList.length > 0 &&
															(bankDetailsList[index]?.defaultYN === 'Y' ||
															bankDetailsList[index]?.defaultYN === true
																? true
																: false)
														}
														// onChange={() =>
														// 	setBankDetailsList((prev) =>
														// 		prev.map((e, idx) => ({
														// 			...e,
														// 			defaultYN: index === idx ? true : false
														// 		}))
														// 	)
														// }
														onChange={(event) => {
															// console.log('checkcchh dattaa-----', event?.target?.checked);
															// checkReportCurrWithDefaultCurr();
															setBankDetailsList((prev) =>
																prev.map((e, idx) => ({
																	...e,
																	defaultYN: index === idx && event?.target?.checked ? true : false
																}))
															);
														}}
														// disabled={bankDetailsList[index]?.nonEditable}
													>
														Default
													</Checkbox>
												)}
											</Form.Item>
										</Col>
										<Col>
											<Typography.Link
												// disabled={!(bankDetailsList.length > 1) ? true : false}
												disabled={
													!(bankDetailsList.length > 1) || bankDetailsList[index]?.nonEditable
												}
												onClick={() => {
													remove(index);
													setBankDetailsList([
														...bankDetailsList.slice(0, index),
														...bankDetailsList.slice(index + 1)
													]);
												}}
											>
												Remove
											</Typography.Link>
										</Col>
									</Row>
									<Row>
										<Col span={8}>
											<Form.Item
												name={[name, 'bankName']}
												required={csObject?.BankName?.isRequired}
												rules={rules?.bankname}
												label='Bank Name'
											>
												<Select
													disabled={bankDetailsList[index]?.nonEditable}
													onChange={(value) => {
														getBranchList(value, index);
														onChange(value, 'bankName', index);
													}}
													placeholder='Enter bank name'
													size='large'
													showSearch
													filterOption={(input, option) =>
														option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
													}
													options={csObject?.BankName?.lookupValue?.lookUpValues?.map((item) => ({
														label: item?.BankName,
														value: item?.BankCode
													}))}
												>
													{
														// csObject?.BankName?.lookupValue?.lookUpValues?.map(item => <AutoComplete.Option>{item?.BankName}</AutoComplete.Option>)
													}
												</Select>
											</Form.Item>
											<Form.Item
												// required={csObject?.AccNumber?.isRequired}
												// rules={rules?.accnumber}
												rules={
													rules
														? [
																...rules?.accnumber,
																...[
																	{
																		pattern: new RegExp(
																			// `^[0-9]{${csObject?.AccNumber?.fieldLength},}$`
																			`^.{${csObject?.AccNumber?.fieldLength},}$`
																		),
																		// min: csObject?.AccNumber?.fieldLength,
																		message: `Must only be ${csObject?.AccNumber?.fieldLength} digits`
																	},
																	{
																		pattern: new RegExp('^[0-9]+$'),
																		message: 'Accepts only numbers'
																	}
																]
														  ]
														: []
												}
												name={[name, 'accountNo']}
												label='Account Number'
												validateTrigger={['onChange', 'onBlur']}
											>
												<Input
													disabled={bankDetailsList[index]?.nonEditable}
													// value={item.accountNo}
													// onChange={(evt) => onChange(evt.target.value, 'accountNo', index)}
													onChange={(evt) =>
														checkAccNoDoublication(evt.target.value, 'accountNo', index)
													}
													// maxLength='16'
													placeholder='Enter account number'
													size='large'
												/>
											</Form.Item>
										</Col>
										<Col span={8}>
											<Form.Item
												rules={rules?.branch}
												required={csObject?.Branch?.isRequired}
												name={[name, 'branch']}
												label='Branch'
											>
												<Select
													placeholder='Select Bank Name First'
													disabled={
														bankDetailsList[index]?.bankName === null ||
														bankDetailsList[index]?.nonEditable
													}
													size='large'
													options={branch[index]?.map((e) => ({
														label: e?.Branch,
														value: e?.BranchCode
													}))}
													onChange={(value) => onChange(value, 'branch', index)}
												/>
												{/* <Input
                            // value={item.branch}
                            onChange={evt => onChange(evt.target.value, 'branch', index)}
                            placeholder='Enter Branch' size='large' maxLength="50" /> */}
											</Form.Item>
											<Form.Item
												rules={rules?.currency}
												required={csObject?.Currency?.isRequired}
												name={[name, 'currency']}
												label='Currency'
											>
												<Select
													// value={item.currency}
													disabled={bankDetailsList[index]?.nonEditable}
													showSearch={true}
													onChange={(value) => onChange(value, 'currency', index)}
													placeholder='Enter currency'
													size='large'
													filterOption={(input, option) =>
														option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
														option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
													}
												>
													{csObject?.Currency?.dropDownValue?.map((item) => (
														<Select.Option
															key={item.dataValue.toString()}
															value={item.dataValue}
															label={item.displayValue}
														>
															{item.displayValue}
														</Select.Option>
													))}
												</Select>
											</Form.Item>
										</Col>
										<Col span={8}>
											<Form.Item
												required={csObject?.AccountType?.isRequired}
												rules={rules?.accounttype}
												label='Account Type'
												name={[name, 'accountType']}
											>
												<Select
													// value={item.accountType}
													disabled={bankDetailsList[index]?.nonEditable}
													onChange={(value) => onChange(value, 'accountType', index)}
													placeholder='Select'
													size='large'
												>
													{csObject?.AccountType?.dropDownValue?.map((item) => (
														<Select.Option
															value={item?.dataValue}
															key={item?.dataValue?.toString()}
														>
															{item?.displayValue}
														</Select.Option>
													))}
												</Select>
											</Form.Item>
											<Form.Item
												rules={rules?.bankaccstatus}
												name={[name, 'accountStatus']}
												required={csObject?.BankAccStatus?.isRequired}
												label='Status'
											>
												<Select
													// value={item.status}
													onChange={(value) => onChange(value, 'accountStatus', index)}
													placeholder='Type value'
													size='large'
												>
													{csObject?.BankAccStatus?.dropDownValue?.map((item) => (
														<Select.Option
															value={item?.dataValue}
															key={item?.dataValue?.toString()}
														>
															{item?.displayValue}
														</Select.Option>
													))}
												</Select>
											</Form.Item>
										</Col>
									</Row>
									<Row>
										<Col span={16}>
											<Form.Item
												name={[name, 'remarks']}
												required={csObject?.Remark?.isRequired}
												label={csObject?.Remark?.fieldLabel}
												rules={rules ? rules?.remark : []}
											>
												<Input.TextArea
													// value={item.remarks}
													onChange={(evt) => onChange(evt.target.value, 'remarks', index)}
													rows={4}
													size='large'
													// maxLength='350'
												/>
											</Form.Item>
										</Col>
									</Row>
								</div>
							);
						});
					}}
				</Form.List>
			</Form>
		</Card>
	);
}
