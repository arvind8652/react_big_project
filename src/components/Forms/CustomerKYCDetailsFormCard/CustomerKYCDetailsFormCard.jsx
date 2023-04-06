import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Select, Form, Input, DatePicker, InputNumber, Space } from 'antd';
import { getFatca, getClientKYCPrimSecId } from '../../../api/commonApi';

import moment from 'moment';

export default function KycValidationDetails({
	form,
	formData,
	onValuesChange,
	rules,
	csObject,
	cifRespData = {}
}) {
	const [FATCA, setFATCA] = useState();
	const [ClientKYCPrimSecId, setClientKYCPrimSecId] = useState();
	const getFATCA = async () => {
		try {
			const response = await getFatca(formData?.customerType);
			setFATCA(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getClientKYCPrimSecIdHandler = async () => {
		try {
			const resp = await getClientKYCPrimSecId(formData?.customerType);
			setClientKYCPrimSecId(resp.data);
		} catch (error) {
			console.log('getClientKYCPrimSecIdHandler', error);
		}
	};
	useEffect(() => {
		getFATCA();
		getClientKYCPrimSecIdHandler();
	}, [formData?.customerType]);

	const handleOnValuesChange = (key, value) => {
		onValuesChange({ [key]: value });
	};

	function disabledPastDate(current) {
		// Can not select days after today and today
		return current && current < moment().startOf('day');
	}

	function disabledFutureDate(current) {
		// Can not select days after today and today
		return current && current > moment().endOf('day');
	}

	function onChangeTIN(value) {
		handleOnValuesChange('tin', value);
	}

	const tinValidator = async (rule, value, callback) => {
		if (value && value.toString().length < 12 && formData?.customerType === 'C') {
			return Promise.reject(new Error('TIN Number should be 12 digit'));
		} else if (value && value.toString().length < 9 && formData?.customerType === 'I') {
			return Promise.reject(new Error('TIN Number should be 9 digit'));
		} else {
			return Promise.resolve();
		}
	};

	return (
		<Card title='KYC Validation Details'>
			<Form
				form={form}
				layout='vertical'
				initialValues={formData}
				validateMessages={{
					required: '${label} required'
				}}
			>
				<Row>
					<Col span={8}>
						<Form.Item
							label='Primary ID'
							name='idType'
							rules={rules ? rules.primaryid : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={cifRespData?.idType}
								showSearch
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								onChange={(value) => {
									handleOnValuesChange('idType', value);
								}}
								size='large'
								placeholder='Enter Primary ID'
								options={ClientKYCPrimSecId?.lookUpValues?.map((_, i) => ({
									key: i,
									disabled: formData?.secId === _.data_value ? true : false,
									label: _.display_value,
									value: _.data_value
								}))}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						{/* <Space direction="vertical" size={122} style={{ marginBottom: 24, marginLeft: 0 }}> */}
						<Form.Item
							label='Primary ID Number'
							name='idNo'
							rules={rules ? rules.primaryidno : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Input
								onChange={(evt) => handleOnValuesChange('idNo', evt.target.value)}
								size='large'
								placeholder='Enter primary ID number'
								// disabled={!formData.idType || cifRespData?.idNo}
								disabled={!formData.idType}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						{/* <Space direction="vertical" size={122} style={{ marginBottom: 24, marginLeft: 0 }}> */}
						<Form.Item
							label='Issuance Date (Primary ID)'
							// name="primaryIssuanceDate"
							rules={rules ? rules.expirydate : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<DatePicker
								allowClear={false}
								disabledDate={disabledFutureDate}
								onChange={(val) =>
									handleOnValuesChange('primaryIssuanceDate', val?.format('YYYY-MM-DD'))
								}
								size='large'
								placeholder='Select Issuance Date'
								// disabled={!formData.idType || cifRespData?.primaryIssuanceDate}
								disabled={!formData.idType}
								value={formData?.primaryIssuanceDate ? moment(formData?.primaryIssuanceDate) : null}
								// defaultValue={formData?.primaryIssuanceDate}

								format='DD-MM-YYYY'
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						{formData.idType !== 'ABCD' && (
							<Form.Item
								label='Primary Expiry Date'
								// name="idExpDate"
								rules={rules ? rules.expirydate : []}
								validateTrigger={['onChange', 'onBlur']}
							>
								<DatePicker
									allowClear={false}
									disabledDate={disabledPastDate}
									onChange={(val) => handleOnValuesChange('idExpDate', val?.format('YYYY-MM-DD'))}
									size='large'
									placeholder='Select expiry date'
									// disabled={!formData.idType || cifRespData?.idExpDate}
									disabled={!formData.idType}
									value={formData?.idExpDate ? moment(formData?.idExpDate) : null}
									format='DD-MM-YYYY'
								/>
							</Form.Item>
						)}
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<Form.Item
							label='Secondary ID'
							name='secId'
							rules={rules ? rules.secondaryid : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={cifRespData?.secId}
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								onChange={(value) => {
									handleOnValuesChange('secId', value);
								}}
								size='large'
								placeholder='Enter Secondary ID'
								options={ClientKYCPrimSecId?.lookUpValues?.map((_, i) => ({
									key: i,
									disabled: formData?.idType === _.data_value ? true : false,
									label: _.display_value,
									value: _.data_value
								}))}
								showSearch
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='Secondary ID Number'
							name='secIdNo'
							rules={rules ? rules.secondaryidno : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Input
								onChange={(evt) => handleOnValuesChange('secIdNo', evt.target.value)}
								size='large'
								placeholder='Enter Secondary ID number'
								// disabled={!formData.secId || cifRespData?.secIdNo}
								disabled={!formData.secId}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='Issuance Date (Secondary ID)'
							// name="secondaryIssuanceDate"
							rules={rules ? rules.expirydate : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<DatePicker
								allowClear={false}
								disabledDate={disabledFutureDate}
								onChange={(val) =>
									handleOnValuesChange('secondaryIssuanceDate', val.format('YYYY-MM-DD'))
								}
								size='large'
								placeholder='Select expiry date'
								// disabled={!formData.secId || cifRespData?.secondaryIssuanceDate}
								disabled={!formData.secId}
								// defaultValue={formData?.secondaryIssuanceDate}
								value={
									formData?.secondaryIssuanceDate ? moment(formData?.secondaryIssuanceDate) : null
								}
								format='DD-MM-YYYY'
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<Form.Item
							label='Secondary Expiry Date'
							// name="secIdExpdt"
							rules={rules ? rules.expirydate : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<DatePicker
								allowClear={false}
								disabledDate={disabledPastDate}
								onChange={(val) => handleOnValuesChange('secIdExpdt', val?.format('YYYY-MM-DD'))}
								size='large'
								placeholder='Select expiry date'
								// disabled={!formData.secId || cifRespData?.secIdExpdt}
								disabled={!formData.secId}
								value={formData?.secIdExpdt ? moment(formData?.secIdExpdt) : null}
								format='DD-MM-YYYY'
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<Form.Item
							label='FATCA Validation'
							name='fatcaClassification'
							required
							rules={rules ? rules.fatcaclassification : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={cifRespData?.fatcaClassification}
								disabled={formData?.cifDataOnEdit}
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								onChange={(val) => handleOnValuesChange('fatcaClassification', val)}
								placeholder='Select'
								size='large'
								showSearch
								options={FATCA?.lookUpValues?.map((_, i) => ({
									key: i,
									label: _.fatca,
									value: _.fatcaid
								}))}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='PEP'
							name='riskCategoryAmla'
							required
							rules={rules ? rules.pep : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={cifRespData?.riskCategoryAmla}
								disabled={formData?.cifDataOnEdit}
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								onChange={(val) => handleOnValuesChange('riskCategoryAmla', val)}
								placeholder='Select'
								size='large'
								showSearch
								options={csObject?.PEP?.dropDownValue?.map((_, i) => ({
									key: i,
									label: _.displayValue,
									value: _.dataValue
								}))}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='Potentially Vulnerable'
							name='potentiallyVulnerable'
							rules={rules ? rules.potentiallyvulnerable : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={cifRespData?.potentiallyVulnerable}
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								onChange={(val) => handleOnValuesChange('potentiallyVulnerable', val)}
								size='large'
								placeholder='Select'
								showSearch
								options={csObject?.PotentiallyVulnerable?.dropDownValue?.map((_, i) => ({
									key: i,
									label: _.displayValue,
									value: _.dataValue
								}))}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<Form.Item
							label='AMLA'
							name='Amla'
							required
							rules={rules ? rules.amla : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={cifRespData?.Amla}
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								onChange={(val) => handleOnValuesChange('Amla', val)}
								placeholder='Select'
								size='large'
								showSearch
								options={csObject?.AMLA?.dropDownValue?.map((_, i) => ({
									key: i,
									label: _.displayValue,
									value: _.dataValue
								}))}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='Banned List'
							name='bannedList'
							required
							rules={rules ? rules.bannedlist : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={cifRespData?.bannedList}
								disabled={formData?.cifDataOnEdit && formData?.customerType === 'I'}
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								onChange={(val) => handleOnValuesChange('bannedList', val)}
								placeholder='Select'
								size='large'
								showSearch
								options={csObject?.BannedList?.dropDownValue?.map((_, i) => ({
									key: i,
									label: _.displayValue,
									value: _.dataValue
								}))}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='Risk Category (CRR) '
							name='riskCategory'
							rules={rules ? rules.riskcategory : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={cifRespData?.riskCategory}
								disabled={formData?.cifDataOnEdit}
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								onChange={(val) => handleOnValuesChange('riskCategory', val)}
								size='large'
								placeholder='Select'
								showSearch
								options={csObject?.RiskCategory?.dropDownValue?.map((_, i) => ({
									key: i,
									label: _.displayValue,
									value: _.dataValue
								}))}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<Form.Item
							label='Risk Score'
							name='riskScore'
							// rules={rules ? rules?.riskScore : []}
							rules={[
								{
									pattern: new RegExp('^[0-9]+$'),
									message: 'Accepts only numbers'
								},
								{
									message: 'Maximum character length is 5',
									pattern: /^[\S\d\W]{0,5}$/
								}
							]}
							validateTrigger={['onChange', 'onBlur']}
						>
							<InputNumber
								// disabled={cifRespData?.riskScore}
								disabled={formData?.cifDataOnEdit}
								style={{ width: '100%' }}
								onChange={(value) => handleOnValuesChange('riskScore', value)}
								size='large'
								placeholder='Enter Risk Score'
								precision={0}
								// maxLength={csObject?.RiskScore?.fieldLength}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='TIN'
							name='tin'
							// rules={[
							// 	{
							// 		validator: tinValidator
							// 	},
							// 	{
							// 		pattern: new RegExp('^[0-9]+$'),
							// 		message: 'Accepts only numbers'
							// 	}
							// ]}
							rules={[
								{
									pattern: new RegExp('^[0-9]+$'),
									message: 'Accepts only numbers'
								},

								{
									message: 'Maximum character length is 50',
									pattern: /^[\S\d\W]{0,50}$/
								}
							]}
							validateTrigger={['onChange', 'onBlur']}
						>
							{/* <InputNumber */}
							<Input
								style={{ width: '100%' }}
								// formatter={(value) =>
								// 	formData.customerType === 'I'
								// 		? `${value}`.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3')
								// 		: `${value}`.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1-$2-$3-$4')
								// }
								// parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
								// maxLength={formData.customerType === 'I' ? 9 : csObject?.TIN?.fieldLength}
								// onChange={onChangeTIN}
								onChange={(evt) => handleOnValuesChange('tin', evt.target.value)}
								size='large'
								placeholder={'Enter TIN'}
								// disabled={cifRespData?.tin}
								disabled={formData?.cifDataOnEdit}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='SEC Qualified Investor Buyer'
							// name="qib"
							// rules={rules ? rules.secondaryidno : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							{/* <Input value={formData?.qib} disabled size='large' maxLength='20' /> */}
							<Input value={formData?.qib} disabled size='large' />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	);
}
