import { Col, Form, Select, Input, InputNumber, DatePicker } from 'antd';
import moment from 'moment';
import './styles.scss';
const { Option } = Select;

const GenericCardInput = ({
	item = { size: Number(), rules: [], keyField: '', label: '' },
	onChange = () => {},
	value = null,
	itemName = null
}) => {
	const displayAskedComponent = (item) => {
		switch (item.type) {
			case 'Input':
				return (
					<>
						<Input
							size='large'
							disabled={item.disabled ?? false}
							value={value ?? item.value ?? ''}
							onChange={(e) => onChange(e.target.value)}
							placeholder={item.placeholder ?? ''}
							type={item.dataType ? item.dataType : 'text'}
						/>
					</>
				);
			case 'InputNumber':
				return (
					<>
						<InputNumber
							size='large'
							disabled={item.disabled ?? false}
							value={value ?? item.value ?? ''}
							onChange={(e) => onChange(e)}
							placeholder={item.placeholder ?? ''}
							className='numbersInput'
							keyboard={false}
							style={{ textAlign: 'end' }}
							precision={item.decimals ?? 4}
						/>
					</>
				);
			case 'Date':
				return (
					<DatePicker
						size='large'
						disabled={item.disabled ?? false}
						value={moment(value)}
						placeholder={item.placeholder ?? ''}
						format={'DD-MM-YYYY'}
						onChange={(val) => onChange(val)}
					/>
				);
			case 'Select':
				return (
					<Select
						size='large'
						showSearch={item.showSearch ?? true}
						disabled={item.disabled ?? false}
						defaultValue={value}
						onChange={onChange}
						placeholder={item.placeholder ?? ''}
						bordered={true}
						filterOption={(input, opt) => {
							return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
						}}
					>
						{item.options.length > 0 &&
							item.options.map((eachOption, idx) => (
								<Option key={idx} value={eachOption[item.key]}>
									{eachOption[item.value]}
								</Option>
							))}
					</Select>
				);
			default:
				return <h1>Wrong Selection </h1>;
		}
	};

	return (
		<Col key={item.label} span={item.size ? item.size : 8} hidden={item.hiddenField ?? false}>
			<Form.Item
				label={item.label}
				colon={false}
				labelCol={{ span: '24' }}
				className='cardColumn'
				labelAlign='left'
				rules={item.rules}
				validateTrigger={['onBlur', 'onSubmit', 'onChange']}
				name={itemName ?? item.label}
			>
				{displayAskedComponent(item)}
			</Form.Item>
		</Col>
	);
};

export default GenericCardInput;
