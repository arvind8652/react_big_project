import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, Col, Row, DatePicker } from 'antd';
import { CONSTANTS } from '../../../constants/constants';

import './miscellaneousFormModal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/pro-regular-svg-icons';
import { ScButtonPrimary, ScButtonText } from '../../StyledComponents/genericElements';
import moment from 'moment';

const MiscellaneousFormModal = ({
	miscFormData,
	visible,
	handleOk,
	handleCancel,
	csObject,
	rules
}) => {
	const [formData, setFormData] = useState([{ key: '', value: '' }]);
	const blankFormObject = { key: '', value: '' };
	const [form] = Form.useForm();
	const csKeys = csObject ? Object.keys(csObject) : [];
	useEffect(() => {
		setFormData(miscFormData);
	}, [miscFormData]);
	useEffect(() => {
		form.setFieldsValue(setFormData);
	}, [formData]);
	const Title = () => (
		<>
			<span className='title'>Miscellaneous</span>
			<ScButtonText
				type='text'
				fontWeight='600'
				onClick={() => {
					Array.isArray(formData) && formData.length > 0
						? setFormData([...formData, blankFormObject])
						: setFormData([blankFormObject]);
				}}
			>
				+ Add Field
			</ScButtonText>
		</>
	);

	return (
		<Modal
			title={<Title />}
			className='miscellaneous-form-modal-container'
			visible={visible}
			onCancel={handleCancel}
			onOk={handleOk}
			width='50rem'
			closable={false}
			footer={[
				<ScButtonText type='text' key='back' onClick={handleCancel}>
					Cancel
				</ScButtonText>,
				<ScButtonPrimary
					htmlType='submit'
					//htmlType="save"
					key='submit'
					type='primary'
					onClick={() => {
						form
							.validateFields()
							.then(() => {
								handleOk(formData);
							})
							.catch((err) => {
								console.log(err);
							});
					}}
				>
					Save
				</ScButtonPrimary>
			]}
			centered
		>
			<Form layout='vertical' className='form-container' form={form}>
				{formData &&
					formData.map((item, index) => {
						formData.map((item, idx) => {
							return idx === index ? { ...item, value: undefined } : item;
						});

						return (
							<Row justify='space-around' align='middle' key={index} className='miscellaneous-row'>
								<Col span={10}>
									<Form.Item label='Field Name'>
										<Select
											value={item.key}
											style={{ width: '100%' }}
											placeholder={CONSTANTS.placeholders.select}
											onSelect={(value) => {
												let tempData = formData;
												tempData[index].key = value;
												tempData[index].value = undefined;

												setFormData(
													formData.map((item, idx) =>
														idx === index ? { ...item, value: undefined } : item
													)
												);
											}}
										>
											{csKeys.length > 0 &&
												csKeys.map((key) => {
													return (
														<Select.Option key={key} value={csObject[key].keyField}>
															{csObject[key].fieldLabel}
														</Select.Option>
													);
												})}
										</Select>
									</Form.Item>
								</Col>
								{item && item.key && item.key !== '' && (
									<Col span={10}>
										{csKeys.includes(item.key) &&
											['DropdownList', 'AutoComplete'].includes(csObject[item.key].controlType) && (
												<Form.Item
													label={
														csObject[item.key].fieldLabel === 'Brokerage Fee (PNB Sec)'
															? 'Brokerage Fee in % (PNB Sec)'
															: csObject[item.key].fieldLabel
													}
													validateTrigger={['onChange', 'onBlur']}
													rules={rules ? rules[item.key.toLowerCase()] : []}
												>
													<Select
														value={formData[index].value}
														style={{ width: '100%' }}
														placeholder={CONSTANTS.placeholders.select}
														onSelect={(value) => {
															let tempData = formData;
															tempData[index].value = value;
															setFormData([...tempData]);
														}}
														showSearch={csObject[item.key].controlType.includes('AutoComplete')}
													>
														{csObject[item.key].controlType.includes('DropdownList') &&
															csObject[item.key].dropDownValue.map((value) => (
																<Select.Option key={value.dataValue} value={value.dataValue}>
																	{value.displayValue}
																</Select.Option>
															))}
														{csObject[item.key].controlType.includes('AutoComplete') &&
															csObject[item.key].lookupValue &&
															csObject[item.key].lookupValue.lookUpValues &&
															csObject[item.key].lookupValue.lookUpValues.map((value) => (
																<Select.Option key={value.industry} value={value.industry}>
																	{value.name}
																</Select.Option>
															))}
													</Select>
												</Form.Item>
											)}
										{csKeys.includes(item.key) && csObject[item.key].controlType === 'TextBox' && (
											<Form.Item
												label={csObject[item.key].fieldLabel}
												validateTrigger={['onChange', 'onBlur']}
												rules={rules ? rules[item.key] : []}
											>
												<Input
													type='text'
													defaultValue={formData[index] && formData[index].value}
													value={formData[index] && formData[index].value}
													style={{ width: '100%' }}
													onChange={(e) => {
														let tempData = formData;
														tempData[index].value = e.target.value;
														setFormData([...tempData]);
													}}
													placeholder={CONSTANTS.placeholders.enter}
													maxLength={csObject[item.key].fieldLength}
												/>
											</Form.Item>
										)}
										{csKeys.includes(item.key) &&
											csObject[item.key].controlType == 'NumericTextBox' && (
												<Form.Item
													label={csObject[item.key].fieldLabel}
													validateTrigger={['onChange', 'onBlur']}
													rules={rules ? rules[item.key] : []}
												>
													<Input
														type='number'
														defaultValue={formData[index] && formData[index].value}
														value={formData[index] && formData[index].value}
														style={{ width: '100%' }}
														onChange={(e) => {
															if (e.target.value.length < 21) {
																let tempData = formData;
																tempData[index].value = e.target.value;
																setFormData([...tempData]);
															}
														}}
														placeholder={CONSTANTS.placeholders.enter}
													/>
												</Form.Item>
											)}
										{csKeys.includes(item.key) &&
											csObject[item.key].controlType.includes('DatePicker') && (
												<Form.Item
													label={csObject[item.key].fieldLabel}
													validateTrigger={['onChange', 'onBlur']}
													rules={rules ? rules[item.key] : []}
												>
													<DatePicker
														value={
															formData[index] &&
															formData[index].value &&
															moment(formData[index].value)
														}
														format='DD-MM-YYYY'
														onSelect={(d) => {
															setFormData(
																formData.map((item, idx) => {
																	return idx === index ? { ...item, value: d } : item;
																})
															);
														}}
														style={{ width: '100%' }}
														placeholder={CONSTANTS.placeholders.date}
													/>
												</Form.Item>
											)}
									</Col>
								)}
								<ScButtonText
									type='text'
									onClick={() => {
										setFormData(formData.filter((field, idx) => idx !== index));
									}}
								>
									<FontAwesomeIcon icon={faTrashAlt} />
								</ScButtonText>
							</Row>
						);
					})}
			</Form>
		</Modal>
	);
};

export default MiscellaneousFormModal;
