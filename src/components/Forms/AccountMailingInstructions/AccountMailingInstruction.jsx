import React, { useState, useEffect } from 'react';

// external imports
import { Card, Form, Row, Col, Input, Select, Checkbox } from 'antd';
import { getClientNameForAccountCreate } from '../../../api/commonApi';

const AccountMailingInstruction = ({
	rules,
	csObject,
	form,
	formData,
	onSelectCustomerType,
	accountDetails,
	profileAccountDetails,
	action,
	onValuesChange = () => {},
	location
}) => {
	const { Item } = Form;
	const [checker, setChecker] = useState(false);
	const [nameDropdown, setNameDropdown] = useState([]);
	const getName = async () => {
		try {
			const response = await getClientNameForAccountCreate();
			setNameDropdown(response.data.lookUpValues);
		} catch (error) {}
	};

	useEffect(() => {
		getName();
	}, []);

	useEffect(() => {
		if (!(action === 'edit' || action === 'profileEdit')) {
			if (!(location.state === null || location.state === undefined)) {
				formData.MailingPreference = location.state?.contactDetails?.mailingPreference;
				formData.Frequency = location.state?.contactDetails?.frequency;
				formData.OtherInstruction = location.state?.contactDetails?.otherInstruction;
				formData.DeliverToRm = location.state?.contactDetails?.deliverToRm;
				if (formData.DeliverToRm === 'Y') {
					setChecker(true);
				} else {
					setChecker(false);
				}
				if (formData.MailingPreference === 'PM') {
					formData.DeliveryInstructions = location.state?.contactDetails?.deliveryInstr;
					formData.LocationAndAddress = location.state?.contactDetails?.location;
					formData.AuthorisedPerson = location.state?.contactDetails?.authorizedPerson;
					form.setFieldsValue({
						MailingPreference: location.state?.contactDetails?.mailingPreference,
						Frequency: location.state?.contactDetails?.frequency,
						DeliveryInstructions: location.state?.contactDetails?.deliveryInstr,
						LocationAndAddress: location.state?.contactDetails?.location,
						AuthorisedPerson: location.state?.contactDetails?.authorizedPerson,
						otherInstructions: location.state?.contactDetails?.otherInstruction
					});
				} else {
					form.setFieldsValue({
						MailingPreference: location.state?.contactDetails?.mailingPreference,
						Frequency: location.state?.contactDetails?.frequency,
						otherInstructions: location.state?.contactDetails?.otherInstruction
					});
				}
			}
		}
	}, [location.state?.contactDetails]);

	function isObject(obj) {
		return obj != null && obj.constructor.name === 'Object';
	}

	useEffect(() => {
		if (!(action === 'edit' || action === 'profileEdit')) {
			if (location.state === null || location.state === undefined) {
				let obj = nameDropdown?.find((o) => o?.CustomerID === formData?.name);
				let obj2 = csObject?.MailingPreference?.dropDownValue?.find(
					(o) => o?.dataValue === obj?.MailingPreference
				);
				let obj3 = csObject?.Frequency?.dropDownValue?.find((o) => o?.dataValue === obj?.Frequency);
				let obj11 = csObject?.Branch.lookupValue.lookUpValues?.find(
					(o) => o?.Unit_Hierarchy === obj?.MailingBranch
				);
				let obj8 = nameDropdown?.map((o) => {
					if (o?.CustomerID === formData.name) {
						return o?.OtherInstruction;
					}
				});
				let obj9 = obj8.filter((e) => e != null && typeof e !== 'object').toString();
				formData.MailingPreference = obj2?.dataValue;
				formData.Frequency = obj3?.dataValue;
				formData.OtherInstruction = obj9;
				formData.mailingBranch = obj11?.Unit_Hierarchy;
				// formData.DeliverToRm = obj?.DeliverToRM;

				if (isObject(obj?.DeliverToRM)) {
					formData.DeliverToRm = 'N';
				} else {
					formData.DeliverToRm = obj?.DeliverToRM;
				}
				if (formData.DeliverToRm === 'Y') {
					setChecker(true);
				} else {
					setChecker(false);
				}
				// if(formData.MailingPreference === 'PM'){
				let obj4 = csObject?.DeliveryInstructions?.dropDownValue?.find(
					(o) => o?.dataValue === obj?.DeliveryInstr
				);
				let obj5 = csObject?.Location?.dropDownValue?.find((o) => o?.dataValue === obj?.Location);
				let obj6 = nameDropdown?.map((o) => {
					if (o?.CustomerID === formData.name) {
						return o?.AuthorizedPerson;
					}
				});
				let obj7 = obj6?.filter((e) => e != null).toString();
				formData.DeliveryInstructions = obj4?.dataValue;
				formData.LocationAndAddress = obj5?.dataValue;
				formData.AuthorisedPerson = obj7;
				form.setFieldsValue({
					MailingPreference: obj2?.displayValue,
					Frequency: obj3?.displayValue,
					DeliveryInstructions: obj4?.displayValue,
					LocationAndAddress: obj5?.displayValue,
					AuthorisedPerson: obj7,
					otherInstructions: obj9,
					mailingBranch: obj11?.NAME
				});
				// }
				// else{
				//   form.setFieldsValue({
				//     MailingPreference: obj2?.displayValue,
				//     Frequency: obj3?.displayValue,
				//     otherInstructions: obj9,
				//     mailingBranch:obj11?.NAME,
				//   })
				// }
			}
			// const newAuthorisedPerson = obj4?.dataValue
			// setAuthorisedPerson(newAuthorisedPerson);
		}
	}, [formData.name]);

	useEffect(() => {
		if (action === 'edit' || action === 'profileEdit') {
			if (formData.DeliverToRm === 'Y') {
				setChecker(true);
			} else {
				setChecker(false);
			}
		}
	}, [formData?.name]);

	const onDeliverToRm = (data) => {
		setChecker(!checker);
		onValuesChange(data);
	};
	return (
		<>
			<Card title='Mailing Instruction'>
				<Form
					form={form}
					initialValues={formData}
					onValuesChange={onValuesChange}
					layout='vertical'
				>
					<Row align='middle'>
						<Col span={8}>
							<Item
								name='MailingPreference'
								rules={rules ? rules?.mailingpreference : []}
								label='Mailing Preference'
							>
								<Select
									placeholder='Select Option'
									showSearch={true}
									disabled={true}
									size='large'
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={csObject?.MailingPreference?.dropDownValue?.map((item) => ({
										label: item.displayValue,
										value: item.dataValue
									}))}
								/>
							</Item>
						</Col>

						<Col span={8}>
							<Item name='Frequency' rules={rules ? rules?.frequency : []} label='Frequency'>
								<Select
									placeholder='Select Option'
									showSearch={true}
									size='large'
									disabled={true}
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={csObject?.Frequency?.dropDownValue?.map((item) => ({
										label: item.displayValue,
										value: item.dataValue
									}))}
								/>
							</Item>
						</Col>

						<Col span={8}>
							<Item
								name='LocationAndAddress'
								rules={rules?.location}
								required={formData.MailingPreference === 'PM' ? true : false}
								label='Location / Address '
							>
								<Select
									placeholder='Select Address'
									showSearch={true}
									// disabled= {formData.MailingPreference==='PM'?false:true}
									disabled={true}
									size='large'
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={csObject?.Location?.dropDownValue?.map((item) => ({
										label: item.displayValue,
										value: item.dataValue
									}))}
								/>
							</Item>
						</Col>
					</Row>
					<Row>
						<Col span={8}>
							<Item
								name='DeliveryInstructions'
								label='Delivery Instruction'
								rules={rules?.deliveryinstructions}
								required={formData.MailingPreference === 'PM' ? true : false}
							>
								<Select
									placeholder='Select Option'
									showSearch={true}
									size='large'
									// disabled= {formData.MailingPreference==='PM'?false:true}
									disabled={true}
									// onChange={onAuthorisationChange}
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={csObject?.DeliveryInstructions?.dropDownValue?.map((item) => ({
										label: item.displayValue,
										value: item.dataValue
									}))}
								/>
							</Item>
						</Col>
						<Col span={8}>
							<Item
								name='AuthorisedPerson'
								label='Authorised Person'
								rules={rules?.authorisedperson}
								required={formData?.DeliveryInstructions === 'A' ? true : false}
							>
								<Input
									// disabled= {formData?.DeliveryInstructions==='A'?false:true}
									disabled={true}
									placeholder='Type a name'
									size='large'
								/>
							</Item>
						</Col>

						<Col span={8}>
							<Row>
								<Col span={10}>
									<Item name='DeliverToRm' label=' ' rules={rules?.delivertorm} value={checker}>
										<Checkbox
											disabled
											checked={checker}
											onChange={() => onDeliverToRm({ DeliverToRm: checker ? 'N' : 'Y' })}
											className='interaction-text'
										>
											Deliver to RM
										</Checkbox>
									</Item>
								</Col>
								<Col span={14}>
									<Item name='blockYN' label=' ' rules={rules?.blockYN}>
										<Checkbox
											checked={formData?.blockYN === 'Y'}
											onChange={(evt) => {
												onValuesChange({ blockYN: evt.target.checked ? 'Y' : 'N' });
											}}
											className='interaction-text'
										>
											Block report generation
										</Checkbox>
									</Item>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row>
						<Col span={8}>
							<Item
								name='mailingBranch'
								// required={true}
								// rules={rules?.branch}
								label='Preferred RCBC Branch Or Office'
							>
								<Select
									placeholder='Select Option'
									showSearch={true}
									disabled={true}
									size='large'
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={csObject?.Branch.lookupValue.lookUpValues?.map((item) => ({
										label: item.NAME,
										value: item.Unit_Hierarchy
									}))}
								/>
							</Item>
						</Col>
						<Col span={16}>
							<Item
								name='otherInstructions'
								label='Other Instructions'
								rules={rules ? rules?.otherinstructions : []}
							>
								{/* <Input.TextArea disabled={true} rows={4} maxLength='250' /> */}
								<Input.TextArea
									rows={4}
									// maxLength={csObject?.OtherInstructions?.fieldLength ?? '500'}
									// maxLength={'500'}
								/>
							</Item>
						</Col>
					</Row>
				</Form>
			</Card>
		</>
	);
};

export default AccountMailingInstruction;
