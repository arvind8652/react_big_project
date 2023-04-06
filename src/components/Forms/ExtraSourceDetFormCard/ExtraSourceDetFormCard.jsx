import { useState, useEffect } from 'react';
import { Card, Col, Form, Row, Select, Input } from 'antd';
import { CONSTANTS } from '../../../constants/constants';
import {
	getSourceTypeDependentDataApi,
	getSourceNameDependentDataApi
} from '../../../api/commonApi';
const ExtraSourceDetailsFormCard = ({ form, formData, onValuesChange, rules, csObject }) => {
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
							label={<div className='lead-text'>{CONSTANTS.leadCreate.sourceDetails.source}</div>}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.source : []}
						>
							<Select
								className='filter-dropdown'
								size='large'
								value={formData.source}
								style={{
									width: '100%'
								}}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
								onClick={() => {
									form.setFieldsValue({
										SourceType: '',
										SourceValue: ''
									});
									formData.sourceType = '';
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
							label={<div className='lead-text'>{CONSTANTS.leadCreate.sourceDetails.type}</div>}
							validateTrigger={['onChange', 'onBlur']}
							// rules={rules ? rules.campaign : []}
							rules={
								csObject && csObject.Campaign.isRequired
									? [
											{
												required: true,
												message: ' '
											}
									  ]
									: []
							}
						>
							<Select
								value={formData.sourceType}
								className='filter-dropdown'
								size='large'
								disabled={!formData.source}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
								onClick={() => {
									form.setFieldsValue({
										SourceValue: ''
									});
									formData.sourceName = '';
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
							label={<div className='lead-text'>{CONSTANTS.leadCreate.sourceDetails.name}</div>}
							validateTrigger={['onChange', 'onBlur']}
							// rules={rules ? rules.campaignname : []}
							rules={
								csObject && csObject.Campaign.isRequired
									? [
											{
												required: true,
												message: ' '
											}
									  ]
									: []
							}
						>
							<Select
								value={formData.sourceName}
								className='filter-dropdown'
								size='large'
								style={{
									width: '100%'
								}}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
								disabled={formData && (!formData.source || !formData.sourceType)}
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
				<Row gutter={16}>
					<Col span={8}>
						<Form.Item
							name='InterestLevel'
							label={
								<div className='lead-text'>{CONSTANTS.leadCreate.sourceDetails.interestLevel}</div>
							}
							rules={rules ? rules.interestlevel : []}
						>
							<Select
								className='filter-dropdown'
								size='large'
								mode='single'
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
								placeholder={CONSTANTS.placeholders.select}
							>
								{csObject &&
									csObject.InterestLevel &&
									csObject.InterestLevel.dropDownValue.length > 0 &&
									csObject.InterestLevel.dropDownValue.map((item, index) => (
										<Option value={item.dataValue} key={index}>
											{item.displayValue}
										</Option>
									))}
							</Select>
						</Form.Item>
					</Col>

					<Col span={8} className='gutter-row'>
						<Form.Item
							name='SourcedBy'
							label={
								<div className='lead-text'>{CONSTANTS.leadCreate.sourceDetails.sourcedBy}</div>
							}
							rules={rules ? rules.sourcedby : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								className='lead-select'
								size='large'
								mode='single'
								value={[]}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
							>
								{csObject &&
									csObject.SourcedBy &&
									csObject.SourcedBy.dropDownValue.length > 0 &&
									csObject.SourcedBy.dropDownValue.map((item, index) => (
										<Option value={item.dataValue} key={index}>
											{item.displayValue}
										</Option>
									))}
							</Select>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={16}>
						<Form.Item
							name='remark'
							label={<div className='lead-text'>{CONSTANTS.leadCreate.sourceDetails.remarks}</div>}
							rules={rules ? rules.remark : []}
						>
							<TextArea
								rows={6}
								className='text-area-field'
								placeholder={CONSTANTS.placeholders.enter}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	);
};
export default ExtraSourceDetailsFormCard;
