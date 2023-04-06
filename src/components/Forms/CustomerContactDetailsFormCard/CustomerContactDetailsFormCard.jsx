import { Form, Input, Card, Select, Row, Col, Checkbox, Typography, InputNumber } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { CloseOutlined, UserOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react';
// import { getDependentLocationDataApi } from "../../../api/commonApi";

const { Option } = Select;

const ContactDetails = ({
	form,
	formData,
	onValuesChange,
	rules,
	csObject,
	action = '',
	cifRespData = {}
}) => {
	const plainOption1 = ['WhatsApp'];
	const plainOption2 = ['Viber'];
	const [bool, setBool] = useState(false);

	const [dropdownValuesCommunication, setDropdownValuesCommunication] = useState(
		csObject?.CommunicationPre?.lookupValue?.lookUpValues
	);
	const [communicationPre, setCommunicationPre] = useState([]);
	// const plainOptions = [
	// 	{ label: 'WhatsApp', value: 'WhatsApp' },
	// 	{ label: 'Viber', value: 'Viber' }
	// ];

	const checkCommunicationPre = (checkedValue) => {
		let finalResult = false;
		formData?.communicationPre?.find((e) => {
			if (e?.dataValue === checkedValue) {
				finalResult = true;
			}
		});
		return finalResult;
	};
	useEffect(() => {
		if (action === 'edit' && formData?.communicationPre?.length > 0) {
			setCommunicationPre(formData?.communicationPre);
		}
		action === 'edit' && formData?.communicationPre?.length === 0 && setBool(true);
	}, [formData?.communicationPre]);

	useEffect(() => {
		if (!dropdownValuesCommunication) {
			setDropdownValuesCommunication(csObject?.CommunicationPre?.lookupValue?.lookUpValues);
		}
	}, [csObject]);

	const handleOnChange = (key, value) => {
		console.log({ key, value });
		let socialList = { ...formData.socialList };
		socialList[key] = value;
		onValuesChange({ socialList });
	};

	const countryCode = (
		<Form.Item name='dialCode' noStyle validateTrigger={['onChange', 'onBlur']}>
			<Select
				// disabled={cifRespData?.socialList?.dialCode}
				value={formData?.socialList?.dialCode}
				onChange={(v) => handleOnChange('dialCode', v)}
				className='field'
				size='large'
				// defaultValue={formData?.dialCode ? formData.dialCode : '+91'}
				defaultValue={csObject?.CountryCode?.defaultvalue ?? '+63'}
				// defaultValue={'+63'}
			>
				{csObject?.CountryCode?.lookupValue?.lookUpValues.map((country, index) => (
					// <Select.Option key={country.Dialing_Code} value={country.Dialing_Code}>
					<Select.Option key={index} value={country.Dialing_Code}>
						{country.Dialing_Code}
					</Select.Option>
				))}
			</Select>
		</Form.Item>
	);
	const altCountryCode = (
		<Form.Item name='alternateDialCode' noStyle validateTrigger={['onChange', 'onBlur']}>
			<Select
				// disabled={cifRespData?.socialList?.alternateDialCode}
				disabled={formData?.cifDataOnEdit}
				value={formData?.socialList?.alternateDialCode}
				onChange={(v) => handleOnChange('alternateDialCode', v)}
				className='field'
				size='large'
				// defaultValue={csObject?.AltCountryCode?.defaultvalue}
				defaultValue={csObject?.AltCountryCode?.defaultvalue ?? '+63'}
			>
				{csObject?.AltCountryCode?.lookupValue?.lookUpValues.map((country) => (
					<Select.Option key={country.country} value={country.Dialing_Code}>
						{country.Dialing_Code}
					</Select.Option>
				))}
			</Select>
		</Form.Item>
	);
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
		dropDownHeight: { maxHeight: '150px', overflowY: 'scroll' }
	};

	const handleOnChange1 = (query) => {
		const small = query?.toLowerCase();
		const newData = csObject?.CommunicationPre?.lookupValue?.lookUpValues.filter((e) => {
			return e.display_value.toLowerCase().includes(small);
		});
		setDropdownValuesCommunication(newData);
	};

	const renderCustomSelectOption = () => {
		const handleOnChange1 = (checked, data_value, display_value) => {
			if (checked) {
				setCommunicationPre([
					...communicationPre,
					// { data_value: data_value, display_value: display_value },
					{ dataValue: data_value, displayValue: display_value }
				]);
				// let whatsAppVal = data_value === 'WHATSAPP' ? true : false;
				// let viberVal = data_value === 'VIBER' ? true : false;
				// onValuesChange({ whatsApp: whatsAppVal, viber: viberVal });
				if (data_value === 'WHATSAPP') {
					onValuesChange({ whatsApp: true });
				}
				if (data_value === 'VIBER') {
					onValuesChange({ viber: true });
				}
			} else {
				setCommunicationPre(
					// communicationPre.filter((itm) => itm.data_value !== data_value)
					communicationPre.filter((itm) => itm.dataValue !== data_value)
				);

				if (data_value === 'WHATSAPP') {
					onValuesChange({ whatsApp: false });
				}
				if (data_value === 'VIBER') {
					onValuesChange({ viber: false });
				}
			}
		};
		return dropdownValuesCommunication?.map((e, idx) => {
			return (
				<div style={styleSet.parentCheckBox} key={idx}>
					<div style={styleSet.checkboxContainer}>
						<Checkbox
							checked={
								communicationPre?.find(
									// (item) => item.data_value === e.data_value
									(item) => item.dataValue === e.data_value
								)
									? true
									: false
							}
							onChange={(evt) => {
								handleOnChange1(evt.target.checked, e.data_value, e.display_value);
							}}
						/>
					</div>
					<div style={styleSet.itemCheckbox}>
						<Typography.Text>{e?.display_value}</Typography.Text>
					</div>
				</div>
			);
		});
	};

	useEffect(() => {
		onValuesChange({ communicationPre: communicationPre });
	}, [communicationPre]);

	function allowNumberic(e) {
		let x = e.which || e.keycode;
		if (x >= 48 && x <= 57) return false;
		else if (x >= 96 && x <= 105) return false;
		else if (x == 37 || x == 39 || x == 8 || x == 9) return false;
		else return true;
	}

	return (
		<Card title='Contact Details'>
			<Form layout='vertical' initialValues={formData} form={form} onValuesChange={onValuesChange}>
				<Row>
					<Col span={8}>
						<Form.Item
							name='mobileNo'
							label=' Wealth Mobile'
							validateTrigger={['onChange', 'onBlur']}
							// rules={rules ? rules.mobile : []}
							rules={
								rules
									? [
											...rules?.mobile,
											...[
												{
													pattern: new RegExp('^[0-9]+$'),
													message: 'Accepts only numbers'
												},
												{
													message: 'Maximum character length is 10',
													pattern: /^[\S\d\W]{0,10}$/
												}
												// {
												// 	pattern: new RegExp('^[0-9]{8,20}$'),
												// 	message: 'Minimum 8 numbers'
												// }
											]
									  ]
									: []
							}
						>
							<Input
								// disabled={cifRespData?.mobileNo}
								// maxLength={10}
								onChange={(evt) => handleOnChange('mobileNo', evt.target.value)}
								addonBefore={countryCode}
								style={{
									width: '100%'
								}}
								size='large'
								placeholder='Enter wealth mobile'
								// onKeyDown={(e) => allowNumberic(e) && e.preventDefault()}
							/>
							{/* <InputNumber
								controls={false}
								addonBefore={countryCode}
								style={{ width: '100%' }}
								// formatter={(value) => `${value}`.replace(/(\d{8})/, '$1')} ////////pattern --- /(\d{3})(\d{3})(\d{3})(\d{3})/, '$1-$2-$3-$4'
								// parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
								// onKeyDown={(e) => allowNumberic(e) && e.preventDefault()}
								maxLength={csObject?.Mobile?.fieldLength ?? 10}
								// maxLength={10}
								// onChange={(value) => handleOnChange('mobileNo', value)}
								onChange={(evt) => handleOnChange('mobileNo', evt.target.value)}
								size='large'
								placeholder={'Enter contact number'}
							/> */}
						</Form.Item>
						{/* <Form.Item name='socials'>
							<Checkbox.Group
								onChange={(v) => {
									v.map((item) => handleOnChange(item, item));
								}}
								options={plainOptions}
							/>
						</Form.Item> */}
					</Col>
					<Col span={8}>
						<Form.Item
							name='telephoneHome'
							label='Bank Mobile'
							validateTrigger={['onChange', 'onBlur']}
							// rules={[
							// 	{
							// 		pattern: new RegExp('^[0-9]+$'),
							// 		message: 'Accept only numbers'
							// 	}
							// 	// {
							// 	// 	pattern: new RegExp('^[0-9]{8,20}$'),
							// 	// 	message: 'Minimum 8 numbers'
							// 	// }
							// ]}
							rules={
								rules
									? [
											...rules?.alternatecontact,
											...[
												{
													pattern: new RegExp('^[0-9]+$'),
													message: 'Accepts only numbers'
												},
												{
													message: 'Maximum character length is 10',
													pattern: /^[\S\d\W]{0,10}$/
												}
												// {
												// 	pattern: new RegExp('^[0-9]{8,20}$'),
												// 	message: 'Minimum 8 numbers'
												// }
											]
									  ]
									: []
							}
						>
							<Input
								// disabled={cifRespData?.telephoneHome}
								// disabled={formData?.cifDataOnEdit && formData?.customerType}
								disabled={formData?.cifDataOnEdit}
								// maxLength={10}
								onChange={(evt) => handleOnChange('telephoneHome', evt.target.value)}
								addonBefore={altCountryCode}
								style={{
									width: '100%'
								}}
								size='large'
								placeholder='Enter bank mobile'
								// onKeyDown={(e) => allowNumberic(e) && e.preventDefault()}
							/>
							{/* <InputNumber
								controls={false}
								addonBefore={altCountryCode}
								style={{ width: '100%' }}
								// onKeyDown={(e) => allowNumberic(e) && e.preventDefault()}
								maxLength={csObject?.AlternateContact?.fieldLength ?? 10}
								// onChange={(value) => handleOnChange('telephoneHome', value)}
								onChange={(evt) => handleOnChange('telephoneHome', evt.target.value)}
								size='large'
								placeholder={'Enter contact number'}
							/> */}
						</Form.Item>
					</Col>
					<Col span={8} style={{ display: 'flex' }}>
						<Row style={{ alignContent: 'center', justifyContent: 'space-between' }}>
							<Col span={8}>
								<Form.Item name='whatsApp' noStyle>
									<Checkbox
										checked={formData?.whatsApp}
										options={plainOption1}
										onChange={(evt) => {
											onValuesChange({ whatsApp: evt.target.checked });
										}}
									>
										WhatsApp
									</Checkbox>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item name='viber' noStyle>
									<Checkbox
										checked={formData?.viber}
										options={plainOption2}
										onChange={(evt) => {
											onValuesChange({ viber: evt.target.checked });
										}}
									>
										Viber
									</Checkbox>
								</Form.Item>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<Form.Item
							name='Twitter'
							label='Twitter'
							rules={[
								{
									required: checkCommunicationPre('TWITTER'),
									message: '* Twitter cannot be empty'
								},
								{
									message: 'Maximum character length is 100',
									pattern: /^[\S\d\W]{0,100}$/
								}
							]}
						>
							<Input
								// disabled={cifRespData?.Twitter}
								onChange={(evt) => handleOnChange('Twitter', evt.target.value)}
								addonBefore={<FontAwesomeIcon icon={faTwitter} color='#00acee' size='1x' />}
								style={{
									width: '100%'
								}}
								size='large'
								placeholder='Paste url'
								// maxLength='50'
								// value={formData?.Twitter}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							name='Facebook'
							label='Facebook'
							rules={[
								{
									required: checkCommunicationPre('FB'),
									message: '* Facebook cannot be empty'
								},
								{
									message: 'Maximum character length is 100',
									pattern: /^[\S\d\W]{0,100}$/
								}
							]}
						>
							<Input
								// disabled={cifRespData?.Facebook}
								onChange={(evt) => handleOnChange('Facebook', evt.target.value)}
								addonBefore={<FontAwesomeIcon icon={faFacebookSquare} color='#3b5998' size='1x' />}
								style={{
									width: '100%'
								}}
								size='large'
								placeholder='Paste url'
								// maxLength='50'
								// value={formData?.Facebook}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							name='LinkedIn'
							label='LinkedIn'
							rules={[
								{
									required: checkCommunicationPre('LINKEDIN'),
									message: '* LinkedIn cannot be empty'
								},
								{
									message: 'Maximum character length is 100',
									pattern: /^[\S\d\W]{0,100}$/
								}
							]}
						>
							<Input
								// disabled={cifRespData?.LinkedIn}
								onChange={(evt) => handleOnChange('LinkedIn', evt.target.value)}
								addonBefore={<FontAwesomeIcon icon={faLinkedin} color='#0e76a8' size='1x' />}
								style={{
									width: '100%'
								}}
								size='large'
								placeholder='Paste url'
								// maxLength='50'
								// value={formData?.LinkedIn}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<Form.Item
							name='communicationPre'
							// rules={rules ? rules?.communicationpre : []}
							// rules={
							// 	formData?.communicationPre?.length === 0
							// 		? // [{message: "Communication Preference cannot be empty", required: true}]:[{message: "", required: false}]
							// 		  [{ message: ' ', required: true }]
							// 		: [{ message: '', required: false }]
							// }
							rules={[{ message: '* Communication Preference cannot be empty', required: true }]}
							validateTrigger={['onChange', 'onBlur']}
							label='Communication Preference'
							required={true}
							onClick={() => setBool(true)}
						>
							{
								// IMPORTANT don't remove below empty space
								' '
							}
							<Select
								// disabled={
								// 	cifRespData?.communicationPre &&
								// 	Array.isArray(cifRespData?.communicationPre) &&
								// 	cifRespData?.communicationPre?.length > 0
								// }
								showSearch
								size='large'
								onSearch={handleOnChange1}
								dropdownStyle={styleSet.dropDownHeight}
								mode='multiple'
								dropdownRender={renderCustomSelectOption}
								status={bool && communicationPre?.length === 0 && 'error'}
							/>
						</Form.Item>
						{bool && communicationPre?.length === 0 && (
							<span style={{ position: 'absolute', bottom: '0px', color: 'red' }}>
								{'* Communication Preference cannot be empty'}
							</span>
						)}
						{communicationPre?.length > 0 && (
							<div style={styleSet.tagContainer}>
								{communicationPre?.map((e, idx) => (
									<Col span={12} key={idx}>
										<div style={styleSet.tag}>
											<div style={styleSet.close}>
												<UserOutlined />
											</div>
											{/* <div style={styleSet.name}>{e.display_value}</div> */}
											<div style={styleSet.name}>{e.displayValue}</div>
											<div style={styleSet.close}>
												<CloseOutlined
													// onClick={() =>
													// 	setCommunicationPre(
													// 		communicationPre?.filter(
													// 			// (item) => item.data_value !== e.data_value
													// 			(item) => item.dataValue !== e.dataValue
													// 		)
													// 	)
													// }
													onClick={() => {
														if (e?.dataValue === 'WHATSAPP') {
															onValuesChange({ whatsApp: false });
														}
														if (e?.dataValue === 'VIBER') {
															onValuesChange({ viber: false });
														}
														setCommunicationPre(
															communicationPre?.filter((item) => item.dataValue !== e.dataValue)
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
					<Col span={8}>
						<Form.Item
							name='eMail'
							label='Wealth Email ID'
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.email : []}
						>
							<Input
								// disabled={cifRespData?.eMail}
								// maxLength={30}
								onChange={(evt) => handleOnChange('eMail', evt.target.value)}
								style={{
									width: '100%'
								}}
								size='large'
								placeholder='Enter wealth email ID'
								// value={formData?.eMail}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							name='race'
							label='Bank Email ID'
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.race : []}
						>
							<Input
								// disabled={cifRespData?.race}
								disabled={formData?.cifDataOnEdit}
								// maxLength={30}
								onChange={(evt) => handleOnChange('race', evt.target.value)}
								style={{
									width: '100%'
								}}
								size='large'
								placeholder='Enter bank Email ID'
								// value={formData?.eMail}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	);
};

export default ContactDetails;
