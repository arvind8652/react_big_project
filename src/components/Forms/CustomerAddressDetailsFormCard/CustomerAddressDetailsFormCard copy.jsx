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
	cifRespData = {},
	checkCifRespDataFetched = () => {}
}) {
	const [states, setStates] = useState({});
	const [cities, setCities] = useState({});
	const [compState, setCompStates] = useState({});
	const [compCities, setCompCities] = useState({});
	const [mailStates, setMailStates] = useState({});
	const [mailCities, setMailCities] = useState({});
	const [disableMailingAddress, setDisableMailingAddress] = useState(false);

	useEffect(() => {
		if (action !== 'edit' || action !== 'convert') {
			defaultStateval();
			defaultMailStateval();
			defaultOfficeStateval();
		}
	}, []);

	useEffect(() => {
		// if(action==="edit"){
		// if(formData?.mailAdd1===formData?.permAdd1 && formData?.mailState===formData?.permanentState &&formData?.mailCity===formData?.permCity && formData?.mailAddPin===formData?.permAddPin){
		//   // setDisableMailingAddress(true)
		// }
		setDisableMailingAddress(formData?.disableMailingAddressField);
		// }
	}, [formData?.disableMailingAddressField]);

	// const defaultStateval=async(country="PH",type, disableMailAddress=false)=>{
	const defaultStateval = async (
		country = formData?.permCountry,
		type,
		disableMailAddress = false
	) => {
		try {
			const s = await getState(country);
			setStates(s.data);
			const c = await getCity(formData?.permanentState);

			setCities(c.data);
		} catch (error) {
			console.log('error country', error);
		}
	};
	const defaultMailStateval = async (country = formData?.mailCountry, a, b) => {
		try {
			const s = await getState(country);
			setMailStates(s.data);
			const c = await getCity(formData?.mailState);
			setMailCities(c.data);
		} catch (error) {
			console.log('error Mailing country', error);
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
		if (disableMailingAddress) {
			onCountryChange(formData?.permCountry, 'mailingCountry', true);
		}
	}, [disableMailingAddress]);

	const onCountryChange = async (countryCode, type, disableMailAddress = false) => {
		try {
			const response = await getState(countryCode);
			// const response = await getState(mailCountry);
			if (type === 'mailingCountry') {
				setMailStates(response.data);
				if (disableMailAddress && response?.data?.lookUpValues?.length > 0) {
					form.setFieldsValue({ mailState: formData?.permanentState });
					onStateChange(formData?.permanentState, 'mailingState', true);
				} else {
					form.setFieldsValue({ mailState: null, mailCity: null });
					setMailCities([]);
				}
			} else {
				setStates(response.data);
				form.setFieldsValue({ permanentState: null, permCity: null });
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

	const onStateChange = async (value, type, disableMailAddress = false) => {
		try {
			const response = await getCity(value);
			if (type === 'mailingState') {
				onValuesChange({ mailState: value });
				setMailCities(response.data);
				form.setFieldsValue({ mailCity: null });
				if (disableMailAddress && response?.data?.lookUpValues?.length > 0) {
					form.setFieldsValue({ mailCity: formData?.permCity });
				}
			} else {
				onValuesChange({ permanentState: value });
				setCities(response.data);
				form.setFieldsValue({ permCity: null });
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
	}, [formData?.permCountry, formData?.permanentState]);
	useEffect(() => {
		populateStateAndCity();
	}, [cifRespData?.permanentState]);

	const populateStateAndCity = async () => {
		try {
			const s = await getState(formData?.permCountry);
			setStates(s.data);

			const c = await getCity(formData?.permanentState);
			setCities(c.data);

			setTimeout(() => {
				form.setFieldsValue({
					permanentState: formData?.permanentState,
					permCity: formData?.permCity
				});
			}, 100);
		} catch (error) {
			console.log('populateState', error);
		}
	};

	useEffect(() => {
		if (action === 'edit' || action === 'convert') {
			populateMailingStateAndCity();
		}
	}, [formData?.mailCountry, formData?.mailState]);
	useEffect(() => {
		populateMailingStateAndCity();
	}, [cifRespData?.mailState]);

	const populateMailingStateAndCity = async () => {
		try {
			const s = await getState(formData?.mailCountry);
			setMailStates(s.data);

			const c = await getCity(formData?.mailState);
			setMailCities(c.data);

			setTimeout(() => {
				form.setFieldsValue({
					mailState: formData?.mailState,
					mailCity: formData?.mailCity
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
							<Typography.Text>Registered Business</Typography.Text>
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
							name='permAdd1'
							label='Address'
							// required
							rules={rules ? rules.comaddress : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Input.TextArea
								// disabled={cifRespData?.mailAdd1}
								disabled={checkCifRespDataFetched()}
								onChange={(evt) => handleOnValuesChange('permAdd1', evt.target.value)}
								rows={4}
								// maxLength='100'
								value={formData?.permAdd1}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='Zip Code'
							name='permAddPin'
							// required
							rules={rules ? rules.comzipcode : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Input
								// disabled={cifRespData?.mailAddPin}
								disabled={checkCifRespDataFetched()}
								onChange={(evt) => handleOnValuesChange('permAddPin', evt.target.value)}
								size='large'
								// maxLength='6'
								value={formData?.permAddPin}
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
							rules={rules ? rules.country : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={cifRespData?.mailCountry}
								disabled={checkCifRespDataFetched()}
								onChange={(value) => {
									onCountryChange(value);

									handleOnValuesChange('permCountry', value);
								}}
								placeholder='Select country'
								size='large'
								value={formData?.permCountry}
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
							name='permanentState'
							// required
							rules={rules ? rules.comstate : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={cifRespData?.mailState}
								disabled={checkCifRespDataFetched()}
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
							name='permCity'
							// required
							rules={rules ? rules.comcity : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={cifRespData?.mailCity}
								disabled={checkCifRespDataFetched()}
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
							// disabled={cifRespData?.disableMailingAddressField}
							checked={disableMailingAddress && disableMailingAddress === true}
							onChange={(e) => {
								if (e.target.checked) {
									setDisableMailingAddress(true);
									// onCountryChange(formData?.mailCountry, 'mailingCountry');
									// onStateChange(formData?.mailState, 'permanentState');
									onValuesChange({
										mailAdd1: formData?.permAdd1,
										mailAddPin: formData?.permAddPin,
										mailCountry: formData?.permCountry,
										mailState: formData?.permanentState,
										mailCity: formData?.permCity
									});
									setTimeout(() => {
										form.setFieldsValue({
											mailAdd1: formData?.permAdd1,
											mailAddPin: formData?.permAddPin,
											mailCountry: formData?.permCountry
											// mailState: formData?.permanentState,
											// mailCity: formData?.permCity,
										});
									}, 500);
								} else {
									setDisableMailingAddress(false);

									form.setFieldsValue({
										mailAdd1: undefined,
										mailAddPin: undefined,
										//  mailCountry: undefined,
										// mailCountry: csObject?.mailCountry?.defaultvalue && defaultMailStateval(),
										// mailCountry: "IN",
										mailState: undefined,
										mailCity: undefined
									});
									onValuesChange({
										mailAdd1: '',
										mailAddPin: '',
										mailCountry: csObject?.MailCountry?.defaultvalue,
										mailState: '',
										mailCity: ''
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
							name='mailAdd1'
							// required
							rules={rules ? rules.permaddress : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Input.TextArea
								onChange={(evt) => handleOnValuesChange('mailAdd1', evt.target.value)}
								// disabled={disableMailingAddress || cifRespData?.permAdd1}
								disabled={disableMailingAddress}
								rows={4}
								// maxLength='100'
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='Zip Code'
							name='mailAddPin'
							// required
							rules={rules ? rules.permzipcode : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Input
								onChange={(evt) => handleOnValuesChange('mailAddPin', evt.target.value)}
								// disabled={disableMailingAddress || cifRespData?.permAddPin}
								disabled={disableMailingAddress}
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
							name='mailCountry'
							// required
							rules={rules ? rules.permcountry : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={disableMailingAddress || cifRespData?.permCountry}
								disabled={disableMailingAddress}
								onChange={(value) => {
									onCountryChange(value, 'mailingCountry');
									handleOnValuesChange('mailCountry', value);
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
							name='mailState'
							// required
							rules={rules ? rules.permstate : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={disableMailingAddress || cifRespData?.permanentState}
								disabled={disableMailingAddress}
								onChange={(value) => onStateChange(value, 'mailingState')}
								placeholder='Select state'
								size='large'
								showSearch
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								options={mailStates?.lookUpValues?.map((_, i) => ({
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
							rules={rules ? rules.permcity : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={disableMailingAddress || cifRespData?.permCity}
								disabled={disableMailingAddress}
								placeholder='Select city'
								size='large'
								showSearch
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								options={mailCities?.lookUpValues?.map((_, i) => ({
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
									// disabled={cifRespData?.compAdd1}
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
									// disabled={cifRespData?.compAddPin}
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
									// disabled={cifRespData?.compCountry}
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
									// disabled={cifRespData?.compAdd3}
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
									// disabled={cifRespData?.compCity}
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
