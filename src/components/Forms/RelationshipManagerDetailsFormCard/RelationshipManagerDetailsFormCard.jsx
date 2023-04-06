import { fal } from '@fortawesome/pro-light-svg-icons';
import { Card, Col, Form, Row, Select } from 'antd';
import { CONSTANTS } from '../../../constants/constants';

const RelationshipManagerDetailsFormCard = ({
	form,
	formData,
	user,
	onValuesChange,
	rules,
	csObject
}) => {
	return (
		<Card title={`Relationship Manager's Details`} className='source-details-form-card'>
			<Form form={form} layout='vertical' initialValues={formData} onValuesChange={onValuesChange}>
				<Row gutter={16}>
					<Col span={8}>
						<Form.Item
							name='relationshipManager'
							label={<div className='text'>{`Relationship Manager's Name`}</div>}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.relationshipmanager : []}
						>
							<Select
								className='filter-dropdown'
								// onSelect={handleSelectManagerName}
								value={formData.relationshipManager}
								size='large'
								style={{
									width: '100%'
								}}
								// defaultValue={user?.rmYN === "Y" ? user.userID : null}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
								placeholder={CONSTANTS.placeholders.select}
							>
								{csObject?.RelationshipManager?.lookupValue?.lookUpValues?.map((item, index) => (
									<Select.Option value={item.ID} key={index}>
										{item?.Name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							name='branchName'
							label={<div className='text'>Office</div>}
							validateTrigger={['onChange', 'onBlur']}
							required
							rules={rules ? rules.branch : []}
						>
							<Select
								className='filter-dropdown'
								// onSelect={handleSelectBranchName}
								size='large'
								mode='single'
								placeholder={CONSTANTS.placeholders.select}
								value={formData.branchName}
								disabled={formData.relationshipManager ? true : false}
								// defaultValue={user?.rmYN === "Y" ? user.branch : null}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
							>
								{csObject?.Branch?.lookupValue?.lookUpValues?.map((item, index) => (
									<Select.Option value={item.Unit_Hierarchy} key={index}>
										{item.NAME}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	);
};

export default RelationshipManagerDetailsFormCard;
