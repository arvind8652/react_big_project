import { Form, Input, Card, Select, Row, Col } from 'antd';
import { useEffect } from 'react';
const { Option } = Select;
const { TextArea } = Input;

const InteractionDetailsForm = (props) => {
	props.form.setFieldsValue(props.ExistingData);
	props.form.setFieldsValue(props.formData);
	const handleOnValuesChange = (key, value) => {
		props.onValuesChange({ [key]: value });
	};

	const updateEditData = () => {
		if (props.ExistingData) {
			handleOnValuesChange('subject', props.ExistingData.subject);
			handleOnValuesChange('activityPurpose', props.ExistingData.activityPurpose);
			handleOnValuesChange('priority', props.ExistingData.priority);
			handleOnValuesChange('description', props.ExistingData.description);
		}
	};
	useEffect(() => {
		updateEditData();
	}, []);

	return (
		<>
			<Form
				className='interaction-details-form'
				form={props.form}
				layout='vertical'
				initialValues={props.formData}
			>
				<Card className='interaction-card-type' title='Interaction Details'>
					<Row gutter={16}>
						<Col className='gutter-row' span={24}>
							<Form.Item
								name='subject'
								label={<div className='interaction-text'>Subject</div>}
								rules={props.rules ? props.rules.subject : []}
							>
								<Input
									onChange={(evt) => handleOnValuesChange('subject', evt.target.value)}
									size='large'
									maxLength='350'
									className='interaction-input-field'
									placeholder={props.formData.subject}
									defaultValue={props.formData.subject}
									disabled={
										props.singleOrMultiple === 1 ||
										props?.existingInteractionData?.hasOwnProperty('subject')
											? true
											: false
									}
								/>
							</Form.Item>
						</Col>
						<Col className='gutter-row' span={8}>
							<Form.Item
								name='activityPurpose'
								label={<div className='interaction-text'>Purpose</div>}
								rules={props.rules ? props.rules.activitypurpose : []}
							>
								<Select
									onChange={(value) => handleOnValuesChange('activityPurpose', value)}
									className='interaction-filter-dropdown'
									placeholder='Select Type'
									size='large'
									mode='single'
									defaultValue={props.formData.activityPurpose}
									disabled={
										props.singleOrMultiple === 1 ||
										props?.existingInteractionData?.hasOwnProperty('activityPurpose')
											? true
											: false
									}
									filterOption={(input, opt) => {
										return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									showSearch
								>
									{props.csObject &&
										props.csObject.ActivityPurpose &&
										props.csObject.ActivityPurpose.dropDownValue &&
										props.csObject.ActivityPurpose.dropDownValue.length > 0 &&
										props.csObject.ActivityPurpose.dropDownValue.map((item, index) => (
											<Option value={item.dataValue} key={index}>
												{item.displayValue}
											</Option>
										))}
								</Select>
							</Form.Item>
						</Col>
						<Col className='gutter-row' span={8}>
							<Form.Item
								name='priority'
								label={<div className='interaction-text'>Priority</div>}
								rules={props.rules ? props.rules.priority : []}
							>
								<Select
									onChange={(value) => handleOnValuesChange('priority', value)}
									className='interaction-filter-dropdown'
									placeholder='Select Type'
									size='large'
									mode='single'
									defaultValue={props.formData.priority}
									disabled={
										props.singleOrMultiple === 1 ||
										props?.existingInteractionData?.hasOwnProperty('priority')
											? true
											: false
									}
									filterOption={(input, opt) => {
										return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									showSearch
								>
									{props.csObject &&
										props.csObject.Priority &&
										props.csObject.Priority.dropDownValue &&
										props.csObject.Priority.dropDownValue.length > 0 &&
										props.csObject.Priority.dropDownValue.map((item, index) => (
											<Option value={item.dataValue} key={index}>
												{item.displayValue}
											</Option>
										))}
								</Select>
							</Form.Item>
						</Col>
						<Col className='gutter-row' span={16}>
							<Form.Item
								name='description'
								label={<div className='interaction-text'>Description</div>}
								rules={props.rules ? props.rules.activitydescription : []}
							>
								<TextArea
									onChange={(evt) => handleOnValuesChange('description', evt.target.value)}
									style={{ width: '95%' }}
									rows={5}
									maxLength='350'
									className='interaction-data-input'
									disabled={props.singleOrMultiple === 1 ? true : false}
								/>
							</Form.Item>
						</Col>
					</Row>
				</Card>
			</Form>
		</>
	);
};

export default InteractionDetailsForm;
