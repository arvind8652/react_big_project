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
	const [callOneTimeEdit, setCallOneTimeEdit] = useState(false);
	const [callOneTimePermEdit, setCallOneTimePermEdit] = useState(false);
	const [callOneTimeCompEdit, setCallOneTimeCompEdit] = useState(false);
	useEffect(() => {
		if (action !== 'edit' && action !== 'convert') {
			defaultStateval();
			defaultPerStateval();
			defaultOfficeStateval();
		}
		if (action === 'edit' || action == 'convert') {
			setCallOneTimeEdit(true);
			setCallOneTimePermEdit(true);
			setCallOneTimeCompEdit(true);
		}
	}, []);

	useEffect(() => {
		setDisablePrermanentAddress(formData?.disablePrermanentAddressField);
	}, [formData?.disablePrermanentAddressField]);

	const defaultStateval = async () => {
		try {
			const s = await getState(formData?.mailCountry);
			setStates(s.data);
			const c = await getCity(formData?.mailState);

			setCities(c.data);
		} catch (error) {
			console.log('error country', error);
		}
	};
	const defaultPerStateval = async () => {
		try {
			const s = await getState(formData?.permCountry);
			setPermtStates(s.data);
			const c = await getCity(formData?.permanentState);
			setPermtCities(c.data);
		} catch (error) {
			console.log('error Permanent country', error);
		}
	};

	const defaultOfficeStateval = async () => {
		try {
			const s = await getState(formData?.compCountry);
			setCompStates(s.data);
			const c = await getCity(formData?.compAdd3);
			setCompCities(c.data);
		} catch (error) {
			console.log('error Office country', error);
		}
	};

	useEffect(() => {
		if (disablePrermanentAddress) {
			onCountryChange(formData?.permCountry, 'mailingCountry', true);
		}
	}, [disablePrermanentAddress]);

	const onCountryChange = async (countryCode, type, disablePerAddress = false) => {
		try {
			const response = await getState(countryCode);
			// const response = await getState(mailCountry);
			if (type === 'mailingCountry') {
				setStates(response.data);
				if (disablePerAddress && response?.data?.lookUpValues?.length > 0) {
					form.setFieldsValue({ mailState: formData?.permanentState });
					onStateChange(formData?.permanentState, 'mailingState', true);
				} else {
					form.setFieldsValue({ mailState: null, mailCity: null });
					setCities([]);
				}
			} else {
				setPermtStates(response.data);
				form.setFieldsValue({ permanentState: null, permCity: null });
				setPermtCities([]);
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
			if (type === 'mailingState') {
				onValuesChange({ mailState: value });
				setCities(response.data);
				form.setFieldsValue({ mailCity: null });
				if (disablePerAddress && response?.data?.lookUpValues?.length > 0) {
					form.setFieldsValue({ mailCity: formData?.permCity });
				}
			} else {
				onValuesChange({ permanentState: value, permCity: null });
				form.setFieldsValue({ permanentState: value });
				setPermtCities(response.data);
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
		if (
			(action === 'edit' || action === 'convert') &&
			callOneTimeEdit &&
			formData?.mailCountry &&
			formData?.mailState
		) {
			populateStateAndCity();
			setCallOneTimeEdit(false);
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
		if (
			(action === 'edit' || action === 'convert') &&
			callOneTimePermEdit &&
			formData?.permCountry &&
			formData?.permanentState
		) {
			populatePermanentStateAndCity();
			setCallOneTimePermEdit(false);
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
					permCity: formData?.permCity
				});
			}, 100);
		} catch (error) {}
	};
	useEffect(() => {
		if (
			(action === 'edit' || action === 'convert') &&
			callOneTimeCompEdit &&
			formData?.compCounty &&
			formData?.compAdd3
		) {
			populateOfficeStateAndCity();
			setCallOneTimeCompEdit(false);
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
								// disabled={cifRespData?.permAdd1}
								disabled={formData?.cifDataOnEdit}
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
								// disabled={cifRespData?.permAddPin}
								disabled={formData?.cifDataOnEdit}
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
								// disabled={cifRespData?.permCountry}
								disabled={formData?.cifDataOnEdit}
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
								// disabled={cifRespData?.permanentState}
								disabled={formData?.cifDataOnEdit}
								onChange={onStateChange}
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
							rules={rules ? rules.comcity : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={cifRespData?.permCity}
								disabled={formData?.cifDataOnEdit}
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
											// permanentState: formData?.mailState,
											// permCity: formData?.mailCity,
										});
									}, 500);
								} else {
									setDisablePrermanentAddress(false);

									form.setFieldsValue({
										mailAdd1: undefined,
										mailAddPin: undefined,
										//  mailCountry: undefined,
										// mailCountry: csObject?.mailCountry?.defaultvalue && defaultPerStateval(),
										// mailCountry: "IN",
										mailState: undefined,
										mailCity: undefined
									});
									onValuesChange({
										mailAdd1: '',
										mailAddPin: '',
										mailCountry: csObject?.PermCountry?.defaultvalue,
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
							name='mailAddPin'
							// required
							rules={rules ? rules.permzipcode : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Input
								onChange={(evt) => handleOnValuesChange('mailAddPin', evt.target.value)}
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
							name='mailCountry'
							// required
							rules={rules ? rules.mailcountry : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={disablePrermanentAddress || cifRespData?.mailCountry}
								disabled={disablePrermanentAddress}
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
								// disabled={disablePrermanentAddress || cifRespData?.mailState}
								disabled={disablePrermanentAddress}
								onChange={(value) => onStateChange(value, 'mailingState')}
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
