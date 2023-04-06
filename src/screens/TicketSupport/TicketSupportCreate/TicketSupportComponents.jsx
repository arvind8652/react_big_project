import {
	genericTSCheckBox,
	genericTSDatePicker,
	genericTSNumericTextBox,
	genericTSSelect,
	genericTSTextArea,
	genericTSTextBox,
	genericTSToggleButton
} from './TicketSupportControlType';
import { Col, Row, Card, Form, Space } from 'antd';
import { getOptionVal } from './TicketSupportMethods';

const TicketSupportComponents = ({
	cs,
	formData,
	setFormData,
	form,
	rules,
	handleFormChange = () => {}
}) => {
	const controlTypes = (
		item,
		handleFormChange = () => {},
		// getOptionVal = () => {},
		name,
		fields
	) => {
		let optionValues = getOptionVal(fields);
		switch (item) {
			case 'CheckBox':
				return genericTSCheckBox(item, (handleFormChange = () => {}), optionValues, name);
			case 'NumericTextBox':
				return genericTSNumericTextBox(
					item,
					(handleFormChange = () => {}),
					(optionValues = []),
					name
				);
			case 'TextBox':
				return genericTSTextBox(item, (handleFormChange = () => {}), optionValues, name);
			case 'TextArea':
				return genericTSTextArea(item, (handleFormChange = () => {}), optionValues, name);
			case 'DatePicker':
				return genericTSDatePicker(item, (handleFormChange = () => {}), optionValues, name);
			case 'ToggleButton':
				return genericTSToggleButton(item, (handleFormChange = () => {}), optionValues, name);
			default:
				return genericTSSelect(
					item,
					(handleFormChange = () => {}),
					optionValues,
					name,
					fields,
					formData
				);
		}
	};

	const setCSFieldsHandler = (itm, i) => {
		let newRules = rules[i];
		return itm?.map((fields, index) => {
			return (
				<Col
					span={fields?.controlType === 'TextArea' ? 16 : 8}
					key={index}
					style={{ paddingRight: '14px' }}
				>
					<Form.Item
						label={
							<div>
								{fields?.fieldLabel}
								{fields?.isRequired && <span style={{ color: 'red' }}> *</span>}
							</div>
						}
						rules={newRules ? newRules[fields?.keyField?.toLowerCase()] : []}
						name={fields?.keyField}
						validateTrigger={['onChange', 'onBlur']}
					>
						{controlTypes(
							fields?.controlType,
							handleFormChange,
							// getOptionVal,
							fields?.keyField,
							fields,
							formData
						)}
					</Form.Item>
				</Col>
			);
		});
	};
	const csHandler = () => {
		return (
			cs &&
			cs?.length > 0 &&
			cs?.map((itm, index) => {
				return (
					<Space direction='vertical' size={16} key={index} className='parent-form-container'>
						<Card key={index} title={itm?.sectionName}>
							<Row>{setCSFieldsHandler(itm?.controlStructureField, index)}</Row>
						</Card>
					</Space>
				);
			})
		);
	};
	return <>{csHandler()}</>;
};

export default TicketSupportComponents;
