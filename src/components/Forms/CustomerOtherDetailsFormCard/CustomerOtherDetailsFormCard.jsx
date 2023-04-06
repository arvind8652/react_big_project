import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Select, Form, Input, InputNumber } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/pro-light-svg-icons';

import { getMapProspects } from '../../../api/commonApi';

export default function OtherDetails({
	form,
	formData,
	onValuesChange,
	rules,
	csObject,
	refType = '',
	minInvestmentValue = 8000000,
	cifRespData = {},
	action = ''
}) {
	const [mapProspects, setMapProspects] = useState();

	const populateMapProspects = async () => {
		try {
			const response = await getMapProspects();
			setMapProspects(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		populateMapProspects();
	}, []);

	const handleOnValuesChange = (key, value) => {
		onValuesChange({ [key]: value });
	};

	// const investmentValueValidator = (rule, value, callback) => {
	//   if (value) {
	//     try {
	//       if (minInvestmentValue !== "" && minInvestmentValue !== null) {
	//         if (value < minInvestmentValue) {
	//           return Promise.reject(
	//             new Error(
	//               `TRB Value should be greater then or equal to ${minInvestmentValue}`
	//             )
	//           );
	//         } else {
	//           return Promise.resolve();
	//         }
	//       }
	//     } catch (error) {
	//       console.log("error data-----------", error);
	//     }
	//   } else {
	//     return Promise.resolve();
	//   }
	// };

	return (
		<Card title='Other Details'>
			<Form
				form={form}
				layout='vertical'
				initialValues={formData}
				// onValuesChange={onValuesChange}
			>
				<Row>
					<Col span={8}>
						<Form.Item
							label='Reporting Currency'
							name='currency'
							required
							rules={rules ? rules.currency : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={cifRespData?.currency}
								disabled={formData?.cifDataOnEdit && formData?.customerType}
								defaultValue={csObject?.Currency?.defaultvalue}
								onChange={(val) => handleOnValuesChange('currency', val)}
								placeholder='Select'
								size='large'
								options={csObject?.Currency?.dropDownValue?.map((_, i) => ({
									key: i,
									label: _.displayValue,
									value: _.dataValue
								}))}
								showSearch
								filterOption={(input, option) => {
									return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							// label='Investment Value'
							label='Investible Funds'
							name='investmentValue'
							// required
							rules={rules ? [...rules.investmentvalue] : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							{/* <InputNumber
								disabled={cifRespData?.investmentValue}
								style={{ width: '100%' }}
								formatter={(value) => `${value}`.replace(/(\d{15})/, '$1')}
								parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
								maxLength={15}
								onChange={(value) => handleOnValuesChange('investmentValue', value)}
								placeholder='Enter value'
								size='large'
							/> */}
							<Select
								// disabled={cifRespData?.investmentValue}
								defaultValue={csObject?.InvestmentValue?.defaultvalue}
								onChange={(val) => handleOnValuesChange('investmentValue', val)}
								placeholder='Select'
								size='large'
								options={csObject?.InvestmentValue?.dropDownValue?.map((_, i) => ({
									key: i,
									label: _.displayValue,
									value: _.dataValue
								}))}
								showSearch
								filterOption={(input, option) => {
									return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							// label='Map Prospect'
							label='Mapped / Converted Prospect'
							name='prospectId'
							rules={rules ? rules.mapprospect : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={cifRespData?.prospectId || action === 'convert' || action === 'edit'}
								disabled={action === 'convert' || action === 'edit'}
								onChange={(val) => handleOnValuesChange('prospectId', val)}
								showSearch
								placeholder='Search by name'
								size='large'
								suffixIcon={<FontAwesomeIcon icon={faUserPlus} color='#354081' />}
								options={mapProspects?.lookUpValues?.map((item, i) => ({
									key: i,
									label: item.display_value,
									value: item.data_value
								}))}
								optionFilterProp='children'
								filterOption={(input, option) => {
									return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								value={formData?.prospectId}
							>
								{
									// mapProspects?.lookUpValues?.map(item => <Select.Option key={item?.data_value}>{item?.display_value}</Select.Option>)
								}
							</Select>
						</Form.Item>
					</Col>
					<Col span={16}>
						<Form.Item
							label='Remarks'
							name='remarks'
							rules={rules ? rules.remark : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Input.TextArea
								// disabled={cifRespData?.remarks}
								onChange={(evt) => handleOnValuesChange('remarks', evt.target.value)}
								rows={4}
								size='large'
								maxLength='350'
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	);
}
