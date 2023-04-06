import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Select, Form, Input, DatePicker, InputNumber, Space } from 'antd';
import { getProspectPrimId } from '../../api/commonApi';
import './prospectCreateScreen.scss';

import moment from 'moment';

export default function KycValidationDetails({
	form,
	formData,
	onValuesChange,
	rules,
	csObject
	// handleChangeRiskScore,
}) {
	const [prospectKYCPrimId, setProspectKYCPrimId] = useState();

	const getProspectKYCPrimIdHandler = async () => {
		try {
			const resp = await getProspectPrimId(formData?.prospectType);
			setProspectKYCPrimId(resp.data);
		} catch (error) {
			console.log('getProspectPrimIdHandler', error);
		}
	};
	useEffect(() => {
		getProspectKYCPrimIdHandler();
	}, [formData?.prospectType]);

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

	return (
		<Card title='KYC Validation Details' className='kyc-details-form-card'>
			<Form form={form} layout='vertical' initialValues={formData}>
				<Row>
					<Col span={8}>
						<Form.Item
							label='Primary ID'
							name='primaryId'
							rules={rules ? rules.primaryid : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								showSearch
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								onChange={(value) => {
									handleOnValuesChange('primaryId', value);
								}}
								size='large'
								placeholder='Enter primary ID'
								// options={csObject?.PrimaryID?.dropDownValue?.map((item, i) => ({
								// 	key: i,
								// 	//   disabled: formData?.secId === item.dataValue ? true : false,
								// 	label: item.displayValue,
								// 	value: item.dataValue
								// }))}
								options={prospectKYCPrimId?.lookUpValues?.map((_, i) => ({
									key: i,
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
							name='primaryIdnumber'
							rules={rules ? rules.primaryidnumber : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Input
								onChange={(evt) => handleOnValuesChange('primaryIdnumber', evt.target.value)}
								size='large'
								placeholder='Enter primary ID number'
								// disabled={!formData.primaryId}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='Expiry Date'
							name='expiryDate'
							rules={rules ? rules.expirydate : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<DatePicker
								allowClear={false}
								disabledDate={disabledPastDate}
								onChange={(val) => handleOnValuesChange('expiryDate', val)}
								size='large'
								placeholder='Select expiry date'
								// disabled={!formData.expiryDate}
								value={formData.expiryDate}
								format='DD-MM-YYYY'
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<Form.Item
							label='Risk Category (CRR) '
							name='riskCategory'
							rules={rules ? rules.riskcategory : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
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
					<Col span={8}>
						<Form.Item
							label='Risk Score'
							name='riskScore'
							rules={rules ? rules.riskscore : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<InputNumber
								style={{ width: '100%' }}
								// formatter={value => `${value}`.replace(/^[0-9][0-9]?$|^50$/), ''}  ////////pattern --- /(\d{3})(\d{3})(\d{3})(\d{3})/, '$1-$2-$3-$4'
								// parser={value => value.replace(/^[0-9][0-9]?$|^50$/, '')}
								onChange={(value) => handleOnValuesChange('riskScore', value)}
								size='large'
								placeholder='Enter Score'
								precision={0}
								maxLength={csObject?.RiskScore?.fieldLength}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	);
}
