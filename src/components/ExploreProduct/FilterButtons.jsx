import { Row, Col } from 'antd';
import * as FontAwesomeSvgs from '@fortawesome/pro-regular-svg-icons';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './ExploreProduct.scss';
// import { filter } from "core-js/core/array";

const FilterButtons = ({
	onFilterChange = () => {}, // callback called with value
	buttonOptions,
	value = '',
	setAllSelectData,
	isAllSelectData
}) => {
	const handleOnChange = (value) => {
		onFilterChange(value);
		setAllSelectData(false);
	};
	const onFilterSelect = () => {
		setAllSelectData(!isAllSelectData);
		onFilterChange(null);
	};

	return (
		<Row>
			<div
				onClick={() => onFilterSelect(value)}
				className={`box ${isAllSelectData ? 'unSelectedBox' : 'selectedBox'} `}
			>
				Show All
			</div>

			{buttonOptions.map((filter) => {
				return (
					<div
						onClick={() => handleOnChange(filter.value)}
						className={`box ${value === filter.value ? 'unSelectedBox' : 'selectedBox'} `}
						key={filter.value}
					>
						{filter?.label}
					</div>
				);
			})}
		</Row>
	);
};

export default FilterButtons;
