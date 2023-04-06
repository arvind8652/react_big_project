import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

const PlottingCategorySelector = ({ options, plottingCategory, setPlottingCategory }) => {
	return (
		<Select
			className='plotting-category-select'
			value={plottingCategory}
			onSelect={(e) => {
				setPlottingCategory(e);
			}}
		>
			{options.map((option) => (
				<Option value={option.value} key={option.value}>
					{option.label}
				</Option>
			))}
		</Select>
	);
};
export default PlottingCategorySelector;
