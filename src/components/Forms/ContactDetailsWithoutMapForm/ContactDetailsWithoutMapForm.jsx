import { faFacebookSquare, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Form, Input, Row, Select, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import '../ContactDetailsFormCard/contactDetailsFormCard.scss';
import { CONSTANTS } from '../../../constants/constants';
import { getDependentLocationDataApi } from '../../../api/commonApi';

const ContactDetailsFormCard = ({ form, formData, onValuesChange, rules, csObject, mode }) => {
	const [stateDropdown, setStateDropdown] = useState();

	const [cityDropdown, setCityDropdown] = useState();
	const plainOption1 = ['WhatsApp'];
	const plainOption2 = ['Viber'];

	const getDependentLocationData = (value, mode) => {
		getDependentLocationDataApi(value, mode)
			.then((res) => {
				res.data.returnColumn === 'State' && setStateDropdown(res.data.lookUpValues);
				res.data.returnColumn === 'City' && setCityDropdown(res.data.lookUpValues);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		if (formData.country) {
			getDependentLocationData(formData.country, 'state');
		}
		if (formData.state) {
			getDependentLocationData(formData.state, 'city');
		}
	}, []);
	useEffect(() => {
		if (mode === 'edit') {
			if (formData.country) {
				getDependentLocationData(formData.country, 'state');
			}
			if (formData.state) {
				getDependentLocationData(formData.state, 'city');
			}
		}
	}, [formData.country]);
	const styleSet = {
		emailIdInput: { height: '40px' },
		zipCodeLabel: { width: '100%' },
		zipCodeInput: { backgroundColor: '#f6f7fb' }
	};
	const countryCode = (
		<Form.Item
			name='countryCode'
			noStyle
			// validateTrigger={["onChange", "onBlur"]}
			// rules={rules ? rules.countrycode : []}
		>
			<Select
				className='add-on-select'
				value={formData.dialCode}
				filterOption={(input, opt) => {
					return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
				}}
				showSearch
				placeholder={CONSTANTS.placeholders.select}
			>
				{csObject &&
					csObject.DialCode &&
					csObject.DialCode.lookupValue.lookUpValues.map((country) => (
						<Select.Option key={country.country} value={country.Dialing_Code}>
							{/* + {country.Dialing_Code} */}
							{country.Dialing_Code}
						</Select.Option>
					))}
			</Select>
		</Form.Item>
	);
	const altCountryCode = (
		<Form.Item
			name='altCountryCode'
			noStyle
			// validateTrigger={["onChange", "onBlur"]}
			// rules={rules ? rules.countrycode : []}
		>
			<Select
				size='large'
				value={formData.alternateDialCode}
				filterOption={(input, opt) => {
					return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
				}}
				showSearch
				placeholder={CONSTANTS.placeholders.select}
			>
				{csObject &&
					csObject.AlternateDialCode &&
					csObject.AlternateDialCode.lookupValue.lookUpValues.map((country) => (
						<Select.Option key={country.country} value={country.Dialing_Code}>
							{/* + {country.Dialing_Code} */}
							{country.Dialing_Code}
						</Select.Option>
					))}
			</Select>
		</Form.Item>
	);
	const [symbolsArr] = useState(['e', 'E', '+', '-', '.']);
	return (
		<Card title='Contact Details' className='contact-det-card-type'>
			<Form
				form={form}
				layout='vertical'
				initialValues={formData}
				onValuesChange={onValuesChange}
				className='form-container'
			>
				<Row>
					<Col span={10}>
						<Form.Item
							name='contact'
							label='Contact'
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.mobile : []}
							required
						>
							<Input
								type='number'
								size='large'
								onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
								addonBefore={countryCode}
								value={formData.contact}
								placeholder={CONSTANTS.placeholders.enter}
							/>
						</Form.Item>
					</Col>
					<Col span={7}>
						<Form.Item
							name='alternateContact'
							label='Alternate Contact'
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.alternatenumber : []}
						>
							<Input
								type='number'
								size='large'
								onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
								addonBefore={altCountryCode}
								value={formData.alternateContact}
								placeholder={CONSTANTS.placeholders.enter}
							/>
						</Form.Item>
					</Col>
					<Col span={7}>
						<Form.Item
							name='emailId'
							label='Email ID'
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.email : []}
						>
							<Input
								size='large'
								value={formData.emailId}
								placeholder={CONSTANTS.placeholders.enter}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={10}>
						<Row>
							<Col span={8}>
								<Form.Item name='whatsApp'>
									<Checkbox.Group options={plainOption1} value={formData.whatsApp} />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item name='viber'>
									<Checkbox.Group options={plainOption2} value={formData.viber} />
								</Form.Item>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row>
					<Col span={17}>
						<Form.Item
							name='address'
							label='Address'
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.address : []}
						>
							<Input.TextArea
								rows={6}
								value={formData.address}
								placeholder={CONSTANTS.placeholders.enter}
							/>
						</Form.Item>
					</Col>
					<Col span={7}>
						<Form.Item
							name='zipCode'
							label='Zip Code'
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? [...rules.zipcode, { pattern: /[0-9]/ }] : []}
						>
							<Input
								type='number'
								size='large'
								value={formData.zipCode}
								placeholder={CONSTANTS.placeholders.enter}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<Form.Item
							name='country'
							label='Country'
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.country : []}
						>
							<Select
								value={formData.country}
								size='large'
								style={{
									width: '100%'
								}}
								onSelect={(value) => {
									getDependentLocationData(value, 'state');
								}}
								onClick={() => {
									form.setFieldsValue({
										State: '',
										City: ''
									});
									formData.state = '';
									formData.city = '';
								}}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
								placeholder={CONSTANTS.placeholders.select}
							>
								{csObject &&
									csObject.Country &&
									csObject.Country.dropDownValue.map((country) => (
										<Select.Option key={country.dataValue} value={country.dataValue}>
											{country.displayValue}
										</Select.Option>
									))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							name='state'
							label='State'
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.state : []}
						>
							<Select
								value={formData.state}
								size='large'
								style={{
									width: '100%'
								}}
								disabled={!formData.country}
								onSelect={(value) => {
									getDependentLocationData(value, 'city');
								}}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
								onClick={() => {
									form.setFieldsValue({
										City: ''
									});
									formData.city = '';
								}}
								placeholder={CONSTANTS.placeholders.select}
							>
								{stateDropdown &&
									stateDropdown.map((state) => (
										<Select.Option key={state.data_value} value={state.data_value}>
											{state.display_value}
										</Select.Option>
									))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							name='city'
							label='City'
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.city : []}
						>
							<Select
								value={formData.city}
								className='field'
								size='large'
								style={{
									width: '100%'
								}}
								disabled={formData && (!formData.country || !formData.state)}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
								placeholder={CONSTANTS.placeholders.select}
							>
								{cityDropdown &&
									cityDropdown.map((city) => (
										<Select.Option key={city.data_value} value={city.data_value}>
											{city.display_value}
										</Select.Option>
									))}
							</Select>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<Form.Item
							name='twitter'
							label={<div className='text'>Twitter</div>}
							// validateTrigger={["onChange", "onBlur"]}
							// rules={[{ required: true, message: "Required" }]}
						>
							<Input
								value={formData.twitter}
								className='field'
								prefix={
									<FontAwesomeIcon
										icon={faTwitter}
										size='2x'
										style={{ margin: '0 10px 0 0', color: '#48A1EC' }}
									/>
								}
								size='large'
								placeholder={CONSTANTS.placeholders.socialMedia}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							name='facebook'
							label={<div className='text'>Facebook</div>}
							// validateTrigger={["onChange", "onBlur"]}
							// rules={[{ required: true, message: "Required" }]}
						>
							<Input
								value={formData.facebook}
								className='field'
								prefix={
									<FontAwesomeIcon
										icon={faFacebookSquare}
										size='2x'
										style={{ margin: '0 10px 0 0', color: '#274D95' }}
									/>
								}
								placeholder={CONSTANTS.placeholders.socialMedia}
								size='large'
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							name='linkedIn'
							label={<div className='text'>LinkedIn</div>}
							// validateTrigger={["onChange", "onBlur"]}
							// rules={[{ required: true, message: "Required" }]}
						>
							<Input
								value={formData.linkedin}
								className='field'
								prefix={
									<FontAwesomeIcon
										icon={faLinkedin}
										size='2x'
										style={{ margin: '0 10px 0 0', color: '#3568AD' }}
									/>
								}
								placeholder={CONSTANTS.placeholders.socialMedia}
								size='large'
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	);
};
export default ContactDetailsFormCard;
