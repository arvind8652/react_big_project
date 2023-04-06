import React from 'react';
import { Menu, Select } from 'antd';
import '../CustomerOnboardingListingScreen.scss';
import { CONSTANTS } from '../../../constants/constants';
const RenderDropdown = ({ mode, onSelect, filterBy, sortBy, setLoading, loading = false }) => {
	let options = [];
	if (mode === 'filter') {
		options = [
			{ label: CONSTANTS.filterSortOptions.showAll, value: CONSTANTS.filterSortOptions.showAll },
			// { label: CONSTANTS.filterSortOptions.favourites, value: CONSTANTS.filterSortOptions.favourites },
			// {
			//     label: CONSTANTS.filterSortOptions.recentlyModifiedLast30Days,
			//     value: CONSTANTS.filterSortOptions.recentlyModifiedLast30Days,
			// },
			{
				label: CONSTANTS.filterSortOptions.createdLast7Days,
				value: CONSTANTS.filterSortOptions.createdLast7Days
			},
			{
				label: CONSTANTS.filterSortOptions.createdLast15Days,
				value: CONSTANTS.filterSortOptions.createdLast15Days
			},
			{
				label: CONSTANTS.filterSortOptions.createdLast30Days,
				value: CONSTANTS.filterSortOptions.createdLast30Days
			}
		];
	} else if (mode === 'sort') {
		options = [
			{
				label: CONSTANTS.filterSortOptions.creationDateNearToFar,
				value: CONSTANTS.filterSortOptions.creationDateNearToFar
			},
			{
				label: CONSTANTS.filterSortOptions.creationDateFarToNear,
				value: CONSTANTS.filterSortOptions.creationDateFarToNear
			},
			{
				label: CONSTANTS.filterSortOptions.modificationNearToFar,
				value: CONSTANTS.filterSortOptions.modificationNearToFar
			},
			{
				label: CONSTANTS.filterSortOptions.modificationFarToNear,
				value: CONSTANTS.filterSortOptions.modificationFarToNear
			}
		];
	}
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
		<div style={{ position: 'relative' }}>
			<div className='dropdown-prefix'>{mode.charAt(0).toUpperCase() + mode.substring(1)}:</div>
			<Select
				className={'filter-sort-dropdown ' + mode}
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
