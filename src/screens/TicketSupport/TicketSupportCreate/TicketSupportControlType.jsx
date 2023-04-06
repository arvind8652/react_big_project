import { Input, InputNumber, Checkbox, Select, Switch, DatePicker, Spin } from 'antd';
import { useState } from 'react';
import { handleFocusChange } from './TicketSupportMethods';

// const onChange = (keyField, value) => {
// 	handleFormChange({ [keyField]: value });
// };

export const genericTSCheckBox = (item, handleFormChange = () => {}, options = [], name) => {
	return <Checkbox />;
};
export const genericTSNumericTextBox = (item, handleFormChange = () => {}, options = [], name) => {
	return (
		<InputNumber
			name={name}
			style={{ width: '100%', borderRadius: '5px' }}
			size='large'
			controls={false}
			onChange={(value) => {
				handleFormChange({ [name]: value });
			}}
		/>
	);
};
export const genericTSTextBox = (item, handleFormChange = () => {}, options = [], name) => {
	return (
		<Input
			type='text'
			size='large'
			name={name}
			controls={false}
			onChange={(value) => {
				handleFormChange({ [name]: value });
			}}
		/>
	);
};
export const genericTSTextArea = (item, handleFormChange = () => {}, options = [], name) => {
	return (
		<Input.TextArea
			rows={4}
			onChange={(value) => {
				handleFormChange({ [name]: value });
			}}
			name={name}
		/>
	);
};
export const genericTSDatePicker = (item, handleFormChange = () => {}, options = [], name) => {
	return (
		<DatePicker
			onChange={(value) => {
				handleFormChange({ [name]: value });
			}}
		/>
	);
};

export const genericTSToggleButton = (item, handleFormChange = () => {}, options = [], name) => {
	return (
		<Switch
			defaultChecked={false}
			onChange={(value) => {
				handleFormChange({ [name]: value });
			}}
			name={name}
		/>
	);
};

export const genericTSSelect = (
	item,
	handleFormChange = () => {},
	options = [],
	name,
	fields,
	formData
) => {
	const [optionData, setOptionData] = useState([]);
	const [loading, setLoading] = useState(false);

	const onFocusChange = () => {
		console.log('check ---', name);
		if (Object.keys(fields).length > 0 && Object.keys(formData).length > 0) {
			setLoading(true);
			handleFocusChange(fields, formData).then((resp) => {
				console.log('resp data----', resp);
				setOptionData(resp);
				setLoading(false);
			});
		}
	};
	return (
		<Select
			style={{ width: '100%', borderRadius: '5px !important' }}
			onChange={(value) => {
				handleFormChange({ [name]: value });
			}}
			onFocus={fields?.controlType?.toLowerCase() === 'dependentcontrol' ? onFocusChange : false}
			name={name}
			showSearch
			filterOption={(input, option) =>
				option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
			}
			mode={item === 'MultiSelect' ? 'multiple' : 'DropdownList'}
			// notFoundContent={
			// 	loading && fields?.controlType?.toLowerCase() === 'dependentcontrol' ? (
			// 		<Spin size='small' />
			// 	) : null
			// }
			loading={fields?.controlType?.toLowerCase() === 'dependentcontrol' ? loading : false}
			// options={
			// 	fields?.controlType?.toLowerCase() === 'dependentcontrol'
			// 		? optionData
			// 		: options?.map((_) => ({
			// 				key: _.key,
			// 				label: _.value,
			// 				value: _.key
			// 		  }))
			// }

			options={
				fields?.controlType?.toLowerCase() === 'dependentcontrol' && loading
					? [{ value: 'loading', label: 'loading...' }]
					: fields?.controlType?.toLowerCase() === 'dependentcontrol'
					? optionData?.map((_) => ({
							key: _.key,
							label: _.value,
							value: _.key
					  }))
					: options?.map((_) => ({
							key: _.key,
							label: _.value,
							value: _.key
					  }))
			}
		/>
	);
};
