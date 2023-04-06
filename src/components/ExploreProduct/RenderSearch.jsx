import { Input } from 'antd';
import React from 'react';

const RenderSearch = ({ tabName, onSearch = () => {} }) => {
	return (
		<Input
			onChange={(event) => onSearch(event?.target?.value)}
			className='search'
			size='large'
			placeholder={`Search ${tabName}`}
		/>
	);
};

export default RenderSearch;
