import React, { useState } from 'react';
import { Select } from 'antd';

const RenderDropdown = ({ options = [], onChange = () => {} }) => {
	const [sortLabel, setSortLabel] = useState('Sort: None');

	const handleOnChange = (value) => {
		setSortLabel(value);
		onChange(value);
	};

	return (
		<div style={{ position: 'relative' }}>
			<Select
				className={'filter-sort-dropdown sort'}
				size='large'
				showArrow={true}
				placeholder={sortLabel}
				onChange={handleOnChange}
			>
				{options &&
					options.map((option, index) => (
						<Select.Option key={index} value={option.dataValue}>
							{option.displayValue}
						</Select.Option>
					))}
			</Select>
		</div>
	);
};

export default RenderDropdown;
