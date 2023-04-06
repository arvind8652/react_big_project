import { Card, Col, Form, Row, Select, Input } from 'antd';
import { CONSTANTS } from '../../../constants/constants';
const OtherDetailsFormCard = ({ form, formData, onValuesChange, rules, csObject }) => {
	return (
		<Card title='Other Details' className='other-details-form-card'>
			<Form form={form} layout='vertical' initialValues={formData} onValuesChange={onValuesChange}>
				<Row gutter={16}>
					<Col span={8}>
						<Form.Item
							name='qualificationStatus'
							label={<div className='text'>Qualification Status</div>}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.qualificationstatus : []}
						>
							<Select
								value={formData.qualificationStatus}
								size='large'
								style={{
									width: '100%'
								}}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
								placeholder={CONSTANTS.placeholders.select}
							>
								{csObject &&
									csObject.QualificationStatus &&
									csObject.QualificationStatus.dropDownValue.map((option) => (
										<Select.Option key={option.dataValue} value={option.dataValue}>
											{option.displayValue}
										</Select.Option>
									))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							name='interestLevel'
							label={<div className='text'>Interest Level</div>}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.interestlevel : []}
						>
							<Select
								value={formData.interestLevel}
								size='large'
								style={{
									width: '100%'
								}}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
								placeholder={CONSTANTS.placeholders.select}
							>
								{csObject &&
									csObject.InterestLevel &&
									csObject.InterestLevel.dropDownValue.map((option) => (
										<Select.Option key={option.dataValue} value={option.dataValue}>
											{option.displayValue}
										</Select.Option>
									))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							name='preferredCurrency'
							label={<div className='text'>Preferred Currency</div>}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.preferredcurrency : []}
						>
							<Select
								value={formData.preferredCurrency}
								size='large'
								style={{
									width: '100%'
								}}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
								placeholder={CONSTANTS.placeholders.select}
							>
								{csObject &&
									csObject.PreferredCurrency &&
									csObject.PreferredCurrency.dropDownValue.map((option) => (
										<Select.Option key={option.dataValue} value={option.dataValue}>
											{option.displayValue}
										</Select.Option>
									))}
							</Select>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={8}>
						<Form.Item
							name='status'
							label={<div className='text'>Status</div>}
							validateTrigger={['onChange', 'onBlur']}
							rules={[{ required: true, message: 'Required' }]}
						>
							<Input
								className='field'
								value={formData.status}
								size='large'
								disabled
								placeholder={CONSTANTS.placeholders.enter}
							/>
						</Form.Item>
					</Col>
					<Col span={16}>
						<Form.Item
							name='remarks'
							label={<div className='text'>Remarks</div>}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.remark : []}
						>
							<Input.TextArea
								className='field'
								rows={6}
								value={formData.remarks}
								size='large'
								placeholder={CONSTANTS.placeholders.enter}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	);
};

export default OtherDetailsFormCard;
