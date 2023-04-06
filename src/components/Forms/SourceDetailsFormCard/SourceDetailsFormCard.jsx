import { useState, useEffect } from 'react';
import { Card, Col, Form, Row, Select, Input } from 'antd';
import { CONSTANTS } from '../../../constants/constants';
import {
	getSourceTypeDependentDataApi,
	getSourceNameDependentDataApi
} from '../../../api/commonApi';

const SourceDetailsFormCard = ({ form, formData, onValuesChange, rules, csObject }) => {
	const [sourceNameDropdown, setSourceNameDropdown] = useState([]);
	const [sourceTypeDropdown, setSourceTypeDropdown] = useState([]);
	const { Option } = Select;
	const { TextArea } = Input;
	useEffect(() => {
		getSourceTypeDependentDataApi(formData.source)
			.then((res) => {
				res.data.returnColumn === 'data_value' && setSourceTypeDropdown(res.data.lookUpValues);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [formData.source]);
	useEffect(() => {
		getSourceNameDependentDataApi(formData.sourceType)
			.then((res) => {
				res.data.returnColumn === 'data_value' && setSourceNameDropdown(res.data.lookUpValues);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [formData.sourceType]);

	return (
		<Card title='Source Details' className='source-details-form-card'>
			<Form form={form} layout='vertical' initialValues={formData} onValuesChange={onValuesChange}>
				<Row gutter={16}>
					<Col span={8}>
						<Form.Item
							name='source'
							label={
								<div className='lead-text text'>{CONSTANTS.leadCreate.sourceDetails.source}</div>
							}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.source : []}
							// rules={
							// 	csObject && csObject.Source.isRequired
							// 		? [
							// 				{
							// 					required: true,
							// 					message: ' '
							// 				}
							// 		  ]
							// 		: []
							// }
						>
							<Select
								value={formData.source}
								size='large'
								style={{
									width: '100%'
								}}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
								onClick={() => {
									form.setFieldsValue({
										sourceType: '',
										sourceValue: '',
										sourceName: ''
									});
									formData.sourceType = '';
									formData.sourceValue = '';
									formData.sourceName = '';
								}}
								placeholder={CONSTANTS.placeholders.select}
							>
								{csObject &&
									csObject.Source &&
									csObject.Source.dropDownValue.map((option) => (
										<Select.Option key={option.dataValue} value={option.dataValue}>
											{option.displayValue}
										</Select.Option>
									))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							name='sourceType'
							label={
								<div className='lead-text text'>{CONSTANTS.leadCreate.sourceDetails.type}</div>
							}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.campaigntype : []}
							// rules={
							// 	csObject && csObject.CampaignType.isRequired
							// 		? [
							// 				{
							// 					required: true,
							// 					message: ' '
							// 				}
							// 		  ]
							// 		: []
							// }
						>
							<Select
								value={formData.sourceType}
								size='large'
								style={{
									width: '100%'
								}}
								disabled={!formData.source}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
								onClick={() => {
									form.setFieldsValue({
										SourceValue: '',
										sourceName: ''
									});
									formData.sourceName = '';
									formData.sourceValue = '';
								}}
								placeholder={CONSTANTS.placeholders.select}
							>
								{sourceTypeDropdown &&
									sourceTypeDropdown.map((item, index) => (
										<Option value={item.data_value} key={index}>
											{item.display_value}
										</Option>
									))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							name='sourceName'
							label={
								<div className='lead-text text'>{CONSTANTS.leadCreate.sourceDetails.name}</div>
							}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.campaignname : []}
							// rules={
							// 	csObject && csObject.CampaignName.isRequired
							// 		? [
							// 				{
							// 					required: true,
							// 					message: ' '
							// 				}
							// 		  ]
							// 		: []
							// }
						>
							<Select
								value={formData.sourceValue}
								size='large'
								style={{
									width: '100%'
								}}
								disabled={formData && (!formData.source || !formData.sourceType)}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
								placeholder={CONSTANTS.placeholders.select}
							>
								{sourceNameDropdown &&
									sourceNameDropdown.map((item, index) => (
										<Option value={item.data_value} key={index}>
											{item.display_value}
										</Option>
									))}
							</Select>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<Form.Item
							label='Sourced By'
							name='sourcedBy'
							required
							rules={rules ? rules.sourcedby : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// onChange={(value) => onValuesChange('sourcedBy', value)}
								placeholder='Select'
								size='large'
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								options={csObject?.SourcedBy?.dropDownValue?.map((_, i) => ({
									key: i,
									label: _.displayValue,
									value: _.dataValue
								}))}
								value={formData?.sourcedBy}
								showSearch
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	);
};
export default SourceDetailsFormCard;
