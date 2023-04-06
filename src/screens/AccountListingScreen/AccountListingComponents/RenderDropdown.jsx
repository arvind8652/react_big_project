import React from 'react';
import { Menu, Select } from 'antd';

import '../AccountListingScreen.scss';
const RenderDropdown = ({ mode, onSelect, filterBy, sortBy, setLoading, loading = false }) => {
	// const [filterBy, setFilterBy] = useState("Show All");
	// const [sortBy, setSortBy] = useState("Recently Modified");
	// const [loading, setLoading] = useState();
	let options = [];
	if (mode === 'filter') {
		options = [
			{
				label: 'Show All',
				value: 'Show All'
			},

			{
				label: 'Under Process',
				value: 'Under Process'
			},
			{
				label: 'Recently Modified (Modified in last 30 days)',
				value: 'Recently Modified (Modified in last 30 days)'
			},
			{
				label: 'Created in last 7 Days',
				value: 'Created in last 7 Days'
			},
			{
				label: 'Created in last 15 Days',
				value: 'Created in last 15 Days'
			},
			{
				label: 'Created in last 30 Days',
				value: 'Created in last 30 Days'
			}
		];
	} else if (mode === 'sort') {
		options = [
			{
				label: 'Creation Date (Near to Far)',
				value: 'Creation Date (Near to Far)'
			},
			{
				label: 'Creation Date (Far to Near)',
				value: 'Creation Date (Far to Near)'
			},
			{
				label: 'Modification Date (Near to Far)',
				value: 'Modification Date (Near to Far)'
			},
			{
				label: 'Modification Date (Far to Near)',
				value: 'Modification Date (Far to Near)'
			}
		];
	}

	function handleMenuClick(e) {}

	const menu = (
		<Menu>
			{options.map((item) => (
				<div
					onClick={() => {
						setLoading(true);
						onSelect(item.value);
					}}
				>
					{item.label}
				</div>
			))}
		</Menu>
	);
	return (
		<div
			style={{
				position: 'relative'
			}}
		>
			<div className='dropdown-prefix'> {mode.charAt(0).toUpperCase() + mode.substring(1)}:</div>
			<Select
				className={`filter-sort-dropdown ${mode}`}
				size='large'
				onSelect={onSelect}
				value={mode === 'filter' ? filterBy : sortBy}
				showArrow={true}
				disabled={loading}
			>
				{options &&
					options.map((option, index) => (
						<Select.Option key={index} value={option.value}>
							{option.label}
						</Select.Option>
					))}
			</Select>
		</div>
	);
};

export default RenderDropdown;
