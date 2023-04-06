// this is old file record

import { useState, useEffect } from 'react';
import { Form, Input, Card, Select, Row, Col, Checkbox, Divider, Typography } from 'antd';
import { getCity, getState } from '../../../api/commonApi';

export default function AddressDetails({
	form,
	formData,
	onValuesChange,
	rules,
	csObject,
	action,
	cifRespData = {}
}) {
	const [states, setStates] = useState({});
	const [cities, setCities] = useState({});
	const [compState, setCompStates] = useState({});
	const [compCities, setCompCities] = useState({});
	const [permtStates, setPermtStates] = useState({});
	const [permtCities, setPermtCities] = useState({});
	const [disablePrermanentAddress, setDisablePrermanentAddress] = useState(false);
	// console.log('test datat check ----', formData);
	useEffect(() => {
		if (action !== 'edit' || action !== 'convert') {
			console.log('11');
			defaultStateval();
			defaultPerStateval();
			defaultOfficeStateval();
		}
	}, []);

	useEffect(() => {
		// if(action==="edit"){
		// if(formData?.mailAdd1===formData?.permAdd1 && formData?.mailState===formData?.permanentState &&formData?.mailCity===formData?.permCity && formData?.mailAddPin===formData?.permAddPin){
		//   // setDisablePrermanentAddress(true)
		// }
		setDisablePrermanentAddress(formData?.disablePrermanentAddressField);
		// }
	}, [formData?.disablePrermanentAddressField]);

	// const defaultStateval=async(country="PH",type, disablePerAddress=false)=>{
	const defaultStateval = async (
		country = formData?.mailCountry,
		type,
		disablePerAddress = false
	) => {
		try {
			const s = await getState(country);
			setStates(s.data);
			const c = await getCity(formData?.mailState);

			setCities(c.data);
		} catch (error) {
			console.log('error country', error);
		}
	};
	const defaultPerStateval = async (country = formData?.permCountry, a, b) => {
		try {
			const s = await getState(country);
			setPermtStates(s.data);
			const c = await getCity(formData?.permanentState);
			setPermtCities(c.data);
		} catch (error) {
			console.log('error Permanent country', error);
		}
	};

	const defaultOfficeStateval = async (country = formData?.compCountry) => {
		try {
			const s = await getState(country);
			setCompStates(s.data);
			const c = await getCity(formData?.compAdd3);
			setCompCities(c.data);
		} catch (error) {
			console.log('error Office country', error);
		}
	};

	useEffect(() => {
		if (disablePrermanentAddress) {
			onCountryChange(formData?.mailCountry, 'permanentCountry', true);
		}
	}, [disablePrermanentAddress]);

	const onCountryChange = async (countryCode, type, disablePerAddress = false) => {
		try {
			const response = await getState(countryCode);
			// const response = await getState(mailCountry);
			if (type === 'permanentCountry') {
				setPermtStates(response.data);
				if (disablePerAddress && response?.data?.lookUpValues?.length > 0) {
					form.setFieldsValue({ permanentState: formData?.mailState });
					onStateChange(formData?.mailState, 'permanentState', true);
				} else {
					form.setFieldsValue({ permanentState: null, permCity: null });
					setPermtCities([]);
				}
			} else {
				setStates(response.data);
				form.setFieldsValue({ mailState: null, mailCity: null });
				setCities([]);
			}
		} catch (error) {
			setStates({});
			console.error('[CustomerAddressDetailsFormCard] onCountryChange', error);
		}
	};
	const onOfficeValueChange = async (countryCode, type) => {
		const officerResponse = await getState(countryCode);
		if (type === 'officeCountry') {
			setCompStates(officerResponse.data);
		} else {
			setCompStates(officerResponse.data);
			form.setFieldsValue({ compAdd3: null, compCity: null });
		}
	};

	const onStateChange = async (value, type, disablePerAddress = false) => {
		try {
			const response = await getCity(value);
			if (type === 'permanentState') {
				onValuesChange({ permanentState: value });
				setPermtCities(response.data);
				form.setFieldsValue({ permCity: null });
				if (disablePerAddress && response?.data?.lookUpValues?.length > 0) {
					form.setFieldsValue({ permCity: formData?.mailCity });
				}
			} else {
				onValuesChange({ mailState: value });
				setCities(response.data);
				form.setFieldsValue({ mailCity: null });
			}
		} catch (error) {
			setCities({});
		}
	};

	const OnofficeState = async (value, type) => {
		try {
			const officeResponse = await getCity(value);
			if (type === 'compAdd3') {
				onValuesChange({ compAdd3: value });
				setCompCities(officeResponse.data);
				form.setFieldsValue({ compCity: null });
			}
		} catch (error) {
			setCities({});
		}
	};

	const handleOnValuesChange = (key, value) => {
		onValuesChange({ [key]: value });
	};

	useEffect(() => {
		if (action === 'edit' || action === 'convert') {
			populateStateAndCity();
		}
	}, [formData?.mailCountry, formData?.mailState]);
	useEffect(() => {
		populateStateAndCity();
	}, [cifRespData?.mailState]);

	const populateStateAndCity = async () => {
		try {
			const s = await getState(formData?.mailCountry);
			setStates(s.data);

			const c = await getCity(formData?.mailState);
			setCities(c.data);

			setTimeout(() => {
				form.setFieldsValue({ mailState: formData?.mailState, mailCity: formData?.mailCity });
			}, 100);
		} catch (error) {
			console.log('populateState', error);
		}
	};

	useEffect(() => {
		if (action === 'edit' || action === 'convert') {
			populatePermanentStateAndCity();
		}
	}, [formData?.permCountry, formData?.permanentState]);
	useEffect(() => {
		populatePermanentStateAndCity();
	}, [cifRespData?.permanentState]);

	const populatePermanentStateAndCity = async () => {
		try {
			const s = await getState(formData?.permCountry);
			setPermtStates(s.data);

			const c = await getCity(formData?.permanentState);
			setPermtCities(c.data);

			setTimeout(() => {
				form.setFieldsValue({
					permanentState: formData?.permanentState,
					permanentCity: formData?.permanentCity
				});
			}, 100);
		} catch (error) {}
	};
	useEffect(() => {
		if (action === 'edit' || action === 'convert') {
			populateOfficeStateAndCity();
		}
	}, [formData?.compCounty, formData?.compAdd3]);
	useEffect(() => {
		populateOfficeStateAndCity();
	}, [cifRespData?.compAdd3]);
	const populateOfficeStateAndCity = async () => {
		try {
			const s = await getState(formData?.compCountry);
			setCompStates(s.data);
			const c = await getCity(formData?.compAdd3);
			setCompCities(c.data);
			setTimeout(() => {
				form.setFieldsValue({ compAdd3: formData?.compAdd3, compCity: formData?.compCity });
			}, 100);
		} catch (error) {}
	};
	return (
		<Card title='Address Details'>
			<Form form={form} layout='vertical' initialValues={formData} onValuesChange={onValuesChange}>
				<Row className='address-head'>
					{formData?.customerType === 'C' ? (
						<Col>
							<Typography.Text>Registered Bussiness</Typography.Text>
						</Col>
					) : (
						<Col>
							<Typography.Text>Present Address</Typography.Text>
						</Col>
					)}
				</Row>
				<Row>
					<Col span={16}>
						<Form.Item
							name='mailAdd1'
							label='Address'
							// required
							rules={rules ? rules.comaddress : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Input.TextArea
								disabled={cifRespData?.mailAdd1}
								onChange={(evt) => handleOnValuesChange('mailAdd1', evt.target.value)}
								rows={4}
								// maxLength='100'
								value={formData?.mailAdd1}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='Zip Code'
							name='mailAddPin'
							// required
							rules={rules ? rules.comzipcode : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Input
								disabled={cifRespData?.mailAddPin}
								onChange={(evt) => handleOnValuesChange('mailAddPin', evt.target.value)}
								size='large'
								// maxLength='6'
								value={formData?.mailAddPin}
							/>
						</Form.Item>
						{/* CAN BE USEFUL IN THE FUTURE */}
						{/* <Button type="link">
              <FontAwesomeIcon icon={faMapMarkerAlt} color="#354081" />
              <u style={{ marginLeft: 10, color: "#354081" }}>Locate on Map</u>
            </Button> */}
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<Form.Item
							label='Country'
							name='mailCountry'
							// required
							rules={rules ? rules.country : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								disabled={cifRespData?.mailCountry}
								onChange={(value) => {
									onCountryChange(value);

									handleOnValuesChange('mailCountry', value);
								}}
								placeholder='Select country'
								size='large'
								value={formData?.mailCountry}
								defaultValue={csObject?.Country?.defaultvalue}
								showSearch
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								options={csObject?.Country?.dropDownValue.map((_, i) => ({
									key: i,
									label: _.displayValue,
									value: _.dataValue
								}))}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='State'
							name='mailState'
							// required
							rules={rules ? rules.comstate : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								disabled={cifRespData?.mailState}
								onChange={onStateChange}
								placeholder='Select state'
								size='large'
								showSearch
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								options={states?.lookUpValues?.map((_, i) => ({
									key: i,
									label: _.display_value,
									value: _.data_value
								}))}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='City'
							name='mailCity'
							// required
							rules={rules ? rules.comcity : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								disabled={cifRespData?.mailCity}
								placeholder='Select city'
								size='large'
								showSearch
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								options={cities?.lookUpValues?.map((_, i) => ({
									key: i,
									label: _.display_value,
									value: _.data_value
								}))}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Divider />
				<Row justify='space-between' className='address-head'>
					<Col>
						<Typography.Text>Mailing Address</Typography.Text>
					</Col>
					<Col>
						<Checkbox
							// disabled={cifRespData?.disablePrermanentAddressField}
							checked={disablePrermanentAddress && disablePrermanentAddress === true}
							onChange={(e) => {
								if (e.target.checked) {
									setDisablePrermanentAddress(true);
									// onCountryChange(formData?.mailCountry, 'permanentCountry');
									// onStateChange(formData?.mailState, 'permanentState');
									onValuesChange({
										permAdd1: formData?.mailAdd1,
										permAddPin: formData?.mailAddPin,
										permCountry: formData?.mailCountry,
										permanentState: formData?.mailState,
										permCity: formData?.mailCity
									});
									setTimeout(() => {
										form.setFieldsValue({
											permAdd1: formData?.mailAdd1,
											permAddPin: formData?.mailAddPin,
											permCountry: formData?.mailCountry
											// permanentState: formData?.mailState,
											// permCity: formData?.mailCity,
										});
									}, 500);
								} else {
									setDisablePrermanentAddress(false);

									form.setFieldsValue({
										permAdd1: undefined,
										permAddPin: undefined,
										//  permCountry: undefined,
										// permCountry: csObject?.PermCountry?.defaultvalue && defaultPerStateval(),
										// permCountry: "IN",
										permanentState: undefined,
										permCity: undefined
									});
									onValuesChange({
										permAdd1: '',
										permAddPin: '',
										permCountry: csObject?.PermCountry?.defaultvalue,
										permanentState: '',
										permCity: ''
									});
								}
							}}
						>
							Same as above
						</Checkbox>
					</Col>
				</Row>
				<Row>
					<Col span={16}>
						<Form.Item
							label='Address'
							name='permAdd1'
							// required
							rules={rules ? rules.permaddress : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Input.TextArea
								onChange={(evt) => handleOnValuesChange('permAdd1', evt.target.value)}
								// disabled={disablePrermanentAddress || cifRespData?.permAdd1}
								disabled={disablePrermanentAddress}
								rows={4}
								// maxLength='100'
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='Zip Code'
							name='permAddPin'
							// required
							rules={rules ? rules.permzipcode : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Input
								onChange={(evt) => handleOnValuesChange('permAddPin', evt.target.value)}
								// disabled={disablePrermanentAddress || cifRespData?.permAddPin}
								disabled={disablePrermanentAddress}
								size='large'
								// maxLength='6'
							/>
						</Form.Item>
						{/* CAN BE USEFUL IN THE FUTURE */}
						{/* <Button type="link">
              <FontAwesomeIcon icon={faMapMarkerAlt} color="#354081" />
              <u style={{ marginLeft: 10, color: "#354081" }}>Locate on Map</u>
            </Button> */}
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<Form.Item
							label='Country'
							name='permCountry'
							// required
							rules={rules ? rules.permcountry : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={disablePrermanentAddress || cifRespData?.permCountry}
								disabled={disablePrermanentAddress}
								onChange={(value) => {
									onCountryChange(value, 'permanentCountry');
									handleOnValuesChange('permCountry', value);
								}}
								placeholder='Select country'
								size='large'
								defaultValue={csObject?.PermCountry?.defaultvalue}
								showSearch
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								options={csObject?.PermCountry?.dropDownValue?.map((_, i) => ({
									key: i,
									label: _.displayValue,
									value: _.dataValue
								}))}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='State'
							name='permanentState'
							// required
							rules={rules ? rules.permstate : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={disablePrermanentAddress || cifRespData?.permanentState}
								disabled={disablePrermanentAddress}
								onChange={(value) => onStateChange(value, 'permanentState')}
								placeholder='Select state'
								size='large'
								showSearch
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								options={permtStates?.lookUpValues?.map((_, i) => ({
									key: i,
									label: _.display_value,
									value: _.data_value
								}))}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='City'
							name='permCity'
							// required
							rules={rules ? rules.permcity : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={disablePrermanentAddress || cifRespData?.permCity}
								disabled={disablePrermanentAddress}
								placeholder='Select city'
								size='large'
								showSearch
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								options={permtCities?.lookUpValues?.map((_, i) => ({
									key: i,
									label: _.display_value,
									value: _.data_value
								}))}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Divider />
				{/* ------------------------------Office---------------- */}

				{formData?.customerType === 'I' ? (
					<Row className='address-head'>
						<Col>
							<Typography.Text>Office Address</Typography.Text>
						</Col>
					</Row>
				) : (
					' '
				)}

				{formData?.customerType === 'I' ? (
					<Row>
						<Col span={16}>
							<Form.Item
								name='compAdd1'
								label='Address'
								required={formData?.location === 'OA'}
								rules={rules ? rules.compadd1 : []}
								validateTrigger={['onChange', 'onBlur']}
							>
								<Input.TextArea
									disabled={cifRespData?.compAdd1}
									onChange={(evt) => handleOnValuesChange('compAdd1', evt.target.value)}
									rows={4}
									// maxLength='100'
									value={formData?.compAdd1}
								/>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item
								label='Zip Code'
								name='compAddPin'
								required={formData?.location === 'OA'}
								rules={rules ? rules.compaddpin : []}
								validateTrigger={['onChange', 'onBlur']}
							>
								<Input
									disabled={cifRespData?.compAddPin}
									onChange={(evt) => handleOnValuesChange('compAddPin', evt.target.value)}
									size='large'
									// maxLength='6'
									value={formData?.compAddPin}
								/>
							</Form.Item>
						</Col>
					</Row>
				) : (
					' '
				)}

				{formData?.customerType === 'I' ? (
					<Row>
						<Col span={8}>
							<Form.Item
								label='Country'
								name='compCountry'
								required={formData?.location === 'OA'}
								rules={rules ? rules.compcountry : []}
								validateTrigger={['onChange', 'onBlur']}
							>
								<Select
									disabled={cifRespData?.compCountry}
									onChange={(value) => {
										onOfficeValueChange(value, 'officeCountry');

										handleOnValuesChange('compCountry', value);
									}}
									placeholder='Select country'
									size='large'
									value={formData?.compCountry}
									defaultValue={csObject?.Country?.defaultvalue}
									showSearch
									filterOption={(input, option) =>
										option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
									options={csObject?.Country?.dropDownValue.map((_, i) => ({
										key: i,
										label: _.displayValue,
										value: _.dataValue
									}))}
								/>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item
								label='State'
								name='compAdd3'
								required={formData?.location === 'OA'}
								rules={rules ? rules.compstate : []}
								validateTrigger={['onChange', 'onBlur']}
							>
								<Select
									disabled={cifRespData?.compAdd3}
									onChange={(value) => OnofficeState(value, 'compAdd3')}
									placeholder='Select state'
									size='large'
									showSearch
									filterOption={(input, option) =>
										option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
									options={compState?.lookUpValues?.map((_, i) => ({
										key: i,
										label: _.display_value,
										value: _.data_value
									}))}
								/>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item
								label='City'
								name='compCity'
								required={formData?.location === 'OA'}
								rules={rules ? rules.compcity : []}
								validateTrigger={['onChange', 'onBlur']}
							>
								<Select
									disabled={cifRespData?.compCity}
									placeholder='Select city'
									size='large'
									showSearch
									filterOption={(input, option) =>
										option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
									options={compCities?.lookUpValues?.map((_, i) => ({
										key: i,
										label: _.display_value,
										value: _.data_value
									}))}
								/>
							</Form.Item>
						</Col>
					</Row>
				) : (
					' '
				)}
			</Form>
		</Card>
	);
}
