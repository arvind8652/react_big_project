import React from 'react';
import {
	Card,
	Row,
	Col,
	Typography,
	Checkbox,
	Select,
	Form,
	Input,
	Divider,
	DatePicker
} from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/pro-light-svg-icons';
import { useState, useEffect } from 'react';
import { getRelationshipDetails } from '../../../api/customerCreateApi';

const { Option } = Select;

export default function RelationDetails({
	form,
	formData,
	onValuesChange,
	rules,
	csObject,
	action,
	customerCode
}) {
	const [isGetApiCompleted, setIsGetApiCompleted] = useState(false);

	const formatData = (data) => {
		return data.map((e) => ({
			EmailId: e.email,
			Address: e.address,
			ContactNumber: e.mobile,
			PrimaryIdno: null,
			// Dob:e.dob,
			RelationType: e.relation,
			AddMore: true,
			RelationName: e.relationName
		}));
	};

	const getDetails = async () => {
		try {
			const response = await getRelationshipDetails(undefined, customerCode);
			setRelationDetail(formatData(response.data));
			setIsGetApiCompleted(true);
		} catch (error) {
			setIsGetApiCompleted(true);
		}
	};

	useEffect(() => {
		// if(action==='edit'){
		getDetails();
		// }
	}, []);

	let addRelation;

	const PrefixSelector = ({ name, onChange }) => (
		<Form.Item name={name || ''} noStyle>
			<Select
				style={{
					width: 80
				}}
				size='large'
				defaultValue='+91'
				onChange={onChange}
			>
				{csObject?.CountryCode?.lookupValue?.lookUpValues?.map((item) => (
					<Option key={item.Dailing_Code} value={item.Dailing_Code}>
						{item.Dialing_Code}
					</Option>
				))}
			</Select>
		</Form.Item>
	);

	const [relationDetail, setRelationDetail] = useState([]);
	const addNewRelationDetail = () => {
		var obj = {
			Id: null,
			RefId: null,
			RefType: 'CLIENTREQADD',
			SrlNo: 0,
			RelationType: '',
			RelationName: '',
			Dob: '',
			Address: formData.mailAdd1,
			ContactNumber: formData?.socialList?.mobileNo,
			EmailId: formData?.socialList?.eMail,
			IsCustomer: false,
			DialCode: formData?.socialList?.dialCode,
			PrimaryId: 'FDFD',
			PrimaryIdno: 'WELLK998',
			SessionId: 'oK2sIIo3gSE9nEQGnhX2_hWDvxCR7O-dsSnGulsvnZo',
			AddMore: false
		};
		setRelationDetail([...relationDetail, obj]);
	};

	const checkRelationDetail = (index, value) => {
		setRelationDetail([
			...relationDetail.slice(0, index),
			{
				...relationDetail[index],
				IsCustomer: value,
				AddMore: false
			},
			...relationDetail.slice(index + 1)
		]);
	};

	const addMoreRelationDetail = (index) => {
		setRelationDetail([
			...relationDetail.slice(0, index),
			{
				...relationDetail[index],
				AddMore: true
			},
			...relationDetail.slice(index + 1)
		]);
	};

	const removeRelationDetail = (index) => {
		setRelationDetail([...relationDetail.slice(0, index), ...relationDetail.slice(index + 1)]);
	};

	const onChange = (value, key, idx) => {
		setRelationDetail((prevRelationDetail) => {
			const newObj = [...prevRelationDetail];
			newObj[idx] = { ...newObj[idx], [key]: value, SrlNo: idx + 1 };
			return newObj;
		});
	};

	useEffect(() => {
		onValuesChange({ RelationDetail: relationDetail });
	}, [relationDetail]);

	const onFinish = (values) => {
		console.log('Received values of form:', values);
	};

	if (!action === 'edit' || isGetApiCompleted) {
		return (
			<Card
				title='Relationship Details'
				// className={relationDetail.length === 0 ? 'no-card-body' : ''}
				extra={
					<Typography.Title level={5}>
						<Typography.Link
							onClick={() => {
								addRelation();
								addNewRelationDetail();
							}}
						>
							+ Add
						</Typography.Link>
					</Typography.Title>
				}
			>
				<Form form={form} layout='vertical' initialValues={formData} onFinish={onFinish}>
					<Form.List initialValue={relationDetail} name='RelationDetail'>
						{(fields, { add, remove }) => {
							addRelation = () => add();
							return fields.map(({ key, name, fieldKey, ...restField }, index) => {
								return (
									<div key={key}>
										<Row justify='space-between'>
											<Col>
												<Form.Item name={[name, 'IsCustomer']}>
													<Checkbox onChange={(e) => checkRelationDetail(index, e.target.checked)}>
														{' '}
														Existing Customer
													</Checkbox>
												</Form.Item>
											</Col>
											<Col>
												<Typography.Link
													onClick={() => {
														remove(name);
														removeRelationDetail(index);
													}}
												>
													<u>Remove</u>
												</Typography.Link>
											</Col>
										</Row>
										<Row>
											<Col span={8}>
												<Form.Item
													label='Full Name'
													required
													name={[name, 'RelationName']}
													rules={rules ? rules.relationname : []}
													validateTrigger={['onChange', 'onBlur']}
												>
													{relationDetail[index]?.IsCustomer ? (
														<Select
															onChange={(value) => onChange(value, 'RelationName', index)}
															showSearch
															size='large'
															placeholder={'Search by Name'}
															suffixIcon={<FontAwesomeIcon icon={faUserPlus} color='#354081' />}
															filterOption={(input, option) => {
																return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
															}}
															options={csObject?.RelationName?.lookupValue?.lookUpValues.map(
																(_) => ({ label: _.Name, value: _.ID })
															)}
														/>
													) : (
														<Input
															onChange={(evt) => onChange(evt.target.value, 'RelationName', index)}
															size='large'
															maxLength='30'
															placeholder={'Enter full name'}
														/>
													)}
												</Form.Item>
											</Col>
											<Col span={8}>
												<Form.Item
													label='Relation'
													name={[name, 'RelationType']}
													required
													rules={rules ? rules.relation : []}
													validateTrigger={['onChange', 'onBlur']}
												>
													<Select
														onChange={(value) => onChange(value, 'RelationType', index)}
														size='large'
														placeholder={
															relationDetail[index].IsCustomer ? 'Select option' : 'Enter relation'
														}
													>
														{csObject?.Relation?.dropDownValue?.map((_) => (
															<Select.Option value={_?.dataValue} key={_?.dataValue}>
																{_?.displayValue}
															</Select.Option>
														))}
													</Select>
												</Form.Item>
											</Col>
											<Col span={8}>
												<Form.Item
													label='Date of Birth'
													name={[name, 'Dob']}
													required
													rules={rules ? rules.dob : []}
													validateTrigger={['onChange', 'onBlur']}
												>
													<DatePicker
														onChange={(value) =>
															onChange(value?.format('YYYY-MM-DD'), 'Dob', index)
														}
														size='large'
														placeholder='Select date of birth'
													/>
												</Form.Item>
											</Col>
											{!relationDetail[index].IsCustomer && relationDetail[index].AddMore && (
												<>
													<Col span={8}>
														<Form.Item
															label='Primary ID'
															name={[name, 'PrimaryId']}
															rules={rules ? rules.primaryid : []}
															validateTrigger={['onChange', 'onBlur']}
														>
															<Select
																onChange={(value) => onChange(value, 'PrimaryId', index)}
																size='large'
																placeholder='Enter Primary ID'
																options={csObject?.PrimaryID?.lookupValue?.lookUpValues?.map(
																	(_) => ({
																		label: _.documentname,
																		value: _.document
																	})
																)}
															/>
														</Form.Item>
													</Col>
													<Col span={8}>
														<Form.Item
															label='Primary ID Number'
															name={[name, 'PrimaryIdno']}
															rules={rules ? rules.primaryidno : []}
															validateTrigger={['onChange', 'onBlur']}
														>
															<Input
																onChange={(evt) => onChange(evt.target.value, 'PrimaryIdno', index)}
																size='large'
																maxLength='20'
																placeholder='Enter Primary ID number'
															/>
														</Form.Item>
													</Col>
													<Col span={8}>
														<Form.Item
															label='Expiry Date'
															name={[name, 'ExpiryDate']}
															rules={rules ? rules.expirydate : []}
															validateTrigger={['onChange', 'onBlur']}
														>
															<DatePicker
																onChange={(value) => onChange(value, 'ExpiryDate', index)}
																size='large'
																placeholder='Select expiry date'
																disabled={
																	!(
																		relationDetail.length > 0 &&
																		relationDetail[index].PrimaryId !== 'ABCD'
																	)
																}
															/>
														</Form.Item>
													</Col>
													<Col span={8}>
														<Form.Item
															label='Contact'
															name={[name, 'ContactNumber']}
															rules={rules ? rules.mobile : []}
															validateTrigger={['onChange', 'onBlur']}
														>
															<Input
																onChange={(evt) =>
																	onChange(evt.target.value, 'ContactNumber', index)
																}
																addonBefore={<PrefixSelector name={[name, 'DialCode']} />}
																size='large'
																placeholder='Enter contact number'
																maxLength='10'
															/>
														</Form.Item>
													</Col>
													<Col span={8}>
														<Form.Item
															label='Email ID'
															name={[name, 'EmailId']}
															rules={rules ? rules.email : []}
															validateTrigger={['onChange', 'onBlur']}
														>
															<Input
																onChange={(evt) => onChange(evt.target.value, 'EmailId', index)}
																size='large'
																maxLength='30'
																placeholder='Enter email ID'
															/>
														</Form.Item>
													</Col>
													<Col span={8}></Col>
													<Col span={16}>
														<Form.Item
															label='Address'
															name={[name, 'Address']}
															rules={rules ? rules.address : []}
															validateTrigger={['onChange', 'onBlur']}
														>
															<Input.TextArea
																onChange={(evt) => onChange(evt.target.value, 'Address', index)}
																size='large'
																rows={4}
																maxLength='100'
															/>
														</Form.Item>
													</Col>
												</>
											)}
										</Row>
										{!relationDetail[index].IsCustomer && !relationDetail[index].AddMore && (
											<Row justify='end'>
												<Col>
													<Typography.Link onClick={() => addMoreRelationDetail(index)}>
														+ Add More
													</Typography.Link>
												</Col>
											</Row>
										)}
										{index !== fields.length - 1 && <Divider />}
									</div>
								);
							});
						}}
					</Form.List>
				</Form>
			</Card>
		);
	}
	return null;
}
