import { faFacebookSquare, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Form, Input, Row, Select, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import { CONSTANTS } from '../../../constants/constants';
import { getDependentLocationDataApi } from '../../../api/commonApi';
// import "./contactDetailsFormCard.scss";

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
	}, [formData.country, formData.state]);
	// useEffect(() => {
	//   if (mode === "edit") {
	//     if (formData.country) {
	//       getDependentLocationData(formData.country, "state");
	//     }
	//     if (formData.state) {
	//       getDependentLocationData(formData.state, "city");
	//     }
	//   }
	// }, [formData.country, formData.state]);

	const countryCode = (
		<Form.Item
			name='countryCode'
			noStyle
			validateTrigger={['onChange', 'onBlur']}
			rules={rules ? rules.dialcode : []}
		>
			<Select
				className='add-on-select'
				value={formData.countryCode}
				filterOption={(input, opt) => {
					return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
				}}
				showSearch
				placeholder={CONSTANTS.placeholders.select}
				// defaultValue={
				//   csObject?.DialCode?.defaultvalue
				//     ? csObject?.DialCode?.defaultvalue
				//     : "+63"
				// }
				size='large'
			>
				{csObject &&
					csObject.CountryCode &&
					csObject.CountryCode.lookupValue.lookUpValues.map((country) => (
						<Select.Option key={country.country} value={country.Country_Name}>
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
			rules={
				formData?.alternateContact
					? [{ required: true, message: '* DialCode cannot be empty' }]
					: []
			}
		>
			<Select
				className='add-on-select'
				value={formData.region}
				filterOption={(input, opt) => {
					return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
				}}
				showSearch
				placeholder={CONSTANTS.placeholders.select}
				// defaultValue={
				//   csObject?.DialCode?.defaultvalue
				//     ? csObject?.DialCode?.defaultvalue
				//     : "+63"
				// }
				size='large'
			>
				{csObject &&
					csObject.CountryCode &&
					csObject.CountryCode.lookupValue.lookUpValues.map((country) => (
						<Select.Option key={country.country} value={country.Country_Name}>
							{/* + {country.Dialing_Code} */}
							{country.Dialing_Code}
						</Select.Option>
					))}
			</Select>
		</Form.Item>
	);
	const [symbolsArr] = useState(['e', 'E', '+', '-', '.']);

	function allowNumberic(e) {
		let x = e.which || e.keycode;
		if (x >= 48 && x <= 57) return false;
		else if (x >= 96 && x <= 105) return false;
		else if (x == 37 || x == 39 || x == 8 || x == 9) return false;
		else return true;
	}

	return (
		<Card title='Contact Details' className='contact-details-form-card'>
			<Form form={form} layout='vertical' initialValues={formData} onValuesChange={onValuesChange}>
				<Row>
					<Col span={8}>
						<Form.Item
							name='contact'
							label={<div className='text'>Contact</div>}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.mobile : []}
							required
						>
							<Input
								maxLength={10}
								onKeyDown={(e) => allowNumberic(e) && e.preventDefault()}
								addonBefore={countryCode}
								value={formData.contact}
								placeholder={CONSTANTS.placeholders.enter}
								size='large'
								// style={{
								//   width: "100%",
								// }}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							name='alternateContact'
							label={<div className='text'>Alternate Contact</div>}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.alternatenumber : []}
						>
							<Input
								maxLength={10}
								// onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
								onKeyDown={(e) => allowNumberic(e) && e.preventDefault()}
								addonBefore={altCountryCode}
								value={formData.alternateContact}
								placeholder={CONSTANTS.placeholders.enter}
								size='large'
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							name='emailId'
							label={<div className='text'>Email ID</div>}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.email : []}
						>
							<Input
								className='field'
								value={formData.emailId}
								placeholder={CONSTANTS.placeholders.enter}
								size='large'
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={10}>
						<Row>
							<Col span={8}>
								<Form.Item name='whatsApp' noStyle>
									<Checkbox.Group options={plainOption1} value={formData.whatsApp} />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item name='viber' noStyle>
									<Checkbox.Group options={plainOption2} value={formData.viber} />
								</Form.Item>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row>
					<Col span={16}>
						<Form.Item
							name='address'
							label={<div className='text'>Address</div>}
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
					<Col span={8}>
						<Form.Item
							name='zipCode'
							label={<div className='text'>Zip Code</div>}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.zipcode : []}
						>
							<Input
								type='number'
								onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
								value={formData.zipCode}
								placeholder={CONSTANTS.placeholders.enter}
								size='large'
							/>
						</Form.Item>
						{/* Locate on Map */}
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<Form.Item
							name='country'
							label={<div className='text'>Country</div>}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.country : []}
						>
							<Select
								value={formData.country}
								size='large'
								onSelect={(value) => {
									getDependentLocationData(value, 'state');
								}}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
								onClick={() => {
									form.setFieldsValue({
										State: '',
										City: ''
									});
									formData.state = '';
									formData.city = '';
								}}
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
							label={<div className='text'>State</div>}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.state : []}
						>
							<Select
								value={formData.state}
								size='large'
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
							label={<div className='text'>City</div>}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.city : []}
						>
							<Select
								value={formData.city}
								size='large'
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
							rules={[
								{
									message: 'Maximum character length is 100',
									pattern: /^[\S\d\W]{0,100}$/
								}
							]}
							label={<div className='text'>Twitter</div>}
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
								placeholder='Paste URL'
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							name='facebook'
							rules={[
								{
									message: 'Maximum character length is 100',
									pattern: /^[\S\d\W]{0,100}$/
								}
							]}
							label={<div className='text'>Facebook</div>}
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
								placeholder='Paste URL'
								size='large'
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							name='linkedIn'
							rules={[
								{
									message: 'Maximum character length is 100',
									pattern: /^[\S\d\W]{0,100}$/
								}
							]}
							label={<div className='text'>LinkedIn</div>}
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
								placeholder='Paste URL'
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
