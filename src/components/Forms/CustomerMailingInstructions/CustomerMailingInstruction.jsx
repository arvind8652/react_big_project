import React, { useEffect, useState, useRef } from 'react';

// external imports
import { Card, Form, Row, Col, Input, Select, Checkbox } from 'antd';
import { getMailing, getLocationAddress } from '../../../api/commonApi';
// import { _ } from "core-js";
const CustomerMailingInstruction = ({
	rules,
	csObject,
	form,
	formData,
	action,
	onValuesChange = () => {},
	cifRespData = {}
}) => {
	const { Item } = Form;
	const [mailingData, setMailingData] = useState({});
	const [mailingPref, setMailingPref] = useState();
	const [locationAddress, setLocationAddress] = useState();

	const getMailingHandler = async () => {
		try {
			const resp = await getMailing(formData?.customerType);
			setMailingPref(resp.data);
		} catch (error) {
			console.log('getMailingHandler', error);
		}
	};
	useEffect(() => {
		getMailingHandler();
	}, [formData?.customerType]);

	const getLocationAddressHandler = async () => {
		try {
			const resp = await getLocationAddress(formData?.customerType);
			setLocationAddress(resp.data);
		} catch (error) {
			console.log('getLocationAddressHandler', error);
		}
	};
	useEffect(() => {
		getLocationAddressHandler();
	}, [formData?.customerType]);

	const handleOnChange = (key, value) => {
		if (key === 'mailingPreference') {
			if (value === 'ROR' || value === 'UPONREQ' || value === 'NOMI' || value === 'DONOTREC') {
				setMailingData((prevData) => ({
					...mailingData,
					['location']: undefined,
					['deliveryInstr']: undefined,
					['compAdd2']: undefined,
					['frequency']: 'M',
					['authorizedPerson']: undefined,
					['mailingPreference']: value
				}));
			} else {
				setMailingData((prevData) => ({
					...mailingData,
					['location']: undefined,
					['deliveryInstr']: undefined,
					['compAdd2']: undefined,
					// ["frequency"]: undefined,
					['authorizedPerson']: undefined,
					['mailingPreference']: value
				}));
			}
		} else {
			setMailingData({ ...mailingData, [key]: value });
		}
	};

	useEffect(() => {
		onValuesChange(mailingData);
	}, [mailingData]);

	//   useEffect(()=>{
	//     if(action==="create"){
	// form.setFieldsValue({
	// frequency:"",
	// deliveryInstr:'',
	// authorizedPerson:'',
	// compAdd2:'',
	// location:'',

	// })
	//     }
	//   },[formData?.mailingPreference])
	useEffect(() => {
		form.setFieldsValue({
			authorizedPerson: ''
		});
	}, [formData?.deliveryInstr]);

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
								name='mailingPreference'
								rules={rules ? rules?.mailingpreference : []}
								label='Mailing Preference'
							>
								<Select
									// disabled={cifRespData?.mailingPreference}
									onChange={(value) => {
										handleOnChange('mailingPreference', value);
									}}
									placeholder='Select Option'
									showSearch={true}
									size='large'
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={mailingPref?.lookUpValues?.map((item) => ({
										label: item.display_value,
										value: item.data_value
									}))}
								/>
							</Item>
						</Col>

						<Col span={8}>
							<Item name='frequency' rules={rules ? rules?.frequency : []} label='Frequency'>
								<Select
									// disabled={cifRespData?.frequency}
									placeholder='Select Option'
									value={formData?.frequency}
									showSearch={true}
									onChange={(value) => {
										handleOnChange('frequency', value);
									}}
									size='large'
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={csObject?.frequency?.dropDownValue?.map((item) => ({
										label: item.displayValue,
										value: item.dataValue
									}))}
								/>
							</Item>
						</Col>

						<Col span={8}>
							<Item
								//  name="location"
								label='Location / Address '
								required={
									formData?.mailingPreference === 'PM' || formData?.mailingPreference === 'PHC'
								}
							>
								<Select
									value={formData?.location}
									onChange={(value) => {
										handleOnChange('location', value);
									}}
									placeholder='Select Option'
									disabled={
										formData?.mailingPreference === 'EM' ||
										formData?.mailingPreference === 'PICKUP' ||
										formData?.mailingPreference === 'EDC' ||
										formData?.mailingPreference === 'PICKUPA' ||
										formData?.mailingPreference === 'ROR' ||
										formData?.mailingPreference === 'UPONREQ' ||
										formData?.mailingPreference === 'NOMI' ||
										formData?.mailingPreference === 'DONOTREC'
										// ||
										// cifRespData?.location
									}
									showSearch={true}
									size='large'
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={locationAddress?.lookUpValues?.map((item) => ({
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
								// name="deliveryInstr"
								label='Delivery Instruction'
								required={
									formData?.mailingPreference === 'PM' ||
									formData?.mailingPreference === 'PHC' ||
									formData?.mailingPreference === 'PICKUP'
								}
								// rules={rules?.deliveryInstr}
							>
								<Select
									value={formData?.deliveryInstr}
									onChange={(value) => {
										handleOnChange('deliveryInstr', value);
									}}
									placeholder='Select Option'
									disabled={
										formData?.mailingPreference === 'EM' ||
										// formData?.mailingPreference === 'PICKUP' ||
										formData?.mailingPreference === 'EDC' ||
										formData?.mailingPreference === 'PICKUPA' ||
										formData?.mailingPreference === 'ROR' ||
										formData?.mailingPreference === 'UPONREQ' ||
										formData?.mailingPreference === 'NOMI' ||
										formData?.mailingPreference === 'DONOTREC'
										// ||
										// cifRespData?.deliveryInstr
									}
									showSearch={true}
									size='large'
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={csObject?.DeliveryInstr?.dropDownValue?.map((item) => ({
										label: item.displayValue,
										value: item.dataValue
									}))}
								/>
							</Item>
						</Col>
						<Col span={8}>
							<Item
								// name="authorizedPerson"
								label='Authorized Representative'
								// rules={rules?.authorisedperson}
								required={
									// formData?.mailingPreference === 'PICKUP' ||
									formData?.mailingPreference === 'PICKUPA' || formData?.deliveryInstr === 'A'
								}
							>
								<Input
									onChange={(evt) => handleOnChange('authorizedPerson', evt.target.value)}
									value={formData?.authorizedPerson}
									placeholder='Type a name'
									disabled={
										formData?.mailingPreference === 'EM' ||
										(formData?.mailingPreference === 'PICKUP' && formData?.deliveryInstr === 'S') ||
										(formData?.mailingPreference === 'PM' && formData?.deliveryInstr === 'S') ||
										formData?.mailingPreference === 'EDC' ||
										(formData?.mailingPreference === 'PHC' && formData?.deliveryInstr === 'S') ||
										formData?.mailingPreference === 'ROR' ||
										formData?.mailingPreference === 'UPONREQ' ||
										formData?.mailingPreference === 'NOMI' ||
										formData?.mailingPreference === 'DONOTREC'
										// ||
										// cifRespData?.authorizedPerson
									}
									maxLength={50}
									size='large'
								/>
							</Item>
						</Col>
						<Col span={8}>
							<Item
								name='deliverToRm'
								label=' '
								// rules={rules?.delivertorm}
							>
								<Checkbox
									// disabled={cifRespData?.deliverToRm}
									className='interaction-text'
									checked={formData.deliverToRm === true || formData.deliverToRm === 'Y'}
									onChange={(evt) => {
										handleOnChange('deliverToRm', evt.target.checked);
									}}
								>
									Deliver to RM
								</Checkbox>
							</Item>
						</Col>
					</Row>
					<Row>
						<Col span={8}>
							<Item
								// name="compAdd2"
								label='Preferred RCBC Branch or Office'
								required={
									formData?.mailingPreference === 'PICKUP' ||
									formData?.mailingPreference === 'PICKUPA'
								}
								// rules={rules?.compAdd2}
							>
								<Select
									value={formData?.compAdd2}
									onChange={(value) => {
										handleOnChange('compAdd2', value);
									}}
									placeholder='Select Option'
									disabled={
										// formData?.deliveryInstr === 'A' ||
										formData?.mailingPreference === 'PM' ||
										formData?.mailingPreference === 'EM' ||
										formData?.mailingPreference === 'EDC' ||
										formData?.mailingPreference === 'ROR' ||
										formData?.mailingPreference === 'UPONREQ' ||
										formData?.mailingPreference === 'NOMI' ||
										formData?.mailingPreference === 'DONOTREC'
										// ||
										// formData?.deliveryInstr === 'S' ||
										// cifRespData?.compAdd2
									}
									showSearch={true}
									size='large'
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
								>
									{csObject &&
										csObject.PreferredOffice &&
										csObject.PreferredOffice.lookupValue &&
										csObject.PreferredOffice.lookupValue.lookUpValues &&
										csObject.PreferredOffice.lookupValue.lookUpValues.map((item, index) => (
											<Select.Option value={item.Unit_Hierarchy} key={index}>
												{item.NAME}
											</Select.Option>
										))}
								</Select>
							</Item>
						</Col>
						<Col span={16}>
							<Item name='otherInstruction' label='Other Instructions'>
								<Input.TextArea
									// disabled={cifRespData?.otherInstruction}
									rows={4}
									maxLength='250'
									onChange={(evt) => handleOnChange('otherInstruction', evt.target.value)}
								/>
							</Item>
						</Col>
					</Row>
				</Form>
			</Card>
		</>
	);
};

export default CustomerMailingInstruction;
